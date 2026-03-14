import { Metadata } from 'next';
import Link from 'next/link';
import { Check, ArrowRight, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Crear mi Rifa',
  description: 'Crea tu rifa en 10 minutos. Elige tu plan, configura el premio y empieza a vender con Zelle, Pago Móvil y más.',
};

const beneficios = [
  '✅ Dominio o subdominio personalizado',
  '✅ Pagos con Zelle, Pago Móvil y Binance',
  '✅ Verificación automática de vouchers',
  '✅ Sorteo en vivo con algoritmo verificable',
  '✅ Sistema de vendedores con comisiones',
  '✅ Analytics y Facebook Pixel incluidos',
  '✅ Backup triple de comprobantes',
  '✅ Soporte en español 24/7',
];

const pasos = [
  {
    numero: 1,
    titulo: 'Crea tu cuenta',
    descripcion: 'Regístrate con tu email o Gmail. Sin tarjeta de crédito.',
    emoji: '👤',
    tiempo: '1 min',
  },
  {
    numero: 2,
    titulo: 'Elige tu plan',
    descripcion: 'Bronce, Plata u Oro según tus necesidades. 7 días gratis.',
    emoji: '💎',
    tiempo: '1 min',
  },
  {
    numero: 3,
    titulo: 'Configura tu rifa',
    descripcion: 'Sube fotos, define precio, métodos de pago y fecha del sorteo.',
    emoji: '🎪',
    tiempo: '5 min',
  },
  {
    numero: 4,
    titulo: '¡Empieza a vender!',
    descripcion: 'Tu rifa aparece en el marketplace y puedes compartir tu link.',
    emoji: '🚀',
    tiempo: '3 min',
  },
];

const testimonioDestacado = {
  nombre: 'María González',
  rol: 'Organizadora · Plan Oro · 48 rifas creadas',
  texto: '"Con El Oso de la Suerte lancé mi primera rifa en 15 minutos y vendí 156 de 200 tickets en 3 días. Mis clientes confían más porque todo es transparente."',
  calificacion: 5,
};

export default function CrearRifaPage() {
  return (
    <div className="min-h-screen bg-[#FFF8E7] pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Columna izquierda: Info */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white text-[#8B4513] text-sm font-bold px-4 py-2 rounded-full border border-[#FFD700]/30 shadow-sm mb-6">
              🐻 Crea tu rifa en 10 minutos
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-[#1A1008] leading-none mb-6">
              Tu rifa,
              <br />
              <span className="text-oso-gradient">tus reglas</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              La plataforma más completa de Venezuela para organizar rifas.
              Sin conocimientos técnicos. Sin complicaciones. El Oso hace el trabajo pesado.
            </p>

            {/* Pasos */}
            <div className="space-y-5 mb-10">
              {pasos.map((paso) => (
                <div key={paso.numero} className="flex gap-5 group">
                  <div className="w-14 h-14 bg-white rounded-2xl border border-[#FFD700]/20 flex flex-col items-center justify-center flex-shrink-0 shadow-sm group-hover:bg-[#FFD700]/10 transition-colors">
                    <span className="text-2xl">{paso.emoji}</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-3 mb-0.5">
                      <h3 className="font-black text-[#1A1008]">
                        {paso.numero}. {paso.titulo}
                      </h3>
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                        ~{paso.tiempo}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm">{paso.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Beneficios */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm mb-8">
              <h3 className="font-black text-[#1A1008] mb-4">¿Qué incluye tu cuenta?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {beneficios.map((b, i) => (
                  <div key={i} className="text-sm text-gray-600 flex items-start gap-1">
                    {b}
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonio */}
            <div className="bg-[#8B4513] rounded-3xl p-6 text-white">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: testimonioDestacado.calificacion }).map((_, i) => (
                  <Star key={i} size={16} className="text-[#FFD700] fill-[#FFD700]" />
                ))}
              </div>
              <p className="text-white/90 italic text-sm leading-relaxed mb-4">
                {testimonioDestacado.texto}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-xl">
                  👩
                </div>
                <div>
                  <div className="font-bold text-sm">{testimonioDestacado.nombre}</div>
                  <div className="text-white/60 text-xs">{testimonioDestacado.rol}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha: Formulario de registro */}
          <div>
            <div className="bg-white rounded-3xl shadow-xl border border-[#FFD700]/20 overflow-hidden">
              {/* Header del form */}
              <div className="bg-oso-gradient p-6 text-center">
                <div className="text-4xl mb-2 animate-bear inline-block">🐻</div>
                <h2 className="text-2xl font-black text-white">Empieza Gratis Hoy</h2>
                <p className="text-white/80 text-sm mt-1">7 días de prueba · Sin tarjeta</p>
              </div>

              <div className="p-8">
                {/* Form */}
                <form className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        placeholder="Tu nombre"
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:border-[#FFD700] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">
                        Apellido *
                      </label>
                      <input
                        type="text"
                        placeholder="Tu apellido"
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:border-[#FFD700] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">
                      Correo electrónico *
                    </label>
                    <input
                      type="email"
                      placeholder="tu@correo.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:border-[#FFD700] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">
                      WhatsApp / Teléfono *
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
                        +58
                      </span>
                      <input
                        type="tel"
                        placeholder="412-000-0000"
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:border-[#FFD700] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">
                      Contraseña *
                    </label>
                    <input
                      type="password"
                      placeholder="Mínimo 8 caracteres"
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:border-[#FFD700] transition-all"
                    />
                  </div>

                  {/* Plan selector */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      ¿Con qué plan quieres empezar?
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'bronce', emoji: '🥉', nombre: 'Bronce', precio: '$19' },
                        { id: 'plata', emoji: '🥈', nombre: 'Plata', precio: '$49', popular: true },
                        { id: 'oro', emoji: '🥇', nombre: 'Oro', precio: '$99' },
                      ].map((plan) => (
                        <label
                          key={plan.id}
                          className="relative cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="plan"
                            value={plan.id}
                            defaultChecked={plan.id === 'plata'}
                            className="sr-only peer"
                          />
                          <div className="peer-checked:border-[#8B4513] peer-checked:bg-[#FFF8E7] border-2 border-gray-100 rounded-2xl p-3 text-center transition-all hover:border-[#8B4513]/30">
                            <div className="text-xl mb-1">{plan.emoji}</div>
                            <div className="text-xs font-bold text-gray-700">{plan.nombre}</div>
                            <div className="text-xs text-[#8B4513] font-black">{plan.precio}/mes</div>
                          </div>
                          {plan.popular && (
                            <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#FFD700] text-[#1A1008] text-[9px] font-black px-2 py-0.5 rounded-full whitespace-nowrap">
                              POPULAR
                            </span>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Términos */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="terminos"
                      className="mt-0.5 text-[#8B4513] focus:ring-[#8B4513] rounded"
                    />
                    <label htmlFor="terminos" className="text-xs text-gray-500 leading-relaxed">
                      Acepto los{' '}
                      <Link href="/terminos" className="text-[#8B4513] hover:underline font-semibold">
                        Términos y Condiciones
                      </Link>{' '}
                      y la{' '}
                      <Link href="/privacidad" className="text-[#8B4513] hover:underline font-semibold">
                        Política de Privacidad
                      </Link>{' '}
                      de El Oso de la Suerte.
                    </label>
                  </div>

                  {/* CTA */}
                  <button
                    type="submit"
                    className="w-full bg-[#FFD700] hover:bg-[#FFE55C] text-[#1A1008] font-black py-4 rounded-2xl transition-all text-lg btn-glow flex items-center justify-center gap-2"
                  >
                    🐻 Crear mi cuenta gratis
                    <ArrowRight size={20} />
                  </button>

                  {/* Alternativa Google */}
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-100" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-white px-4 text-xs text-gray-400">o continúa con</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="w-full border-2 border-gray-200 text-gray-700 font-bold py-3 rounded-2xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-3"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continuar con Google
                  </button>
                </form>

                {/* Ya tienes cuenta */}
                <p className="text-center text-sm text-gray-400 mt-5">
                  ¿Ya tienes cuenta?{' '}
                  <Link href="/login" className="text-[#8B4513] font-bold hover:underline">
                    Iniciar sesión
                  </Link>
                </p>
              </div>
            </div>

            {/* Garantías debajo del form */}
            <div className="grid grid-cols-3 gap-3 mt-5">
              {[
                { emoji: '🔒', texto: 'Datos seguros' },
                { emoji: '💸', texto: 'Sin cobros ocultos' },
                { emoji: '🇻🇪', texto: 'Hecho en Venezuela' },
              ].map((g) => (
                <div key={g.texto} className="bg-white rounded-2xl p-4 text-center border border-gray-100 shadow-sm">
                  <div className="text-2xl mb-1">{g.emoji}</div>
                  <div className="text-xs text-gray-500 font-medium">{g.texto}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
