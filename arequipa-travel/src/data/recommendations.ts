import { destinations } from './destinations';

const affinity = [92, 89, 87, 84, 80];
const ids = [1, 3, 15, 30, 4];
const reasons = [
  'Coincide con tus viajes culturales y de aventura.',
  'Alta afinidad con destinos de playa e historia.',
  'Ideal para tu perfil de naturaleza y vida silvestre.',
  'Popular entre viajeros con tu presupuesto y estilo romántico.',
  'Similar a tus reservas más recientes en Sudamérica.',
];
export const recommendations = ids.map((id, i) => ({ destination: destinations[id - 1], affinity: affinity[i], reason: reasons[i] }));
