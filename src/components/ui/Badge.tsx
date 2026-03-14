import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variante?: 'activa' | 'finalizada' | 'sorteada' | 'borrador' | 'verificado' | 'destacada' | 'nueva';
  className?: string;
}

const variantes = {
  activa: 'bg-green-100 text-green-800 border border-green-200',
  finalizada: 'bg-gray-100 text-gray-700 border border-gray-200',
  sorteada: 'bg-purple-100 text-purple-800 border border-purple-200',
  borrador: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
  verificado: 'bg-blue-100 text-blue-800 border border-blue-200',
  destacada: 'bg-[#FFD700] text-[#1A1008] border border-[#E5C100]',
  nueva: 'bg-[#FFF8E7] text-[#8B4513] border border-[#8B4513]',
};

export default function Badge({ children, variante = 'nueva', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full',
        variantes[variante],
        className
      )}
    >
      {children}
    </span>
  );
}
