import { useState } from 'react';
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MdDarkMode, MdLightMode, MdMenu } from 'react-icons/md';
import Logo from '../common/Logo';
import { useColorMode } from '../../context/ColorMode';

const links = [['Inicio', '#inicio'], ['Destinos', '#destinos'], ['Paquetes', '#paquetes'], ['Promociones', '#promociones'], ['Nosotros', '#nosotros'], ['Contacto', '#contacto']];

export default function Navbar() {
  const theme = useTheme();
  const { mode, toggle } = useColorMode();
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  return (
    <motion.div initial={{ y: -70 }} animate={{ y: 0 }} transition={{ type: 'spring', stiffness: 120, damping: 18 }} style={{ position: 'sticky', top: 0, zIndex: 1100 }}>
      <AppBar position="static" elevation={0} sx={{ color: 'text.primary', backdropFilter: 'blur(16px)', bgcolor: alpha(theme.palette.background.paper, 0.75), borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar sx={{ gap: 1, maxWidth: 1280, width: '100%', mx: 'auto' }}>
          <Logo />
          <Box sx={{ flex: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: 0.5 }}>
            {links.map(([l, h]) => <Button key={l} href={h} color="inherit">{l}</Button>)}
          </Box>
          <Box sx={{ flex: { xs: 1, md: 0 } }} />
          <IconButton aria-label="Cambiar tema" onClick={toggle}>{mode === 'dark' ? <MdLightMode /> : <MdDarkMode />}</IconButton>
          <Button component={Link} to="/login" variant="contained" sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>Iniciar Sesión</Button>
          <IconButton aria-label="Abrir menú" sx={{ display: { md: 'none' } }} onClick={(e) => setAnchor(e.currentTarget)}><MdMenu /></IconButton>
          <Menu anchorEl={anchor} open={!!anchor} onClose={() => setAnchor(null)}>
            {links.map(([l, h]) => <MenuItem key={l} component="a" href={h} onClick={() => setAnchor(null)}>{l}</MenuItem>)}
            <MenuItem component={Link} to="/login">Iniciar Sesión</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
}
