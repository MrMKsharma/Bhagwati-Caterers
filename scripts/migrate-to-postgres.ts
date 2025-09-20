#!/usr/bin/env tsx
/**
 * Database Migration Script: SQLite to PostgreSQL
 * 
 * This script helps migrate your existing SQLite data to PostgreSQL.
 * 
 * Prerequisites:
 * 1. PostgreSQL installed and running
 * 2. Database created: CREATE DATABASE bhagwati_caterers;
 * 3. User with proper permissions
 * 
 * Usage:
 * 1. Update your .env with PostgreSQL connection string
 * 2. Run: npm run migrate:postgres
 */

import { PrismaClient as SQLitePrisma } from '@prisma/client'
import { PrismaClient as PostgresPrisma } from '@prisma/client'

// SQLite client (old database)
const sqliteClient = new SQLitePrisma({
  datasources: {
    db: {
      url: 'file:./prisma/dev.db'
    }
  }
})

// PostgreSQL client (new database)
const postgresClient = new PostgresPrisma()

async function migrateData() {
  try {
    console.log('🚀 Starting migration from SQLite to PostgreSQL...')

    // Check if SQLite database exists and has data
    console.log('📊 Checking existing data...')
    
    // Get counts from SQLite
    const counts = {
      users: await sqliteClient.user.count(),
      inquiries: await sqliteClient.inquiry.count(),
      menuItems: await sqliteClient.menuItem.count(),
      packages: await sqliteClient.package.count(),
      testimonials: await sqliteClient.testimonial.count(),
      galleryImages: await sqliteClient.galleryImage.count()
    }

    console.log('SQLite database contains:')
    Object.entries(counts).forEach(([table, count]) => {
      console.log(`  ${table}: ${count} records`)
    })

    if (Object.values(counts).every(count => count === 0)) {
      console.log('⚠️  No data found in SQLite database. Running fresh setup...')
      await postgresClient.$disconnect()
      await sqliteClient.$disconnect()
      return
    }

    // Migrate Users
    if (counts.users > 0) {
      console.log('👥 Migrating users...')
      const users = await sqliteClient.user.findMany()
      for (const user of users) {
        await postgresClient.user.upsert({
          where: { email: user.email },
          update: user,
          create: user
        })
      }
      console.log(`✅ Migrated ${users.length} users`)
    }

    // Migrate Inquiries
    if (counts.inquiries > 0) {
      console.log('📝 Migrating inquiries...')
      const inquiries = await sqliteClient.inquiry.findMany()
      for (const inquiry of inquiries) {
        await postgresClient.inquiry.upsert({
          where: { id: inquiry.id },
          update: inquiry,
          create: inquiry
        })
      }
      console.log(`✅ Migrated ${inquiries.length} inquiries`)
    }

    // Migrate Menu Items
    if (counts.menuItems > 0) {
      console.log('🍽️  Migrating menu items...')
      const menuItems = await sqliteClient.menuItem.findMany()
      for (const item of menuItems) {
        await postgresClient.menuItem.upsert({
          where: { id: item.id },
          update: item,
          create: item
        })
      }
      console.log(`✅ Migrated ${menuItems.length} menu items`)
    }

    // Migrate Packages
    if (counts.packages > 0) {
      console.log('📦 Migrating packages...')
      const packages = await sqliteClient.package.findMany()
      for (const pkg of packages) {
        await postgresClient.package.upsert({
          where: { id: pkg.id },
          update: pkg,
          create: pkg
        })
      }
      console.log(`✅ Migrated ${packages.length} packages`)
    }

    // Migrate Testimonials
    if (counts.testimonials > 0) {
      console.log('⭐ Migrating testimonials...')
      const testimonials = await sqliteClient.testimonial.findMany()
      for (const testimonial of testimonials) {
        await postgresClient.testimonial.upsert({
          where: { id: testimonial.id },
          update: testimonial,
          create: testimonial
        })
      }
      console.log(`✅ Migrated ${testimonials.length} testimonials`)
    }

    // Migrate Gallery Images
    if (counts.galleryImages > 0) {
      console.log('🖼️  Migrating gallery images...')
      const images = await sqliteClient.galleryImage.findMany()
      for (const image of images) {
        await postgresClient.galleryImage.upsert({
          where: { id: image.id },
          update: image,
          create: image
        })
      }
      console.log(`✅ Migrated ${images.length} gallery images`)
    }

    console.log('🎉 Migration completed successfully!')
    console.log('📝 Next steps:')
    console.log('  1. Verify data in PostgreSQL database')
    console.log('  2. Update your .env to use PostgreSQL URL')
    console.log('  3. Test your application')
    console.log('  4. Backup your SQLite file if needed')

  } catch (error) {
    console.error('❌ Migration failed:', error)
    throw error
  } finally {
    await postgresClient.$disconnect()
    await sqliteClient.$disconnect()
  }
}

// Run migration
migrateData()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })