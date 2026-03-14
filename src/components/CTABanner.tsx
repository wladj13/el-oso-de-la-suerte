import Link from 'next/link';

export default function CTABanner() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner principal */}
        <div className="relative bg-oso-gradient rounded-3xl overflow-hidden p-10 md:p-16 text-center">
          {/* Decoración de fondo */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-10 -right-10 text-9xl opacity-10 font-black">🐻</div>
            <div className="absolute -bottom-10 -left-10 text-9xl opacity-10 font-black">🍀</div>
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
          </div>

          <div className="relative">
            {/* Oso animado */}
            <div className="text-6xl mb-6 inline-block animate-bear">🐻</div>

            <h2 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
              ¿Listo para que
              <br />
              el oso cuide tu suerte?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Únete a más de <strong className="text-[#FFD700]">124 organizadores</strong> verificados
              y <strong className="text-[#FFD700]">48,000+</strong> participantes activos.
              La plataforma crece contigo.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/rifas"
                className="inline-flex items-center justify-center gap-2 bg-[#FFD700] text-[#1A1008] font-black px-10 py-5 rounded-2xl hover:bg-[#FFE55C] transition-all text-lg shadow-xl btn-glow"
              >
                🎟️ Participar en Rifas
              </Link>
              <Link
                href="/crear-rifa"
                className="inline-flex items-center justify-center gap-2 bg-white/15 backdrop-blur-sm text-white font-black px-10 py-5 rounded-2xl hover:bg-white/25 transition-all text-lg border border-white/30"
              >
                🐻 Crear mi Rifa → Gratis
              </Link>
            </div>

            {/* Mini garantías */}
            <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-white/70">
              <span className="flex items-center gap-2">✅ Sin tarjeta de crédito</span>
              <span className="flex items-center gap-2">✅ 7 días de prueba gratis</span>
              <span className="flex items-center gap-2">✅ Cancela cuando quieras</span>
              <span className="flex items-center gap-2">✅ Soporte en español</span>
            </div>
          </div>
        </div>

        {/* Logos/métodos de pago sección */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm mb-6 uppercase tracking-widest font-medium">
            Métodos de pago aceptados
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { emoji: '🏦', nombre: 'Zelle', sub: 'USD' },
              { emoji: '📲', nombre: 'Pago Móvil', sub: 'VES' },
              { emoji: '🟡', nombre: 'Binance', sub: 'USDT' },
              { emoji: '💵', nombre: 'Efectivo', sub: 'USD/VES' },
              { emoji: '🪙', nombre: 'USDT', sub: 'Crypto' },
              { emoji: '💳', nombre: 'Tarjeta', sub: 'Internacional' },
            ].map((metodo) => (
              <div
                key={metodo.nombre}
                className="flex items-center gap-2.5 bg-gray-50 border border-gray-100 px-5 py-3 rounded-2xl hover:border-[#FFD700]/30 hover:bg-[#FFF8E7] transition-all"
              >
                <span className="text-xl">{metodo.emoji}</span>
                <div className="text-left">
                  <div className="text-sm font-bold text-gray-700">{metodo.nombre}</div>
                  <div className="text-xs text-gray-400">{metodo.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
