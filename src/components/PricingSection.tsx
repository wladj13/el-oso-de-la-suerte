import Link from 'next/link';
import { Check, X } from 'lucide-react';
import { planesEjemplo } from '@/lib/data';

export default function PricingSection() {
  return (
    <section className="py-20 bg-white" id="precios">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FFF8E7] text-[#8B4513] text-sm font-bold px-4 py-2 rounded-full border border-[#FFD700]/30 mb-4">
            💎 Planes SAAS
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#1A1008] mb-4">
            Precios que tienen
            <br />
            <span className="text-oso-gradient">sentido para Venezuela</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Sin sorpresas. Sin comisiones ocultas. Cancela cuando quieras.
            Más barato y más completo que la competencia.
          </p>

          {/* Garantía */}
          <div className="inline-flex items-center gap-2 mt-4 bg-green-50 text-[#228B22] text-sm font-semibold px-5 py-2.5 rounded-full border border-green-100">
            ✅ 7 días de prueba gratis · Sin tarjeta de crédito
          </div>
        </div>

        {/* Cards de planes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {planesEjemplo.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 ${
                plan.destacado
                  ? 'bg-[#8B4513] text-white shadow-2xl shadow-[#8B4513]/25 scale-[1.02]'
                  : 'bg-white border-2 border-gray-100 shadow-lg hover:shadow-xl hover:border-[#FFD700]/30'
              }`}
            >
              {/* Badge destacado */}
              {plan.destacado && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FFD700] text-[#1A1008] text-xs font-black px-5 py-2 rounded-full shadow-lg">
                  ⭐ MÁS POPULAR
                </div>
              )}

              {/* Icono y nombre */}
              <div className="mb-6">
                <div className="text-5xl mb-3">{plan.icono}</div>
                <h3 className={`font-black text-2xl ${plan.destacado ? 'text-white' : 'text-[#1A1008]'}`}>
                  {plan.nombre}
                </h3>
              </div>

              {/* Precio */}
              <div className="mb-6">
                <div className="flex items-end gap-1">
                  <span className={`text-5xl font-black ${plan.destacado ? 'text-[#FFD700]' : 'text-[#8B4513]'}`}>
                    ${plan.precio}
                  </span>
                  <span className={`text-sm mb-2 ${plan.destacado ? 'text-white/70' : 'text-gray-400'}`}>
                    /{plan.intervalo}
                  </span>
                </div>
                <p className={`text-sm ${plan.destacado ? 'text-white/70' : 'text-gray-400'}`}>
                  {typeof plan.rifasSimultaneas === 'number'
                    ? `${plan.rifasSimultaneas} rifa${plan.rifasSimultaneas > 1 ? 's' : ''} simultánea${plan.rifasSimultaneas > 1 ? 's' : ''}`
                    : 'Rifas ilimitadas'}{' '}
                  ·{' '}
                  {typeof plan.ticketsPorRifa === 'number'
                    ? `hasta ${plan.ticketsPorRifa.toLocaleString()} tickets`
                    : 'Tickets ilimitados'}
                </p>
              </div>

              {/* Características */}
              <ul className="space-y-3 mb-8">
                {plan.caracteristicas.map((car, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <Check
                      size={16}
                      className={`mt-0.5 flex-shrink-0 ${
                        plan.destacado ? 'text-[#FFD700]' : 'text-[#228B22]'
                      }`}
                    />
                    <span className={plan.destacado ? 'text-white/90' : 'text-gray-600'}>{car}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/crear-rifa"
                className={`block w-full text-center font-black py-4 rounded-2xl transition-all text-base ${
                  plan.destacado
                    ? 'bg-[#FFD700] text-[#1A1008] hover:bg-[#FFE55C] btn-glow'
                    : 'bg-[#8B4513] text-white hover:bg-[#A0522D]'
                }`}
              >
                Empezar con {plan.nombre}
              </Link>
            </div>
          ))}
        </div>

        {/* Comparación vs competencia */}
        <div className="bg-[#FFF8E7] rounded-3xl p-8 border border-[#FFD700]/20">
          <h3 className="text-2xl font-black text-[#1A1008] mb-6 text-center">
            🐻 El Oso vs la Competencia
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 text-gray-500 font-semibold">Característica</th>
                  <th className="text-center py-3 px-4 font-black text-[#8B4513]">El Oso 🐻</th>
                  <th className="text-center py-3 px-4 text-gray-400 font-semibold">Rifarito</th>
                  <th className="text-center py-3 px-4 text-gray-400 font-semibold">Yoiberifas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FFD700]/10">
                {[
                  ['Marketplace público', '✅', '❌', '✅'],
                  ['SAAS para organizadores', '✅', '✅', '❌'],
                  ['App móvil nativa', '✅', '❌', '❌'],
                  ['Pagos venezolanos (Zelle, Pago Móvil)', '✅', '❌', '✅'],
                  ['Backup triple comprobantes', '✅', '❌', '❌'],
                  ['OCR automático vouchers', '✅', '❌', '❌'],
                  ['Streaming integrado', '✅', '❌', '❌'],
                  ['Precio desde', '$19/mes', '~$50/mes', 'Comisión %'],
                ].map(([caracteristica, oso, rifarito, yoibe], i) => (
                  <tr key={i} className="hover:bg-white/50 transition-colors">
                    <td className="py-3 px-4 text-gray-700 font-medium">{caracteristica}</td>
                    <td className="py-3 px-4 text-center font-bold text-[#8B4513]">{oso}</td>
                    <td className="py-3 px-4 text-center text-gray-400">{rifarito}</td>
                    <td className="py-3 px-4 text-center text-gray-400">{yoibe}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
