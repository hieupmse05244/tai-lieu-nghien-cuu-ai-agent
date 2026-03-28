import { PrismaClient, RoleType } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const roles = [RoleType.ADMIN, RoleType.CONFIGURATOR, RoleType.USER];
  
  console.log('🌱 Seeding roles...');
  for (const role of roles) {
    const result = await prisma.role.upsert({
      where: { name: role },
      update: {},
      create: { name: role },
    });
    console.log(`- Role ${result.name} ready`);
  }

  // Create a default Admin
  const adminEmail = 'admin@docmgmt.com';
  const adminId = 'f001';
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword
    },
    create: {
      id: adminId,
      email: adminEmail,
      password: hashedPassword,
      roleId: (await prisma.role.findUnique({ where: { name: RoleType.ADMIN } }))!.id,
    }
  });
  console.log(`- Default Admin ${adminEmail} created with password: admin123`);

  console.log('✅ Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
