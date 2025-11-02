import fs from 'fs';
import path from 'path';

interface ToastMenuItem {
  name: string;
  guid: string;
  description: string;
  price: number;
  imageLink: string | null;
  orderableOnline: string;
  visibility: string;
  optionGroups?: ToastMenuOptionGroup[];
}

interface ToastMenuOptionGroup {
  entityType: string;
  name: string;
  guid: string;
  minSelections: number;
  maxSelections: number | null;
  pricingMode: string;
  items: ToastMenuItem[];
}

interface ToastMenuGroup {
  name: string;
  guid: string;
  description: string;
  items: ToastMenuItem[];
}

interface ToastMenu {
  name: string;
  guid: string;
  description: string | null;
  groups: ToastMenuGroup[];
}

interface ToastData {
  menus: ToastMenu[];
  premodifierGroups: unknown[];
}

interface ProcessedMenuItem {
  name: string;
  guid: string;
  description: string;
  price: number;
  imageUrl: string | null;
}

interface ProcessedMenuGroup {
  name: string;
  guid: string;
  description: string;
  items: ProcessedMenuItem[];
}

interface ProcessedMenu {
  name: string;
  guid: string;
  description: string;
  groups: ProcessedMenuGroup[];
}

interface ProcessedData {
  menus: ProcessedMenu[];
}

interface ProcessedMenuOptionGroup {
  name: string;
  guid: string;
  minSelections: number;
  maxSelections: number | null;
  pricingMode: string;
  items: {
    name: string;
    guid: string;
    description: string;
    price: number;
    orderableOnline: string;
    visibility: string;
  }[];
}

interface ProcessedOptionGroupsData {
  optionGroups: ProcessedMenuOptionGroup[];
}

/**
 * Process the raw Toast menu export into an optimized format for the website
 */

// Helper function to convert HTTP URLs to HTTPS
function ensureHttps(url: string | null): string | null {
  if (!url) return null;
  return url.replace(/^http:\/\//i, 'https://');
}

// Helper function to recursively extract option groups from menu items
function extractOptionGroups(
  items: ToastMenuItem[],
  optionGroupsMap: Map<string, ProcessedMenuOptionGroup>
) {
  items.forEach((item) => {
    if (item.optionGroups) {
      item.optionGroups.forEach((optionGroup) => {
        if (optionGroup.entityType === 'MenuOptionGroup') {
          // Only add if we haven't seen this GUID before
          if (!optionGroupsMap.has(optionGroup.guid)) {
            optionGroupsMap.set(optionGroup.guid, {
              name: optionGroup.name,
              guid: optionGroup.guid,
              minSelections: optionGroup.minSelections,
              maxSelections: optionGroup.maxSelections,
              pricingMode: optionGroup.pricingMode,
              items: optionGroup.items.map((item) => ({
                name: item.name,
                guid: item.guid,
                description: item.description,
                price: item.price,
                orderableOnline: item.orderableOnline,
                visibility: item.visibility,
              })),
            });
          }
        }
      });
    }
  });
}

async function processMenu() {
  const rawDataPath = path.join(process.cwd(), 'src/data/menu/raw/toast-menu.json');
  const outputPath = path.join(process.cwd(), 'src/data/menu/processed/menu.json');
  const optionGroupsOutputPath = path.join(
    process.cwd(),
    'src/data/menu/processed/menu_option_groups.json'
  );

  try {
    // Read raw data
    const rawData: ToastData = JSON.parse(await fs.promises.readFile(rawDataPath, 'utf8'));

    // Extract unique MenuOptionGroup entities
    const optionGroupsMap = new Map<string, ProcessedMenuOptionGroup>();

    // Extract option groups from all menus
    rawData.menus.forEach((menu) => {
      menu.groups.forEach((group) => {
        extractOptionGroups(group.items, optionGroupsMap);
      });
    });

    // Convert map to array
    const processedOptionGroups: ProcessedOptionGroupsData = {
      optionGroups: Array.from(optionGroupsMap.values()),
    };

    // Process the main menu data
    const processedData: ProcessedData = {
      menus: rawData.menus.map((menu) => ({
        name: menu.name,
        guid: menu.guid,
        description: menu.description || '',
        groups: menu.groups.map((group) => ({
          name: group.name,
          guid: group.guid,
          description: group.description,
          items: group.items
            .filter(
              (item) =>
                item.orderableOnline === 'YES' && item.visibility === 'ALL' && item.name !== null
            )
            .map((item) => ({
              name: item.name,
              guid: item.guid,
              description: item.description,
              price: item.price,
              imageUrl: ensureHttps(item.imageLink), // Convert HTTP to HTTPS
            })),
        })),
      })),
    };

    // Create a summary of the menu structure
    const menuSummary = processedData.menus.map((menu) => ({
      name: menu.name,
      groups: menu.groups.map((group) => ({
        name: group.name,
        itemCount: group.items.length,
      })),
    }));

    console.log('Menu structure:');
    console.log(JSON.stringify(menuSummary, null, 2));

    // Create a summary of the option groups
    const optionGroupsSummary = processedOptionGroups.optionGroups.map((group) => ({
      name: group.name,
      guid: group.guid,
      itemCount: group.items.length,
      pricingMode: group.pricingMode,
    }));

    console.log('\nOption Groups structure:');
    console.log(JSON.stringify(optionGroupsSummary, null, 2));

    // Ensure output directories exist
    await fs.promises.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.promises.mkdir(path.dirname(optionGroupsOutputPath), { recursive: true });

    // Write processed menu data
    await fs.promises.writeFile(outputPath, JSON.stringify(processedData, null, 2) + '\n', 'utf8');

    // Write processed option groups data
    await fs.promises.writeFile(
      optionGroupsOutputPath,
      JSON.stringify(processedOptionGroups, null, 2) + '\n',
      'utf8'
    );

    console.log('\nMenu processing completed successfully!');
    console.log(`Total menus: ${processedData.menus.length}`);
    console.log(
      `Total menu items: ${processedData.menus.reduce(
        (sum, menu) =>
          sum + menu.groups.reduce((groupSum, group) => groupSum + group.items.length, 0),
        0
      )}`
    );
    console.log(`Total unique option groups: ${processedOptionGroups.optionGroups.length}`);
    console.log(
      `Total option group items: ${processedOptionGroups.optionGroups.reduce(
        (sum, group) => sum + group.items.length,
        0
      )}`
    );
  } catch (error) {
    console.error('Error processing menu:', error);
    process.exit(1);
  }
}

processMenu();
