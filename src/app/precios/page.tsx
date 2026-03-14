import { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { planesEjemplo } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Planes y Precios',
  description: 'Planes SAAS desde $19/mes. Crea rifas ilimitadas, gestiona vendedores y cobra con Zelle y Pago Móvil. 7 días de prueba gratis.',
};

const faq = [
  {
    pregunta: '¿Puedo cancelar mi suscripción en cualquier momento?',
    respuesta: 'Sí. Sin penalizaciones ni cargos extras. Tu plan continúa activo hasta el final del período pagado.',
  },
  {
    pregunta: '¿Qué pasa si supero el límite de tickets de mi plan?',
    respuesta: 'Te notificamos antes de alcanzar el límite y puedes hacer upgrade fácilmente desde tu dashboard. Sin interrupciones en tu rifa.',
  },
  {
    pregunta: '¿El dominio personalizado está incluido desde qué plan?',
    respuesta: 'El subdominio (tunombre.elosodelasuerte.com) está incluido desde el plan Bronce. El dominio personalizado (.com) está incluido desde el plan Plata.',
  },
  {
    pregunta: '¿Cómo funciona la comisión de la plataforma?',
    respuesta: 'Para el marketplace (rifas públicas), cobramos 5-8% del total de ventas. Los planes SAAS tienen una comisión reducida del 2-3%.',
  },
  {
    pregunta: '¿Puedo tener vendedores en mi equipo?',
    respuesta: 'Sí. Desde el plan Plata puedes tener hasta 5 vendedores con comisiones configurables. En el plan Oro son ilimitados.',
  },
  {
    pregunta: '¿Los sorteos son realmente transparentes?',
    respuesta: 'Absolutamente. Nuestro algoritmo de sorteo es de código abierto, los sorteos se transmiten en vivo y quedan grabados. Cada ganador recibe un certificado digital.',
  },
];

export default function PreciosPage() {
  return (
    <div className="min-h-screen bg-[#FFF8E7] pt-16">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-[#FFF8E7] text-[#8B4513] text-sm font-bold px-4 py-2 rounded-full border border-[#FFD700]/30 mb-5">
            💎 Planes SAAS
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-[#1A1008] mb-4">
            Precios que tienen
            <br />
            <span className="text-oso-gradient">sentido</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-6">
            Sin sorpresas. Sin comisiones ocultas. Cancela cuando quieras.
            Más completo que la competencia a la mitad del precio.
          </p>
          <div className="inline-flex items-center gap-2 bg-green-50 text-[#228B22] text-sm font-bold px-5 py-2.5 rounded-full border border-green-100">
            ✅ 7 días gratis · Sin tarjeta de crédito · Activación inmediata
          </div>
        </div>
      </div>

      {/* Planes */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {planesEjemplo.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 ${
                plan.destacado
                  ? 'bg-[#8B4513] shadow-2xl shadow-[#8B4513]/25 scale-[1.03]'
                  : 'bg-white border-2 border-gray-100 shadow-lg hover:border-[#FFD700]/50 hover:shadow-xl'
              }`}
            >
              {plan.destacado && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <span className="bg-[#FFD700] text-[#1A1008] text-xs font-black px-5 py-2 rounded-full shadow-lg">
                    ⭐ MÁS POPULAR · MEJOR VALOR
                  </span>
                </div>
              )}

              <div className="p-8 pt-10">
                <div className="text-5xl mb-4">{plan.icono}</div>
                <h2 className={`font-black text-2xl mb-2 ${plan.destacado ? 'text-white' : 'text-[#1A1008]'}`}>
                  {plan.nombre}
                </h2>

                <div className="mb-6">
                  <div className="flex items-end gap-1">
                    <span className={`text-6xl font-black ${plan.destacado ? 'text-[#FFD700]' : 'text-[#8B4513]'}`}>
                      ${plan.precio}
                    </span>
                    <span className={`text-base mb-3 ${plan.destacado ? 'text-white/60' : 'text-gray-400'}`}>
                      /mes
                    </span>
                  </div>
                  <div className={`text-sm ${plan.destacado ? 'text-white/70' : 'text-gray-400'}`}>
                    o ${Math.round(plan.precio * 10)}/año (2 meses gratis)
                  </div>
                </div>

                <div className={`rounded-2xl p-4 mb-6 ${plan.destacado ? 'bg-white/10' : 'bg-[#FFF8E7]'}`}>
                  <div className={`text-sm font-bold ${plan.destacado ? 'text-white' : 'text-[#8B4513]'}`}>
                    {typeof plan.rifasSimultaneas === 'number'
                      ? `${plan.rifasSimultaneas} rifa${plan.rifasSimultaneas > 1 ? 's' : ''} simultánea${plan.rifasSimultaneas > 1 ? 's' : ''}`
                      : '♾️ Rifas ilimitadas'}
                  </div>
                  <div className={`text-sm ${plan.destacado ? 'text-white/70' : 'text-gray-500'}`}>
                    {typeof plan.ticketsPorRifa === 'number'
                      ? `Hasta ${plan.ticketsPorRifa.toLocaleString()} tickets por rifa`
                      : '♾️ Tickets ilimitados por rifa'}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.caracteristicas.map((car, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <Check
                        size={16}
                        className={`mt-0.5 flex-shrink-0 ${plan.destacado ? 'text-[#FFD700]' : 'text-[#228B22]'}`}
                      />
                      <span className={plan.destacado ? 'text-white/90' : 'text-gray-600'}>{car}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/crear-rifa"
                  className={`block w-full text-center font-black py-4 rounded-2xl transition-all text-base ${
                    plan.destacado
                      ? 'bg-[#FFD700] text-[#1A1008] hover:bg-[#FFE55C] btn-glow'
                      : 'bg-[#8B4513] text-white hover:bg-[#A0522D]'
                  }`}
                >
                  Empezar con {plan.nombre} →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-[#1A1008] mb-3">❓ Preguntas Frecuentes</h2>
            <p className="text-gray-500">¿Tienes más preguntas? Escríbenos por WhatsApp.</p>
          </div>

          <div className="space-y-4">
            {faq.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:border-[#FFD700]/30 transition-colors">
                <h3 className="font-bold text-[#1A1008] mb-2">{item.pregunta}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.respuesta}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA final */}
        <div className="mt-16 text-center bg-oso-gradient rounded-3xl p-12">
          <div className="text-5xl mb-4 animate-bear inline-block">🐻</div>
          <h2 className="text-3xl font-black text-white mb-3">¿Todavía tienes dudas?</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Habla con nuestro equipo. Te orientamos para elegir el plan perfecto para tu negocio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/584120000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#FFD700] text-[#1A1008] font-black px-8 py-4 rounded-2xl hover:bg-[#FFE55C] transition-colors"
            >
              💬 Hablar por WhatsApp
            </a>
            <Link
              href="/crear-rifa"
              className="inline-flex items-center justify-center gap-2 bg-white/15 text-white font-black px-8 py-4 rounded-2xl hover:bg-white/25 transition-colors border border-white/30"
            >
              🐻 Empezar prueba gratis
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
