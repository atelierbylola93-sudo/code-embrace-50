import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  Calendar, 
  Star, 
  Instagram, 
  ChevronDown, 
  ChevronUp, 
  Heart, 
  ShieldCheck, 
  Clock, 
  Compass, 
  Award, 
  Activity, 
  Droplet,
  Phone
} from 'lucide-react';
import { INSTITUT_INFO, LUXURY_IMAGES, REVIEWS, INSTAGRAM_FEED } from '../data';
import { Page } from '../types';
import AvantApresSlider from '../components/AvantApresSlider';

interface HomeViewProps {
  onNavigate: (page: Page) => void;
}

export default function HomeView({ onNavigate }: HomeViewProps) {
  // Head Spa FAQ accordions state
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Conciergerie Digitale : Rituel Advisor State
  const [selectedConcern, setSelectedConcern] = useState<number>(0);

  const featuredServices = [
    {
      title: "Japanese Head Spa",
      tag: "Signature Impériale",
      description: "Notre fleuron sensoriel d'exception. Diagnostic capillaire personnalisé, massage d'acupression Shiatsu royal, arche thermale en pluie de brume et dôme de vapeur holistique.",
      price: "120 €",
      image: LUXURY_IMAGES.headSpa,
      page: 'head-spa' as Page,
    },
    {
      title: "HydraFacial Signature",
      tag: "Éclat Absolu",
      description: "Nettoie en profondeur extrême, extrait les imperfections par aspiration vortex brevetée, exfolie en douceur et gorge la peau de sérums botaniques anti-oxydants d'élite.",
      price: "105 €",
      image: LUXURY_IMAGES.hydraFacial,
      page: 'soins-visage' as Page,
    },
    {
      title: "Microneedling Glowy",
      tag: "Jeunesse Cellulaire",
      description: "Relance instantanément la micro-circulation et l'élastine naturelle. Atténue visiblement les pores, ridules, cicatrices d'acné et insuffle un cocktail exclusif multivitaminé.",
      price: "160 €",
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800",
      page: 'soins-visage' as Page,
    },
    {
      title: "Beauté du Regard",
      tag: "Regard Hypnotique",
      description: "L'excellence du Browlift et du Rehaussement de cils à la kératine. Redéfinir l'harmonie de votre visage pour un fini d'un raffinement absolu, sans maquillage au réveil.",
      price: "Dès 25 €",
      image: LUXURY_IMAGES.beauteRegard,
      page: 'beaute-regard' as Page,
    },
    {
      title: "Épilation IPL",
      tag: "Haute Technologie",
      description: "Grâce à notre dispositif professionnel de lumière pulsée équipé de la technologie 'Doul-Cooling', éliminez définitivement vos poils dans une fraîcheur et un confort d'exception.",
      price: "Dès 30 €",
      image: LUXURY_IMAGES.iplEpilation,
      page: 'ipl' as Page,
    },
    {
      title: "Blanchiment Dentaire",
      tag: "Sourire Miroir",
      description: "Éliminez instantanément le jaunissement structurel en une unique séance de double exposition LED douce. Gagnez de nombreuses teintes de blancheur en préservant vos gencives.",
      price: "Dès 60 €",
      image: LUXURY_IMAGES.blanchimentDentaire,
      page: 'blanchiment-dentaire' as Page,
    },
  ];

  const comparisons = [
    {
      name: "HydraFacial Signature",
      type: "Exfoliation Hydromécanique",
      target: "Toutes peaux, Teint terne, Pores obstrués",
      eviction: "Aucune (Éclat direct)",
      tech: "Vortex-Succion & Infusion",
      effets: "★★★★★",
      duration: "45 min",
      price: "105 €",
      action: "soins-visage" as Page
    },
    {
      name: "Microneedling Glowy",
      type: "Bio-stimulation Intense",
      target: "Fermeté, Cicatrices, Pores, Rides",
      eviction: "24h (Légères rougeurs)",
      tech: "Micro-perforations & Vitamines",
      effets: "★★★★★ (Profond)",
      duration: "60 min",
      price: "160 €",
      action: "soins-visage" as Page
    },
    {
      name: "Soin Visage Bio",
      type: "Phyto-sensoriel Doux",
      target: "Peaux sensibles, Rituel détox",
      eviction: "Aucune (Détente)",
      tech: "Modelage & Extraits certifiés",
      effets: "★★★★☆",
      duration: "45 min",
      price: "60 €",
      action: "soins-visage" as Page
    },
    {
      name: "Soin aux Algues",
      type: "Thalasso Reminéralisante",
      target: "Visage fatigué, Peau stressée, Pollution",
      eviction: "Aucune (Fraîcheur)",
      tech: "Masque plastifiant marin",
      effets: "★★★★☆",
      duration: "60 min",
      price: "100 €",
      action: "soins-corps-algues" as Page
    }
  ];

  const headSpaFaqs = [
    {
      question: "Pourquoi réaliser son Head Spa chez d'autres salons est différent de l'Atelier by Lola ?",
      answer: "À l'Atelier by Lola au Pré-Saint-Gervais, le Head Spa est une véritable cure de prestige. Votre espace est entièrement privatisé dans un cocon apaisant, baigné d'une lumière tamisée, équipé de la véritable arche d'eau japonaise et d'une technologie de bain de vapeur ionisé ultra-moderne."
    },
    {
      question: "La séance de Head Spa est-elle adaptée pour tous les types de cheveux ?",
      answer: "Absolument. Qu'ils soient bouclés, lisses, crépus, colorés, naturels ou que votre cuir chevelu soit extrêmement sensible, Lola effectue un examen préalable personnalisé pour adapter sur-mesure nos shampoings bio d'excellence."
    },
    {
      question: "Quelle est la fréquence idéale recommandée pour ce soin thermal ?",
      answer: "Pour entretenir un cuir chevelu en parfaite santé, stimuler activement la repousse et s'octroyer un relâchement nerveux optimal, nous préconisons un rituel mensuel calqué sur le cycle cellulaire de la peau."
    },
    {
      question: "Le rituel convient-il également aux hommes ?",
      answer: "Oui, les hommes apprécient grandement l'effet revitalisant contre la perte de densité capillaire, ainsi que les bienfaits calmants profonds prodigués par les points d'acupression crâniens."
    }
  ];

  return (
    <div id="home-view" className="w-full relative bg-beige-bg">
      
      {/* 1. CINEMATIC HERO SECTION WITH RESPONSIVE APPLE COVER HEIGHT */}
      <section className="relative min-h-[580px] sm:min-h-[660px] md:h-[95vh] md:min-h-[750px] flex items-center justify-center overflow-hidden py-20 md:py-0">
        {/* Dynamic Background Image & Subtle Zoom */}
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.08 }}
            animate={{ scale: 1.02 }}
            transition={{ duration: 12, ease: "easeOut" }}
            src={LUXURY_IMAGES.heroBg}
            alt="Intérieur chic L'Atelier by Lola"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter brightness-[0.45] contrast-105"
          />
          {/* Radial aesthetic vignette and heavy dark-graded overlay for ultra readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-beige-bg" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-beige-bg via-beige-bg/45 to-transparent" />
        </div>

        {/* Content Box */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-8 text-center pt-20 md:pt-24 pb-4">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-5 md:space-y-8"
          >
            {/* Elegant Star Ranking Banner */}
            <div className="inline-flex flex-col items-center gap-1 select-none">
              <span className="text-[#C7A46A] text-xs md:text-sm tracking-[0.2em] font-serif drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.8)]">★★★★★</span>
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/20 bg-black/45 backdrop-blur-md text-white mt-1">
                <Sparkles className="h-3 w-3 text-[#C7A46A] animate-pulse" />
                <span className="text-[8px] md:text-xs uppercase tracking-[0.2em] font-semibold text-white/95">
                  Beauté & Bien-être Haut de Gamme
                </span>
              </div>
            </div>

            {/* Masterful Display Title with Great Vibes and Playfair mix (Fully Fluid & Clip-safe) */}
            <h1 className="font-serif text-3.5xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-light text-white tracking-wide leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              L'Atelier <span className="font-signature text-5xl sm:text-6xl md:text-8xl lg:text-[7.5rem] text-[#C7A46A] block sm:inline italic ml-1 select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">by Lola</span>
            </h1>

            {/* Luxurious Subtext Subheadings */}
            <p className="font-serif italic text-base sm:text-lg md:text-2xl text-white/95 font-light max-w-3xl mx-auto tracking-wide drop-shadow-[0_1.5px_2.5px_rgba(0,0,0,0.8)]">
              Maison d'Esthétique & de Repos Capillaire d'Exception
            </p>

            <p className="text-white/85 text-[9px] md:text-xs tracking-[0.25em] uppercase font-light drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] px-2">
              Le Pré-Saint-Gervais • Séance Sensorielle Exclusive
            </p>

            {/* Highlights Pillars inside the Hero for premium conversion */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-2xl mx-auto pt-1 pb-3">
              <div className="px-1.5 py-3 sm:px-3 sm:py-4 rounded-[20px] bg-black/35 backdrop-blur-md border border-white/10 text-white transition-all duration-300 hover:bg-black/50 hover:border-[#C7A46A]/60 group">
                <Compass className="h-3.5 w-3.5 text-[#C7A46A] mx-auto mb-1 duration-300 group-hover:scale-110" />
                <span className="text-[10px] sm:text-[11px] md:text-xs font-serif uppercase tracking-widest font-semibold text-amber-300 group-hover:text-[#C7A46A] block">Head Spa</span>
                <span className="text-[8px] sm:text-[9px] text-white/60 tracking-wider block mt-0.5">Rituel Japonais</span>
              </div>
              <div className="px-1.5 py-3 sm:px-3 sm:py-4 rounded-[20px] bg-black/35 backdrop-blur-md border border-white/10 text-white transition-all duration-300 hover:bg-black/50 hover:border-[#C7A46A]/60 group">
                <Droplet className="h-3.5 w-3.5 text-[#C7A46A] mx-auto mb-1 duration-300 group-hover:scale-110" />
                <span className="text-[10px] sm:text-[11px] md:text-xs font-serif uppercase tracking-widest font-semibold text-amber-300 group-hover:text-[#C7A46A] block">HydraFacial</span>
                <span className="text-[8px] sm:text-[9px] text-white/60 tracking-wider block mt-0.5">Vortex Éclat</span>
              </div>
              <div className="px-1.5 py-3 sm:px-3 sm:py-4 rounded-[20px] bg-black/35 backdrop-blur-md border border-white/10 text-white transition-all duration-300 hover:bg-black/50 hover:border-[#C7A46A]/60 group">
                <Sparkles className="h-3.5 w-3.5 text-[#C7A46A] mx-auto mb-1 duration-300 group-hover:scale-110" />
                <span className="text-[10px] sm:text-[11px] md:text-xs font-serif uppercase tracking-widest font-semibold text-amber-300 group-hover:text-[#C7A46A] block">Needling</span>
                <span className="text-[8px] sm:text-[9px] text-white/60 tracking-wider block mt-0.5">Anti-Âge Pur</span>
              </div>
            </div>

            {/* Core Action Callouts */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3 px-4">
              <motion.button
                onClick={() => {
                  window.location.hash = '#/reservation';
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto btn-primary flex items-center justify-center gap-2.5 cursor-pointer shadow-xl !bg-[#C7A46A] !text-white border border-[#C7A46A]/40"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Calendar className="h-4 w-4" />
                Prendre rendez-vous
              </motion.button>
              
              <motion.button
                onClick={() => {
                  const el = document.getElementById('vedettes');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto btn-secondary !border-white/40 !text-white hover:bg-white/15 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm bg-black/20 backdrop-blur-sm"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Nos prestations d'exception
                <ArrowRight className="h-4 w-4 text-[#C7A46A]" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/60 pointer-events-none hidden md:flex">
          <span className="text-[9px] uppercase tracking-[0.25em] font-medium opacity-85">Défiler</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="h-5 w-1 bg-[#C7A46A] rounded-full"
          />
        </div>
      </section>

      {/* 2. STATS BANNER SECTION */}
      <section className="relative z-20 -mt-10 max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-[28px] border border-[#C7A46A]/15 shadow-xl py-8 px-6 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-[#C7A46A]/10">
          <div className="pt-0 flex flex-col justify-center space-y-1">
            <span className="font-serif text-3xl md:text-4xl font-bold text-charcoal tracking-tight block">
              +500
            </span>
            <span className="text-[10px] md:text-xs text-secondary-gray uppercase tracking-widest font-semibold block">
              Clients Satisfaits
            </span>
          </div>

          <div className="pt-4 lg:pt-0 flex flex-col justify-center space-y-1">
            <span className="font-serif text-3xl md:text-4xl font-bold text-[#C7A46A] tracking-tight block flex items-center justify-center gap-1">
              4.9<span className="text-sm text-yellow-500">★</span>
            </span>
            <span className="text-[10px] md:text-xs text-secondary-gray uppercase tracking-widest font-semibold block">
              Avis Google Certifiés
            </span>
          </div>

          <div className="pt-4 lg:pt-0 flex flex-col justify-center space-y-1">
            <span className="font-serif text-3.5xl md:text-4xl font-bold text-charcoal tracking-tight block">
              100%
            </span>
            <span className="text-[10px] md:text-xs text-secondary-gray uppercase tracking-widest font-semibold block">
              Soins Haut de Gamme
            </span>
          </div>

          <div className="pt-4 lg:pt-0 flex flex-col justify-center space-y-1">
            <span className="font-serif text-3.5xl md:text-4xl font-bold text-[#A8B29A] tracking-tight block">
              Planity
            </span>
            <span className="text-[10px] md:text-xs text-secondary-gray uppercase tracking-widest font-semibold block">
              Réservation Instantanée
            </span>
          </div>
        </div>
      </section>

      {/* 2.5 DYNAMIC PLANITY LIVE BANNER WITH SOFT URGENCY & CALL INCENTIVE */}
      <section className="mt-12 max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-r from-charcoal via-[#333333] to-charcoal text-white rounded-[24px] p-6 border border-[#C7A46A]/25 shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 h-full w-1/3 bg-[#C7A46A]/5 rounded-l-full blur-xl pointer-events-none" />
          <div className="flex flex-col lg:flex-row items-center justify-between gap-5 relative z-10">
            <div className="space-y-1.5 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C7A46A]/10 border border-[#C7A46A]/30 text-xs text-amber-300 font-semibold uppercase tracking-wider">
                <Clock className="h-3.5 w-3.5" /> Agenda temps réel Planity
              </div>
              <h3 className="font-serif text-lg md:text-xl font-medium tracking-wide">
                Les créneaux de fin de semaine partent très rapidement.
              </h3>
              <p className="text-gray-300 text-xs font-light tracking-wide max-w-xl">
                Planifiez votre parenthèse de bien-être dès aujourd’hui pour garantir votre place et vivre un soin d'exception personnalisé avec Lola.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-3 w-full lg:w-auto shrink-0">
              <motion.button
                onClick={() => {
                  window.location.hash = '#/reservation';
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 bg-[#C7A46A] hover:bg-white text-white hover:text-charcoal rounded-[16px] text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-md"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Calendar className="h-4 w-4" />
                Réserver sur Planity
              </motion.button>

              <motion.a
                href={`tel:${INSTITUT_INFO.phoneFormatted}`}
                className="px-6 py-3.5 bg-white/5 border border-white/10 hover:bg-white/15 text-white rounded-[16px] text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="h-4 w-4 text-[#C7A46A]" />
                {INSTITUT_INFO.phone}
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      {/* 2.7 WHY CHOOSE US (POURQUOI CHOISIR L'ATELIER BY LOLA) - ASYMMETRICAL LUXURY EDITORIAL */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-8">
        {/* Vignelli Swiss Rule major header line */}
        <div className="w-full border-t-2 border-charcoal/10 pt-4 mb-12 flex justify-between items-baseline font-mono text-[9px] tracking-[0.25em] text-secondary-gray uppercase select-none">
          <span>SECTION 01 / INTRO</span>
          <span>Savoir-Faire &amp; Intimité</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Typographic Hook */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C7A46A] font-bold block">
              MAISON SENSORIELLE
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] text-charcoal font-light leading-[1.1] tracking-tight v-align-optical">
              L'Excellence <br />
              <span className="font-signature text-4.5xl md:text-6xl text-[#C7A46A] italic ml-1 font-medium block sm:inline">sans compromis</span>
            </h2>
            <div className="w-16 h-[1.5px] bg-[#C7A46A]" />
            <p className="text-secondary-gray text-xs md:text-sm font-light leading-relaxed max-w-md">
              L’Atelier by Lola n'est pas un institut de passage. C'est un sanctuaire confidentiel d'esthétique clinique et capillaire conçu pour offrir des résultats immédiats et scientifiquement quantifiables dans le respect absolu de votre bien-être.
            </p>
            <div className="pt-4">
              <p className="text-[10px] font-mono text-secondary-gray uppercase tracking-wider mb-4">
                ⚠️ ÉTABLISSEMENT PRIVATISÉ • RÉSERVATION TRÈS RECOMMANDÉE
              </p>
              <motion.button
                onClick={() => {
                  window.location.hash = '#/reservation';
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-primary !bg-charcoal hover:!bg-[#C7A46A] !text-white rounded-none tracking-widest text-[10px] uppercase font-mono border-0 py-4 px-8 transition-all duration-300"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Garantir mon rendez-vous d'exception
              </motion.button>
            </div>
          </div>

          {/* Right Column: Staggered Asymmetrical Features */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10 sm:pt-12">
            
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-[24px] border border-[#C7A46A]/10 shadow-[0_4px_24px_rgba(0,0,0,0.02)] space-y-4 hover:border-[#C7A46A]/35 transition-all duration-500">
              <div className="font-mono text-5xl font-light tracking-tighter text-[#C7A46A]/30">01</div>
              <h3 className="font-serif text-lg font-bold text-charcoal tracking-wide">Expertise Certifiée</h3>
              <p className="text-xs text-secondary-gray leading-relaxed font-light">
                Lola est facialiste diplômée et praticienne certifiée dans les protocoles de Head Spa russes et japonais originels. Une alliance rare de rigueur scientifique et de gestuelle relaxante millénaire.
              </p>
            </div>

            {/* Feature 2 - Offset downwards on desktop */}
            <div className="bg-white p-8 rounded-[24px] border border-[#C7A46A]/10 shadow-[0_4px_24px_rgba(0,0,0,0.02)] space-y-4 sm:translate-y-8 hover:border-[#C7A46A]/35 transition-all duration-500">
              <div className="font-mono text-5xl font-light tracking-tighter text-[#C7A46A]/30">02</div>
              <h3 className="font-serif text-lg font-bold text-charcoal tracking-wide">Produits d'Exception</h3>
              <p className="text-xs text-secondary-gray leading-relaxed font-light">
                Sélection stricte d’actifs purs de grade médical et cosmétiques biologiques. Vos cheveux et votre épiderme bénéficient de formulations brevetées préservant la l'équilibre cellulaire profond.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-[24px] border border-[#C7A46A]/10 shadow-[0_4px_24px_rgba(0,0,0,0.02)] space-y-4 hover:border-[#C7A46A]/35 transition-all duration-500">
              <div className="font-mono text-5xl font-light tracking-tighter text-[#C7A46A]/30">03</div>
              <h3 className="font-serif text-lg font-bold text-charcoal tracking-wide">Suivi Micro-Caméra</h3>
              <p className="text-xs text-secondary-gray leading-relaxed font-light">
                Chaque rituel s'accompagne d’une séance d'imagerie du cheveu ou d'une analyse d'hydratation de la barrière cutanée. Vos séances sont adaptées à l'état réel de vos cellules en temps réel.
              </p>
            </div>

            {/* Feature 4 - Offset downwards on desktop */}
            <div className="bg-white p-8 rounded-[24px] border border-[#C7A46A]/10 shadow-[0_4px_24px_rgba(0,0,0,0.02)] space-y-4 sm:translate-y-8 hover:border-[#C7A46A]/35 transition-all duration-500">
              <div className="font-mono text-5xl font-light tracking-tighter text-[#C7A46A]/30">04</div>
              <h3 className="font-serif text-lg font-bold text-charcoal tracking-wide">Boudoir Privatisé</h3>
              <p className="text-xs text-secondary-gray leading-relaxed font-light">
                Oubliez les grands salons bruyants. L’institut est entièrement privatisé à chaque séance : literie thermo-ergonomique, pluie sensorielle, dôme ionique, sonorités zen et diffusion d'huiles rares.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. CORE SERVICES WITH EDITORIAL ALTERNATING LAYOUT & BENTO MOSAIC */}
      <section id="vedettes" className="py-24 bg-[#F8F5F0] border-y border-[#C7A46A]/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Vignelli Swiss Rule major header line */}
          <div className="w-full border-t-2 border-charcoal/10 pt-4 mb-16 flex justify-between items-baseline font-mono text-[9px] tracking-[0.25em] text-secondary-gray uppercase select-none">
            <span>SECTION 02 / PRESTATIONS</span>
            <span>La Collection d'Auteur</span>
          </div>

          {/* Group Header */}
          <div className="text-left mb-20 space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C7A46A] font-bold block">
              SÉLECTION EXCLUSIVE
            </span>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-charcoal font-light leading-tight tracking-tight v-align-optical">
              Prestations de Prestige
            </h2>
            <div className="w-16 h-[1.5px] bg-[#C7A46A]" />
            <p className="text-secondary-gray text-xs md:text-sm max-w-lg font-light leading-relaxed">
              L'alliance de la haute technologie esthétique et de rituels sensoriels d’épicurisme pur.
            </p>
          </div>

          <div className="space-y-16 lg:space-y-24">
            
            {/* 1. HERO SPOTLIGHT: JAPANESE HEAD SPA (FULL WIDTH LEFT SPLIT) */}
            <div className="bg-white rounded-[32px] overflow-hidden border border-[#C7A46A]/10 shadow-[0_10px_35px_rgba(0,0,0,0.02)] grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-7 h-72 sm:h-96 lg:h-auto min-h-[350px] relative overflow-hidden">
                <img 
                  src={featuredServices[0].image} 
                  alt={featuredServices[0].title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-[1200ms] hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/55 to-transparent" />
                <span className="absolute top-6 left-6 bg-[#C7A46A] text-white text-[10px] uppercase font-bold tracking-widest px-4 py-2 rounded-full shadow-lg">
                  ★ {featuredServices[0].tag}
                </span>
              </div>
              <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-baseline border-b border-[#C7A46A]/15 pb-4">
                    <h3 className="font-serif text-2xl sm:text-3.5xl text-charcoal font-light leading-tight">{featuredServices[0].title}</h3>
                    <span className="font-serif text-xl text-[#C7A46A] font-bold shrink-0 ml-4">{featuredServices[0].price}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-secondary-gray leading-relaxed font-light">
                    {featuredServices[0].description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="text-[9px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded bg-[#C7A46A]/5 border border-[#C7A46A]/15 text-[#C7A46A]">Arche de Brume</span>
                    <span className="text-[9px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded bg-[#C7A46A]/5 border border-[#C7A46A]/15 text-[#C7A46A]">Massage Shiatsu</span>
                    <span className="text-[9px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded bg-[#A8B29A]/5 border border-[#A8B29A]/15 text-[#A8B29A]">Cocon Privé</span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate(featuredServices[0].page)}
                  className="w-full sm:w-auto self-start px-8 py-3.5 bg-charcoal hover:bg-[#C7A46A] text-white text-xs font-bold uppercase tracking-wider rounded-[16px] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  Expérimenter le soin
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* 2. ALTERNATING COLUMNS: HYDRAFACIAL & MICRONEEDLING */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              
              {/* HydraFacial - Image Left Side-by-Side Card */}
              <div className="bg-white rounded-[32px] overflow-hidden border border-[#C7A46A]/10 shadow-[0_10px_35px_rgba(0,0,0,0.02)] flex flex-col justify-between">
                <div>
                  <div className="relative h-64 sm:h-72 overflow-hidden">
                    <img 
                      src={featuredServices[1].image} 
                      alt={featuredServices[1].title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-[1200ms] hover:scale-105"
                    />
                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur text-charcoal text-[9px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-md border border-[#C7A46A]/10">
                      {featuredServices[1].tag}
                    </div>
                  </div>
                  <div className="p-8 space-y-4">
                    <div className="flex justify-between items-baseline border-b border-gray-100 pb-3">
                      <h4 className="font-serif text-xl sm:text-2xl text-charcoal font-medium">{featuredServices[1].title}</h4>
                      <span className="font-serif text-base text-[#C7A46A] font-bold">{featuredServices[1].price}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-secondary-gray font-light leading-relaxed">
                      {featuredServices[1].description}
                    </p>
                  </div>
                </div>
                <div className="p-8 pt-0">
                  <button
                    onClick={() => onNavigate(featuredServices[1].page)}
                    className="w-full py-4 bg-beige-bg hover:bg-charcoal hover:text-white text-charcoal rounded-[16px] text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Découvrir l'éclat Vortex
                  </button>
                </div>
              </div>

              {/* Microneedling - Image Right template Style Card */}
              <div className="bg-white rounded-[32px] overflow-hidden border border-[#C7A46A]/10 shadow-[0_10px_35px_rgba(0,0,0,0.02)] flex flex-col justify-between">
                <div>
                  <div className="relative h-64 sm:h-72 overflow-hidden">
                    <img 
                      src={featuredServices[2].image} 
                      alt={featuredServices[2].title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-[1200ms] hover:scale-105"
                    />
                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur text-charcoal text-[9px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-md border border-[#C7A46A]/10">
                      {featuredServices[2].tag}
                    </div>
                  </div>
                  <div className="p-8 space-y-4">
                    <div className="flex justify-between items-baseline border-b border-gray-100 pb-3">
                      <h4 className="font-serif text-xl sm:text-2xl text-charcoal font-medium">{featuredServices[2].title}</h4>
                      <span className="font-serif text-base text-[#C7A46A] font-bold">{featuredServices[2].price}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-secondary-gray font-light leading-relaxed">
                      {featuredServices[2].description}
                    </p>
                  </div>
                </div>
                <div className="p-8 pt-0">
                  <button
                    onClick={() => onNavigate(featuredServices[2].page)}
                    className="w-full py-4 bg-beige-bg hover:bg-charcoal hover:text-white text-charcoal rounded-[16px] text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Détails du renouvellement cellulaire
                  </button>
                </div>
              </div>

            </div>

            {/* 3. ASYMMETRICAL BENTO MOSAIC (BEAUTÉ COUTURE & COMPLÉMENTS) */}
            <div className="space-y-8">
              <div className="border-b border-[#C7A46A]/20 pb-4 max-w-md">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C7A46A] font-bold block">La Beauté à la Carte</span>
                <h4 className="font-serif text-xl md:text-2xl text-charcoal">Les Finitions de Style</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
                
                {/* Browlift/Regard - Spans 5 columns */}
                <div className="md:col-span-5 bg-white rounded-[32px] overflow-hidden border border-[#C7A46A]/10 shadow-[0_10px_35px_rgba(0,0,0,0.02)] p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <span className="text-[9px] uppercase font-bold text-[#C7A46A] tracking-wider select-none">
                      Focus Regard / {featuredServices[3].price}
                    </span>
                    <h5 className="font-serif text-xl font-bold text-charcoal">{featuredServices[3].title}</h5>
                    <p className="text-xs text-secondary-gray font-light leading-relaxed">
                      {featuredServices[3].description}
                    </p>
                  </div>
                  <div className="relative h-44 rounded-[20px] overflow-hidden">
                    <img 
                      src={featuredServices[3].image} 
                      alt={featuredServices[3].title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={() => onNavigate(featuredServices[3].page)}
                    className="w-full py-3 bg-[#F8F5F0] hover:bg-[#C7A46A] text-charcoal hover:text-white rounded-[12px] text-[10px] font-bold uppercase tracking-wider transition-colors duration-300"
                  >
                    Harmoniser mon regard
                  </button>
                </div>

                {/* IPL / Epilation - Spans 7 columns with asymmetrical internal splits */}
                <div className="md:col-span-7 bg-white rounded-[32px] overflow-hidden border border-[#C7A46A]/10 shadow-[0_10px_35px_rgba(0,0,0,0.02)] p-8 sm:p-10 flex flex-col md:flex-row justify-between gap-8 items-stretch">
                  <div className="flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-4">
                      <span className="text-[9px] uppercase font-bold text-[#A8B29A] tracking-wider select-none">
                        Haute Technologie / {featuredServices[4].price}
                      </span>
                      <h5 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">{featuredServices[4].title}</h5>
                      <p className="text-xs text-secondary-gray font-light leading-relaxed">
                        {featuredServices[4].description}
                      </p>
                    </div>
                    <button
                      onClick={() => onNavigate(featuredServices[4].page)}
                      className="w-full py-3 bg-[#F8F5F0] hover:bg-[#C7A46A] text-charcoal hover:text-white rounded-[12px] text-[10px] font-bold uppercase tracking-wider transition-colors duration-300"
                    >
                      Bilan & IPL définitif
                    </button>
                  </div>
                  <div className="w-full md:w-56 h-48 md:h-auto rounded-[20px] overflow-hidden shrink-0">
                    <img 
                      src={featuredServices[4].image} 
                      alt={featuredServices[4].title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>

                {/* Teeth whitening / Blanchiment - Full width wide banner item */}
                <div className="md:col-span-12 bg-charcoal text-white rounded-[32px] overflow-hidden border border-[#C7A46A]/20 p-8 sm:p-10 flex flex-col md:flex-row items-center gap-8 justify-between relative">
                  <div className="absolute top-0 right-0 w-80 h-full bg-[#C7A46A]/5 blur-3xl pointer-events-none" />
                  <div className="space-y-4 max-w-xl relative z-10">
                    <span className="text-[9px] uppercase font-bold text-[#C7A46A] tracking-widest">
                      Dents & Sourire / {featuredServices[5].price}
                    </span>
                    <h5 className="font-serif text-2xl font-light tracking-wide">{featuredServices[5].title}</h5>
                    <p className="text-xs text-gray-300 font-light leading-relaxed">
                      {featuredServices[5].description}
                    </p>
                  </div>
                  <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 relative z-10 w-full md:w-auto">
                    <div className="h-20 w-32 rounded-[16px] overflow-hidden hidden sm:block border border-white/10">
                      <img 
                        src={featuredServices[5].image} 
                        alt={featuredServices[5].title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      onClick={() => onNavigate(featuredServices[5].page)}
                      className="px-6 py-3.5 bg-[#C7A46A] hover:bg-white text-white hover:text-charcoal rounded-[16px] text-xs font-bold uppercase tracking-wider transition-all duration-300"
                    >
                      Prendre Rendez-vous Sourire
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>

          <div className="mt-16 text-center bg-white rounded-[24px] p-6 border border-[#C7A46A]/10 max-w-3xl mx-auto shadow-sm">
            <p className="text-xs text-charcoal font-medium">
              💡 Vous hésitez sur le choix de votre protocole ? Nos diagnostics personnalisés sont entièrement inclus avec chaque soin.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  window.location.hash = '#/reservation';
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-primary !py-3 !px-6 !text-[11px]"
              >
                Réserver mon rendez-vous
              </button>
              <a
                href={`tel:${INSTITUT_INFO.phoneFormatted}`}
                className="text-xs uppercase font-bold text-[#C7A46A] hover:underline flex items-center gap-1.5"
              >
                <Phone className="h-3.5 w-3.5" /> Appeler pour un conseil direct
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EXCEPTIONAL DEDICATED SOIN ZONE: JAPANESE HEAD SPA */}
      <section className="bg-charcoal text-white py-24 relative overflow-hidden">
        {/* Subtle glowing elements to build dark luxury spa environment */}
        <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-[#A8B29A]/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#C7A46A]/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Vignelli Swiss Rule major header line in white/opacity for dark theme */}
          <div className="w-full border-t border-white/10 pt-4 mb-16 flex justify-between items-baseline font-mono text-[9px] tracking-[0.25em] text-gray-400 uppercase select-none">
            <span>SECTION 03 / FOCUS</span>
            <span>Le Secret Ancestral</span>
          </div>

          {/* Section Header */}
          <div className="text-left mb-16 space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C7A46A] font-bold block">
              JAPANESE HEAD SPA
            </span>
            <h2 className="font-serif text-3.5xl md:text-5xl lg:text-6xl text-white font-light tracking-tight leading-tight v-align-optical">
              L'Onsen du Cuir Chevelu
            </h2>
            <div className="w-16 h-[1.5px] bg-[#C7A46A]" />
            <p className="text-gray-300 text-xs md:text-sm max-w-2xl font-light leading-relaxed">
              Une immersion relaxante révolutionnaire où l'eau de source, le massage Shiatsu des méridiens crâniens et l'arche de pluie en halo soignent la fibre capillaire et apaisent l'esprit fatigué.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Cinematic block left column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative rounded-[28px] overflow-hidden border-2 border-[#C7A46A]/30 shadow-2xl group">
                <img
                  src={LUXURY_IMAGES.headSpa}
                  alt="Authentic Japanese Head Spa therapy water ring"
                  referrerPolicy="no-referrer"
                  className="w-full h-[400px] object-cover transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Floating soft play banner or water indicator badge */}
                <div className="absolute bottom-4 right-4 glass-dark text-white text-[10px] tracking-widest uppercase font-semibold px-4 py-2 rounded-full border border-white/10 flex items-center gap-1.5">
                  <Activity className="h-3 w-3 text-[#C7A46A]" /> Arche d'affusion active
                </div>
              </div>

              {/* Quick stats on the treatment */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 border border-white/10 rounded-[20px] text-center">
                  <span className="text-[#C7A46A] text-xl font-serif font-bold block">45 min</span>
                  <span className="text-[10px] uppercase text-gray-400 tracking-wider">Durée pure</span>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-[20px] text-center">
                  <span className="text-[#C7A46A] text-xl font-serif font-bold block">120 €</span>
                  <span className="text-[10px] uppercase text-gray-400 tracking-wider">Tarif séance</span>
                </div>
              </div>
            </div>

            {/* Protocol & Benefits center-right */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Benefits Subsection */}
              <div>
                <h3 className="font-serif text-lg text-[#C7A46A] tracking-wider mb-4 border-b border-white/10 pb-2">
                  ✨ Les Vertus Cliniques & Sensorielles
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex gap-3">
                    <CheckCircle className="h-5 w-5 text-[#A8B29A] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs md:text-sm text-gray-200 font-medium block">Active la Pousse</span>
                      <span className="text-[11px] text-gray-400 leading-snug">Booste la micro-circulation du bulbe capillaire.</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="h-5 w-5 text-[#A8B29A] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs md:text-sm text-gray-200 font-medium block">Régule le Sébum</span>
                      <span className="text-[11px] text-gray-400 leading-snug">Élimine définitivement pellicules et démangeaisons.</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="h-5 w-5 text-[#C7A46A] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs md:text-sm text-gray-200 font-medium block">Calme le Stress</span>
                      <span className="text-[11px] text-gray-400 leading-snug">Relâchement nerveux par digitopression crânienne.</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="h-5 w-5 text-[#C7A46A] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs md:text-sm text-gray-200 font-medium block">Améliore le Sommeil</span>
                      <span className="text-[11px] text-gray-400 leading-snug">Vertus apaisantes durables sur les maux de tête.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Full session protocol step roadmap */}
              <div>
                <h3 className="font-serif text-lg text-[#C7A46A] tracking-wider mb-4 border-b border-white/10 pb-2">
                  💆‍♂️ Déroulement & Protocole de Séance
                </h3>
                <div className="space-y-4">
                  <div className="relative pl-8 border-l border-[#C7A46A]/20">
                    <div className="absolute -left-[6px] top-1 w-3 h-3 rounded-full bg-[#C7A46A]" />
                    <span className="text-xs md:text-sm text-white font-semibold">1. Diagnostic à la Micro-caméra</span>
                    <p className="text-[11px] text-gray-400">Analyse rigoureuse de la santé cutanée du cuir chevelu pour un soin personnalisé.</p>
                  </div>
                  <div className="relative pl-8 border-l border-[#C7A46A]/20">
                    <div className="absolute -left-[6px] top-1 w-3 h-3 rounded-full bg-[#A8B29A]" />
                    <span className="text-xs md:text-sm text-white font-semibold">2. Gommage Détox & Bain d'Huiles</span>
                    <p className="text-[11px] text-gray-400">Élimination douce des toxines, peaux mortes et résidus chimiques.</p>
                  </div>
                  <div className="relative pl-8 border-l border-[#C7A46A]/20">
                    <div className="absolute -left-[6px] top-1 w-3 h-3 rounded-full bg-[#C7A46A]" />
                    <span className="text-xs md:text-sm text-white font-semibold">3. Massage Shiatsu sous le Halo d'eau</span>
                    <p className="text-[11px] text-gray-400">Massage crânien profond, nuque et trapèzes pour dénouer l'anxiété.</p>
                  </div>
                  <div className="relative pl-8">
                    <div className="absolute -left-[6px] top-1 w-3 h-3 rounded-full bg-[#A8B29A]" />
                    <span className="text-xs md:text-sm text-white font-semibold">4. Dôme de Vapeur & Soin Capillaire</span>
                    <p className="text-[11px] text-gray-400">Séchage et soin enveloppant réparateur Olaplex ou bio appliqué à chaud.</p>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Interactive Zen Accordion FAQs */}
          <div className="mt-16 max-w-4xl mx-auto space-y-3 pt-12 border-t border-white/10">
            <h3 className="font-serif text-xl text-center text-white mb-6">FAQ - Zen & Informations Pratiques</h3>
            <div className="space-y-3">
              {headSpaFaqs.map((faq, idx) => (
                <div
                  key={`hs-faq-${idx}`}
                  className="bg-white/5 border border-white/10 rounded-[18px] overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full flex justify-between items-center px-6 py-4.5 text-left text-xs md:text-sm font-semibold tracking-wide text-white hover:text-[#C7A46A] transition-colors focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    {activeFaq === idx ? (
                      <ChevronUp className="h-4 w-4 text-[#C7A46A]" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                  <AnimatePresence initial={false}>
                    {activeFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-5 pt-1 text-[11px] md:text-xs text-gray-300 leading-relaxed font-light border-t border-white/5 bg-white/[0.01]">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            <div className="text-center pt-8 space-y-4">
              <p className="text-xs text-gray-400 font-light">
                🕑 Planity ouvre ses réservations 24h/24. <strong className="text-amber-200">Les places s'envolent rapidement</strong> de par le protocole hautement privatisé.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <motion.button
                  onClick={() => onNavigate('head-spa')}
                  className="btn-primary !border-[#C7A46A] !text-white hover:bg-white hover:text-charcoal transition-all duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Tout découvrir sur notre Head Spa
                </motion.button>
                <button
                  onClick={() => {
                    window.location.hash = '#/reservation';
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3 bg-[#C7A46A] hover:bg-white text-white hover:text-charcoal rounded-[100px] text-xs uppercase tracking-widest font-semibold transition-all duration-300 cursor-pointer"
                >
                  Réserver en ligne maintenant
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. CONCIERGERIE DIGITALE : ADVISOR DE RITUEL SENSORIEL */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Vignelli Swiss Rule major header line */}
        <div className="w-full border-t-2 border-charcoal/10 pt-4 mb-16 flex justify-between items-baseline font-mono text-[9px] tracking-[0.25em] text-secondary-gray uppercase select-none">
          <span>SECTION 04 / INTERACTIF</span>
          <span>Conciergerie Digitale</span>
        </div>

        <div className="text-left mb-16 space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C7A46A] font-bold block">
            DIAGNOSTIC SUR-MESURE
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-charcoal font-light tracking-tight leading-tight v-align-optical">
            Sélecteur de Rituel Personnalisé
          </h2>
          <div className="w-16 h-[1.5px] bg-[#C7A46A]" />
          <p className="text-secondary-gray text-xs md:text-sm max-w-xl font-light leading-relaxed">
            Sélectionnez votre envie beauté. Notre intelligence sensorielle vous recommande le protocole parfait pour révéler votre éclat cellulaire.
          </p>
        </div>

        {/* 4 Premium Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-4xl mx-auto">
          {[
            { label: "Water & Glow", desc: "Éclat & Pureté", concern: "Pores obstrués, teint terne" },
            { label: "Cellular Youth", desc: "Fermeté & Ridules", concern: "Signes de l'âge, cicatrices" },
            { label: "Phyto-Sensorial", desc: "Douceur Bio", concern: "Peaux sensibles, détox" },
            { label: "Marine Healing", desc: "Thalasso Visage", concern: "Fatigue, stress urbain" }
          ].map((tab, idx) => (
            <button
              key={`ritual-tab-${idx}`}
              onClick={() => setSelectedConcern(idx)}
              className={`flex-1 min-w-[200px] text-center p-4 rounded-[20px] transition-all duration-300 border cursor-pointer ${
                selectedConcern === idx
                  ? 'bg-charcoal text-white border-charcoal shadow-md'
                  : 'bg-white text-secondary-gray border-[#C7A46A]/10 hover:border-[#C7A46A]/30 hover:bg-[#F8F5F0]'
              }`}
            >
              <span className="block text-[11px] uppercase tracking-widest font-bold">
                {tab.label}
              </span>
              <span className="block text-[8px] opacity-75 font-serif italic mt-0.5">
                {tab.desc} • {tab.concern}
              </span>
            </button>
          ))}
        </div>

        {/* Interactive Recommended Protocol card */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {comparisons.map((row, idx) => idx === selectedConcern && (
              <motion.div
                key={`advisor-result-${idx}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="bg-white rounded-[32px] border border-[#C7A46A]/15 shadow-xl p-8 sm:p-12 relative overflow-hidden"
              >
                {/* Background decorative watermark */}
                <div className="absolute right-0 bottom-0 text-[10rem] font-serif font-light text-beige-bg/20 leading-none select-none pointer-events-none translate-x-12 translate-y-8">
                  0{idx + 1}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A8B29A]/10 border border-[#A8B29A]/30 text-[9px] text-[#A8B29A] font-bold uppercase tracking-widest mb-3">
                        <Sparkles className="h-3 w-3" /> Votre recommandation sur-mesure
                      </div>
                      <h3 className="font-serif text-2.5xl sm:text-3.5xl text-charcoal font-light">
                        {row.name}
                      </h3>
                      <p className="text-xs text-[#C7A46A] uppercase tracking-wider font-semibold font-sans mt-0.5">
                        {row.type}
                      </p>
                    </div>

                    <div className="h-[1px] w-full bg-gray-100" />

                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Cible & État de Peau</span>
                        <p className="text-xs sm:text-sm text-secondary-gray leading-relaxed font-light">{row.target}</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Technologie de soin</span>
                        <p className="text-xs sm:text-sm text-charcoal font-medium">{row.tech}</p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 lg:col-start-9 bg-[#F8F5F0] p-6 sm:p-8 rounded-[24px] border border-[#C7A46A]/10 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Durée</span>
                        <span className="font-serif text-lg font-bold text-charcoal block mt-0.5">{row.duration}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Tarif</span>
                        <span className="font-serif text-lg font-bold text-[#C7A46A] block mt-0.5">{row.price}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1">Temps d'éviction</span>
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[9px] font-bold ${
                          row.eviction === "Aucune (Éclat direct)" || row.eviction.includes("Aucune")
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-amber-50 text-amber-600'
                        }`}>
                          {row.eviction}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-[9px] uppercase tracking-wider text-gray-400 block mb-0.5">Intensité</span>
                        <span className="text-xs text-[#C7A46A] tracking-wider block font-serif">{row.effets}</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => {
                          window.location.hash = '#/reservation';
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="w-full py-4 bg-[#C7A46A] hover:bg-charcoal text-white rounded-[16px] text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md flex items-center justify-center gap-2 border border-[#C7A46A]/40"
                      >
                        <Calendar className="h-4 w-4" />
                        Réserver votre parenthèse
                      </button>
                      <button
                        onClick={() => onNavigate(row.action)}
                        className="w-full py-2 text-center text-secondary-gray hover:text-charcoal text-[11px] font-medium tracking-wide underline mt-3 block bg-transparent border-0 cursor-pointer"
                      >
                        Détails scientifiques
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* 6. INTERACTIVE BEFORE/AFTER SLIDER ZONE */}
      <section className="py-24 bg-white border-y border-[#C7A46A]/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Vignelli Swiss Rule major header line */}
          <div className="w-full border-t-2 border-charcoal/10 pt-4 mb-16 flex justify-between items-baseline font-mono text-[9px] tracking-[0.25em] text-secondary-gray uppercase select-none">
            <span>SECTION 05 / RÉSULTATS</span>
            <span>Révélation Cellulaire</span>
          </div>
          <AvantApresSlider />
        </div>
      </section>

      {/* 7. LUXURY GUEST BOOK REVIEW TESTIMONIALS */}
      <section className="py-24 bg-[#F8F5F0]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Vignelli Swiss Rule major header line */}
          <div className="w-full border-t-2 border-charcoal/10 pt-4 mb-16 flex justify-between items-baseline font-mono text-[9px] tracking-[0.25em] text-secondary-gray uppercase select-none">
            <span>SECTION 06 / RÉPUTATION</span>
            <span>Livre d'Or</span>
          </div>

          <div className="flex flex-col md:flex-row items-start justify-between mb-16 gap-6">
            <div className="space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C7A46A] font-bold block">
                TÉMOIGNAGES SENSORIELS
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-charcoal font-light tracking-tight leading-tight v-align-optical">
                L'Atelier Plébiscité par Nos Hôtes
              </h2>
              <div className="w-16 h-[1.5px] bg-[#C7A46A]" />
            </div>
            
            {/* Google review average rating display box */}
            <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-[24px] border border-[#C7A46A]/20 shadow-sm">
              <div className="text-center">
                <span className="block font-serif text-3xl font-bold text-charcoal">4.9<span className="text-[#C7A46A] text-sm font-medium">/5</span></span>
                <span className="text-[9px] text-[#secondary-gray] uppercase font-bold tracking-wider block mt-0.5">Note globale</span>
              </div>
              <div className="h-10 w-[1px] bg-[#C7A46A]/30" />
              <div>
                <div className="flex text-yellow-500 gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <span className="text-xs text-secondary-gray">Plus de 180 avis vérifiés de l'institut</span>
              </div>
            </div>
          </div>

          {/* Grid list of luxury visitor books reviews with elegant design */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {REVIEWS.map((review, i) => (
              <motion.div
                key={`rev-v2-${i}`}
                className="bg-white border border-[#C7A46A]/10 rounded-[24px] p-6 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="space-y-4">
                  {/* Avatar & Verification banner */}
                  <div className="flex items-center justify-between">
                    <span className="h-10 w-10 text-xs font-bold text-white uppercase bg-charcoal rounded-full flex items-center justify-center border border-[#C7A46A]/40 group-hover:bg-[#C7A46A] transition-colors duration-300">
                      {review.avatar}
                    </span>
                    <span className="text-[10px] text-secondary-gray font-light">{review.date}</span>
                  </div>

                  <div className="flex text-yellow-500 gap-0.5">
                    {[...Array(review.rating)].map((_, idx) => (
                      <Star key={idx} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>

                  <p className="text-xs md:text-sm text-secondary-gray leading-relaxed italic font-light">
                    "{review.text}"
                  </p>
                </div>

                <div className="pt-5 mt-6 border-t border-[#C7A46A]/10 flex justify-between items-center">
                  <span className="text-xs font-serif font-bold text-charcoal">{review.author}</span>
                  <span className="text-[9px] text-[#A8B29A] font-bold uppercase tracking-wider bg-[#A8B29A]/10 px-2.5 py-0.5 rounded-full">
                    Soin Vérifié
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Luxury CTA call to action inside reviews */}
          <div className="mt-12 text-center">
            <motion.button
              onClick={() => {
                window.location.hash = '#/reservation';
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Faire l'expérience de l'excellence - Réserver sur Planity
            </motion.button>
          </div>

        </div>
      </section>

      {/* 7.5 TOTAL BRAND EXPERTISE CATEGORIZED FAQS */}
      <section className="py-24 bg-white border-y border-[#C7A46A]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C7A46A] font-bold block">
              Centre de Connaissances
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-charcoal font-medium">
              Questions Fréquentes de l’Atelier
            </h2>
            <div className="h-[1.5px] w-16 bg-[#C7A46A] mx-auto" />
            <p className="text-secondary-gray text-xs md:text-sm font-light">
              Tout ce que vous devez savoir pour aborder votre soin en toute confiance.
            </p>
          </div>

          <FaqAccordionSection />

          <div className="mt-12 text-center p-8 rounded-[28px] bg-beige-bg border border-[#C7A46A]/15 shadow-sm space-y-4">
            <h4 className="font-serif text-lg font-semibold text-charcoal">Vous avez une autre question spécifique ?</h4>
            <p className="text-xs text-secondary-gray font-light max-w-lg mx-auto leading-relaxed">
              Lola est disponible pour répondre à toutes vos interrogations par téléphone ou directement via notre compte Instagram pour valider vos objectifs de peau.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <a
                href={INSTITUT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-charcoal/20 bg-[#2E2E2E] px-6 py-3.5 text-[10px] md:text-xs uppercase tracking-wider font-semibold text-white hover:bg-black transition-all duration-300"
              >
                <Instagram className="h-4 w-4 text-[#C7A46A]" /> Échanger sur Instagram
              </a>
              <motion.button
                onClick={() => {
                  window.location.hash = '#/reservation';
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-primary !py-3.5 !px-6 !text-[11px]"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Réserver mon soin maintenant
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. INSTAGRAM GRID GALLERY */}
      <section className="py-24 bg-[#F8F5F0]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C7A46A] font-bold block">
              Inspiration Quotidienne
            </span>
            <h2 className="font-serif text-2xl md:text-4xl text-charcoal font-medium mt-1">
              Les Résultats en Image @atelier_by.lola
            </h2>
            <p className="text-secondary-gray text-xs md:text-sm mt-1 font-light">
              Suivez en continu nos techniques avant-gardistes de soin.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {INSTAGRAM_FEED.map((item) => (
              <a
                key={item.id}
                href={INSTITUT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square rounded-[24px] overflow-hidden border border-[#C7A46A]/10 shadow-sm block"
              >
                <img
                  src={item.url}
                  alt={`Atelier Lola transformation portfolio ${item.id}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Visual statistics on hover */}
                <div className="absolute inset-0 bg-charcoal/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 text-white text-xs font-semibold">
                  <span>❤️ {item.likes}</span>
                  <span>💬 {item.comments}</span>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-10">
            <motion.a
              href={INSTITUT_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[24px] border border-[#C7A46A]/30 px-6 py-3.5 text-xs uppercase tracking-wider font-semibold text-charcoal hover:bg-[#C7A46A] hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
            >
              <Instagram className="h-4 w-4" />
              S'abonner sur Instagram
            </motion.a>
          </div>

        </div>
      </section>

    </div>
  );
}

// 7.5.5 SEPARATE ENHANCED SUBWIDGET FOR COMPLEX MULTI-CATEGORY FAQS
function FaqAccordionSection() {
  const categories = [
    { id: 'all', name: 'Tous les soins' },
    { id: 'head-spa', name: 'Head Spa' },
    { id: 'hydra-facial', name: 'HydraFacial' },
    { id: 'microneedling', name: 'Microneedling' },
    { id: 'ipl', name: 'Épilation IPL' },
    { id: 'browlift', name: 'Browlift / Cils' },
    { id: 'blanchiment', name: 'Blanchiment' }
  ];

  const [activeCategory, setActiveCategory] = useState('all');
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const faqs = [
    {
      id: 'hs-1',
      category: 'head-spa',
      question: "Pourquoi le Head Spa de l’Atelier by Lola est-il unique ?",
      answer: "Lola réalise une vraie thérapie capillaire privatisée. Dans un espace calme baigné d'huiles essentielles bio et de sonorités zen, votre cuir chevelu passe par un examen haute définition à la micro-caméra, un massage d'acupression crâniene japonaise Shiatsu, l'arche d'eau chaude brevetée en massage continu et un dôme de vapeur purifié ionisant."
    },
    {
      id: "hs-2",
      category: 'head-spa',
      question: "La séance est-elle adaptée pour tous les types de cheveux ?",
      answer: "Absolument. Cheveux bouclés, lisses, crépus, colorés, naturels ou très fragilisés : le gommage détoxifiant et les shampoings d'excellence botaniques appliqués sont rigoureusement choisis et adaptés selon la nature de vos bulbes pileux."
    },
    {
      id: 'hydra-1',
      category: 'hydra-facial',
      question: "Comment se déroule un soin HydraFacial Signature ?",
      answer: "Le soin combine 4 étapes incontournables : (1) Nettoyage en profondeur des pores par hydro-aspiration, (2) Exfoliation douce aux acides de fruits botaniques, (3) Extraction des comédons par aspiration vortex brevetée, (4) Infusion d’acide hyaluronique, de peptides restructurants et de sérums protecteurs hautement antioxydants."
    },
    {
      id: 'hydra-2',
      category: 'hydra-facial',
      question: "Qu'en est-il du temps d'éviction après l’HydraFacial ?",
      answer: "Aucun temps d'éviction sociale n'est nécessaire. L'éclat est instantané, les pores sont resserrés et la peau est pulpeuse dès la sortie de notre institut. Une légère rougeur s'estompe en moins d'une heure."
    },
    {
      id: 'micro-1',
      category: 'microneedling',
      question: "Qu'est-ce que le Microneedling et à qui s'adresse-t-il ?",
      answer: "Il s'agit d'une technique de bio-stimulation à l'aide d'un dispositif professionnel rotatif doté de micro-aiguilles stériles à usage unique. Il induit un cocktail de nutriments/vitamines profondément dans le derme pour combler les ridules, estomper cicatrices d'acné, pores dilatés et relancer la synthèse naturelle d'élastine."
    },
    {
      id: 'micro-2',
      category: 'microneedling',
      question: "Est-ce douloureux et combien de séances faut-il ?",
      answer: "Un inconfort passager peut être ressenti sur les zones sensibles du front ou du nez, mais le geste reste parfaitement tolérable. Pour une correction des imperfections installées (taches, cicatrices), une cure de 3 séances est vivement recommandée."
    },
    {
      id: 'ipl-1',
      category: 'ipl',
      question: "L’épilation définitive IPL à la lumière pulsée d'exception fait-elle mal ?",
      answer: "Grâce à notre équipement professionnel de pointe muni d’une technologie de refroidissement intégrée continue ('Doul-Cooling'), le soin est quasiment indolore. Vous ressentirez une fraîcheur vivifiante et une légère impulsion comparable à un petit élastique chaud."
    },
    {
      id: 'ipl-2',
      category: 'ipl',
      question: "Combien de séances en moyenne sont nécessaires ?",
      answer: "Il faut généralement compter entre 6 et 10 séances, espacées de 4 à 8 semaines selon la zone, pour éliminer définitivement plus de 85% à 95% de la pilosité. Lola effectue toujours un flash-test gratuit pour rassurer et adapter la puissance de l'appareil."
    },
    {
      id: 'brow-1',
      category: 'browlift',
      question: "Quelle est la différence entre Browlift et Microblading ?",
      answer: "Le Browlift est un procédé semi-permanent sans aiguille ni pigment, qui discipline, rehausse et structure le poil naturel de vos sourcils à l’aide d'un soin reconstructeur à la kératine. Le Microblading est une technique de maquillage permanent par micro-pigmentation."
    },
    {
      id: 'brow-2',
      category: 'browlift',
      question: "Combien de temps dure le rehaussement de cils et le Browlift ?",
      answer: "Les résultats durent en moyenne entre 6 et 8 semaines. Aucun entretien n'est nécessaire, si ce n'est brosser délicatement et appliquer un sérum nutritif pour préserver la douceur de la kératine."
    },
    {
      id: 'blanch-1',
      category: 'blanchiment',
      question: "Le blanchiment dentaire de l'Atelier provoque-t-il des douleurs aux gencives ?",
      answer: "Non. Nos formules exclusives de gel de dernière génération agissent délicatement sans peroxyde fortement concentré. L'activation se fait sous lumière LED froide double spectre, ce qui préserve l'émail originel et évite la sensibilité gingivale redoutée."
    },
    {
      id: 'blanch-2',
      category: 'blanchiment',
      question: "Combien de teintes puis-je espérer gagner dès la première séance ?",
      answer: "Selon l'historique dentaire (café, thé, tabac), vos dents peuvent gagner entre 4 et 9 teintes d’éclat dès la première consultation d’1h30. Les séances de retouche ou cures Max permettent d’ancrer ce blanc miroir."
    }
  ];

  const filteredFaqs = faqs.filter(faq => activeCategory === 'all' || faq.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Scrollable Filters row */}
      <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setOpenFaqId(null);
            }}
            className={`px-4 py-2 border rounded-full text-xs font-semibold tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-[#C7A46A] text-white border-[#C7A46A]'
                : 'bg-white text-secondary-gray border-[#C7A46A]/20 hover:border-[#C7A46A]'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* FAQs rendering */}
      <div className="space-y-3">
        {filteredFaqs.map((faq) => {
          const isOpen = openFaqId === faq.id;
          return (
            <div
              key={faq.id}
              className="bg-[#F8F5F0] border border-[#C7A46A]/10 rounded-[20px] overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                className="w-full flex justify-between items-center px-6 py-4.5 text-left text-xs md:text-sm font-semibold tracking-wide text-charcoal hover:text-[#C7A46A] transition-colors focus:outline-none"
              >
                <span className="pr-4">{faq.question}</span>
                {isOpen ? (
                  <ChevronUp className="h-4 w-4 text-[#C7A46A] shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-secondary-gray shrink-0" />
                )}
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="px-6 pb-5 pt-1 text-xs text-secondary-gray leading-relaxed font-light border-t border-[#C7A46A]/10 bg-white/50">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
