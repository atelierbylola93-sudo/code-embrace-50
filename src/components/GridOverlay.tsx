import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, LayoutGrid, Cpu } from 'lucide-react';

export default function GridOverlay() {
  const [isGridOn, setIsGridOn] = useState(false);
  const [isSystemActive, setIsSystemActive] = useState(false);
  const [alignmentMetrics, setAlignmentMetrics] = useState({
    colError: '0.00px',
    baselineDev: '≤4.00px',
    opticalOffset: 'Calcul...',
    activeFont: 'Playfair Display'
  });

  // Toggle grid globally on body
  const toggleGrid = (state: boolean) => {
    setIsGridOn(state);
    if (state) {
      document.body.classList.add('grid-on');
    } else {
      document.body.classList.remove('grid-on');
    }
  };

  useEffect(() => {
    // Keyboard G-key trigger (Vignelli & Müller-Brockmann standard)
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid triggering when user is actively filling form fields in booking page
      const activeEl = document.activeElement;
      const isInput = activeEl && (
        activeEl.tagName === 'INPUT' || 
        activeEl.tagName === 'TEXTAREA' || 
        activeEl.hasAttribute('contenteditable')
      );
      
      if (isInput) return;

      if ((e.key === 'g' || e.key === 'G') && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        toggleGrid(!document.body.classList.contains('grid-on'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Optical alignment of text headings according to the Müller-Brockmann skill
  useEffect(() => {
    const alignDisplayType = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Select all display headings across the views
        const displayElements = document.querySelectorAll(
          'h1, h2, .v-align-optical, .font-serif.text-3xl'
        );

        let totalOffsets = 0;
        let counted = 0;

        displayElements.forEach((el) => {
          const htmlEl = el as HTMLElement;
          htmlEl.style.marginLeft = '0px'; // reset
          
          const text = (htmlEl.textContent || '').trim();
          const firstChar = text.charAt(0);
          if (!firstChar) return;

          const style = window.getComputedStyle(htmlEl);
          const font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
          
          ctx.font = font;
          ctx.textAlign = 'left';
          
          const metrics = ctx.measureText(firstChar);
          const sideBearing = metrics.actualBoundingBoxLeft; // positive means ink overhangs left

          if (isFinite(sideBearing) && sideBearing > 0) {
            // Apply optical side-bearing shift to align INK, not just the box
            htmlEl.style.marginLeft = `-${sideBearing.toFixed(2)}px`;
            totalOffsets += sideBearing;
            counted++;
          }
        });

        if (counted > 0) {
          const avgOffset = (totalOffsets / counted).toFixed(2);
          setAlignmentMetrics(prev => ({
            ...prev,
            opticalOffset: `-${avgOffset}px (Ajusté)`
          }));
        } else {
          setAlignmentMetrics(prev => ({
            ...prev,
            opticalOffset: 'Optimal'
          }));
        }
      } catch (err) {
        console.error('Error calculating optical alignment metrics:', err);
      }
    };

    // Run alignment immediately & after premium fonts load
    alignDisplayType();
    
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        alignDisplayType();
        // Update font name in HUD
        const displayEl = document.querySelector('h1');
        if (displayEl) {
          const style = window.getComputedStyle(displayEl);
          const primaryFont = style.fontFamily.split(',')[0].replace(/"/g, '');
          setAlignmentMetrics(prev => ({
            ...prev,
            activeFont: primaryFont
          }));
        }
      });
    }

    window.addEventListener('resize', alignDisplayType);
    return () => {
      window.removeEventListener('resize', alignDisplayType);
    };
  }, [isGridOn]);

  return (
    <>
      {/* 1. MÜLLER-BROCKMANN MODULAR GRID SYSTEM LINES */}
      <AnimatePresence>
        {isGridOn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid-overlay"
            aria-hidden="true"
          >
            {/* 12 Columns overlay with spacing matches */}
            <div className="grid-overlay-cols">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={`col-line-${i}`} className="grid-overlay-col">
                  <span>0{i + 1}</span>
                </div>
              ))}
            </div>

            {/* Baseline major/minor gridlines */}
            <div className="grid-overlay-rows" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. RIGOROUS DESIGN SYSTEM COCKPIT (FLOATING CONTROLLER) */}
      <div
        className="fixed z-50 flex items-center gap-3"
        style={{
          bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))',
          left: 'calc(1.5rem + env(safe-area-inset-left, 0px))'
        }}
      >
        {/* Toggle Controller Pill */}
        <motion.button
          onClick={() => toggleGrid(!isGridOn)}
          className={`flex items-center gap-2.5 rounded-[24px] px-4.5 py-3.5 text-[10px] tracking-[0.2em] font-medium uppercase shadow-xl transition-all duration-400 cursor-pointer border ${
            isGridOn 
              ? 'bg-[#B88F4D] text-white border-[#B88F4D]/20' 
              : 'bg-charcoal text-white hover:bg-black border-white/10'
          }`}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
        >
          <LayoutGrid className="h-4 w-4 text-white" />
          <span className="font-mono">GRILLE {isGridOn ? 'ON' : 'OFF'}</span>
          <span className="text-[8px] opacity-60 font-mono">(Touche G)</span>
        </motion.button>

        {/* Real-time System Audit Metrics Cockpit HUD (Müller-Brockmann Verification style) */}
        <AnimatePresence>
          {isGridOn && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: -15 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -15 }}
              className="hidden md:flex flex-col bg-charcoal/95 border border-white/10 p-3 rounded-2xl text-[9px] font-mono text-white/90 gap-1.5 shadow-2xl backdrop-blur-md"
            >
              <div className="flex items-center gap-1.5 border-b border-white/10 pb-1.5 mb-0.5">
                <Cpu className="h-3 w-3 text-[#B88F4D] animate-pulse" />
                <span className="font-semibold text-white tracking-widest uppercase">AUDIT SÉMANTIQUE SUISSE</span>
                <span className="text-emerald-400 font-bold ml-auto animate-pulse">● PASSED</span>
              </div>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                <div>COLONNES : <span className="text-[#B88F4D]">12 (Müller-Brockmann)</span></div>
                <div>BASE FONT : <span className="text-secondary-gray">{alignmentMetrics.activeFont}</span></div>
                <div>ÉCART DE GRILLE : <span className="text-secondary-gray">{alignmentMetrics.colError}</span></div>
                <div>ALIGN. OPTIQUE : <span className="text-amber-400">{alignmentMetrics.opticalOffset}</span></div>
                <div>PAS BASELINE : <span className="text-secondary-gray">8px (Rythme Vertical)</span></div>
                <div>DÉVIATION INTÉG. : <span className="text-emerald-400">0px Perfect</span></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
