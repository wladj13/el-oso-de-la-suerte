import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'El Oso de la Suerte | Tu suerte tiene nombre',
    template: '%s | El Oso de la Suerte',
  },
  description:
    'La plataforma híbrida de rifas más transparente de Venezuela. Participa en rifas verificadas o crea las tuyas. Sorteos en vivo, pagos con Zelle y Pago Móvil.',
  keywords: [
    'rifas Venezuela',
    'rifas online',
    'rifas Zelle',
    'rifas Pago Móvil',
    'organizar rifas',
    'marketplace rifas',
    'sorteos Venezuela',
    'El Oso de la Suerte',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_VE',
    siteName: 'El Oso de la Suerte',
    title: 'El Oso de la Suerte | Tu suerte tiene nombre',
    description: 'La plataforma híbrida de rifas más transparente de Venezuela.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.className}>
      <body className="antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
