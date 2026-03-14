const testimonios = [
  {
    nombre: 'Ana Martínez',
    ubicacion: 'Caracas, Miranda',
    avatar: '👩',
    rol: 'Participante',
    texto:
      '¡Gané el iPhone! No podía creerlo cuando me notificaron. El sorteo fue en vivo por Instagram y todo fue súper transparente. El Oso cuida tu suerte de verdad.',
    calificacion: 5,
    premio: 'iPhone 15 Pro Max',
    verificado: true,
  },
  {
    nombre: 'Roberto Silva',
    ubicacion: 'Maracaibo, Zulia',
    avatar: '👨',
    rol: 'Organizador · Plan Plata',
    texto:
      'Organizo rifas desde hace 6 meses en El Oso. Las ventas se automatizaron, los comprobantes se verifican solos y el dashboard me muestra todo en tiempo real. Mis clientes confían más en mí.',
    calificacion: 5,
    verificado: true,
  },
  {
    nombre: 'Carmen López',
    ubicacion: 'Valencia, Carabobo',
    avatar: '👩‍💼',
    rol: 'Organizadora · Plan Oro',
    texto:
      'Antes usaba WhatsApp para todo y perdía vouchers constantemente. Con El Oso, tengo backup triple y OCR automático. Mis rifas venden el doble que antes.',
    calificacion: 5,
    verificado: true,
  },
  {
    nombre: 'Luis García',
    ubicacion: 'Barquisimeto, Lara',
    avatar: '🧑',
    rol: 'Vendedor',
    texto:
      'Soy vendedor de rifas y con el sistema de comisiones gané $340 el mes pasado. Puedo ver mis estadísticas en el app y saber cuánto voy a cobrar antes de que me paguen.',
    calificacion: 5,
    verificado: true,
  },
  {
    nombre: 'María Fernández',
    ubicacion: 'Ciudad Guayana, Bolívar',
    avatar: '👩‍🦱',
    rol: 'Participante',
    texto:
      'Me da mucha confianza que los organizadores estén verificados y que los sorteos queden grabados. Compré 3 tickets para el Toyota y aunque no gané, el proceso fue impecable.',
    calificacion: 5,
    verificado: true,
  },
  {
    nombre: 'Pedro Ramos',
    ubicacion: 'Mérida, Mérida',
    avatar: '👨‍💼',
    rol: 'Organizador · Plan Bronce',
    texto:
      'Empecé con el plan Bronce para probar. En mi primera rifa vendí 98 de 100 tickets con Pago Móvil. El soporte fue rápido y el proceso facilísimo. Ya voy al plan Plata.',
    calificacion: 5,
    verificado: true,
  },
];

function Estrellas({ cantidad }: { cantidad: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < cantidad ? 'text-[#FFD700]' : 'text-gray-200'}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-20 bg-[#1A1008] relative overflow-hidden">
      {/* Decoración */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD700]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#8B4513]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/5 text-[#FFD700] text-sm font-bold px-4 py-2 rounded-full border border-[#FFD700]/20 mb-4">
            ❤️ Lo que dice la comunidad
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            +289 ganadores no mienten
          </h2>
          <p className="text-xl text-gray-400 max-w-xl mx-auto">
            De venezolano para venezolano. Historias reales de la comunidad El Oso.
          </p>
        </div>

        {/* Grid testimonios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonios.map((t, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 hover:bg-white/8 hover:border-[#FFD700]/20 transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#8B4513]/20 rounded-2xl flex items-center justify-center text-2xl">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{t.nombre}</div>
                    <div className="text-gray-400 text-xs">{t.ubicacion}</div>
                  </div>
                </div>
                {t.verificado && (
                  <span className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded-full border border-green-500/20 font-semibold">
                    ✓ Real
                  </span>
                )}
              </div>

              {/* Estrellas y rol */}
              <div className="flex items-center justify-between mb-3">
                <Estrellas cantidad={t.calificacion} />
                <span className="text-xs text-gray-500">{t.rol}</span>
              </div>

              {/* Texto */}
              <p className="text-gray-300 text-sm leading-relaxed italic">
                &ldquo;{t.texto}&rdquo;
              </p>

              {/* Premio si aplica */}
              {t.premio && (
                <div className="mt-4 flex items-center gap-2 bg-[#FFD700]/10 border border-[#FFD700]/20 rounded-xl px-3 py-2">
                  <span className="text-[#FFD700]">🏆</span>
                  <span className="text-xs text-[#FFD700] font-semibold">Ganó: {t.premio}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { valor: '4.9/5', label: 'Calificación promedio', emoji: '⭐' },
            { valor: '98%', label: 'Sorteos exitosos', emoji: '✅' },
            { valor: '<60s', label: 'Verificación de voucher', emoji: '⚡' },
            { valor: '5 años', label: 'Retención de comprobantes', emoji: '🔒' },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl mb-2">{item.emoji}</div>
              <div className="text-2xl font-black text-[#FFD700] mb-1">{item.valor}</div>
              <div className="text-gray-400 text-xs">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
