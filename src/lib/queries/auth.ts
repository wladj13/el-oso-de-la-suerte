import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function getCurrentUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  return user;
}

export async function getCurrentOrganizador() {
  const user = await getCurrentUser();
  if (!user) return null;

  return prisma.organizador.findUnique({
    where: { userId: user.id },
  });
}

export async function requireOrganizador() {
  const user = await requireUser();

  const organizador = await prisma.organizador.findUnique({
    where: { userId: user.id },
  });

  if (!organizador) redirect('/onboarding');
  return organizador;
}
