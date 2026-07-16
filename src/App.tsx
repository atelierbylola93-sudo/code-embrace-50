import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Page } from './types';

// Import Layout Components
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import GridOverlay from './components/GridOverlay';

// Import Views
import HomeView from './views/HomeView';
import CoiffureView from './views/CoiffureView';
import HeadSpaView from './views/HeadSpaView';
import SoinsVisageView from './views/SoinsVisageView';
import BeauteRegardView from './views/BeauteRegardView';
import IplView from './views/IplView';
import DetatouageView from './views/DetatouageView';
import BlanchimentDentaireView from './views/BlanchimentDentaireView';
import SoinsCorpsAlguesView from './views/SoinsCorpsAlguesView';
import ReservationView from './views/ReservationView';
import MentionsLegalesView from './views/MentionsLegalesView';
import ConfidentialiteView from './views/ConfidentialiteView';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('accueil');

  // Handle Hash routing to enable deep links, history logs, and local SEO crawling
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(2) as Page; // strip the leading #/
      const validPages: Page[] = [
        'accueil',
        'coiffure',
        'head-spa',
        'soins-visage',
        'beaute-regard',
        'ipl',
        'detatouage',
        'blanchiment-dentaire',
        'soins-corps-algues',
        'reservation',
        'mentions-legales',
        'confidentialite'
      ];
      
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      } else {
        setCurrentPage('accueil');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Process initial hash if it exists
    if (window.location.hash.startsWith('#/')) {
      handleHashChange();
    } else {
      window.location.hash = '#/accueil';
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: Page) => {
    window.location.hash = `#/${page}`;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Helper to dynamically render currently selected premium view
  const renderView = () => {
    switch (currentPage) {
      case 'accueil':
        return <HomeView onNavigate={handleNavigate} />;
      case 'coiffure':
        return <CoiffureView />;
      case 'head-spa':
        return <HeadSpaView />;
      case 'soins-visage':
        return <SoinsVisageView />;
      case 'beaute-regard':
        return <BeauteRegardView />;
      case 'ipl':
        return <IplView />;
      case 'detatouage':
        return <DetatouageView />;
      case 'blanchiment-dentaire':
        return <BlanchimentDentaireView />;
      case 'soins-corps-algues':
        return <SoinsCorpsAlguesView />;
      case 'reservation':
        return <ReservationView />;
      case 'mentions-legales':
        return <MentionsLegalesView />;
      case 'confidentialite':
        return <ConfidentialiteView />;
      default:
        return <HomeView onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-beige-bg flex flex-col justify-between selection:bg-[#B88F4D]/20 selection:text-[#B88F4D]">
      <div>
        {/* Header Navigation Grid */}
        <Header currentPage={currentPage} onNavigate={handleNavigate} />

        {/* Animated Main Content Stage */}
        <main className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Floating CTA Shortcuts (Phone, Booking, Scroll-to-Top) */}
      <FloatingActions />

      {/* Premium Footer with Embed Map, structured hours and social handles */}
      <Footer onNavigate={handleNavigate} />

      {/* Swiss Müller-Brockmann & Vignelli Interactive Grid Alignment System */}
      <GridOverlay />
    </div>
  );
}
