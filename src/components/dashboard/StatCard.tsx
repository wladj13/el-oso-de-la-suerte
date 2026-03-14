import { cn } from '@/lib/utils';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  titulo: string;
  valor: string;
  subvalor?: string;
  cambio?: number; // porcentaje, positivo o negativo
  icono: string | LucideIcon;
  color?: 'brown' | 'gold' | 'green' | 'blue' | 'red' | 'purple';
  descripcion?: string;
  className?: string;
}

const colores = {
  brown: {
    bg: 'bg-[#FFF8E7]',
    border: 'border-[#FFD700]/20',
    icono: 'bg-[#8B4513] text-white',
    valor: 'text-[#8B4513]',
  },
  gold: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-100',
    icono: 'bg-[#FFD700] text-[#1A1008]',
    valor: 'text-yellow-700',
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-green-100',
    icono: 'bg-[#228B22] text-white',
    valor: 'text-[#228B22]',
  },
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    icono: 'bg-blue-600 text-white',
    valor: 'text-blue-700',
  },
  red: {
    bg: 'bg-red-50',
    border: 'border-red-100',
    icono: 'bg-red-500 text-white',
    valor: 'text-red-600',
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-100',
    icono: 'bg-purple-600 text-white',
    valor: 'text-purple-700',
  },
};

export default function StatCard({
  titulo,
  valor,
  subvalor,
  cambio,
  icono,
  color = 'brown',
  descripcion,
  className,
}: StatCardProps) {
  const c = colores[color];
  const IconoComp = typeof icono !== 'string' ? icono : null;

  return (
    <div
      className={cn(
        'bg-white rounded-2xl p-6 border shadow-sm hover:shadow-md transition-all',
        c.border,
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        {/* Icono */}
        <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0', c.icono)}>
          {typeof icono === 'string' ? icono : IconoComp && <IconoComp size={20} />}
        </div>

        {/* Cambio porcentual */}
        {cambio !== undefined && (
          <div
            className={cn(
              'flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full',
              cambio > 0
                ? 'bg-green-50 text-green-600'
                : cambio < 0
                ? 'bg-red-50 text-red-500'
                : 'bg-gray-50 text-gray-400'
            )}
          >
            {cambio > 0 ? (
              <TrendingUp size={11} />
            ) : cambio < 0 ? (
              <TrendingDown size={11} />
            ) : (
              <Minus size={11} />
            )}
            {cambio > 0 ? '+' : ''}{cambio}%
          </div>
        )}
      </div>

      <div className="space-y-0.5">
        <div className={cn('text-3xl font-black leading-none', c.valor)}>{valor}</div>
        {subvalor && <div className="text-sm text-gray-500">{subvalor}</div>}
        <div className="text-xs text-gray-400 pt-1">{titulo}</div>
        {descripcion && <div className="text-xs text-gray-400">{descripcion}</div>}
      </div>
    </div>
  );
}
