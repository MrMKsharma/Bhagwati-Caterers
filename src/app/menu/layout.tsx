import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Catering Menu - Bhagwati Caterers',
  description: 'Browse our complete catering menu featuring appetizers, main courses, and desserts. Fresh ingredients, authentic flavors, and customizable options for your event.',
  keywords: ['catering menu', 'food menu', 'appetizers', 'main course', 'desserts', 'vegetarian', 'Bhagwati Caterers'],
  openGraph: {
    title: 'Catering Menu - Bhagwati Caterers',
    description: 'Browse our complete catering menu with fresh, delicious options',
    images: ['/images/menu-og.jpg'],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://bhagwati-caterers.com'}/menu`,
  },
}

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}