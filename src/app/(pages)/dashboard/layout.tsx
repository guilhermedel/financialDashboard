import { ReactNode } from "react";
import Sidebar from "./_components/sidebar/Sidebar";
import { Box } from "@mui/material";
import { FilterProvider } from "@/contexts/FilterContext";
import ProtectedRoute from "@/components/ProtectedRoute";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
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
              padding: "1.5rem",
              maxHeight: "100vh",
              overflowY: "auto",
            }}
          >
            {children}
          </main>
        </Box>
      </FilterProvider>
    </ProtectedRoute>
  );
}
