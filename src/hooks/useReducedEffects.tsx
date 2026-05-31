import React, { createContext, useContext, useEffect, useState } from 'react';

/**
 * Reduced-Effects toggle — global on/off switch for the heavy visual
 * candy (per-star background drift, sparkle particles, parallax, etc.).
 *
 * Per Katia 2026-05-28: «треба додати в меню внизу посередині кнопку
 * яка вимикає великі візуальні ефекти під час сесії. … ці налаштування
 * зберігаються при переході між сторінками і навіть якщо оновити
 * сторінку».
 *
 * State persists to localStorage under `dscope:reducedEffects` so it
 * survives route changes AND full reloads.
 */

const STORAGE_KEY = 'dscope:reducedEffects';

type Ctx = {
  reduced: boolean;
  toggle: () => void;
  set: (v: boolean) => void;
};

const ReducedEffectsContext = createContext<Ctx>({
  reduced: false,
  toggle: () => {},
  set: () => {},
});

export const ReducedEffectsProvider = ({ children }: { children: React.ReactNode }) => {
  // Read from localStorage on first paint so we don't flash heavy
  // effects then immediately tear them down.
  //
  // Default-ON for mobile/low-power devices when user hasn't picked
  // a value yet: mobile UA, <768px viewport, hardwareConcurrency ≤ 4,
  // or deviceMemory ≤ 4 GB. Reasoning: site is heavy by design;
  // mobile users complained about 10s load + phone heating up.
  // Desktop users keep default FULL.
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored !== null) return stored === 'true';
      // No stored preference — auto-detect.
      const nav = navigator as any;
      const isMobileUA = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      const isNarrow = window.innerWidth < 768;
      const lowCores = (nav.hardwareConcurrency ?? 8) <= 4;
      const lowMem = (nav.deviceMemory ?? 8) <= 4;
      return isMobileUA || isNarrow || lowCores || lowMem;
    } catch {
      return false;
    }
  });

  // Persist to localStorage whenever the toggle flips.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(reduced));
    } catch {
      /* private mode / quota — silently ignore */
    }
    // Also reflect on <html data-reduced-effects="..."> so plain CSS
    // rules can opt in without touching JS.
    document.documentElement.dataset.reducedEffects = reduced ? 'true' : 'false';
  }, [reduced]);

  const value: Ctx = {
    reduced,
    toggle: () => setReduced((v) => !v),
    set: setReduced,
  };

  return (
    <ReducedEffectsContext.Provider value={value}>
      {children}
    </ReducedEffectsContext.Provider>
  );
};

export const useReducedEffects = () => useContext(ReducedEffectsContext);
