# PostgreSQL Migration Guide for Bhagwati Caterers

This guide will help you migrate from SQLite to PostgreSQL for production-grade deployment.

## Why PostgreSQL?

- **Production Ready**: Better performance, scalability, and reliability
- **ACID Compliance**: Full transaction support and data integrity
- **Advanced Features**: JSON support, full-text search, advanced indexing
- **Cloud Ready**: Supported by all major cloud providers
- **Concurrent Access**: Multiple users can access safely

## Quick Start Options

### Option 1: Local PostgreSQL (Development)

1. **Install PostgreSQL**:
   ```bash
   # Windows (using chocolatey)
   choco install postgresql
   
   # Or download from: https://www.postgresql.org/download/windows/
   ```

2. **Create Database**:
   ```bash
   # Connect to PostgreSQL
   psql -U postgres
   
   # Create database
   CREATE DATABASE bhagwati_caterers;
   \q
   ```

3. **Update Environment**:
   ```bash
   # Copy environment template
   cp .env.example .env
   
   # Update DATABASE_URL in .env with your actual PostgreSQL credentials
   # Example: DATABASE_URL="postgresql://your_username:your_password@localhost:5432/bhagwati_caterers"
   ```

### Option 2: Railway (Recommended for Production)

1. **Create Railway Account**: https://railway.app
2. **Create New Project** → Add PostgreSQL
3. **Copy Database URL** from Railway dashboard
4. **Update .env** with your actual Railway database URL:
   ```
   DATABASE_URL="postgresql://postgres:your_actual_password@your_project.railway.app:5432/railway"
   ```

### Option 3: Supabase (Free Tier Available)

1. **Create Supabase Account**: https://supabase.com
2. **Create New Project**
3. **Go to Settings** → Database → Connection String
4. **Update .env** with your actual Supabase connection string:
   ```
   DATABASE_URL="postgresql://postgres:your_actual_password@db.your_project_ref.supabase.co:5432/postgres"
   ```

## Migration Steps

### 1. Install Dependencies
```bash
npm install pg @types/pg
```

### 2. Update Database Configuration
```bash
# Generate Prisma client for PostgreSQL
npx prisma generate

# Create and run migration
npx prisma migrate dev --name init
```

### 3. Migrate Existing Data (Optional)
If you have existing SQLite data:
```bash
npm run migrate:postgres
```

### 4. Seed Database
```bash
npm run db:seed
```

### 5. Verify Migration
```bash
# Open Prisma Studio to verify data
npm run db:studio
```

## Environment Variables

Create `.env` file with your configuration:

```env
# Database - Replace with your actual PostgreSQL credentials
# Format: DATABASE_URL="postgresql://username:password@host:port/database_name"
DATABASE_URL="postgresql://your_username:your_password@localhost:5432/bhagwati_caterers"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Email Configuration
EMAIL_FROM="your-email@gmail.com"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
EMAIL_TO="admin@caterers.com"

# WhatsApp
WHATSAPP_NUMBER="+919057264895"
NEXT_PUBLIC_WHATSAPP_NUMBER="+919057264895"

# Admin Credentials
ADMIN_EMAIL="admin@caterers.com"
ADMIN_PASSWORD="admin123"
```

## Production Deployment

### Railway Deployment
1. Connect your GitHub repository to Railway
2. Add PostgreSQL addon
3. Set environment variables in Railway dashboard
4. Deploy automatically

### Vercel + Supabase
1. Connect repository to Vercel
2. Add Supabase PostgreSQL database
3. Configure environment variables in Vercel
4. Deploy

### Heroku
1. Create Heroku app
2. Add Heroku Postgres addon
3. Set environment variables
4. Deploy via Git

## Database Management Commands

```bash
# View database schema
npx prisma studio

# Create migration
npx prisma migrate dev --name migration_name

# Deploy migrations (production)
npx prisma migrate deploy

# Reset database (development only)
npx prisma migrate reset

# Seed database with sample data
npm run db:seed
```

## Performance Optimizations

### Database Indexes
The schema includes optimized indexes for:
- User email lookups
- Menu item categories
- Gallery image categories
- Inquiry status filtering
- Date-based queries

### Connection Pooling
For production, consider using:
- **Railway**: Built-in connection pooling
- **Supabase**: Built-in Supavisor pooling
- **PgBouncer**: For custom setups

### Environment-Specific Settings
```bash
# Development - Replace with your actual PostgreSQL credentials
DATABASE_URL="postgresql://your_username:your_password@localhost:5432/bhagwati_caterers"

# Production (with connection pooling) - Replace with your actual production credentials
DATABASE_URL="postgresql://your_username:your_password@host:5432/database?connection_limit=20&pool_timeout=20"
```

## Troubleshooting

### Common Issues

1. **Connection Failed**
   ```bash
   # Check PostgreSQL service
   net start postgresql-x64-13  # Windows
   sudo service postgresql start  # Linux
   ```

2. **Migration Errors**
   ```bash
   # Reset and retry
   npx prisma migrate reset
   npx prisma migrate dev
   ```

3. **Permission Denied**
   ```sql
   -- Grant permissions in PostgreSQL
   GRANT ALL PRIVILEGES ON DATABASE bhagwati_caterers TO postgres;
   ```

### Logs and Monitoring
- Enable query logging in production
- Monitor connection counts
- Set up database backups
- Configure alerting for errors

## Security Best Practices

1. **Use Environment Variables**: Never hardcode credentials
2. **Strong Passwords**: Use complex database passwords
3. **SSL Connections**: Enable SSL in production
4. **Limited Permissions**: Create specific database users
5. **Regular Backups**: Automated daily backups
6. **Connection Limits**: Prevent connection exhaustion

## Next Steps

After successful migration:
1. ✅ Test all application features
2. ✅ Verify admin panel functionality
3. ✅ Test menu management
4. ✅ Confirm gallery uploads
5. ✅ Validate inquiry system
6. ✅ Check email notifications
7. ✅ Set up monitoring
8. ✅ Configure backups
9. ✅ Update documentation
10. ✅ Deploy to production

Need help? Check the [Prisma PostgreSQL Guide](https://www.prisma.io/docs/concepts/database-connectors/postgresql)