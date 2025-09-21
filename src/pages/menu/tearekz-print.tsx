import React from 'react';

import { GetStaticProps } from 'next';
import Head from 'next/head';

import { MenuData, MenuGroup, MenuItem } from '@/types/menu';

import { BUSINESS, FULL_ADDRESS } from '@/config/business';
import { geist, margarine } from '@/config/fonts';
import { LANDSCAPE_HEIGHT_SAFE_IN, printMenuLandscapeStyles } from '@/config/printMenu';

import { PrintMenuHeader } from '@/components/menu/PrintMenuHeader';

import { loadMenuData, loadMenuOptionGroupsData } from '@/utils/menu_static';

interface TeaRekzPrintProps {
  teaRekzMenu: {
    name: string;
    description: string;
    groups: MenuGroup[];
  };
  dinoBitesMenu: {
    name: string;
    description: string;
    groups: MenuGroup[];
  };
  optionGroups: any;
}

// Structure: landscape layout with three columns for Tea Rek'z items
const TEA_REKZ_GRID_ORDER = [
  // Left column
  ["Tea-Rek'z Favorites ❤️", 'Freshly Brewed Teas 🌱'],
  // Middle column
  [
    'Classic Milk Teas 🧋',
    'Crème Brûlée 🍮',
    'Dino Refreshers (Caffeine-Free 🌙)',
    'Matcha Creations 🍵',
    'Milk Options 🥛',
    'Creamer Options ☕',
  ],
  // Right column
  ['Tea Selections 🌱', 'Flavors 🍓', 'Toppings 🌈', 'Ice Levels 🧊', 'Sweetness Levels 🍯'],
];

// Structure: landscape layout with three columns for Dino Bites items
const DINO_BITES_GRID_ORDER = [
  // Left column
  ['Sweet Bites'],
  // Middle column
  ['Savory Bites'],
  // Right column
  [],
];

function getGroupByName(groups: MenuGroup[], name: string): MenuGroup | null {
  return groups.find((g) => g.name === name && g.items.length > 0) || null;
}

// Helper function to create Tea Selections from Freshly Brewed Teas group
function createTeaSelections(groups: MenuGroup[]) {
  const freshlyBrewedGroup = getGroupByName(groups, 'Freshly Brewed Teas 🌱');
  if (!freshlyBrewedGroup || freshlyBrewedGroup.items.length === 0) return [];

  return freshlyBrewedGroup.items.map((item) => ({
    name: item.name,
    price: item.price,
    description: item.description,
  }));
}

// Helper function to move emojis from end to front of a name
function moveEmojisToFront(name: string): string {
  // Try multiple approaches to catch all emoji types
  // First try the comprehensive Unicode ranges
  let emojiMatch = name.match(
    /(.*?)([\u{1F000}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F1E6}-\u{1F1FF}])+$/u
  );

  // If that doesn't work, try a broader approach that catches any character outside basic ASCII
  if (!emojiMatch) {
    emojiMatch = name.match(/(.*?)([^\x00-\x7F]+)$/u);
  }

  if (emojiMatch) {
    const textPart = emojiMatch[1].trim();
    const emojiPart = emojiMatch[2];
    return `${emojiPart} ${textPart}`;
  }

  return name;
}

// Helper function to get toppings from menu option groups
function getToppingsFromOptionGroups(optionGroupsData: any) {
  const optionGroups = optionGroupsData.optionGroups || [];
  const toppingsGroup = optionGroups.find(
    (group: any) => group.name === "Add Toppings (Tea-Rek'z)"
  );

  if (!toppingsGroup || !toppingsGroup.items) {
    return [];
  }

  return toppingsGroup.items.map((item: any) => moveEmojisToFront(item.name));
}

// Helper function to get ice level options from menu option groups
function getIceLevelsFromOptionGroups(optionGroupsData: any) {
  const optionGroups = optionGroupsData.optionGroups || [];
  const iceLevelGroup = optionGroups.find((group: any) => group.name === "Ice Level (Tea-Rek'z)");

  if (!iceLevelGroup || !iceLevelGroup.items) {
    return [];
  }

  return iceLevelGroup.items
    .map((item: any) => item.name.replace(' ice', ''))
    .sort((a: string, b: string) => {
      const aNum = parseInt(a.replace(/\D/g, '')) || 0;
      const bNum = parseInt(b.replace(/\D/g, '')) || 0;
      return bNum - aNum;
    });
}

// Helper function to get sweetness level options from menu option groups
function getSweetnessLevelsFromOptionGroups(optionGroupsData: any) {
  const optionGroups = optionGroupsData.optionGroups || [];
  const sweetnessGroup = optionGroups.find(
    (group: any) => group.name === 'Sweetness Level (Cane Sugar)'
  );

  if (!sweetnessGroup || !sweetnessGroup.items) {
    return [];
  }

  return sweetnessGroup.items
    .map((item: any) => item.name.replace(' sweet', ''))
    .sort((a: string, b: string) => {
      const aNum = parseInt(a.replace(/\D/g, '')) || 0;
      const bNum = parseInt(b.replace(/\D/g, '')) || 0;
      return bNum - aNum;
    });
}

// Helper function to get flavor options from menu option groups
function getFlavorsFromOptionGroups(optionGroupsData: any) {
  const optionGroups = optionGroupsData.optionGroups || [];
  const flavorsGroup = optionGroups.find(
    (group: any) => group.name === "Choose a Flavor (Tea-Rek'z)"
  );

  if (!flavorsGroup || !flavorsGroup.items) {
    return [];
  }

  return flavorsGroup.items.map((item: any) => moveEmojisToFront(item.name));
}

// Helper function to get milk options from menu option groups
function getMilkOptionsFromOptionGroups(optionGroupsData: any) {
  const optionGroups = optionGroupsData.optionGroups || [];
  const milkGroup = optionGroups.find((group: any) => group.name === "Milk Option (Tea-Rek'z)");

  if (!milkGroup || !milkGroup.items) {
    return [];
  }

  return milkGroup.items.map((item: any) => moveEmojisToFront(item.name));
}

// Helper function to get creamer options from menu option groups
function getCreamerOptionsFromOptionGroups(optionGroupsData: any) {
  const optionGroups = optionGroupsData.optionGroups || [];
  const creamerGroup = optionGroups.find(
    (group: any) => group.name === "Creamer Option (Tea-Rek'z)"
  );

  if (!creamerGroup || !creamerGroup.items) {
    return [];
  }

  return creamerGroup.items.map((item: any) => moveEmojisToFront(item.name));
}
const TeaRekzPrint: React.FC<TeaRekzPrintProps> = ({
  teaRekzMenu,
  dinoBitesMenu,
  optionGroups,
}) => {
  // Get tea selections
  const teaSelections = createTeaSelections(teaRekzMenu.groups);

  // Get toppings
  const toppings = getToppingsFromOptionGroups(optionGroups);

  // Get ice levels
  const iceLevels = getIceLevelsFromOptionGroups(optionGroups);

  // Get sweetness levels
  const sweetnessLevels = getSweetnessLevelsFromOptionGroups(optionGroups);

  // Get flavors
  const flavors = getFlavorsFromOptionGroups(optionGroups);

  // Get milk options
  const milkOptions = getMilkOptionsFromOptionGroups(optionGroups);

  // Get creamer options
  const creamerOptions = getCreamerOptionsFromOptionGroups(optionGroups);

  // Helper to render a column of sections
  const renderColumn = (sectionNames: string[], menuGroups: MenuGroup[]) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
      {sectionNames.map((groupName) => {
        // Handle special sections
        if (groupName === 'Tea Selections 🌱') {
          return (
            <div className="menu-section" key="tea-selections" style={{ breakInside: 'avoid' }}>
              <div className={`section-title ${margarine.className}`}>
                {moveEmojisToFront(groupName)}
              </div>
              {teaSelections.map((selection, index) => (
                <div key={index} style={{ marginBottom: '0.15rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 500, marginBottom: '0.05rem' }}>
                    {selection.name}
                  </div>
                  {selection.description && (
                    <div style={{ fontSize: '0.7rem', color: '#888', marginLeft: '0.5rem' }}>
                      {selection.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          );
        }

        if (groupName === 'Flavors 🍓') {
          return (
            <div className="menu-section" key="flavors" style={{ breakInside: 'avoid' }}>
              <div className={`section-title ${margarine.className}`}>
                {moveEmojisToFront(groupName)}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#666' }}>{flavors.join(' · ')}</div>
            </div>
          );
        }

        if (groupName === 'Creamer Options ☕') {
          return (
            <div className="menu-section" key="creamer-options" style={{ breakInside: 'avoid' }}>
              <div className={`section-title ${margarine.className}`}>
                {moveEmojisToFront(groupName)}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#666' }}>{creamerOptions.join(' · ')}</div>
            </div>
          );
        }

        if (groupName === 'Milk Options 🥛') {
          return (
            <div className="menu-section" key="milk-options" style={{ breakInside: 'avoid' }}>
              <div className={`section-title ${margarine.className}`}>
                {moveEmojisToFront(groupName)}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#666' }}>{milkOptions.join(' · ')}</div>
            </div>
          );
        }

        if (groupName === 'Toppings 🌈') {
          return (
            <div className="menu-section" key="toppings" style={{ breakInside: 'avoid' }}>
              <div className={`section-title ${margarine.className}`}>
                {moveEmojisToFront(groupName)}
              </div>
              <div
                className="section-desc"
                style={{ fontSize: '0.7rem', color: '#666', marginBottom: '0.3rem' }}
              >
                Each topping $0.75; Pudding $1
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.3rem' }}>
                {toppings.map((topping: string, index: number) => (
                  <div key={index} style={{ fontSize: '0.7rem', color: '#666' }}>
                    {topping}
                  </div>
                ))}
              </div>
            </div>
          );
        }

        if (groupName === 'Ice Levels 🧊') {
          return (
            <div className="menu-section" key="ice-levels" style={{ breakInside: 'avoid' }}>
              <div className={`section-title ${margarine.className}`}>
                {moveEmojisToFront(groupName)}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#666' }}>{iceLevels.join(' · ')}</div>
            </div>
          );
        }

        if (groupName === 'Sweetness Levels 🍯') {
          return (
            <div className="menu-section" key="sweetness-levels" style={{ breakInside: 'avoid' }}>
              <div className={`section-title ${margarine.className}`}>
                {moveEmojisToFront(groupName)}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#666' }}>{sweetnessLevels.join(' · ')}</div>
            </div>
          );
        }

        // Handle regular menu groups
        let group = getGroupByName(menuGroups, groupName);

        // Special case: Create faux items for Freshly Brewed Teas group
        if (groupName === 'Freshly Brewed Teas 🌱') {
          const freshlyBrewedGroup = getGroupByName(menuGroups, 'Freshly Brewed Teas 🌱');
          const milkTeaGroup = getGroupByName(menuGroups, 'Freshly Brewed Milk Teas 🧋');
          const dinoGroup = getGroupByName(menuGroups, 'Dino Smash Fresh Lemon Teas 🍋');

          group = {
            name: 'Fresh Brewed Teas 🌱',
            description: freshlyBrewedGroup!.description.replace(
              / — enjoy them straight or with fruity twists.*/,
              ' — enjoy them straight or with fruity twists.'
            ),
            guid: 'fresh-brewed-options',
            items: [
              {
                guid: 'fresh-brewed-plain',
                name: 'Fresh Brewed Tea',
                price: freshlyBrewedGroup!.items[0].price,
                description:
                  'Freshly brewed teaspresso with a wide selection of teas, and option of adding fruity twists.',
                imageUrl: null,
              },
              {
                guid: 'fresh-brewed-milk',
                name: 'Fresh Brewed Milk Tea',
                price: milkTeaGroup!.items[0].price,
                description: milkTeaGroup!.items[0].description.replace(', floral,', ''),
                imageUrl: null,
              },
              {
                guid: 'fresh-brewed-dino',
                name: 'Dino Smash Fresh Lemon Teas 🍋',
                price: dinoGroup!.items[0].price,
                description: dinoGroup!.items[0].description
                  .replace('jasmine green', '')
                  .replace(', floral,', ''),
                imageUrl: null,
              },
            ],
          };
        }

        if (!group) return null;

        return (
          <div className="menu-section" key={group.guid} style={{ breakInside: 'avoid' }}>
            <div className={`section-title ${margarine.className}`}>
              {moveEmojisToFront(group.name)}
            </div>
            {group.description && <div className="section-desc">{group.description}</div>}
            {group.items.map((item) => (
              <div key={item.guid} style={{ marginBottom: '0.1rem' }}>
                <div className="item-row">
                  <span className="item-name">{item.name}</span>
                  <span className="item-price" style={{ fontWeight: 700 }}>
                    {Number.isInteger(item.price)
                      ? item.price
                      : item.price.toFixed(2).replace(/\.00$/, '')}
                  </span>
                </div>
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
        <title>Tea Rek&apos;z Menu (Printable) | Skillet&#39;z Cafe</title>
        <meta name="robots" content="noindex, nofollow" />
        <style>{printMenuLandscapeStyles}</style>
      </Head>
      <div className={geist.className}>
        {/* First Page - Tea Rek'z */}
        <div
          id="print-area"
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: `${LANDSCAPE_HEIGHT_SAFE_IN}in`,
            boxSizing: 'border-box',
            paddingTop: '0',
            position: 'relative',
          }}
        >
          <div
            style={{
              flex: '1 1 auto',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              columnGap: '1rem',
              rowGap: '0.6rem',
              width: '100%',
              overflow: 'hidden',
            }}
          >
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', height: '100%' }}
            >
              {/* Logo in first column */}
              <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                <img
                  src="/images/logos/tearekz_logo.png"
                  alt="Tea Rek'z Logo"
                  style={{
                    maxWidth: '90px',
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    margin: '0 auto',
                  }}
                />
              </div>

              {/* Menu sections */}
              <div style={{ flex: '0.3', marginBottom: '0.5rem' }}>
                {renderColumn(TEA_REKZ_GRID_ORDER[0], teaRekzMenu.groups)}
              </div>

              {/* Order Online Section - Bottom */}
              <div style={{ textAlign: 'center' }}>
                <img
                  src="/images/qrcodes/order-online-toast.png"
                  alt="Order Online QR Code"
                  style={{
                    maxWidth: '80px',
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    margin: '0 auto 0.5rem auto',
                  }}
                />
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#333' }}>
                  Order and Pay Online
                </div>
              </div>
            </div>
            {renderColumn(TEA_REKZ_GRID_ORDER[1], teaRekzMenu.groups)}
            {renderColumn(TEA_REKZ_GRID_ORDER[2], teaRekzMenu.groups)}
          </div>
        </div>

        {/* Second Page - Dino Bites */}
        <div
          id="print-area"
          className="page-break"
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: `${LANDSCAPE_HEIGHT_SAFE_IN}in`,
            boxSizing: 'border-box',
            paddingTop: '0',
            position: 'relative',
          }}
        >
          <div
            style={{
              flex: '1 1 auto',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              columnGap: '1rem',
              rowGap: '0.6rem',
              width: '100%',
              overflow: 'hidden',
            }}
          >
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', height: '100%' }}
            >
              {/* Logo in first column */}
              <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                <img
                  src="/images/logos/tearekz_logo.png"
                  alt="Tea Rek'z Logo"
                  style={{
                    maxWidth: '90px',
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    margin: '0 auto',
                  }}
                />
              </div>

              {/* Dino Bites sections */}
              <div style={{ flex: '1' }}>
                {renderColumn(DINO_BITES_GRID_ORDER[0], dinoBitesMenu.groups)}
              </div>
            </div>
            {renderColumn(DINO_BITES_GRID_ORDER[1], dinoBitesMenu.groups)}
            {renderColumn(DINO_BITES_GRID_ORDER[2], dinoBitesMenu.groups)}
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<TeaRekzPrintProps> = async () => {
  const menuData = loadMenuData();
  const optionGroups = loadMenuOptionGroupsData();
  const teaRekzMenu = menuData.menus.find((m) => m.name === "Tea-Rek'z 🧋🦖");
  const dinoBitesMenu = menuData.menus.find((m) => m.name === 'Dino Bites Th-Sun (11a-9pm)');

  if (!teaRekzMenu || !dinoBitesMenu) {
    return { notFound: true };
  }

  return {
    props: {
      teaRekzMenu: {
        name: 'Tea-Rek&apos;z',
        description: 'Premium boba tea and fresh tea selections',
        groups: teaRekzMenu.groups,
      },
      dinoBitesMenu: {
        name: 'Dino Bites',
        description: 'Sweet and savory bites',
        groups: dinoBitesMenu.groups,
      },
      optionGroups,
    },
  };
};

export default TeaRekzPrint;
