"use client";
import { ReactNode, useEffect, useState } from "react";
import Sidebar from "./_components/sidebar/Sidebar";
import { Box } from "@mui/material";
import { FilterProvider } from "@/contexts/FilterContext";
import ProtectedRoute from "@/components/ProtectedRoute";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Verificar no carregamento
    checkIsMobile();

    // Adicionar listener para resize
    window.addEventListener("resize", checkIsMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);
  return (
    <ProtectedRoute>
      <FilterProvider>
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <main
            style={{
              flex: 1,
              backgroundColor: "#f9fafb",
              padding: isMobile ? "1rem" : "1.5rem",
              paddingBottom: isMobile? "70px" : "1.5rem",
              maxHeight: "100vh",
              overflowY: "auto",
              marginTop : isMobile ? "60px" : 0,
            }}
          >
            {children}
          </main>
        </Box>
      </FilterProvider>
    </ProtectedRoute>
  );
}
