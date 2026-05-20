// Testimonials section (rendered on Home). Extracted from App.tsx
// (Etap 2 — split monolith). Self-contained, no behavior change.
import { motion } from 'motion/react';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "CEO",
      company: "Nexus Logistics",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      service: "Fleet Routing AI",
      cases: "100% reduction in late deliveries, multi-variate weather optimization."
    },
    {
      name: "David Chen",
      role: "CEO",
      company: "Apex Financial",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
      service: "Risk Modeling Automaton",
      cases: "Processed 10M+ transactional edge cases, zero compliance breaches."
    },
    {
      name: "Elena Rodriguez",
      role: "CEO",
      company: "BioSyn Health",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
      service: "Clinical Data Synchronizer",
      cases: "Unified 50+ isolated health registries into a single normalized data lake."
    }
  ];

  return (
    <section id="testimonials-section" className="py-24 px-6 relative max-w-7xl mx-auto z-20">
      <div className="text-center mb-16">
        <motion.span
           initial={{ opacity: 0, letterSpacing: "0.2em" }}
           whileInView={{ opacity: 1, letterSpacing: "0.5em" }}
           viewport={{ once: true }}
           className="text-[10px] font-mono uppercase text-blue-400 mb-4 block tracking-widest"
         >
           SYSTEM VERIFICATION
         </motion.span>
        <h2 className="text-3xl md:text-5xl font-display font-black text-white tracking-tighter uppercase mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          Testimonials
        </h2>
        <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto italic font-light drop-shadow-md">
          We don't deal in hypotheticals. These are explicit enterprise reality shifts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((test, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 md:p-10 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-white/20 hover:bg-white/[0.04] transition-all flex flex-col items-center text-center group cursor-default relative overflow-hidden backdrop-blur-md shadow-2xl"
          >
            <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity blur-3xl pointer-events-none" />

            <div className="w-24 h-24 mb-6 rounded-full overflow-hidden border border-white/20 group-hover:border-blue-400 group-hover:scale-105 transition-all duration-500 relative z-10 shrink-0 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              <img loading="lazy" src={test.image} alt={test.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
            </div>

            <h3 className="text-xl md:text-2xl font-display font-medium text-white mb-2 group-hover:text-blue-200 transition-colors tracking-tight relative z-10">{test.name}</h3>
            <div className="text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase text-emerald-400 mb-8 relative z-10">
              {test.role} • <span className="text-blue-400">{test.company}</span>
            </div>

            <div className="mb-8 w-full flex flex-col items-center gap-3 relative z-10">
              <span className="text-[9px] text-white/30 uppercase tracking-[0.3em] font-mono whitespace-nowrap">Service Provided</span>
              <span className="px-4 py-2 rounded-xl bg-blue-500/10 text-blue-300 text-xs font-mono border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">{test.service}</span>
            </div>

            <div className="flex flex-col gap-3 w-full pt-8 border-t border-white/10 mt-auto relative z-10">
              <span className="text-[9px] text-white/30 uppercase tracking-[0.3em] font-mono whitespace-nowrap">Cases Solved</span>
              <p className="text-sm md:text-base text-white/70 leading-relaxed font-light italic">
                "{test.cases}"
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
