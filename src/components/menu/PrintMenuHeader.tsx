import React from 'react';

import { margarine } from '@/config/fonts';

interface PrintMenuHeaderProps {
  tagline: string;
  description?: string;
  fontSize?: string;
}

export const PrintMenuHeader: React.FC<PrintMenuHeaderProps> = ({
  tagline,
  description,
  fontSize = '2.2rem', // Default to 2.2rem if not specified
}) => (
  <>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
        gap: '2rem',
      }}
    >
      <div style={{ flex: '0 0 auto' }}>
        <img
          src="/images/logos/skilletz_logo_colored_flames.png"
          alt="Skillet'z Cafe Logo"
          style={{
            maxWidth: '180px',
            width: '40vw',
            height: 'auto',
            display: 'block',
          }}
        />
      </div>
      <div
        style={{
          flex: '1 1 auto',
          textAlign: 'right',
          fontFamily: margarine.style.fontFamily,
          fontSize,
          color: '#444',
          lineHeight: 1.2,
        }}
      >
        {tagline}
      </div>
    </div>
    {description && <div className="menu-desc">{description}</div>}
  </>
);
