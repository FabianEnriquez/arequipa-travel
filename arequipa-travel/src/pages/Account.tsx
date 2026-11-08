import { useState, type ChangeEvent } from 'react';
import { Avatar, Box, Button, MenuItem, Snackbar, Switch, TextField, Typography, FormControlLabel } from '@mui/material';
import Page from '../components/common/Page';
import Panel from '../components/common/Panel';
import { useColorMode } from '../context/ColorMode';

export function Perfil() {
  const [form, setForm] = useState({ name: 'Admin Arequipa', email: 'demo@arequipatravel.com', phone: '+51 987 654 321', city: 'Arequipa' });
  const [saved, setSaved] = useState(false);
  const set = (k: keyof typeof form) => (e: ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });
  return (
    <Page title="Perfil" subtitle="Administra tu información personal">
      <Panel>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
          <Avatar sx={{ width: 84, height: 84, fontSize: 32, bgcolor: 'primary.main' }}>AT</Avatar>
          <Box><Typography variant="h6" fontWeight={800}>{form.name}</Typography><Typography color="text.secondary">Administrador · Arequipa Travel</Typography></Box>
        </Box>
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
          <TextField label="Nombre" value={form.name} onChange={set('name')} />
          <TextField label="Correo" value={form.email} onChange={set('email')} />
          <TextField label="Teléfono" value={form.phone} onChange={set('phone')} />
          <TextField label="Ciudad" value={form.city} onChange={set('city')} />
        </Box>
        <Button variant="contained" sx={{ mt: 3 }} onClick={() => setSaved(true)}>Guardar cambios</Button>
      </Panel>
      <Snackbar open={saved} autoHideDuration={2500} onClose={() => setSaved(false)} message="Perfil actualizado" />
    </Page>
  );
}

export function Configuracion() {
  const { mode, toggle } = useColorMode();
  const [notif, setNotif] = useState(true);
  const [news, setNews] = useState(false);
  const [lang, setLang] = useState('es');
  return (
    <Page title="Configuración" subtitle="Preferencias de la aplicación">
      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' } }}>
        <Panel title="Apariencia">
          <FormControlLabel control={<Switch checked={mode === 'dark'} onChange={toggle} />} label="Modo oscuro (se guarda automáticamente)" />
        </Panel>
        <Panel title="Notificaciones">
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormControlLabel control={<Switch checked={notif} onChange={(e) => setNotif(e.target.checked)} />} label="Alertas de nuevas reservas" />
            <FormControlLabel control={<Switch checked={news} onChange={(e) => setNews(e.target.checked)} />} label="Boletín semanal de ofertas" />
          </Box>
        </Panel>
        <Panel title="Idioma y región">
          <TextField select fullWidth label="Idioma" value={lang} onChange={(e) => setLang(e.target.value)}>
            <MenuItem value="es">Español</MenuItem><MenuItem value="en">English</MenuItem><MenuItem value="pt">Português</MenuItem>
          </TextField>
        </Panel>
      </Box>
    </Page>
  );
}
