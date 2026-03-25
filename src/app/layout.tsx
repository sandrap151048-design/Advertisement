'use client';

import type { Metadata } from 'next';
import './globals.css';
import './mobile-responsive.css';
import Navbar from './components/Navbar';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const isRegisterRoute = pathname === '/register';
  const hideNavbar = isAdminRoute || isRegisterRoute;

  useEffect(() => {
    // Add loaded class to body after mount to prevent flash
    document.body.classList.add('loaded');
  }, []);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="theme-color" content="#7C3AED" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body>
        {!hideNavbar && (
          <>
            <div className="bg-orb orb-1"></div>
            <div className="bg-orb orb-2"></div>
            <Navbar />
          </>
        )}

        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
