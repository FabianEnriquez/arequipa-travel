import { Box, Chip, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { MdAttachMoney, MdEventNote, MdLuggage, MdPeople } from 'react-icons/md';
import Page from '../components/common/Page';
import Panel from '../components/common/Panel';
import Kpi from '../components/dashboard/Kpi';
import { axisOptions, pieOptions } from '../components/charts/options';
import { CHART_COLORS, money, statusColor } from '../data/format';
import { bookingsByMonth, kpis, months, reservations, revenueByMonth, statusCounts, statusList } from '../data/dashboard';

export default function Dashboard() {
  const t = useTheme();
  const txt = t.palette.text.secondary;
  const grid = t.palette.divider;
  return (
    <Page title="Dashboard" subtitle="Resumen general de la agencia">
      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', xl: 'repeat(4,1fr)' }, mb: 3 }}>
        <Kpi label="Clientes" value={String(kpis.clients)} icon={<MdPeople />} delay={0} />
        <Kpi label="Ingresos" value={money(kpis.revenue)} icon={<MdAttachMoney />} color="#10B981" delay={0.08} />
        <Kpi label="Reservas" value={String(kpis.bookings)} icon={<MdEventNote />} color="#06B6D4" delay={0.16} />
        <Kpi label="Paquetes" value={String(kpis.packages)} icon={<MdLuggage />} color="#F59E0B" delay={0.24} />
      </Box>
      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, mb: 3 }}>
        <Panel title="Ingresos mensuales (USD)">
          <Box sx={{ height: 300 }}>
            <Line options={axisOptions(txt, grid)} data={{ labels: months, datasets: [{ label: 'Ingresos', data: revenueByMonth, borderColor: '#0284C7', backgroundColor: 'rgba(2,132,199,.18)', fill: true, tension: 0.4 }] }} />
          </Box>
        </Panel>
        <Panel title="Reservas por estado">
          <Box sx={{ height: 300 }}>
            <Doughnut options={pieOptions(txt)} data={{ labels: statusList, datasets: [{ data: statusCounts, backgroundColor: statusList.map((s) => statusColor[s]), borderWidth: 0 }] }} />
          </Box>
        </Panel>
      </Box>
      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' } }}>
        <Panel title="Reservas por mes">
          <Box sx={{ height: 260 }}>
            <Bar options={axisOptions(txt, grid)} data={{ labels: months, datasets: [{ label: 'Reservas', data: bookingsByMonth, backgroundColor: CHART_COLORS[1], borderRadius: 8 }] }} />
          </Box>
        </Panel>
        <Panel title="Últimas reservas">
          <Box sx={{ overflowX: 'auto' }}>
            <Table size="small">
              <TableHead><TableRow><TableCell>ID</TableCell><TableCell>Cliente</TableCell><TableCell>Estado</TableCell></TableRow></TableHead>
              <TableBody>
                {reservations.slice(0, 6).map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>{r.id}</TableCell>
                    <TableCell><Typography variant="body2">{r.client}</Typography></TableCell>
                    <TableCell><Chip size="small" label={r.status} sx={{ bgcolor: statusColor[r.status], color: '#fff', fontWeight: 600 }} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Panel>
      </Box>
    </Page>
  );
}
