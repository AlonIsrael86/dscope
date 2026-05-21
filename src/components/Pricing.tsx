import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SYMBOLS } from './BrandBookSymbols';
import { Zap, CheckCircle2, Activity, Building2, Ticket, Headphones, Hexagon, ChevronDown, Calculator, TrendingUp, Users, Mic, Contact, Clock, MessageSquare, Mail, Phone, LineChart, FileText, LayoutDashboard, Code, MonitorSpeaker, Waypoints } from 'lucide-react';
import { Suspense, lazy } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Legend, ComposedChart, Line } from 'recharts';

const DeepOceanBackground = lazy(() => import('./Backgrounds').then(m => ({ default: m.DeepOceanBackground })));
const RealisticPlanet = lazy(() => import('./Planets').then(m => ({ default: m.RealisticPlanet })));
const BoomableSpaceObject = lazy(() => import('./BrandSpaceObjects').then(m => ({ default: m.BoomableSpaceObject })));
import { PLANETS_DATA } from '../data/planetsConstants';
import { INDUSTRY_TECH } from '../data/industryTechConstants';

const ACCORDION_FEATURES = [
  { id: 'voice-agent', name: 'Voice Agent', icon: Mic, subFeatures: ['Custom Voice Cloning', 'Multiple Languages', 'Real-time Sentiment Analysis'] },
  { id: 'crm', name: 'Ticket Management Platform / CRM', icon: Contact, subFeatures: ['Automated Triage', 'Analytics Dashboard', 'Agent Handoff', 'Custom Workflows', 'SLA Tracking', 'Omnichannel Inbox', 'Customer Journey Mapping', 'Knowledge Base Integration', 'Role-Based Access', 'Sentiment Analysis', 'Tags & Categorization', 'Duplicate Detection', 'Automated Responses', 'Macro Shortcuts', 'Export & Reporting', 'Audit logs', 'API Access', 'Custom Fields', 'Webhook Triggers', 'Third-party Plugins', 'Notes & Mentions', 'SLA Alerts', 'Agent Collision Detection'] },
  { id: 'voice-hours', name: 'Voice Hours', icon: Clock, subFeatures: ['Overage Protection', 'Rollover Hours', 'Volume Discounts'] },
  { id: 'chat-agents', name: 'Chat Agents', icon: MessageSquare, subFeatures: ['Website Widget', 'Multi-channel Support', 'Context Awareness'] },
  { id: 'mail-agents', name: 'Mail Agents', icon: Mail, subFeatures: ['Inbox Scanning', 'Auto-reply Drafting', 'Prioritization'] },
  { id: 'switchboard', name: 'Human AI Switchboard for Phone Calls', icon: Phone, subFeatures: ['Smart Routing', 'Wait Time Management', 'Priority Queues', 'Interactive Voice Response (IVR)', 'Skill-Based Routing', 'Call Recording', 'Call Transcription', 'Live Keyword Spotting', 'Whisper Coaching', 'Barge-In Capabilities', 'Voicemail to Text', 'Callback Requests', 'Hold Music Customization', 'Business Hours Routing', 'Queue Announcements', 'Call Transfer (Warm/Cold)', 'Spam Call Filtering', 'Multi-level Menus', 'Caller ID Routing', 'Historical Call Analytics', 'Real-time Dashboard', 'Post-Call Surveys', 'Sentiment Analytics'] },
  { id: 'lead-roi', name: 'Lead Generation ROI Widgets', icon: LineChart, subFeatures: ['Conversion Tracking', 'A/B Testing', 'Dynamic Content'] },
  { id: 'lead-forms', name: 'ROI Lead Forms', icon: FileText, subFeatures: ['Smart Validation', 'Conditional Logic', 'CRM Sync'] },
  { id: 'dashboards', name: 'Custom Dashboards', icon: LayoutDashboard, subFeatures: ['Drag & Drop Builder', 'Real-time Metrics', 'Export & Reporting'] },
  { id: 'api', name: 'API', icon: Code, subFeatures: ['RESTful Endpoints', 'GraphQL', 'Webhooks'] },
  { id: 'api-integrations', name: 'API Integrations', icon: Waypoints, subFeatures: ['Salesforce', 'Zendesk', 'HubSpot'] },
  { id: 'screen-share', name: 'Screen Share Talking Agents', icon: MonitorSpeaker, subFeatures: ['Co-browsing', 'Visual Annotation', 'Secure Sessions', 'Live Troubleshooting Aid', 'Virtual Coaching & Onboarding', 'Joint Application Review', 'Video Call Integration', 'Remote Control (Permission-Based)', 'Real-time Step-by-step Guidance', 'Compliance Screen Recording', 'Redaction of PII', 'Action Highlights'] }
];

const INTEGRATION_CATEGORIES = [
  {
    title: 'CRM & SALES INTELLIGENCE',
    services: ['Salesforce', 'HubSpot', 'Zoho CRM', 'Pipedrive', 'Copper', 'Fireberry', 'Zendesk Sell', 'Dynamics 365', 'Insightly', 'Capsule', 'Freshsales', 'Bitrix24', 'Keap', 'Apollo.io', 'Clearbit', 'ZoomInfo', 'SalesLoft', 'Close', 'Nimble', 'Agile CRM']
  },
  {
    title: 'OPERATIONS & PRODUCTIVITY',
    services: ['Monday.com', 'Asana', 'Trello', 'ClickUp', 'Jira', 'Basecamp', 'Notion', 'Wrike', 'Smartsheet', 'Teamwork', 'Airtable', 'Miro', 'Todoist', 'Confluence', 'Lucidchart', 'Evernote', 'Linear', 'Coda', 'Roam Research', 'Obsidian']
  },
  {
    title: 'COMMUNICATION & OMNICHANNEL',
    services: ['WhatsApp', 'Slack', 'Microsoft Teams', 'Discord', 'Telegram', 'Zoom', 'Intercom', 'Twilio', 'Freshdesk', 'Gorgias', 'Drift', 'Viber', 'Line', 'Google Meet', 'Webex', 'RingCentral', 'SendGrid', 'Postmark', 'Mailgun', 'MessageBird']
  },
  {
    title: 'ERP & FINANCIAL ECOSYSTEMS',
    services: ['SAP', 'Oracle NetSuite', 'Sage', 'QuickBooks Online', 'Xero', 'FreshBooks', 'Stripe', 'PayPal', 'Square', 'Wave', 'Expensify', 'Gusto', 'ADP', 'Plaid', 'Braintree', 'Adyen', 'Workday Financials', 'Coupa', 'BlackLine']
  },
  {
    title: 'MARKETING & ADVERTISING',
    services: ['Mailchimp', 'ActiveCampaign', 'Klaviyo', 'Marketo', 'Google Ads', 'Meta Ads', 'LinkedIn Ads', 'TikTok Ads', 'Semrush', 'Ahrefs', 'Hootsuite', 'Buffer', 'Braze', 'Iterable', 'Customer.io', 'Sprout Social', 'Omnisend', 'Mailersend']
  },
  {
    title: 'HR & TALENT MANAGEMENT',
    services: ['Workday', 'BambooHR', 'Deel', 'Rippling', 'Greenhouse', 'Lever', 'Workable', 'Gusto', 'HiBob', 'Paylocity', 'SuccessFactors', 'Fountain', 'Lattice', '15Five', 'Oyster', 'Remote', 'Culture Amp']
  },
  {
    title: 'CLOUD & DATA WAREHOUSES',
    services: ['AWS', 'Google Cloud', 'Azure', 'Snowflake', 'Databricks', 'BigQuery', 'Redshift', 'MongoDB', 'PostgreSQL', 'Redis', 'Elasticsearch', 'Kafka', 'Supabase', 'Vercel', 'Netlify', 'Heroku', 'DigitalOcean', 'PlanetScale']
  },
  {
    title: 'E-COMMERCE & RETAIL',
    services: ['Shopify', 'WooCommerce', 'Magento', 'BigCommerce', 'Salesforce Commerce Cloud', 'Etsy', 'Amazon Seller Central', 'eBay', 'Wix eCommerce', 'Square Online', 'PrestaShop', 'Printful', 'Shippo', 'ShipStation']
  },
  {
    title: 'SUPPORT & HELPDESK',
    services: ['Zendesk', 'Freshdesk', 'Salesforce Service Cloud', 'ServiceNow', 'Jira Service Management', 'Help Scout', 'Front', 'Kustomer', 'HappyFox', 'Gorgias', 'Kayako', 'Dixa', 'Reamaze']
  },
  {
    title: 'AUTOMATION & PROTOCOLS',
    services: ['n8n', 'Make.com', 'Zapier', 'IFTTT', 'Pabbly Connect', 'Workato', 'Tray.io', 'MuleSoft', 'Celigo', 'REST API', 'GraphQL', 'Webhooks', 'gRPC', 'SOAP', 'EDI', 'FTP/SFTP', 'Boomi', 'Jitterbit', 'SnapLogic']
  }
];

const PACKAGE_TABS = [
  {
    id: 'support',
    label: 'Support & Service',
    bundles: [
      { id: 'sup_pkg1', name: 'Support Starter', price: 499, highlight: false, features: 4, colors: ['#9ca3af', '#d1d5db'] },
      { id: 'sup_pkg2', name: 'Support Growth', price: 999, highlight: true, features: 7, colors: ['#4facfe', '#00f2fe'] },
      { id: 'sup_pkg3', name: 'Support Scale', price: 1999, highlight: false, features: 10, colors: ['#34d399', '#10b981'] },
      { id: 'sup_pkg4', name: 'Support Elite', price: 3499, highlight: false, features: 12, colors: ['#c084fc', '#a855f7'] },
    ]
  },
  {
    id: 'sales',
    label: 'Sales & Marketing',
    bundles: [
      { id: 'sal_pkg1', name: 'Sales Starter', price: 599, highlight: false, features: 5, colors: ['#9ca3af', '#d1d5db'] },
      { id: 'sal_pkg2', name: 'Sales Accelerate', price: 1299, highlight: true, features: 8, colors: ['#fb923c', '#f97316'] },
      { id: 'sal_pkg3', name: 'Sales Ascend', price: 2499, highlight: false, features: 11, colors: ['#f472b6', '#ec4899'] },
      { id: 'sal_pkg4', name: 'Sales Dominator', price: 4999, highlight: false, features: 12, colors: ['#fb7185', '#e11d48'] },
    ]
  },
  {
    id: 'custom',
    label: 'Custom',
    bundles: [
      { id: 'cus_pkg1', name: 'Pilot Program', price: 'Contact', highlight: false, features: 6, colors: ['#9ca3af', '#d1d5db'] },
      { id: 'cus_pkg2', name: 'Departmental', price: 'Contact', highlight: false, features: 9, colors: ['#38bdf8', '#0ea5e9'] },
      { id: 'cus_pkg3', name: 'Enterprise Core', price: 'Contact', highlight: true, features: 12, colors: ['#e879f9', '#d946ef'] },
      { id: 'cus_pkg4', name: 'Global Nexus', price: 'Contact', highlight: false, features: 12, colors: ['#fbbf24', '#f59e0b'] },
    ]
  }
];

const FeatureAccordion = ({ feature, isIncluded, color1 }: { feature: any, isIncluded: boolean, color1: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isHighlighted = feature.id === 'crm' || feature.id === 'switchboard' || feature.id === 'screen-share';
  const IconComponent = feature.icon || CheckCircle2;
  return (
    <div className={`border-b border-white/5 py-3 ${isIncluded ? 'opacity-100' : 'opacity-30 grayscale pointer-events-none'}`}>
       <button onClick={() => isIncluded && setIsOpen(!isOpen)} className="flex items-center justify-between w-full text-left focus:outline-none group">
           <div className="flex items-center gap-3">
               <IconComponent className="w-4 h-4" style={{ color: isIncluded ? color1 : 'rgba(255,255,255,0.2)' }} />
               <span className={`font-sans text-[9px] sm:text-[10px] uppercase tracking-wider transition-colors ${isHighlighted ? 'text-amber-300 font-bold drop-shadow-[0_0_5px_rgba(252,211,77,0.5)]' : 'text-white group-hover:text-white/80'}`}>{feature.name}</span>
           </div>
           {isIncluded && <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''} ${isHighlighted ? 'text-amber-300/80' : 'text-white/50'}`} />}
       </button>
       <AnimatePresence>
         {isOpen && (
           <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <ul className="pl-7 mt-3 space-y-2">
                 {feature.subFeatures.map((sf: string, i: number) => (
                   <li key={i} className="text-[9px] font-sans text-white/60 flex items-center gap-2">
                     <div className="w-1 h-1 rounded-full shadow-[0_0_5px_currentColor]" style={{ backgroundColor: color1, color: color1 }} />
                     {sf}
                   </li>
                 ))}
              </ul>
           </motion.div>
         )}
       </AnimatePresence>
    </div>
  );
};

export const Pricing = () => {
  const [activeTab, setActiveTab] = useState(PACKAGE_TABS[0].id);
  const activeTabData = PACKAGE_TABS.find(t => t.id === activeTab);
  
  // Voice Hours Calculator State
  const [voiceHours, setVoiceHours] = useState(100);
  const VOICE_HOUR_RATE = 7;
  const voiceCost = voiceHours * VOICE_HOUR_RATE;

  // ROI Calculator State
  const [roiIndustry, setRoiIndustry] = useState(INDUSTRY_TECH[0].id);
  const [roiRole, setRoiRole] = useState('service');
  const [workersCount, setWorkersCount] = useState(10);
  
  const ROLES = [
    { id: 'sales', label: 'Sales Representative' },
    { id: 'service', label: 'Customer Service Agent' },
    { id: 'support', label: 'Technical Support' }
  ];
  
  // Base average monthly salary mapping for simulation based on industry and role
  // Adjusted to ranges between $4,000 and $7,000
  const getIndustryData = (indId: string, roleId: string) => {
    const baseMonthly: Record<string, number> = {
      'defense': 6500, 'govt': 5500, 'logistics': 4500, 'marketing': 5500,
      'finance': 6000, 'academic': 4800, 'factory': 4200, 'hospitality': 4000,
      'shipping': 4300, 'construction': 5000, 'healthcare': 5800, 'realestate': 5200,
      'energy': 6000, 'agriculture': 4000, 'retail': 4000, 'automotive': 4800,
      'entertainment': 5000, 'telecomm': 5500, 'pharma': 6200, 'aerospace': 6500
    };
    
    const base = baseMonthly[indId] || 5000; 
    
    // Role modifiers
    const roleModifiers: Record<string, { multiplier: number, dailyCases: number, avgTimeMins: string }> = {
      'sales': { multiplier: 1.15, dailyCases: 30, avgTimeMins: '15m - 2h' },     // Lower interaction volume, higher value
      'service': { multiplier: 0.85, dailyCases: 100, avgTimeMins: '3m - 10m' },  // High volume routine interactions
      'support': { multiplier: 1.0, dailyCases: 60, avgTimeMins: '10m - 15m' }     // Moderate volume, higher complexity
    };
    const roleParams = roleModifiers[roleId] || roleModifiers['service'];
    
    // Calculate final monthly between 4k-7k roughly
    const rawSalary = Math.round(base * roleParams.multiplier);
    const clampedSalary = Math.max(4000, Math.min(7000, rawSalary));

    const automationPercentage = 70;

    return {
       monthlySalary: clampedSalary,
       dailyCases: roleParams.dailyCases,
       avgTimeMins: roleParams.avgTimeMins,
       automationPercentage,
       explanation: `Within ${indId || 'operations'}, AI agents effectively map standard structural workflows. Based on market telemetry, up to ${automationPercentage}% of the ${roleParams.dailyCases} daily tickets handled per ${roleId} employee can be fully resolved autonomously without human intervention.`
    };
  };

  const currentData = getIndustryData(roiIndustry, roiRole);
  const monthlySavings = (workersCount * currentData.monthlySalary) * (currentData.automationPercentage / 100);
  const aiResolvedCases = Math.round(currentData.dailyCases * (currentData.automationPercentage / 100));
  
  // Organization Monthly Volumes (22 working days)
  const orgMonthlyTotalCases = workersCount * currentData.dailyCases * 22;
  const orgMonthlyAiResolved = Math.round(orgMonthlyTotalCases * (currentData.automationPercentage / 100));
  const orgMonthlyHumanRemaining = orgMonthlyTotalCases - orgMonthlyAiResolved;

  const generateChartData = () => {
    const steps = [0.2, 0.5, 1, 1.5, 2];
    return steps.map(multiplier => {
       const simWorkers = Math.max(1, Math.round(workersCount * multiplier));
       const totalCases = simWorkers * currentData.dailyCases * 22;
       const humanCost = simWorkers * currentData.monthlySalary;
       const aiResolvedCasesSim = totalCases * (currentData.automationPercentage / 100);
       
       let avgMins = 10;
       if (currentData.avgTimeMins.includes('10m')) avgMins = 5;
       else if (currentData.avgTimeMins.includes('2h')) avgMins = 60;
       else if (currentData.avgTimeMins.includes('15m')) avgMins = 12;

       const savedHours = Math.round((aiResolvedCasesSim * avgMins) / 60);
       const projectedRed = humanCost * (currentData.automationPercentage / 100);

       return {
          name: `${totalCases.toLocaleString()} Cases`,
          cases: totalCases,
          savedHours: savedHours,
          "Fully Human Cost": humanCost,
          "Projected Reduction": Math.round(projectedRed)
       };
    });
  };

  const chartData = generateChartData();

  const generateVoiceChartData = () => {
    return [
      { name: 'Week 1', cost: Math.round(voiceCost * 0.22), hours: Math.round(voiceHours * 0.22) },
      { name: 'Week 2', cost: Math.round(voiceCost * 0.25), hours: Math.round(voiceHours * 0.25) },
      { name: 'Week 3', cost: Math.round(voiceCost * 0.28), hours: Math.round(voiceHours * 0.28) },
      { name: 'Week 4', cost: Math.round(voiceCost * 0.25), hours: Math.round(voiceHours * 0.25) },
    ];
  };

  const voiceChartData = generateVoiceChartData();

  return (
    <section className="relative pt-32 pb-56 min-h-screen bg-[#010610] text-white overflow-hidden font-sans">
      <DeepOceanBackground />

      <div className="container mx-auto px-6 relative z-20">
        
        {/* Header */}
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex flex-col items-center gap-6"
          >
            <div className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#4facfe] p-3 border border-[#4facfe]/20 rounded-full bg-[#4facfe]/5 flex items-center gap-3">
              <Hexagon className="w-4 h-4" /> SECTOR PRICING PROTOCOLS
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-black uppercase italic tracking-tighter leading-[0.9] text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              Plan <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4facfe] to-[#00f2fe]">Configuration</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-200/50 font-mono tracking-wide mt-4">
              Select the optimal deployment scale for your organization.
            </p>
          </motion.div>
        </div>

        {/* Tabs Selection */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16 relative z-30">
          {PACKAGE_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-4 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] transition-all rounded-full border ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-[#4facfe] to-[#00f2fe] text-[#010610] border-transparent shadow-[0_0_20px_rgba(79,172,254,0.4)]' 
                  : 'bg-[#05101a] border-white/10 text-white/50 hover:text-white hover:border-[#4facfe]/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-[1400px] mx-auto mb-40 relative z-20">
          <AnimatePresence mode="popLayout">
            {activeTabData?.bundles.map((bundle, i) => (
              <motion.div
                key={bundle.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`flex flex-col relative bg-[#020617]/80 backdrop-blur-md rounded-3xl border transition-all duration-300 ${
                  bundle.highlight 
                    ? 'z-10 lg:-translate-y-4' 
                    : 'border-white/10 hover:border-white/30 z-0'
                }`}
                style={bundle.highlight ? { borderColor: bundle.colors[0], boxShadow: `0 0 30px ${bundle.colors[0]}25` } : {}}
              >
                {bundle.highlight && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 text-[#010610] font-sans text-[9px] font-black uppercase tracking-[0.3em] rounded-full" style={{ backgroundColor: bundle.colors[0], boxShadow: `0 0 15px ${bundle.colors[0]}99` }}>
                    Recommended
                  </div>
                )}
                <div className="p-8 border-b border-white/5 flex flex-col items-center text-center">
                  <h3 className="text-xl font-display font-black tracking-widest uppercase mb-4 text-white">
                    {bundle.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1 mb-6">
                    {bundle.price !== 'Contact' && <span className="text-lg font-sans opacity-50" style={{ color: bundle.colors[0] }}>$</span>}
                    <span className={`text-5xl font-display font-light tracking-tighter ${bundle.highlight ? 'text-transparent bg-clip-text' : 'text-white'}`} style={bundle.highlight ? { backgroundImage: `linear-gradient(to right, ${bundle.colors[0]}, ${bundle.colors[1]})` } : {}}>
                      {bundle.price}
                    </span>
                    {bundle.price !== 'Contact' && <span className="text-[9px] uppercase font-sans text-white/30 ml-2">/ MO</span>}
                  </div>
                  <button className={`w-full py-4 text-[10px] font-sans font-black uppercase tracking-[0.3em] rounded-xl transition-all ${
                    !bundle.highlight 
                      ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                      : 'text-[#010610]'
                  }`}
                  style={bundle.highlight ? { backgroundImage: `linear-gradient(to right, ${bundle.colors[0]}, ${bundle.colors[1]})`, boxShadow: `0 0 20px ${bundle.colors[0]}66` } : {}}>
                    {bundle.price === 'Contact' ? 'Get Quote' : 'Deploy Scope'}
                  </button>
                </div>
                {/* Accordion Features List */}
                <div className="p-6 flex-1 text-left flex flex-col overflow-y-auto max-h-[600px] styled-scrollbars">
                   {ACCORDION_FEATURES.map((feature, fIndex) => (
                     <FeatureAccordion 
                       key={feature.id} 
                       feature={feature} 
                       isIncluded={fIndex < bundle.features} 
                       color1={bundle.colors[0]}
                     />
                   ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Double Calculators Section */}
        <div className="max-w-[1400px] mx-auto mb-40 relative z-20">
           <div className="text-center mb-16">
              <div className="inline-flex items-center gap-4 text-[10px] font-mono tracking-[0.4em] uppercase text-[#4facfe] mb-6 bg-[#4facfe]/10 px-4 py-2 rounded-sm border border-[#4facfe]/20">
                <Calculator className="w-4 h-4" /> Operations Forecasting
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tighter">
                Cost Benefit Calculators
              </h2>
           </div>

           <div className="grid grid-cols-1 gap-12">
             
             {/* 1. Voice Hours Calculator */}
             <div className="border border-white/10 bg-[#020617]/80 backdrop-blur-md rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col h-full">
                <div className="p-8 border-b border-white/5 bg-gradient-to-r from-blue-500/10 to-transparent">
                  <h3 className="text-xl sm:text-2xl font-display font-black uppercase tracking-widest text-[#4facfe] flex items-center gap-4">
                     <Headphones className="w-6 h-6" /> Voice Operations Cost
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-white/50 mt-2">
                    Calculates estimated monthly expense based on needed communication hours. Based on a flat rate of $7.00 per hour of neural voice processing.
                  </p>
                </div>
                <div className="p-8 md:p-12 flex-1 flex flex-col md:flex-row items-center gap-12 justify-between">
                   
                   <div className="w-full flex-1">
                      <div className="flex justify-between items-end mb-6">
                         <label htmlFor="voiceHoursSlider" className="font-mono text-xs text-white/60 uppercase tracking-widest flex items-center gap-2">
                           <Activity className="w-4 h-4 text-[#4facfe]" /> Comm Hours Needed
                         </label>
                         <span className="font-display text-3xl sm:text-4xl font-black text-white tracking-widest">
                           {voiceHours.toLocaleString()}<span className="text-lg text-white/30 ml-2">HR</span>
                         </span>
                      </div>
                      <input 
                        id="voiceHoursSlider"
                        type="range" 
                        min="1" 
                        max="10000" 
                        step="10"
                        value={voiceHours}
                        onChange={(e) => setVoiceHours(parseInt(e.target.value))}
                        className="w-full appearance-none h-2 bg-white/10 rounded outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#4facfe] [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(79,172,254,1)] cursor-pointer"
                      />
                      <div className="flex justify-between mt-4 font-mono text-[9px] text-white/30 uppercase tracking-widest">
                        <span>1 HR</span>
                        <span>10,000+ HR</span>
                      </div>
                   </div>

                   <div className="md:border-l border-t md:border-t-0 border-white/5 pt-8 md:pt-0 md:pl-12 flex flex-col justify-center items-start shrink-0">
                     <div className="font-mono text-[9px] uppercase tracking-widest text-white/40 mb-2">
                       Estimated Monthly Billing
                     </div>
                     <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-mono text-[#00f2fe]/60">$</span>
                        <span className="text-5xl sm:text-6xl font-display font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#4facfe] to-[#00f2fe]">
                          {voiceCost.toLocaleString()}
                        </span>
                     </div>
                   </div>

                </div>
             </div>

             {/* 2. ROI Savings Calculator */}
             <div className="border border-emerald-500/30 bg-[#020617]/80 backdrop-blur-md rounded-2xl shadow-[0_0_50px_rgba(16,185,129,0.15)] overflow-hidden flex flex-col h-fit">
                <div className="p-8 border-b border-white/5 bg-gradient-to-r from-emerald-500/10 to-transparent">
                  <h3 className="text-xl sm:text-2xl font-display font-black uppercase tracking-widest text-emerald-400 flex items-center gap-4">
                     <TrendingUp className="w-6 h-6" /> Agentic ROI & Savings
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-white/50 mt-2">
                    Calculates projected monthly financial savings. Based on automating 70% of human workload for your chosen industry and operational role.
                  </p>
                </div>
                <div className="p-8 md:p-12 flex-1 flex flex-col justify-center gap-8">
                   
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div>
                       <label htmlFor="industrySelect" className="font-mono text-xs text-white/60 uppercase tracking-widest flex items-center gap-2 mb-4">
                         <Building2 className="w-4 h-4 text-emerald-400" /> Sector Protocol
                       </label>
                       <div className="relative">
                         <select 
                            id="industrySelect"
                            value={roiIndustry}
                            onChange={(e) => setRoiIndustry(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white font-mono text-xs md:text-sm uppercase tracking-wider outline-none focus:border-emerald-400/50 appearance-none cursor-pointer hover:bg-white/10 transition-colors"
                         >
                           {INDUSTRY_TECH.map(ind => (
                             <option key={ind.id} value={ind.id} className="bg-[#010610] text-white py-2">
                               {ind.name}
                             </option>
                           ))}
                         </select>
                         <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                       </div>
                     </div>

                     <div>
                       <label htmlFor="roleSelect" className="font-mono text-xs text-white/60 uppercase tracking-widest flex items-center gap-2 mb-4">
                         <Users className="w-4 h-4 text-emerald-400" /> Operational Role
                       </label>
                       <div className="relative">
                         <select 
                            id="roleSelect"
                            value={roiRole}
                            onChange={(e) => setRoiRole(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white font-mono text-xs md:text-sm uppercase tracking-wider outline-none focus:border-emerald-400/50 appearance-none cursor-pointer hover:bg-white/10 transition-colors"
                         >
                           {ROLES.map(role => (
                             <option key={role.id} value={role.id} className="bg-[#010610] text-white py-2">
                               {role.label}
                             </option>
                           ))}
                         </select>
                         <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                       </div>
                     </div>
                   </div>
                   
                   <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest flex flex-col md:flex-row md:items-center justify-between border-t border-white/5 pt-4 mt-[-1rem] gap-4">
                     <span>Role Monthly Salary Basis:</span>
                     <span className="text-emerald-400 text-2xl md:text-4xl font-display font-black tracking-tighter flex items-baseline">
                        <span className="text-2xl text-emerald-400/70 mr-1">$</span>
                        {currentData.monthlySalary.toLocaleString()}
                        <span className="text-sm font-mono tracking-widest text-emerald-400/50 ml-2">/MO</span>
                     </span>
                   </div>

                   <div className="mt-4">
                      <div className="flex justify-between items-end mb-6">
                         <label htmlFor="workersSlider" className="font-mono text-xs text-white/60 uppercase tracking-widest flex items-center gap-2">
                           <Users className="w-4 h-4 text-emerald-400" /> Organization Headcount
                         </label>
                         <span className="font-display text-3xl sm:text-4xl font-black text-white tracking-widest">
                           {workersCount.toLocaleString()}
                         </span>
                      </div>
                      <input 
                        id="workersSlider"
                        type="range" 
                        min="1" 
                        max="500" 
                        step="1"
                        value={workersCount}
                        onChange={(e) => setWorkersCount(parseInt(e.target.value))}
                        className="w-full appearance-none h-2 bg-white/10 rounded outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-400 [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(52,211,153,0.8)] cursor-pointer"
                      />
                      <div className="flex justify-between mt-4 font-mono text-[9px] text-white/30 uppercase tracking-widest">
                        <span>1 Employee</span>
                        <span>500+ Employees</span>
                      </div>
                   </div>

                   {/* Case Volume and Automation Telemetry */}
                   <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-6 mt-2 relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-20 h-20 bg-[radial-gradient(ellipse_at_center,_rgba(52,211,153,0.15)_0%,_transparent_70%)] pointer-events-none" />
                     <p className="font-sans text-xs text-emerald-400/90 leading-relaxed mb-4">
                       {currentData.explanation}
                     </p>
                     <div className="space-y-3 pt-4 border-t border-emerald-500/20">
                       <div className="flex justify-between items-center font-mono text-[10px] text-white/60 uppercase tracking-widest">
                         <span>Human Baseline (Cases/Day):</span>
                         <span className="text-white font-bold">{currentData.dailyCases}</span>
                       </div>
                       <div className="flex justify-between items-center font-mono text-[10px] text-white/60 uppercase tracking-widest">
                         <span>Avg Case Handling Time:</span>
                         <span className="text-white font-bold">{currentData.avgTimeMins}</span>
                       </div>
                       <div className="flex justify-between items-center font-mono text-[10px] text-white/60 uppercase tracking-widest">
                         <span>AI Projected Resolution:</span>
                         <span className="text-emerald-400 font-bold">{currentData.automationPercentage}% ({aiResolvedCases} cases)</span>
                       </div>
                     </div>
                   </div>

                   <div className="mt-auto pt-8 border-t border-white/5 space-y-6">
                     <div className="flex flex-col xl:flex-row items-center justify-between gap-6 border-b border-white/5 pb-4">
                       <div className="font-mono text-[9px] uppercase tracking-widest text-white/50 leading-relaxed max-w-[150px] text-center xl:text-left">
                         Fully Human Cost (Monthly)
                       </div>
                       <div className="flex items-baseline gap-2">
                          <span className="text-xl font-mono text-white/40">$</span>
                          <span className="text-2xl lg:text-3xl font-display font-black tracking-tighter text-white/80">
                            {(workersCount * currentData.monthlySalary).toLocaleString()}
                          </span>
                       </div>
                     </div>
                     <div className="flex flex-col xl:flex-row items-center justify-between gap-6">
                       <div className="font-mono text-[9px] uppercase tracking-widest text-emerald-500/60 leading-relaxed max-w-[150px] text-center xl:text-left">
                         Projected Monthly Cost Reduction
                       </div>
                       <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-mono text-emerald-400/60">$</span>
                          <span className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-500">
                            {(Math.round(monthlySavings)).toLocaleString()}
                          </span>
                       </div>
                     </div>
                     <div className="bg-[#050b14] p-4 rounded-xl border border-white/5 flex gap-4 text-center divide-x divide-white/5">
                        <div className="flex-1">
                          <div className="text-[10px] font-mono uppercase text-white/40 tracking-wider mb-2">Total Monthly Cases</div>
                          <div className="font-bold text-white tracking-widest">{orgMonthlyTotalCases.toLocaleString()}</div>
                        </div>
                        <div className="flex-1">
                          <div className="text-[10px] font-mono uppercase text-emerald-500/70 tracking-wider mb-2">AI Solved</div>
                          <div className="font-bold text-emerald-400 tracking-widest">{orgMonthlyAiResolved.toLocaleString()}</div>
                        </div>
                        <div className="flex-1">
                          <div className="text-[10px] font-mono uppercase text-white/40 tracking-wider mb-2">Human Delegated</div>
                          <div className="font-bold text-white/80 tracking-widest">{orgMonthlyHumanRemaining.toLocaleString()}</div>
                        </div>
                     </div>
                     
                     <div className="mt-8 h-48 w-full">
                       <ResponsiveContainer width="100%" height="100%">
                         <ComposedChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                           <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                           <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={10} tick={{fill: 'rgba(255,255,255,0.4)'}} />
                           <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} tick={{fill: 'rgba(255,255,255,0.4)'}} tickFormatter={(val) => val >= 1000 ? `$${(val/1000).toFixed(0)}k` : `$${val}`} />
                           <RechartsTooltip 
                             contentStyle={{ backgroundColor: 'rgba(5, 11, 20, 0.9)', borderColor: 'rgba(52, 211, 153, 0.2)', borderRadius: '8px' }}
                             itemStyle={{ color: '#fff', fontSize: '12px' }}
                             labelStyle={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', marginBottom: '8px' }}
                             formatter={(value: any, name: string) => {
                               if (name === 'Saved Hours') return [`${value.toLocaleString()} hrs`, name];
                               return [`$${value.toLocaleString()}`, name];
                             }}
                           />
                           <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                           <Bar dataKey="Fully Human Cost" fill="rgba(255,255,255,0.1)" radius={[4, 4, 0, 0]} />
                           <Bar dataKey="Projected Reduction" fill="#34d399" radius={[4, 4, 0, 0]} />
                           <Line type="monotone" dataKey="savedHours" name="Saved Hours" stroke="#4facfe" strokeWidth={2} dot={{ fill: '#4facfe', r: 3 }} />
                         </ComposedChart>
                       </ResponsiveContainer>
                     </div>

                   </div>

                </div>
             </div>

           </div>
        </div>

        {/* Brand Information Section */}
        <div className="max-w-4xl mx-auto relative z-20">
            <div className="space-y-8">
              <div className="font-mono text-[#4facfe] text-xs tracking-[0.4em] uppercase font-bold flex items-center gap-4">
                <div className="w-2 h-2 bg-[#4facfe] animate-pulse shadow-[0_0_10px_rgba(79,172,254,0.8)]" />
                System Integration
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black uppercase tracking-tighter">
                ALL AI INTEGRATIONS & AUTOMATIONS ARE INCLUDED
              </h2>
              <p className="font-sans text-white/60 text-lg leading-relaxed">
                Seamlessly connected to enterprise services, communication channels, and advanced automation webhooks for absolute operational freedom.
              </p>
              
              <div className="space-y-2 mt-8">
                {INTEGRATION_CATEGORIES.map((cat) => (
                  <div key={cat.title} className="border border-white/10 bg-[#05101a]/50 rounded-lg overflow-hidden transition-colors hover:border-[#4facfe]/30">
                    <button 
                      className="w-full text-left px-5 py-4 font-mono text-[10px] uppercase tracking-widest flex items-center justify-between group"
                      onClick={(e) => {
                        const content = e.currentTarget.nextElementSibling;
                        if (content) {
                          content.classList.toggle('hidden');
                          e.currentTarget.querySelector('svg')?.classList.toggle('rotate-180');
                        }
                      }}
                    >
                      <span className="text-[#4facfe] leading-none">{cat.title}</span>
                      <ChevronDown className="w-4 h-4 text-white/40 transition-transform duration-300 group-hover:text-white" />
                    </button>
                    <div className="hidden px-5 pb-5 pt-2">
                      <div className="flex flex-wrap gap-2">
                        {cat.services.map(s => (
                          <span key={s} className="px-3 py-1.5 bg-[#4facfe]/5 border border-[#4facfe]/20 rounded text-[10px] font-mono text-white/60 uppercase tracking-wider">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </div>

      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .styled-scrollbars::-webkit-scrollbar {
          width: 4px;
        }
        .styled-scrollbars::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .styled-scrollbars::-webkit-scrollbar-thumb {
          background: rgba(79, 172, 254, 0.2);
          border-radius: 4px;
        }
        .styled-scrollbars:hover::-webkit-scrollbar-thumb {
          background: rgba(79, 172, 254, 0.5);
        }
      `}} />
    </section>
  );
};

export default Pricing;

