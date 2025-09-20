import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET - Fetch active packages for public display
export async function GET() {
  try {
    const packages = await prisma.package.findMany({
      where: { isActive: true },
      orderBy: { pricePerPerson: 'asc' }
    })

    return NextResponse.json({ packages })
  } catch (error) {
    console.error('Packages fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch packages' },
      { status: 500 }
    )
  }
}