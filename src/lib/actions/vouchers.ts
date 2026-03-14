'use server';

import { prisma } from '@/lib/prisma';
import { requireOrganizador } from '@/lib/queries/auth';
import { revalidatePath } from 'next/cache';

export async function aprobarVoucher(voucherId: string) {
  const organizador = await requireOrganizador();

  const voucher = await prisma.voucher.findFirst({
    where: {
      id: voucherId,
      rifa: { organizadorId: organizador.id },
    },
  });

  if (!voucher) throw new Error('Voucher no encontrado');

  await prisma.$transaction([
    // Aprobar el voucher
    prisma.voucher.update({
      where: { id: voucherId },
      data: { estado: 'aprobado' },
    }),
    // Marcar el ticket como pagado
    prisma.ticket.update({
      where: { id: voucher.ticketId },
      data: { estado: 'pagado', montoPagado: voucher.monto, metodoPago: voucher.metodoPago, compradoEn: new Date() },
    }),
    // Incrementar tickets_vendidos en la rifa
    prisma.rifa.update({
      where: { id: voucher.rifaId },
      data: { ticketsVendidos: { increment: 1 } },
    }),
  ]);

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/ventas');
}

export async function rechazarVoucher(voucherId: string, motivo: string) {
  const organizador = await requireOrganizador();

  const voucher = await prisma.voucher.findFirst({
    where: {
      id: voucherId,
      rifa: { organizadorId: organizador.id },
    },
  });

  if (!voucher) throw new Error('Voucher no encontrado');

  await prisma.$transaction([
    prisma.voucher.update({
      where: { id: voucherId },
      data: { estado: 'rechazado', notaRechazo: motivo },
    }),
    // Liberar el ticket de vuelta a disponible
    prisma.ticket.update({
      where: { id: voucher.ticketId },
      data: { estado: 'disponible', compradorId: null },
    }),
  ]);

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/ventas');
}
