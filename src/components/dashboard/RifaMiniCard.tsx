import Link from 'next/link';
import { Clock, Eye, TrendingUp } from 'lucide-react';
import { Rifa } from '@/lib/types';
import { calcularProgreso, diasRestantes, formatearPrecio } from '@/lib/utils';
import ProgressBar from '@/components/ui/ProgressBar';

interface RifaMiniCardProps {
  rifa: Rifa;
  acciones?: boolean;
}

const estadoLabels: Record<string, { label: string; color: string }> = {
  activa: { label: 'Activa', color: 'bg-green-100 text-green-700' },
  borrador: { label: 'Borrador', color: 'bg-yellow-100 text-yellow-700' },
  finalizada: { label: 'Finalizada', color: 'bg-gray-100 text-gray-600' },
  sorteada: { label: 'Sorteada', color: 'bg-purple-100 text-purple-700' },
};

export default function RifaMiniCard({ rifa, acciones = true }: RifaMiniCardProps) {
  const progreso = calcularProgreso(rifa.ticketsVendidos, rifa.totalTickets);
  const dias = diasRestantes(rifa.fechaSorteo);
  const estado = estadoLabels[rifa.estado] ?? estadoLabels.activa;
  const gananciaEstimada = rifa.ticketsVendidos * rifa.precioTicket;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-[#FFD700]/30 hover:shadow-md transition-all group">
      <div className="flex items-start gap-4">
        {/* Thumbnail emoji */}
        <div className="w-14 h-14 bg-[#FFF8E7] rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 border border-[#FFD700]/20">
          {rifa.categoria === 'electronica' ? '📱' :
           rifa.categoria === 'vehiculos' ? '🚗' :
           rifa.categoria === 'dinero' ? '💵' : '🎁'}
        </div>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-black text-gray-900 text-sm leading-tight truncate group-hover:text-[#8B4513] transition-colors">
              {rifa.nombre}
            </h3>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${estado.color}`}>
              {estado.label}
            </span>
          </div>

          {/* Stats rápidos */}
          <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {dias === 0 ? 'Hoy' : `${dias}d`}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={11} />
              {rifa.vistas.toLocaleString()}
            </span>
            <span className="flex items-center gap-1 text-[#228B22] font-semibold">
              <TrendingUp size={11} />
              {formatearPrecio(gananciaEstimada)}
            </span>
          </div>

          {/* Progreso */}
          <ProgressBar
            progreso={progreso}
            vendidos={rifa.ticketsVendidos}
            total={rifa.totalTickets}
            tamaño="sm"
            mostrarEtiqueta={false}
            className="mb-1"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>{rifa.ticketsVendidos}/{rifa.totalTickets} tickets</span>
            <span className="font-bold text-[#8B4513]">{progreso}%</span>
          </div>
        </div>
      </div>

      {/* Acciones */}
      {acciones && (
        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-50">
          <Link
            href={`/rifas/${rifa.slug}`}
            target="_blank"
            className="flex-1 text-center text-xs font-semibold text-gray-500 hover:text-[#8B4513] py-2 rounded-xl hover:bg-[#FFF8E7] transition-colors border border-gray-100"
          >
            👁️ Ver pública
          </Link>
          <Link
            href={`/dashboard/rifas/${rifa.id}`}
            className="flex-1 text-center text-xs font-bold text-white bg-[#8B4513] hover:bg-[#A0522D] py-2 rounded-xl transition-colors"
          >
            ⚙️ Gestionar
          </Link>
        </div>
      )}
    </div>
  );
}
