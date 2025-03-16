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

/**
 * Process the raw Toast menu export into an optimized format for the website
 */
async function processMenu() {
  const rawDataPath = path.join(process.cwd(), 'src/data/menu/raw/toast-menu.json');
  const outputPath = path.join(process.cwd(), 'src/data/menu/processed/menu.json');

  try {
    // Read raw data
    const rawData: ToastData = JSON.parse(await fs.promises.readFile(rawDataPath, 'utf8'));

    // Process the data
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
            .filter((item) => item.orderableOnline === 'YES' && item.visibility === 'ALL')
            .map((item) => ({
              name: item.name,
              guid: item.guid,
              description: item.description,
              price: item.price,
              imageUrl: item.imageLink, // Use the imageLink directly from Toast
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

    // Ensure output directory exists
    await fs.promises.mkdir(path.dirname(outputPath), { recursive: true });

    // Write processed data
    await fs.promises.writeFile(outputPath, JSON.stringify(processedData, null, 2), 'utf8');

    console.log('Menu processing completed successfully!');
    console.log(`Total menus: ${processedData.menus.length}`);
    console.log(
      `Total items: ${processedData.menus.reduce(
        (sum, menu) =>
          sum + menu.groups.reduce((groupSum, group) => groupSum + group.items.length, 0),
        0
      )}`
    );
  } catch (error) {
    console.error('Error processing menu:', error);
    process.exit(1);
  }
}

processMenu();
