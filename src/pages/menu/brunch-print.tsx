import React from 'react';

import { GetStaticProps } from 'next';
import Head from 'next/head';

import { MenuData, MenuGroup, MenuItem } from '@/types/menu';

import { BUSINESS, FULL_ADDRESS } from '@/config/business';
import { geist, margarine } from '@/config/fonts';
import { LEGAL_HEIGHT_SAFE_IN, printMenuStyles } from '@/config/printMenu';

import { loadMenuData } from '@/utils/menu_static';

interface BrunchPrintProps {
  brunchMenus: {
    name: string;
    description: string;
    groups: MenuGroup[];
  }[];
}

const PAGE_WIDTH_IN = 8.5;
const PAGE_HEIGHT_IN = 11;
const DPI = 96;
const PAGE_WIDTH_PX = PAGE_WIDTH_IN * DPI;
const PAGE_HEIGHT_PX = PAGE_HEIGHT_IN * DPI;
const PADDING_TOP_REM = 1.2;
const PADDING_BOTTOM_REM = 1.2;
const PADDING_TOTAL_IN = (PADDING_TOP_REM + PADDING_BOTTOM_REM) * 0.0625; // Convert rem to inches (1rem ≈ 16px, 16px ≈ 0.167in)

// New structure: each page is an array of [leftCol, rightCol]
const GRID_ORDER = [
  // Page 1
  [
    ['Meat & Eggs 🥩🍳', 'Pancakes, Waffles & More 🥞'], // Left column
    ['Sandwiches 🥪', 'Kids Menu 👶'], // Right column
  ],
  // Page 2
  [
    ['Salads 🥗'], // Left column
    ['Drinks 🥤', 'Sides 🍟'], // Right column
  ],
];

function getGroupByName(groups: MenuGroup[], name: string): MenuGroup | null {
  return groups.find((g) => g.name === name && g.items.length > 0) || null;
}

// Header component
const BrunchMenuHeader: React.FC<{ description?: string }> = ({ description }) => (
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
        Breakfast made with ❤️ and huevos 🥚
      </div>
    </div>
    {description && <div className="menu-desc">{description}</div>}
  </>
);

// Footer component
const BrunchMenuFooter: React.FC = () => (
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
      src="/images/qrcodes/brunch-menu.png"
      alt="QR Code for Brunch Menu"
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

const BrunchPrint: React.FC<BrunchPrintProps> = ({ brunchMenus }) => {
  // Helper to render a column of sections
  const renderColumn = (sectionNames: string[]) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
      {sectionNames.map((groupName) => {
        const group = brunchMenus.flatMap((menu) => menu.groups).find((g) => g.name === groupName);
        if (!group) return null;
        return (
          <div className="menu-section" key={group.guid} style={{ breakInside: 'avoid' }}>
            <div className={`section-title ${margarine.className}`}>{group.name}</div>
            {group.description && <div className="section-desc">{group.description}</div>}
            {group.items.map((item) => (
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
          minHeight: `${LEGAL_HEIGHT_SAFE_IN}in`,
          maxHeight: `${LEGAL_HEIGHT_SAFE_IN}in`,
          boxSizing: 'border-box',
          overflow: 'hidden',
          paddingTop: pageIdx > 0 ? '0.5in' : '0',
        }}
      >
        {pageIdx === 0 && <BrunchMenuHeader />}
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
        <BrunchMenuFooter />
      </div>
    );
  });

  return (
    <>
      <Head>
        <title>Brunch Menu (Printable) | Skillet&#39;z Cafe</title>
        <meta name="robots" content="noindex, nofollow" />
        <style>{printMenuStyles}</style>
      </Head>
      <div id="print-area" className={geist.className}>
        {pages}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<BrunchPrintProps> = async () => {
  const menuData = loadMenuData();
  // Get all menus except Dinner
  const brunchMenus = menuData.menus.filter((menu) => menu.name !== 'Dinner');
  if (!brunchMenus.length) {
    return { notFound: true };
  }
  return {
    props: {
      brunchMenus: brunchMenus.map((menu) => ({
        name: menu.name,
        description: menu.description,
        groups: menu.groups,
      })),
    },
  };
};

export default BrunchPrint;
