import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'light',
    primary: {
      main: '#8B5CF6', // Roxo principal da sidebar
      light: '#A78BFA',
      dark: '#7C3AED',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#06B6D4', // Azul ciano
      light: '#67E8F9',
      dark: '#0891B2',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F8FAFC', // Cinza muito claro
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1E293B',
      secondary: '#64748B',
    },
  },
  typography: {
    fontFamily: '"Inter", "Geist Sans", "Roboto", sans-serif',
    h4: {
      fontWeight: 600,
      color: '#1E293B',
    },
    
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          border: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
  },
});

// Cores personalizadas para os cards
export const cardColors = {
  purple: {
    background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
    color: '#ffffff',
  },
  red: {
    background: 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)',
    color: '#ffffff',
  },
  blue: {
    background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
    color: '#ffffff',
  },
  orange: {
    background: 'linear-gradient(135deg, #F97316 0%, #FB923C 100%)',
    color: '#ffffff',
  },
  green: {
    background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
    color: '#ffffff',
  },
};

export const sidebarGradient = 'linear-gradient(180deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%)';