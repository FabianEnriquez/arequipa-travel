import { Box } from '@mui/material';
import type { ReactNode } from 'react';

export default function CardGrid({ children, min = 270 }: { children: ReactNode; min?: number }) {
  return <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: `repeat(auto-fill, minmax(min(${min}px, 100%), 1fr))` }}>{children}</Box>;
}
