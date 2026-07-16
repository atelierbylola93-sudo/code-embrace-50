import { AdminReservation } from './types';
import { CalendarClock, Wallet, Users, TrendingUp } from 'lucide-react';

export function StatsTab({ reservations }: { reservations: AdminReservation[] }) {
  const now = new Date();
  const today = new Date(now.toDateString());
  const upcoming = reservations.filter((r) => {
    const d = new Date(`${r.appointment_date}T00:00:00`);
    return d >= today && r.status !== 'cancelled';
  }).length;
  const revenue = reservations.filter((r) => r.status !== 'cancelled').reduce((s, r) => s + Number(r.total_price || 0), 0);
  const paid = reservations.filter((r) => r.payment_status === 'paid').reduce((s, r) => s + Number(r.total_price || 0), 0);
  const monthISO = now.toISOString().slice(0, 7);
  const monthCount = reservations.filter((r) => r.appointment_date.startsWith(monthISO) && r.status !== 'cancelled').length;

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Stat icon={CalendarClock} label="À venir" value={upcoming} />
        <Stat icon={Users} label="Ce mois-ci" value={monthCount} />
        <Stat icon={Wallet} label="Chiffre encaissé" value={`${paid.toFixed(0)} €`} />
        <Stat icon={TrendingUp} label="Chiffre total" value={`${revenue.toFixed(0)} €`} accent />
      </div>

      <div className="bg-white rounded-2xl border border-[#DDCCB2] p-6 sm:p-8 text-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-[#B88F4D] font-semibold">Bientôt</p>
        <h3 className="mt-2 font-serif text-2xl text-[#2A241C]">Statistiques détaillées</h3>
        <p className="mt-2 text-sm text-[#6E6455] max-w-md mx-auto">
          Courbes de fréquentation, répartition des prestations, taux de conversion, revenus par source — arrivent en phase 3.
        </p>
      </div>
    </section>
  );
}

function Stat({ icon: Icon, label, value, accent }: { icon: typeof CalendarClock; label: string; value: number | string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl border p-4 ${accent ? 'bg-[#B88F4D] text-white border-[#B88F4D]' : 'bg-white text-[#2A241C] border-[#DDCCB2]'}`}>
      <div className="flex items-center justify-between">
        <p className={`text-[10px] uppercase tracking-widest ${accent ? 'text-white/80' : 'text-[#8B7F6E]'}`}>{label}</p>
        <Icon className={`w-4 h-4 ${accent ? 'text-white/70' : 'text-[#B88F4D]'}`} />
      </div>
      <p className="mt-1 text-2xl font-serif">{value}</p>
    </div>
  );
}
