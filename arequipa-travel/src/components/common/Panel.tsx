import { Paper, Typography } from '@mui/material';
import type { ReactNode } from 'react';

export default function Panel({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: 1, borderColor: 'divider', boxShadow: '0 8px 30px rgba(2,132,199,.07)', minWidth: 0 }}>
      {title && <Typography fontWeight={700} mb={2}>{title}</Typography>}
      {children}
    </Paper>
  );
}
