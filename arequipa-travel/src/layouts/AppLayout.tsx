import { useState, type ReactNode } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { AppBar, Avatar, Box, Drawer, IconButton, InputBase, List, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, useMediaQuery } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { MdAutoAwesome, MdBarChart, MdDarkMode, MdDashboard, MdEventNote, MdLightMode, MdLuggage, MdMenu, MdPayments, MdPeople, MdPerson, MdPlace, MdSearch, MdSettings } from 'react-icons/md';
import Logo from '../components/common/Logo';
import { useColorMode } from '../context/ColorMode';

const nav: { to: string; label: string; icon: ReactNode }[] = [
  { to: '/dashboard', label: 'Dashboard', icon: <MdDashboard /> },
  { to: '/clientes', label: 'Clientes', icon: <MdPeople /> },
  { to: '/destinos', label: 'Destinos', icon: <MdPlace /> },
  { to: '/paquetes', label: 'Paquetes', icon: <MdLuggage /> },
  { to: '/reservas', label: 'Reservas', icon: <MdEventNote /> },
  { to: '/pagos', label: 'Pagos', icon: <MdPayments /> },
  { to: '/reportes', label: 'Reportes', icon: <MdBarChart /> },
  { to: '/recomendaciones', label: 'Recomendaciones IA', icon: <MdAutoAwesome /> },
  { to: '/perfil', label: 'Perfil', icon: <MdPerson /> },
  { to: '/configuracion', label: 'Configuración', icon: <MdSettings /> },
];

export default function AppLayout() {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  const { mode, toggle } = useColorMode();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Drawer variant={desktop ? 'permanent' : 'temporary'} open={desktop || open} onClose={() => setOpen(false)} ModalProps={{ keepMounted: true }}
        sx={{ width: { md: 260 }, flexShrink: 0, '& .MuiDrawer-paper': { width: 260, boxSizing: 'border-box', borderRight: 1, borderColor: 'divider' } }}>
        <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.4 }}>
          <Box sx={{ p: 3 }}><Logo /></Box>
          <List component="nav" aria-label="Navegación principal" sx={{ px: 2 }}>
            {nav.map((n) => (
              <ListItemButton key={n.to} component={NavLink} to={n.to} onClick={() => setOpen(false)}
                sx={{ borderRadius: 2.5, mb: 0.5, '&.active': { bgcolor: alpha(theme.palette.primary.main, 0.14), color: 'primary.main', '& .MuiListItemIcon-root': { color: 'primary.main' } } }}>
                <ListItemIcon sx={{ minWidth: 38, fontSize: 20 }}>{n.icon}</ListItemIcon>
                <ListItemText primary={n.label} primaryTypographyProps={{ fontWeight: 600, fontSize: 14 }} />
              </ListItemButton>
            ))}
          </List>
        </motion.div>
      </Drawer>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <motion.div initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ position: 'sticky', top: 0, zIndex: 1100 }}>
          <AppBar position="static" elevation={0} sx={{ color: 'text.primary', backdropFilter: 'blur(16px)', bgcolor: alpha(theme.palette.background.paper, 0.8), borderBottom: 1, borderColor: 'divider' }}>
            <Toolbar sx={{ gap: 1 }}>
              <IconButton aria-label="Abrir menú" sx={{ display: { md: 'none' } }} onClick={() => setOpen(true)}><MdMenu /></IconButton>
              <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1, px: 2, py: 0.5, borderRadius: 3, bgcolor: alpha(theme.palette.primary.main, 0.08), flex: 1, maxWidth: 420 }}>
                <MdSearch /><InputBase placeholder="Buscar…" inputProps={{ 'aria-label': 'Buscar' }} sx={{ flex: 1 }} />
              </Box>
              <Box sx={{ flex: 1 }} />
              <IconButton aria-label="Cambiar tema" onClick={toggle}>{mode === 'dark' ? <MdLightMode /> : <MdDarkMode />}</IconButton>
              <IconButton aria-label="Cuenta" onClick={(e) => setAnchor(e.currentTarget)}><Avatar sx={{ width: 34, height: 34, bgcolor: 'primary.main' }}>AT</Avatar></IconButton>
              <Menu anchorEl={anchor} open={!!anchor} onClose={() => setAnchor(null)}>
                <MenuItem component={Link} to="/perfil" onClick={() => setAnchor(null)}>Perfil</MenuItem>
                <MenuItem component={Link} to="/configuracion" onClick={() => setAnchor(null)}>Configuración</MenuItem>
                <MenuItem onClick={() => navigate('/login')}>Cerrar sesión</MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
        </motion.div>
        <Box component="main" sx={{ p: { xs: 2, md: 4 } }}><Outlet /></Box>
      </Box>
    </Box>
  );
}
