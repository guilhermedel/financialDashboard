import { ReactNode } from 'react'
import Sidebar from './_components/sidebar/Sidebar';
import { Box } from '@mui/material';

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main style={{ 
        flex: 1, 
        backgroundColor: '#f9fafb',
        padding: '2rem'
      }}>
        {children}
      </main>
    </Box>
  )
}