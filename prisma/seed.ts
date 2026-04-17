import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "generated/prisma/client";
import * as bcrypt from 'bcrypt';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    const admin = await prisma.user.upsert({
        where:{email: "admin.bank@gmail.com"},
        update: {},
        create: {
            name: "Admin",
            email: "admin.bank@gmail.com",
            password: await bcrypt.hash("password", 10)
        }
    })

    console.log({ admin });

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });