import axios from 'axios';
import { clients } from '../data/clients';
import { reservations } from '../data/dashboard';
import { destinations } from '../data/destinations';
import { packages } from '../data/packages';

// Cliente preparado para un backend futuro (VITE_API_URL). Hoy todo responde con datos mock.
export const http = axios.create({ baseURL: import.meta.env.VITE_API_URL || '' });
const mock = <T>(data: T, ms = 300) => new Promise<T>((res) => setTimeout(() => res(data), ms));

export const api = {
  destinations: () => mock(destinations),
  packages: () => mock(packages),
  clients: () => mock(clients),
  reservations: () => mock(reservations),
};
