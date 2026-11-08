import type { PaymentStatus, ReservationStatus } from './types';

export const money = (n: number) =>
  new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
export const statusColor: Record<ReservationStatus, string> = { Pendiente: '#F59E0B', Confirmada: '#0284C7', Finalizada: '#10B981', Cancelada: '#EF4444' };
export const payColor: Record<PaymentStatus, string> = { Pagado: '#10B981', Pendiente: '#F59E0B', Parcial: '#06B6D4' };
export const CHART_COLORS = ['#0284C7', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'];
