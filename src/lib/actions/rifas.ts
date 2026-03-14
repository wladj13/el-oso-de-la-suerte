'use server';

import { prisma } from '@/lib/prisma';
import { requireOrganizador } from '@/lib/queries/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

function generarSlug(titulo: string): string {
  return titulo
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60) + '-' + Date.now().toString(36);
}

export async function crearRifa(formData: FormData) {
  const organizador = await requireOrganizador();

  const titulo = formData.get('titulo') as string;
  const descripcion = formData.get('descripcion') as string;
  const precioTicket = parseFloat(formData.get('precioTicket') as string);
  const totalTickets = parseInt(formData.get('totalTickets') as string);
  const categoria = formData.get('categoria') as string;
  const fechaSorteoStr = formData.get('fechaSorteo') as string;
  const metodosPago = formData.getAll('metodosPago') as string[];
  const premiosRaw = formData.get('premios') as string;

  if (!titulo || !precioTicket || !totalTickets) {
    throw new Error('Faltan campos obligatorios');
  }

  const slug = generarSlug(titulo);

  const rifa = await prisma.rifa.create({
    data: {
      organizadorId: organizador.id,
      titulo,
      descripcion,
      precioTicket,
      totalTickets,
      categoria,
      slug,
      metodosPago,
      fechaSorteo: fechaSorteoStr ? new Date(fechaSorteoStr) : null,
      estado: 'borrador',
    },
  });

  // Crear premios si se pasaron
  if (premiosRaw) {
    const premios = JSON.parse(premiosRaw) as { descripcion: string; posicion: number }[];
    await prisma.premio.createMany({
      data: premios.map((p) => ({ ...p, rifaId: rifa.id })),
    });
  }

  revalidatePath('/dashboard/rifas');
  redirect(`/dashboard/rifas`);
}

export async function actualizarEstadoRifa(rifaId: string, estado: 'activa' | 'pausada' | 'finalizada' | 'cancelada') {
  const organizador = await requireOrganizador();

  await prisma.rifa.updateMany({
    where: { id: rifaId, organizadorId: organizador.id },
    data: { estado },
  });

  revalidatePath('/dashboard/rifas');
}

export async function eliminarRifa(rifaId: string) {
  const organizador = await requireOrganizador();

  await prisma.rifa.deleteMany({
    where: { id: rifaId, organizadorId: organizador.id, estado: 'borrador' },
  });

  revalidatePath('/dashboard/rifas');
}
