import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientHeader from "@/components/ClientHeader";
import ClientFooter from "@/components/ClientFooter";
import ClientWhatsAppButton from "@/components/ClientWhatsAppButton";
import { Providers } from "@/components/Providers";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import InstallPrompt from "@/components/InstallPrompt";
import OfflineIndicator from "@/components/OfflineIndicator";
import MobileOptimizations from "@/components/MobileOptimizations";
import RegionalGraphics from "@/components/RegionalGraphics";
import ClientOnlyWrapper from "@/components/ClientOnlyWrapper";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://bhagwati-caterers.com'),
  title: {
    default: "Bhagwati Caterers - Pure Vegetarian Catering Services",
    template: "%s | Bhagwati Caterers"
  },
  description: "Pure vegetarian catering services for weddings, corporate events, parties and all special occasions. Authentic vegetarian cuisine, exceptional service, and memorable experiences tailored to your needs.",
  keywords: [
    "vegetarian catering",
    "pure vegetarian food",
    "veg catering services",
    "wedding catering", 
    "corporate catering",
    "event catering",
    "party catering",
    "professional catering",
    "food service",
    "bhagwati caterers",
    "premium catering",
    "catering company"
  ],
  authors: [{ name: "Bhagwati Caterers" }],
  creator: "Bhagwati Caterers",
  publisher: "Bhagwati Caterers",
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Bhagwati Caterers",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/icons/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/icon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/icon-152x152.png', sizes: '152x152' },
      { url: '/icons/icon-192x192.png', sizes: '180x180' },
    ],
    shortcut: '/favicon.ico',
    other: [
      {
        rel: 'mask-icon',
        url: '/icons/safari-pinned-tab.svg',
        color: '#ea580c',
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://bhagwati-caterers.com',
    siteName: "Bhagwati Caterers",
    title: "Bhagwati Caterers - Pure Vegetarian Catering Services",
    description: "Pure vegetarian catering services for weddings, corporate events, parties and all special occasions. Authentic vegetarian cuisine, exceptional service.",
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Bhagwati Caterers - Premium Catering Services',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@bhagwaticaterers",
    creator: "@bhagwaticaterers",
    title: "Bhagwati Caterers - Pure Vegetarian Catering Services",
    description: "Pure vegetarian catering services for all your special events",
    images: ['/images/twitter-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
    other: {
      'msvalidate.01': 'your-bing-verification-code',
    },
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL || 'https://bhagwati-caterers.com',
    languages: {
      'en-US': process.env.NEXT_PUBLIC_BASE_URL || 'https://bhagwati-caterers.com',
    },
  },
  category: 'food and drink',
  other: {
    'application-name': 'Bhagwati Caterers',
    'mobile-web-app-capable': 'yes',
    'msapplication-config': '/browserconfig.xml',
    'msapplication-TileColor': '#ea580c',
    'msapplication-tap-highlight': 'no',
    'theme-color': '#ea580c',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ServiceWorkerRegistration />
          <MobileOptimizations />
          <ClientOnlyWrapper>
            <OfflineIndicator />
            <InstallPrompt />
          </ClientOnlyWrapper>
          <div className="flex flex-col min-h-screen relative">
            <RegionalGraphics />
            {/* Main site navigation - will be hidden on admin pages via Client Components */}
            <ClientHeader />
            <main className="flex-grow relative z-10">
              {children}
            </main>
            <ClientFooter />
            <ClientWhatsAppButton />
          </div>
        </Providers>
      </body>
    </html>
  );
}