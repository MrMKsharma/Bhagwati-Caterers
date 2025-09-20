'use client'

import { usePathname } from 'next/navigation'
import Footer from '@/components/Footer'

const ClientFooter = () => {
  const pathname = usePathname()

  // Don't show footer on admin pages
  if (pathname.startsWith('/admin')) {
    return null
  }

  return <Footer />
}

export default ClientFooter