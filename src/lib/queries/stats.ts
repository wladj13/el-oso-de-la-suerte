import { prisma } from '@/lib/prisma';

export async function getDashboardStats(organizadorId: string) {
  const [
    rifasActivas,
    totalRifas,
    vouchersPendientes,
    ticketsStats,
    ventasHoy,
    vendedoresActivos,
  ] = await Promise.all([
    // Rifas activas
    prisma.rifa.count({
      where: { organizadorId, estado: 'activa' },
    }),

    // Total de rifas
    prisma.rifa.count({ where: { organizadorId } }),

    // Vouchers pendientes de aprobar
    prisma.voucher.count({
      where: {
        rifa: { organizadorId },
        estado: 'pendiente',
      },
    }),

    // Tickets pagados + ingresos totales
    prisma.ticket.aggregate({
      where: {
        rifa: { organizadorId },
        estado: 'pagado',
      },
      _count: true,
      _sum: { montoPagado: true },
    }),

    // Tickets vendidos hoy
    prisma.ticket.count({
      where: {
        rifa: { organizadorId },
        estado: 'pagado',
        compradoEn: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
      },
    }),

    // Vendedores activos
    prisma.vendedor.count({
      where: { organizadorId, activo: true },
    }),
  ]);

  return {
    rifasActivas,
    totalRifas,
    vouchersPendientes,
    ticketsVendidos: ticketsStats._count,
    ingresosTotales: Number(ticketsStats._sum.montoPagado ?? 0),
    ventasHoy,
    vendedoresActivos,
  };
}

export async function getVentasRecientes(organizadorId: string, limit = 10) {
  return prisma.voucher.findMany({
    where: { rifa: { organizadorId } },
    include: {
      comprador: { select: { nombre: true, email: true } },
      rifa: { select: { titulo: true } },
      ticket: { select: { numero: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}
