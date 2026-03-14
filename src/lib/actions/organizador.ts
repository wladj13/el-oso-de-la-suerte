'use server';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/queries/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

function generarSlug(nombre: string): string {
  return nombre
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 40) + '-' + Date.now().toString(36);
}

export async function crearPerfilOrganizador(formData: FormData) {
  const user = await requireUser();

  const nombreNegocio = formData.get('nombreNegocio') as string;
  const whatsapp = formData.get('whatsapp') as string;
  const descripcion = formData.get('descripcion') as string;
  const instagram = formData.get('instagram') as string;
  const plan = (formData.get('plan') as string) ?? 'bronce';

  if (!nombreNegocio) throw new Error('El nombre del negocio es obligatorio');

  const slug = generarSlug(nombreNegocio);

  // Actualizar el rol del perfil
  await prisma.profile.update({
    where: { id: user.id },
    data: { rol: 'organizador' },
  });

  await prisma.organizador.create({
    data: {
      userId: user.id,
      nombreNegocio,
      slug,
      descripcion,
      whatsapp,
      instagram,
      plan: plan as 'bronce' | 'plata' | 'oro',
      planVenceEn: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días de prueba
    },
  });

  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function actualizarPerfilOrganizador(formData: FormData) {
  const user = await requireUser();

  const nombreNegocio = formData.get('nombreNegocio') as string;
  const whatsapp = formData.get('whatsapp') as string;
  const descripcion = formData.get('descripcion') as string;
  const instagram = formData.get('instagram') as string;

  await prisma.organizador.updateMany({
    where: { userId: user.id },
    data: { nombreNegocio, whatsapp, descripcion, instagram },
  });

  // Actualizar nombre en el perfil
  const nombre = formData.get('nombre') as string;
  if (nombre) {
    await prisma.profile.update({
      where: { id: user.id },
      data: { nombre },
    });
  }

  revalidatePath('/dashboard/configuracion');
}
