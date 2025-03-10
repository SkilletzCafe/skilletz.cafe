import fs from 'fs';
import path from 'path';

interface MenuItem {
  name: string;
  guid: string;
  description: string;
  price: number;
  imageFilename: string | null;
}

interface MenuGroup {
  name: string;
  guid: string;
  description: string;
  items: MenuItem[];
}

interface Menu {
  name: string;
  guid: string;
  description: string;
  groups: MenuGroup[];
}

interface MenuData {
  menus: Menu[];
  menuItemImages: Record<string, string>;
}

interface ImageMapping {
  images: string[];
  category: string;
  item_name: string;
}

interface ImageMappings {
  item_images: Record<string, ImageMapping>;
  metadata: {
    last_updated: string;
    version: string;
    image_root: string;
  };
}

interface MissingImage {
  name: string;
  category: string;
  guid: string;
}

const snakeCase = (text: string): string => {
  // First convert & to and
  const withAnds = text.replace(/\s*&\s*/g, ' and ');
  // Remove emojis and special characters (but preserve underscores)
  const cleaned = withAnds.replace(/[^\w\s-_]/g, '');
  // Replace spaces and hyphens with underscores
  return cleaned
    .trim()
    .toLowerCase()
    .replace(/[-\s]+/g, '_');
};

const normalizeToken = (token: string): string => {
  // First convert & to and
  token = token.replace(/\s*&\s*/g, ' and ');

  // Convert numbers and number words to consistent format
  token = token.replace(/^1$/, 'single');
  token = token.replace(/^2$/, 'two');
  token = token.replace(/^3$/, 'three');
  token = token.replace(/^4$/, 'four');

  // Handle numeric prefixes (e.g. "1 Pancake" -> "single pancake")
  if (/^\d+$/.test(token)) {
    if (token === '1') return 'single';
    // Add more number mappings if needed
    return token;
  }

  // Fix common variations
  token = token.replace(/^hash[-_]?browns?$/, 'hashbrown');
  token = token.replace(/^hash[-_]?brown$/, 'hashbrown');
  token = token.replace(/^loaded$/, 'load'); // Normalize loaded/load variations

  // Remove trailing numbers
  token = token.replace(/\d+$/, '');

  // Basic singular/plural normalization
  // Don't normalize words ending in 'ies' (e.g. 'fries')
  if (token.endsWith('s') && !token.endsWith('ss') && !token.endsWith('ies')) {
    token = token.slice(0, -1);
  }

  // Don't normalize location names
  if (token.toLowerCase() === 'decoto') {
    return token.toLowerCase();
  }

  return token.toLowerCase();
};

const wordSimilarity = (word1: string, word2: string): number => {
  const norm1 = normalizeToken(word1);
  const norm2 = normalizeToken(word2);

  // Exact match after normalization
  if (norm1 === norm2) return 1;

  // One is contained in the other
  if (norm1.includes(norm2) || norm2.includes(norm1)) return 0.8;

  // Calculate basic similarity (common characters)
  const chars1 = new Set(norm1);
  const chars2 = new Set(norm2);
  const commonChars = new Set(Array.from(chars1).filter((x) => chars2.has(x)));
  const similarity = (2 * commonChars.size) / (chars1.size + chars2.size);

  return similarity;
};

// Helper function to generate bigrams from a string array
const generateBigrams = (tokens: string[]): string[] => {
  const bigrams: string[] = [];
  for (let i = 0; i < tokens.length - 1; i++) {
    bigrams.push(`${tokens[i]}${tokens[i + 1]}`);
  }
  return bigrams;
};

// Common compound words that might be spelled as two words or one word
// these ould be joined
const COMPOUND_WORDS = new Set(['milk shake', 'hash brown']);

// Synonym groups - words that imply each other's presence
const SYNONYM_GROUPS: string[][] = [
  ['stack', 'pancake'],
  ['burger', 'hamburger'],
  ['coffee', 'brew'],
  // etc.
];

// Menu item variations and synonyms
const MENU_VARIATIONS: Record<string, string[]> = {
  'impossible stack': ['stack of 3', 'triple stack', '3 stack'],
  'stack of 3': ['impossible stack', 'triple stack', '3 stack'],
};

// Create a map for quick lookup of synonyms
const WORD_SYNONYMS = new Map<string, Set<string>>();
SYNONYM_GROUPS.forEach((group) => {
  group.forEach((word) => {
    const synonyms = new Set(group.filter((w) => w !== word));
    WORD_SYNONYMS.set(word, synonyms);
  });
});

// Special category search rules
const SIDE_SEARCH_CATEGORIES = [
  'sides',
  'breakfast',
  'pancakes_waffles',
  'meat_and_eggs',
  'specialty_dishes',
];

const findCompoundMatches = (tokens1: string[], tokens2: string[]): number => {
  const bigrams1 = generateBigrams(tokens1);
  const bigrams2 = generateBigrams(tokens2);

  // Try to find compound word matches
  let compoundScore = 0;

  // Check if joining adjacent tokens in either array forms a known compound word
  const checkCompounds = (tokens: string[]): string[] => {
    const compounds: string[] = [];
    for (let i = 0; i < tokens.length - 1; i++) {
      // Try both with and without space
      const compoundWithSpace = `${tokens[i]} ${tokens[i + 1]}`.toLowerCase();
      const compoundNoSpace = `${tokens[i]}${tokens[i + 1]}`.toLowerCase();
      if (COMPOUND_WORDS.has(compoundWithSpace)) {
        compounds.push(compoundWithSpace);
      }
      // Also check the no-space version in case the filename uses it
      if (COMPOUND_WORDS.has(compoundNoSpace)) {
        compounds.push(compoundNoSpace);
      }
    }
    return compounds;
  };

  const compounds1 = checkCompounds(tokens1);
  const compounds2 = checkCompounds(tokens2);

  // Award points for matching compound words
  for (const compound1 of compounds1) {
    // Compare normalized versions (without spaces) for matching
    const normalized1 = compound1.replace(/\s+/g, '');
    for (const compound2 of compounds2) {
      const normalized2 = compound2.replace(/\s+/g, '');
      if (normalized1 === normalized2) {
        compoundScore += 0.4; // Significant boost for compound word match
        break;
      }
    }
  }

  // Award points for matching bigrams
  for (const bigram1 of bigrams1) {
    if (bigrams2.includes(bigram1)) {
      compoundScore += 0.2;
    }
  }

  return Math.min(compoundScore, 1.0); // Cap at 1.0
};

// Helper function to split filename into base and modifier parts
const splitFileNameParts = (filename: string): { base: string; modifier: string | null } => {
  const parts = filename.split('__');
  // Remove any numbers at the end of the base part
  const base = parts[0].replace(/_?\d+$/, '');
  return {
    base,
    modifier: parts.length > 1 ? parts[1] : null,
  };
};

// Helper function to get base name without ordinal suffix
const getBaseNameWithoutOrdinal = (filename: string): string => {
  // First split on __ to get the base part
  const { base } = splitFileNameParts(filename);
  // Remove any numbers at the end of the filename, including underscores before them
  // This will match patterns like:
  // - filename_123
  // - filename123
  // - filename_1
  // But won't match:
  // - 123_filename
  // - file_123_name
  return base.replace(/_?\d+$/, '');
};

// Helper function to normalize numbers in text
const normalizeNumbers = (text: string): string => {
  return text
    .replace(/\b1\b/g, 'single')
    .replace(/\b2\b/g, 'two')
    .replace(/\b3\b/g, 'three')
    .replace(/\b4\b/g, 'four');
};

const findMatchingImagesInCategories = (
  itemName: string,
  categoryDirs: string[],
  hasUnmatchedItems: boolean
): string[] => {
  const allMatches: Array<{ path: string; score: number; matchType: string }> = [];

  // Debug logging
  console.log('\nMatching item:', itemName);

  // Normalize numbers in item name first
  itemName = normalizeNumbers(itemName);

  // Check for menu variations
  const normalizedItemName = itemName.toLowerCase();
  const variations = MENU_VARIATIONS[normalizedItemName] || [];

  for (const categoryDir of categoryDirs) {
    if (!fs.existsSync(categoryDir)) {
      continue;
    }

    // Get all image files in the category
    const files = fs
      .readdirSync(categoryDir)
      .filter((file) => file.endsWith('.jpg'))
      .map((file) => ({
        path: path.join('images/menu/hd', path.basename(categoryDir), file),
        name: path.parse(file).name,
      }));

    // Tokenize and normalize the item name
    const itemTokens = snakeCase(itemName)
      .split('_')
      .filter((token) => token.length > 0)
      .map(normalizeToken);

    // Debug logging
    console.log('Item tokens:', itemTokens);

    // First try exact matches without synonyms
    for (const file of files) {
      let score = 0;
      let matchType = '';

      // Split filename into base and modifier parts
      const { base: baseFileName, modifier } = splitFileNameParts(file.name);

      // Debug logging
      console.log('\nChecking file:', file.name);
      console.log('Base filename:', baseFileName);
      console.log('Modifier:', modifier);

      // Tokenize base filename
      const fileTokens = baseFileName
        .split('_')
        .filter((token) => token.length > 0)
        .map(normalizeToken);

      // Debug logging
      console.log('File tokens:', fileTokens);

      // Check if this is a known variation
      const fileNameNormalized = fileTokens.join(' ').toLowerCase();
      if (variations.some((v: string) => v === fileNameNormalized)) {
        score = modifier ? 0.99 : 1.0; // Slightly lower score for variants
        matchType = 'menu_variation';
      }
      // Priority 1: Exact token sequence match
      else if (arrayEquals(fileTokens, itemTokens)) {
        score = modifier ? 0.99 : 1.0; // Slightly lower score for variants
        matchType = 'exact_sequence';
      }
      // Priority 2: All tokens match in any order
      else if (
        fileTokens.length === itemTokens.length &&
        fileTokens.every((token) => itemTokens.includes(token))
      ) {
        score = modifier ? 0.94 : 0.95; // Slightly lower score for variants
        matchType = 'all_tokens';
      }

      if (score > 0) {
        allMatches.push({
          path: file.path,
          score,
          matchType,
        });
      }
    }

    // If no exact matches found, try with synonyms
    if (allMatches.length === 0) {
      // Add implied tokens based on synonyms
      const expandedItemTokens = new Set(itemTokens);
      itemTokens.forEach((token) => {
        const synonyms = WORD_SYNONYMS.get(token);
        if (synonyms) {
          synonyms.forEach((syn) => expandedItemTokens.add(syn));
        }
      });

      // Check for menu variations
      const variations = MENU_VARIATIONS[normalizedItemName] || [];

      for (const file of files) {
        const { base: baseFileName, modifier } = splitFileNameParts(file.name);
        const fileTokens = baseFileName
          .split('_')
          .filter((token) => token.length > 0)
          .map(normalizeToken);

        // Add implied tokens based on synonyms
        const expandedFileTokens = new Set(fileTokens);
        fileTokens.forEach((token) => {
          const synonyms = WORD_SYNONYMS.get(token);
          if (synonyms) {
            synonyms.forEach((syn) => expandedFileTokens.add(syn));
          }
        });

        let score = 0;
        let matchType = '';

        // Priority 3: All tokens match with synonyms
        if (
          Array.from(expandedFileTokens).every((token) => expandedItemTokens.has(token)) ||
          Array.from(expandedItemTokens).every((token) => expandedFileTokens.has(token))
        ) {
          score = modifier ? 0.84 : 0.85; // Slightly lower score for variants
          matchType = 'all_tokens_with_synonyms';
        }
        // Priority 4: One array is a prefix/suffix of the other
        else if (
          isPrefix(itemTokens, fileTokens) ||
          isPrefix(fileTokens, itemTokens) ||
          isSuffix(itemTokens, fileTokens) ||
          isSuffix(fileTokens, itemTokens)
        ) {
          score = modifier ? 0.79 : 0.8; // Slightly lower score for variants
          matchType = 'prefix_suffix_match';
        }
        // Priority 5: Check for compound word matches if we have unmatched items
        else if (hasUnmatchedItems) {
          const compoundScore = findCompoundMatches(itemTokens, fileTokens);
          if (compoundScore > 0) {
            score = modifier ? 0.74 : 0.75; // Slightly lower score for variants
            matchType = 'compound_match';
          }
        }

        // Priority 6: Partial token matches - score based on number of matching tokens
        if (score === 0) {
          const matchingTokens = fileTokens.filter((token) =>
            itemTokens.some((itemToken) => {
              // Check for exact match or significant substring match
              if (itemToken === token) return true;
              if (itemToken.length >= 4 && token.length >= 4) {
                return itemToken.includes(token) || token.includes(itemToken);
              }
              return false;
            })
          );

          if (matchingTokens.length > 0) {
            // Calculate score based on proportion of matching tokens
            // and absolute number of matching tokens
            const itemTokenRatio = matchingTokens.length / itemTokens.length;
            const fileTokenRatio = matchingTokens.length / fileTokens.length;
            const avgRatio = (itemTokenRatio + fileTokenRatio) / 2;

            // More matching tokens = higher base score
            const baseScore = Math.min(0.3 + matchingTokens.length * 0.1, 0.7);
            score = baseScore * avgRatio;
            matchType = 'partial_token_match';
          }
        }

        if (score > 0.3) {
          // Lower threshold for accepting matches
          allMatches.push({
            path: file.path,
            score,
            matchType,
          });
        }
      }
    }
  }

  // Sort all matches by score descending
  allMatches.sort((a, b) => b.score - a.score);

  // Debug logging
  console.log('\nFinal matches:', allMatches);

  // Return paths only, highest scores first
  return allMatches.map((m) => m.path);
};

// Helper function to check if one array is a prefix of another
const isPrefix = (shorter: string[], longer: string[]): boolean => {
  if (shorter.length > longer.length) return false;
  return shorter.every((token, i) => token === longer[i]);
};

// Helper function to check if one array is a suffix of another
const isSuffix = (shorter: string[], longer: string[]): boolean => {
  if (shorter.length > longer.length) return false;
  return shorter.every((token, i) => token === longer[longer.length - shorter.length + i]);
};

// Helper function to compare arrays for equality
const arrayEquals = (a: string[], b: string[]): boolean => {
  return a.length === b.length && a.every((val, index) => val === b[index]);
};

const CATEGORY_MAP: Record<string, string> = {
  Specials: 'specials',
  'Traditional Omelettes': 'omelettes',
  'Specialty Omelettes': 'specialty_omelettes',
  Scrambles: 'scrambles',
  'Specialty Dishes': 'specialty_dishes',
  'Meat & Eggs': 'meat_and_eggs',
  Burritos: 'burritos',
  Sandwiches: 'sandwiches',
  Burgers: 'burgers',
  'Pancakes, Waffles & More': 'pancakes_waffles',
  'Kids Menu': 'kids_menu',
  Salads: 'salads',
  Sides: 'sides',
  Drinks: 'drinks',
};

const getCategoryDirName = (menuName: string): string => {
  return CATEGORY_MAP[menuName] || snakeCase(menuName);
};

const getAllImageFiles = (imagesRoot: string): Map<string, string> => {
  const imageFiles = new Map<string, string>();
  const categories = fs
    .readdirSync(imagesRoot)
    .filter((dir) => fs.statSync(path.join(imagesRoot, dir)).isDirectory());

  for (const category of categories) {
    const categoryPath = path.join(imagesRoot, category);
    const files = fs
      .readdirSync(categoryPath)
      .filter((file) => file.endsWith('.jpg'))
      .map((file) => ({
        path: path.join('images/menu/hd', category, file),
        fullPath: path.join(categoryPath, file),
      }));

    files.forEach((file) => {
      imageFiles.set(file.path, file.fullPath);
    });
  }

  return imageFiles;
};

const findMatchingImages = (
  itemName: string,
  categoryDir: string,
  hasUnmatchedItems: boolean
): string[] => {
  return findMatchingImagesInCategories(itemName, [categoryDir], hasUnmatchedItems);
};

/**
 * Removes emoji characters from text using Unicode ranges.
 * Covers common emoji ranges including:
 * - Dingbats (27xx)
 * - Private Use Area
 * - Supplemental Symbols and Pictographs
 * - Emoticons
 * - Transport and Map Symbols
 * - Miscellaneous Symbols and Pictographs
 */
const removeEmojis = (text: string): string => {
  return text
    .replace(
      /[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g,
      ''
    )
    .trim();
};

const generateImageMappings = (): void => {
  // Setup paths relative to src directory
  const rootDir = path.resolve(__dirname, '../../..');
  const menuJsonPath = path.join(rootDir, 'src', 'data', 'menu', 'processed', 'menu.json');
  const mappingsJsonPath = path.join(rootDir, 'src', 'data', 'menu', 'image_mappings.json');
  const imagesRoot = path.join(rootDir, 'public', 'images', 'menu', 'hd');

  // Load menu data
  const menuData: MenuData = JSON.parse(fs.readFileSync(menuJsonPath, 'utf-8'));

  // Get all image files
  const allImages = getAllImageFiles(imagesRoot);
  const usedImages = new Set<string>();

  // Initialize mappings
  const mappings: ImageMappings = {
    item_images: {},
    metadata: {
      last_updated: new Date().toISOString().split('T')[0],
      version: '1.0',
      image_root: '/images/menu/hd',
    },
  };

  // First pass: Find all potential matches and identify unique matches
  const allMatches = new Map<string, Array<{ itemGuid: string; score: number }>>();
  const itemMatches = new Map<string, Array<{ imagePath: string; score: number }>>();

  // Process each menu category
  const missingImages: MissingImage[] = [];
  const unmatchedItems = new Set<string>();

  // First pass: Find initial matches without compound word matching
  for (const menu of menuData.menus) {
    if (menu.name === 'Other') continue;

    const categoryDir = path.join(imagesRoot, getCategoryDirName(menu.name));

    for (const group of menu.groups) {
      for (const item of group.items) {
        let potentialMatches: string[];

        // Special handling for Side menu items
        if (menu.name === 'Sides') {
          const categoryDirs = SIDE_SEARCH_CATEGORIES.map((cat) => path.join(imagesRoot, cat));
          potentialMatches = findMatchingImagesInCategories(
            removeEmojis(item.name), // Remove emojis only for matching
            categoryDirs,
            false
          );
        } else {
          potentialMatches = findMatchingImages(
            removeEmojis(item.name), // Remove emojis only for matching
            categoryDir,
            false
          );
        }

        unmatchedItems.add(item.guid);

        if (potentialMatches.length > 0) {
          itemMatches.set(
            item.guid,
            potentialMatches.map((path: string) => ({
              imagePath: path,
              score: 1,
            }))
          );

          potentialMatches.forEach((imagePath: string) => {
            if (!allMatches.has(imagePath)) {
              allMatches.set(imagePath, []);
            }
            allMatches.get(imagePath)?.push({
              itemGuid: item.guid,
              score: 1,
            });
          });
        }
      }
    }
  }

  // Process unique matches first
  const processedItems = new Set<string>();

  // First, handle images that only match one item
  allMatches.forEach((items, imagePath) => {
    if (items.length === 1) {
      const itemGuid = items[0].itemGuid;
      const item = findItemByGuid(menuData, itemGuid);
      if (item) {
        mappings.item_images[itemGuid] = {
          images: [imagePath],
          category: findItemCategory(menuData, itemGuid) || '',
          item_name: item.name,
        };
        processedItems.add(itemGuid);
        unmatchedItems.delete(itemGuid);
      }
    }
  });

  // Second pass: Try compound word matching for remaining items if there are unmatched items
  if (unmatchedItems.size > 0) {
    for (const menu of menuData.menus) {
      if (menu.name === 'Other') continue;

      const categoryDir = path.join(imagesRoot, getCategoryDirName(menu.name));

      for (const group of menu.groups) {
        for (const item of group.items) {
          if (processedItems.has(item.guid)) continue;

          const potentialMatches = findMatchingImages(
            removeEmojis(item.name), // Remove emojis only for matching
            categoryDir,
            true
          );

          if (potentialMatches.length > 0) {
            itemMatches.set(
              item.guid,
              potentialMatches.map((path: string) => ({
                imagePath: path,
                score: 1,
              }))
            );

            potentialMatches.forEach((imagePath: string) => {
              if (!allMatches.has(imagePath)) {
                allMatches.set(imagePath, []);
              }
              allMatches.get(imagePath)?.push({
                itemGuid: item.guid,
                score: 1,
              });
            });
          }
        }
      }
    }
  }

  // Modified matching algorithm to allow image reuse
  const remainingItems = new Set(Array.from(unmatchedItems));
  let matchMade = true;

  while (matchMade && remainingItems.size > 0) {
    matchMade = false;

    // Convert Set to Array for iteration
    for (const itemGuid of Array.from(remainingItems)) {
      if (!itemMatches.has(itemGuid)) continue;

      const matches = itemMatches.get(itemGuid)!;
      // Allow reuse of images by not filtering based on usedImages
      const availableMatches = matches;

      if (availableMatches.length > 0) {
        // Find the best available match
        const bestMatch = availableMatches[0];
        const item = findItemByGuid(menuData, itemGuid);

        if (item) {
          mappings.item_images[itemGuid] = {
            images: [bestMatch.imagePath],
            category: findItemCategory(menuData, itemGuid) || '',
            item_name: item.name,
          };
          remainingItems.delete(itemGuid);
          matchMade = true;
        }
      }
    }
  }

  // Add remaining unmatched items to missingImages
  // Convert Set to Array for iteration
  for (const itemGuid of Array.from(remainingItems)) {
    const item = findItemByGuid(menuData, itemGuid);
    if (item) {
      missingImages.push({
        name: item.name,
        category: findItemCategory(menuData, itemGuid) || '',
        guid: item.guid,
      });
    }
  }

  // Find unused images - now only counts images not used by any item
  const unusedImages: string[] = [];
  const usedImagePaths = new Set(
    Object.values(mappings.item_images).flatMap((mapping) => mapping.images)
  );

  allImages.forEach((fullPath, relativePath) => {
    if (!usedImagePaths.has(relativePath)) {
      unusedImages.push(relativePath);
    }
  });

  // Group images by their base name (without ordinal suffix)
  const imagesByBaseName = new Map<string, string[]>();
  [...Array.from(usedImagePaths), ...unusedImages].forEach((imagePath) => {
    const filename = path.basename(imagePath);
    const baseName = getBaseNameWithoutOrdinal(filename.replace(/\.jpg$/, ''));
    if (!imagesByBaseName.has(baseName)) {
      imagesByBaseName.set(baseName, []);
    }
    imagesByBaseName.get(baseName)?.push(imagePath);
  });

  // Add unused ordinal variants to their matched counterparts
  imagesByBaseName.forEach((variants, baseName) => {
    if (variants.length > 1) {
      const usedVariant = variants.find((v) => usedImagePaths.has(v));
      if (usedVariant) {
        // Find which item is using this image
        for (const [guid, mapping] of Object.entries(mappings.item_images)) {
          if (mapping.images.includes(usedVariant)) {
            // Add all unused variants to this item's images
            const unusedVariants = variants.filter((v) => !usedImagePaths.has(v));
            mapping.images.push(...unusedVariants);
            // Remove these from unusedImages array
            unusedVariants.forEach((v) => {
              const index = unusedImages.indexOf(v);
              if (index > -1) {
                unusedImages.splice(index, 1);
              }
            });
            break;
          }
        }
      }
    }
  });

  // Save mappings
  fs.writeFileSync(mappingsJsonPath, JSON.stringify(mappings, null, 2));

  // Print summary
  console.log(`Generated mappings for ${Object.keys(mappings.item_images).length} items`);

  if (missingImages.length > 0) {
    console.log('\n📸 Missing images for the following items:');
    // Group by category for better readability
    const byCategory = missingImages.reduce(
      (acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = [];
        }
        acc[item.category].push(item.name);
        return acc;
      },
      {} as Record<string, string[]>
    );

    Object.entries(byCategory)
      .sort()
      .forEach(([category, items]) => {
        console.log(`\n${category}:`);
        items.sort().forEach((item) => console.log(`  - ${item}`));
      });
  }

  if (unusedImages.length > 0) {
    console.log('\n🖼️  Unused images found:');
    // Group by category for better readability
    const byCategory = unusedImages.reduce(
      (acc, img) => {
        const category = path.dirname(img).split('/').pop() || 'unknown';
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(path.basename(img));
        return acc;
      },
      {} as Record<string, string[]>
    );

    Object.entries(byCategory)
      .sort()
      .forEach(([category, images]) => {
        console.log(`\n${category}:`);
        images.sort().forEach((img) => console.log(`  - ${img}`));
      });
  }

  // Print statistics
  console.log('\n📊 Statistics:');
  console.log(
    `- Total menu items (excluding Other): ${menuData.menus.reduce(
      (sum, menu) =>
        menu.name === 'Other'
          ? sum
          : sum + menu.groups.reduce((groupSum, group) => groupSum + group.items.length, 0),
      0
    )}`
  );
  console.log(`- Items with images: ${Object.keys(mappings.item_images).length}`);
  console.log(`- Items missing images: ${missingImages.length}`);
  console.log(`- Total images available: ${allImages.size}`);
  console.log(`- Images used: ${usedImages.size}`);
  console.log(`- Unused images: ${unusedImages.length}`);
};

// Helper function to find an item by GUID
const findItemByGuid = (menuData: MenuData, guid: string): MenuItem | null => {
  for (const menu of menuData.menus) {
    for (const group of menu.groups) {
      const item = group.items.find((item) => item.guid === guid);
      if (item) return item;
    }
  }
  return null;
};

// Helper function to find item category
const findItemCategory = (menuData: MenuData, guid: string): string | null => {
  for (const menu of menuData.menus) {
    for (const group of menu.groups) {
      if (group.items.some((item) => item.guid === guid)) {
        return menu.name;
      }
    }
  }
  return null;
};

// Only run if called directly
if (require.main === module) {
  generateImageMappings();
}

// Export for potential reuse in other parts of the application
export { snakeCase, findMatchingImages, getCategoryDirName, generateImageMappings, CATEGORY_MAP };
