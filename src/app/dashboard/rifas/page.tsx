import Link from 'next/link';
import { requireOrganizador } from '@/lib/queries/auth';
import { getRifasByOrganizador } from '@/lib/queries/rifas';
import { actualizarEstadoRifa, eliminarRifa } from '@/lib/actions/rifas';
import { Plus, ExternalLink, Pause, Play, Trash2, Clock } from 'lucide-react';

const estadoBadge: Record<string, { label: string; class: string }> = {
  borrador:   { label: 'Borrador',   class: 'bg-gray-100 text-gray-600' },
  activa:     { label: 'Activa',     class: 'bg-green-100 text-green-700' },
  pausada:    { label: 'Pausada',    class: 'bg-amber-100 text-amber-700' },
  finalizada: { label: 'Finalizada', class: 'bg-blue-100 text-blue-700' },
  cancelada:  { label: 'Cancelada',  class: 'bg-red-100 text-red-600' },
};

export default async function RifasDashboardPage() {
  const organizador = await requireOrganizador();
  const rifas = await getRifasByOrganizador(organizador.id);

  const activas    = rifas.filter((r) => r.estado === 'activa');
  const borradores = rifas.filter((r) => r.estado === 'borrador');
  const otras      = rifas.filter((r) => !['activa', 'borrador'].includes(r.estado));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Mis Rifas</h1>
          <p className="text-sm text-gray-500">{rifas.length} rifas en total</p>
        </div>
        <Link href="/dashboard/nueva-rifa"
          className="flex items-center gap-2 bg-[#8B4513] hover:bg-[#5C2D09] text-white font-bold px-5 py-2.5 rounded-xl transition-colors">
          <Plus size={16} /> Nueva Rifa
        </Link>
      </div>

      {rifas.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-16 text-center">
          <div className="text-6xl mb-4">🎪</div>
          <h2 className="text-xl font-black text-gray-900 mb-2">Aún no tienes rifas</h2>
          <p className="text-gray-500 mb-6">Crea tu primera rifa y empieza a vender tickets</p>
          <Link href="/dashboard/nueva-rifa"
            className="inline-flex items-center gap-2 bg-[#8B4513] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#5C2D09] transition-colors">
            <Plus size={16} /> Crear mi primera rifa
          </Link>
        </div>
      ) : (
        <>
          {/* Activas */}
          {activas.length > 0 && (
            <section>
              <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wider mb-3">Activas ({activas.length})</h2>
              <RifasTable rifas={activas} />
            </section>
          )}

          {/* Borradores */}
          {borradores.length > 0 && (
            <section>
              <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wider mb-3">Borradores ({borradores.length})</h2>
              <RifasTable rifas={borradores} />
            </section>
          )}

          {/* Finalizadas / Otras */}
          {otras.length > 0 && (
            <section>
              <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wider mb-3">Historial ({otras.length})</h2>
              <RifasTable rifas={otras} />
            </section>
          )}
        </>
      )}
    </div>
  );
}

function RifasTable({ rifas }: { rifas: Awaited<ReturnType<typeof getRifasByOrganizador>> }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="divide-y divide-gray-50">
        {rifas.map((rifa) => {
          const progreso = rifa.totalTickets > 0
            ? Math.round((rifa.ticketsVendidos / rifa.totalTickets) * 100) : 0;
          const badge = estadoBadge[rifa.estado];
          const ingresos = rifa.ticketsVendidos * Number(rifa.precioTicket);

          return (
            <div key={rifa.id} className="p-5 hover:bg-gray-50/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#FFF8E7] rounded-xl flex items-center justify-center text-2xl shrink-0">🎪</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-gray-900 truncate">{rifa.titulo}</h3>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badge.class}`}>
                      {badge.label}
                    </span>
                    {rifa.categoria && (
                      <span className="text-xs text-gray-400">{rifa.categoria}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>🎟️ {rifa.ticketsVendidos}/{rifa.totalTickets} tickets</span>
                    <span>💰 ${ingresos.toFixed(0)} recaudado</span>
                    {rifa.fechaSorteo && (
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {new Date(rifa.fechaSorteo).toLocaleDateString('es-VE')}
                      </span>
                    )}
                  </div>

                  {/* Barra de progreso */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#8B4513] rounded-full transition-all" style={{ width: `${progreso}%` }} />
                    </div>
                    <span className="text-xs text-gray-400 w-8 text-right">{progreso}%</span>
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex items-center gap-2 shrink-0">
                  <Link href={`/rifas/${rifa.slug}`} target="_blank"
                    className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors" title="Ver pública">
                    <ExternalLink size={14} className="text-gray-600" />
                  </Link>

                  {rifa.estado === 'borrador' && (
                    <form action={actualizarEstadoRifa.bind(null, rifa.id, 'activa')}>
                      <button className="w-8 h-8 bg-green-100 hover:bg-green-200 rounded-lg flex items-center justify-center transition-colors" title="Activar">
                        <Play size={14} className="text-green-700" />
                      </button>
                    </form>
                  )}

                  {rifa.estado === 'activa' && (
                    <form action={actualizarEstadoRifa.bind(null, rifa.id, 'pausada')}>
                      <button className="w-8 h-8 bg-amber-100 hover:bg-amber-200 rounded-lg flex items-center justify-center transition-colors" title="Pausar">
                        <Pause size={14} className="text-amber-700" />
                      </button>
                    </form>
                  )}

                  {rifa.estado === 'pausada' && (
                    <form action={actualizarEstadoRifa.bind(null, rifa.id, 'activa')}>
                      <button className="w-8 h-8 bg-green-100 hover:bg-green-200 rounded-lg flex items-center justify-center transition-colors" title="Reactivar">
                        <Play size={14} className="text-green-700" />
                      </button>
                    </form>
                  )}

                  {rifa.estado === 'borrador' && (
                    <form action={eliminarRifa.bind(null, rifa.id)}>
                      <button className="w-8 h-8 bg-red-100 hover:bg-red-200 rounded-lg flex items-center justify-center transition-colors" title="Eliminar borrador">
                        <Trash2 size={14} className="text-red-600" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
