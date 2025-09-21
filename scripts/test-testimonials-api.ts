// import { NextRequest as _NextRequest } from 'next/server' // Unused import
import { GET } from '../src/app/api/admin/testimonials/route'

async function testApi() {
  try {
    const response = await GET()
    const data = await response.json()
    console.log('API Response:', data)
  } catch (error) {
    console.error('Error testing API:', error)
  }
}

testApi()