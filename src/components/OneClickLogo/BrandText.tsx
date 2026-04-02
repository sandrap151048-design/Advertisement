import React from 'react';
import { BrandTextProps } from './types';

export const BrandText: React.FC<BrandTextProps> = ({
  size,
  customFontSize,
  variant,
  showFullText,
  className = ''
}) => {
  // Font size configuration
  const fontSizes = {
    small: '1.2rem',
    medium: '1.8rem',
    large: 'clamp(2.5rem, 6vw, 4.5rem)',
    custom: customFontSize || '1.8rem'
  };

  const fontSize = fontSizes[size] || fontSizes.medium;
  
  // Font weight based on size
  const fontWeight = size === 'large' ? 900 : size === 'medium' ? 800 : 700;
  
  // Letter spacing for better readability
  const letterSpacing = size === 'large' ? '-2px' : size === 'medium' ? '-1px' : '-0.5px';

  const textStyle = {
    fontSize,
    fontWeight,
    letterSpacing,
    color: 'var(--logo-text)',
    lineHeight: 1,
    margin: 0,
    fontFamily: 'inherit',
    textRendering: 'optimizeLegibility' as const,
    WebkitFontSmoothing: 'antialiased' as const,
    MozOsxFontSmoothing: 'grayscale' as const,
    display: 'flex',
    alignItems: 'center',
    gap: '0'
  };

  const secondaryTextStyle = {
    fontSize: size === 'large' ? '0.8rem' : size === 'medium' ? '0.7rem' : '0.6rem',
    fontWeight: 600,
    color: 'var(--logo-secondary)',
    letterSpacing: '0.5px',
    textTransform: 'uppercase' as const,
    marginTop: '2px',
    lineHeight: 1,
  };

  // Calculate O size based on font size
  const getOSize = () => {
    if (size === 'large') return 60;
    if (size === 'medium') return 40;
    if (size === 'small') return 30;
    return 40;
  };

  const oSize = getOSize();
  const squareSize = oSize * 0.25;

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', alignItems: 'inherit' }}>
      {/* Main brand text with custom O */}
      <div style={textStyle}>
        {/* Custom O with red square */}
        <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginRight: '-0.05em' }}>
          <svg 
            width={oSize} 
            height={oSize} 
            viewBox="0 0 100 100" 
            style={{ display: 'block' }}
          >
            {/* O outline */}
            <circle
              cx="50"
              cy="50"
              r="35"
              fill="none"
              stroke="var(--logo-text)"
              strokeWidth="8"
            />
            {/* Red square in upper right */}
            <rect
              x="65"
              y="20"
              width="20"
              height="20"
              fill="var(--logo-accent)"
            />
          </svg>
        </div>
        <span style={{ marginLeft: '-0.1em' }}>ne Click</span>
      </div>
      
      {/* Secondary text - only show if showFullText is true */}
      {showFullText && (
        <div style={secondaryTextStyle}>
          Advertisement LLC
        </div>
      )}
    </div>
  );
};

export default BrandText;