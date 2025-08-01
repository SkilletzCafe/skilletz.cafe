// Print menu configuration
export const PAGE_WIDTH_IN = 8.5;
export const LETTER_HEIGHT_IN = 11;
export const LEGAL_HEIGHT_IN = 14;
export const DPI = 96;

// Print margins and conversions
export const PRINT_MARGIN_IN = 0.25; // Standard print margin
export const REM_TO_INCHES = 0.0625; // 1rem ≈ 16px, 16px ≈ 0.167in

// Calculate pixel dimensions
export const PAGE_WIDTH_PX = PAGE_WIDTH_IN * DPI;
export const LETTER_HEIGHT_PX = LETTER_HEIGHT_IN * DPI;
export const LEGAL_HEIGHT_PX = LEGAL_HEIGHT_IN * DPI;

// Padding in rem units
export const PADDING_TOP_REM = 1.2;
export const PADDING_BOTTOM_REM = 1.2;
export const PADDING_TOTAL_IN = (PADDING_TOP_REM + PADDING_BOTTOM_REM) * REM_TO_INCHES;

// Safe height for content (accounting for print margins and padding)
export const LETTER_HEIGHT_SAFE_IN = LETTER_HEIGHT_IN - PRINT_MARGIN_IN - PADDING_TOTAL_IN;
export const LEGAL_HEIGHT_SAFE_IN = LEGAL_HEIGHT_IN - PRINT_MARGIN_IN - PADDING_TOTAL_IN;

// Common styles for print menu pages
export const printMenuStyles = `
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
      background: #fff !important;
    }
    .page-break {
      page-break-before: always;
    }
    .footer-print-bar {
      border-top: none !important;
    }
  }
  @media screen {
    html, body {
      background: #f8f8f8;
    }
    #print-area {
      border: 1px solid #222;
      margin: 2rem auto;
      max-width: ${PAGE_WIDTH_PX}px;
      min-height: ${LETTER_HEIGHT_PX}px;
      background: #fff;
      box-shadow: 0 2px 16px rgba(0,0,0,0.08);
      padding: 2rem 2.5rem;
    }
  }
  #print-area {
    font-family: 'Geist', Arial, sans-serif;
    font-size: 0.87rem;
    color: #222;
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
    color: #444;
  }
  .menu-section {
    margin-bottom: 1.2rem;
    page-break-inside: avoid;
  }
  .section-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.2rem;
    border-bottom: 1px solid #bbb;
    padding-bottom: 0.1rem;
    letter-spacing: 0.02em;
  }
  .section-desc {
    font-size: 0.85rem;
    color: #555;
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
    color: #888;
    margin-left: 0.5rem;
    margin-bottom: 0.1rem;
    font-weight: 400;
  }
`;
