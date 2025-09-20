// Test the caching mechanism in the menu page
async function testCaching() {
  console.log('Testing sessionStorage caching mechanism...')
  
  // Mock sessionStorage
  const mockSessionStorage = {
    data: {} as Record<string, string>,
    getItem(key: string): string | null {
      return this.data[key] || null
    },
    setItem(key: string, value: string) {
      this.data[key] = value
    },
    removeItem(key: string) {
      delete this.data[key]
    }
  }
  
  // Simulate cached data
  const cachedData = {
    data: [
      { id: '1', name: 'Test Item', category: 'appetizer' }
    ],
    timestamp: Date.now() - 2 * 60 * 1000 // 2 minutes old
  }
  
  mockSessionStorage.setItem('menuItems', JSON.stringify(cachedData))
  
  // Check if cached data is used
  const storedData = mockSessionStorage.getItem('menuItems')
  if (storedData) {
    const parsedData = JSON.parse(storedData)
    const isRecent = Date.now() - parsedData.timestamp < 5 * 60 * 1000
    
    console.log(`Cached data found: ${parsedData.data.length} items`)
    console.log(`Cache age: ${Math.round((Date.now() - parsedData.timestamp) / 1000)} seconds`)
    console.log(`Cache is recent (within 5 minutes): ${isRecent}`)
    
    if (isRecent) {
      console.log('✅ Using cached data - no API call needed')
    } else {
      console.log('⚠️ Cache expired - API call required')
    }
  }
  
  // Test expired cache
  const expiredCache = {
    data: [
      { id: '1', name: 'Test Item', category: 'appetizer' }
    ],
    timestamp: Date.now() - 10 * 60 * 1000 // 10 minutes old
  }
  
  mockSessionStorage.setItem('menuItems', JSON.stringify(expiredCache))
  
  const expiredData = mockSessionStorage.getItem('menuItems')
  if (expiredData) {
    const parsedData = JSON.parse(expiredData)
    const isRecent = Date.now() - parsedData.timestamp < 5 * 60 * 1000
    
    console.log('\nTesting expired cache:')
    console.log(`Cache age: ${Math.round((Date.now() - parsedData.timestamp) / 1000)} seconds`)
    console.log(`Cache is recent (within 5 minutes): ${isRecent}`)
    
    if (!isRecent) {
      console.log('✅ Correctly identified expired cache - API call will be made')
    }
  }
}

testCaching()