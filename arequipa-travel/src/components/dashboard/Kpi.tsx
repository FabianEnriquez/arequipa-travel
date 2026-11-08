import { Box, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export default function Kpi({ label, value, icon, color = '#0284C7', delay = 0 }: { label: string; value: string; icon: ReactNode; color?: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.4 }}>
      <Paper elevation={0} sx={{ p: 2.5, borderRadius: 4, border: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 2, boxShadow: '0 8px 30px rgba(2,132,199,.07)' }}>
        <Box sx={{ width: 52, height: 52, borderRadius: 3, display: 'grid', placeItems: 'center', fontSize: 26, color: '#fff', background: `linear-gradient(135deg, ${color}, ${color}bb)` }}>{icon}</Box>
        <Box>
          <Typography variant="body2" color="text.secondary">{label}</Typography>
          <Typography variant="h5" fontWeight={800}>{value}</Typography>
        </Box>
      </Paper>
    </motion.div>
  );
}
