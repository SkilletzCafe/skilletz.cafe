import React from 'react';

import { GetStaticProps } from 'next';
import Head from 'next/head';

import { MenuData, MenuGroup, MenuItem } from '@/types/menu';

import { BUSINESS, FULL_ADDRESS } from '@/config/business';
import { geist, margarine } from '@/config/fonts';
import { LEGAL_HEIGHT_SAFE_IN, printMenuStyles } from '@/config/printMenu';

import { PrintMenuFooter } from '@/components/menu/PrintMenuFooter';
import { PrintMenuHeader } from '@/components/menu/PrintMenuHeader';

import { loadMenuData } from '@/utils/menu_static';

import styles from '@/styles/Menu.module.css';

interface BrunchPrintProps {
  brunchMenu: {
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

// New structure: each page is an array of [leftCol, rightCol]
const GRID_ORDER = [
  // Page 1
  [
    ['Specials 🌟', 'Traditional Omelettes 🍳', 'Specialty Omelettes 🥘', 'Scrambles 🥚'], // Left column
    ['Specialty Dishes 🍽️', 'Meat & Eggs 🥩🍳', 'Burritos 🌯'], // Right column
  ],
  // Page 2
  [
    ['Sandwiches 🥪', 'Burgers 🍔', 'Pancakes, Waffles & More 🥞'], // Left column
    ['Kids Menu 👶', 'Salads 🥗', 'Sides 🍟', 'Drinks 🥤'], // Right column
  ],
];

function getGroupByName(groups: MenuGroup[], name: string): MenuGroup | null {
  return groups.find((g) => g.name === name && g.items.length > 0) || null;
}

const BrunchPrint: React.FC<BrunchPrintProps> = ({ brunchMenu }) => {
  // Helper to render a column of sections
  const renderColumn = (sectionNames: string[]) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
      {sectionNames.map((groupName) => {
        const group = getGroupByName(brunchMenu.groups, groupName);
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
        {pageIdx === 0 && (
          <PrintMenuHeader tagline="Breakfast made with ❤️ and huevos 🥚" fontSize="2rem" />
        )}
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
        <PrintMenuFooter
          qrCodePath="/images/qrcodes/brunch-menu.png"
          qrCodeAlt="QR Code for Brunch Menu"
        />
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
  // Get only the "Brunch Thu-Sun" menu
  const brunchMenu = menuData.menus.find((menu) => menu.name === 'Brunch Thu-Sun');

  if (!brunchMenu) {
    return { notFound: true };
  }

  return {
    props: {
      brunchMenu: {
        name: 'Brunch',
        description: 'Breakfast and brunch favorites',
        groups: brunchMenu.groups,
      },
    },
  };
};

export default BrunchPrint;
