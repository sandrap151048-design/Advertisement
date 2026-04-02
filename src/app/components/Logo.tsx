"use client";

import { OneClickLogo } from '../../components/OneClickLogo';
import type { OneClickLogoProps } from '../../components/OneClickLogo';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  showFullText?: boolean;
}

export default function Logo({ size = 'medium', className = '', showFullText = false }: LogoProps) {
  // Map old props to new OneClickLogo props for backward compatibility
  const logoProps: OneClickLogoProps = {
    size,
    className,
    showFullText,
    variant: 'dark', // Use dark variant with white text as requested
    layout: 'horizontal'
  };

  return <OneClickLogo {...logoProps} />;
}
