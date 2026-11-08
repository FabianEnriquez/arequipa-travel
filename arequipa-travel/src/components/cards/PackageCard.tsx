import { Box, Button, Card, Chip, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MdAccessTime, MdGroups, MdPlace, MdStar } from 'react-icons/md';
import { money } from '../../data/format';
import type { TravelPackage } from '../../data/types';

export default function PackageCard({ p, row }: { p: TravelPackage; row?: boolean }) {
  const nav = useNavigate();
  return (
    <motion.div whileHover={{ y: -4 }} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ height: '100%' }}>
      <Card elevation={0} sx={{ height: '100%', display: 'flex', flexDirection: row ? { xs: 'column', md: 'row' } : 'column', borderRadius: 4, border: 1, borderColor: 'divider', overflow: 'hidden', boxShadow: '0 10px 30px rgba(2,132,199,.10)' }}>
        <Box component="img" src={p.image} alt={p.title} loading="lazy" sx={{ width: row ? { xs: '100%', md: 300 } : '100%', height: row ? { xs: 200, md: 'auto' } : 200, minHeight: 200, objectFit: 'cover', background: 'linear-gradient(135deg,#0284C7,#06B6D4)' }} />
        <Box sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
            <Typography variant="h6" fontWeight={800}>{p.title}</Typography>
            <Chip icon={<MdStar color="#F59E0B" />} label={p.rating} size="small" />
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><MdPlace /> {p.destination}</Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', color: 'text.secondary', fontSize: 14 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><MdAccessTime /> {p.days} días</Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><MdGroups /> Hasta {p.capacity} personas</Box>
          </Box>
          {row && <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap' }}>{p.includes.map((i) => <Chip key={i} label={i} size="small" color="secondary" variant="outlined" />)}</Box>}
          <Box sx={{ mt: 'auto', pt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" color="primary" fontWeight={800}>{money(p.price)}</Typography>
            <Button variant="contained" onClick={() => nav('/reservas')}>Reservar</Button>
          </Box>
        </Box>
      </Card>
    </motion.div>
  );
}
