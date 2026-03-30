"use client";

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import StyledJsxRegistry from '@/lib/registry';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/admin');
  const isLogin = pathname === '/admin/login';
  const hideLayout = isDashboard || isLogin;

  return (
    <StyledJsxRegistry>
      {!hideLayout && <Navbar />}
      <main style={{ minHeight: '100vh' }}>
        {children}
      </main>
      {!hideLayout && <Footer />}
    </StyledJsxRegistry>
  );
}
