import { copyFileSync, existsSync } from 'fs'
// import { join as _join } from 'path' // Unused import removed

// List of missing images that need to be created
const missingImages = [
  // Appetizers
  'public/images/menu/appetizers/misal-pav.jpg',
  'public/images/menu/appetizers/vada-pav.jpg',
  'public/images/menu/appetizers/pav-bhaji.jpg',
  'public/images/menu/appetizers/sabudana-khichdi.jpg',
  'public/images/menu/appetizers/kanda-poha.jpg',
  
  // Main dishes
  'public/images/menu/main/puran-poli.jpg',
  'public/images/menu/main/bharli-vangi.jpg',
  'public/images/menu/main/batata-bhaji.jpg',
  'public/images/menu/main/palak-paneer.jpg',
  'public/images/menu/main/paneer-butter-masala.jpg',
  'public/images/menu/main/dal-makhani.jpg',
  
  // Rice
  'public/images/menu/rice/vegetable-biryani.jpg',
  'public/images/menu/rice/jeera-rice.jpg',
  
  // Breads
  'public/images/menu/breads/chapati.jpg',
  'public/images/menu/breads/paratha.jpg',
  
  // Desserts
  'public/images/menu/desserts/modak.jpg',
  'public/images/menu/desserts/shrikhand.jpg',
  'public/images/menu/desserts/rava-sheera.jpg',
  
  // Beverages
  'public/images/menu/beverages/masala-chai.jpg',
  'public/images/menu/beverages/buttermilk.jpg',
]

function copyPlaceholderImages() {
  console.log('Copying placeholder images for testing...\n')
  
  const placeholderPath = 'public/images/menu/placeholder.png'
  
  if (!existsSync(placeholderPath)) {
    console.error('Error: placeholder.png not found. Please create it first.')
    return
  }
  
  let copiedCount = 0
  
  for (const imagePath of missingImages) {
    try {
      // Create the directory if it doesn't exist
      const dirPath = imagePath.substring(0, imagePath.lastIndexOf('/'))
      if (!existsSync(dirPath)) {
        console.log(`Directory ${dirPath} doesn't exist. Please create it first.`)
        continue
      }
      
      // Copy the placeholder image to the target path
      copyFileSync(placeholderPath, imagePath)
      console.log(`✅ Copied placeholder to ${imagePath}`)
      copiedCount++
    } catch (error) {
      console.error(`❌ Failed to copy placeholder to ${imagePath}:`, error)
    }
  }
  
  console.log(`\n--- Summary ---`)
  console.log(`✅ Successfully copied ${copiedCount} placeholder images`)
  console.log(`💡 Note: These are just placeholders. Replace them with actual food images for production.`)
}

copyPlaceholderImages()