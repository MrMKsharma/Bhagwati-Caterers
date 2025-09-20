# Menu Images and Items Management

## Overview
This document provides instructions for managing menu items and their images in the Bhagwati Caterers application.

## Directory Structure
```
public/
└── images/
    └── menu/
        ├── appetizers/
        ├── main/
        ├── rice/
        ├── breads/
        ├── desserts/
        └── beverages/
```

## Adding High-Quality Images

### 1. Image Requirements
- Format: JPG or PNG
- Size: Minimum 800x600 pixels
- Resolution: 72 DPI
- File size: Under 500KB (optimize for web)
- Naming convention: Use lowercase, hyphens instead of spaces
  - Example: `misal-pav.jpg`, `paneer-butter-masala.jpg`

### 2. Uploading Images
1. Place images in the appropriate category folder under `public/images/menu/`
2. Ensure filenames match the pattern used in the database
3. Optimize images for web using tools like TinyPNG or ImageOptim

### 3. Running the Script to Add Menu Items
1. Make sure your database is set up and running
2. Navigate to the project root directory
3. Run the script:
   ```bash
   npx ts-node scripts/add_maharashtrian_dishes.ts
   ```

### 4. Verifying Menu Items
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Visit the admin panel at `http://localhost:3000/admin`
3. Navigate to Menu Items section to verify items were added
4. Check the public menu page at `http://localhost:3000/menu`

## Adding More Items Manually

### Through Admin Panel
1. Log in to the admin panel
2. Navigate to Menu Items
3. Click "Add Menu Item"
4. Fill in all required fields
5. Provide the image URL in the format: `/images/menu/{category}/{filename}.jpg`
6. Save the item

### Important Notes
- All items are vegetarian by default for Bhagwati Caterers
- Featured items will be highlighted on the menu page
- Cooking time is in minutes
- Ingredients and allergens should be provided as comma-separated values
- Image URLs should be relative to the public directory

## Image Sources
For high-quality images, consider these sources:
1. Unsplash (free): https://unsplash.com/s/photos/indian-food
2. Pexels (free): https://www.pexels.com/search/indian%20food/
3. Food Photography Communities
4. Professional Food Photographers

## Optimization Tips
1. Use consistent styling and lighting across all food photos
2. Include props that represent Maharashtrian culture (banana leaf, traditional serving dishes)
3. Capture images with natural lighting when possible
4. Show both close-up and full-dish shots
5. Maintain consistent image dimensions and aspect ratios

## Troubleshooting
- If images don't appear, check that the file path is correct
- Ensure file permissions allow reading of image files
- Verify that the database entries have the correct image URLs
- Check browser console for any 404 errors related to images