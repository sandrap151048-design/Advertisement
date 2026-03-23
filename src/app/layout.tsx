import type { Metadata } from 'next';
import './globals.css';
import './mobile-responsive.css';
import Navbar from './components/Navbar';

export const metadata: Metadata = {
  title: 'One Click Advertisement',
  description: 'Premium signage production, branding, digital printed graphics, facade cladding, and vehicle graphics in UAE.',
  manifest: '/manifest.json',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#7C3AED',
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="bg-orb orb-1"></div>
        <div className="bg-orb orb-2"></div>
        <Navbar />

        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
