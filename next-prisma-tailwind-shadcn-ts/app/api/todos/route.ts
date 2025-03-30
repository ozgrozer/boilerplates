import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/lib/prisma'
import { todoSchema } from '@/lib/schemas'

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
    const body = await request.json()

    // Validate the request body using the shared schema
    const result = todoSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.format() },
        { status: 400 }
      )
    }

    const { title } = result.data

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
