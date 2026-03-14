import { Metadata } from 'next';
import Link from 'next/link';
import { Download, CreditCard, CheckCircle, ArrowUpRight } from 'lucide-react';
import { planesEjemplo } from '@/lib/data';

export const metadata: Metadata = { title: 'Facturación | Dashboard' };

const historialPagos = [
  { id: 'inv-2025-03', fecha: '01 Mar 2025', descripcion: 'Plan Oso Oro · Marzo 2025', monto: 99, estado: 'pagado', metodo: '🏦 Zelle' },
  { id: 'inv-2025-02', fecha: '01 Feb 2025', descripcion: 'Plan Oso Oro · Febrero 2025', monto: 99, estado: 'pagado', metodo: '🏦 Zelle' },
  { id: 'inv-2025-01', fecha: '01 Ene 2025', descripcion: 'Plan Oso Plata → Oro upgrade', monto: 50, estado: 'pagado', metodo: '🏦 Zelle' },
  { id: 'inv-2024-12', fecha: '01 Dic 2024', descripcion: 'Plan Oso Plata · Diciembre 2024', monto: 49, estado: 'pagado', metodo: '📲 Pago Móvil' },
  { id: 'inv-2024-11', fecha: '01 Nov 2024', descripcion: 'Plan Oso Plata · Noviembre 2024', monto: 49, estado: 'pagado', metodo: '📲 Pago Móvil' },
];

const planActual = planesEjemplo.find((p) => p.id === 'oro')!;

export default function FacturacionPage() {
  const totalGastado = historialPagos.reduce((acc, p) => acc + p.monto, 0);

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Plan actual */}
      <div className="bg-[#1A1008] rounded-2xl p-6 text-white relative overflow-hidden">
        {/* Decoración */}
        <div className="absolute top-0 right-0 text-9xl opacity-5 font-black">🥇</div>

        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl">🥇</span>
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wider">Plan actual</p>
                <h2 className="font-black text-2xl text-white">Oso Oro</h2>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-1.5 text-gray-300">
                <CheckCircle size={14} className="text-[#228B22]" />
                Rifas y tickets ilimitados
              </span>
              <span className="flex items-center gap-1.5 text-gray-300">
                <CheckCircle size={14} className="text-[#228B22]" />
                Soporte 24/7 prioritario
              </span>
              <span className="flex items-center gap-1.5 text-gray-300">
                <CheckCircle size={14} className="text-[#228B22]" />
                App móvil incluida
              </span>
            </div>
          </div>

          <div className="text-right flex-shrink-0">
            <div className="text-4xl font-black text-[#FFD700]">$99<span className="text-lg text-white/50">/mes</span></div>
            <p className="text-xs text-gray-400 mt-1">Próximo cobro: 01 Abr 2025</p>
            <p className="text-xs text-[#228B22] font-semibold mt-0.5">✓ Activo y al día</p>
          </div>
        </div>

        <div className="mt-5 pt-5 border-t border-white/10 flex flex-wrap gap-3">
          <button className="text-sm border border-white/20 text-white px-4 py-2 rounded-xl hover:bg-white/10 transition-colors font-semibold">
            Cambiar plan
          </button>
          <button className="text-sm border border-red-500/30 text-red-400 px-4 py-2 rounded-xl hover:bg-red-500/10 transition-colors font-semibold">
            Cancelar suscripción
          </button>
        </div>
      </div>

      {/* Stats de facturación */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
          <div className="text-3xl font-black text-[#8B4513]">${totalGastado}</div>
          <div className="text-xs text-gray-400 mt-1">Total invertido</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
          <div className="text-3xl font-black text-[#228B22]">{historialPagos.length}</div>
          <div className="text-xs text-gray-400 mt-1">Meses activo</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
          <div className="text-3xl font-black text-gray-900">48</div>
          <div className="text-xs text-gray-400 mt-1">Rifas creadas</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
          <div className="text-3xl font-black text-[#FFD700]">🥇</div>
          <div className="text-xs text-gray-400 mt-1">Plan actual</div>
        </div>
      </div>

      {/* Comparación de planes */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50">
          <h2 className="font-black text-gray-900">💎 Comparar Planes</h2>
          <p className="text-xs text-gray-400 mt-0.5">Estás en el plan más completo disponible</p>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-4">
            {planesEjemplo.map((plan) => {
              const esActual = plan.id === 'oro';
              return (
                <div
                  key={plan.id}
                  className={`rounded-2xl p-5 border-2 transition-all ${
                    esActual
                      ? 'border-[#FFD700] bg-[#FFF8E7]'
                      : 'border-gray-100 opacity-60 hover:opacity-80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{plan.icono}</span>
                      <span className="font-black text-gray-900">{plan.nombre}</span>
                    </div>
                    {esActual && (
                      <span className="text-xs bg-[#FFD700] text-[#1A1008] font-black px-2.5 py-1 rounded-full">
                        Actual
                      </span>
                    )}
                  </div>
                  <div className="text-2xl font-black text-[#8B4513] mb-3">
                    ${plan.precio}<span className="text-sm font-normal text-gray-400">/mes</span>
                  </div>
                  {!esActual && (
                    <button className="w-full text-sm border-2 border-[#8B4513] text-[#8B4513] font-bold py-2 rounded-xl hover:bg-[#FFF8E7] transition-colors">
                      {plan.precio < 99 ? 'Bajar plan' : 'Cambiar'}
                    </button>
                  )}
                  {esActual && (
                    <div className="text-xs text-[#228B22] font-bold text-center py-2">
                      ✓ Plan activo
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Método de pago activo */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3">
          <CreditCard size={18} className="text-[#8B4513]" />
          <h2 className="font-black text-gray-900">Método de Pago de Suscripción</h2>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between p-4 bg-[#FFF8E7] border border-[#FFD700]/30 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">
                🏦
              </div>
              <div>
                <p className="font-bold text-gray-800">Zelle</p>
                <p className="text-sm text-gray-500">maria@email.com · Cobro automático el día 1</p>
                <p className="text-xs text-[#228B22] font-semibold mt-0.5">✓ Verificado</p>
              </div>
            </div>
            <button className="text-sm text-[#8B4513] font-bold hover:underline">
              Cambiar
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            El cobro de $99 se realizará automáticamente el 1 de abril de 2025.
            Te notificaremos 3 días antes.
          </p>
        </div>
      </div>

      {/* Historial de facturas */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
          <h2 className="font-black text-gray-900">🧾 Historial de Facturas</h2>
          <button className="flex items-center gap-1.5 text-xs text-[#8B4513] font-bold hover:underline">
            <Download size={13} />
            Descargar todas
          </button>
        </div>
        <div className="divide-y divide-gray-50">
          {historialPagos.map((pago) => (
            <div key={pago.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center">
                  <CheckCircle size={16} className="text-[#228B22]" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{pago.descripcion}</p>
                  <p className="text-xs text-gray-400">
                    {pago.fecha} · {pago.metodo} · ID: {pago.id}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-black text-gray-900">${pago.monto}</p>
                  <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">
                    Pagado
                  </span>
                </div>
                <button className="w-8 h-8 border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:text-[#8B4513] hover:border-[#8B4513] transition-colors">
                  <Download size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ROI calculado */}
      <div className="bg-[#FFF8E7] border border-[#FFD700]/30 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="text-4xl">📊</div>
          <div>
            <h3 className="font-black text-[#8B4513] mb-2">Tu retorno de inversión con El Oso</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl font-black text-[#1A1008]">$346</div>
                <div className="text-xs text-gray-500">Invertido en plan</div>
              </div>
              <div>
                <div className="text-2xl font-black text-[#228B22]">$11,487</div>
                <div className="text-xs text-gray-500">Recaudado en rifas</div>
              </div>
              <div>
                <div className="text-2xl font-black text-[#8B4513]">33x</div>
                <div className="text-xs text-gray-500">Retorno de inversión</div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Por cada $1 invertido en El Oso, has recaudado $33 en tus rifas. 🐻
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
