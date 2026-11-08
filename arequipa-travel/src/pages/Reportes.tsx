import { useState } from 'react';
import { Box, Button, Chip, LinearProgress, Paper, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { MdAttachMoney, MdAutoAwesome, MdCheckCircle, MdTrendingUp } from 'react-icons/md';
import Page from '../components/common/Page';
import Panel from '../components/common/Panel';
import Kpi from '../components/dashboard/Kpi';
import { axisOptions, pieOptions } from '../components/charts/options';
import { money, statusColor } from '../data/format';
import { bookingsByMonth, kpis, months, reservations, revenueByMonth, statusCounts, statusList } from '../data/dashboard';
import { recommendations as base } from '../data/recommendations';

export function Reportes() {
  const t = useTheme();
  const [metric, setMetric] = useState<'revenue' | 'bookings'>('revenue');
  const txt = t.palette.text.secondary;
  const ok = reservations.filter((r) => r.status === 'Confirmada' || r.status === 'Finalizada').length;
  const data = metric === 'revenue' ? revenueByMonth : bookingsByMonth;
  return (
    <Page title="Reportes" subtitle="Análisis interactivo del negocio">
      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', xl: 'repeat(4,1fr)' }, mb: 3 }}>
        <Kpi label="Ingresos totales" value={money(kpis.revenue)} icon={<MdAttachMoney />} color="#10B981" />
        <Kpi label="Ticket promedio" value={money(Math.round(kpis.revenue / kpis.bookings))} icon={<MdTrendingUp />} delay={0.08} />
        <Kpi label="Tasa de éxito" value={`${Math.round((ok / kpis.bookings) * 100)}%`} icon={<MdCheckCircle />} color="#06B6D4" delay={0.16} />
        <Kpi label="Mejor mes" value={months[revenueByMonth.indexOf(Math.max(...revenueByMonth))]} icon={<MdAutoAwesome />} color="#F59E0B" delay={0.24} />
      </Box>
      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' } }}>
        <Panel title="Evolución mensual">
          <ToggleButtonGroup exclusive size="small" value={metric} onChange={(_, v) => v && setMetric(v)} sx={{ mb: 2 }} aria-label="Métrica">
            <ToggleButton value="revenue">Ingresos</ToggleButton><ToggleButton value="bookings">Reservas</ToggleButton>
          </ToggleButtonGroup>
          <Box sx={{ height: 300 }}>
            {metric === 'revenue'
              ? <Line options={axisOptions(txt, t.palette.divider)} data={{ labels: months, datasets: [{ label: 'Ingresos (USD)', data, borderColor: '#0284C7', backgroundColor: 'rgba(2,132,199,.18)', fill: true, tension: 0.4 }] }} />
              : <Bar options={axisOptions(txt, t.palette.divider)} data={{ labels: months, datasets: [{ label: 'Reservas', data, backgroundColor: '#06B6D4', borderRadius: 8 }] }} />}
          </Box>
        </Panel>
        <Panel title="Estado de reservas">
          <Box sx={{ height: 340 }}>
            <Doughnut options={pieOptions(txt)} data={{ labels: statusList, datasets: [{ data: statusCounts, backgroundColor: statusList.map((s) => statusColor[s]), borderWidth: 0 }] }} />
          </Box>
        </Panel>
      </Box>
    </Page>
  );
}

export function Recomendaciones() {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState(base);
  const regen = () => {
    setLoading(true);
    setTimeout(() => {
      setList((l) => l.map((r, i) => ({ ...r, affinity: Math.min(98, Math.max(70, r.affinity + ((i * 3 + l.length) % 5) - 2)) })).sort((a, b) => b.affinity - a.affinity));
      setLoading(false);
    }, 1200);
  };
  return (
    <Page title="Recomendaciones IA" subtitle="Top 5 destinos con mayor afinidad (simulado)" action={<Button variant="contained" startIcon={<MdAutoAwesome />} onClick={regen} disabled={loading}>{loading ? 'Analizando…' : 'Regenerar'}</Button>}>
      {loading && <LinearProgress sx={{ mb: 2, borderRadius: 2 }} />}
      <Box sx={{ display: 'grid', gap: 3 }}>
        {list.map((r, i) => (
          <motion.div key={r.destination.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Paper elevation={0} sx={{ borderRadius: 4, border: 1, borderColor: 'divider', overflow: 'hidden', display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, boxShadow: '0 10px 30px rgba(2,132,199,.10)' }}>
              <Box component="img" src={r.destination.image} alt={r.destination.city} loading="lazy" sx={{ width: { xs: '100%', sm: 240 }, height: { xs: 180, sm: 'auto' }, objectFit: 'cover', background: 'linear-gradient(135deg,#0284C7,#06B6D4)' }} />
              <Box sx={{ p: 3, flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h6" fontWeight={800}>#{i + 1} {r.destination.city}, {r.destination.country}</Typography>
                  <Chip color="success" label={`${r.affinity}% afinidad`} sx={{ fontWeight: 700 }} />
                </Box>
                <Typography color="text.secondary" sx={{ my: 1 }}>{r.reason}</Typography>
                <LinearProgress variant="determinate" value={r.affinity} color="secondary" sx={{ height: 10, borderRadius: 5, my: 1.5 }} aria-label={`Afinidad ${r.affinity}%`} />
                <Typography fontWeight={700} color="primary">Desde {money(r.destination.price)}</Typography>
              </Box>
            </Paper>
          </motion.div>
        ))}
      </Box>
    </Page>
  );
}
