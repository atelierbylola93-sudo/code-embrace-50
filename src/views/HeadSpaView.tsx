import { motion } from 'motion/react';
import { Calendar, CheckCircle2, Star, ShieldCheck, HeartPulse, Activity } from 'lucide-react';
import { HEAD_SPA_DATA, INSTITUT_INFO, LUXURY_IMAGES } from '../data';
import FaqSection from '../components/FaqSection';

export default function HeadSpaView() {
  return (
    <div id="head-spa-view" className="w-full pt-28 pb-10">
      
      {/* Immersive Top Hero */}
      <section className="relative h-[300px] md:h-[450px] flex items-center justify-center bg-black overflow-hidden rounded-b-[24px]">
        <img
          src={LUXURY_IMAGES.headSpa}
          alt="Japanese Head Spa Jet Halo L'Atelier by Lola Le Pré-Saint-Gervais"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-55 scale-102 filter brightness-[0.70]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8F5F0] via-black/10 to-black/40" />
        
        <div className="relative z-10 text-center space-y-4 px-4 max-w-3xl">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/95 font-bold bg-[#C7A46A] px-4 py-1 rounded-full border border-white/20">
            Soin Signature National Japonais
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-white font-light tracking-wide">
            Head Spa Le Pré-Saint-Gervais
          </h1>
          <p className="text-white/90 text-sm md:text-base italic font-serif">
            Le rituel d'hydro-thérapie et d'aromathérapie suprême pour votre esprit et votre chevelure
          </p>
        </div>
      </section>

      {/* Main Core Detail Panel */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Side: Summary & Sizing Banner */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C7A46A] font-bold">L'Expérience Authentique</span>
            <h2 className="font-serif text-2xl md:text-4xl text-charcoal font-medium">
              {HEAD_SPA_DATA.subtitle}
            </h2>
            <p className="text-secondary-gray text-xs md:text-base leading-relaxed">
              {HEAD_SPA_DATA.description}
            </p>
          </div>

          {/* Quick Stats: Price & Duration */}
          <div className="grid grid-cols-2 gap-4 bg-white card-rounded premium-shadow p-6 border border-[#C7A46A]/10 text-center">
            <div>
              <span className="text-xs text-secondary-gray uppercase tracking-wider font-semibold block">Tarif de Prestige</span>
              <span className="font-serif text-3xl font-bold text-[#C7A46A] mt-1 block">{HEAD_SPA_DATA.price} €</span>
            </div>
            <div className="border-l border-[#C7A46A]/10">
              <span className="text-xs text-secondary-gray uppercase tracking-wider font-semibold block">Durée de l'Évasion</span>
              <span className="font-serif text-3xl font-bold text-charcoal mt-1 block">{HEAD_SPA_DATA.duration}</span>
            </div>
          </div>

          {/* Step-by-step description with icons */}
          <div className="space-y-6">
            <h3 className="font-serif text-lg md:text-2xl font-semibold text-charcoal">Les 4 Étapes de la Renaissance :</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {HEAD_SPA_DATA.steps.map((step, idx) => (
                <div key={`step-${idx}`} className="bg-white p-6 card-rounded premium-shadow border border-[#C7A46A]/5 space-y-2 hover-lift">
                  <h4 className="font-serif font-bold text-base text-charcoal flex items-center gap-2">
                    <span className="h-6 w-6 rounded-full bg-[#A8B29A]/15 text-[#A8B29A] text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    {step.title}
                  </h4>
                  <p className="text-secondary-gray text-xs md:text-sm leading-relaxed pl-8">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Benefits Panel & CTA Box */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Benefits Bullet Points */}
          <div className="bg-[#1E1E1E] text-white p-8 rounded-[24px] shadow-lg border-t-4 border-[#C7A46A] space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-white/[0.02] filter blur-xl pointer-events-none" />
            
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#C7A46A] font-bold block">Clinique & Bien-être</span>
              <h3 className="font-serif text-xl md:text-2xl text-white font-medium">Bienfaits Scientifiques</h3>
            </div>
            
            <div className="h-[1px] w-full bg-white/10" />

            <ul className="space-y-4">
              {HEAD_SPA_DATA.benefits.map((benefit, idx) => (
                <li key={`benefit-${idx}`} className="flex items-start gap-3.5 text-xs md:text-sm text-gray-300">
                  <CheckCircle2 className="h-5 w-5 text-[#C7A46A] shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-xs text-gray-400 space-y-2">
              <div className="flex items-center gap-2 text-[#A8B29A] font-bold">
                <ShieldCheck className="h-4 w-4" />
                <span>Régulation & Pureté</span>
              </div>
              <p>Analysé attentivement, nous choisissons uniquement des produits hypoallergéniques d'exception aux essences d'Argan bio, menthe japonaise et thym sauvage.</p>
            </div>
          </div>

          {/* Quick CTA Box */}
          <div className="bg-white border border-[#C7A46A]/20 p-8 rounded-[24px] shadow-sm text-center space-y-6">
            <p className="text-[#C7A46A] text-xs font-semibold tracking-widest uppercase">
              ✨ Expérience Extrêmement Demandée ✨
            </p>
            <p className="text-secondary-gray text-xs leading-relaxed">
              En raison de la haute technicité et des massages Shiatsu prolongés de notre dôme thermal, les places pour le Head Spa sont limitées. Réservation recommandée 72 heures à l'avance.
            </p>
            
            <motion.button
              onClick={() => {
                window.location.hash = '#/reservation';
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full btn-primary flex items-center justify-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Calendar className="h-4 w-4" />
              Réserver ma fontaine d'eau
            </motion.button>
          </div>

        </div>
      </section>

      {/* SEO Dedicated Accordion FAQs */}
      <section className="bg-white py-16 border-t border-[#C7A46A]/10">
        <FaqSection
          faqItems={HEAD_SPA_DATA.faq}
          title="FAQ Head Spa • Le Pré-Saint-Gervais"
          subtitle="Comprendre le pouvoir thérapeutique du cuir chevelu en quelques réponses clés."
        />
      </section>

    </div>
  );
}
