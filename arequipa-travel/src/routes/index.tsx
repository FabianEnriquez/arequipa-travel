import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import { Configuracion, Perfil } from '../pages/Account';
import { Destinos, Paquetes } from '../pages/Catalog';
import Clientes from '../pages/Clientes';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import Login from '../pages/Login';
import { Pagos, Reservas } from '../pages/Reservas';
import { Recomendaciones, Reportes } from '../pages/Reportes';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/destinos" element={<Destinos />} />
        <Route path="/paquetes" element={<Paquetes />} />
        <Route path="/reservas" element={<Reservas />} />
        <Route path="/pagos" element={<Pagos />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/recomendaciones" element={<Recomendaciones />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/configuracion" element={<Configuracion />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
