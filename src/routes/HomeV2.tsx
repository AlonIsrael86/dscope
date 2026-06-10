// HOME-V2 - the smoothness-overhauled home route. PROMOTED 2026-06-10 to
// BE the home page: App.tsx renders this for the 'home' tab (the old inline
// home block + the temporary /home-v2 route were removed). Pixel-identical
// to the previous home; only the rendering machinery is cheaper.
//
// Same composition as the old home block, with these perf changes:
//   - GalaxyBackgroundV2 (canvas stars, CSS comets, compositor sun pulse)
//   - HeroV2 (CSS node grid, gradient glow instead of blur-[150px])
//   - hero internals gated: once you scroll well past the pinned hero,
//     its marquee + grid unmount (v1 keeps them animating forever)
//   - IndustryAutomation gated with InViewGate (ungated in v1)
//   - existing v1 gates on the lower sections kept as-is
//
// SEO: route-scoped JSON-LD (Organization + WebSite + WebPage +
// SoftwareApplication) injected on mount, removed on unmount. Titles /
// meta description come from PAGE_TITLES / PAGE_DESCRIPTIONS in App.tsx.
// The site-wide noindex stack stays in force per the DESIGN.md indexing
// rule - this page ships crawl-ready for the day noindex lifts.
import React from 'react';
import { motion } from 'motion/react';
import { InViewGate } from '../components/InViewGate';
import { GalaxyBackgroundV2 } from '../components/v2/GalaxyBackgroundV2';
import { HeroV2 } from '../components/v2/HeroV2';
import { RealClientCases } from './RealClientCases';
import {
  IndustryAutomation,
  SecretarialBlueprint,
  LunarCommandHub,
  FeatureObjectCard,
  WritingTitle,
  PinnedScrollSection,
} from '../App';

const HOME_V2_JSONLD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://dscope.targetbob.ai/#organization',
      name: 'Dscope',
      url: 'https://dscope.targetbob.ai/',
      logo: 'https://dscope.targetbob.ai/favicon.svg',
      description:
        'Dscope is an enterprise AI automation platform: AI agents for customer support, service, sales and marketing automation with CRM integrations.',
      sameAs: ['https://app.targetbob.ai/'],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://dscope.targetbob.ai/#website',
      url: 'https://dscope.targetbob.ai/',
      name: 'Dscope - Enterprise AI Automation Platform',
      publisher: { '@id': 'https://dscope.targetbob.ai/#organization' },
      inLanguage: 'en',
    },
    {
      '@type': 'WebPage',
      '@id': 'https://dscope.targetbob.ai/#webpage',
      url: 'https://dscope.targetbob.ai/',
      name: 'Dscope - Enterprise AI Automation Platform',
      isPartOf: { '@id': 'https://dscope.targetbob.ai/#website' },
      about: { '@id': 'https://dscope.targetbob.ai/#organization' },
      description:
        'Multi-tasking AI automation platform: AI agents that automate customer support, service, sales and marketing, with integrations for Salesforce, HubSpot, Zoho and other CRM systems.',
      inLanguage: 'en',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Dscope',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: 'https://dscope.targetbob.ai/',
      description:
        'Enterprise AI automation platform - AI chat, voice and form agents that capture leads, answer customers and integrate with CRM systems such as Salesforce, HubSpot and Zoho.',
      featureList: [
        'AI customer support automation',
        'AI sales and lead-capture agents',
        'Voice, chat and form agents',
        'CRM integration (Salesforce, HubSpot, Zoho)',
        'Page-aware website widgets',
        'Industry-specific automation flows',
      ],
    },
  ],
};

const useHomeV2JsonLd = () => {
  React.useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'home-v2-jsonld';
    script.textContent = JSON.stringify(HOME_V2_JSONLD);
    document.head.appendChild(script);
    return () => {
      document.getElementById('home-v2-jsonld')?.remove();
    };
  }, []);
};

// PinnedScrollSection clones its direct child with a `progress` prop;
// this gate forwards it to HeroV2 while adding the unmount-when-far
// behavior. initialInView so the first paint always includes the hero.
const HeroGate = ({ progress }: { progress?: any }) => (
  <InViewGate minHeight="100vh" rootMargin="800px 0px" initialInView>
    <HeroV2 progress={progress} />
  </InViewGate>
);

export const HomeV2 = () => {
  useHomeV2JsonLd();

  return (
    <>
      <GalaxyBackgroundV2 />
      <motion.main
        key="home-v2"
        role="main"
        id="main-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-24 md:pt-32 pb-10 md:pb-20 relative"
      >
        {/* Pinned hero, same 150vh geometry as v1. HeroGate keeps the pin
            height while unmounting the hero internals (marquee rAF, node
            grid, springs) once scrolled well past - v1 keeps them running
            for the whole session. */}
        <PinnedScrollSection height="h-[150vh]" innerClassName="flex flex-col justify-center">
          <HeroGate />
        </PinnedScrollSection>

        <InViewGate minHeight="100vh" rootMargin="1600px 0px">
          <IndustryAutomation />
        </InViewGate>

        {/* Seamless Gradient Transition to Schematic */}
        <div className="relative h-64 w-full bg-gradient-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none" />

        <InViewGate minHeight="100vh">
          <SecretarialBlueprint />
        </InViewGate>

        <InViewGate minHeight="150vh">
          <div className="relative" id="orbital-dispatch">
             {/* Translucent separator with gradient glow */}
             <div className="h-40 w-full bg-gradient-to-b from-transparent via-purple-500/10 to-transparent pointer-events-none" />

             {/* Background Glow for Contrast - radial gradients instead of
                 the v1 blur-[120px]/blur-[100px] filter blocks (same look,
                 no Gaussian pass). */}
             <div
               className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-96 pointer-events-none"
               style={{ background: 'radial-gradient(ellipse 55% 60% at 50% 50%, rgba(37,99,235,0.05) 0%, rgba(37,99,235,0) 70%)' }}
               aria-hidden="true"
             />
             <div
               className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-64 pointer-events-none"
               style={{ background: 'radial-gradient(ellipse 50% 55% at 50% 50%, rgba(147,51,234,0.05) 0%, rgba(147,51,234,0) 70%)' }}
               aria-hidden="true"
             />

             <div className="relative z-10">
               <WritingTitle
                   text="Neural Integration Node"
                   className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-blue-400 uppercase tracking-tighter mb-16 justify-center"
                   lightning={true}
                   pulse={true}
               />
               <div
                 role="button"
                 tabIndex={0}
                 className="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 rounded-2xl"
                 onClick={() => {
                   const el = document.getElementById('home-testimonials');
                   if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                 }}
                 onKeyDown={(e) => {
                   if (e.key === 'Enter' || e.key === ' ') {
                     e.preventDefault();
                     const el = document.getElementById('home-testimonials');
                     if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                   }
                 }}
                 aria-label="Scroll to Verified Signal client results"
               >
                 <LunarCommandHub />
               </div>
             </div>
          </div>
        </InViewGate>

        {/* Verified Signal - anchor on the OUTER wrapper so it exists
            before the gate mounts the cards (same pattern as v1). */}
        <div id="home-testimonials">
          <InViewGate minHeight="80vh">
            <RealClientCases />
          </InViewGate>
        </div>

        <InViewGate minHeight="80vh">
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {[
              { title: 'Precision Target', desc: 'Identify operational inefficiencies with sub-millimeter data accuracy using our proprietary neural kernels.', type: 'robot' },
              { title: 'Galactic Reach', desc: 'Seamlessly deploy automation clusters across multi-region cloud infrastructures without latency penalties.', type: 'spaceship' },
              { title: 'Quantum Logic', desc: 'Our decision engines process multi-variate corporate structures in real-time, anticipating markets before they shift.', type: 'ufo' },
            ].map((feature, i) => (
              <FeatureObjectCard key={i} index={i} feature={feature} />
            ))}
          </motion.section>
        </InViewGate>
      </motion.main>
    </>
  );
};

export default HomeV2;
