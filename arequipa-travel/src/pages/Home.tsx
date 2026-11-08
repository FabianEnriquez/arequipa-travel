import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Avatar, Box, Button, Card, Container, IconButton, Paper, Rating, TextField, Typography } from '@mui/material';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MdChevronLeft, MdChevronRight, MdSearch } from 'react-icons/md';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import CardGrid from '../components/common/CardGrid';
import DestinationCard from '../components/cards/DestinationCard';
import PackageCard from '../components/cards/PackageCard';
import { destinations } from '../data/destinations';
import { packages } from '../data/packages';
import { useCountUp } from '../hooks/useCountUp';

const testimonials = [
  { name: 'María Fernández', trip: 'Machu Picchu Premium', text: 'Todo estuvo perfectamente organizado. Los guías fueron excelentes y el hotel increíble. Repetiré sin dudar.' },
  { name: 'Carlos Mendoza', trip: 'Cancún Romance', text: 'La atención antes y durante el viaje fue impecable. Nuestra luna de miel fue de ensueño.' },
  { name: 'Lucía Paredes', trip: 'Madrid Esencial', text: 'Excelente relación calidad-precio y soporte 24/7. La plataforma es muy fácil de usar.' },
  { name: 'Andrés Gutiérrez', trip: 'Salar de Uyuni Aventura', text: 'Una aventura inolvidable. Cada detalle estuvo cuidado y nos sentimos seguros todo el tiempo.' },
];
const posts = [
  { t: '10 consejos para viajar a Machu Picchu', d: '12 oct 2026', c: 'Guías' },
  { t: 'Los mejores destinos de playa para 2027', d: '05 oct 2026', c: 'Tendencias' },
  { t: 'Cómo viajar barato por Sudamérica', d: '28 sep 2026', c: 'Ahorro' },
];

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const n = useCountUp(inView ? value : 0);
  return (
    <Box ref={ref} sx={{ textAlign: 'center' }}>
      <Typography variant="h2" fontWeight={800} sx={{ background: 'linear-gradient(90deg,#0284C7,#06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{n.toLocaleString('es-PE')}{suffix}</Typography>
      <Typography color="text.secondary" fontWeight={600}>{label}</Typography>
    </Box>
  );
}

function Section({ id, title, subtitle, children }: { id: string; title: string; subtitle: string; children: ReactNode }) {
  return (
    <Container id={id} maxWidth="lg" sx={{ mt: 10 }}>
      <Typography variant="h4" component="h2" fontWeight={800}>{title}</Typography>
      <Typography color="text.secondary" mb={4}>{subtitle}</Typography>
      {children}
    </Container>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);
  const tm = testimonials[idx];
  const go = (d: number) => setIdx((i) => (i + d + testimonials.length) % testimonials.length);

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Navbar />
      <Box id="inicio" sx={{ position: 'relative', minHeight: { xs: 640, md: 700 }, display: 'flex', alignItems: 'center', color: '#fff', backgroundImage: 'linear-gradient(120deg,rgba(15,23,42,.82),rgba(2,132,199,.45)), url(https://picsum.photos/seed/arequipa-hero/1800/1000)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Typography variant="h1" fontWeight={800} sx={{ fontSize: { xs: 36, md: 62 }, maxWidth: 780, lineHeight: 1.1 }}>Descubre destinos inolvidables alrededor del mundo</Typography>
            <Typography sx={{ mt: 2, maxWidth: 620, fontSize: { xs: 16, md: 20 }, opacity: 0.9 }}>Paquetes a medida, asesoría experta y las mejores tarifas. Tu próxima aventura comienza en Arequipa Travel.</Typography>
            <Paper elevation={0} sx={{ mt: 4, p: 2, borderRadius: 4, display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1fr auto' }, bgcolor: 'rgba(255,255,255,.16)', backdropFilter: 'blur(18px)', border: '1px solid rgba(255,255,255,.35)' }}>
              <TextField value={q} onChange={(e) => setQ(e.target.value)} label="Destino" placeholder="¿A dónde quieres ir?" sx={{ bgcolor: 'background.paper', borderRadius: 2 }} InputLabelProps={{ shrink: true }} />
              <TextField type="date" label="Fecha" InputLabelProps={{ shrink: true }} sx={{ bgcolor: 'background.paper', borderRadius: 2 }} />
              <TextField type="number" label="Viajeros" defaultValue={2} inputProps={{ min: 1 }} sx={{ bgcolor: 'background.paper', borderRadius: 2 }} />
              <Button variant="contained" size="large" startIcon={<MdSearch />} onClick={() => navigate(`/destinos?q=${encodeURIComponent(q)}`)}>Buscar</Button>
            </Paper>
            <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button variant="contained" color="secondary" size="large" href="#destinos">Explorar Destinos</Button>
              <Button variant="outlined" size="large" href="#paquetes" sx={{ color: '#fff', borderColor: '#fff' }}>Ver Paquetes</Button>
            </Box>
          </motion.div>
        </Container>
      </Box>

      <Section id="destinos" title="Destinos destacados" subtitle="Los lugares más buscados por nuestros viajeros">
        <CardGrid>{destinations.slice(0, 6).map((d) => <DestinationCard key={d.id} d={d} />)}</CardGrid>
      </Section>

      <Section id="paquetes" title="Paquetes destacados" subtitle="Todo incluido, listo para reservar">
        <CardGrid min={300}>{packages.slice(0, 6).map((p) => <PackageCard key={p.id} p={p} />)}</CardGrid>
      </Section>

      <Container id="promociones" maxWidth="lg" sx={{ mt: 10 }}>
        <Box sx={{ p: { xs: 4, md: 6 }, borderRadius: 5, color: '#fff', background: 'linear-gradient(120deg,#0284C7,#06B6D4)', display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" fontWeight={800}>Hasta 25% de descuento</Typography>
            <Typography sx={{ opacity: 0.9 }}>En paquetes seleccionados reservando antes del 31 de diciembre.</Typography>
          </Box>
          <Button variant="contained" sx={{ bgcolor: '#fff', color: '#0284C7', '&:hover': { bgcolor: '#e0f2fe' } }} size="large" onClick={() => navigate('/paquetes')}>Ver ofertas</Button>
        </Box>
      </Container>

      <Container id="nosotros" maxWidth="lg" sx={{ mt: 10 }}>
        <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', sm: 'repeat(3,1fr)' } }}>
          <Stat value={10000} suffix="+" label="Viajeros felices" />
          <Stat value={500} suffix="+" label="Paquetes" />
          <Stat value={50} suffix="+" label="Destinos" />
        </Box>
      </Container>

      <Section id="testimonios" title="Lo que dicen nuestros viajeros" subtitle="Experiencias reales">
        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 5, border: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 2, boxShadow: '0 10px 40px rgba(2,132,199,.10)' }}>
          <IconButton aria-label="Anterior" onClick={() => go(-1)}><MdChevronLeft /></IconButton>
          <Box sx={{ flex: 1, minHeight: 170 }} aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div key={idx} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
                <Rating value={5} readOnly />
                <Typography variant="h6" sx={{ my: 2, fontWeight: 500 }}>“{tm.text}”</Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>{tm.name[0]}</Avatar>
                  <Box><Typography fontWeight={700}>{tm.name}</Typography><Typography variant="body2" color="text.secondary">{tm.trip}</Typography></Box>
                </Box>
              </motion.div>
            </AnimatePresence>
          </Box>
          <IconButton aria-label="Siguiente" onClick={() => go(1)}><MdChevronRight /></IconButton>
        </Paper>
      </Section>

      <Section id="blog" title="Blog turístico" subtitle="Noticias, guías e inspiración">
        <CardGrid min={280}>
          {posts.map((p, i) => (
            <motion.div key={p.t} whileHover={{ y: -4 }}>
              <Card elevation={0} sx={{ borderRadius: 4, border: 1, borderColor: 'divider', overflow: 'hidden', height: '100%' }}>
                <Box component="img" src={`https://picsum.photos/seed/arequipa-blog-${i}/700/400`} alt={p.t} loading="lazy" sx={{ width: '100%', height: 170, objectFit: 'cover', display: 'block' }} />
                <Box sx={{ p: 2.5 }}>
                  <Typography variant="caption" color="primary" fontWeight={700}>{p.c} · {p.d}</Typography>
                  <Typography variant="h6" fontWeight={700}>{p.t}</Typography>
                </Box>
              </Card>
            </motion.div>
          ))}
        </CardGrid>
      </Section>
      <Footer />
    </Box>
  );
}
