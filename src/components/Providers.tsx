'use client'

import { SessionProvider } from 'next-auth/react'
import { CustomSession } from '@/types/api'

interface ProvidersProps {
  children: React.ReactNode;
  session?: CustomSession | null;
}

export function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}