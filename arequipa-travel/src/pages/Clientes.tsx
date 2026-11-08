import { useMemo, useState } from 'react';
import { Avatar, Box, Chip, InputAdornment, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import { MdSearch } from 'react-icons/md';
import Page from '../components/common/Page';
import { clients } from '../data/clients';
import { money } from '../data/format';

const countries = ['Todos', ...Array.from(new Set(clients.map((c) => c.country)))];
const statuses = ['Todos', 'Activo', 'VIP', 'Inactivo'];

export default function Clientes() {
  const [q, setQ] = useState('');
  const [country, setCountry] = useState('Todos');
  const [status, setStatus] = useState('Todos');
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(8);

  const filtered = useMemo(() => clients.filter((c) =>
    (c.name + c.email).toLowerCase().includes(q.toLowerCase()) && (country === 'Todos' || c.country === country) && (status === 'Todos' || c.status === status)), [q, country, status]);
  const reset = () => setPage(0);

  return (
    <Page title="Clientes" subtitle={`${filtered.length} clientes encontrados`}>
      <Paper elevation={0} sx={{ borderRadius: 4, border: 1, borderColor: 'divider', overflow: 'hidden' }}>
        <Box sx={{ p: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField size="small" placeholder="Buscar por nombre o correo" value={q} onChange={(e) => { setQ(e.target.value); reset(); }} sx={{ flex: 1, minWidth: 220 }}
            inputProps={{ 'aria-label': 'Buscar clientes' }} InputProps={{ startAdornment: <InputAdornment position="start"><MdSearch /></InputAdornment> }} />
          <TextField select size="small" label="País" value={country} onChange={(e) => { setCountry(e.target.value); reset(); }} sx={{ minWidth: 150 }}>{countries.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}</TextField>
          <TextField select size="small" label="Estado" value={status} onChange={(e) => { setStatus(e.target.value); reset(); }} sx={{ minWidth: 150 }}>{statuses.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}</TextField>
        </Box>
        <TableContainer>
          <Table>
            <TableHead><TableRow><TableCell>Cliente</TableCell><TableCell>País</TableCell><TableCell align="right">Viajes</TableCell><TableCell align="right">Gasto total</TableCell><TableCell>Estado</TableCell></TableRow></TableHead>
            <TableBody>
              {filtered.slice(page * rows, page * rows + rows).map((c) => (
                <TableRow key={c.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36 }}>{c.name[0]}</Avatar>
                      <Box><Typography fontWeight={600}>{c.name}</Typography><Typography variant="caption" color="text.secondary">{c.email}</Typography></Box>
                    </Box>
                  </TableCell>
                  <TableCell>{c.country}</TableCell>
                  <TableCell align="right">{c.trips}</TableCell>
                  <TableCell align="right">{money(c.spent)}</TableCell>
                  <TableCell><Chip size="small" label={c.status} color={c.status === 'VIP' ? 'warning' : c.status === 'Activo' ? 'success' : 'default'} /></TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && <TableRow><TableCell colSpan={5} align="center">Sin resultados</TableCell></TableRow>}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination component="div" count={filtered.length} page={page} onPageChange={(_, p) => setPage(p)} rowsPerPage={rows} rowsPerPageOptions={[8, 16, 25]}
          onRowsPerPageChange={(e) => { setRows(Number(e.target.value)); reset(); }} labelRowsPerPage="Filas" />
      </Paper>
    </Page>
  );
}
