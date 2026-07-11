import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Calendar, ArrowUp, Instagram } from 'lucide-react';
import { INSTITUT_INFO } from '../data';

export default function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isReservationView, setIsReservationView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    const handleHashChange = () => {
      setIsReservationView(window.location.hash.includes('/reservation'));
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);
    
    // Initial check
    handleHashChange();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      id="floating-actions" 
      className="fixed z-40 flex flex-col items-center gap-2.5"
      style={{
        bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))',
        right: 'calc(1rem + env(safe-area-inset-right, 0px))'
      }}
    >
      <AnimatePresence>
        {/* Back to top button */}
        {showBackToTop && (
          <motion.button
            key="back-to-top"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={scrollToTop}
            className="flex h-11 w-11 items-center justify-center rounded-[24px] bg-white text-charcoal shadow-lg hover:bg-beige-bg transition-all duration-300 border border-[#B88F4D]/20"
            aria-label="Retour en haut"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className="h-4 w-4 text-[#B88F4D]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Instagram Action */}
      <motion.a
        href={INSTITUT_INFO.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 w-12 items-center justify-center rounded-[24px] bg-[#2E2E2E] text-[#B88F4D] shadow-xl hover:bg-black border border-[#B88F4D]/20 transition-all duration-300"
        aria-label="Voir notre Instagram"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        title="Nous suivre sur Instagram"
      >
        <Instagram className="h-5 w-5" />
      </motion.a>

      {/* Floating Phone Action */}
      <motion.a
        href={`tel:${INSTITUT_INFO.phoneFormatted}`}
        className="flex h-12 w-12 items-center justify-center rounded-[24px] bg-[#A3A485] text-white shadow-xl hover:bg-[#97a188] transition-all duration-300 animate-pulse hover:animate-none"
        aria-label="Appeler l'Atelier"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        title={`Nous appeler au ${INSTITUT_INFO.phone}`}
      >
        <Phone className="h-5 w-5" />
      </motion.a>

      {/* Floating Booking Action */}
      {!isReservationView && (
        <motion.button
          onClick={() => {
            window.location.hash = '#/reservation';
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 rounded-[24px] bg-[#B88F4D] tracking-wider px-4.5 py-3.5 text-[10px] md:text-xs font-semibold uppercase text-white shadow-xl hover:bg-[#A17E60] transition-all duration-300 cursor-pointer border border-[#B88F4D]/10"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Calendar className="h-4 w-4 shrink-0" />
          <span>Réserver</span>
        </motion.button>
      )}
    </div>
  );
}
