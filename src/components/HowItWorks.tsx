import Link from 'next/link';

const pasosComprador = [
  {
    numero: '01',
    emoji: '🔍',
    titulo: 'Elige tu rifa',
    descripcion: 'Navega el catálogo, filtra por categoría, precio o fecha de sorteo. Todos los organizadores son verificados.',
  },
  {
    numero: '02',
    emoji: '🎟️',
    titulo: 'Selecciona tickets',
    descripcion: 'Elige tus números de la suerte o deja que el sistema los asigne al azar. Sin complicaciones.',
  },
  {
    numero: '03',
    emoji: '💳',
    titulo: 'Paga fácil',
    descripcion: 'Zelle, Pago Móvil, Binance, efectivo o transferencia. El pago más rápido de Venezuela.',
  },
  {
    numero: '04',
    emoji: '🏆',
    titulo: '¡Gana!',
    descripcion: 'El sorteo es en vivo, grabado y 100% verificable. Si ganas, recibes tu premio en casa.',
  },
];

const pasosOrganizador = [
  {
    numero: '01',
    emoji: '📝',
    titulo: 'Crea tu cuenta',
    descripcion: 'Regístrate gratis y elige tu plan. Desde $19/mes para comenzar tu primera rifa.',
  },
  {
    numero: '02',
    emoji: '🎪',
    titulo: 'Configura tu rifa',
    descripcion: 'Sube fotos del premio, define el precio, métodos de pago y fecha del sorteo en 10 minutos.',
  },
  {
    numero: '03',
    emoji: '📣',
    titulo: 'Comparte y vende',
    descripcion: 'Tu rifa aparece en el marketplace. Comparte tu link personalizado en redes sociales.',
  },
  {
    numero: '04',
    emoji: '💰',
    titulo: 'Cobra y sortea',
    descripcion: 'Recibe pagos automáticamente, realiza el sorteo en vivo y entrega el premio.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-[#FFF8E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white text-[#8B4513] text-sm font-bold px-4 py-2 rounded-full shadow-sm mb-4">
            📖 Cómo Funciona
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#1A1008] mb-4">
            Simple, rápido y{' '}
            <span className="text-oso-gradient">transparente</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Ya sea que quieras participar o crear tu propia rifa, el proceso es tan simple que un oso lo haría.
          </p>
        </div>

        {/* Tabs */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Para compradores */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#FFD700] rounded-2xl flex items-center justify-center text-[#1A1008] font-black text-lg shadow">
                🎟️
              </div>
              <div>
                <h3 className="font-black text-xl text-[#1A1008]">Para Participantes</h3>
                <p className="text-sm text-gray-500">Compra tickets en segundos</p>
              </div>
            </div>

            <div className="space-y-6">
              {pasosComprador.map((paso, i) => (
                <div key={i} className="flex gap-4 group">
                  {/* Línea conectora */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-[#FFD700]/20 flex items-center justify-center text-2xl flex-shrink-0 group-hover:bg-[#FFD700]/10 transition-colors">
                      {paso.emoji}
                    </div>
                    {i < pasosComprador.length - 1 && (
                      <div className="w-0.5 h-full bg-[#FFD700]/30 mt-2 ml-0" />
                    )}
                  </div>
                  <div className="pb-6">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-black text-[#FFD700] uppercase tracking-widest">
                        Paso {paso.numero}
                      </span>
                    </div>
                    <h4 className="font-black text-[#1A1008] mb-1">{paso.titulo}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{paso.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/rifas"
              className="inline-flex items-center gap-2 mt-4 bg-[#FFD700] text-[#1A1008] font-black px-6 py-3 rounded-2xl hover:bg-[#FFE55C] transition-colors shadow-md"
            >
              🎟️ Ver rifas disponibles →
            </Link>
          </div>

          {/* Para organizadores */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#8B4513] rounded-2xl flex items-center justify-center text-white font-black text-lg shadow">
                🐻
              </div>
              <div>
                <h3 className="font-black text-xl text-[#1A1008]">Para Organizadores</h3>
                <p className="text-sm text-gray-500">Crea tu rifa en 10 minutos</p>
              </div>
            </div>

            <div className="space-y-6">
              {pasosOrganizador.map((paso, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-[#8B4513]/20 flex items-center justify-center text-2xl flex-shrink-0 group-hover:bg-[#8B4513]/5 transition-colors">
                      {paso.emoji}
                    </div>
                    {i < pasosOrganizador.length - 1 && (
                      <div className="w-0.5 h-full bg-[#8B4513]/20 mt-2" />
                    )}
                  </div>
                  <div className="pb-6">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-black text-[#8B4513] uppercase tracking-widest">
                        Paso {paso.numero}
                      </span>
                    </div>
                    <h4 className="font-black text-[#1A1008] mb-1">{paso.titulo}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{paso.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/crear-rifa"
              className="inline-flex items-center gap-2 mt-4 bg-[#8B4513] text-white font-black px-6 py-3 rounded-2xl hover:bg-[#A0522D] transition-colors shadow-md"
            >
              🐻 Crear mi primera rifa →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
