import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const adminUser = await prisma.usuario.create({
    data: {
      correo: 'admin@admin.com',
      rol: 'ADMIN',
      contrasena:
        '$2b$10$ecDN9e.A/76JuRNtCai93.Gc8CGmtfQSza1ZAUkwzMGbr7pCKu1sS',
    },
  });

  const personaDB = await prisma.persona.create({
    data: {
      nombre: 'Dante Emanuel',
      apellido: 'Arias Tarifa',
      correoPersonal: 'danteariastarifa@gmail.com',
      nroDocumento: '12755611',
      telefono: '65811117',
    },
  });

  const id: string = personaDB.id;

  await prisma.usuario.create({
    data: {
      correo: 'tj.dante.arias.t@etc.edu.bo',
      contrasena:
        '$2b$10$ecDN9e.A/76JuRNtCai93.Gc8CGmtfQSza1ZAUkwzMGbr7pCKu1sS',
      rol: 'ESTUDIANTE',
      id,
    },
  });

  await prisma.estudiante.create({
    data: {
      id: id as any,
    },
  });

  /*  await prisma.estudiante.create({
    data: {
      persona: {
        create: {
        
        },
      },
      usuario: {
        create: {
          correo: 'tj.dante.arias.t@etc.edu.bo',
          rol: 'ESTUDIANTE',
          contrasena:
            '$2b$10$ecDN9e.A/76JuRNtCai93.Gc8CGmtfQSza1ZAUkwzMGbr7pCKu1sS',
        },
      },

    },
  }); */

  /*  await prisma.usuario.create({
    data: {
      correo: 'osmar@gmail.com',
      rol: 'DOCENTE',
      contrasena:
        '$2b$10$ecDN9e.A/76JuRNtCai93.Gc8CGmtfQSza1ZAUkwzMGbr7pCKu1sS',
    },
  }); */

  const personaDocenteDB = await prisma.persona.create({
    data: {
      nombre: 'Osmar ',
      apellido: 'Tito Ticona',
      correoPersonal: 'osmar@gmail.com',
      nroDocumento: '7745654',
      telefono: '65811117',
    },
  });

  const idDocente: string = personaDocenteDB.id;

  await prisma.usuario.create({
    data: {
      correo: 'tj.osmar.tito.t@etc.edu.bo',
      contrasena:
        '$2b$10$ecDN9e.A/76JuRNtCai93.Gc8CGmtfQSza1ZAUkwzMGbr7pCKu1sS',
      rol: 'DOCENTE',
      id: idDocente,
    },
  });

  await prisma.docente.create({
    data: {
      id: id as any,
    },
  });
  /*
  danteariastarifa@gmail.com
  $2b$10$PSehcUe.q2BxEO5yJIj.4O2uQC4KZ8aOhDVPk8./.NCRnu2qDM0la

  osmar@gmail.com
  $2b$10$qZebB/vrw60TSh11RClG/e34x36PtDh.1PvYJb.4h.67u.e9DycZO

  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      name: 'Bob',
      posts: {
        create: [
          {
            title: 'Follow Prisma on Twitter',
            content: 'https://twitter.com/prisma',
            published: true,
          },
          {
            title: 'Follow Nexus on Twitter',
            content: 'https://twitter.com/nexusgql',
            published: true,
          },
        ],
      },
    },
  })
  console.log({ alice, bob }) */
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
