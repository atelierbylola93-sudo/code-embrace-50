import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

const bodySchema = z.object({
  reference: z.string().min(3).max(50),
  client_name: z.string().trim().min(1).max(120),
  client_email: z.string().trim().email().max(255),
  client_phone: z.string().trim().min(6).max(30),
  client_note: z.string().trim().max(1000).optional().nullable(),
  services: z.array(z.object({
    id: z.string().max(120),
    name: z.string().max(200),
    price: z.number().nonnegative(),
    duration: z.string().max(60).optional(),
  })).min(1).max(20),
  options: z.array(z.string().max(200)).max(30).default([]),
  appointment_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  appointment_time: z.string().max(20),
  duration_min: z.number().int().nonnegative().max(1440),
  total_price: z.number().nonnegative().max(100000),
});

export const Route = createFileRoute('/api/public/reservations')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return Response.json({ error: 'Invalid JSON' }, { status: 400 });
        }
        const parsed = bodySchema.safeParse(payload);
        if (!parsed.success) {
          return Response.json({ error: 'Invalid payload', details: parsed.error.flatten() }, { status: 400 });
        }
        const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
        const { data, error } = await supabaseAdmin
          .from('reservations')
          .insert({
            reference: parsed.data.reference,
            client_name: parsed.data.client_name,
            client_email: parsed.data.client_email,
            client_phone: parsed.data.client_phone,
            client_note: parsed.data.client_note ?? null,
            services: parsed.data.services,
            options: parsed.data.options,
            appointment_date: parsed.data.appointment_date,
            appointment_time: parsed.data.appointment_time,
            duration_min: parsed.data.duration_min,
            total_price: parsed.data.total_price,
          })
          .select('id, reference')
          .single();
        if (error) {
          console.error('[reservations] insert failed', error);
          return Response.json({ error: 'Could not save reservation' }, { status: 500 });
        }
        return Response.json({ ok: true, id: data.id, reference: data.reference }, { status: 201 });
      },
    },
  },
});
