import { prisma } from '@/lib/prisma';

export async function getRifasByOrganizador(organizadorId: string) {
  return prisma.rifa.findMany({
    where: { organizadorId },
    include: {
      premios: { orderBy: { posicion: 'asc' } },
      _count: { select: { tickets: true, vouchers: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getRifaById(id: string, organizadorId: string) {
  return prisma.rifa.findFirst({
    where: { id, organizadorId },
    include: {
      premios: { orderBy: { posicion: 'asc' } },
      tickets: { orderBy: { numero: 'asc' } },
      vouchers: {
        include: {
          comprador: { select: { nombre: true, email: true, whatsapp: true } },
          ticket: { select: { numero: true } },
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  });
}

export async function getRifasPublicas() {
  return prisma.rifa.findMany({
    where: { estado: 'activa' },
    include: {
      organizador: {
        select: { nombreNegocio: true, logoUrl: true, kycVerificado: true, slug: true },
      },
      premios: { where: { posicion: 1 } },
    },
    orderBy: { createdAt: 'desc' },
  });
}
