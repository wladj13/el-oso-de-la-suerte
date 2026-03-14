'use client';

import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progreso: number; // 0-100
  vendidos: number;
  total: number;
  className?: string;
  mostrarEtiqueta?: boolean;
  tamaño?: 'sm' | 'md' | 'lg';
}

export default function ProgressBar({
  progreso,
  vendidos,
  total,
  className,
  mostrarEtiqueta = true,
  tamaño = 'md',
}: ProgressBarProps) {
  const disponibles = total - vendidos;
  const color =
    progreso >= 90
      ? 'bg-red-500'
      : progreso >= 70
      ? 'bg-orange-400'
      : 'progress-bar-animated';

  const alturas = {
    sm: 'h-1.5',
    md: 'h-3',
    lg: 'h-4',
  };

  return (
    <div className={cn('w-full', className)}>
      {mostrarEtiqueta && (
        <div className="flex justify-between text-sm mb-1.5">
          <span className="text-gray-600">
            <span className="font-semibold text-[#228B22]">{vendidos}</span> vendidos
          </span>
          <span className="text-gray-500">
            <span className="font-semibold">{disponibles}</span> disponibles
          </span>
        </div>
      )}
      <div className={cn('w-full bg-gray-200 rounded-full overflow-hidden', alturas[tamaño])}>
        <div
          className={cn('h-full rounded-full transition-all duration-700', color)}
          style={{ width: `${Math.min(progreso, 100)}%` }}
        />
      </div>
      {mostrarEtiqueta && (
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{progreso}% completado</span>
          <span>{total} tickets totales</span>
        </div>
      )}
    </div>
  );
}
