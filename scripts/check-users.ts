import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkUsers() {
  try {
    console.log('Checking users in database...')
    
    const users = await prisma.user.findMany()
    
    console.log(`Found ${users.length} users`)
    
    if (users.length > 0) {
      console.log('Users:')
      users.forEach(user => {
        console.log(`- ${user.name} (${user.email}) - Role: ${user.role}`)
      })
    } else {
      console.log('No users found in database')
    }
  } catch (error) {
    console.error('Error checking users:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkUsers()