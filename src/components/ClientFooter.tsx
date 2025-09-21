'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Footer from '@/components/Footer'

const ClientFooter = () => {
  const pathname = usePathname()
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  // Don't render until mounted to prevent hydration mismatch
  if (!hasMounted) {
    return null
  }

  // Don't show footer on admin pages
  if (pathname.startsWith('/admin')) {
    return null
  }

  return <Footer />
}

export default ClientFooter