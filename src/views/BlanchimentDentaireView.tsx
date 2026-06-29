import { motion } from 'motion/react';
import { Calendar, CheckCircle2, Star, Sparkles } from 'lucide-react';
import { BLANCHIMENT_DENTAIRE_DATA, INSTITUT_INFO, LUXURY_IMAGES } from '../data';
import FaqSection from '../components/FaqSection';

export default function BlanchimentDentaireView() {
  return (
    <div id="blanchiment-dentaire-view" className="w-full pt-28 pb-10">
      
      {/* Visual Ambient Banner */}
      <section className="relative h-[250px] md:h-[350px] flex items-center justify-center bg-black overflow-hidden rounded-b-[24px]">
        <img
          src={LUXURY_IMAGES.blanchimentDentaire}
          alt="Blanchiment Dentaire Le Pré-Saint-Gervais L'Atelier Lola"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-102 filter brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8F5F0] via-black/10 to-black/35" />
        
        <div className="relative z-10 text-center space-y-3 px-4">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-white/95 font-bold bg-[#C7A46A] px-4 py-1.5 rounded-full border border-white/20">
            Esthétique du Sourire LED
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-white font-light tracking-wide">
            Blanchiment Dentaire Premium
          </h1>
          <p className="text-white/80 text-xs md:text-sm italic font-serif">
            Illuminez instantanément votre expression faciale avec notre protocole de pointe au Pré-Saint-Gervais
          </p>
        </div>
      </section>

      {/* Intro Text */}
      <section className="py-12 max-w-4xl mx-auto px-4 md:px-8 text-center space-y-4">
        <h2 className="font-serif text-2xl md:text-3xl text-charcoal font-medium">Un Sourire Lumineux & Sûr</h2>
        <p className="text-secondary-gray text-xs md:text-sm leading-relaxed max-w-2xl mx-auto">
          {BLANCHIMENT_DENTAIRE_DATA.description}
        </p>
      </section>

      {/* Pricing and Details Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left column: Priced options */}
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C7A46A] font-bold">Rituels de Blancheur</span>
            <h3 className="font-serif text-xl md:text-2xl text-charcoal font-medium">Nos Formules Éclat LED</h3>
            <div className="h-[1px] w-20 bg-[#C7A46A]/40" />
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLANCHIMENT_DENTAIRE_DATA.items.map((item, idx) => (
              <div
                key={`blanch-${idx}`}
                className={`bg-white rounded-[24px] p-6 border transition-all duration-300 flex flex-col justify-between group relative h-full shadow-sm ${
                  item.isPopular
                    ? 'border-[#C7A46A] shadow-md'
                    : 'border-[#C7A46A]/10 hover:border-[#C7A46A]/20 hover:shadow-lg'
                }`}
              >
                {item.isPopular && (
                  <span className="absolute top-4 right-4 bg-[#C7A46A] text-white text-[9px] uppercase font-bold tracking-wider px-3 py-1 rounded-full">
                    Sourire Star
                  </span>
                )}

                <div className="space-y-3">
                  <div className="flex justify-between items-baseline gap-4">
                    <h4 className="font-serif text-base font-bold text-charcoal group-hover:text-[#C7A46A] transition-colors">
                      {item.name}
                    </h4>
                  </div>

                  <span className="font-serif text-3xl font-bold text-[#C7A46A] block">
                    {item.price} €
                  </span>

                  {item.duration && (
                    <span className="inline-block text-[10px] text-secondary-gray bg-[#F8F5F0] px-2.5 py-1 rounded-[12px] font-semibold">
                      ⏱️ {item.duration}
                    </span>
                  )}

                  {item.description && (
                    <p className="text-xs text-secondary-gray leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-[#F8F5F0] flex items-center justify-between text-xs">
                  <span className="text-secondary-gray flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-[#C7A46A]" /> Zéro sensibilité
                  </span>
                  <a
                    href={INSTITUT_INFO.planityUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C7A46A] font-semibold group-hover:underline flex items-center gap-1"
                  >
                    Réserver
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Benefits */}
        <div className="lg:col-span-4 space-y-8">
          
          <div className="bg-[#1E1E1E] text-white p-8 rounded-[24px] shadow-lg border-t-4 border-[#C7A46A] space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-white/[0.02] filter blur-xl pointer-events-none" />
            
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#C7A46A] font-bold block">Sûr & Réglementé</span>
            <h3 className="font-serif text-xl text-white font-medium">Bénéfices Sourire</h3>
            
            <div className="h-[1px] w-full bg-white/10" />

            <ul className="space-y-4">
              {BLANCHIMENT_DENTAIRE_DATA.benefits.map((benefit, idx) => (
                <li key={`blanch-ben-${idx}`} className="flex items-start gap-4 text-xs md:text-sm text-gray-300">
                  <CheckCircle2 className="h-5 w-5 text-[#C7A46A] shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-[11px] text-gray-400 space-y-1">
              <span className="text-[#A8B29A] font-semibold block">☕ Astuce de Lola :</span>
              La diète blanche (pâtes, riz, blanc de dinde) est absolument exigée pendant les 48 heures suivant la séance pour sceller l'éclat dentaire.
            </div>
          </div>

          {/* Simple book box */}
          <div className="bg-white border border-[#C7A46A]/20 p-8 rounded-[24px] shadow-sm text-center space-y-4">
            <h4 className="font-serif text-lg text-charcoal">Prendre RDV</h4>
            <p className="text-secondary-gray text-xs leading-relaxed">
              Consultez Lola pour votre blanchiment dentaire esthétique indolore sur Planity au Pré-Saint-Gervais.
            </p>
            <motion.a
              href={INSTITUT_INFO.planityUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 rounded-[24px] bg-[#C7A46A] tracking-[0.1em] py-4 text-xs font-semibold uppercase text-white shadow-md hover:bg-[#b5925a]"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Calendar className="h-4 w-4" />
              Réserver ma séance Éclat
            </motion.a>
          </div>

        </div>

      </section>

      {/* Accordion FAQs */}
      <section className="bg-white py-16 border-t border-[#C7A46A]/10">
        <FaqSection
          faqItems={BLANCHIMENT_DENTAIRE_DATA.faq}
          title="FAQ Blanchiment Dentaire • Le Pré-Saint-Gervais"
          subtitle="Toutes les réponses pour concilier émail dentaire protégé et luminosité."
        />
      </section>

    </div>
  );
}
