// Route: /contact
// Placeholder until the full contact form is built.
export const ContactPlaceholder = () => (
  <section className="relative z-10 min-h-screen flex items-center justify-center px-6 py-32">
    <div className="max-w-2xl w-full text-center">
      <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-blue-400 mb-6 block">Get in touch</span>
      <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter uppercase text-white mb-8">Contact</h1>
      <p className="text-white/60 text-lg md:text-xl mb-12 leading-relaxed">
        Let's talk about scaling your enterprise with planetary-grade AI automation.
      </p>
      <div className="space-y-4 font-mono text-sm">
        <a href="mailto:hello@dscope.ai" className="block text-emerald-400 hover:text-emerald-300 transition-colors">
          hello@dscope.ai
        </a>
        <p className="text-white/30 text-[10px] uppercase tracking-widest">Full contact form coming soon</p>
      </div>
    </div>
  </section>
);
