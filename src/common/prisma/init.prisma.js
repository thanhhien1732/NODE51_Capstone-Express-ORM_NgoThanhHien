import { PrismaClient } from "../../../generated/prisma";

const prisma = new PrismaClient()

try {
    await prisma.$executeRaw`SELECT 1+1 AS result`
    console.log("PRISMA: \t Connection Successfully")
} catch (error) {
    console.error("PRISMA: \t Connection Error", error)
}

export default prisma