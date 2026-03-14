import { Metadata } from 'next';
import ManualClient from './ManualClient';

export const metadata: Metadata = {
  title: 'Manual de Usuario | El Oso de la Suerte',
  description:
    'Guía completa para participantes, organizadores y vendedores de El Oso de la Suerte. Aprende a comprar tickets, crear rifas y gestionar tu equipo.',
};

export default function ManualPage() {
  return <ManualClient />;
}
