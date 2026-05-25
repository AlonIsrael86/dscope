import React, { useMemo, useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, AlertTriangle, CheckCircle, Info, Zap, RefreshCw, Layers, Database } from 'lucide-react';

const PADDING = 20;

interface Case {
  id: string;
  title: string;
  priority: string;
  status: string;
  agentId: string;
  department: string;
}

interface SankeyDiagramProps {
  cases: Case[];
  agents: { id: string; name: string }[];
}

interface SankeyNode {
  id: string;
  label: string;
  stage: number;
  value: number;
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  color: string;
}

interface SankeyLink {
  id: string;
  source: string;
  target: string;
  value: number;
  sourceNode: SankeyNode;
  targetNode: SankeyNode;
  sx: number; // source X coordinate
  sy: number; // source Y coordinate on link center
  tx: number; // target X coordinate
  ty: number; // target Y coordinate on link center
  dy: number; // stroke width
}

export const SankeyDiagram: React.FC<SankeyDiagramProps> = ({ cases, agents }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 450 });
  const [hoveredNode, setHoveredNode] = useState<SankeyNode | null>(null);
  const [hoveredLink, setHoveredLink] = useState<SankeyLink | null>(null);
  const [activePathway, setActivePathway] = useState<string | null>(null);
  const [showFlowParticles, setShowFlowParticles] = useState(true);
  const [viewMode, setViewMode] = useState<'horizontal' | 'radial'>('horizontal');
  const [flowSpeedMultiplier, setFlowSpeedMultiplier] = useState(1);

  // Resize listener
  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({
          width: Math.max(width, 500),
          height: Math.max(height, 400)
        });
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const agentNameMap = useMemo(() => {
    const map: Record<string, string> = {};
    agents.forEach(a => {
      map[a.id] = a.name;
    });
    return map;
  }, [agents]);

  // Node Stage Configuration
  const STAGES = [
    { title: 'Subsystem Sectors', key: 'department', label: 'DEPT' },
    { title: 'Priority Tiers', key: 'priority', label: 'PRIORITY' },
    { title: 'Neural Agents', key: 'agent', label: 'AGENT' },
    { title: 'Process Outcomes', key: 'status', label: 'STATUS' }
  ];

  // Compute Layout nodes and links mathematically using D3
  const { nodes, links, bottlenecks } = useMemo(() => {
    if (cases.length === 0) {
      return { nodes: [], links: [], bottlenecks: [] };
    }

    // Step 1: Detect unique nodes in each stage
    const stageItems: [Set<string>, Set<string>, Set<string>, Set<string>] = [
      new Set<string>(), // Stage 0: Department
      new Set<string>(), // Stage 1: Priority
      new Set<string>(), // Stage 2: Agent
      new Set<string>()  // Stage 3: Status
    ];

    cases.forEach(c => {
      if (c.department) stageItems[0].add(`0:${c.department}`);
      if (c.priority) stageItems[1].add(`1:${c.priority}`);
      const agentName = agentNameMap[c.agentId] || 'Unknown';
      stageItems[2].add(`2:${agentName}`);
      if (c.status) stageItems[3].add(`3:${c.status}`);
    });

    const nodeColors: Record<string, string> = {
      // Departments
      'Operations': '#3b82f6', // Cyan/Blue
      'Logistics': '#8b5cf6', // Magenta/Purple
      'Support': '#ec4899', // Pink
      'Sales': '#eab308', // Amber
      'Ops': '#06b6d4', // Teal
      'Legal': '#64748b', // Slate
      
      // Priorities
      'High': '#ef4444', // Red
      'Medium': '#f59e0b', // Amber/Orange
      'Low': '#10b981', // Emerald

      // Outcomes
      'Success': '#10b981',
      'Running': '#3b82f6',
      'Failed': '#ef4444'
    };

    const getFallBackNodeColor = (id: string, stage: number) => {
      const parts = id.split(':');
      const name = parts[1];
      if (nodeColors[name]) return nodeColors[name];
      
      // Stage-specific fallbacks
      if (stage === 2) return '#a855f7'; // Purple-ish for agents
      return '#6b7280';
    };

    // Build raw nodes
    const nodeMap: Record<string, SankeyNode> = {};
    const nodeList: SankeyNode[] = [];

    stageItems.forEach((items, stageIdx) => {
      Array.from(items).sort().forEach(nodeId => {
        const parts = nodeId.split(':');
        const label = parts[1];
        const node: SankeyNode = {
          id: nodeId,
          label,
          stage: stageIdx,
          value: 0,
          x0: 0,
          x1: 0,
          y0: 0,
          y1: 0,
          color: getFallBackNodeColor(nodeId, stageIdx)
        };
        nodeMap[nodeId] = node;
        nodeList.push(node);
      });
    });

    // Step 2: Compute flows/connections weights (Links)
    // We have three sets of links: Stage 0->1, 1->2, 2->3
    const linkWeights: Record<string, number> = {};

    cases.forEach(c => {
      const dept = `0:${c.department}`;
      const priority = `1:${c.priority}`;
      const agent = `2:${agentNameMap[c.agentId] || 'Unknown'}`;
      const status = `3:${c.status}`;

      // Increment values for nodes
      if (nodeMap[dept]) nodeMap[dept].value++;
      if (nodeMap[priority]) nodeMap[priority].value++;
      if (nodeMap[agent]) nodeMap[agent].value++;
      if (nodeMap[status]) nodeMap[status].value++;

      // Links weights
      const key01 = `${dept}->${priority}`;
      const key12 = `${priority}->${agent}`;
      const key23 = `${agent}->${status}`;

      linkWeights[key01] = (linkWeights[key01] || 0) + 1;
      linkWeights[key12] = (linkWeights[key12] || 0) + 1;
      linkWeights[key23] = (linkWeights[key23] || 0) + 1;
    });

    // Eliminate nodes that have 0 cases
    const activeNodes = nodeList.filter(n => n.value > 0);

    // Calculate dimensions
    const padding = PADDING;
    const nodeWidth = 16;
    const innerWidth = dimensions.width - padding * 2;
    const innerHeight = dimensions.height - padding * 3 - 30; // space for headers

    const colWidth = innerWidth / (STAGES.length - 1);

    // Group active nodes by stage to layout Y coordinates
    const nodesByStage: SankeyNode[][] = Array.from({ length: STAGES.length }, () => []);
    activeNodes.forEach(node => {
      nodesByStage[node.stage].push(node);
    });

    if (viewMode === 'radial') {
      const Cx = dimensions.width / 2;
      const Cy = dimensions.height / 2;
      const R = Math.max(135, Math.min(dimensions.width, dimensions.height) / 2 - 75);

      const stageCount = STAGES.length;
      const arcPerStage = (2 * Math.PI) / stageCount;
      const stageGap = 0.35; // Gap in radians between stages to visually separate them

      nodesByStage.forEach((stageNodes, stageIdx) => {
        const count = stageNodes.length;
        const sectorStart = stageIdx * arcPerStage - Math.PI / 2; // Offset by -PI/2 so stage 0 is closer to top-left
        const sectorEnd = (stageIdx + 1) * arcPerStage - stageGap - Math.PI / 2;

        stageNodes.forEach((node, i) => {
          const angle = count > 1 
            ? sectorStart + (i / (count - 1)) * (sectorEnd - sectorStart)
            : sectorStart + (sectorEnd - sectorStart) / 2;

          // Node center coordinate
          const x = Cx + R * Math.cos(angle);
          const y = Cy + R * Math.sin(angle);

          // Render node as a square capsule
          const size = 18;
          node.x0 = x - size / 2;
          node.x1 = x + size / 2;
          node.y0 = y - size / 2;
          node.y1 = y + size / 2;
          
          // Store angle/coordinates for node
          (node as any).angle = angle;
        });
      });
    } else {
      // Vertically layouts nodes in each stage
      // To make a clean diagram, node heights are proportional to their values.
      // Sum of values in each stage might differ slightly due to missing fields, but usually they match cases.length.
      const maxStageSum = d3.max(nodesByStage, stageNodes => d3.sum(stageNodes, d => d.value)) || 1;

      // We leave a minimum space between nodes
      const nodeSpacing = 16;
      
      nodesByStage.forEach((stageNodes, stageIdx) => {
        const stageSum = d3.sum(stageNodes, d => d.value) || 1;
        // Distribute height. Total height occupied by nodes + gaps = innerHeight
        const gapsCount = stageNodes.length - 1;
        const totalGapsHeight = gapsCount * nodeSpacing;
        const availableNodesHeight = Math.max(innerHeight - totalGapsHeight, 50);

        // Height scale
        const heightScale = d3.scaleLinear()
          .domain([0, maxStageSum])
          .range([0, availableNodesHeight]);

        // Sort nodes inside columns to minimize crossovers
        // For outcome, let's put Success on top, Running mid, Failed on bottom
        if (stageIdx === 3) {
          stageNodes.sort((a, b) => {
            const order: Record<string, number> = { 'Success': 1, 'Running': 2, 'Failed': 3 };
            return (order[a.label] || 9) - (order[b.label] || 9);
          });
        } else if (stageIdx === 1) {
          stageNodes.sort((a, b) => {
            const order: Record<string, number> = { 'High': 1, 'Medium': 2, 'Low': 3 };
            return (order[a.label] || 9) - (order[b.label] || 9);
          });
        } else {
          stageNodes.sort((a, b) => b.value - a.value);
        }

        // Calculate total actual printed height
        const actualNodesHeight = d3.sum(stageNodes, d => heightScale(d.value));
        const remainingEmptySpace = innerHeight - actualNodesHeight;
        const equalSpacing = stageNodes.length > 1 ? remainingEmptySpace / gapsCount : 0;
        const resolvedSpacing = Math.max(equalSpacing, 12);

        let currentY = padding + 15;
        const xCoord = padding + stageIdx * colWidth;

        stageNodes.forEach(node => {
          const nodeHeight = Math.max(heightScale(node.value), 12); // Minimum 12px height so small flows are click-able
          node.x0 = xCoord;
          node.x1 = xCoord + nodeWidth;
          node.y0 = currentY;
          node.y1 = currentY + nodeHeight;
          
          currentY += nodeHeight + resolvedSpacing;
        });
      });
    }

    // Organize raw links in an array
    const rawLinks: SankeyLink[] = [];

    // Track offsets to stack links beautifully as they slide into and out of nodes
    const nodeSourceOutIndex: Record<string, number> = {};
    const nodeTargetInIndex: Record<string, number> = {};

    // Sort links to make them bundle up cleanly
    // A standard connection: source -> target
    Object.entries(linkWeights).forEach(([linkKey, weight]) => {
      const [sourceId, targetId] = linkKey.split('->');
      const sNode = nodeMap[sourceId];
      const tNode = nodeMap[targetId];

      if (sNode && tNode && sNode.value > 0 && tNode.value > 0) {
        rawLinks.push({
          id: linkKey,
          source: sourceId,
          target: targetId,
          value: weight,
          sourceNode: sNode,
          targetNode: tNode,
          sx: 0,
          sy: 0,
          tx: 0,
          ty: 0,
          dy: 0
        });
      }
    });

    // Sort links to bundle nicely
    rawLinks.sort((a, b) => {
      if (a.sourceNode.stage !== b.sourceNode.stage) {
        return a.sourceNode.stage - b.sourceNode.stage;
      }
      return (a.sourceNode.y0 - b.sourceNode.y0) || (a.targetNode.y0 - b.targetNode.y0);
    });

    // Track running vertical positions for links on both source and target sides
    const sourceOffsets: Record<string, number> = {};
    const targetOffsets: Record<string, number> = {};

    rawLinks.forEach(link => {
      const sNode = link.sourceNode;
      const tNode = link.targetNode;

      const sHeight = sNode.y1 - sNode.y0;
      const tHeight = tNode.y1 - tNode.y0;

      // Calculate how wide this path stream is relative to total node stream size
      // Link dynamic stroke width (dy)
      const dySourceProportion = sNode.value > 0 ? (link.value / sNode.value) * sHeight : 0;
      const dyTargetProportion = tNode.value > 0 ? (link.value / tNode.value) * tHeight : 0;
      
      const strokeWidth = Math.max((dySourceProportion + dyTargetProportion) / 2, 2.5);
      link.dy = strokeWidth;

      if (viewMode === 'radial') {
        link.sx = (sNode.x0 + sNode.x1) / 2;
        link.sy = (sNode.y0 + sNode.y1) / 2;
        link.tx = (tNode.x0 + tNode.x1) / 2;
        link.ty = (tNode.y0 + tNode.y1) / 2;
      } else {
        // Retrieve current cumulative offset
        const sOffset = sourceOffsets[sNode.id] || 0;
        const tOffset = targetOffsets[tNode.id] || 0;

        // The center point of this link stream inside the nodes
        link.sx = sNode.x1;
        link.sy = sNode.y0 + sOffset + strokeWidth / 2;
        link.tx = tNode.x0;
        link.ty = tNode.y0 + tOffset + strokeWidth / 2;

        // Increment counters
        sourceOffsets[sNode.id] = sOffset + strokeWidth;
        targetOffsets[tNode.id] = tOffset + strokeWidth;
      }
    });

    // Identify bottlenecks
    const failureLinks = rawLinks.filter(l => l.target === '3:Failed' || l.target.endsWith(':Failed'));
    const pendingLatencyLinks = rawLinks.filter(l => {
      // Bottlenecks represent High Priority flows ending in Failed or active running bottlenecks
      return (l.sourceNode.label === 'High' && l.targetNode.label === 'Failed') ||
             (l.targetNode.label === 'Running' && l.value >= 2);
    });

    const calculatedBottlenecks = pendingLatencyLinks.map(l => ({
      id: l.id,
      title: `${l.sourceNode.label} ➔ ${l.targetNode.label} Bottleneck`,
      description: `${l.value} heavy weight pathways showing friction in processing pipelines.`,
      severity: l.sourceNode.label === 'High' ? 'critical' : 'warning',
      sourceNode: l.sourceNode,
      targetNode: l.targetNode
    }));

    return { 
      nodes: activeNodes, 
      links: rawLinks, 
      bottlenecks: calculatedBottlenecks 
    };
  }, [cases, agentNameMap, dimensions, viewMode]);

  // Handle highlighters on links or nodes
  const isPathwayActive = (node: SankeyNode) => {
    if (!activePathway) return false;
    const [activeType, activeVal] = activePathway.split(':');
    return node.id.includes(activeVal);
  };

  const getLinkHighlightState = (link: SankeyLink) => {
    if (hoveredNode) {
      if (link.source === hoveredNode.id || link.target === hoveredNode.id) {
        return 'highlighted';
      }
      return 'dimmed';
    }
    if (hoveredLink) {
      if (link.id === hoveredLink.id) {
        return 'highlighted';
      }
      return 'dimmed';
    }
    return 'normal';
  };

  const getNodeHighlightState = (node: SankeyNode) => {
    if (hoveredNode) {
      if (node.id === hoveredNode.id) return 'selected';
      // Highlighting outgoing neighbors or incoming neighbors
      const connected = links.some(l => 
        (l.source === hoveredNode.id && l.target === node.id) ||
        (l.target === hoveredNode.id && l.source === node.id)
      );
      return connected ? 'connected' : 'dimmed';
    }
    if (hoveredLink) {
      if (node.id === hoveredLink.source || node.id === hoveredLink.target) {
        return 'connected';
      }
      return 'dimmed';
    }
    return 'normal';
  };

  // Generate Bezier Horizontal curve representation or radial curve for beautiful flows
  const generateLinkPath = (link: SankeyLink) => {
    const x0 = link.sx;
    const y0 = link.sy;
    const x1 = link.tx;
    const y1 = link.ty;

    if (viewMode === 'radial') {
      const mx = (x0 + x1) / 2;
      const my = (y0 + y1) / 2;
      const cx = dimensions.width / 2;
      const cy = dimensions.height / 2;
      const cpx = cx * 0.45 + mx * 0.55;
      const cpy = cy * 0.45 + my * 0.55;
      return `M${x0},${y0}Q${cpx},${cpy} ${x1},${y1}`;
    } else {
      const x2 = x0 + (x1 - x0) * 0.45;
      const x3 = x0 + (x1 - x0) * 0.55;
      return `M${x0},${y0}C${x2},${y0} ${x3},${y1} ${x1},${y1}`;
    }
  };

  return (
    <div className="w-full bg-[#020617]/40 backdrop-blur-md border border-white/5 rounded-[2rem] p-6 md:p-8 relative overflow-hidden group/sankey mb-12 shadow-[0_0_50px_rgba(0,0,0,0.6)] animate-fade-in">
      {/* Visual Ambient Blur Light */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_#4facfe]" />
            <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[#4facfe] font-bold">
              Neural Flow Topology mapping
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-display font-black text-white uppercase italic tracking-tight flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-400 animate-pulse" /> Case State Transitions
          </h3>
          <p className="text-[10px] sm:text-xs text-white/50 font-mono uppercase tracking-[0.1em] mt-1">
            D3.js live topological model tracking traffic streams & active bottlenecks
          </p>
        </div>

        {/* Configurations Toggle */}
        <div className="flex flex-wrap items-center gap-3 self-start sm:self-auto">
          {/* View Mode Toggle Segmented Control */}
          <div className="bg-[#05101a]/80 border border-white/5 rounded-xl p-1 flex items-center shadow-[0_0_15px_rgba(0,0,0,0.4)]">
            <button
              onClick={() => setViewMode('horizontal')}
              className={`px-3 py-1.5 rounded-lg font-mono text-[9px] uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                viewMode === 'horizontal'
                  ? 'bg-gradient-to-r from-[#4facfe]/20 to-blue-500/20 border border-blue-500/30 text-white font-extrabold shadow-[0_0_10px_rgba(0,242,254,0.1)]'
                  : 'border border-transparent text-white/45 hover:text-white/70'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>Horizontal Flow</span>
            </button>
            <button
              onClick={() => setViewMode('radial')}
              className={`px-3 py-1.5 rounded-lg font-mono text-[9px] uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                viewMode === 'radial'
                  ? 'bg-gradient-to-r from-purple-500/20 to-[#8b5cf6]/20 border border-purple-500/30 text-white font-extrabold shadow-[0_0_10px_rgba(139,92,246,0.1)]'
                  : 'border border-transparent text-white/45 hover:text-white/70'
              }`}
            >
              <RefreshCw className="w-3 h-3" />
              <span>Circular Radial</span>
            </button>
          </div>

          <button
            onClick={() => setShowFlowParticles(!showFlowParticles)}
            className={`px-4 py-2 rounded-xl font-mono text-[9px] uppercase tracking-wider border transition-all flex items-center gap-2 ${
              showFlowParticles 
                ? 'bg-blue-500/10 border-blue-500/30 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)] font-extrabold' 
                : 'bg-white/5 border-white/10 text-white/40 hover:text-white/60'
            }`}
          >
            <RefreshCw className={`w-3 h-3 ${showFlowParticles ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            <span>Particle Flow: {showFlowParticles ? 'ON' : 'OFF'}</span>
          </button>

          {/* Flow Speed Adjustment */}
          <div className="bg-[#05101a]/80 border border-white/5 rounded-xl p-1 flex items-center shadow-[0_0_15px_rgba(0,0,0,0.4)]">
            <span className="font-mono text-[9px] uppercase tracking-wider text-white/50 px-2 pl-3">Data Load:</span>
            {[
              { label: 'Low', value: 2 },
              { label: 'Normal', value: 1 },
              { label: 'High', value: 0.5 },
            ].map(speed => (
              <button
                key={speed.label}
                onClick={() => setFlowSpeedMultiplier(speed.value)}
                className={`px-3 py-1.5 rounded-lg font-mono text-[9px] uppercase tracking-wider transition-all duration-300 ${
                  flowSpeedMultiplier === speed.value
                    ? 'bg-blue-500/20 text-white font-extrabold border border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]'
                    : 'text-white/45 hover:text-white/70 border border-transparent'
                }`}
              >
                {speed.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Sankey SVG Container */}
        <div className="xl:col-span-3 flex flex-col justify-between" ref={containerRef}>
          {cases.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center min-h-[350px]">
              <Database className="w-8 h-8 text-white/10 mb-4 animate-bounce" />
              <p className="font-mono text-xs text-white/30 uppercase tracking-widest">
                No active neural case pathways found for current metrics filter...
              </p>
            </div>
          ) : (
            <div className="relative w-full overflow-hidden select-none" style={{ height: dimensions.height }}>
              {/* Header column indicators */}
              {viewMode === 'horizontal' && (
                <div className="absolute top-0 left-0 right-0 flex justify-between px-5 font-mono text-[9px] tracking-widest text-white/30 uppercase font-black">
                  {STAGES.map((s, idx) => (
                    <div 
                      key={idx} 
                      style={{ 
                        width: '80px', 
                        textAlign: idx === 0 ? 'left' : idx === STAGES.length - 1 ? 'right' : 'center',
                        transform: idx === 0 ? 'none' : idx === STAGES.length - 1 ? 'none' : 'translateX(-50%)',
                        position: 'absolute',
                        left: `${PADDING + idx * ((dimensions.width - PADDING * 2) / (STAGES.length - 1))}px`
                      }}
                    >
                      {s.title}
                    </div>
                  ))}
                </div>
              )}

              {/* Responsive SVG stage */}
              <svg 
                width="100%" 
                height="100%" 
                viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
                preserveAspectRatio="xMidYMid meet"
                className="overflow-visible"
              >
                {/* SVG Definitions for dynamic link glow elements & masks */}
                <defs>
                  {links.map((link) => (
                    <linearGradient 
                      key={`grad-${link.id}`} 
                      id={`grad-${link.id.replace(/:/g, '-').replace(/->/g, '--')}`} 
                      gradientUnits="userSpaceOnUse"
                      x1={link.sx} 
                      y1={link.sy}
                      x2={link.tx} 
                      y2={link.ty}
                    >
                      <stop offset="0%" stopColor={link.sourceNode.color} stopOpacity={0.15} />
                      <stop offset="50%" stopColor={link.sourceNode.color} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={link.targetNode.color} stopOpacity={0.15} />
                    </linearGradient>
                  ))}
                  {links.map((link) => (
                    <linearGradient 
                      key={`grad-glow-${link.id}`} 
                      id={`grad-glow-${link.id.replace(/:/g, '-').replace(/->/g, '--')}`} 
                      gradientUnits="userSpaceOnUse"
                      x1={link.sx} 
                      y1={link.sy}
                      x2={link.tx} 
                      y2={link.ty}
                    >
                      <stop offset="0%" stopColor={link.sourceNode.color} />
                      <stop offset="100%" stopColor={link.targetNode.color} />
                    </linearGradient>
                  ))}
                  <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Radial Stage Sector Title Overlays */}
                {viewMode === 'radial' && (
                  <g opacity={0.35} className="pointer-events-none select-none">
                    <text x={30} y={35} textAnchor="start" fill="#3b82f6" className="font-mono text-[9px] uppercase tracking-[0.2em] font-black">
                      Ⅰ. Subsystem Sectors
                    </text>
                    <text x={dimensions.width - 30} y={35} textAnchor="end" fill="#ef4444" className="font-mono text-[9px] uppercase tracking-[0.2em] font-black">
                      Ⅱ. Priority Tiers
                    </text>
                    <text x={dimensions.width - 30} y={dimensions.height - 35} textAnchor="end" fill="#a855f7" className="font-mono text-[9px] uppercase tracking-[0.2em] font-black">
                      Ⅲ. Neural Agents
                    </text>
                    <text x={30} y={dimensions.height - 35} textAnchor="start" fill="#10b981" className="font-mono text-[9px] uppercase tracking-[0.2em] font-black">
                      Ⅳ. Process Outcomes
                    </text>
                  </g>
                )}

                {/* SATELLITE LINKS - Background state */}
                <g opacity={0.85}>
                  {links.map((link) => {
                    const highlightState = getLinkHighlightState(link);
                    const isFocus = highlightState === 'highlighted';
                    const isDim = highlightState === 'dimmed';
                    const gradId = `grad-${link.id.replace(/:/g, '-').replace(/->/g, '--')}`;
                    const glowGradId = `grad-glow-${link.id.replace(/:/g, '-').replace(/->/g, '--')}`;

                    // Calculate midpoint for path label placement
                    let midX = (link.sx + link.tx) / 2;
                    let midY = (link.sy + link.ty) / 2;

                    if (viewMode === 'radial') {
                      const mx = (link.sx + link.tx) / 2;
                      const my = (link.sy + link.ty) / 2;
                      const cx = dimensions.width / 2;
                      const cy = dimensions.height / 2;
                      const cpx = cx * 0.45 + mx * 0.55;
                      const cpy = cy * 0.45 + my * 0.55;
                      midX = 0.25 * link.sx + 0.5 * cpx + 0.25 * link.tx;
                      midY = 0.25 * link.sy + 0.5 * cpy + 0.25 * link.ty;
                    }

                    const currentPath = generateLinkPath(link);
                    return (
                      <g key={link.id}>
                        {/* Interactive hover container */}
                        <motion.path
                          initial={false}
                          animate={{ d: currentPath }}
                          transition={{ type: "spring", stiffness: 80, damping: 20 }}
                          fill="none"
                          stroke="transparent"
                          strokeWidth={link.dy + 8}
                          className="cursor-pointer"
                          onMouseEnter={() => setHoveredLink(link)}
                          onMouseLeave={() => setHoveredLink(null)}
                        />

                        {/* Visual Link Pathway */}
                        <motion.path
                          initial={false}
                          animate={{ 
                            d: currentPath,
                            strokeWidth: link.dy,
                            strokeOpacity: isDim ? 0.08 : isFocus ? 0.65 : 1
                          }}
                          transition={{ type: "spring", stiffness: 80, damping: 20, duration: 0.3 }}
                          fill="none"
                          stroke={isFocus ? `url(#${glowGradId})` : `url(#${gradId})`}
                          className="pointer-events-none"
                        />

                        {/* Particle animated dash flow indicators */}
                        {showFlowParticles && !isDim && (
                          <motion.path
                            initial={{ strokeDashoffset: 60 }}
                            animate={{ 
                              d: currentPath,
                              strokeDashoffset: [60, 0] 
                            }}
                            transition={{ 
                              d: { type: "spring", stiffness: 80, damping: 20 },
                              strokeDashoffset: { duration: (isFocus ? 1.5 : 3) * flowSpeedMultiplier, repeat: Infinity, ease: "linear" }
                            }}
                            fill="none"
                            stroke={`url(#${glowGradId})`}
                            strokeWidth={Math.max(link.dy * 0.3, 1.2)}
                            strokeDasharray="4, 12"
                            strokeLinecap="round"
                            className={`pointer-events-none mix-blend-screen transition-all duration-300 ${isFocus ? 'opacity-100 drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]' : 'opacity-70'}`}
                          />
                        )}

                        {/* Flow quantity text badge centered along the path */}
                        {!isDim && link.value > 0 && (
                          <motion.g 
                            className="pointer-events-none"
                            initial={false}
                            animate={{ opacity: isDim ? 0.1 : isFocus ? 1 : 0.75 }}
                          >
                            {/* Small background pill for elite legibility */}
                            <motion.rect
                              initial={false}
                              animate={{ x: midX - 11, y: midY - 7 }}
                              transition={{ type: "spring", stiffness: 80, damping: 20 }}
                              width={22}
                              height={14}
                              rx={7}
                              fill="#090d1a"
                              stroke={isFocus ? link.sourceNode.color : "rgba(255,255,255,0.15)"}
                              strokeWidth={1}
                              className="shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                            />
                            <motion.text
                              initial={false}
                              animate={{ x: midX, y: midY + 3.5 }}
                              transition={{ type: "spring", stiffness: 80, damping: 20 }}
                              textAnchor="middle"
                              fill={isFocus ? "#ffffff" : "rgba(255,255,255,0.85)"}
                              className="font-mono text-[9px] font-black tracking-tighter"
                            >
                              {link.value}
                            </motion.text>
                          </motion.g>
                        )}
                      </g>
                    );
                  })}
                </g>

                {/* FLOW GRAPH NODES */}
                <g>
                  {nodes.map((node) => {
                    const highlightState = getNodeHighlightState(node);
                    const isSelected = highlightState === 'selected';
                    const isConn = highlightState === 'connected';
                    const isDimmed = highlightState === 'dimmed';
                    
                    const width = node.x1 - node.x0;
                    const height = node.y1 - node.y0;

                    const nodeRx = viewMode === 'radial' ? width / 2 : 3;

                    return (
                      <motion.g 
                        key={node.id} 
                        initial={false}
                        animate={{ x: node.x0, y: node.y0 }}
                        transition={{ type: "spring", stiffness: 80, damping: 20 }}
                        onMouseEnter={() => setHoveredNode(node)}
                        onMouseLeave={() => setHoveredNode(null)}
                        className="cursor-pointer group"
                      >
                        {/* Node Background Glow wrapper */}
                        <motion.rect
                          initial={false}
                          animate={{ width, height, rx: nodeRx, opacity: isSelected ? 0.35 : isConn ? 0.2 : 0 }}
                          transition={{ type: "spring", stiffness: 80, damping: 20 }}
                          fill={node.color}
                          filter="url(#neon-glow)"
                          className="pointer-events-none"
                        />

                        {/* Solid core bar */}
                        <motion.rect
                          initial={false}
                          animate={{ width, height, rx: nodeRx, opacity: isDimmed ? 0.15 : isSelected ? 1 : isConn ? 0.9 : 0.65 }}
                          transition={{ type: "spring", stiffness: 80, damping: 20 }}
                          fill={node.color}
                        />

                        {/* Glow highlighters border */}
                        <motion.rect
                          initial={false}
                          animate={{ width: width + 2, height: height + 2, rx: viewMode === 'radial' ? (width + 2) / 2 : 4 }}
                          transition={{ type: "spring", stiffness: 80, damping: 20 }}
                          x={-1}
                          y={-1}
                          fill="none"
                          stroke={node.color}
                          strokeWidth={1}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        />

                        {/* Stack count badge inside the node block (if height allows) */}
                        {height > 24 && (
                          <motion.text
                            initial={false}
                            animate={{ x: width / 2, y: 14 }}
                            transition={{ type: "spring", stiffness: 80, damping: 20 }}
                            textAnchor="middle"
                            fill="#05060f"
                            className="font-mono text-[8px] font-black select-none pointer-events-none"
                          >
                            {node.value}
                          </motion.text>
                        )}

                        {/* Node Labels */}
                        <motion.text
                          initial={false}
                          animate={{
                            x: viewMode === 'radial' 
                              ? width / 2 + 18 * Math.cos((node as any).angle || 0)
                              : (node.stage === STAGES.length - 1 ? -12 : width + 12),
                            y: viewMode === 'radial'
                              ? height / 2 + 18 * Math.sin((node as any).angle || 0) + 3
                              : height / 2 + 3
                          }}
                          transition={{ type: "spring", stiffness: 80, damping: 20 }}
                          textAnchor={viewMode === 'radial'
                            ? (Math.cos((node as any).angle || 0) > 0.15 ? 'start' : Math.cos((node as any).angle || 0) < -0.15 ? 'end' : 'middle')
                            : (node.stage === STAGES.length - 1 ? 'end' : 'start')
                          }
                          fill={isDimmed ? 'rgba(255,255,255,0.2)' : isSelected ? '#ffffff' : 'rgba(255,255,255,0.7)'}
                          className={`font-mono text-[10px] tracking-wider select-none transition-all duration-300 ${
                            isSelected ? 'font-black scale-105 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]' : 'font-medium'
                          }`}
                        >
                          {node.label}
                        </motion.text>
                      </motion.g>
                    );
                  })}
                </g>
              </svg>

              {/* Hover Tooltip Overlay absolute positioner */}
              <AnimatePresence>
                {hoveredNode && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute z-50 pointer-events-none bg-[#090b16]/95 border border-white/10 rounded-2xl p-4 shadow-2xl font-mono text-[10.5px] text-white/80 w-64 backdrop-blur-xl"
                    style={{
                      left: Math.min(hoveredNode.x0 < dimensions.width / 2 ? hoveredNode.x1 + 10 : hoveredNode.x0 - 270, dimensions.width - 275),
                      top: Math.min(hoveredNode.y0, dimensions.height - 150)
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/5">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: hoveredNode.color }} />
                      <span className="font-sans text-xs font-bold text-white uppercase tracking-wider truncate">{hoveredNode.label}</span>
                    </div>
                    <div className="space-y-1.5 text-white/50">
                      <div className="flex justify-between">
                        <span>NODE DEPTH:</span>
                        <span className="text-white font-bold">{STAGES[hoveredNode.stage].label} (COL {hoveredNode.stage + 1})</span>
                      </div>
                      <div className="flex justify-between">
                        <span>TOTAL CASES COHORT:</span>
                        <span className="text-[#4facfe] font-bold">{hoveredNode.value} / {cases.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>AVERAGE DISTRIBUTION:</span>
                        <span className="text-white font-bold">{((hoveredNode.value / cases.length) * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {hoveredLink && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute z-50 pointer-events-none bg-[#090b16]/95 border border-white/10 rounded-2xl p-4 shadow-2xl font-mono text-[10.5px] text-white/80 w-80 backdrop-blur-xl"
                    style={{
                      left: Math.min(Math.max((hoveredLink.sx + hoveredLink.tx) / 2 - 160, 20), dimensions.width - 340),
                      top: Math.min((hoveredLink.sy + hoveredLink.ty) / 2, dimensions.height - 180)
                    }}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-white/5">
                      <div className="flex items-start flex-col">
                        <span className="text-[8px] text-white/30 tracking-widest uppercase">FLOW DIRECTION</span>
                        <div className="flex items-center gap-1.5 font-bold text-[10px] text-white mt-0.5">
                          <span style={{ color: hoveredLink.sourceNode.color }}>{hoveredLink.sourceNode.label}</span>
                          <span className="text-white/30">➔</span>
                          <span style={{ color: hoveredLink.targetNode.color }}>{hoveredLink.targetNode.label}</span>
                        </div>
                      </div>
                      <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
                    </div>
                    <div className="space-y-1.5 text-white/50">
                      <div className="flex justify-between">
                        <span>JOINT CONNECTIONS VALUE:</span>
                        <span className="text-[#4facfe] font-bold">{hoveredLink.value} ACTIVE CASES</span>
                      </div>
                      <div className="flex justify-between">
                        <span>SOURCE OUTFLOW %:</span>
                        <span className="text-white font-bold">{((hoveredLink.value / hoveredLink.sourceNode.value) * 100).toFixed(0)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>TARGET INFLOW %:</span>
                        <span className="text-white font-bold">{((hoveredLink.value / hoveredLink.targetNode.value) * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Bottlenecks Sidebar Analyzer */}
        <div className="xl:col-span-1 p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between min-h-[400px]">
          <div>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/5">
              <AlertTriangle className="w-4 h-4 text-amber-500 animate-pulse" />
              <h4 className="font-mono text-xs font-bold text-white uppercase tracking-widest leading-none">
                Bottlenecks Audit
              </h4>
            </div>

            {bottlenecks.length === 0 ? (
              <div className="py-8 text-center">
                <CheckCircle className="w-8 h-8 text-emerald-400/30 mx-auto mb-2 animate-pulse" />
                <p className="font-mono text-[9px] text-[#22c55e]/60 uppercase tracking-widest leading-normal">
                  Verification healthy. No current capacity bottlenecks detected!
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[300px] overflow-y-auto styled-scrollbars pr-1">
                {bottlenecks.map((bt) => (
                  <div 
                    key={bt.id} 
                    className={`p-3.5 border rounded-xl bg-black/40 transition-all ${
                      bt.severity === 'critical' 
                        ? 'border-red-500/20 hover:border-red-500/40' 
                        : 'border-amber-500/20 hover:border-amber-500/40'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className={`w-2 h-2 rounded-full mt-1 shrink-0 ${
                        bt.severity === 'critical' ? 'bg-red-500 animate-ping' : 'bg-amber-500 animate-pulse'
                      }`} />
                      <div>
                        <span className="font-sans text-[10px] font-black text-white/90 uppercase tracking-wider block leading-tight">
                          {bt.title}
                        </span>
                        <p className="font-mono text-[9px] text-white/40 uppercase tracking-normal mt-1 leading-normal">
                          {bt.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`px-1.5 py-0.5 rounded text-[7px] font-mono font-black uppercase ${
                            bt.severity === 'critical' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'
                          }`}>
                            {bt.severity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-3 border border-white/5 rounded-xl bg-black/20 mt-4">
            <h5 className="font-mono text-[8.5px] text-[#4facfe] font-black uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Info className="w-3.5 h-3.5" /> Static Heuristics
            </h5>
            <p className="font-mono text-[9px] text-white/30 uppercase tracking-normal leading-relaxed">
              Total pathways are reconstructed by evaluating active records weights. Flow lines reflect live pipeline congestion mapping.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
