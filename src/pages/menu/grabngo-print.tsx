import React from 'react';

import { GetStaticProps } from 'next';
import Head from 'next/head';

import { MenuData, MenuGroup, MenuItem } from '@/types/menu';

import { BUSINESS, FULL_ADDRESS } from '@/config/business';
import { geist, margarine } from '@/config/fonts';
import { LETTER_HEIGHT_SAFE_IN, printMenuStyles } from '@/config/printMenu';

import { PrintMenuFooter } from '@/components/menu/PrintMenuFooter';
import { PrintMenuHeader } from '@/components/menu/PrintMenuHeader';

import { loadMenuData } from '@/utils/menu_static';

interface GrabNGoPrintProps {
  grabNGoMenu: {
    name: string;
    description: string;
    groups: MenuGroup[];
  };
}

// Structure: single page with two columns for Grab n Go items
const GRID_ORDER = [
  // Left column
  ['Beverages', 'Energy Drinks'],
  // Right column
  ['Soft Drinks', 'Snacks & Water'],
];

function getGroupByName(groups: MenuGroup[], name: string): MenuGroup | null {
  return groups.find((g) => g.name === name && g.items.length > 0) || null;
}

// Helper function to categorize Grab n Go items
function categorizeGrabNGoItems(items: MenuItem[]) {
  const categories = {
    Beverages: items.filter(
      (item) =>
        item.name.includes('Water') ||
        item.name.includes('Coconut') ||
        item.name.includes('Frappuccino')
    ),
    'Energy Drinks': items.filter(
      (item) =>
        item.name.includes('Rockstar') ||
        item.name.includes('Monster') ||
        item.name.includes('Gatorade')
    ),
    'Soft Drinks': items.filter(
      (item) =>
        item.name.includes('Jarritos') ||
        item.name.includes('Snapple') ||
        item.name.includes('Canada Dry') ||
        item.name.includes('Dr. Pepper') ||
        item.name.includes('Coca Cola') ||
        item.name.includes('Sprite')
    ),
    'Snacks & Water': items.filter(
      (item) => item.name.includes('Bottled Water') || item.name.includes('Chips')
    ),
  };

  return categories;
}

const GrabNGoPrint: React.FC<GrabNGoPrintProps> = ({ grabNGoMenu }) => {
  // Get the Grab n Go group
  const grabNGoGroup = grabNGoMenu.groups.find((g) => g.name === 'Grab n Go');
  const allItems = grabNGoGroup?.items || [];

  // Categorize items
  const categorizedItems = categorizeGrabNGoItems(allItems);

  // Helper to render a column of sections
  const renderColumn = (sectionNames: string[]) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
      {sectionNames.map((categoryName) => {
        const items = categorizedItems[categoryName as keyof typeof categorizedItems];
        if (!items || items.length === 0) return null;

        return (
          <div className="menu-section" key={categoryName} style={{ breakInside: 'avoid' }}>
            <div className={`section-title ${margarine.className}`}>{categoryName}</div>
            {items.map((item) => (
              <div key={item.guid} style={{ marginBottom: '0.1rem' }}>
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

  return (
    <>
      <Head>
        <title>Grab n Go Menu (Printable) | Skillet&#39;z Cafe</title>
        <meta name="robots" content="noindex, nofollow" />
        <style>{printMenuStyles}</style>
      </Head>
      <div id="print-area" className={geist.className}>
        <div
          style={{
            position: 'relative',
            height: `${LETTER_HEIGHT_SAFE_IN}in`,
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}
        >
          <PrintMenuHeader
            tagline="Grab n Go - Convenient & Ready 🚀"
            description="Convenient drinks and snacks for on-the-go"
            logoPath="/images/logos/tearekz_logo.png"
            logoAlt="Tea Rek'z Logo"
            headerMarginBottom="1rem"
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              columnGap: '2.5rem',
              rowGap: '0.3rem',
              width: '100%',
              paddingBottom: '0.5rem',
              marginBottom: '0.5in', // Reserve space for footer
            }}
          >
            {renderColumn(GRID_ORDER[0])}
            {renderColumn(GRID_ORDER[1])}
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'white',
            }}
          >
            <PrintMenuFooter
              qrCodePath="/images/qrcodes/grabngo-menu.png"
              qrCodeAlt="QR Code for Grab n Go Menu"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<GrabNGoPrintProps> = async () => {
  const menuData = loadMenuData();
  const teaRekzMenu = menuData.menus.find((m) => m.name === "Tea Rek'z 🧋🦖");

  if (!teaRekzMenu) {
    return { notFound: true };
  }

  // Extract just the Grab n Go group
  const grabNGoGroup = teaRekzMenu.groups.find((g) => g.name === 'Grab n Go');

  return {
    props: {
      grabNGoMenu: {
        name: 'Grab n Go',
        description: 'Quick drinks and snacks for on-the-go',
        groups: grabNGoGroup ? [grabNGoGroup] : [],
      },
    },
  };
};

export default GrabNGoPrint;
