import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/lib/prisma'

export async function GET () {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(todos)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    )
  }
}

export async function POST (request: NextRequest) {
  try {
    const { title } = await request.json()

    if (!title || typeof title !== 'string') {
      return NextResponse.json(
        { error: 'Title is required and must be a string' },
        { status: 400 }
      )
    }

    const todo = await prisma.todo.create({
      data: { title }
    })

    return NextResponse.json(todo, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create todo' },
      { status: 500 }
    )
  }
}
