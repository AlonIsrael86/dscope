import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useMotionValue, animate, useTransform, AnimatePresence } from 'motion/react';
import { X, Send } from 'lucide-react';

export const FlybyObject = ({ flybyType, width = 1000, height = 600, renderCurrentObject, children, className, style, onComplete }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const progress = useMotionValue(0);
  const controlsRef = useRef<any>(null);
  const hoverTimerRef = useRef<any>(null);
  const completeTimerRef = useRef<any>(null);

  const repeatDelay = useMemo(() => 1 + Math.random() * 2, [flybyType]);

  useEffect(() => {
    progress.set(0);
    const controls = animate(progress, 1, {
      duration: width < 768 ? 10 : 15,
      ease: "linear",
      onComplete: () => {
        if (onComplete) {
          completeTimerRef.current = setTimeout(() => {
            onComplete();
          }, repeatDelay * 1000);
        }
      }
    });
    controlsRef.current = controls;

    if (isHovered) {
      controls.pause();
    }

    return () => {
      controls.stop();
      if (completeTimerRef.current) {
        clearTimeout(completeTimerRef.current);
      }
    };
  }, [flybyType, repeatDelay, progress, width, onComplete]); // isHovered removed from deps!

  const [phraseIndex, setPhraseIndex] = useState(0);

  const phraseConfig = useMemo(() => [
    {
       text: "Hi again, improve your automation to save millions of dollars.",
       slogan: "Cost Reduction Initiative",
       borderColor: "border-green-400/30",
       textColor: "text-green-300",
       accentColor: "bg-green-400",
       glowColor: "bg-green-400/5",
       shadow: "shadow-[0_0_20px_rgba(74,222,128,0.5)]",
       buttonBg: "bg-green-500/20 hover:bg-green-500/40 border-green-400/30",
       inputFocus: "focus:border-green-400/50 placeholder:text-green-500/40 text-green-100"
    },
    {
       text: "Streamline your entire operation with our advanced AI core.",
       slogan: "Core AI Upgrade",
       borderColor: "border-purple-400/30",
       textColor: "text-purple-300",
       accentColor: "bg-purple-400",
       glowColor: "bg-purple-400/5",
       shadow: "shadow-[0_0_20px_rgba(192,132,252,0.5)]",
       buttonBg: "bg-purple-500/20 hover:bg-purple-500/40 border-purple-400/30",
       inputFocus: "focus:border-purple-400/50 placeholder:text-purple-500/40 text-purple-100"
    },
    {
       text: "Ready to scale production? Deploy autonomous nodes today.",
       slogan: "Node Deployment",
       borderColor: "border-orange-400/30",
       textColor: "text-orange-300",
       accentColor: "bg-orange-400",
       glowColor: "bg-orange-400/5",
       shadow: "shadow-[0_0_20px_rgba(251,146,60,0.5)]",
       buttonBg: "bg-orange-500/20 hover:bg-orange-500/40 border-orange-400/30",
       inputFocus: "focus:border-orange-400/50 placeholder:text-orange-500/40 text-orange-100"
    },
    {
       text: "Targetbob at your service. Let's optimize workflows.",
       slogan: "Workflow Optimization",
       borderColor: "border-blue-400/30",
       textColor: "text-blue-300",
       accentColor: "bg-blue-400",
       glowColor: "bg-blue-400/5",
       shadow: "shadow-[0_0_20px_rgba(96,165,250,0.5)]",
       buttonBg: "bg-blue-500/20 hover:bg-blue-500/40 border-blue-400/30",
       inputFocus: "focus:border-blue-400/50 placeholder:text-blue-500/40 text-blue-100"
    },
    {
       text: "Awaiting your command. Efficiency parameters are fully nominal.",
       slogan: "System Command",
       borderColor: "border-slate-300/30",
       textColor: "text-slate-200",
       accentColor: "bg-slate-300",
       glowColor: "bg-slate-400/5",
       shadow: "shadow-[0_0_20px_rgba(203,213,225,0.5)]",
       buttonBg: "bg-slate-500/20 hover:bg-slate-500/40 border-slate-400/30",
       inputFocus: "focus:border-slate-400/50 placeholder:text-slate-500/40 text-slate-100"
    },
    {
       text: "Accelerate growth using precision-timed algorithmic interventions.",
       slogan: "Growth Engine",
       borderColor: "border-emerald-400/30",
       textColor: "text-emerald-300",
       accentColor: "bg-emerald-400",
       glowColor: "bg-emerald-400/5",
       shadow: "shadow-[0_0_20px_rgba(52,211,153,0.5)]",
       buttonBg: "bg-emerald-500/20 hover:bg-emerald-500/40 border-emerald-400/30",
       inputFocus: "focus:border-emerald-400/50 placeholder:text-emerald-500/40 text-emerald-100"
    },
    {
       text: "Digital butterfly protocols active. Evolving your growth matrix.",
       slogan: "Bio-Digital Sync",
       borderColor: "border-pink-400/30",
       textColor: "text-pink-300",
       accentColor: "bg-pink-400",
       glowColor: "bg-pink-400/5",
       shadow: "shadow-[0_0_20px_rgba(244,114,182,0.5)]",
       buttonBg: "bg-pink-500/20 hover:bg-pink-500/40 border-pink-400/30",
       inputFocus: "focus:border-pink-400/50 placeholder:text-pink-500/40 text-pink-100"
    },
    {
       text: "Harmonic resonance achieved. Tuning your workspace to perfection.",
       slogan: "Resonance Optimization",
       borderColor: "border-red-400/30",
       textColor: "text-rose-300",
       accentColor: "bg-rose-400",
       glowColor: "bg-rose-400/5",
       shadow: "shadow-[0_0_20px_rgba(251,113,113,0.5)]",
       buttonBg: "bg-rose-500/20 hover:bg-rose-500/40 border-rose-400/30",
       inputFocus: "focus:border-rose-400/50 placeholder:text-rose-500/40 text-rose-100"
    }
  ], []);

  const config = phraseConfig[phraseIndex];

  const onMouseEnter = () => {
    setIsHovered(true);
    setPhraseIndex(Math.floor(Math.random() * phraseConfig.length));
    if (controlsRef.current) {
      controlsRef.current.pause();
    }
  };

  const onMouseLeave = () => {
    setIsHovered(false);
    if (controlsRef.current) {
      controlsRef.current.play();
    }
  };

  const x = useTransform(progress, [0, 1], [width + 100, -100]);
  const y = useTransform(progress, [0, 0.15, 0.8, 0.95, 1], [
    height * 0.4, 
    height * 0.3, 
    height * 0.6, 
    height * 0.5,
    height * 0.5
  ]);
  const opacity = useTransform(progress, [0, 0.15, 0.8, 0.95, 1], [0, 1, 1, 0.9, 0]);
  const scale = useTransform(progress, [0, 0.15, 0.8, 0.95, 1], [0.8, 1.1, 1, 1.3, 0.6]);
  
  const rotate = useTransform(progress, [0, 0.15, 0.8, 0.95, 1], 
    flybyType === 2 ? [0, 180, 540, 720, 720] : [-15, 10, -5, 15, 15]
  );
  
  const warpScale = useTransform(progress, [0, 0.7, 0.85, 0.95, 1], [0.8, 1.5, 3, 0, 0]);
  const warpOpacity = useTransform(progress, [0, 0.7, 0.85, 0.95, 1], [0, 0, 0.4, 0.8, 0]);
  
  // Wait, filter takes strings, let's interpolate numbers to construct the blur string
  const warpBlurAmount = useTransform(progress, [0, 0.7, 0.85, 0.95, 1], [0, 10, 30, 40, 40]);
  const warpBlur = useTransform(warpBlurAmount, (v: number) => `blur(${v}px)`);

  return (
    <>
      <motion.div
        style={{ x, y, opacity, scale, ...style }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onMouseEnter}
        onBlur={onMouseLeave}
        onTouchStart={(e) => {
          if (!isHovered) {
            e.preventDefault();
            onMouseEnter();
          }
        }}
        onClick={() => {
          if (!isHovered) {
            onMouseEnter();
          } else {
            setIsContactFormOpen(true);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!isHovered) {
              onMouseEnter();
            } else {
              setIsContactFormOpen(true);
            }
          } else if (e.key === 'Escape') {
            setIsHovered(false);
            setIsContactFormOpen(false);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Interact with robotic surveyor"
        aria-expanded={isContactFormOpen}
        className={`absolute -translate-y-1/2 pointer-events-auto z-[1002] focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl ${className || ''}`}
      >
        <motion.div whileTap={{ scale: 0.95 }} style={{ rotate }} className="relative cursor-help p-4">
          {renderCurrentObject ? renderCurrentObject(flybyType, "w-14 h-14 md:w-20 md:h-20 text-blue-400") : children}
          
          {/* Engine/Speed Lines */}
          <motion.div 
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="absolute top-1/2 right-0 translate-x-full -translate-y-1/2 w-12 h-px bg-gradient-to-l from-blue-400/40 to-transparent blur-sm pointer-events-none" 
          />
          
          <motion.div 
            style={{ scale: warpScale, opacity: warpOpacity, filter: warpBlur }}
            className="absolute inset-0 bg-blue-500/30 blur-2xl rounded-full mix-blend-screen pointer-events-none"
          />

          {isHovered && !isContactFormOpen && (
            <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-[#050510]/95 text-white text-xs whitespace-nowrap p-3 rounded-xl border ${config.borderColor} ${config.shadow} z-50 pointer-events-none`}>
              {config.text}
            </div>
          )}
        </motion.div>

        <AnimatePresence>
          {isContactFormOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className={`absolute left-1/2 md:left-full top-full md:top-1/2 -translate-x-1/2 md:-translate-x-0 md:-translate-y-1/2 mt-4 md:mt-0 md:ml-8 w-[260px] md:w-72 bg-[#050510]/95 backdrop-blur-md border ${config.borderColor} p-4 md:p-5 rounded-2xl ${config.shadow} pointer-events-auto z-[2000]`}
            >
              <div className={`absolute inset-0 ${config.glowColor} pointer-events-none rounded-2xl`} />
              
              <button 
                onClick={(e) => { e.stopPropagation(); setIsContactFormOpen(false); }}
                className={`absolute top-3 right-3 ${config.textColor} opacity-60 hover:opacity-100 transition-opacity`}
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative z-10 text-left">
                <h2 className={`text-sm font-mono ${config.textColor} uppercase tracking-widest mb-1 flex items-center gap-2`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${config.accentColor} shadow-[0_0_5px_currentColor]`} />
                  Targetbob
                </h2>
                <p className={`text-[10px] ${config.textColor} opacity-60 mb-4 uppercase tracking-wider`}>{config.slogan}</p>

                <form 
                  className="flex flex-col gap-6" 
                  onSubmit={(e) => { 
                    e.preventDefault(); 
                    const newErrors: { [key: string]: string } = {};
                    
                    if (!formData.name.trim()) {
                      newErrors.name = "ID required";
                    } else if (formData.name.trim().length < 2) {
                      newErrors.name = "ID too short";
                    }
                    
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!formData.email) {
                      newErrors.email = "Link required";
                    } else if (!emailRegex.test(formData.email)) {
                      newErrors.email = "Invalid link structure";
                    }
                    
                    const phoneRegex = /^\+?[\d\s-]{8,}$/;
                    if (!formData.phone) {
                      newErrors.phone = "Terminal required";
                    } else if (!phoneRegex.test(formData.phone)) {
                      newErrors.phone = "Invalid secure code";
                    }

                    if (!formData.message.trim()) {
                      newErrors.message = "Payload required";
                    }
                    
                    setErrors(newErrors);
                    
                    if (Object.keys(newErrors).length === 0) {
                      setIsSubmitting(true);
                      
                      // Send data to a dummy API endpoint
                      fetch('https://jsonplaceholder.typicode.com/posts', {
                        method: 'POST',
                        body: JSON.stringify({
                          title: 'Contact Form Submission',
                          body: formData,
                          userId: 1,
                        }),
                        headers: {
                          'Content-type': 'application/json; charset=UTF-8',
                        },
                      })
                      .then((response) => response.json())
                      .then((data) => {
                        console.log('Success:', data);
                        setIsSubmitting(false);
                        setIsSuccess(true);
                        setTimeout(() => {
                          setIsSuccess(false);
                          setIsContactFormOpen(false);
                          setFormData({ name: '', email: '', phone: '', message: '' });
                        }, 2500);
                      })
                      .catch((error) => {
                        console.error('Error:', error);
                        setIsSubmitting(false);
                        // Optionally set an error state here if requested
                      });
                    }
                  }}
                >
                  <div className="relative group">
                    <input 
                      type="text" 
                      id="flyby-name"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      className={`peer w-full bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-4 placeholder-transparent ${config.inputFocus} outline-none transition-all font-mono text-xs focus:bg-white/10`}
                      placeholder="Name"
                    />
                    <label 
                      htmlFor="flyby-name"
                      className={`absolute left-4 -top-2.5 bg-[#0a0a1a] px-1.5 text-[10px] font-mono ${errors.name ? 'text-red-400' : config.textColor} transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-[10px] rounded pointer-events-none uppercase tracking-widest`}
                    >
                      {errors.name || "Nominal ID"}
                    </label>
                  </div>
                  
                  <div className="relative group">
                    <input 
                      type="email" 
                      id="flyby-email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      className={`peer w-full bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-4 placeholder-transparent ${config.inputFocus} outline-none transition-all font-mono text-xs focus:bg-white/10`}
                      placeholder="Email"
                    />
                    <label 
                      htmlFor="flyby-email"
                      className={`absolute left-4 -top-2.5 bg-[#0a0a1a] px-1.5 text-[10px] font-mono ${errors.email ? 'text-red-400' : config.textColor} transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-[10px] rounded pointer-events-none uppercase tracking-widest`}
                    >
                      {errors.email || "Comm Link"}
                    </label>
                  </div>

                  <div className="relative group">
                    <input 
                      type="tel" 
                      id="flyby-phone"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: '' });
                      }}
                      className={`peer w-full bg-white/5 border ${errors.phone ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-4 placeholder-transparent ${config.inputFocus} outline-none transition-all font-mono text-xs focus:bg-white/10`}
                      placeholder="Phone"
                    />
                    <label 
                      htmlFor="flyby-phone"
                      className={`absolute left-4 -top-2.5 bg-[#0a0a1a] px-1.5 text-[10px] font-mono ${errors.phone ? 'text-red-400' : config.textColor} transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-[10px] rounded pointer-events-none uppercase tracking-widest`}
                    >
                      {errors.phone || "Secure Terminal"}
                    </label>
                  </div>

                  <div className="relative group">
                    <textarea 
                      id="flyby-message"
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: '' });
                      }}
                      className={`peer w-full bg-white/5 border ${errors.message ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-4 placeholder-transparent ${config.inputFocus} outline-none transition-all font-mono text-xs focus:bg-white/10 min-h-[100px] resize-none`}
                      placeholder="Message"
                    />
                    <label 
                      htmlFor="flyby-message"
                      className={`absolute left-4 -top-2.5 bg-[#0a0a1a] px-1.5 text-[10px] font-mono ${errors.message ? 'text-red-400' : config.textColor} transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-[10px] rounded pointer-events-none uppercase tracking-widest`}
                    >
                      {errors.message || "Data Payload"}
                    </label>
                  </div>
                  
                  <motion.button 
                    type="submit"
                    disabled={isSubmitting || isSuccess}
                    whileHover={{ scale: (isSubmitting || isSuccess) ? 1 : 1.02 }}
                    whileTap={{ scale: (isSubmitting || isSuccess) ? 1 : 0.98 }}
                    className={`w-full mt-4 h-12 relative overflow-hidden rounded-xl bg-gradient-to-r ${isSuccess ? 'from-green-500/40' : config.accentColor + '/20'} to-transparent border ${isSuccess ? 'border-green-500/50' : 'border-' + config.borderColor.split('-')[1] + '-' + config.borderColor.split('-')[2]} transition-all group`}
                  >
                    {!isSubmitting && !isSuccess && (
                      <div className={`absolute inset-0 bg-gradient-to-r ${config.accentColor} opacity-0 group-hover:opacity-20 transition-opacity`} />
                    )}
                    <div className="relative z-10 flex items-center justify-center gap-3 font-mono uppercase tracking-[0.2em] text-xs font-bold">
                      <span className={isSuccess ? 'text-green-300' : config.textColor}>
                        {isSubmitting ? 'Submitting...' : isSuccess ? 'Success!' : 'Establish Uplink'}
                      </span>
                      {!isSubmitting && !isSuccess && (
                        <Send className={`w-4 h-4 ${config.textColor} group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform`} />
                      )}
                      {isSubmitting && (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};
