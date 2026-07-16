// Catalogue de prestations partagé entre le flux de réservation public
// et l'espace patron (création manuelle de RDV).
export interface CatalogService {
  id: string;
  name: string;
  price: number;
  duration_min: number;
  category: string;
}

export const SERVICE_CATALOG: CatalogService[] = [
  { id: 'head-spa', name: 'Head Spa Japonais Privatisé', price: 120, duration_min: 45, category: 'Head Spa' },
  { id: 'hydrafacial', name: 'Soin du visage signature', price: 105, duration_min: 45, category: 'Soins Visage' },
  { id: 'browlift', name: 'Browlift Signature HD', price: 65, duration_min: 45, category: 'Regard' },
  { id: 'ombre-hair', name: 'Ombré Hair Divin & Olaplex', price: 350, duration_min: 240, category: 'Coiffure' },
  { id: 'lissage-bresilien', name: 'Lissage Brésilien Prestige', price: 200, duration_min: 180, category: 'Coiffure' },
  { id: 'ipl-bikini', name: 'Épilation IPL Maillot Intégral', price: 50, duration_min: 35, category: 'IPL' },
  { id: 'dentaire-max', name: 'Blanchiment MAX WHITE', price: 100, duration_min: 50, category: 'Sourire' },
  { id: 'corps-algues', name: 'Soin Corps Enveloppement aux Algues', price: 150, duration_min: 80, category: 'Corps' },
];

export const CATALOG_CATEGORIES = ['Tous', ...Array.from(new Set(SERVICE_CATALOG.map((s) => s.category)))];

export function formatCatalogDuration(mins: number): string {
  if (mins <= 0) return '—';
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}h${m > 0 ? String(m).padStart(2, '0') : ''}` : `${m} min`;
}
