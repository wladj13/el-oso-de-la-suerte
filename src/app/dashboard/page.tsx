import Link from 'next/link';
import { requireOrganizador } from '@/lib/queries/auth';
import { getDashboardStats, getVentasRecientes } from '@/lib/queries/stats';
import { getRifasByOrganizador } from '@/lib/queries/rifas';
import { aprobarVoucher, rechazarVoucher } from '@/lib/actions/vouchers';
import { TrendingUp, TrendingDown, AlertCircle, Plus, CheckCircle, XCircle, Clock } from 'lucide-react';

function StatCard({
  label, valor, sub, icono, tendencia, color = 'brown',
}: {
  label: string; valor: string; sub?: string; icono: string;
  tendencia?: { valor: number; positivo: boolean }; color?: string;
}) {
  const colores: Record<string, string> = {
    brown: 'bg-[#FFF8E7] text-[#8B4513]',
    gold: 'bg-yellow-50 text-yellow-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
  };
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${colores[color]}`}>
          {icono}
        </div>
        {tendencia && (
          <div className={`flex items-center gap-1 text-xs font-semibold ${tendencia.positivo ? 'text-green-600' : 'text-red-500'}`}>
            {tendencia.positivo ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {tendencia.valor}%
          </div>
        )}
      </div>
      <div className="text-2xl font-black text-gray-900">{valor}</div>
      <div className="text-sm font-semibold text-gray-600 mt-0.5">{label}</div>
      {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
    </div>
  );
}

function formatMonto(monto: number) {
  return monto >= 1000 ? `$${(monto / 1000).toFixed(1)}K` : `$${monto.toFixed(0)}`;
}

export default async function DashboardPage() {
  const organizador = await requireOrganizador();
  const [stats, ventas, rifas] = await Promise.all([
    getDashboardStats(organizador.id),
    getVentasRecientes(organizador.id, 5),
    getRifasByOrganizador(organizador.id),
  ]);

  const rifasActivas = rifas.filter((r) => r.estado === 'activa');

  return (
    <div className="space-y-8">
      {/* Alerta vouchers pendientes */}
      {stats.vouchersPendientes > 0 && (
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl px-5 py-4">
          <AlertCircle size={20} className="shrink-0 text-amber-500" />
          <div className="flex-1">
            <span className="font-bold">{stats.vouchersPendientes} comprobante{stats.vouchersPendientes > 1 ? 's' : ''} esperando aprobación.</span>
            {' '}Revísalos en{' '}
            <Link href="/dashboard/ventas" className="underline font-semibold">Ventas</Link>.
          </div>
        </div>
      )}

      {/* KPIs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-gray-900">Resumen General</h2>
          <Link href="/dashboard/nueva-rifa"
            className="flex items-center gap-2 bg-[#8B4513] hover:bg-[#5C2D09] text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">
            <Plus size={16} /> Nueva Rifa
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Ingresos Totales" valor={formatMonto(stats.ingresosTotales)} sub="Tickets aprobados" icono="💰" color="brown" tendencia={{ valor: 12, positivo: true }} />
          <StatCard label="Tickets Hoy" valor={String(stats.ventasHoy)} sub="Vendidos hoy" icono="🎟️" color="gold" />
          <StatCard label="Rifas Activas" valor={String(stats.rifasActivas)} sub={`${stats.totalRifas} en total`} icono="🎪" color="green" />
          <StatCard label="Comprobantes" valor={String(stats.vouchersPendientes)} sub="Pendientes" icono="📋" color={stats.vouchersPendientes > 0 ? 'red' : 'green'} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rifas activas */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-black text-gray-900">Mis Rifas Activas</h3>
            <Link href="/dashboard/rifas" className="text-xs text-[#8B4513] font-semibold hover:underline">Ver todas</Link>
          </div>

          {rifasActivas.length === 0 ? (
            <div className="text-center py-10">
              <div className="text-4xl mb-3">🎪</div>
              <p className="text-gray-500 text-sm mb-4">No tienes rifas activas aún</p>
              <Link href="/dashboard/nueva-rifa"
                className="inline-flex items-center gap-2 bg-[#8B4513] text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-[#5C2D09] transition-colors">
                <Plus size={14} /> Crear mi primera rifa
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {rifasActivas.slice(0, 4).map((rifa) => {
                const progreso = rifa.totalTickets > 0
                  ? Math.round((rifa.ticketsVendidos / rifa.totalTickets) * 100) : 0;
                return (
                  <div key={rifa.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 bg-[#FFF8E7] rounded-xl flex items-center justify-center text-lg shrink-0">🎪</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 text-sm truncate">{rifa.titulo}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#8B4513] rounded-full" style={{ width: `${progreso}%` }} />
                        </div>
                        <span className="text-xs text-gray-500 shrink-0">{progreso}%</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-sm font-bold text-gray-900">{rifa.ticketsVendidos}/{rifa.totalTickets}</div>
                      <div className="text-xs text-gray-400">tickets</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Ventas recientes */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-black text-gray-900">Ventas Recientes</h3>
            <Link href="/dashboard/ventas" className="text-xs text-[#8B4513] font-semibold hover:underline">Ver todas</Link>
          </div>

          {ventas.length === 0 ? (
            <div className="text-center py-10">
              <div className="text-4xl mb-3">🎟️</div>
              <p className="text-gray-500 text-sm">Las ventas aparecerán aquí</p>
            </div>
          ) : (
            <div className="space-y-3">
              {ventas.map((v) => (
                <div key={v.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    v.estado === 'aprobado' ? 'bg-green-100' : v.estado === 'rechazado' ? 'bg-red-100' : 'bg-amber-100'
                  }`}>
                    {v.estado === 'aprobado' ? <CheckCircle size={16} className="text-green-600" /> :
                     v.estado === 'rechazado' ? <XCircle size={16} className="text-red-500" /> :
                     <Clock size={16} className="text-amber-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900 truncate">
                      {v.comprador?.nombre ?? v.comprador?.email ?? 'Comprador'}
                    </div>
                    <div className="text-xs text-gray-400">{v.rifa?.titulo} · #{v.ticket?.numero}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-bold text-gray-900">${Number(v.monto).toFixed(2)}</div>
                    <div className="text-xs text-gray-400">{v.metodoPago}</div>
                  </div>
                  {v.estado === 'pendiente' && (
                    <div className="flex gap-1 shrink-0">
                      <form action={aprobarVoucher.bind(null, v.id)}>
                        <button className="w-7 h-7 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg flex items-center justify-center transition-colors">
                          <CheckCircle size={14} />
                        </button>
                      </form>
                      <form action={rechazarVoucher.bind(null, v.id, 'Rechazado desde dashboard')}>
                        <button className="w-7 h-7 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg flex items-center justify-center transition-colors">
                          <XCircle size={14} />
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Accesos rápidos */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { href: '/dashboard/nueva-rifa', icono: '🎪', label: 'Nueva Rifa', desc: 'Crear rifa', color: 'bg-[#FFF8E7]' },
          { href: '/dashboard/ventas', icono: '📊', label: 'Ver Ventas', desc: 'Gestionar', color: 'bg-blue-50' },
          { href: '/dashboard/vendedores', icono: '👥', label: 'Vendedores', desc: 'Mi equipo', color: 'bg-green-50' },
          { href: '/dashboard/configuracion', icono: '⚙️', label: 'Configuración', desc: 'Mi perfil', color: 'bg-purple-50' },
        ].map((item) => (
          <Link key={item.href} href={item.href}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform`}>
              {item.icono}
            </div>
            <div className="font-bold text-gray-900 text-sm">{item.label}</div>
            <div className="text-xs text-gray-400">{item.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
