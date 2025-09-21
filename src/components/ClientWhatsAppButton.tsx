'use client'

import { usePathname } from 'next/navigation'
import WhatsAppButton from '@/components/WhatsAppButton'

const ClientWhatsAppButton = () => {
  const pathname = usePathname()

  // Don&apos;t show WhatsApp button on admin pages
  if (pathname.startsWith('/admin')) {
    return null
  }

  return <WhatsAppButton />
}

export default ClientWhatsAppButton