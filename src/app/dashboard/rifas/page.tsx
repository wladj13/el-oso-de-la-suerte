import { Metadata } from 'next';
import Link from 'next/link';
import { Plus, ExternalLink, Copy, BarChart2, Settings, Pause, Trash2 } from 'lucide-react';
import { rifasEjemplo } from '@/lib/data';
import { calcularProgreso, diasRestantes, formatearFecha, formatearPrecio } from '@/lib/utils';
import ProgressBar from '@/components/ui/ProgressBar';

export const metadata: Metadata = { title: 'Mis Rifas | Dashboard' };

const estadoConfig: Record<string, { label: string; dot: string; badge: string }> = {
  activa: { label: 'Activa', dot: 'bg-[#228B22]', badge: 'bg-green-100 text-green-700' },
  borrador: { label: 'Borrador', dot: 'bg-yellow-400', badge: 'bg-yellow-100 text-yellow-700' },
  finalizada: { label: 'Finalizada', dot: 'bg-gray-300', badge: 'bg-gray-100 text-gray-600' },
  sorteada: { label: 'Sorteada', dot: 'bg-purple-400', badge: 'bg-purple-100 text-purple-700' },
};

export default function MisRifasPage() {
  const rifasActivas = rifasEjemplo.filter((r) => r.estado === 'activa');
  const rifasFinalizadas = rifasEjemplo.filter((r) => r.estado !== 'activa').slice(0, 2);

  return (
    <div className="space-y-8">
      {/* Header con acciones */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-gray-500 text-sm">
            <span className="font-bold text-[#228B22]">{rifasActivas.length}</span> activas ·{' '}
            <span className="font-bold text-gray-600">{rifasEjemplo.length}</span> en total
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:border-[#8B4513] hover:text-[#8B4513] transition-colors">
            <BarChart2 size={15} />
            Comparar todas
          </button>
          <Link
            href="/dashboard/rifas/nueva"
            className="flex items-center gap-2 bg-[#FFD700] text-[#1A1008] text-sm font-black px-5 py-2.5 rounded-xl hover:bg-[#FFE55C] transition-colors btn-glow"
          >
            <Plus size={16} />
            Nueva Rifa
          </Link>
        </div>
      </div>

      {/* Filtros rápidos */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {['Todas', 'Activas', 'Borradores', 'Finalizadas', 'Sorteadas'].map((f, i) => (
          <button
            key={f}
            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${
              i === 0
                ? 'bg-[#8B4513] text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-[#8B4513] hover:text-[#8B4513]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Tabla / Lista de rifas activas */}
      <div>
        <h2 className="font-black text-gray-900 mb-4 flex items-center gap-2">
          🟢 Rifas Activas
        </h2>

        <div className="space-y-4">
          {rifasActivas.map((rifa) => {
            const progreso = calcularProgreso(rifa.ticketsVendidos, rifa.totalTickets);
            const dias = diasRestantes(rifa.fechaSorteo);
            const estado = estadoConfig[rifa.estado];
            const ganancia = rifa.ticketsVendidos * rifa.precioTicket;

            return (
              <div
                key={rifa.id}
                className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-[#FFD700]/30 hover:shadow-md transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                  {/* Info principal */}
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    {/* Icono categoría */}
                    <div className="w-12 h-12 bg-[#FFF8E7] rounded-xl flex items-center justify-center text-2xl flex-shrink-0 border border-[#FFD700]/20">
                      {rifa.categoria === 'electronica' ? '📱' : rifa.categoria === 'vehiculos' ? '🚗' : '💵'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-black text-gray-900 text-base leading-tight truncate">
                          {rifa.nombre}
                        </h3>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${estado.badge}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${estado.dot}`} />
                          {estado.label}
                        </span>
                        {rifa.destacada && (
                          <span className="text-xs bg-[#FFD700] text-[#1A1008] font-bold px-2 py-0.5 rounded-full">
                            ⭐ Destacada
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span>📅 Sorteo: {formatearFecha(rifa.fechaSorteo)}</span>
                        <span className={dias <= 3 ? 'text-red-500 font-bold' : ''}>
                          ⏱ {dias === 0 ? '¡Hoy!' : `${dias} días restantes`}
                        </span>
                        <span>💲 {formatearPrecio(rifa.precioTicket)}/ticket</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 lg:w-72 flex-shrink-0">
                    <div className="text-center">
                      <div className="text-lg font-black text-[#8B4513]">{rifa.ticketsVendidos}</div>
                      <div className="text-xs text-gray-400">Vendidos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-black text-[#228B22]">{formatearPrecio(ganancia)}</div>
                      <div className="text-xs text-gray-400">Recaudado</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-black text-gray-700">{rifa.vistas.toLocaleString()}</div>
                      <div className="text-xs text-gray-400">Vistas</div>
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      title="Copiar link"
                      className="w-9 h-9 border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:text-[#8B4513] hover:border-[#8B4513] transition-colors"
                    >
                      <Copy size={14} />
                    </button>
                    <Link
                      href={`/rifas/${rifa.slug}`}
                      target="_blank"
                      title="Ver página pública"
                      className="w-9 h-9 border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:text-[#8B4513] hover:border-[#8B4513] transition-colors"
                    >
                      <ExternalLink size={14} />
                    </Link>
                    <button
                      title="Pausar"
                      className="w-9 h-9 border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:text-yellow-600 hover:border-yellow-300 transition-colors"
                    >
                      <Pause size={14} />
                    </button>
                    <Link
                      href={`/dashboard/rifas/${rifa.id}`}
                      className="flex items-center gap-1.5 bg-[#8B4513] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#A0522D] transition-colors"
                    >
                      <Settings size={13} />
                      Gestionar
                    </Link>
                  </div>
                </div>

                {/* Barra de progreso */}
                <div className="mt-4 pt-4 border-t border-gray-50">
                  <ProgressBar
                    progreso={progreso}
                    vendidos={rifa.ticketsVendidos}
                    total={rifa.totalTickets}
                    tamaño="md"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rifas finalizadas */}
      {rifasFinalizadas.length > 0 && (
        <div>
          <h2 className="font-black text-gray-900 mb-4 flex items-center gap-2">
            ⚫ Rifas Anteriores
          </h2>
          <div className="space-y-3">
            {rifasFinalizadas.map((rifa) => {
              const progreso = calcularProgreso(rifa.ticketsVendidos, rifa.totalTickets);
              const ganancia = rifa.ticketsVendidos * rifa.precioTicket;
              return (
                <div key={rifa.id} className="bg-white rounded-2xl border border-gray-100 p-5 opacity-70 hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-xl border border-gray-100">
                      🎁
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-700 text-sm">{rifa.nombre}</h3>
                      <p className="text-xs text-gray-400">
                        {rifa.ticketsVendidos}/{rifa.totalTickets} tickets · {formatearPrecio(ganancia)} recaudado · {formatearFecha(rifa.fechaSorteo)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-xs text-gray-400 hover:text-[#8B4513] transition-colors font-semibold">
                        Ver reporte
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-red-400 transition-colors rounded-xl hover:bg-red-50">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Estado vacío / límite del plan */}
      <div className="bg-[#FFF8E7] border border-[#FFD700]/30 rounded-2xl p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-3xl">🥇</div>
          <div>
            <p className="font-black text-[#8B4513]">Plan Oro — Rifas ilimitadas</p>
            <p className="text-sm text-gray-500">Puedes crear todas las rifas que quieras.</p>
          </div>
        </div>
        <Link
          href="/dashboard/rifas/nueva"
          className="flex items-center gap-2 bg-[#FFD700] text-[#1A1008] font-black px-5 py-3 rounded-xl hover:bg-[#FFE55C] transition-colors text-sm whitespace-nowrap"
        >
          <Plus size={15} />
          Crear Rifa
        </Link>
      </div>
    </div>
  );
}
