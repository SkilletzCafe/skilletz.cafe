import React from 'react';

import { GetStaticProps } from 'next';
import Head from 'next/head';

import { MenuData, MenuGroup, MenuItem } from '@/types/menu';

import { BUSINESS, FULL_ADDRESS } from '@/config/business';
import { CSS_COLOR_VARS } from '@/config/colors';
import { geist, margarine } from '@/config/fonts';
import { LANDSCAPE_HEIGHT_SAFE_IN, printMenuLandscapeStyles } from '@/config/printMenu';

import { PrintMenuHeader } from '@/components/menu/PrintMenuHeader';

import { loadMenuData, loadMenuOptionGroupsData } from '@/utils/menu_static';

import styles from '@/styles/TeaRekzPrint.module.css';

const TeaSelectionsSection: React.FC<{ teaRekzMenu: { groups: MenuGroup[] } }> = ({
  teaRekzMenu,
}) => {
  const teaSelections = createTeaSelections(teaRekzMenu.groups);

  return (
    <div className={`${styles.menuSection} menu-section`}>
      <div className={`${styles.sectionTitle} section-title ${margarine.className}`}>
        {moveEmojisToFront('Tea Selections 🌱')}
      </div>
      {teaSelections.map((tea, index) => (
        <div key={index} className={styles.teaSelectionItem}>
          <div className={styles.teaSelectionName}>{tea.name}</div>
          {tea.description && <div className={styles.teaSelectionDesc}>{tea.description}</div>}
        </div>
      ))}
    </div>
  );
};

const FlavorsSection: React.FC<{ optionGroups: any }> = ({ optionGroups }) => {
  const flavors = getFlavorsFromOptionGroups(optionGroups);

  return (
    <div className={`${styles.menuSection} menu-section`}>
      <div className={`${styles.sectionTitle} section-title ${margarine.className}`}>
        {moveEmojisToFront('Flavors 🍓')}
      </div>
      <div className={styles.flavorsList}>{flavors.join(' · ')}</div>
    </div>
  );
};

const ToppingsSection: React.FC<{ optionGroups: any }> = ({ optionGroups }) => {
  const toppings = getToppingsFromOptionGroups(optionGroups);

  return (
    <div className={`${styles.menuSection} menu-section`}>
      <div className={`${styles.sectionTitle} section-title ${margarine.className}`}>
        {moveEmojisToFront('Toppings 🌈')}
      </div>
      <div className={`${styles.sectionDesc} section-desc ${styles.toppingsDesc}`}>
        Each topping $0.75; Pudding $1
      </div>
      <div className={styles.toppingsGrid}>
        {toppings.map((topping: string, index: number) => (
          <div key={index} className={styles.toppingItem}>
            {topping}
          </div>
        ))}
      </div>
    </div>
  );
};

const IceLevelsSection: React.FC<{ optionGroups: any }> = ({ optionGroups }) => {
  const iceLevels = getIceLevelsFromOptionGroups(optionGroups);

  return (
    <div className={`${styles.menuSection} menu-section`}>
      <div className={`${styles.sectionTitle} section-title ${margarine.className}`}>
        {moveEmojisToFront('Ice Levels 🧊')}
      </div>
      <div className={styles.levelsList}>{iceLevels.join(' · ')}</div>
    </div>
  );
};

const SweetnessLevelsSection: React.FC<{ optionGroups: any }> = ({ optionGroups }) => {
  const sweetnessLevels = getSweetnessLevelsFromOptionGroups(optionGroups);

  return (
    <div className={`${styles.menuSection} menu-section`}>
      <div className={`${styles.sectionTitle} section-title ${margarine.className}`}>
        {moveEmojisToFront('Sweetness Levels 🍯')}
      </div>
      <div className={styles.levelsList}>{sweetnessLevels.join(' · ')}</div>
    </div>
  );
};

const MilkOptionsSection: React.FC<{ optionGroups: any }> = ({ optionGroups }) => {
  const milkOptions = getMilkOptionsFromOptionGroups(optionGroups);

  return (
    <div className={`${styles.menuSection} menu-section`}>
      <div className={`${styles.sectionTitle} section-title ${margarine.className}`}>
        {moveEmojisToFront('Milk Options 🥛')}
      </div>
      {milkOptions.map((option: { name: string; price: number }, index: number) => (
        <div key={index} className={styles.optionItem}>
          <div className={`${styles.optionRow} item-row`}>
            <span className={`${styles.optionName} item-name`}>{option.name}</span>
            <span className={`${styles.optionPrice} item-price`}>
              {option.price > 0 ? `+${option.price.toFixed(2)}` : 'Included'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

const CreamerOptionsSection: React.FC<{ optionGroups: any }> = ({ optionGroups }) => {
  const creamerOptions = getCreamerOptionsFromOptionGroups(optionGroups);

  return (
    <div className={`${styles.menuSection} menu-section`}>
      <div className={`${styles.sectionTitle} section-title ${margarine.className}`}>
        {moveEmojisToFront('Creamer Options ☕')}
      </div>
      {creamerOptions.map((option: { name: string; price: number }, index: number) => (
        <div key={index} className={styles.optionItem}>
          <div className={`${styles.optionRow} item-row`}>
            <span className={`${styles.optionName} item-name`}>{option.name}</span>
            <span className={`${styles.optionPrice} item-price`}>
              {option.price > 0 ? `+${option.price.toFixed(2)}` : 'Included'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

// Mapping of special section group names for easy lookup
const SPECIAL_SECTIONS = new Set([
  'Tea Selections 🌱',
  'Flavors 🍓',
  'Toppings 🌈',
  'Ice Levels 🧊',
  'Sweetness Levels 🍯',
  'Milk Options 🥛',
  'Creamer Options ☕',
]);

interface TeaRekzPrintProps {
  teaRekzMenu: {
    name: string;
    description: string;
    groups: MenuGroup[];
  };
  optionGroups: any;
}

// Structure: landscape layout with three columns for Tea Rek'z items
const GRID_ORDER = [
  // Left column
  ["Tea-Rek'z Favorites ❤️", 'Freshly Brewed Teas 🌱', 'Flavors 🍓'],
  // Middle column
  [
    'Classic Milk Teas 🧋',
    'Crème Brûlée 🍮',
    'Dino Refreshers 🦖 (Caffeine-Free 🌙)',
    'Matcha Creations 🍵',
    'Milk Options 🥛',
    'Creamer Options ☕',
  ],
  // Right column
  ['Tea Selections 🌱', 'Toppings 🌈', 'Ice Levels 🧊', 'Sweetness Levels 🍯'],
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
  // First, split off any parenthetical phrases (including nested parentheses)
  const parentheticalMatch = name.match(/^(.+?)\s*(\([^)]*(?:\([^)]*\)[^)]*)*\))\s*$/);

  let mainText = name;
  let parenthetical = '';

  if (parentheticalMatch) {
    mainText = parentheticalMatch[1].trim();
    parenthetical = parentheticalMatch[2].trim();
  }

  // Try multiple approaches to catch all emoji types
  // First try the comprehensive Unicode ranges
  let emojiMatch = mainText.match(
    /(.*?)([\u{1F000}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F1E6}-\u{1F1FF}])+$/u
  );

  // If that doesn't work, try a broader approach that catches any character outside basic ASCII
  if (!emojiMatch) {
    emojiMatch = mainText.match(/(.*?)([^\x00-\x7F]+)$/u);
  }

  const rearranged = emojiMatch ? `${emojiMatch[2]} ${emojiMatch[1].trim()}` : mainText;
  const parentheticalSeparator = parenthetical ? ' ' : '';
  const result = `${rearranged}${parentheticalSeparator}${parenthetical}`;

  return result;
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

  return milkGroup.items.map((item: any) => ({
    name: item.name,
    price: item.price,
  }));
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

  return creamerGroup.items.map((item: any) => ({
    name: item.name,
    price: item.price,
  }));
}

const TeaRekzPrint: React.FC<TeaRekzPrintProps> = ({ teaRekzMenu, optionGroups }) => {
  // Helper to render a column of sections
  const renderColumn = (sectionNames: string[]) => (
    <div className={styles.column}>
      {sectionNames.map((groupName) => {
        // Handle special sections using the mapping
        if (SPECIAL_SECTIONS.has(groupName)) {
          const key = groupName
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]/g, '');

          // Render the appropriate component with proper props
          switch (groupName) {
            case 'Tea Selections 🌱':
              return <TeaSelectionsSection key={key} teaRekzMenu={teaRekzMenu} />;
            case 'Flavors 🍓':
              return <FlavorsSection key={key} optionGroups={optionGroups} />;
            case 'Toppings 🌈':
              return <ToppingsSection key={key} optionGroups={optionGroups} />;
            case 'Ice Levels 🧊':
              return <IceLevelsSection key={key} optionGroups={optionGroups} />;
            case 'Sweetness Levels 🍯':
              return <SweetnessLevelsSection key={key} optionGroups={optionGroups} />;
            case 'Milk Options 🥛':
              return <MilkOptionsSection key={key} optionGroups={optionGroups} />;
            case 'Creamer Options ☕':
              return <CreamerOptionsSection key={key} optionGroups={optionGroups} />;
            default:
              return null;
          }
        }

        // Handle regular menu groups
        let group = getGroupByName(teaRekzMenu.groups, groupName);

        // Special case: Create faux items for Freshly Brewed Teas group
        if (groupName === 'Freshly Brewed Teas 🌱') {
          const freshlyBrewedGroup = getGroupByName(teaRekzMenu.groups, 'Freshly Brewed Teas 🌱');
          const milkTeaGroup = getGroupByName(teaRekzMenu.groups, 'Freshly Brewed Milk Teas 🧋');
          const dinoGroup = getGroupByName(teaRekzMenu.groups, 'Dino Smash Fresh Lemon Teas 🦖🍋');

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
          <div className={`${styles.menuSection} menu-section`} key={group.guid}>
            <div className={`${styles.sectionTitle} section-title ${margarine.className}`}>
              {moveEmojisToFront(group.name)}
            </div>
            {group.description && (
              <div className={`${styles.sectionDesc} section-desc`}>{group.description}</div>
            )}
            {group.items.map((item) => {
              // Special case: Remove 🌙 from item names in Dino Refreshers group
              const itemDisplayName = group.name.includes('Dino Refreshers')
                ? item.name.replace(/🌙\s*$/, '')
                : item.name;

              return (
                <div key={item.guid} className={styles.menuItem}>
                  <div className={`${styles.itemRow} item-row`}>
                    <span className={`${styles.itemName} item-name`}>{itemDisplayName}</span>
                    <span className={`${styles.itemPrice} item-price`}>
                      {Number.isInteger(item.price)
                        ? item.price
                        : item.price.toFixed(2).replace(/\.00$/, '')}
                    </span>
                  </div>
                </div>
              );
            })}
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
      <div
        id="print-area"
        className={`${styles.printArea} ${geist.className}`}
        style={
          {
            '--landscape-height-safe': `${LANDSCAPE_HEIGHT_SAFE_IN}in`,
            ...CSS_COLOR_VARS,
          } as React.CSSProperties
        }
      >
        <div className={styles.printContainer}>
          <div className={styles.printGrid}>
            <div className={styles.column}>
              {/* Logo in first column */}
              <div className={styles.logoSection}>
                <img
                  src="/images/logos/tearekz_logo.png"
                  alt="Tea Rek'z Logo"
                  className={styles.logo}
                />
              </div>

              {/* Menu sections */}
              {renderColumn(GRID_ORDER[0])}

              {/* Order Online Section - After flavors */}
              <div className={styles.orderOnlineSection}>
                <img
                  src="/images/qrcodes/order-online-tearekz.png"
                  alt="Order Online QR Code"
                  className={styles.orderOnlineQR}
                />
                <div className={styles.orderOnlineText}>Order and Pay Online</div>
              </div>
            </div>
            {renderColumn(GRID_ORDER[1])}
            {renderColumn(GRID_ORDER[2])}
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

  if (!teaRekzMenu) {
    return { notFound: true };
  }

  return {
    props: {
      teaRekzMenu: {
        name: 'Tea-Rek&apos;z',
        description: 'Premium boba tea and fresh tea selections',
        groups: teaRekzMenu.groups,
      },
      optionGroups,
    },
  };
};

export default TeaRekzPrint;
