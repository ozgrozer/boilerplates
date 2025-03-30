import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/lib/prisma'

export async function PATCH (
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const { completed, title } = await request.json()

    // Check if the todo exists
    const existingTodo = await prisma.todo.findUnique({
      where: { id }
    })

    if (!existingTodo) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
    }

    // Update the todo
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(completed !== undefined && { completed })
      }
    })

    return NextResponse.json(updatedTodo)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update todo' },
      { status: 500 }
    )
  }
}

export async function DELETE (
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Check if the todo exists
    const existingTodo = await prisma.todo.findUnique({
      where: { id }
    })

    if (!existingTodo) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
    }

    // Delete the todo
    await prisma.todo.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete todo' },
      { status: 500 }
    )
  }
}
