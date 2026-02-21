import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
    const email = "admin@seranex.org";
    const password = "Seranex@Admin2026"; // temporary password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.upsert({
        where: { email },
        update: {
            password: hashedPassword,
            role: "ADMIN"
        },
        create: {
            email,
            password: hashedPassword,
            name: "Super Admin",
            role: "ADMIN"
        },
    });

    console.log(`Admin user created/updated: ${user.email}`);
    console.log(`Password: ${password}`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
