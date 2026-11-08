import { Box, Button, Card, CardContent, Chip, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MdStar } from 'react-icons/md';
import { money } from '../../data/format';
import type { Destination } from '../../data/types';

export default function DestinationCard({ d }: { d: Destination }) {
  const nav = useNavigate();
  return (
    <motion.div whileHover={{ y: -6 }} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ height: '100%' }}>
      <Card elevation={0} sx={{ height: '100%', borderRadius: 4, border: 1, borderColor: 'divider', overflow: 'hidden', boxShadow: '0 10px 30px rgba(2,132,199,.10)' }}>
        <Box sx={{ position: 'relative', height: 210, background: 'linear-gradient(135deg,#0284C7,#06B6D4)' }}>
          <Box component="img" src={d.image} alt={`${d.city}, ${d.country}`} loading="lazy" sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <Chip icon={<MdStar color="#F59E0B" />} label={d.rating} size="small" sx={{ position: 'absolute', top: 12, right: 12, fontWeight: 700, bgcolor: 'rgba(255,255,255,.9)', color: '#0F172A' }} />
        </Box>
        <CardContent>
          <Typography variant="h6" fontWeight={800}>{d.city}</Typography>
          <Typography color="text.secondary" variant="body2" mb={1.5}>{d.country}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography color="primary" fontWeight={800}>Desde {money(d.price)}</Typography>
            <Button size="small" variant="outlined" onClick={() => nav('/paquetes')}>Ver paquetes</Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}
