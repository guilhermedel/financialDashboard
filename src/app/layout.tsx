'use client'

import { ThemeProvider } from '@mui/material';
import './globals.css'
import { theme } from '@/config/theme.config';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
