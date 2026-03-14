import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formatear porcentaje de progreso de una rifa
export function calcularProgreso(vendidos: number, total: number): number {
  return Math.round((vendidos / total) * 100);
}

// Formatear precio en USD
export function formatearPrecio(precio: number, moneda: 'USD' | 'VES' = 'USD'): string {
  if (moneda === 'USD') {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(precio);
  }
  return new Intl.NumberFormat('es-VE', {
    style: 'currency',
    currency: 'VES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(precio);
}

// Calcular días restantes para el sorteo
export function diasRestantes(fechaSorteo: Date): number {
  const hoy = new Date();
  const diff = fechaSorteo.getTime() - hoy.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

// Formatear fecha en español
export function formatearFecha(fecha: Date): string {
  return new Intl.DateTimeFormat('es-VE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(fecha);
}

// Tickets disponibles
export function ticketsDisponibles(total: number, vendidos: number): number {
  return total - vendidos;
}

// Truncar texto
export function truncarTexto(texto: string, maxLength: number): string {
  if (texto.length <= maxLength) return texto;
  return texto.substring(0, maxLength) + '...';
}
