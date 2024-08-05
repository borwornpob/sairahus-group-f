import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const body = await request.json()
  const {
    name,
    nickname,
    clueForFreshman1,
    clueForFreshman2,
    willTakeSecondFreshman,
    id,
  } = body

  try {
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
      { error: "Failed to add sophomore" },
      { status: 500 }
    )
  }
}
