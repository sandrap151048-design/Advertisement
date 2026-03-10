"use client";

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

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

  return <>{children}</>;
}
