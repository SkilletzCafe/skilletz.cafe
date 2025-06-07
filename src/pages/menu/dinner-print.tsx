import React from 'react';

import { GetStaticProps } from 'next';
import Head from 'next/head';

import { MenuData, MenuGroup, MenuItem } from '@/types/menu';

import { BUSINESS, FULL_ADDRESS } from '@/config/business';
import { geist, margarine } from '@/config/fonts';

import { loadMenuData } from '@/utils/menu_static';

interface DinnerPrintProps {
  dinnerMenu: {
    name: string;
    description: string;
    groups: MenuGroup[];
  };
}

const PAGE_WIDTH_IN = 8.5;
const PAGE_HEIGHT_IN = 11;
const DPI = 96;
const PAGE_WIDTH_PX = PAGE_WIDTH_IN * DPI;
const PAGE_HEIGHT_PX = PAGE_HEIGHT_IN * DPI;
const PADDING_TOP_REM = 1.2;
const PADDING_BOTTOM_REM = 1.2;
const PADDING_TOTAL_IN = (PADDING_TOP_REM + PADDING_BOTTOM_REM) * 0.0625; // Convert rem to inches (1rem ≈ 16px, 16px ≈ 0.167in)
const PAGE_HEIGHT_SAFE_IN = PAGE_HEIGHT_IN - 0.25 - PADDING_TOTAL_IN; // Account for print margins and padding

// New structure: each page is an array of [leftCol, rightCol]
const GRID_ORDER = [
  // Page 1
  [
    ['Appetizers 🧀', 'Daily Specials 🌟', 'Burgers 🍔'], // Left column
    ['Salads 🥗', 'From the Grill 🔥', 'Comfort Favorites 🍽️'], // Right column
  ],
  // Page 2
  [
    ['Sandwiches 🥪'], // Left column
    ['Drinks 🥤', 'Kids/Niños 👶', 'Desserts 🍰'], // Right column
  ],
];

function getGroupByName(groups: MenuGroup[], name: string): MenuGroup | null {
  return groups.find((g) => g.name === name && g.items.length > 0) || null;
}

// Header component
const DinnerMenuHeader: React.FC<{ description?: string }> = ({ description }) => (
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
          fontSize: '2.2rem',
          color: '#444',
          lineHeight: 1.2,
        }}
      >
        Dinner made with ❤️ and fuego 🔥
      </div>
    </div>
    {description && <div className="menu-desc">{description}</div>}
  </>
);

// Footer component
const DinnerMenuFooter: React.FC = () => (
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
      src="/images/qrcodes/dinner-menu.png"
      alt="QR Code for Dinner Menu"
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

const DinnerPrint: React.FC<DinnerPrintProps> = ({ dinnerMenu }) => {
  // Helper to render a column of sections
  const renderColumn = (sectionNames: string[]) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
      {sectionNames.map((groupName) => {
        const group = getGroupByName(dinnerMenu.groups, groupName);
        if (!group) return null;
        // Only show 'Soup of the Day' for Daily Specials
        const items = groupName.startsWith('Daily Specials')
          ? group.items.filter((item) => item.name.startsWith('Soup of the Day'))
          : group.items;
        if (items.length === 0) return null;
        return (
          <div className="menu-section" key={group.guid} style={{ breakInside: 'avoid' }}>
            <div className={`section-title ${margarine.className}`}>{group.name}</div>
            {group.description && <div className="section-desc">{group.description}</div>}
            {items.map((item) => (
              <div key={item.guid} style={{ marginBottom: '0.2rem' }}>
                <div className="item-row">
                  <span className="item-name">{item.name}</span>
                  <span className="item-price" style={{ fontWeight: 700 }}>
                    {Number.isInteger(item.price)
                      ? item.price
                      : item.price.toFixed(2).replace(/\.00$/, '')}
                  </span>
                </div>
                {item.description && <div className="item-desc">{item.description}</div>}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );

  // Render each page as a two-column grid
  const pages = GRID_ORDER.map((pageCols, pageIdx) => {
    const [leftCol, rightCol] = pageCols;
    return (
      <div
        key={`page-${pageIdx}`}
        className={pageIdx === 0 ? '' : 'page-break'}
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: `${PAGE_HEIGHT_SAFE_IN}in`,
          maxHeight: `${PAGE_HEIGHT_SAFE_IN}in`,
          boxSizing: 'border-box',
          overflow: 'hidden',
          paddingTop: pageIdx > 0 ? '0.5in' : '0',
        }}
      >
        {pageIdx === 0 && <DinnerMenuHeader description={dinnerMenu.description} />}
        <div
          style={{
            flex: '1 1 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            columnGap: '2.5rem',
            rowGap: '0.5rem',
            width: '100%',
            overflow: 'hidden',
            minHeight: 0, // Allow flex item to shrink below content size
          }}
        >
          {renderColumn(leftCol)}
          {renderColumn(rightCol)}
        </div>
        <DinnerMenuFooter />
      </div>
    );
  });

  return (
    <>
      <Head>
        <title>Dinner Menu (Printable) | Skillet&#39;z Cafe</title>
        <meta name="robots" content="noindex, nofollow" />
        <style>{`
          @media print {
            @page {
              size: ${PAGE_WIDTH_IN}in ${PAGE_HEIGHT_IN}in;
              margin: 0;
              margin-top: 0.25in;
              margin-bottom: 0.25in;
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
              min-height: ${PAGE_HEIGHT_PX}px;
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
        `}</style>
      </Head>
      <div id="print-area" className={geist.className}>
        {pages}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<DinnerPrintProps> = async () => {
  const menuData = loadMenuData();
  const dinnerMenu = menuData.menus.find((m) => m.name === 'Dinner');
  if (!dinnerMenu) {
    return { notFound: true };
  }
  return {
    props: {
      dinnerMenu: {
        name: dinnerMenu.name,
        description: dinnerMenu.description,
        groups: dinnerMenu.groups,
      },
    },
  };
};

export default DinnerPrint;
