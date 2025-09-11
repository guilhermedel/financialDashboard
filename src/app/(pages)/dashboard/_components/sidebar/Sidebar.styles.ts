'use client'
import styled from 'styled-components';

// Variáveis do tema
const colors = {
  sidebarGradient: 'linear-gradient(180deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%)',
  sidebarWidth: '250px',
  borderRadius: '12px',
  cardShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  white: '#ffffff',
  whiteTransparent: 'rgba(255, 255, 255, 0.8)',
  whiteHover: 'rgba(255, 255, 255, 0.1)',
  whiteBorder: 'rgba(255, 255, 255, 0.2)',
};

const spacing = {
  small: '0.5rem',
  medium: '1rem',
  large: '1.5rem',
  xlarge: '2rem',
};

export const SidebarContainer = styled.aside`
  width: ${colors.sidebarWidth};
  height: 100vh;
  background: ${colors.sidebarGradient};
  color: ${colors.white};
  padding: ${spacing.medium};
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${colors.whiteHover};
    border-radius: 3px;
  }
`;

export const SidebarHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.small};
  margin-bottom: ${spacing.xlarge};
  padding-bottom: ${spacing.medium};
  border-bottom: 1px solid ${colors.whiteHover};
`;

export const SidebarTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
  color: ${colors.white};
`;

export const SidebarNav = styled.nav`
  margin-top: ${spacing.xlarge};
`;

export const SidebarList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${spacing.small};
`;

export const SidebarItem = styled.li`
  margin-bottom: ${spacing.small};
`;

export const SidebarLink = styled.a<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${spacing.small};
  padding: 0.875rem ${spacing.medium};
  color: ${props => props.$active ? colors.white : colors.whiteTransparent};
  text-decoration: none;
  border-radius: ${colors.borderRadius};
  font-weight: ${props => props.$active ? '600' : '500'};
  background-color: ${props => props.$active ? colors.whiteHover : 'transparent'};
  transition: all 0.2s ease-in-out;
  
  &:hover {
    background-color: ${colors.whiteHover};
    color: ${colors.white};
    transform: translateX(4px);
  } 
`;

export const SidebarFooter = styled.footer`
  padding-top: ${spacing.small};
  border-top: 1px solid ${colors.whiteHover};
`;

export const MainContent = styled.main`
  margin-left: ${colors.sidebarWidth};
  padding: ${spacing.xlarge};
  background-color: #F8FAFC;
  min-height: 100vh;
`;

// Exportar as variáveis para usar em outros componentes se necessário
export { colors, spacing };