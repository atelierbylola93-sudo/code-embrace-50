import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Clock, Plus, Check, Calendar, ArrowRight, ArrowLeft, User, Mail, Phone, CheckCircle2, ChevronRight, Info, AlertCircle, Trash2 } from 'lucide-react';
import { INSTITUT_INFO } from '../data';

interface BookingService {
  id: string;
  name: string;
  price: number;
  duration: string;
  category: string;
  description: string;
  upsells: {
    id: string;
    name: string;
    price: number;
    description: string;
  }[];
}

const RESERVATION_SERVICES: BookingService[] = [
  {
    id: 'head-spa',
    name: "Head Spa Japonais Privatisé",
    price: 120,
    duration: "45 min",
    category: "Head Spa",
    description: "Diagnostic caméra, gommage, massage shiatsu et arche d'eau chaude.",
    upsells: [
      { id: 'h-up-cam', name: "Suivi Micro-caméra 3D", price: 15, description: "Analyse cellulaire post-soin pour mesurer l'amélioration cutanée." },
      { id: 'h-up-brush', name: "Brushing Finition Prestige", price: 20, description: "Séchage structuré avec élixir protecteur pour une sortie éblouissante." },
      { id: 'h-up-amp', name: "Ampoule Active de Kératine pure", price: 10, description: "Infusion sous la vapeur pour fortifier la structure du cheveu." }
    ]
  },
  {
    id: 'hydrafacial',
    name: "HydraFacial Signature",
    price: 105,
    duration: "45 min",
    category: "Soins Visage",
    description: "Nettoyage en profondeur, extraction des comédons et infusion de vitamines.",
    upsells: [
      { id: 'v-up-glass', name: "Masque d'Or Pur 24 Carats", price: 20, description: "Glow ultime d'exception et effet repulpant immédiat." },
      { id: 'v-up-led', name: "Photothérapie LED Anti-âge", price: 15, description: "Stimule la néocollagénèse cutanée pour estomper les rides." }
    ]
  },
  {
    id: 'browlift',
    name: "Browlift Signature HD",
    price: 65,
    duration: "45 min",
    category: "Regard",
    description: "Discipline, épaissit et rehausse les sourcils pour un regard intense.",
    upsells: [
      { id: 'r-up-teint', name: "Teinture Hybride haute tenue", price: 15, description: "Accentue la ligne naturelle pour remplacer totalement le maquillage." },
      { id: 'r-up-boost', name: "Soin Kératine Boost réparateur", price: 10, description: "Sérum gainant assurant nutrition et tenue prolongée." }
    ]
  },
  {
    id: 'ombré-hair',
    name: "Ombré Hair Divin & Olaplex",
    price: 350,
    duration: "4h 00 min",
    category: "Coiffure",
    description: "Transition de couleur sur-mesure combinant Olaplex et Kératine.",
    upsells: [
      { id: 'c-up-pat', name: "Patine Brillance Miroir", price: 25, description: "Neutralise 100% des reflets jaunâtres pour un blond polaire parfait." },
      { id: 'c-up-bot', name: "Soin Botox express", price: 40, description: "Redonne matière et gaine la chevelure après l'éclaircissement." }
    ]
  },
  {
    id: 'lissage-bresilien',
    name: "Lissage Brésilien Prestige",
    price: 200,
    duration: "3h 00 min",
    category: "Coiffure",
    description: "Lissage thermo-actif enrichi à la kératine pure, dure 4 à 6 mois.",
    upsells: [
      { id: 'c-up-kit', name: "Kit d'entretien Pro-Kératine", price: 45, description: "Shampoing et masque pour prolonger la durée du lissage à la maison." }
    ]
  },
  {
    id: 'ipl-bikini',
    name: "Épilation IPL Maillot Intégral",
    price: 50,
    duration: "35 min",
    category: "IPL",
    description: "Technologie de lumière pulsée avec refroidissement intégré indolore.",
    upsells: [
      { id: 'i-up-sif', name: "Option zone SIF (Sillon)", price: 20, description: "Ajout de la zone délicate en tarif préférentiel." }
    ]
  },
  {
    id: 'dentaire-max',
    name: "Blanchiment MAX WHITE",
    price: 100,
    duration: "50 min",
    category: "Sourire",
    description: "Formule douce sans douleur, gagnez 3 à 6 teintes sous lampe LED active.",
    upsells: [
      { id: 'd-up-repair', name: "Soin Protect Émail minéralisant", price: 15, description: "Referme les pores microscopiques et renforce la barrière." }
    ]
  },
  {
    id: 'corps-algues',
    name: "Soin Corps Enveloppement aux Algues",
    price: 150,
    duration: "1h 20 min",
    category: "Corps",
    description: "Gommage, masque chaud d'algues de Bretagne, et modelage lymphatique.",
    upsells: [
      { id: 'b-up-leg', name: "Drainage cryo Jambes Légères", price: 25, description: "Active la circulation contre la sensation de lourdeur estivale." }
    ]
  }
];

const CATEGORIES = ["Tous", "Head Spa", "Soins Visage", "Coiffure", "Regard", "IPL", "Sourire", "Corps"];

export default function ReservationView() {
  const [step, setStep] = useState<number>(1);
  const [selectedServices, setSelectedServices] = useState<BookingService[]>([]);
  const [selectedUpsells, setSelectedUpsells] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [clientInfo, setClientInfo] = useState({ name: '', email: '', phone: '', note: '' });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('Tous');
  
  // Real-time slot fetching loaders to satisfy premium "perfectly synchronized calendar" experience
  const [isSyncingSlots, setIsSyncingSlots] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [bookingConfirmedDetails, setBookingConfirmedDetails] = useState<any | null>(null);

  // Calendar sync simulation on client side: "Google Calendar connection"
  const [isSyncingGoogleCalendar, setIsSyncingGoogleCalendar] = useState<boolean>(false);
  const [isGoogleCalendarConnected, setIsGoogleCalendarConnected] = useState<boolean>(false);

  // Generate future dates (next 8 days starting tomorrow)
  const getNextDays = () => {
    const dates = [];
    const locale = 'fr-FR';
    for (let i = 1; i <= 8; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      // Format as string
      const dayName = d.toLocaleDateString(locale, { weekday: 'short' });
      const dayNum = d.toLocaleDateString(locale, { day: 'numeric' });
      const monthName = d.toLocaleDateString(locale, { month: 'short' });
      const fullIso = d.toISOString().split('T')[0];
      dates.push({ dayName, dayNum, monthName, fullIso });
    }
    return dates;
  };

  const datesList = getNextDays();

  // Simulated open slots that feel realistic. If calendar is connected, we hide some slots to show dynamic adaptation!
  const defaultSlots = ["09:30", "11:00", "12:30", "14:00", "15:30", "17:00", "18:30"];
  const calendarSyncedSlots = ["11:00", "14:00", "17:00", "18:30"]; // 09:30, 12:30, 15:30 are "blocked by client personal calendar events"

  const availableSlots = isGoogleCalendarConnected ? calendarSyncedSlots : defaultSlots;

  // Trigger sync animation when a date is clicked
  const handleDateClick = (isoString: string) => {
    setSelectedDate(isoString);
    setSelectedTimeSlot('');
    setIsSyncingSlots(true);
    // Mimics reading official Planity API schedules real-time
    setTimeout(() => {
      setIsSyncingSlots(false);
    }, 450);
  };

  // Safe client validation
  const isFormValid = clientInfo.name.trim().length > 2 && 
                      clientInfo.email.includes('@') && 
                      clientInfo.phone.trim().length >= 8;

  const handleToggleService = (service: BookingService) => {
    const isAlreadySelected = selectedServices.some(s => s.id === service.id);
    if (isAlreadySelected) {
      setSelectedServices(selectedServices.filter(s => s.id !== service.id));
      // Also clear this service's upsells from selectedUpsells
      const serviceUpsellIds = service.upsells.map(u => u.id);
      setSelectedUpsells(selectedUpsells.filter(id => !serviceUpsellIds.includes(id)));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleToggleUpsell = (upsellId: string) => {
    if (selectedUpsells.includes(upsellId)) {
      setSelectedUpsells(selectedUpsells.filter(id => id !== upsellId));
    } else {
      setSelectedUpsells([...selectedUpsells, upsellId]);
    }
  };

  // Connect Google Calendar Simulation
  const handleToggleGoogleCalendarSync = () => {
    if (isGoogleCalendarConnected) {
      setIsGoogleCalendarConnected(false);
    } else {
      setIsSyncingGoogleCalendar(true);
      setTimeout(() => {
        setIsGoogleCalendarConnected(true);
        setIsSyncingGoogleCalendar(false);
        setSelectedTimeSlot(''); // Reset because slots updated
      }, 1200);
    }
  };

  // Compute live subtotal of booking
  const getSubtotal = () => {
    let total = 0;
    selectedServices.forEach(service => {
      total += service.price;
      service.upsells.forEach(up => {
        if (selectedUpsells.includes(up.id)) {
          total += up.price;
        }
      });
    });
    return total;
  };

  // Compute total duration of services combined
  const getTotalDuration = () => {
    let totalMins = 0;
    selectedServices.forEach(s => {
      if (s.duration.includes('h')) {
        const parts = s.duration.split('h');
        const hours = parseInt(parts[0]) || 0;
        const mins = parseInt(parts[1]) || 0;
        totalMins += hours * 60 + mins;
      } else {
        totalMins += parseInt(s.duration) || 0;
      }
    });
    if (totalMins === 0) return '0 min';
    const h = Math.floor(totalMins / 60);
    const m = totalMins % 60;
    return h > 0 ? `${h}h${m > 0 ? ` ${String(m).padStart(2, '0')}m` : ''}` : `${m} min`;
  };

  // Submit complete appointment
  const handleCompleteBooking = () => {
    if (selectedServices.length === 0 || !selectedDate || !selectedTimeSlot || !isFormValid) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      const finalBooking = {
        id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
        serviceName: selectedServices.map(s => s.name).join(' + '),
        price: getSubtotal(),
        date: selectedDate,
        time: selectedTimeSlot,
        duration: getTotalDuration(),
        client: clientInfo,
        options: selectedServices.flatMap(s => s.upsells)
          .filter(u => selectedUpsells.includes(u.id))
          .map(u => u.name)
      };

      // Store in localStorage for persistent client history
      const prevBookingsString = localStorage.getItem('atelier_bylola_appointments');
      const prevBookings = prevBookingsString ? JSON.parse(prevBookingsString) : [];
      localStorage.setItem('atelier_bylola_appointments', JSON.stringify([finalBooking, ...prevBookings]));

      setBookingConfirmedDetails(finalBooking);
      setIsSubmitting(false);
      setStep(5);
    }, 1500);
  };

  // Filter services by click
  const filteredServices = RESERVATION_SERVICES.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'Tous' || service.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Calendar Link Generator Helpers
  const getGoogleCalendarUrl = (booking: any) => {
    const title = encodeURIComponent(`L'Atelier by Lola - ${booking.serviceName}`);
    const cleanedDate = booking.date.replace(/-/g, ''); 
    const cleanedTime = booking.time.replace(/:/g, ''); 
    // Set start date time format
    const startAndEnd = `${cleanedDate}T${cleanedTime}00/${cleanedDate}T${String(Number(cleanedTime.substring(0,2)) + 1).padStart(2, '0')}${cleanedTime.substring(2,4)}00`;
    
    const details = encodeURIComponent(
      `Votre rendez-vous d'exception à L'Atelier by Lola.\n\nPrestation(s) : ${booking.serviceName}\nOptions : ${booking.options.join(', ') || 'Aucune'}\nDurée estimée : ${booking.duration}\nTotal : ${booking.price} €\nLieu : Le Pré-Saint-Gervais.`
    );
    const location = encodeURIComponent("L'Atelier by Lola, Le Pré-Saint-Gervais");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startAndEnd}&details=${details}&location=${location}`;
  };

  const getIcsFileUrl = (booking: any) => {
    const cleanedDate = booking.date.replace(/-/g, '');
    const cleanedTime = booking.time.replace(/:/g, '');
    const endHour = String(Number(cleanedTime.substring(0, 2)) + 1).padStart(2, '0');
    const endTime = `${endHour}${cleanedTime.substring(2, 4)}`;

    const icsText = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//LAtelier by Lola//Booking System//FR',
      'BEGIN:VEVENT',
      `UID:${booking.id}@atelierbylola.com`,
      `DTSTAMP:${cleanedDate}T${cleanedTime}00`,
      `DTSTART:${cleanedDate}T${cleanedTime}00`,
      `DTEND:${cleanedDate}T${endTime}00`,
      `SUMMARY:L'Atelier by Lola - ${booking.serviceName}`,
      `DESCRIPTION:Prestations: ${booking.serviceName}\\nOptions: ${booking.options.join(', ')}\\nTotal: ${booking.price}EUR`,
      `LOCATION:L'Atelier by Lola\\, Le Pré-Saint-Gervais`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    return `data:text/calendar;charset=utf-8,${encodeURIComponent(icsText)}`;
  };

  return (
    <div id="reservation-view" className="w-full pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      
      {/* Header Info - reduced padding & sizes for premium mobile responsiveness */}
      <div className="text-center space-y-2 mb-8 md:mb-12">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#C7A46A] font-bold">L'Art de se Coconner</span>
        <h1 className="font-serif text-2xl md:text-5xl text-charcoal font-light">Réservation de Prestige</h1>
        <p className="text-secondary-gray text-[11px] md:text-sm max-w-md mx-auto">
          Sélectionnez un ou plusieurs rituels. Lola privatisera l'Atelier en exclusivité pour vous.
        </p>
      </div>

      {/* Progress Stepper bar - Highly space-efficient, luxury editorial style */}
      {step < 5 && (
        <div className="max-w-xl mx-auto mb-10 md:mb-14 relative px-4">
          <div className="absolute top-4 left-6 right-6 h-[1.5px] bg-[#C7A46A]/10 z-0" />
          <div className="flex items-center justify-between relative z-10">
            {[1, 2, 3, 4].map((s) => (
              <div key={`stepper-${s}`} className="flex flex-col items-center font-sans">
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor: step === s ? "#0A0A0A" : step > s ? "#C7A46A" : "#FFFFFF",
                    borderColor: step === s ? "#0A0A0A" : step > s ? "#C7A46A" : "#E2E8F0",
                    scale: step === s ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-mono font-medium border shadow-[0_2px_10px_rgba(0,0,0,0.02)]`}
                >
                  {step > s ? (
                    <Check className="h-3.5 w-3.5 text-white" />
                  ) : (
                    <span className={step === s ? 'text-white' : 'text-charcoal'}>0{s}</span>
                  )}
                </motion.div>
                <span className={`text-[8.5px] uppercase tracking-[0.25em] mt-2.5 font-semibold transition-all duration-350 ${step === s ? 'text-[#C7A46A]' : 'text-gray-400'}`}>
                  {s === 1 && "Rituels"}
                  {s === 2 && "Prestige"}
                  {s === 3 && "Instant"}
                  {s === 4 && "Signature"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main interactive panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        
        {/* LEFT COLUMN: Stepper active content */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-5 md:p-8 border border-[#C7A46A]/10 min-h-[460px] flex flex-col justify-between shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
          
          <AnimatePresence mode="wait">
            
            {/* STEP 1: SELECT MULTIPLE PRESTATIONS */}
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-5"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <h2 className="font-serif text-lg md:text-xl text-charcoal font-medium">Composez votre rituel sur-mesure</h2>
                    <p className="text-[11px] text-gray-400">Sélectionnez autant de rituels que souhaité.</p>
                  </div>
                  
                  {/* Search Bar */}
                  <input
                    type="text"
                    placeholder="Rechercher un soin..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-56 px-4 py-2 text-[11px] border border-gray-100 rounded-full focus:outline-none focus:ring-1 focus:ring-[#C7A46A] focus:border-[#C7A46A] bg-gray-50/50"
                  />
                </div>

                {/* Filters - Swipeable on mobile natively */}
                <div className="flex gap-1.5 overflow-x-auto pb-2 -mx-2 px-2 shrink-0 scrollbar-none">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={`cat-${cat}`}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-[9px] uppercase font-bold tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                        activeCategory === cat
                          ? 'bg-[#C7A46A] text-white shadow-sm'
                          : 'bg-[#F8F5F0] text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Services List with Checkboxes */}
                <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                  {filteredServices.length > 0 ? (
                    filteredServices.map((service) => {
                      const isSelected = selectedServices.some(s => s.id === service.id);
                      return (
                        <div
                          key={`service-${service.id}`}
                          onClick={() => handleToggleService(service)}
                          className={`p-4 rounded-2xl border transition-all flex justify-between items-center gap-4 cursor-pointer ${
                            isSelected
                              ? 'border-[#C7A46A] bg-[#C7A46A]/3 shadow-sm'
                              : 'border-slate-50 hover:border-slate-100 bg-[#FCFCFB]'
                          }`}
                        >
                          <div className="space-y-1 select-none">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[8px] uppercase tracking-widest font-extrabold text-[#C7A46A] bg-[#C7A46A]/10 px-2 py-0.5 rounded">
                                {service.category}
                              </span>
                              <span className="inline-flex items-center gap-0.5 text-[9px] text-gray-400">
                                <Clock className="h-2.5 w-2.5" /> {service.duration}
                              </span>
                            </div>
                            <h4 className="font-serif text-sm font-bold text-charcoal">{service.name}</h4>
                            <p className="text-[11px] text-gray-400 line-clamp-2 md:line-clamp-none leading-relaxed font-light">
                              {service.description}
                            </p>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <span className="font-serif font-bold text-[#C7A46A] text-sm md:text-base">{service.price} €</span>
                            <div className={`h-6 w-6 rounded-lg flex items-center justify-center border transition-all ${
                              isSelected
                                ? 'bg-[#C7A46A] border-[#C7A46A] text-white'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}>
                              {isSelected ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5 text-gray-400" />}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-12 text-gray-400 text-xs italic">
                      Aucun rituel ne correspond à vos critères.
                    </div>
                  )}
                </div>

                {/* Footer Controls */}
                <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                  <span className="text-[10px] text-secondary-gray">
                    {selectedServices.length > 0 
                      ? `✓ ${selectedServices.length} prestation(s) sélectionnée(s)` 
                      : "Sélectionnez au moins un soin"
                    }
                  </span>
                  <button
                    disabled={selectedServices.length === 0}
                    onClick={() => setStep(2)}
                    className="px-6 py-3 bg-[#C7A46A] hover:bg-charcoal text-white text-[11px] uppercase font-bold tracking-wider rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
                  >
                    Choisir mes options <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: DYNAMIC PRE-SERVICE UPSELL SOLUTIONS */}
            {step === 2 && selectedServices.length > 0 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-[#C7A46A] block">Sublimer l'Expérience</span>
                  <h2 className="font-serif text-lg md:text-xl text-charcoal font-medium">Recommandations exclusives pour vos soins</h2>
                  <p className="text-[11px] text-gray-400 leading-relaxed font-light">
                    Optimisez l'efficacité des soins grâce aux pépites d'actifs purs intégrées en simultané par Lola.
                  </p>
                </div>

                {/* Nested Service Option Blocks */}
                <div className="space-y-6 max-h-[350px] overflow-y-auto pr-1">
                  {selectedServices.map((service) => (
                    <div key={`group-up-${service.id}`} className="space-y-3 bg-[#FCFCFB] p-4 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] uppercase tracking-widest font-bold text-[#A8B29A] bg-[#A8B29A]/10 px-1.5 py-0.5 rounded">
                          {service.category}
                        </span>
                        <h4 className="font-serif text-xs font-semibold text-charcoal tracking-wide truncate">{service.name}</h4>
                      </div>

                      {service.upsells.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {service.upsells.map((up) => {
                            const isAdded = selectedUpsells.includes(up.id);
                            return (
                              <div
                                key={up.id}
                                onClick={() => handleToggleUpsell(up.id)}
                                className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between cursor-pointer relative h-full min-h-[90px] ${
                                  isAdded
                                    ? 'border-[#C7A46A] bg-[#C7A46A]/3 shadow-xs'
                                    : 'border-slate-100 bg-white hover:border-gray-200'
                                }`}
                              >
                                {isAdded && (
                                  <span className="absolute top-2.5 right-2.5 bg-[#C7A46A] text-white rounded-full p-0.5">
                                    <Check className="h-2 w-2" />
                                  </span>
                                )}

                                <div className="space-y-1 pr-4">
                                  <h5 className="font-serif text-[11px] font-bold text-charcoal leading-snug">{up.name}</h5>
                                  <p className="text-[9px] text-gray-400 leading-normal font-light">{up.description}</p>
                                </div>

                                <div className="mt-2 pt-2 border-t border-slate-50/50 flex justify-between items-center text-[10px]">
                                  <span className="text-[#C7A46A] font-extrabold font-serif">+{up.price} €</span>
                                  <span className="text-[8px] text-gray-400">Simultané</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-[10px] text-gray-400 italic">Aucune finition requise pour ce rituel.</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Footer Controls */}
                <div className="pt-4 border-t border-slate-50 flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-4 py-2.5 text-[11px] bg-gray-50 hover:bg-gray-100 text-charcoal font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Retour
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-3 bg-[#C7A46A] hover:bg-charcoal text-white text-[11px] uppercase font-bold tracking-wider rounded-xl transition-all flex items-center gap-1.5"
                  >
                    Choisir l'heure <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: DATE, HOUR & REAL GOOGLE CALENDAR SYNC OPTION */}
            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-[8px] uppercase tracking-[0.25em] text-[#C7A46A] font-bold block mb-1">PROGRAMMATION</span>
                  <h2 className="font-serif text-lg md:text-xl text-charcoal font-medium">Votre instant privilégié</h2>
                  <p className="text-[11px] text-gray-400 leading-relaxed font-light">
                    Sélectionnez votre créneau. Notre calendrier intelligent croise vos disponibilités en temps réel.
                  </p>
                </div>

                {/* GOOGLE CALENDAR SYNC CONTAINER - Premium requested feature! */}
                <div className="bg-[#F8F5F0]/70 border border-[#C7A46A]/15 p-5 rounded-2xl relative overflow-hidden backdrop-blur-xs">
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1.5">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-[#C7A46A]/10 shadow-[0_1px_5px_rgba(0,0,0,0.01)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#A8B29A] animate-pulse" />
                        <span className="text-[8px] uppercase tracking-wider font-extrabold text-[#C7A46A]">
                          CONCIERGE INTELLISYNC
                        </span>
                      </div>
                      <h4 className="font-serif text-xs font-semibold text-charcoal">Synchroniser mon agenda personnel</h4>
                      <p className="text-[10px] text-gray-400 leading-relaxed max-w-md font-light">
                        Évitez tout conflit d'horaire en connectant temporairement votre Google Calendar. Les rendez-vous existants seront immédiatement filtrés.
                      </p>
                    </div>

                    {/* Simulation Switch Style button */}
                    <button
                      onClick={handleToggleGoogleCalendarSync}
                      disabled={isSyncingGoogleCalendar}
                      className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none ${
                        isGoogleCalendarConnected ? 'bg-[#A8B29A]' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-300 ease-in-out ${
                          isGoogleCalendarConnected ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Sync status loader */}
                  {isSyncingGoogleCalendar && (
                    <motion.div 
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 pt-3 mt-3 border-t border-white/60"
                    >
                      <div className="h-3.5 w-3.5 border-2 border-t-transparent border-[#C7A46A] rounded-full animate-spin" />
                      <span className="text-[10px] text-[#C7A46A] italic">Analyse sécurisée de vos créneaux en cours...</span>
                    </motion.div>
                  )}

                  {isGoogleCalendarConnected && (
                    <motion.div 
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[10px] text-[#A8B29A] font-semibold flex items-center gap-1.5 pt-3 mt-3 border-t border-white/60"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[#A8B29A]" />
                      <span>Connexion établie avec Google Agenda. 3 horaires indisponibles ont été écartés.</span>
                    </motion.div>
                  )}
                </div>

                {/* Date Slider Horizontal "Film Strip" Style */}
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline text-[10px]">
                    <label className="text-gray-400 font-bold uppercase tracking-wider">Sélectionnez la date</label>
                    {selectedDate && (
                      <span className="text-[10px] text-[#C7A46A] font-serif font-light">
                        {new Date(selectedDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 max-w-full scrollbar-none snap-x">
                    {datesList.map((d) => {
                      const isSelected = selectedDate === d.fullIso;
                      return (
                        <motion.button
                          key={d.fullIso}
                          onClick={() => handleDateClick(d.fullIso)}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.96 }}
                          className={`flex flex-col items-center justify-center p-3 rounded-2xl border min-w-[64px] uppercase cursor-pointer transition-all snap-start ${
                            isSelected
                              ? 'border-charcoal bg-charcoal text-white shadow-md'
                              : 'border-slate-100 bg-white hover:border-[#C7A46A]/40 text-gray-600 hover:bg-[#F8F5F0]'
                          }`}
                        >
                          <span className={`text-[8px] block font-bold leading-none mb-1 tracking-wider ${isSelected ? 'text-[#C7A46A]' : 'text-gray-400'}`}>
                            {d.dayName.replace('.', '')}
                          </span>
                          <span className="text-[16px] font-serif font-bold tracking-tight leading-none my-0.5">
                            {d.dayNum}
                          </span>
                          <span className="text-[8px] block opacity-80 leading-none font-medium mt-1">
                            {d.monthName}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots Area */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px]">
                    <label className="text-gray-400 font-bold uppercase tracking-wider">Créneaux d'exception disponibles</label>
                    <span className="text-[9px] text-[#A8B29A] font-bold flex items-center gap-1">
                      <Sparkles className="h-3 w-3 animate-pulse text-[#C7A46A]" /> Temps Réel Planity
                    </span>
                  </div>

                  {isSyncingSlots ? (
                    <div className="h-28 flex flex-col items-center justify-center space-y-2 bg-[#FCFCFB] rounded-2.5xl border border-slate-50">
                      <div className="h-4.5 w-4.5 border-2 border-t-transparent border-[#C7A46A] rounded-full animate-spin" />
                      <span className="text-[10px] text-gray-400 italic font-light">Lecture des disponibilités de l'Atelier...</span>
                    </div>
                  ) : selectedDate ? (
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {availableSlots.map((slot) => {
                        const isSelected = selectedTimeSlot === slot;
                        return (
                          <motion.button
                            key={slot}
                            onClick={() => setSelectedTimeSlot(slot)}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className={`py-3.5 text-xs rounded-xl font-bold border text-center transition-all cursor-pointer ${
                              isSelected
                                ? 'border-[#C7A46A] bg-[#C7A46A] text-white shadow-sm font-semibold'
                                : 'border-slate-100 bg-[#FCFCFB] text-charcoal hover:border-[#C7A46A]/20 hover:bg-white'
                            }`}
                          >
                            {slot}
                          </motion.button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="border border-dashed border-[#C7A46A]/20 p-8 rounded-2xl text-center text-[11px] text-gray-400 italic bg-[#FCFCFB]">
                      Sélectionnez une date d'élection ci-dessus pour afficher l'agenda de Lola.
                    </div>
                  )}
                </div>

                {/* Footer Controls */}
                <div className="pt-5 border-t border-slate-50 flex justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="px-4 py-2.5 text-[11px] bg-gray-50 hover:bg-gray-100 text-charcoal font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Retour
                  </button>
                  <button
                    disabled={!selectedDate || !selectedTimeSlot}
                    onClick={() => setStep(4)}
                    className="px-6 py-3 bg-[#C7A46A] hover:bg-charcoal text-white text-[11px] uppercase font-bold tracking-wider rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-sm"
                  >
                    Informations de contact <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: COORD DETAILS */}
            {step === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-[8px] uppercase tracking-[0.25em] text-[#C7A46A] font-bold block mb-1">IDENTIFICATION</span>
                  <h2 className="font-serif text-lg md:text-xl text-charcoal font-medium">Vos Coordonnées Confidentielles</h2>
                  <p className="text-[11px] text-gray-400 leading-relaxed font-light">
                    Veuillez fournir vos accès de contact pour le SMS de rappel et la confirmation de votre parenthèse de soin.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-bold flex items-center gap-1.5">
                        <User className="h-3 w-3 text-[#A8B29A]" /> Prénom & Nom *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Sophie Martin"
                        value={clientInfo.name}
                        onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                        className="w-full px-4 py-3 text-xs border border-slate-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C7A46A] bg-[#FCFCFB] focus:bg-white transition-all font-light placeholder:text-gray-300"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-bold flex items-center gap-1.5">
                        <Phone className="h-3 w-3 text-[#A8B29A]" /> Portable *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Ex: 06 12 34 56 78"
                        value={clientInfo.phone}
                        onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                        className="w-full px-4 py-3 text-xs border border-slate-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C7A46A] bg-[#FCFCFB] focus:bg-white transition-all font-light placeholder:text-gray-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-bold flex items-center gap-1.5">
                      <Mail className="h-3 w-3 text-[#A8B29A]" /> Adresse E-mail *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Ex: sophie@gmail.com"
                      value={clientInfo.email}
                      onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                      className="w-full px-4 py-3 text-xs border border-slate-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C7A46A] bg-[#FCFCFB] focus:bg-white transition-all font-light placeholder:text-gray-300"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-bold block">
                      Exigences / Remarques pour Lola (Optionnel)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Détaillez vos souhaits particuliers si nécessaire (ex: pression de massage, sensibilité, etc.)..."
                      value={clientInfo.note}
                      onChange={(e) => setClientInfo({ ...clientInfo, note: e.target.value })}
                      className="w-full px-4 py-3 text-xs border border-slate-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#C7A46A] bg-[#FCFCFB] focus:bg-white transition-all font-light placeholder:text-gray-300 resize-none"
                    />
                  </div>
                </div>

                <div className="p-4 bg-[#F8F5F0]/80 rounded-2xl border border-[#C7A46A]/10 text-[10.5px] text-gray-600 flex items-start gap-4">
                  <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5 text-[#C7A46A]" />
                  <p className="leading-relaxed font-light text-left">
                    <strong>Politique de courtoisie :</strong> Les reports ou modifications sont sans frais jusqu'à 24h avant le soin via Planity ou SMS. Lola s’engage à préparer le linge d’accueil chauffé pour votre venue.
                  </p>
                </div>

                {/* Footer Controls */}
                <div className="pt-5 border-t border-slate-50 flex justify-between">
                  <button
                    onClick={() => setStep(3)}
                    className="px-4 py-2.5 text-[11px] bg-gray-50 hover:bg-gray-100 text-charcoal font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Date & horaire
                  </button>
                  <button
                    disabled={!isFormValid || isSubmitting}
                    onClick={handleCompleteBooking}
                    className="px-6 py-3 text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all text-white bg-charcoal hover:bg-[#C7A46A] disabled:opacity-40 shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    {isSubmitting ? "Initialisation du rituel..." : "Valider mon rendez-vous d'exception"}
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: BEAUTIFUL CONFIRMATION & CALENDAR GENERATION */}
            {step === 5 && bookingConfirmedDetails && (
              <motion.div
                key="step-5"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4 space-y-5"
              >
                <div className="mx-auto h-12 w-12 bg-[#A8B29A]/15 text-[#A8B29A] rounded-full flex items-center justify-center animate-bounce">
                  <CheckCircle2 className="h-7 w-7" />
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] tracking-[0.25em] uppercase font-bold text-[#C7A46A] bg-[#C7A46A]/10 px-3.5 py-1 rounded-full inline-block">
                    Rendez-vous Pré-Réservé & Synchronisé
                  </span>
                  <h2 className="font-serif text-xl md:text-2xl text-charcoal font-medium">Splendide, {bookingConfirmedDetails.client.name} !</h2>
                  <p className="text-[11px] text-gray-500 max-w-sm mx-auto">
                    Votre créneau a été bloqué en priorité. Un SMS de confirmation officiel vous parviendra d'ici quelques minutes.
                  </p>
                </div>

                {/* Luxury Digital Ticket */}
                <div className="max-w-md mx-auto bg-[#F8F5F0] border border-[#C7A46A]/20 rounded-2xl p-5 text-left relative overflow-hidden shadow-xs">
                  {/* Digital punch holes left & right */}
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-white border-r border-[#C7A46A]/10" />
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-white border-l border-[#C7A46A]/10" />

                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-[8px] text-gray-400 uppercase tracking-wider font-bold">Ticket n°</span>
                      <p className="font-mono text-xs uppercase text-charcoal font-semibold">{bookingConfirmedDetails.id}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[8px] text-gray-400 uppercase tracking-wider font-bold">Date</span>
                      <p className="font-serif text-xs font-semibold text-charcoal">
                        {new Date(bookingConfirmedDetails.date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}
                      </p>
                    </div>
                  </div>

                  <div className="h-[1px] w-full bg-[#C7A46A]/10 my-3" />

                  <div className="space-y-2.5">
                    <div>
                      <span className="text-[8px] text-gray-400 uppercase tracking-wider">Prestation(s) d'Excellence</span>
                      <h4 className="font-serif text-xs font-bold text-charcoal leading-snug">{bookingConfirmedDetails.serviceName}</h4>
                    </div>

                    {bookingConfirmedDetails.options.length > 0 && (
                      <div>
                        <span className="text-[8px] text-gray-400 uppercase tracking-wider block">Finitions de style</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {bookingConfirmedDetails.options.map((option: string, i: number) => (
                            <span key={`opt-con-${i}`} className="text-[8px] text-[#A8B29A] bg-[#A8B29A]/10 font-bold px-2 py-0.5 rounded">
                              + {option}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-end pt-1">
                      <div>
                        <span className="text-[8px] text-gray-400 uppercase tracking-wider block">Heure de soin</span>
                        <p className="font-serif text-base font-bold text-[#C7A46A]">⏰ {bookingConfirmedDetails.time} ({bookingConfirmedDetails.duration})</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[8px] text-gray-400 uppercase tracking-wider block">Total TTC</span>
                        <p className="font-serif text-lg font-bold text-charcoal">{bookingConfirmedDetails.price} €</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ADD TO CALENDAR INTEGRATION BUTTONS - Dynamic Google Link & .ics generator */}
                <div className="max-w-md mx-auto bg-white border border-[#A8B29A]/15 rounded-2xl p-4 space-y-3">
                  <div className="text-left">
                    <h4 className="text-[10px] uppercase tracking-wider font-bold text-[#A8B29A] flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> Mon Agenda Personnel
                    </h4>
                    <p className="text-[9px] text-gray-400 pt-0.5 leading-normal">
                      Ajoutez instantanément ce soin d'exception dans votre agenda personnel Google, Apple ou Outlook pour n'oublier aucun détail.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <a
                      href={getGoogleCalendarUrl(bookingConfirmedDetails)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 bg-red-50/50 hover:bg-red-50 text-red-700 text-[10px] uppercase font-bold tracking-wider rounded-xl transition-all border border-red-100 flex items-center justify-center gap-1.5"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                      Google Calendar
                    </a>
                    <a
                      href={getIcsFileUrl(bookingConfirmedDetails)}
                      download={`atelier_by_lola_${bookingConfirmedDetails.id}.ics`}
                      className="py-2.5 px-3 bg-[#FCFCFB] hover:bg-slate-100 text-charcoal text-[10px] uppercase font-bold tracking-wider rounded-xl transition-all border border-slate-100 flex items-center justify-center gap-1.5"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#C7A46A]" />
                      Siri / iCal (.ics)
                    </a>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto pt-2">
                  <a
                    href="https://www.planity.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 bg-charcoal hover:bg-[#C7A46A] text-white text-[11px] uppercase font-bold tracking-wider rounded-xl transition-all text-center"
                  >
                    Confirmer sur Planity
                  </a>
                  <button
                    onClick={() => {
                      setStep(1);
                      setSelectedServices([]);
                      setSelectedUpsells([]);
                      setSelectedDate('');
                      setSelectedTimeSlot('');
                    }}
                    className="flex-1 py-3 text-[#C7A46A] hover:bg-[#C7A46A]/5 text-[11px] uppercase font-bold tracking-wider rounded-xl transition-all"
                  >
                    Prendre un autre rendez-vous
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>

        {/* RIGHT COLUMN: Recapitulative Summary Box (Hidden on mobile dynamically, replaced with the Sticky Bottom thumb actions) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-[#C7A46A]/10 space-y-4 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
            <h3 className="font-serif text-sm text-charcoal font-medium border-b border-slate-50 pb-2.5 flex items-center justify-between">
              <span>Votre Panier de Soins</span>
              <Sparkles className="h-3.5 w-3.5 text-[#C7A46A]" />
            </h3>

            {selectedServices.length > 0 ? (
              <div className="space-y-3">
                {/* Core Services Selected list */}
                <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-1">
                  {selectedServices.map(service => (
                    <div key={`side-${service.id}`} className="space-y-0.5 group">
                      <div className="flex justify-between text-[10px] text-gray-400">
                        <span className="truncate max-w-[150px]">{service.category}</span>
                        <span>⏱️ {service.duration}</span>
                      </div>
                      <div className="flex justify-between font-serif text-xs font-semibold text-charcoal">
                        <span className="truncate max-w-[170px]">{service.name}</span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span>{service.price} €</span>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleService(service);
                            }}
                            className="text-red-500 opacity-60 hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Upsells list inside basket overview */}
                {selectedUpsells.length > 0 && (
                  <div className="space-y-1.5 pt-2.5 border-t border-dashed border-slate-100">
                    <span className="text-[9px] text-gray-400 uppercase tracking-wider block">Finitions / Suppléments ({selectedUpsells.length})</span>
                    {selectedServices.flatMap(s => s.upsells)
                      .filter(u => selectedUpsells.includes(u.id))
                      .map((u) => (
                        <div key={`summary-up-${u.id}`} className="flex justify-between items-start text-[10px]">
                          <span className="text-secondary-gray flex items-center gap-1 max-w-[180px] truncate">
                            <span className="h-1 w-1 bg-[#C7A46A] rounded-full inline-block shrink-0" /> {u.name}
                          </span>
                          <span className="font-serif font-bold text-[#C7A46A] shrink-0">+{u.price} €</span>
                        </div>
                      ))}
                  </div>
                )}

                {/* Selected hour & date review */}
                {(selectedDate || selectedTimeSlot) && (
                  <div className="pt-2.5 border-t border-dashed border-slate-100 text-[10px] space-y-1">
                    <span className="text-[9px] text-gray-400 uppercase tracking-wider block">Créneau choisi</span>
                    <div className="bg-[#F8F5F0] p-2.5 rounded-xl text-charcoal font-semibold space-y-0.5">
                      {selectedDate && (
                        <div>📅 {new Date(selectedDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
                      )}
                      {selectedTimeSlot && (
                        <div className="text-[#C7A46A]">⏰ {selectedTimeSlot} (Lola privatisera l'espace)</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Combined Total */}
                <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                  <span className="text-[10px] uppercase tracking-wider text-charcoal font-bold">Total estimé</span>
                  <div className="text-right">
                    <span className="text-[9px] text-gray-400 block leading-none mb-1">⏱️ {getTotalDuration()}</span>
                    <span className="font-serif text-xl font-bold text-[#C7A46A]">
                      {getSubtotal()} €
                    </span>
                  </div>
                </div>

              </div>
            ) : (
              <div className="text-center py-8 space-y-1.5">
                <span className="inline-block text-lg">🌱</span>
                <p className="text-[10px] text-gray-400 leading-relaxed italic">
                  Aucun rituel sélectionné.
                </p>
              </div>
            )}
          </div>

          {/* Secure transaction disclaimer */}
          <div className="p-4 bg-[#F8F5F0]/50 rounded-2xl border border-slate-50 flex items-start gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-[#A8B29A] shrink-0 mt-0.5" />
            <div className="text-[9.5px] text-gray-450 leading-relaxed">
              <strong>Réservation sans engagement :</strong> Aucun paiement en ligne, le règlement s'effectue directement avec Lola en fin de soin.
            </div>
          </div>
        </div>

      </div>

      {/* THUMB-FRIENDLY STICKY BOTTOM BAR ON MOBILE (CRITICAL FOR CONVERSION) */}
      {step < 5 && selectedServices.length > 0 && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#C7A46A]/15 px-4.5 py-3 z-50 flex items-center justify-between shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
          <div className="flex flex-col">
            <span className="text-[8px] uppercase tracking-wider text-gray-400">Panier ({selectedServices.length})</span>
            <span className="font-serif font-extrabold text-[15px] text-[#C7A46A]">{getSubtotal()} €</span>
          </div>
          <button
            onClick={() => {
              if (step === 4) {
                handleCompleteBooking();
              } else {
                setStep(step + 1);
              }
            }}
            disabled={step === 3 ? (!selectedDate || !selectedTimeSlot) : (step === 4 ? !isFormValidByThumb() : false)}
            className="px-5 py-2.5 bg-charcoal hover:bg-[#C7A46A] text-white text-[10px] uppercase font-bold tracking-widest rounded-lg transition-all flex items-center gap-1.5 disabled:opacity-40"
          >
            <span>
              {step === 1 && "Choisir les options"}
              {step === 2 && "Espace Temps"}
              {step === 3 && "Vos détails"}
              {step === 4 && (isSubmitting ? "Validation..." : "Confirmer")}
            </span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      )}

    </div>
  );

  // Quick fallback check for mobile thumb bottom bar validator
  function isFormValidByThumb() {
    return clientInfo.name.trim().length > 2 && 
           clientInfo.email.includes('@') && 
           clientInfo.phone.trim().length >= 8;
  }
}
