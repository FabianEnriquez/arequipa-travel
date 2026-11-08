import { useMemo, useState } from 'react';
import { Box, InputAdornment, MenuItem, TextField } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { MdSearch } from 'react-icons/md';
import Page from '../components/common/Page';
import CardGrid from '../components/common/CardGrid';
import DestinationCard from '../components/cards/DestinationCard';
import PackageCard from '../components/cards/PackageCard';
import { destinations } from '../data/destinations';
import { packages } from '../data/packages';

export function Destinos() {
  const [sp] = useSearchParams();
  const [q, setQ] = useState(sp.get('q') || '');
  const [sort, setSort] = useState('rating');
  const list = useMemo(() => destinations
    .filter((d) => (d.city + d.country).toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => (sort === 'rating' ? b.rating - a.rating : sort === 'price' ? a.price - b.price : a.city.localeCompare(b.city))), [q, sort]);
  return (
    <Page title="Destinos" subtitle={`${list.length} destinos disponibles`}>
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField size="small" placeholder="Buscar destino o país" value={q} onChange={(e) => setQ(e.target.value)} sx={{ flex: 1, minWidth: 220 }}
          inputProps={{ 'aria-label': 'Buscar destino' }} InputProps={{ startAdornment: <InputAdornment position="start"><MdSearch /></InputAdornment> }} />
        <TextField select size="small" label="Ordenar por" value={sort} onChange={(e) => setSort(e.target.value)} sx={{ minWidth: 180 }}>
          <MenuItem value="rating">Mejor calificación</MenuItem><MenuItem value="price">Menor precio</MenuItem><MenuItem value="name">Nombre (A-Z)</MenuItem>
        </TextField>
      </Box>
      <CardGrid>{list.map((d) => <DestinationCard key={d.id} d={d} />)}</CardGrid>
    </Page>
  );
}

export function Paquetes() {
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('rating');
  const list = useMemo(() => packages
    .filter((p) => (p.title + p.destination).toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => (sort === 'rating' ? b.rating - a.rating : sort === 'price' ? a.price - b.price : a.days - b.days)), [q, sort]);
  return (
    <Page title="Paquetes" subtitle={`${list.length} paquetes encontrados`}>
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField size="small" placeholder="Buscar paquete" value={q} onChange={(e) => setQ(e.target.value)} sx={{ flex: 1, minWidth: 220 }}
          inputProps={{ 'aria-label': 'Buscar paquete' }} InputProps={{ startAdornment: <InputAdornment position="start"><MdSearch /></InputAdornment> }} />
        <TextField select size="small" label="Ordenar por" value={sort} onChange={(e) => setSort(e.target.value)} sx={{ minWidth: 180 }}>
          <MenuItem value="rating">Mejor calificación</MenuItem><MenuItem value="price">Menor precio</MenuItem><MenuItem value="days">Menor duración</MenuItem>
        </TextField>
      </Box>
      <Box sx={{ display: 'grid', gap: 3 }}>{list.map((p) => <PackageCard key={p.id} p={p} row />)}</Box>
    </Page>
  );
}
