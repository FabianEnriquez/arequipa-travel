import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { MdFlightTakeoff } from 'react-icons/md';

export default function Logo({ light }: { light?: boolean }) {
  return (
    <Box component={Link} to="/" aria-label="Arequipa Travel, inicio" sx={{ display: 'flex', alignItems: 'center', gap: 1.2, textDecoration: 'none' }}>
      <Box sx={{ width: 40, height: 40, borderRadius: 2.5, display: 'grid', placeItems: 'center', color: '#fff', fontSize: 22, background: 'linear-gradient(135deg,#0284C7,#06B6D4)' }}>
        <MdFlightTakeoff />
      </Box>
      <Typography fontWeight={800} letterSpacing={0.5} color={light ? '#fff' : 'text.primary'}>AREQUIPA TRAVEL</Typography>
    </Box>
  );
}
