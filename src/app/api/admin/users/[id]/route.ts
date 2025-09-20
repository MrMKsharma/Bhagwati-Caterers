import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { checkPermission } from '@/lib/auth-helpers'

// GET - Get specific user
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const permissionCheck = await checkPermission(request, 'users', 'read')
  
  if (!permissionCheck.authorized) {
    return permissionCheck.response
  }

  try {
    const { id } = await params

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true
        // Don't return password
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}

// PATCH - Update user
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const permissionCheck = await checkPermission(request, 'users', 'update')
  
  if (!permissionCheck.authorized) {
    return permissionCheck.response
  }

  try {
    const { id } = await params
    const { session, userRole } = permissionCheck

    // Only admins can update other users, users can update themselves
    const currentUser = session!.user as any
    if (userRole !== 'admin' && currentUser.id !== id) {
      return NextResponse.json(
        { error: 'Unauthorized - Insufficient permissions' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { name, email, password, role } = body

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id }
    })

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Prepare update data
    const updateData: any = {}
    
    if (name !== undefined) updateData.name = name
    if (email !== undefined) {
      // Check if email is already taken by another user
      const emailExists = await prisma.user.findFirst({
        where: {
          email,
          id: { not: id }
        }
      })
      
      if (emailExists) {
        return NextResponse.json(
          { error: 'Email already taken by another user' },
          { status: 409 }
        )
      }
      
      updateData.email = email
    }
    
    // Only admins can change roles
    if (role !== undefined && userRole === 'admin') {
      updateData.role = role
    }
    
    // Hash new password if provided
    if (password && password.length >= 6) {
      updateData.password = await bcrypt.hash(password, 10)
    }

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true
        // Don't return password
      }
    })

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
}

// DELETE - Delete user
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const permissionCheck = await checkPermission(request, 'users', 'delete')
  
  if (!permissionCheck.authorized) {
    return permissionCheck.response
  }

  try {
    const { id } = await params

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id }
    })

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Prevent deletion of the last admin
    if (existingUser.role === 'admin') {
      const adminCount = await prisma.user.count({
        where: { role: 'admin' }
      })
      
      if (adminCount <= 1) {
        return NextResponse.json(
          { error: 'Cannot delete the last administrator account' },
          { status: 400 }
        )
      }
    }

    await prisma.user.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    )
  }
}