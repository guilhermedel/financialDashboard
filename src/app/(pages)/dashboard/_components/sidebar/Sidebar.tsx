"use client";

import React from "react";
import {
  SidebarContainer,
  SidebarHeader,
  SidebarTitle,
  SidebarNav,
  SidebarList,
  SidebarLink,
  SidebarFooter,
} from "./Sidebar.styles";
import { footerNavItems, navItems } from "@/config/navItems.config";
import { useAuth } from "@/contexts/AuthContext";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export default function Sidebar() {
  const { user, logout } = useAuth();
  return (
    <SidebarContainer>
      <div>
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
          <SidebarLink key="logout" href="#" onClick={logout}>
            <LogoutOutlinedIcon fontSize="large" /> Sair
          </SidebarLink>
      </SidebarFooter>
    </SidebarContainer>
  );
}
