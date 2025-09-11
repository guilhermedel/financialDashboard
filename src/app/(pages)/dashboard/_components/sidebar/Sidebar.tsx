"use client";

import React, { useState, useEffect } from "react";
import {
  SidebarContainer,
  SidebarHeader,
  SidebarTitle,
  SidebarNav,
  SidebarList,
  SidebarLink,
  SidebarFooter,
  MobileMenuButton,
  MobileOverlay,
  CollapsedSidebar
} from "./Sidebar.styles";
import { navItems } from "@/config/navItems.config";
import { useAuth } from "@/contexts/AuthContext";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar se é mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Verificar no carregamento
    checkIsMobile();

    // Adicionar listener para resize
    window.addEventListener('resize', checkIsMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleLinkClick = () => {
    if (isMobile) {
      closeSidebar();
    }
  };

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    if (isMobile) {
      closeSidebar();
    }
  };

  // Se for mobile, renderizar botão + sidebar colapsável
  if (isMobile) {
    return (
      <>
        {/* Botão para abrir menu mobile */}
        <MobileMenuButton>
          <IconButton
            onClick={toggleSidebar}
            sx={{ 
              color: 'white',
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.dark' },
              boxShadow: 2,
              width: 56,
              height: 56
            }}
          >
            <MenuIcon />
          </IconButton>
        </MobileMenuButton>

        {/* Overlay para fechar ao clicar fora */}
        {isOpen && <MobileOverlay onClick={closeSidebar} />}

        {/* Sidebar colapsável */}
        <CollapsedSidebar isOpen={isOpen}>
          <div>
            <SidebarHeader>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                width: '100%', 
                height: '100%'
              }}>
                <div>
                  <SidebarTitle>💰 Finance</SidebarTitle>
                  <span>Olá, {user?.name}</span>
                </div>
                <IconButton 
                  onClick={closeSidebar} 
                  sx={{ color: 'white' }}
                  size="small"
                >
                  <CloseIcon />
                </IconButton>
              </div>
            </SidebarHeader>

            <SidebarNav>
              <SidebarList>
                {navItems.map((item) => (
                  <SidebarLink 
                    key={item.href} 
                    href={item.href}
                    onClick={handleLinkClick}
                  >
                    <item.icon fontSize="large" /> {item.label}
                  </SidebarLink>
                ))}
              </SidebarList>
            </SidebarNav>
          </div>
          
          <SidebarFooter>
            <SidebarLink 
              key="logout" 
              href="#" 
              onClick={handleLogout}
            >
              <LogoutOutlinedIcon fontSize="large" /> Sair
            </SidebarLink>
          </SidebarFooter>
        </CollapsedSidebar>
      </>
    );
  }

  // Desktop - sidebar normal
  return (
    <SidebarContainer>
      <div style={{ flex: 1 }}>
        <SidebarHeader>
          <SidebarTitle>💰 Finance</SidebarTitle>
          <span>Olá, {user?.name}</span>
        </SidebarHeader>

        <SidebarNav>
          <SidebarList>
            {navItems.map((item) => (
              <SidebarLink key={item.href} href={item.href}>
                <item.icon fontSize="large" /> {item.label}
              </SidebarLink>
            ))}
          </SidebarList>
        </SidebarNav>
      </div>
      
      <SidebarFooter>
        <SidebarLink 
          key="logout" 
          href="#" 
          onClick={handleLogout}
        >
          <LogoutOutlinedIcon fontSize="large" /> Sair
        </SidebarLink>
      </SidebarFooter>
    </SidebarContainer>
  );
}
