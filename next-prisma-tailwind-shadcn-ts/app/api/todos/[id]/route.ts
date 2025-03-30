import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/lib/prisma'
import { todoSchema } from '@/lib/schemas'

export async function PATCH (
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const resolvedParams = await params
    const id = resolvedParams.id
    const body = await request.json()
    const { completed } = body

    // Check if the todo exists
    const existingTodo = await prisma.todo.findUnique({
      where: { id }
    })

    if (!existingTodo) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
    }

    // If title is being updated, validate it with the schema
    let title = undefined
    if (body.title !== undefined) {
      const result = todoSchema.pick({ title: true }).safeParse(body)
      if (!result.success) {
        return NextResponse.json(
          { error: result.error.format() },
          { status: 400 }
        )
      }
      title = result.data.title
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
    const resolvedParams = await params
    const id = resolvedParams.id

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
