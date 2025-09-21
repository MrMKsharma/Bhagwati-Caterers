'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Header from '@/components/Header'

const ClientHeader = () => {
  const pathname = usePathname()
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  // Don't render until mounted to prevent hydration mismatch
  if (!hasMounted) {
    return null
  }

  // Don't show header on admin pages
  if (pathname.startsWith('/admin')) {
    return null
  }

  return <Header />
}

export default ClientHeader