import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState, useCallback } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { supabase } from '@/integrations/supabase/client';
import {
  listReservations,
  updateReservationStatus,
  deleteReservation,
} from '@/lib/admin.functions';

export const Route = createFileRoute('/admin')({
  ssr: false,
  head: () => ({
    meta: [
      { title: 'Espace patron' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: AdminPage,
});

type Reservation = {
  id: string;
  reference: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'done';
  client_name: string;
  client_email: string;
  client_phone: string;
  client_note: string | null;
  services: Array<{ name: string; price: number; duration?: string }>;
  options: string[];
  appointment_date: string;
  appointment_time: string;
  duration_min: number;
  total_price: number;
  created_at: string;
};

const STATUS_LABEL: Record<string, string> = {
  pending: 'En attente',
  confirmed: 'Confirmée',
  done: 'Terminée',
  cancelled: 'Annulée',
};
const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-800 border-amber-200',
  confirmed: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  done: 'bg-neutral-100 text-neutral-700 border-neutral-200',
  cancelled: 'bg-red-50 text-red-800 border-red-200',
};

function AdminPage() {
  const navigate = useNavigate();
  const list = useServerFn(listReservations);
  const setStatus = useServerFn(updateReservationStatus);
  const remove = useServerFn(deleteReservation);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<Reservation[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'done' | 'cancelled'>('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Reservation | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { reservations } = await list();
      setItems(reservations as Reservation[]);
    } catch (e: any) {
      const msg = String(e?.message ?? e);
      if (msg.includes('Unauthorized') || msg.includes('Forbidden')) {
        setError(msg.includes('Forbidden') ? 'Accès refusé — ce compte n\'a pas les droits admin.' : null);
        if (!msg.includes('Forbidden')) navigate({ to: '/login' });
      } else {
        setError('Impossible de charger les réservations.');
      }
    } finally {
      setLoading(false);
    }
  }, [list, navigate]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate({ to: '/login' });
        return;
      }
      setUserEmail(data.session.user.email ?? '');
      load();
    });
  }, [navigate, load]);

  async function handleStatus(id: string, status: Reservation['status']) {
    try {
      await setStatus({ data: { id, status } });
      setItems((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
      setSelected((s) => (s && s.id === id ? { ...s, status } : s));
    } catch {
      setError('Mise à jour impossible.');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer définitivement cette réservation ?')) return;
    try {
      await remove({ data: { id } });
      setItems((prev) => prev.filter((r) => r.id !== id));
      setSelected(null);
    } catch {
      setError('Suppression impossible.');
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: '/login' });
  }

  const filtered = items.filter((r) => {
    if (filter !== 'all' && r.status !== filter) return false;
    if (query.trim()) {
      const q = query.toLowerCase();
      return (
        r.client_name.toLowerCase().includes(q) ||
        r.client_email.toLowerCase().includes(q) ||
        r.client_phone.toLowerCase().includes(q) ||
        r.reference.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const counts = {
    all: items.length,
    pending: items.filter((r) => r.status === 'pending').length,
    confirmed: items.filter((r) => r.status === 'confirmed').length,
    done: items.filter((r) => r.status === 'done').length,
    cancelled: items.filter((r) => r.status === 'cancelled').length,
  };

  const upcomingCount = items.filter((r) => {
    const d = new Date(`${r.appointment_date}T00:00:00`);
    return d >= new Date(new Date().toDateString()) && r.status !== 'cancelled';
  }).length;

  const revenue = items
    .filter((r) => r.status !== 'cancelled')
    .reduce((sum, r) => sum + Number(r.total_price || 0), 0);

  return (
    <div className="min-h-screen bg-[#F6F0DF]" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-[#EFE7D2]/95 backdrop-blur border-b border-[#DDCCB2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#B88F4D] font-semibold">Espace patron</p>
            <h1 className="text-xl sm:text-2xl font-serif text-[#2A241C] truncate">Réservations</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden sm:block text-xs text-[#6E6455] truncate max-w-[180px]">{userEmail}</span>
            <button
              onClick={load}
              className="h-10 px-3 sm:px-4 rounded-full border border-[#DDCCB2] bg-white text-sm text-[#2A241C] hover:bg-[#EFE7D2] transition-colors"
            >
              Actualiser
            </button>
            <button
              onClick={handleSignOut}
              className="h-10 px-3 sm:px-4 rounded-full bg-[#2A241C] text-white text-sm hover:bg-[#3A2F26] transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Stat label="À venir" value={upcomingCount} />
          <Stat label="En attente" value={counts.pending} accent />
          <Stat label="Confirmées" value={counts.confirmed} />
          <Stat label="Chiffre" value={`${revenue.toFixed(0)} €`} />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-4">
          <div className="flex flex-wrap gap-2">
            {(['all', 'pending', 'confirmed', 'done', 'cancelled'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`h-10 px-4 rounded-full text-sm border transition-colors ${
                  filter === f
                    ? 'bg-[#2A241C] text-white border-[#2A241C]'
                    : 'bg-white text-[#2A241C] border-[#DDCCB2] hover:bg-[#EFE7D2]'
                }`}
              >
                {f === 'all' ? 'Toutes' : STATUS_LABEL[f]} ({counts[f]})
              </button>
            ))}
          </div>
          <input
            type="search"
            placeholder="Rechercher (nom, email, tél., réf.)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-11 px-4 rounded-full border border-[#DDCCB2] bg-white text-sm w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-[#B88F4D]"
          />
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-800 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-16 text-[#6E6455]">Chargement…</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-[#6E6455] bg-white/60 rounded-2xl border border-[#DDCCB2]">
            Aucune réservation pour ce filtre.
          </div>
        ) : (
          <ul className="space-y-3">
            {filtered.map((r) => (
              <li key={r.id}>
                <button
                  onClick={() => setSelected(r)}
                  className="w-full text-left bg-white rounded-2xl border border-[#DDCCB2] hover:border-[#B88F4D] transition-colors p-4 sm:p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className={`inline-block text-[11px] px-2 py-0.5 rounded-full border ${STATUS_COLORS[r.status]}`}>
                          {STATUS_LABEL[r.status]}
                        </span>
                        <span className="text-[11px] text-[#8B7F6E]">#{r.reference}</span>
                      </div>
                      <p className="font-serif text-lg text-[#2A241C] truncate">{r.client_name}</p>
                      <p className="text-sm text-[#6E6455] truncate">
                        {r.services.map((s) => s.name).join(' + ')}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm text-[#2A241C] font-semibold">
                        {formatDate(r.appointment_date)}
                      </p>
                      <p className="text-sm text-[#6E6455]">{r.appointment_time}</p>
                      <p className="text-base font-semibold text-[#B88F4D] mt-1">{Number(r.total_price).toFixed(0)} €</p>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>

      {/* Detail sheet */}
      {selected && (
        <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center bg-black/40" onClick={() => setSelected(null)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl border border-[#DDCCB2] max-h-[90vh] overflow-y-auto"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
          >
            <div className="p-5 sm:p-7">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#B88F4D] font-semibold">Réservation</p>
                  <h2 className="font-serif text-2xl text-[#2A241C] mt-1 truncate">{selected.client_name}</h2>
                  <p className="text-xs text-[#8B7F6E]">#{selected.reference}</p>
                </div>
                <button onClick={() => setSelected(null)} className="h-9 w-9 rounded-full bg-[#EFE7D2] text-[#2A241C]" aria-label="Fermer">✕</button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <Field label="Date">{formatDate(selected.appointment_date)}</Field>
                <Field label="Heure">{selected.appointment_time}</Field>
                <Field label="Durée">{selected.duration_min} min</Field>
                <Field label="Total"><span className="text-[#B88F4D] font-semibold">{Number(selected.total_price).toFixed(2)} €</span></Field>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#8B7F6E] mb-1">Prestations</p>
                  <ul className="space-y-1 text-sm text-[#2A241C]">
                    {selected.services.map((s, i) => (
                      <li key={i} className="flex justify-between gap-4">
                        <span>{s.name}</span>
                        <span className="text-[#6E6455]">{s.price} €</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {selected.options.length > 0 && (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#8B7F6E] mb-1">Options</p>
                    <p className="text-sm text-[#2A241C]">{selected.options.join(', ')}</p>
                  </div>
                )}
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#8B7F6E] mb-1">Contact</p>
                  <p className="text-sm text-[#2A241C]">
                    <a href={`mailto:${selected.client_email}`} className="underline decoration-[#B88F4D]">{selected.client_email}</a>
                  </p>
                  <p className="text-sm text-[#2A241C]">
                    <a href={`tel:${selected.client_phone}`} className="underline decoration-[#B88F4D]">{selected.client_phone}</a>
                  </p>
                </div>
                {selected.client_note && (
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#8B7F6E] mb-1">Note</p>
                    <p className="text-sm text-[#2A241C] whitespace-pre-wrap">{selected.client_note}</p>
                  </div>
                )}
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#8B7F6E] mb-2">Statut</p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {(['pending', 'confirmed', 'done', 'cancelled'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => handleStatus(selected.id, s)}
                      className={`h-11 rounded-xl border text-sm transition-colors ${
                        selected.status === s
                          ? 'bg-[#2A241C] text-white border-[#2A241C]'
                          : 'bg-white text-[#2A241C] border-[#DDCCB2] hover:bg-[#EFE7D2]'
                      }`}
                    >
                      {STATUS_LABEL[s]}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => handleDelete(selected.id)}
                  className="w-full h-11 rounded-xl bg-red-50 text-red-800 border border-red-200 text-sm hover:bg-red-100 transition-colors"
                >
                  Supprimer la réservation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number | string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl border p-4 ${accent ? 'bg-[#B88F4D] text-white border-[#B88F4D]' : 'bg-white text-[#2A241C] border-[#DDCCB2]'}`}>
      <p className={`text-[10px] uppercase tracking-widest ${accent ? 'text-white/80' : 'text-[#8B7F6E]'}`}>{label}</p>
      <p className="mt-1 text-2xl font-serif">{value}</p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#F6F0DF] rounded-xl px-3 py-2 border border-[#DDCCB2]">
      <p className="text-[10px] uppercase tracking-widest text-[#8B7F6E]">{label}</p>
      <p className="text-sm text-[#2A241C] mt-0.5">{children}</p>
    </div>
  );
}

function formatDate(iso: string) {
  try {
    return new Date(`${iso}T00:00:00`).toLocaleDateString('fr-FR', {
      weekday: 'short', day: '2-digit', month: 'short', year: 'numeric',
    });
  } catch {
    return iso;
  }
}
