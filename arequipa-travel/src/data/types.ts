export interface Destination { id: number; city: string; country: string; price: number; rating: number; image: string; description: string }
export interface TravelPackage { id: number; title: string; destination: string; image: string; price: number; days: number; capacity: number; rating: number; includes: string[] }
export interface Client { id: number; name: string; email: string; country: string; trips: number; spent: number; status: 'Activo' | 'VIP' | 'Inactivo' }
export type ReservationStatus = 'Pendiente' | 'Confirmada' | 'Finalizada' | 'Cancelada';
export type PaymentStatus = 'Pagado' | 'Pendiente' | 'Parcial';
export interface Reservation { id: string; client: string; package: string; date: string; status: ReservationStatus; payment: PaymentStatus; amount: number }
