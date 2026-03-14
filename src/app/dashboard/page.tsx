import { Metadata } from 'next';
import Link from 'next/link';
import { Plus, ArrowRight, AlertCircle, CheckCircle, Clock, Zap } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import RifaMiniCard from '@/components/dashboard/RifaMiniCard';
import { rifasEjemplo } from '@/lib/data';
import { formatearFecha } from '@/lib/utils';

export const metadata: Metadata = { title: 'Dashboard | El Oso de la Suerte' };

// Datos simulados de vouchers pendientes
const vouchersPendientes = [
  { id: 'v1', nombre: 'Pedro Ramírez', monto: '$15', metodo: '🏦 Zelle', hace: '5 min', ticket: '#047, #048, #049' },
  { id: 'v2', nombre: 'Ana Martínez', monto: '$5', metodo: '📲 Pago Móvil', hace: '12 min', ticket: '#123' },
  { id: 'v3', nombre: 'Luis Torres', monto: '$30', metodo: '🟡 Binance', hace: '28 min', ticket: '#089, #090' },
  { id: 'v4', nombre: 'Carmen Díaz', monto: '$5', metodo: '🏦 Zelle', hace: '45 min', ticket: '#201' },
];

// Actividad reciente simulada
const actividadReciente = [
  { tipo: 'venta', texto: 'Pedro Ramírez compró 3 tickets del iPhone 15', hace: '5 min', color: 'text-[#228B22]', emoji: '🎟️' },
  { tipo: 'voucher', texto: 'Voucher de Ana Martínez aprobado automáticamente', hace: '12 min', color: 'text-blue-600', emoji: '✅' },
  { tipo: 'vista', texto: 'Tu rifa Toyota Corolla alcanzó 12,000 vistas', hace: '1h', color: 'text-purple-600', emoji: '👁️' },
  { tipo: 'venta', texto: 'Carlos González compró 2 tickets del Samsung TV', hace: '2h', color: 'text-[#228B22]', emoji: '🎟️' },
  { tipo: 'vendedor', texto: 'Luis (vendedor) vendió 5 tickets hoy', hace: '3h', color: 'text-[#8B4513]', emoji: '🏆' },
  { tipo: 'meta', texto: '¡La rifa iPhone superó el 75% de ventas!', hace: '4h', color: 'text-[#FFD700]', emoji: '🔥' },
];

// Proximos sorteos
const rifasActivas = rifasEjemplo.filter((r) => r.estado === 'activa').slice(0, 3);

export default function DashboardPage() {
  const totalGanancias = rifasEjemplo.reduce(
    (acc, r) => acc + r.ticketsVendidos * r.precioTicket,
    0
  );

  return (
    <div className="space-y-8">
      {/* Alertas importantes */}
      <div className="bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-2xl p-4 flex items-start gap-3">
        <AlertCircle size={18} className="text-[#8B4513] mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-bold text-[#8B4513]">
            Tienes {vouchersPendientes.length} vouchers pendientes de aprobación
          </p>
          <p className="text-xs text-[#8B4513]/70 mt-0.5">
            El más antiguo lleva 45 min esperando. Aprueba o rechaza para liberar los tickets.
          </p>
        </div>
        <Link
          href="/dashboard/ventas"
          className="text-xs font-black text-[#8B4513] whitespace-nowrap hover:underline"
        >
          Revisar →
        </Link>
      </div>

      {/* KPIs principales */}
      <div>
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
          Resumen de hoy
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            titulo="Ganancias totales"
            valor={`$${totalGanancias.toLocaleString()}`}
            subvalor="Todos los tiempos"
            cambio={+23}
            icono="💰"
            color="green"
          />
          <StatCard
            titulo="Tickets vendidos hoy"
            valor="47"
            subvalor="de 89 disponibles"
            cambio={+15}
            icono="🎟️"
            color="brown"
          />
          <StatCard
            titulo="Rifas activas"
            valor="3"
            subvalor="de 5 máx en plan Oro"
            icono="🎪"
            color="gold"
          />
          <StatCard
            titulo="Vouchers pendientes"
            valor={String(vouchersPendientes.length)}
            subvalor="Requieren revisión"
            cambio={-2}
            icono="📋"
            color="red"
          />
        </div>
      </div>

      {/* Stats secundarios */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard titulo="Vistas hoy" valor="1,247" cambio={+8} icono="👁️" color="blue" />
        <StatCard titulo="Vendedores activos" valor="5" icono="👥" color="purple" />
        <StatCard titulo="Tasa de conversión" valor="34%" cambio={+4} icono="📈" color="green" />
        <StatCard titulo="Promedio ticket" valor="$7.40" cambio={+2} icono="🎯" color="brown" />
      </div>

      {/* Contenido principal: 2 columnas */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Rifas activas */}
        <div className="lg:col-span-2 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-black text-gray-900 text-lg">🎪 Mis Rifas Activas</h2>
            <Link
              href="/dashboard/rifas"
              className="text-sm text-[#8B4513] font-bold hover:underline flex items-center gap-1"
            >
              Ver todas <ArrowRight size={14} />
            </Link>
          </div>

          <div className="space-y-4">
            {rifasActivas.map((rifa) => (
              <RifaMiniCard key={rifa.id} rifa={rifa} />
            ))}
          </div>

          {/* Botón nueva rifa */}
          <Link
            href="/dashboard/rifas/nueva"
            className="flex items-center justify-center gap-3 w-full border-2 border-dashed border-[#FFD700]/40 rounded-2xl py-5 text-[#8B4513] hover:border-[#FFD700] hover:bg-[#FFF8E7] transition-all font-bold text-sm"
          >
            <Plus size={18} />
            Crear Nueva Rifa
          </Link>
        </div>

        {/* Panel derecho */}
        <div className="space-y-5">
          {/* Vouchers pendientes */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
              <h2 className="font-black text-gray-900 text-sm">
                📋 Vouchers Pendientes
                <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">
                  {vouchersPendientes.length}
                </span>
              </h2>
              <Link href="/dashboard/ventas" className="text-xs text-[#8B4513] font-bold hover:underline">
                Ver todos
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {vouchersPendientes.map((v) => (
                <div key={v.id} className="px-5 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <p className="text-sm font-bold text-gray-800">{v.nombre}</p>
                      <p className="text-xs text-gray-400">
                        {v.metodo} · {v.monto} · {v.hace}
                      </p>
                      <p className="text-xs text-[#8B4513] font-semibold mt-0.5">
                        Ticket {v.ticket}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <button className="text-xs bg-[#228B22] text-white px-3 py-1.5 rounded-xl font-bold hover:bg-[#1A6B1A] transition-colors">
                        ✓
                      </button>
                      <button className="text-xs bg-red-50 text-red-500 px-3 py-1.5 rounded-xl font-bold hover:bg-red-100 transition-colors">
                        ✗
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
              <button className="w-full text-xs font-black text-[#8B4513] hover:underline">
                Aprobar todos los pendientes →
              </button>
            </div>
          </div>

          {/* Actividad reciente */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-50">
              <h2 className="font-black text-gray-900 text-sm">⚡ Actividad Reciente</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {actividadReciente.map((a, i) => (
                <div key={i} className="px-5 py-3 flex items-start gap-3 hover:bg-gray-50 transition-colors">
                  <span className="text-base mt-0.5 flex-shrink-0">{a.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-700 leading-tight">{a.texto}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{a.hace}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Próximos sorteos */}
          <div className="bg-[#1A1008] rounded-2xl p-5 text-white">
            <h2 className="font-black text-sm mb-4 flex items-center gap-2">
              <Clock size={15} className="text-[#FFD700]" />
              Próximos Sorteos
            </h2>
            <div className="space-y-3">
              {rifasActivas.map((rifa) => (
                <div key={rifa.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div>
                    <p className="text-xs font-bold text-white truncate max-w-[140px]">{rifa.nombre}</p>
                    <p className="text-xs text-gray-400">{formatearFecha(rifa.fechaSorteo)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-[#FFD700]">
                      {Math.max(0, Math.ceil((rifa.fechaSorteo.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))}d
                    </p>
                    <p className="text-xs text-gray-500">restantes</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/dashboard/rifas"
              className="mt-4 block text-center text-xs text-[#FFD700] font-bold hover:underline"
            >
              Ver calendario completo →
            </Link>
          </div>
        </div>
      </div>

      {/* Accesos rápidos */}
      <div>
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Accesos Rápidos</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { emoji: '🎪', label: 'Nueva Rifa', sub: 'Crear en 10 min', href: '/dashboard/rifas/nueva', color: 'bg-[#FFD700] text-[#1A1008]' },
            { emoji: '📊', label: 'Ver Estadísticas', sub: 'Analytics completo', href: '/dashboard/ventas', color: 'bg-[#8B4513] text-white' },
            { emoji: '👥', label: 'Mis Vendedores', sub: '5 activos', href: '/dashboard/vendedores', color: 'bg-[#228B22] text-white' },
            { emoji: '💳', label: 'Facturación', sub: 'Plan Oro activo', href: '/dashboard/facturacion', color: 'bg-gray-900 text-white' },
          ].map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className={`${a.color} rounded-2xl p-5 flex flex-col gap-2 hover:opacity-90 transition-all hover:-translate-y-0.5`}
            >
              <span className="text-3xl">{a.emoji}</span>
              <div>
                <div className="font-black text-sm">{a.label}</div>
                <div className="text-xs opacity-70">{a.sub}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
