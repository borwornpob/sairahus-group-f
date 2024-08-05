import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const body = await request.json()
  const { id, name, nickname } = body

  try {
    const existingFreshman = await prisma.freshman.findUnique({
      where: { id },
    })

    if (existingFreshman) {
      return NextResponse.json(
        { error: "A freshman with this ID already exists" },
        { status: 400 }
      )
    }

    const freshman = await prisma.freshman.create({
      data: {
        id,
        name,
        nickname,
      },
    })
    return NextResponse.json(freshman)
  } catch (error) {
    console.error("Error adding freshman:", error)
    return NextResponse.json(
      { error: "Failed to add freshman. Please try again." },
      { status: 500 }
    )
  }
}