import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const body = await request.json()
  const {
    id,
    name,
    nickname,
    clueForFreshman1,
    clueForFreshman2,
    willTakeSecondFreshman,
  } = body

  try {
    const existingSophomore = await prisma.sophomore.findUnique({
      where: { id },
    })

    if (existingSophomore) {
      return NextResponse.json(
        { error: "A sophomore with this ID already exists" },
        { status: 400 }
      )
    }

    const sophomore = await prisma.sophomore.create({
      data: {
        id,
        name,
        nickname,
        clueForFreshman1,
        clueForFreshman2,
        willTakeSecondFreshman,
      },
    })
    return NextResponse.json(sophomore)
  } catch (error) {
    console.error("Error adding sophomore:", error)
    return NextResponse.json(
      { error: "Failed to add sophomore. Please try again." },
      { status: 500 }
    )
  }
}
