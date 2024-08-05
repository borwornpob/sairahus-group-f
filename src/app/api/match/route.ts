import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const { freshmanId } = (await request.json()) as { freshmanId: string }

  // Check if the freshman is already matched
  const existingMatch = await prisma.sophomore.findFirst({
    where: {
      OR: [{ freshman1: freshmanId }, { freshman2: freshmanId }],
    },
    select: {
      id: true,
      clueForFreshman1: true,
      clueForFreshman2: true,
      freshman1: true,
      freshman2: true,
    },
  })

  if (existingMatch) {
    // Determine which freshman slot this freshman occupies
    const isFirstFreshman = existingMatch.freshman1 === freshmanId
    const clue = isFirstFreshman
      ? existingMatch.clueForFreshman1
      : existingMatch.clueForFreshman2

    return NextResponse.json({
      matched: true,
      sophomoreId: existingMatch.id,
      clue,
      isExistingMatch: true,
    })
  }

  // If no existing match, proceed with the original matching logic
  const availableSophomore = await prisma.sophomore.findFirst({
    where: {
      freshman1: null,
    },
    select: {
      id: true,
      clueForFreshman1: true,
    },
  })

  if (availableSophomore) {
    await prisma.sophomore.update({
      where: { id: availableSophomore.id },
      data: { freshman1: freshmanId },
    })

    return NextResponse.json({
      matched: true,
      sophomoreId: availableSophomore.id,
      clue: availableSophomore.clueForFreshman1,
      isExistingMatch: false,
    })
  } else {
    const availableSophomoreForSecond = await prisma.sophomore.findFirst({
      where: {
        freshman2: null,
        willTakeSecondFreshman: true,
      },
      select: {
        id: true,
        clueForFreshman2: true,
      },
    })

    if (
      availableSophomoreForSecond &&
      availableSophomoreForSecond.clueForFreshman2
    ) {
      await prisma.sophomore.update({
        where: { id: availableSophomoreForSecond.id },
        data: { freshman2: freshmanId },
      })

      return NextResponse.json({
        matched: true,
        sophomoreId: availableSophomoreForSecond.id,
        clue: availableSophomoreForSecond.clueForFreshman2,
        isExistingMatch: false,
      })
    } else {
      return NextResponse.json({ matched: false })
    }
  }
}
