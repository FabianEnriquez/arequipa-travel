import { useState } from 'react';
import { Box, Button, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Doughnut } from 'react-chartjs-2';
import { MdCheckCircle, MdHourglassTop, MdPayments } from 'react-icons/md';
import Page from '../components/common/Page';
import Panel from '../components/common/Panel';
import Kpi from '../components/dashboard/Kpi';
import { pieOptions } from '../components/charts/options';
import { money, payColor, statusColor } from '../data/format';
import { reservations, statusList } from '../data/dashboard';
import type { PaymentStatus, ReservationStatus } from '../data/types';

export function Reservas() {
  const [f, setF] = useState<'Todas' | ReservationStatus>('Todas');
  const [visible, setVisible] = useState(10);
  const list = reservations.filter((r) => f === 'Todas' || r.status === f);
  return (
    <Page title="Reservas" subtitle="Línea de tiempo de reservas">
      <ToggleButtonGroup exclusive value={f} size="small" onChange={(_, v) => { if (v) { setF(v); setVisible(10); } }} sx={{ mb: 3, flexWrap: 'wrap' }} aria-label="Filtrar por estado">
        {['Todas', ...statusList].map((s) => <ToggleButton key={s} value={s}>{s}</ToggleButton>)}
      </ToggleButtonGroup>
      {list.slice(0, visible).map((r, i) => (
        <motion.div key={r.id} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: Math.min(i, 10) * 0.03 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box sx={{ width: 14, height: 14, borderRadius: '50%', bgcolor: statusColor[r.status], mt: 2.2, boxShadow: `0 0 0 4px ${statusColor[r.status]}33` }} />
              <Box sx={{ flex: 1, width: 2, bgcolor: 'divider' }} />
            </Box>
            <Paper elevation={0} sx={{ flex: 1, p: 2, mb: 2, borderRadius: 3, border: 1, borderColor: 'divider', display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography fontWeight={700}>{r.package} <Typography component="span" variant="caption" color="text.secondary">· {r.id}</Typography></Typography>
                <Typography variant="body2" color="text.secondary">{r.client} · {r.date}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography fontWeight={800}>{money(r.amount)}</Typography>
                <Chip size="small" label={r.status} sx={{ bgcolor: statusColor[r.status], color: '#fff', fontWeight: 600 }} />
              </Box>
            </Paper>
          </Box>
        </motion.div>
      ))}
      {visible < list.length && <Button variant="outlined" onClick={() => setVisible(visible + 10)}>Ver más ({list.length - visible})</Button>}
    </Page>
  );
}

const payList: PaymentStatus[] = ['Pagado', 'Pendiente', 'Parcial'];

export function Pagos() {
  const t = useTheme();
  const sum = (p: PaymentStatus) => reservations.filter((r) => r.payment === p).reduce((s, r) => s + r.amount, 0);
  const totals = payList.map(sum);
  return (
    <Page title="Pagos" subtitle="Dashboard financiero">
      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: 'repeat(3,1fr)' }, mb: 3 }}>
        <Kpi label="Pagado" value={money(totals[0])} icon={<MdCheckCircle />} color="#10B981" />
        <Kpi label="Pendiente" value={money(totals[1])} icon={<MdHourglassTop />} color="#F59E0B" delay={0.08} />
        <Kpi label="Parcial" value={money(totals[2])} icon={<MdPayments />} color="#06B6D4" delay={0.16} />
      </Box>
      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', lg: '1fr 2fr' } }}>
        <Panel title="Distribución de pagos">
          <Box sx={{ height: 280 }}>
            <Doughnut options={pieOptions(t.palette.text.secondary)} data={{ labels: payList, datasets: [{ data: totals, backgroundColor: payList.map((p) => payColor[p]), borderWidth: 0 }] }} />
          </Box>
        </Panel>
        <Panel title="Movimientos recientes">
          <TableContainer>
            <Table size="small">
              <TableHead><TableRow><TableCell>Reserva</TableCell><TableCell>Cliente</TableCell><TableCell align="right">Monto</TableCell><TableCell>Pago</TableCell></TableRow></TableHead>
              <TableBody>
                {reservations.slice(0, 8).map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>{r.id}</TableCell><TableCell>{r.client}</TableCell><TableCell align="right">{money(r.amount)}</TableCell>
                    <TableCell><Chip size="small" label={r.payment} sx={{ bgcolor: payColor[r.payment], color: '#fff', fontWeight: 600 }} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Panel>
      </Box>
    </Page>
  );
}
