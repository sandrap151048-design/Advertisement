"use client";

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import AdminSidebar from './components/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    // Hide navbar and footer for admin pages
    const navbar = document.querySelector('.navbar');
    const footer = document.querySelector('footer');
    const orbs = document.querySelectorAll('.bg-orb');
    
    if (navbar) (navbar as HTMLElement).style.display = 'none';
    if (footer) (footer as HTMLElement).style.display = 'none';
    orbs.forEach(orb => (orb as HTMLElement).style.display = 'none');

    // Cleanup on unmount
    return () => {
      if (navbar) (navbar as HTMLElement).style.display = '';
      if (footer) (footer as HTMLElement).style.display = '';
      orbs.forEach(orb => (orb as HTMLElement).style.display = '');
    };
  }, [pathname]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc', overflow: 'hidden' }}>
      <div style={{ width: '320px', flexShrink: 0, height: '100vh', position: 'sticky', top: 0 }}>
        <AdminSidebar />
      </div>
      <div style={{ flex: 1, height: '100vh', overflowY: 'auto', padding: '3rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
