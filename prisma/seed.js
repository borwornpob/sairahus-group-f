// prisma/seed.js
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function main() {
  await prisma.sophomore.createMany({
    data: [
      {
        name: "John Doe",
        nickname: "JD",
        clueForFreshman1: "Loves pizza and Star Wars",
        clueForFreshman2: "Plays guitar in a band",
        willTakeSecondFreshman: true,
        coSophomoreForFreshman2: "Jane Smith",
      },
      {
        name: "Jane Smith",
        nickname: "JS",
        clueForFreshman1: "Captain of the debate team",
        willTakeSecondFreshman: false,
      },
    ],
  })

  await prisma.freshman.createMany({
    data: [
      {
        name: "Alice",
        nickname: "A",
        id: "123",
      },
      {
        name: "Bob",
        nickname: "B",
        id: "456",
      },
      {
        name: "Charlie",
        nickname: "C",
        id: "789",
      },
    ],
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
