import { Box, styled } from "@mui/material";
import Link from "next/link";

// Sidebar desktop (original)
export const SidebarContainer = styled(Box)(({ theme }) => ({
  width: 250,
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  zIndex: 1000,
  
  // Esconder em mobile
  '@media (max-width: 768px)': {
    display: 'none',
  },
}));

// Sidebar mobile colapsável
export const CollapsedSidebar = styled(Box)<{ isOpen: boolean }>(({ theme, isOpen }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: 280,
  height: '100vh',
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  zIndex: 1300,
  transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
  transition: 'transform 0.3s ease-in-out',
  boxShadow: isOpen ? '4px 0 12px rgba(0,0,0,0.15)' : 'none',
  
  // Mostrar apenas em mobile
  '@media (min-width: 769px)': {
    display: 'none',
  },
}));

// Botão do menu mobile
export const MobileMenuButton = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 20,
  left: 20,
  display: 'none',
  
  // Mostrar apenas em mobile
  '@media (max-width: 768px)': {
    display: 'block',
  },
}));

// Overlay para fechar ao clicar fora
export const MobileOverlay = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 1200,
  display: 'none',
  
  // Mostrar apenas em mobile quando sidebar estiver aberta
  '@media (max-width: 768px)': {
    display: 'block',
  },
}));

export const SidebarHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  borderBottom: '1px solid rgba(255,255,255,0.2)',
  
  '& span': {
    display: 'block',
    fontSize: '0.875rem',
    opacity: 0.8,
    marginTop: theme.spacing(1),
  },
}));

export const SidebarTitle = styled('h2')(({ theme }) => ({
  margin: 0,
  fontSize: '1.5rem',
  fontWeight: 600,
}));

export const SidebarNav = styled('nav')(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(2, 0),
}));

export const SidebarList = styled('ul')(({ theme }) => ({
  listStyle: 'none',
  padding: 0,
  margin: 0,
}));

export const SidebarLink = styled('a')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(1.5, 3),
  color: 'white',
  textDecoration: 'none',
  transition: 'background-color 0.2s ease',
  cursor: 'pointer',
  
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  
  '& svg': {
    fontSize: '1.25rem',
  },
}));

export const SidebarFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(255,255,255,0.2)',
}));