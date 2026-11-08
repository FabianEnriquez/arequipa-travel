import { Box, Container, IconButton, Typography } from '@mui/material';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdEmail, MdPhone, MdPlace } from 'react-icons/md';
import type { IconType } from 'react-icons';
import Logo from '../common/Logo';

const socials: [IconType, string][] = [[FaFacebook, 'Facebook'], [FaInstagram, 'Instagram'], [FaTwitter, 'Twitter'], [FaYoutube, 'YouTube']];
const contacts: [IconType, string][] = [[MdPlace, 'Plaza de Armas 101, Arequipa, Perú'], [MdPhone, '+51 54 123 456'], [MdEmail, 'hola@arequipatravel.com']];

function Col({ t, items }: { t: string; items: string[] }) {
  return (
    <Box>
      <Typography fontWeight={700} mb={1.5}>{t}</Typography>
      {items.map((i) => <Typography key={i} variant="body2" sx={{ opacity: 0.75, mb: 0.8 }}>{i}</Typography>)}
    </Box>
  );
}

export default function Footer() {
  return (
    <Box component="footer" id="contacto" sx={{ bgcolor: '#0F172A', color: '#fff', pt: 8, pb: 4, mt: 10 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'grid', gap: 5, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: '2fr 1fr 1fr 1.5fr' } }}>
          <Box>
            <Logo light />
            <Typography variant="body2" sx={{ opacity: 0.75, mt: 2, maxWidth: 320 }}>Agencia de viajes internacional. Diseñamos experiencias únicas desde la Ciudad Blanca hacia el mundo.</Typography>
            <Box sx={{ mt: 2 }}>
              {socials.map(([I, label]) => <IconButton key={label} aria-label={label} sx={{ color: '#fff' }}><I /></IconButton>)}
            </Box>
          </Box>
          <Col t="Empresa" items={['Nosotros', 'Equipo', 'Trabaja con nosotros', 'Prensa']} />
          <Col t="Ayuda" items={['Preguntas frecuentes', 'Términos', 'Privacidad', 'Soporte']} />
          <Box>
            <Typography fontWeight={700} mb={1.5}>Contacto</Typography>
            {contacts.map(([I, text]) => <Typography key={text} variant="body2" sx={{ opacity: 0.75, mb: 1, display: 'flex', gap: 1, alignItems: 'center' }}><I /> {text}</Typography>)}
          </Box>
        </Box>
        <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', opacity: 0.6, mt: 6 }}>© 2026 Arequipa Travel. Todos los derechos reservados.</Typography>
      </Container>
    </Box>
  );
}
