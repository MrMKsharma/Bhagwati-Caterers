import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { checkPermission } from '@/lib/auth-helpers'
import { CreateUserRequest, UserResponse, ApiErrorResponse } from '@/types/api'

// GET - Get all users
export async function GET() {
  const permissionCheck = await checkPermission(new Request('http://localhost'), 'users', 'read')
  
  if (!permissionCheck.authorized) {
    return permissionCheck.response!
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true
        // Don't return password
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ users })
  } catch (error: unknown) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

// POST - Create new user
export async function POST(request: Request): Promise<NextResponse<{ user: UserResponse } | ApiErrorResponse>> {
  const permissionCheck = await checkPermission(request, 'users', 'create')
  
  if (!permissionCheck.authorized) {
    return permissionCheck.response! as NextResponse<ApiErrorResponse>
  }

  try {
    const body: CreateUserRequest = await request.json()
    const { name, email, password, role } = body

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role
      },
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

    return NextResponse.json({ user }, { status: 201 })
  } catch (error: unknown) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}