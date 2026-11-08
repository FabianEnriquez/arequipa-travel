import type { Destination } from './types';

const raw = 'Machu Picchu|Perú;Salar de Uyuni|Bolivia;Cartagena|Colombia;Río de Janeiro|Brasil;Cancún|México;Madrid|España;Cusco|Perú;Arequipa|Perú;Buenos Aires|Argentina;Santiago|Chile;Lima|Perú;Bogotá|Colombia;Medellín|Colombia;Quito|Ecuador;Galápagos|Ecuador;La Paz|Bolivia;Patagonia|Argentina;Punta Cana|Rep. Dominicana;La Habana|Cuba;Ciudad de México|México;París|Francia;Roma|Italia;Barcelona|España;Lisboa|Portugal;Londres|Reino Unido;Nueva York|EE.UU.;Miami|EE.UU.;Tokio|Japón;Dubái|Emiratos Árabes;Santorini|Grecia'.split(';');

export const destinations: Destination[] = raw.map((r, i) => {
  const [city, country] = r.split('|');
  return {
    id: i + 1,
    city,
    country,
    price: 480 + ((i * 173) % 1700),
    rating: +(4.3 + ((i * 7) % 7) / 10).toFixed(1),
    image: `https://picsum.photos/seed/arequipa-travel-${i + 1}/800/600`,
    description: `Descubre ${city}, un destino de ${country} con cultura, gastronomía y paisajes inolvidables.`,
  };
});
