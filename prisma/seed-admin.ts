import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seedAdmin() {
    const email = "info@seranex.org";
    const password = "chithila123@";
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.upsert({
        where: { email },
        update: {
            password: hashedPassword,
            role: "ADMIN",
            name: "Seranex Admin",
        },
        create: {
            email,
            password: hashedPassword,
            role: "ADMIN",
            name: "Seranex Admin",
        },
    });

    console.log(`Admin user created/updated: ${user.email} (role: ${user.role})`);
}

seedAdmin()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
