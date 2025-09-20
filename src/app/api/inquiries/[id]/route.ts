import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json()
    
    // Resolve the params promise
    const resolvedParams = await params;
    
    const inquiry = await prisma.inquiry.update({
      where: { id: resolvedParams.id },
      data: {
        status: body.status
      }
    })

    return NextResponse.json(inquiry)
  } catch (error) {
    console.error('Error updating inquiry:', error)
    return NextResponse.json(
      { error: 'Failed to update inquiry' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Resolve the params promise
    const resolvedParams = await params;
    
    await prisma.inquiry.delete({
      where: { id: resolvedParams.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting inquiry:', error)
    return NextResponse.json(
      { error: 'Failed to delete inquiry' },
      { status: 500 }
    )
  }
}