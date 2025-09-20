import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function testAuth() {
  try {
    console.log('Testing authentication flow...')
    
    // Check if admin user exists
    const adminUser = await prisma.user.findUnique({
      where: {
        email: 'admin@caterers.com'
      }
    })
    
    if (!adminUser) {
      console.log('Admin user not found')
      return
    }
    
    console.log('Admin user found:')
    console.log(`- Name: ${adminUser.name}`)
    console.log(`- Email: ${adminUser.email}`)
    console.log(`- Role: ${adminUser.role}`)
    
    // Test password validation
    const isPasswordValid = await bcrypt.compare('admin123', adminUser.password)
    console.log(`Password valid: ${isPasswordValid}`)
    
    if (isPasswordValid) {
      console.log('✅ Authentication test passed')
    } else {
      console.log('❌ Authentication test failed')
    }
  } catch (error) {
    console.error('Error testing authentication:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testAuth()