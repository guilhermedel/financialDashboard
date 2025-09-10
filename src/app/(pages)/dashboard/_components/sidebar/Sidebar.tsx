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

export default function Sidebar() {
  return (
    <SidebarContainer>
      <div>
        <SidebarHeader>
          <SidebarTitle>💰 Finance</SidebarTitle>
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
        {footerNavItems.map((item) => (
          <SidebarLink key={item.label} href={item.href || undefined}>
            <item.icon fontSize="large"/> {item.label}
          </SidebarLink>
        ))}
      </SidebarFooter>
    </SidebarContainer>
  );
}
