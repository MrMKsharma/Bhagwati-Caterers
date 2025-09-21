import { performance } from 'perf_hooks'

async function testPageLoadPerformance() {
  console.log('Testing menu page loading performance...')
  
  // Simulate multiple requests to the API
  const startTime = performance.now()
  
  try {
    // Import the API route function
    const { GET } = await import('../src/app/api/menu-items/route')
    
    // Make 10 requests to simulate multiple users
    const requests = []
    for (let i = 0; i < 10; i++) {
      requests.push(GET())
    }
    
    const responses = await Promise.all(requests)
    const endTime = performance.now()
    
    console.log(`Processed ${requests.length} requests in ${(endTime - startTime).toFixed(2)}ms`)
    console.log(`Average response time: ${((endTime - startTime) / requests.length).toFixed(2)}ms per request`)
    
    // Check the first response
    const firstResponse = responses[0]
    const data = await firstResponse.json()
    
    console.log(`Success: ${data.success}`)
    console.log(`Items returned: ${data.data?.length || 0}`)
    
    if (data.data && data.data.length > 0) {
      console.log('Sample item:')
      console.log(`- ${data.data[0].name} (${data.data[0].category})`)
    }
  } catch (error) {
    console.error('Error during performance test:', error)
  }
}

testPageLoadPerformance()