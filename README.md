This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🍽️ Bhagwati Caterers - Vegetarian Catering Platform

A production-ready catering management system with admin dashboard, menu management, gallery, testimonials, and inquiry handling - all focused on pure vegetarian cuisine.

## 🚀 Features

- **Admin Dashboard**: Full-featured admin panel with role-based access control
- **Menu Management**: Comprehensive vegetarian menu with categorization
- **Gallery System**: Image management with categories and tags
- **Inquiry Management**: Customer inquiry tracking with status workflow
- **Testimonials**: Customer review management
- **Packages**: Catering package management
- **SEO Optimized**: Structured data, sitemaps, and meta tags
- **Mobile Responsive**: Fully responsive design
- **PWA Support**: Installable web application
- **WhatsApp Integration**: Direct customer communication
- **Email Notifications**: Automated email system
- **Analytics Dashboard**: Business insights and metrics

## 🛠️ Technology Stack

- **Frontend**: Next.js 15 with React Server Components
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (production) / SQLite (development)
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Deployment**: Vercel or any Node.js hosting
- **Email**: Nodemailer
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- PostgreSQL (for production) or SQLite (for development)

### Installation

```bash
# Clone the repository

git clone <repository-url>
cd caters-app

# Install dependencies
npm install

# Set up environment variables

cp .env.example .env
# Edit .env with your configuration

# For PostgreSQL setup:
npm run db:setup

# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Seed database with initial data
npm run db:seed

# Start development server
npm run dev
```

### Database Options

1. **SQLite (Development)**: Quick start, no setup required
2. **PostgreSQL (Production)**: Production-ready with better performance

See [POSTGRESQL_MIGRATION.md](POSTGRESQL_MIGRATION.md) for detailed PostgreSQL setup instructions.

## 🌐 Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/database"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Email Configuration
EMAIL_FROM="your-email@example.com"
EMAIL_USER="your-email@example.com"
EMAIL_PASS="your-app-password"
EMAIL_TO="admin@example.com"

# WhatsApp
WHATSAPP_NUMBER="+1234567890"
NEXT_PUBLIC_WHATSAPP_NUMBER="+1234567890"

# Admin Credentials
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="secure-password"
```

## 📚 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database
- `npm run db:studio` - Open Prisma Studio
- `npm run db:setup` - Setup PostgreSQL
- `npm run migrate:postgres` - Migrate from SQLite to PostgreSQL

## 🚢 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📖 Documentation

- [POSTGRESQL_MIGRATION.md](POSTGRESQL_MIGRATION.md) - PostgreSQL migration guide
- [PWA_DOCUMENTATION.md](PWA_DOCUMENTATION.md) - PWA features and setup
- [RBAC_DOCUMENTATION.md](RBAC_DOCUMENTATION.md) - Role-based access control

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary to Bhagwati Caterers.

## 🆘 Support

For support, please contact the development team or check the documentation files.
