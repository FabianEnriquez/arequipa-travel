import type { Client } from './types';

const first = ['Ana', 'Luis', 'Carla', 'Diego', 'Sofia', 'Mateo', 'Valeria', 'Andres', 'Camila', 'Jorge'];
const last = ['Quispe', 'Mamani', 'Rojas', 'Flores', 'Vargas', 'Castro', 'Paredes', 'Salazar', 'Medina', 'Cornejo'];
const countries = ['Perú', 'Bolivia', 'Chile', 'Colombia', 'Argentina', 'España'];

export const clients: Client[] = Array.from({ length: 50 }, (_, i) => {
  const trips = 1 + ((i * 5) % 9);
  return {
    id: i + 1,
    name: `${first[i % 10]} ${last[(i * 7 + Math.floor(i / 10)) % 10]}`,
    email: `${first[i % 10].toLowerCase()}.${i + 1}@correo.com`,
    country: countries[i % 6],
    trips,
    spent: trips * (620 + ((i * 97) % 900)),
    status: i % 7 === 0 ? 'Inactivo' : i % 5 === 0 ? 'VIP' : 'Activo',
  };
});
