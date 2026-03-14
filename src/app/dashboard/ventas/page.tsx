import { Metadata } from 'next';
import { CheckCircle, XCircle, Clock, Download } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import { rifasEjemplo, metodosPagoInfo } from '@/lib/data';
import { formatearPrecio } from '@/lib/utils';

export const metadata: Metadata = { title: 'Ventas & Estadísticas | Dashboard' };

// Datos simulados de ventas recientes
const ventasRecientes = [
  { id: 1, comprador: 'Pedro Ramírez', tickets: ['#047', '#048', '#049'], rifa: 'iPhone 15 Pro Max', monto: 15, metodo: 'zelle', estado: 'aprobado', fecha: 'Hoy, 9:15 AM' },
  { id: 2, comprador: 'Ana Martínez', tickets: ['#123'], rifa: 'iPhone 15 Pro Max', monto: 5, metodo: 'pago_movil', estado: 'aprobado', fecha: 'Hoy, 8:47 AM' },
  { id: 3, comprador: 'Luis Torres', tickets: ['#089', '#090'], rifa: 'Toyota Corolla 2024', monto: 60, metodo: 'binance', estado: 'pendiente', fecha: 'Hoy, 8:22 AM' },
  { id: 4, comprador: 'Carmen Díaz', tickets: ['#201'], rifa: 'iPhone 15 Pro Max', monto: 5, metodo: 'zelle', estado: 'pendiente', fecha: 'Hoy, 7:55 AM' },
  { id: 5, comprador: 'Roberto Silva', tickets: ['#312', '#313'], rifa: 'Samsung 55" 4K', monto: 14, metodo: 'pago_movil', estado: 'aprobado', fecha: 'Ayer, 11:30 PM' },
  { id: 6, comprador: 'María López', tickets: ['#456'], rifa: 'Toyota Corolla 2024', monto: 30, metodo: 'zelle', estado: 'rechazado', fecha: 'Ayer, 10:15 PM' },
  { id: 7, comprador: 'Carlos García', tickets: ['#099', '#100', '#101'], rifa: 'PlayStation 5 Bundle', monto: 24, metodo: 'binance', estado: 'aprobado', fecha: 'Ayer, 9:00 PM' },
  { id: 8, comprador: 'Sofia Ramos', tickets: ['#078'], rifa: 'MacBook Air M3', monto: 8, metodo: 'pago_movil', estado: 'aprobado', fecha: 'Ayer, 8:45 PM' },
];

// Distribución por método de pago (simulada)
const distribucionPagos = [
  { metodo: 'zelle', porcentaje: 42, monto: 4820 },
  { metodo: 'pago_movil', porcentaje: 31, monto: 3562 },
  { metodo: 'binance', porcentaje: 20, monto: 2300 },
  { metodo: 'efectivo', porcentaje: 7, monto: 805 },
];

// Ventas por día (simulado - últimos 7 días)
const ventasPorDia = [
  { dia: 'Lun', ventas: 12, monto: 84 },
  { dia: 'Mar', ventas: 18, monto: 126 },
  { dia: 'Mié', ventas: 9, monto: 63 },
  { dia: 'Jue', ventas: 24, monto: 168 },
  { dia: 'Vie', ventas: 31, monto: 217 },
  { dia: 'Sáb', ventas: 47, monto: 329 },
  { dia: 'Hoy', ventas: 22, monto: 154 },
];

const estadoVoucher: Record<string, { label: string; icono: React.ReactNode; clase: string }> = {
  aprobado: {
    label: 'Aprobado',
    icono: <CheckCircle size={14} />,
    clase: 'text-[#228B22] bg-green-50',
  },
  pendiente: {
    label: 'Pendiente',
    icono: <Clock size={14} />,
    clase: 'text-yellow-600 bg-yellow-50',
  },
  rechazado: {
    label: 'Rechazado',
    icono: <XCircle size={14} />,
    clase: 'text-red-500 bg-red-50',
  },
};

const maxVentas = Math.max(...ventasPorDia.map((d) => d.ventas));

export default function VentasPage() {
  const totalRecaudado = rifasEjemplo.reduce((acc, r) => acc + r.ticketsVendidos * r.precioTicket, 0);
  const pendientes = ventasRecientes.filter((v) => v.estado === 'pendiente').length;
  const aprobados = ventasRecientes.filter((v) => v.estado === 'aprobado').length;

  return (
    <div className="space-y-8">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard titulo="Total recaudado" valor={`$${totalRecaudado.toLocaleString()}`} cambio={+23} icono="💰" color="green" />
        <StatCard titulo="Ventas esta semana" valor="163" subvalor="tickets vendidos" cambio={+18} icono="📈" color="brown" />
        <StatCard titulo="Vouchers pendientes" valor={String(pendientes)} subvalor="Requieren acción" icono="⏳" color="red" />
        <StatCard titulo="Tasa de aprobación" valor="94%" cambio={+2} icono="✅" color="blue" />
      </div>

      {/* Gráfico de barras simple + distribución de pagos */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Gráfico de ventas últimos 7 días */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-black text-gray-900">📊 Tickets vendidos</h2>
              <p className="text-xs text-gray-400 mt-0.5">Últimos 7 días</p>
            </div>
            <select className="text-xs border border-gray-200 rounded-xl px-3 py-2 text-gray-500 focus:outline-none">
              <option>Últimos 7 días</option>
              <option>Últimos 30 días</option>
              <option>Este mes</option>
            </select>
          </div>

          {/* Barras SVG simple */}
          <div className="flex items-end gap-2 h-40 mb-3">
            {ventasPorDia.map((d, i) => {
              const altura = (d.ventas / maxVentas) * 100;
              const esHoy = d.dia === 'Hoy';
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                  <div className="text-xs text-gray-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    {d.ventas}
                  </div>
                  <div
                    className={`w-full rounded-t-xl transition-all ${
                      esHoy
                        ? 'bg-[#FFD700]'
                        : 'bg-[#8B4513]/20 group-hover:bg-[#8B4513]/40'
                    }`}
                    style={{ height: `${altura}%` }}
                    title={`${d.ventas} tickets · $${d.monto}`}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex gap-2">
            {ventasPorDia.map((d, i) => (
              <div key={i} className="flex-1 text-center text-xs text-gray-400 font-medium">
                {d.dia}
              </div>
            ))}
          </div>

          {/* Resumen */}
          <div className="mt-5 pt-5 border-t border-gray-50 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-xl font-black text-[#8B4513]">163</div>
              <div className="text-xs text-gray-400">Total tickets</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-black text-[#228B22]">$1,141</div>
              <div className="text-xs text-gray-400">Total recaudado</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-black text-gray-700">23.3</div>
              <div className="text-xs text-gray-400">Promedio/día</div>
            </div>
          </div>
        </div>

        {/* Distribución por método de pago */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-black text-gray-900 mb-5">💳 Métodos de Pago</h2>
          <div className="space-y-4">
            {distribucionPagos.map((d) => {
              const info = metodosPagoInfo[d.metodo as keyof typeof metodosPagoInfo];
              return (
                <div key={d.metodo}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-base">{info?.emoji}</span>
                      <span className="font-semibold text-gray-700">{info?.nombre}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-black text-gray-900">{d.porcentaje}%</span>
                      <span className="text-xs text-gray-400 ml-1">${d.monto.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-[#8B4513] transition-all"
                      style={{ width: `${d.porcentaje}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Total */}
          <div className="mt-5 pt-4 border-t border-gray-50">
            <div className="text-center">
              <div className="text-2xl font-black text-[#228B22]">$11,487</div>
              <div className="text-xs text-gray-400">Total recaudado histórico</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de ventas recientes con gestión de vouchers */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
          <div>
            <h2 className="font-black text-gray-900">📋 Ventas Recientes & Vouchers</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              <span className="text-yellow-600 font-bold">{pendientes} pendientes</span> ·{' '}
              <span className="text-[#228B22] font-bold">{aprobados} aprobados</span>
            </p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 text-xs border border-gray-200 text-gray-500 px-3 py-2 rounded-xl hover:border-[#8B4513] hover:text-[#8B4513] transition-colors font-semibold">
              <Download size={13} />
              Exportar CSV
            </button>
            <select className="text-xs border border-gray-200 rounded-xl px-3 py-2 text-gray-500 focus:outline-none">
              <option>Todos los estados</option>
              <option>Pendientes</option>
              <option>Aprobados</option>
              <option>Rechazados</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider px-6 py-3">Comprador</th>
                <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Rifa</th>
                <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Tickets</th>
                <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Monto</th>
                <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Método</th>
                <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Estado</th>
                <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Fecha</th>
                <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {ventasRecientes.map((v) => {
                const est = estadoVoucher[v.estado];
                const metodoInfo = metodosPagoInfo[v.metodo as keyof typeof metodosPagoInfo];
                return (
                  <tr key={v.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-[#FFF8E7] rounded-full flex items-center justify-center text-sm">
                          👤
                        </div>
                        <span className="text-sm font-semibold text-gray-800">{v.comprador}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-600 max-w-[140px] truncate block">{v.rifa}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1">
                        {v.tickets.map((t) => (
                          <span key={t} className="text-xs bg-[#FFF8E7] text-[#8B4513] font-bold px-2 py-0.5 rounded-lg border border-[#FFD700]/20">
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-black text-[#228B22]">${v.monto}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm">
                        {metodoInfo?.emoji} {metodoInfo?.nombre}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${est.clase}`}>
                        {est.icono}
                        {est.label}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs text-gray-400">{v.fecha}</span>
                    </td>
                    <td className="px-4 py-4">
                      {v.estado === 'pendiente' ? (
                        <div className="flex gap-1">
                          <button className="text-xs bg-[#228B22] text-white px-3 py-1.5 rounded-xl font-bold hover:bg-[#1A6B1A] transition-colors">
                            ✓ Aprobar
                          </button>
                          <button className="text-xs bg-red-50 text-red-500 px-2 py-1.5 rounded-xl font-bold hover:bg-red-100 transition-colors">
                            ✗
                          </button>
                        </div>
                      ) : (
                        <button className="text-xs text-gray-400 hover:text-[#8B4513] transition-colors font-semibold">
                          Ver comprobante
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer de tabla */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            Mostrando {ventasRecientes.length} de 247 ventas
          </p>
          <div className="flex gap-2">
            <button className="text-xs border border-gray-200 px-3 py-1.5 rounded-xl text-gray-500 hover:border-[#8B4513] hover:text-[#8B4513] transition-colors">
              ← Anterior
            </button>
            <button className="text-xs border border-gray-200 px-3 py-1.5 rounded-xl text-gray-500 hover:border-[#8B4513] hover:text-[#8B4513] transition-colors">
              Siguiente →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
