"use client";

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  showFullText?: boolean;
}

export default function Logo({ size = 'medium', className = '', showFullText = false }: LogoProps) {
  const sizes = {
    small: { text: '1.2rem', icon: 30, circle: 30, square: 12, llc: '0.6rem' },
    medium: { text: '1.8rem', icon: 40, circle: 40, square: 16, llc: '0.7rem' },
    large: { text: 'clamp(2.5rem, 6vw, 4.5rem)', icon: 50, circle: 50, square: 20, llc: '0.8rem' }
  };

  const s = sizes[size];

  return (
    <>
      <style jsx>{`
        .logo-container {
          display: flex;
          flex-direction: column;
          align-items: ${size === 'small' ? 'flex-start' : 'center'};
        }

        .logo-wrapper {
          display: inline-flex;
          align-items: center;
          gap: 0;
        }

        .logo-icon {
          position: relative;
          width: ${s.icon}px;
          height: ${s.icon}px;
          flex-shrink: 0;
          margin-right: -2px;
        }

        .logo-circle {
          position: absolute;
          width: ${s.circle}px;
          height: ${s.circle}px;
          border: 2px dashed rgba(255,255,255,0.4);
          border-radius: 50%;
        }

        .logo-square {
          position: absolute;
          width: ${s.square}px;
          height: ${s.square}px;
          background: #e61e25;
          top: ${s.square * 0.25}px;
          right: ${s.square * 0.25}px;
          border-radius: 2px;
        }

        .logo-text {
          font-size: ${s.text};
          font-weight: 200;
          color: rgba(255,255,255,0.9);
          letter-spacing: 2px;
          line-height: 1;
          text-transform: uppercase;
        }

        .logo-llc {
          font-size: ${s.llc};
          color: rgba(255,255,255,0.8);
          font-weight: 300;
          margin-top: ${size === 'small' ? '0.2rem' : '0.5rem'};
          letter-spacing: 3px;
          text-transform: uppercase;
          text-align: center;
        }
      `}</style>

      <div className={`logo-container ${className}`}>
        <div className="logo-wrapper">
          <div className="logo-icon">
            <div className="logo-circle"></div>
            <div className="logo-square"></div>
          </div>
          <div className="logo-text">
            NE CLICK
          </div>
        </div>
        {showFullText && (
          <div className="logo-llc">
            Advertisement LLC
          </div>
        )}
      </div>
    </>
  );
}
