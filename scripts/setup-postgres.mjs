#!/usr/bin/env node
/**
 * PostgreSQL Setup Helper Script
 * 
 * This script helps set up PostgreSQL for the Bhagwati Caterers application.
 * It checks for PostgreSQL installation and provides setup instructions.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function checkPostgreSQL() {
  try {
    // Check if PostgreSQL is installed and accessible
    const result = execSync('psql --version', { encoding: 'utf8' });
    console.log('✅ PostgreSQL is installed:', result.trim());
    return true;
  } catch {
    console.log('⚠️  PostgreSQL is not installed or not in PATH');
    return false;
  }
}

function checkPostgreSQLService() {
  try {
    // Try to connect to PostgreSQL
    execSync('pg_isready', { stdio: 'ignore' });
    console.log('✅ PostgreSQL service is running');
    return true;
  } catch {
    console.log('⚠️  PostgreSQL service is not running');
    return false;
  }
}

function createDatabase() {
  try {
    // Try to create the database
    execSync('createdb bhagwati_caterers', { stdio: 'inherit' });
    console.log('✅ Database "bhagwati_caterers" created successfully');
    return true;
  } catch (error) {
    if (error.message.includes('already exists')) {
      console.log('ℹ️  Database "bhagwati_caterers" already exists');
      return true;
    } else {
      console.log('⚠️  Failed to create database:', error.message);
      return false;
    }
  }
}

function setupPostgreSQL() {
  console.log('🚀 Setting up PostgreSQL for Bhagwati Caterers...\n');

  // Check if PostgreSQL is installed
  const isInstalled = checkPostgreSQL();
  if (!isInstalled) {
    console.log('\n🔧 Please install PostgreSQL first:');
    console.log('   Windows: https://www.postgresql.org/download/windows/');
    console.log('   macOS: brew install postgresql');
    console.log('   Ubuntu: sudo apt install postgresql postgresql-contrib\n');
    return;
  }

  // Check if PostgreSQL service is running
  const isRunning = checkPostgreSQLService();
  if (!isRunning) {
    console.log('\n🔧 Please start PostgreSQL service:');
    console.log('   Windows: net start postgresql-x64-13');
    console.log('   macOS: brew services start postgresql');
    console.log('   Ubuntu: sudo service postgresql start\n');
    return;
  }

  // Create database
  const dbCreated = createDatabase();
  if (!dbCreated) {
    console.log('\n❌ Failed to create database. Please check PostgreSQL setup.');
    return;
  }

  // Update .env file if it exists
  const envPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    if (envContent.includes('DATABASE_URL="file:./dev.db"')) {
      const updatedContent = envContent.replace(
        'DATABASE_URL="file:./dev.db"',
        'DATABASE_URL="postgresql://postgres:your_password@localhost:5432/bhagwati_caterers"'
      );
      fs.writeFileSync(envPath, updatedContent);
      console.log('✅ Updated .env file with PostgreSQL connection string');
    }
  } else {
    console.log('ℹ️  .env file not found. Please create one with PostgreSQL connection string:');
    console.log('   DATABASE_URL="postgresql://postgres:your_password@localhost:5432/bhagwati_caterers"');
  }

  console.log('\n🎉 PostgreSQL setup completed!');
  console.log('\n📝 Next steps:');
  console.log('   1. Update your .env file with correct PostgreSQL credentials');
  console.log('   2. Run: npx prisma generate');
  console.log('   3. Run: npx prisma migrate dev --name init');
  console.log('   4. Run: npm run db:seed');
  console.log('   5. Run: npm run dev');
}

// Run setup
setupPostgreSQL();