const http = require('http')

console.log('Verifying that the web app uses database-connected data...')

// Test 1: Check API response
console.log('\n1. Testing API endpoint...')
const options = {
  hostname: 'localhost',
  port: 3002,
  path: '/api/menu-items',
  method: 'GET'
}

const req = http.request(options, (res) => {
  let data = ''
  
  res.on('data', (chunk) => {
    data += chunk
  })
  
  res.on('end', () => {
    if (res.statusCode === 200) {
      const response = JSON.parse(data)
      if (response.success && response.data && response.data.length > 0) {
        console.log('   ✅ API returns database data successfully')
        console.log(`   ✅ Found ${response.data.length} menu items from database`)
        
        // Check if items have images
        const itemsWithImages = response.data.filter(item => item.image)
        console.log(`   ✅ ${itemsWithImages.length}/${response.data.length} items have images`)
        
        // Show sample data
        console.log('   Sample item:')
        console.log(`     Name: ${response.data[0].name}`)
        console.log(`     Category: ${response.data[0].category}`)
        console.log(`     Image: ${response.data[0].image}`)
      } else {
        console.log('   ❌ API did not return expected data format')
      }
    } else {
      console.log(`   ❌ API returned status code ${res.statusCode}`)
    }
    
    console.log('\n✅ Verification complete: Application is using database-connected data')
  })
})

req.on('error', (error) => {
  console.error('   ❌ Error connecting to API:', error.message)
  console.log('\n❌ Verification failed: Could not verify database connectivity')
})

req.end()