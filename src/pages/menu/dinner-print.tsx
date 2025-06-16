import React from 'react';

import { GetStaticProps } from 'next';
import Head from 'next/head';

import { MenuData, MenuGroup, MenuItem } from '@/types/menu';

import { BUSINESS, FULL_ADDRESS } from '@/config/business';
import { geist, margarine } from '@/config/fonts';
import { LETTER_HEIGHT_SAFE_IN, printMenuStyles } from '@/config/printMenu';

import PrintMenuFooter from '@/components/PrintMenuFooter';
import PrintMenuHeader from '@/components/PrintMenuHeader';

import { loadMenuData } from '@/utils/menu_static';

interface DinnerPrintProps {
  dinnerMenu: {
    name: string;
    description: string;
    groups: MenuGroup[];
  };
}

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
          minHeight: `${LETTER_HEIGHT_SAFE_IN}in`,
          maxHeight: `${LETTER_HEIGHT_SAFE_IN}in`,
          boxSizing: 'border-box',
          overflow: 'hidden',
          paddingTop: pageIdx > 0 ? '0.5in' : '0',
        }}
      >
        {pageIdx === 0 && (
          <PrintMenuHeader
            tagline="Dinner made with ❤️ and fuego 🔥"
            description={dinnerMenu.description}
          />
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
          qrCodePath="/images/qrcodes/dinner-menu.png"
          qrCodeAlt="QR Code for Dinner Menu"
        />
      </div>
    );
  });

  return (
    <>
      <Head>
        <title>Dinner Menu (Printable) | Skillet&#39;z Cafe</title>
        <meta name="robots" content="noindex, nofollow" />
        <style>{printMenuStyles}</style>
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
