import { destinations } from './destinations';
import type { TravelPackage } from './types';

const kinds = ['Esencial', 'Premium', 'Aventura', 'Romance'];
export const packages: TravelPackage[] = destinations.slice(0, 20).map((d, i) => ({
  id: i + 1,
  title: `${d.city} ${kinds[i % 4]}`,
  destination: `${d.city}, ${d.country}`,
  image: `https://picsum.photos/seed/arequipa-pack-${i + 1}/800/600`,
  price: d.price + 300,
  days: 3 + (i % 8),
  capacity: 8 + (i % 4) * 4,
  rating: d.rating,
  includes: ['Vuelos', 'Hotel', 'Traslados', 'Guía'],
}));
