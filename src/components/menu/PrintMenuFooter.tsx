import React from 'react';

interface PrintMenuFooterProps {
  qrCodePath: string;
  qrCodeAlt: string;
}

export const PrintMenuFooter: React.FC<PrintMenuFooterProps> = ({ qrCodePath, qrCodeAlt }) => (
  <div
    style={{
      marginTop: 'auto', // Push to bottom of flex container
      marginBottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '0.87rem',
      color: '#666',
      borderTop: '1px solid #ddd',
      paddingTop: '0.3rem',
      lineHeight: 1.22,
      flexShrink: 0, // Prevent shrinking
      minHeight: '0.5in', // Minimum height for QR code clearance
      gap: '0.75rem', // Space between QR code and text
    }}
    className="footer-print-bar"
  >
    <img
      src={qrCodePath}
      alt={qrCodeAlt}
      style={{
        width: '0.5in',
        height: '0.5in',
        flexShrink: 0,
      }}
    />
    <span>
      See menu photos online:{' '}
      <a
        href="https://skilletz.cafe/menu"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#444', textDecoration: 'underline' }}
      >
        skilletz.cafe/menu
      </a>
    </span>
  </div>
);
