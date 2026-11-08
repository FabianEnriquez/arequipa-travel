import { createTheme } from '@mui/material/styles';

export const buildTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: { main: '#0284C7' },
      secondary: { main: '#06B6D4' },
      success: { main: '#10B981' },
      warning: { main: '#F59E0B' },
      background: mode === 'dark' ? { default: '#0F172A', paper: '#1E293B' } : { default: '#F8FAFC', paper: '#FFFFFF' },
    },
    shape: { borderRadius: 14 },
    typography: { fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, sans-serif' },
    components: {
      MuiButton: { styleOverrides: { root: { textTransform: 'none', fontWeight: 700, borderRadius: 12 } } },
    },
  });
