// Print menu configuration
export const PAGE_WIDTH_IN = 8.5;
export const LETTER_HEIGHT_IN = 11;
export const LEGAL_HEIGHT_IN = 14;
export const DPI = 96;

// Landscape dimensions (swapped width/height)
export const LANDSCAPE_WIDTH_IN = LETTER_HEIGHT_IN; // 11 inches
export const LANDSCAPE_HEIGHT_IN = PAGE_WIDTH_IN; // 8.5 inches

// Print margins and conversions
export const PRINT_MARGIN_IN = 0.25; // Standard print margin
export const REM_TO_INCHES = 0.0625; // 1rem ≈ 16px, 16px ≈ 0.167in

// Calculate pixel dimensions
export const PAGE_WIDTH_PX = PAGE_WIDTH_IN * DPI;
export const LETTER_HEIGHT_PX = LETTER_HEIGHT_IN * DPI;
export const LEGAL_HEIGHT_PX = LEGAL_HEIGHT_IN * DPI;
export const LANDSCAPE_WIDTH_PX = LANDSCAPE_WIDTH_IN * DPI;
export const LANDSCAPE_HEIGHT_PX = LANDSCAPE_HEIGHT_IN * DPI;

// Padding in rem units
export const PADDING_TOP_REM = 1.2;
export const PADDING_BOTTOM_REM = 1.2;
export const PADDING_TOTAL_IN = (PADDING_TOP_REM + PADDING_BOTTOM_REM) * REM_TO_INCHES;

// Safe height for content (accounting for print margins and padding)
export const LETTER_HEIGHT_SAFE_IN = LETTER_HEIGHT_IN - PRINT_MARGIN_IN - PADDING_TOTAL_IN;
export const LEGAL_HEIGHT_SAFE_IN = LEGAL_HEIGHT_IN - PRINT_MARGIN_IN - PADDING_TOTAL_IN;
export const LANDSCAPE_HEIGHT_SAFE_IN = LANDSCAPE_HEIGHT_IN - PRINT_MARGIN_IN - PADDING_TOTAL_IN;

// Common styles for print menu pages
export const printMenuStyles = `
  :root {
    --print-text: #222;
    --print-text-secondary: #444;
    --print-text-muted: #555;
    --print-text-light: #666;
    --print-text-very-light: #888;
    --print-border: #bbb;
    --print-background: #ffffff;
    --print-background-light: #f8f8f8;
    --print-shadow: rgba(0,0,0,0.08);
  }

  @media print {
    @page {
      size: ${PAGE_WIDTH_IN}in ${LETTER_HEIGHT_IN}in;
      margin: 0;
      margin-top: ${PRINT_MARGIN_IN}in;
    }
    html, body {
      width: ${PAGE_WIDTH_IN}in;
      margin: 0;
      padding: 0;
      background: var(--print-background) !important;
    }
    .page-break {
      page-break-before: always;
    }
    .footer-print-bar {
      border-top: none !important;
      display: block !important;
      visibility: visible !important;
      position: relative !important;
      page-break-inside: avoid !important;
      background-color: var(--print-background) !important;
      margin-top: auto !important;
      flex-shrink: 0 !important;
    }
    .footer-print-bar span,
    .footer-print-bar a {
      display: inline !important;
      visibility: visible !important;
      color: var(--print-text-light) !important;
      print-color-adjust: exact !important;
      -webkit-print-color-adjust: exact !important;
    }
  }
  @media screen {
    html, body {
      background: var(--print-background-light);
    }
    #print-area {
      border: 1px solid var(--print-text);
      margin: 2rem auto;
      max-width: ${PAGE_WIDTH_PX}px;
      min-height: ${LETTER_HEIGHT_PX}px;
      background: var(--print-background);
      box-shadow: 0 2px 16px var(--print-shadow);
      padding: 2rem 2.5rem;
    }
  }
  #print-area {
    font-family: 'Geist', Arial, sans-serif;
    font-size: 0.87rem;
    color: var(--print-text);
    line-height: 1.22;
    padding: 1.2rem 1.5rem;
  }
  .menu-title {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    letter-spacing: 0.04em;
  }
  .menu-desc {
    text-align: center;
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
    color: var(--print-text-secondary);
  }
  .menu-section {
    margin-bottom: 1.2rem;
    page-break-inside: avoid;
  }
  .section-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.2rem;
    border-bottom: 1px solid var(--print-border);
    padding-bottom: 0.1rem;
    letter-spacing: 0.02em;
  }
  .section-desc {
    font-size: 0.85rem;
    color: var(--print-text-muted);
    margin-bottom: 0.3rem;
  }
  .item-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.15rem;
    gap: 1.5rem;
  }
  .item-name {
    font-weight: 500;
    font-size: 1.02rem;
    flex: 1 1 60%;
    margin-right: 0.5rem;
  }
  .item-price {
    font-weight: 500;
    font-size: 1.02rem;
    flex: 0 0 auto;
    min-width: 3.5rem;
    text-align: right;
    white-space: nowrap;
  }
  .item-desc {
    font-size: 0.85rem;
    color: var(--print-text-very-light);
    margin-left: 0.5rem;
    margin-bottom: 0.1rem;
    font-weight: 400;
  }
`;

// Landscape-specific print styles
export const printMenuLandscapeStyles = `
  :root {
    --print-text: #222;
    --print-text-secondary: #444;
    --print-text-muted: #555;
    --print-text-light: #666;
    --print-text-very-light: #888;
    --print-border: #bbb;
    --print-background: #ffffff;
    --print-background-light: #f8f8f8;
    --print-shadow: rgba(0,0,0,0.08);
  }

  @media print {
    @page {
      size: ${LANDSCAPE_WIDTH_IN}in ${LANDSCAPE_HEIGHT_IN}in;
      margin: 0;
      margin-top: ${PRINT_MARGIN_IN}in;
    }
    html, body {
      width: ${LANDSCAPE_WIDTH_IN}in;
      height: ${LANDSCAPE_HEIGHT_IN}in;
      margin: 0;
      padding: 0;
      background: var(--print-background) !important;
      overflow: hidden;
    }
    .page-break {
      page-break-before: always;
    }
    * {
      page-break-inside: avoid;
      page-break-after: avoid;
    }
    .footer-print-bar {
      border-top: none !important;
      display: block !important;
      visibility: visible !important;
      position: relative !important;
      page-break-inside: avoid !important;
      background-color: var(--print-background) !important;
      margin-top: auto !important;
      flex-shrink: 0 !important;
    }
    .footer-print-bar span,
    .footer-print-bar a {
      display: inline !important;
      visibility: visible !important;
      color: var(--print-text-light) !important;
      print-color-adjust: exact !important;
      -webkit-print-color-adjust: exact !important;
    }
  }
  @media screen {
    html, body {
      background: var(--print-background-light);
    }
    #print-area {
      border: 1px solid var(--print-text);
      margin: 2rem auto;
      max-width: ${LANDSCAPE_WIDTH_PX}px;
      min-height: ${LANDSCAPE_HEIGHT_PX}px;
      background: var(--print-background);
      box-shadow: 0 2px 16px var(--print-shadow);
      padding: 2rem 2.5rem;
    }
  }
  #print-area {
    font-family: 'Geist', Arial, sans-serif;
    font-size: 0.87rem;
    color: var(--print-text);
    line-height: 1.22;
    padding: 0.8rem 1.2rem;
    height: ${LANDSCAPE_HEIGHT_SAFE_IN}in;
    max-height: ${LANDSCAPE_HEIGHT_SAFE_IN}in;
    overflow: hidden;
    page-break-inside: avoid;
  }
  .menu-title {
    text-align: center;
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 0.3rem;
    letter-spacing: 0.04em;
  }
  .menu-desc {
    text-align: center;
    font-size: 1.1rem;
    margin-bottom: 0.8rem;
    color: var(--print-text-secondary);
  }
  .menu-section {
    margin-bottom: 0.6rem;
    page-break-inside: avoid;
  }
  .section-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.1rem;
    border-bottom: 1px solid var(--print-border);
    padding-bottom: 0.05rem;
    letter-spacing: 0.02em;
  }
  .section-desc {
    font-size: 0.85rem;
    color: var(--print-text-muted);
    margin-bottom: 0.2rem;
  }
  .item-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.1rem;
    gap: 0.1rem;
  }
  .item-name {
    font-weight: 500;
    font-size: 0.95rem;
    flex: 1 1 20rem;
    margin-right: 0;
  }
  .item-price {
    font-weight: 500;
    font-size: 1.02rem;
    flex: 0 0 auto;
    min-width: 2rem;
    text-align: right;
    white-space: nowrap;
  }
  .item-desc {
    font-size: 0.8rem;
    color: var(--print-text-very-light);
    margin-left: 0.5rem;
    margin-bottom: 0.1rem;
    font-weight: 400;
  }
`;
