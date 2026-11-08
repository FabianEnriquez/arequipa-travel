import { clients } from './clients';
import { packages } from './packages';
import type { PaymentStatus, Reservation, ReservationStatus } from './types';

const st: ReservationStatus[] = ['Confirmada', 'Pendiente', 'Finalizada', 'Cancelada', 'Finalizada'];
const pay: PaymentStatus[] = ['Pagado', 'Parcial', 'Pendiente', 'Pagado'];

export const reservations: Reservation[] = Array.from({ length: 100 }, (_, i) => {
  const p = packages[i % 20];
  const month = (i * 5) % 12;
  return {
    id: `RS-${1001 + i}`,
    client: clients[i % 50].name,
    package: p.title,
    date: `2026-${String(month + 1).padStart(2, '0')}-${String(1 + ((i * 3) % 28)).padStart(2, '0')}`,
    status: st[i % 5],
    payment: pay[(i * 7) % 4],
    amount: p.price * (1 + (i % 3)),
  };
});

export const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
export const revenueByMonth = months.map((_, m) =>
  reservations.filter((r) => Number(r.date.slice(5, 7)) - 1 === m && r.status !== 'Cancelada').reduce((s, r) => s + r.amount, 0));
export const bookingsByMonth = months.map((_, m) => reservations.filter((r) => Number(r.date.slice(5, 7)) - 1 === m).length);
export const statusList: ReservationStatus[] = ['Pendiente', 'Confirmada', 'Finalizada', 'Cancelada'];
export const statusCounts = statusList.map((s) => reservations.filter((r) => r.status === s).length);
export const totalRevenue = revenueByMonth.reduce((a, b) => a + b, 0);
export const kpis = { clients: clients.length, revenue: totalRevenue, bookings: reservations.length, packages: packages.length };
