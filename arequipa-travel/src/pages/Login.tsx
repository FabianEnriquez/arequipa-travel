import { useState, type FormEvent } from 'react';
import { Alert, Box, Button, Checkbox, FormControlLabel, IconButton, InputAdornment, Link as MuiLink, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import Logo from '../components/common/Logo';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('demo@arequipatravel.com');
  const [pass, setPass] = useState('demo1234');
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [msg, setMsg] = useState<{ type: 'error' | 'info'; text: string } | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setMsg({ type: 'error', text: 'Ingresa un correo válido.' });
    if (pass.length < 4) return setMsg({ type: 'error', text: 'La contraseña debe tener al menos 4 caracteres.' });
    navigate('/dashboard');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.1fr 1fr' }, bgcolor: 'background.default' }}>
      <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'flex-end', p: 6, color: '#fff', backgroundImage: 'linear-gradient(180deg,rgba(15,23,42,.1),rgba(15,23,42,.85)), url(https://picsum.photos/seed/arequipa-login/1200/1400)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Box>
          <Typography variant="h3" fontWeight={800}>Tu próximo viaje empieza aquí</Typography>
          <Typography sx={{ opacity: 0.85, mt: 1 }}>Gestiona clientes, reservas y pagos desde un solo lugar.</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'grid', placeItems: 'center', p: 3 }}>
        <motion.form onSubmit={submit} noValidate initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: 400 }}>
          <Logo />
          <Typography variant="h4" component="h1" fontWeight={800} mt={4}>Bienvenido de nuevo</Typography>
          <Typography color="text.secondary" mb={3}>Ingresa tus credenciales para continuar</Typography>
          {msg && <Alert severity={msg.type} sx={{ mb: 2 }}>{msg.text}</Alert>}
          <TextField fullWidth label="Correo electrónico" type="email" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }} autoComplete="email" />
          <TextField fullWidth label="Contraseña" type={show ? 'text' : 'password'} value={pass} onChange={(e) => setPass(e.target.value)} autoComplete="current-password"
            InputProps={{ endAdornment: <InputAdornment position="end"><IconButton aria-label={show ? 'Ocultar contraseña' : 'Mostrar contraseña'} onClick={() => setShow(!show)}>{show ? <MdVisibilityOff /> : <MdVisibility />}</IconButton></InputAdornment> }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 1.5 }}>
            <FormControlLabel control={<Checkbox checked={remember} onChange={(e) => setRemember(e.target.checked)} />} label="Recordarme" />
            <MuiLink component="button" type="button" underline="hover" onClick={() => setMsg({ type: 'info', text: 'Te enviamos un enlace de recuperación (simulado).' })}>Recuperar contraseña</MuiLink>
          </Box>
          <Button type="submit" fullWidth size="large" variant="contained">Iniciar Sesión</Button>
          <Button fullWidth sx={{ mt: 1 }} onClick={() => navigate('/')}>Volver al inicio</Button>
        </motion.form>
      </Box>
    </Box>
  );
}
