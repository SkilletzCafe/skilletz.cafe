# Menu Data

This directory contains Skillet'z Cafe's menu data exported from Toast and its processed versions.

## Directory Structure

- `/raw` - Contains the original, unmodified export from Toast
  - `toast-menu.json` - Raw JSON export from Toast (1.3MB)
- `/processed` - Contains processed and optimized versions of the menu
  - `menu.json` - Cleaned and optimized menu data for the website
  - Additional processed files as needed (e.g., categorized menus, special menus)
- `image_mappings.json` - Maps menu items to their corresponding images

## Processing Scripts

Menu processing scripts are located in `src/scripts/menu/`. These scripts handle:

- Cleaning and validating the raw Toast export
- Optimizing the data structure for website use
- Generating specialized versions of the menu
- Mapping menu items to their corresponding images

### Available Scripts

```bash
# Process the raw Toast menu export
npm run menu:process

# Generate image mappings for menu items
npm run menu:images
```

## Image Mapping Process

The `menu:images` script automatically maps menu items to their corresponding images in the `/public/images/menu/hd` directory. The process:

1. Looks for exact matches between menu item names and image filenames (converted to snake_case)
2. If no exact match, tries to find partial matches based on words in the name
3. Supports multiple images per item, with the first image being the primary one
4. Organizes images by menu category (e.g., burgers, specials, etc.)
5. Generates a mapping file that can be used by the website

The mapping is stored in `image_mappings.json` with the following structure:

```json
{
  "item_images": {
    "[item_guid]": {
      "images": ["path/to/image1.jpg", "path/to/image2.jpg"],
      "category": "Category Name",
      "item_name": "Item Name"
    }
  },
  "metadata": {
    "last_updated": "YYYY-MM-DD",
    "version": "1.0",
    "image_root": "/images/menu/hd"
  }
}
```

## Usage

1. Place the raw Toast export in `/raw/toast-menu.json`
2. Run `npm run menu:process` to generate optimized menu data
3. Run `npm run menu:images` to generate image mappings
4. The website uses both the processed menu data and image mappings

## Data Format

### Raw Toast Export

The original Toast export includes detailed menu items with:

- Prices
- Categories
- Modifiers
- Options
- etc.

### Processed Menu

The processed menu is optimized for website use with:

- Simplified structure
- Validated data
- Optimized for performance
- Additional computed fields as needed
- Image mappings for menu items
