import { useState } from 'react';
import { Search, Brain, Globe, ArrowRight } from 'lucide-react';

type LensKey = 'ai' | 'seo' | 'geo';

interface LensInsight {
  key: LensKey;
  label: string;
  icon: typeof Brain;
  headline: string;
  metric: string;
  detail: string;
  note: string;
}

const LENSES: LensInsight[] = [
  {
    key: 'ai',
    label: 'AI Visibility',
    icon: Brain,
    headline: 'Cited in 14 of 18 model responses',
    metric: '+38%',
    detail: 'vs. last 30 days across ChatGPT, Claude, Gemini, Perplexity.',
    note: 'Three competitors lost share to your last knowledge-graph update.',
  },
  {
    key: 'seo',
    label: 'Search SEO',
    icon: Search,
    headline: '4 keyword clusters moved into top 3',
    metric: '+12 ranks',
    detail: 'Industrial CAM + automation cluster, last 7 days.',
    note: 'New backlinks from 2 industry publications drove the shift.',
  },
  {
    key: 'geo',
    label: 'Generative GEO',
    icon: Globe,
    headline: 'Picked up as primary source on 6 new prompts',
    metric: '+6 prompts',
    detail: 'Enterprise AI buyer journey, EU + IL geographies.',
    note: 'Schema update on /platform pushed you past 2 competitors.',
  },
];

export function WhatDscopeSees() {
  const [active, setActive] = useState<LensKey>('ai');
  const insight = LENSES.find((l) => l.key === active)!;
  const ActiveIcon = insight.icon;

  return (
    <div
      className="pointer-events-auto select-none rounded-3xl border border-white/10 bg-slate-950/70 p-5 shadow-[0_30px_60px_-20px_rgba(79,172,254,0.35)] backdrop-blur-xl"
      style={{ width: 'min(440px, 88vw)' }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-300/80">
          What dscope sees
        </div>
        <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">
          live
          <span className="ms-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 align-middle" />
        </div>
      </div>

      <div className="mb-4 flex gap-2">
        {LENSES.map((l) => {
          const isActive = l.key === active;
          const Icon = l.icon;
          return (
            <button
              key={l.key}
              type="button"
              onClick={() => setActive(l.key)}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl border px-2.5 py-2 text-xs font-medium transition ${
                isActive
                  ? 'border-cyan-400/60 bg-cyan-400/10 text-white shadow-[0_0_18px_rgba(79,172,254,0.25)_inset]'
                  : 'border-white/10 bg-white/[0.02] text-white/55 hover:border-white/25 hover:text-white/85'
              }`}
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={1.6} />
              <span>{l.label}</span>
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-4">
        <div className="mb-2 flex items-center gap-2">
          <ActiveIcon className="h-4 w-4 text-cyan-300" strokeWidth={1.7} />
          <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-white/45">
            {insight.label}
          </span>
        </div>
        <div className="mb-1 text-[15px] font-medium leading-snug text-white">
          {insight.headline}
        </div>
        <div className="mb-3 flex items-baseline gap-2">
          <span className="bg-gradient-to-r from-[#4facfe] to-[#00f2fe] bg-clip-text text-2xl font-bold text-transparent">
            {insight.metric}
          </span>
          <span className="text-xs text-white/55">{insight.detail}</span>
        </div>
        <div className="text-[12px] leading-snug text-white/60">{insight.note}</div>
      </div>

      <button
        type="button"
        onClick={() => (window.location.href = '/contact')}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-400/50 bg-gradient-to-r from-[#4facfe] to-[#00f2fe] px-4 py-2.5 text-sm font-medium text-slate-950 transition hover:brightness-110"
      >
        See what dscope sees for you
        <ArrowRight className="h-4 w-4" strokeWidth={2} />
      </button>
    </div>
  );
}
