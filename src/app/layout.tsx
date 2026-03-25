'use client';

import type { Metadata } from 'next';
import './globals.css';
import './mobile-responsive.css';
import Navbar from './components/Navbar';
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const isRegisterRoute = pathname === '/register';
  const hideNavbar = isAdminRoute || isRegisterRoute;

  return (
    <html lang="en">
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
