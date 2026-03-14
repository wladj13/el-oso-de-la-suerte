import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Shield,
  Eye,
  Clock,
  Users,
  CheckCircle,
  Phone,
  Share2,
  Heart,
  ChevronRight,
  Star,
} from 'lucide-react';
import { rifasEjemplo, metodosPagoInfo, categoriasRifa } from '@/lib/data';
import {
  calcularProgreso,
  diasRestantes,
  formatearFecha,
  formatearPrecio,
} from '@/lib/utils';
import ProgressBar from '@/components/ui/ProgressBar';
import Badge from '@/components/ui/Badge';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return rifasEjemplo.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const rifa = rifasEjemplo.find((r) => r.slug === slug);
  if (!rifa) return { title: 'Rifa no encontrada' };
  return {
    title: rifa.nombre,
    description: rifa.descripcion,
  };
}

export default async function RifaDetallePage({ params }: Props) {
  const { slug } = await params;
  const rifa = rifasEjemplo.find((r) => r.slug === slug);
  if (!rifa) notFound();

  const progreso = calcularProgreso(rifa.ticketsVendidos, rifa.totalTickets);
  const dias = diasRestantes(rifa.fechaSorteo);
  const categoria = categoriasRifa.find((c) => c.id === rifa.categoria);
  const disponibles = rifa.totalTickets - rifa.ticketsVendidos;

  // Números de ticket de ejemplo
  const ticketsEjemplo = Array.from({ length: 30 }, (_, i) => ({
    numero: i + 1,
    vendido: Math.random() > 0.4,
  }));

  return (
    <div className="min-h-screen bg-[#FFF8E7] pt-16">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#8B4513]">Inicio</Link>
            <ChevronRight size={14} />
            <Link href="/rifas" className="hover:text-[#8B4513]">Rifas</Link>
            <ChevronRight size={14} />
            <span className="text-[#8B4513] font-medium truncate max-w-xs">{rifa.nombre}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Imagen principal */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
              <div className="relative aspect-video bg-gradient-to-br from-[#FFF8E7] to-[#F5E6D0]">
                <Image
                  src={rifa.premio.imagenes[0]}
                  alt={rifa.premio.nombre}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
                {/* Badges sobre imagen */}
                <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                  {rifa.destacada && (
                    <span className="bg-[#FFD700] text-[#1A1008] text-xs font-black px-3 py-1.5 rounded-full shadow-md">
                      ⭐ Destacada
                    </span>
                  )}
                  {categoria && (
                    <span className={`text-xs font-semibold px-3 py-1.5 rounded-full shadow-md ${categoria.color}`}>
                      {categoria.emoji} {categoria.nombre}
                    </span>
                  )}
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors shadow">
                    <Heart size={16} />
                  </button>
                  <button className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-500 hover:text-[#8B4513] transition-colors shadow">
                    <Share2 size={16} />
                  </button>
                </div>
                {/* Timer urgencia */}
                {dias <= 3 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-red-500 text-white text-sm font-black px-5 py-2 rounded-full animate-pulse shadow-lg">
                    🔥 ¡Quedan {dias === 0 ? 'pocas horas' : `${dias} días`}!
                  </div>
                )}
              </div>

              {/* Miniaturas */}
              {rifa.premio.imagenes.length > 1 && (
                <div className="p-4 flex gap-3 overflow-x-auto">
                  {rifa.premio.imagenes.map((img, i) => (
                    <div key={i} className="relative w-20 h-16 flex-shrink-0 rounded-xl overflow-hidden border-2 border-[#FFD700] cursor-pointer">
                      <Image src={img} alt={`Foto ${i + 1}`} fill className="object-cover" unoptimized />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info del premio */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h1 className="text-3xl md:text-4xl font-black text-[#1A1008] mb-3">{rifa.nombre}</h1>

              {/* Stats rápidos */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Eye size={15} />
                  <span>{rifa.vistas.toLocaleString('es-VE')} vistas</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Clock size={15} />
                  <span>Sorteo: {formatearFecha(rifa.fechaSorteo)}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Users size={15} />
                  <span>{rifa.ticketsVendidos} participantes</span>
                </div>
              </div>

              {/* Descripción */}
              <p className="text-gray-600 leading-relaxed mb-6">{rifa.descripcion}</p>

              {/* Especificaciones del premio */}
              {rifa.premio.especificaciones && (
                <div className="bg-[#FFF8E7] rounded-2xl p-5 border border-[#FFD700]/20">
                  <h3 className="font-black text-[#1A1008] mb-4 flex items-center gap-2">
                    🏆 Especificaciones del Premio
                  </h3>
                  <dl className="grid grid-cols-2 gap-3">
                    {Object.entries(rifa.premio.especificaciones).map(([key, val]) => (
                      <div key={key}>
                        <dt className="text-xs text-gray-400 font-medium uppercase tracking-wider">{key}</dt>
                        <dd className="text-sm font-bold text-[#1A1008] mt-0.5">{val}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>

            {/* Selección de tickets */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-black text-[#1A1008] mb-2">🎟️ Selecciona tus Tickets</h2>
              <p className="text-sm text-gray-500 mb-6">
                Elige tus números de la suerte. Verde = disponible, gris = vendido.
              </p>

              {/* Leyenda */}
              <div className="flex gap-4 mb-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 bg-[#228B22] rounded" />
                  <span className="text-gray-500">Disponible</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 bg-gray-200 rounded" />
                  <span className="text-gray-500">Vendido</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 bg-[#FFD700] rounded border-2 border-[#E5C100]" />
                  <span className="text-gray-500">Seleccionado</span>
                </div>
              </div>

              {/* Grid de tickets */}
              <div className="grid grid-cols-6 sm:grid-cols-10 gap-2 mb-6">
                {ticketsEjemplo.map((ticket) => (
                  <button
                    key={ticket.numero}
                    disabled={ticket.vendido}
                    className={`h-10 rounded-xl text-xs font-bold transition-all ${
                      ticket.vendido
                        ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                        : 'bg-[#228B22]/10 text-[#228B22] border border-[#228B22]/20 hover:bg-[#FFD700] hover:text-[#1A1008] hover:border-[#FFD700] hover:scale-110'
                    }`}
                  >
                    {ticket.numero}
                  </button>
                ))}
                <div className="col-span-full text-center py-2 text-xs text-gray-400">
                  ... y {disponibles - 30} tickets más disponibles
                </div>
              </div>

              {/* Botón aleatorio */}
              <div className="flex gap-3">
                <button className="flex-1 border-2 border-[#8B4513] text-[#8B4513] font-bold py-3 rounded-2xl hover:bg-[#FFF8E7] transition-colors text-sm">
                  🎲 Número Aleatorio
                </button>
                <button className="text-xs text-gray-400 px-3 py-3 hover:text-[#8B4513] transition-colors">
                  Limpiar
                </button>
              </div>
            </div>

            {/* Info del organizador */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-black text-[#1A1008] mb-6">👤 Organizador</h2>
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 bg-[#FFF8E7] rounded-2xl flex items-center justify-center text-4xl flex-shrink-0 border border-[#FFD700]/20">
                  🐻
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-black text-[#1A1008]">{rifa.organizador.nombre}</h3>
                    {rifa.organizador.verificacionKYC && (
                      <span className="flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-100">
                        <Shield size={10} />
                        Verificado
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < Math.floor(rifa.organizador.calificacion)
                            ? 'text-[#FFD700] fill-[#FFD700]'
                            : 'text-gray-200 fill-gray-200'
                        }
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-1">
                      {rifa.organizador.calificacion} · {rifa.organizador.rifasExitosas} rifas exitosas
                    </span>
                  </div>
                  {rifa.organizador.descripcion && (
                    <p className="text-sm text-gray-500 mb-4">{rifa.organizador.descripcion}</p>
                  )}
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-xl">
                      <Phone size={14} className="text-[#228B22]" />
                      <span>Contactar por WhatsApp</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-xl">
                      <CheckCircle size={14} className="text-[#228B22]" />
                      <span>Plan {rifa.organizador.plan.charAt(0).toUpperCase() + rifa.organizador.plan.slice(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna lateral - Checkout */}
          <div className="space-y-5">
            {/* Card de compra */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-[#FFD700]/20 sticky top-24">
              {/* Precio */}
              <div className="mb-4">
                <div className="flex items-end justify-between mb-1">
                  <div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider">Precio por ticket</div>
                    <div className="text-4xl font-black text-[#8B4513]">
                      {formatearPrecio(rifa.precioTicket)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">Premio valorado en</div>
                    <div className="text-lg font-black text-[#FFD700]">
                      {formatearPrecio(rifa.premio.valorEstimado)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Progreso */}
              <ProgressBar
                progreso={progreso}
                vendidos={rifa.ticketsVendidos}
                total={rifa.totalTickets}
                tamaño="lg"
                className="mb-4"
              />

              {/* Countdown */}
              <div className={`flex items-center gap-2 text-sm font-bold mb-5 p-3 rounded-2xl ${
                dias <= 3 ? 'bg-red-50 text-red-600' : 'bg-[#FFF8E7] text-[#8B4513]'
              }`}>
                <Clock size={16} />
                {dias === 0
                  ? '¡El sorteo es HOY!'
                  : dias === 1
                  ? '¡Sorteo mañana!'
                  : `Sorteo en ${dias} días · ${formatearFecha(rifa.fechaSorteo)}`}
              </div>

              {/* Cantidad de tickets */}
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Cantidad de tickets
                </label>
                <div className="flex items-center gap-3">
                  <button className="w-10 h-10 rounded-xl border-2 border-gray-200 text-gray-600 font-black hover:border-[#8B4513] hover:text-[#8B4513] transition-colors text-xl">
                    −
                  </button>
                  <span className="flex-1 text-center font-black text-2xl text-[#1A1008]">1</span>
                  <button className="w-10 h-10 rounded-xl border-2 border-gray-200 text-gray-600 font-black hover:border-[#8B4513] hover:text-[#8B4513] transition-colors text-xl">
                    +
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between mb-5 p-3 bg-[#FFF8E7] rounded-2xl border border-[#FFD700]/20">
                <span className="text-sm text-gray-600 font-medium">Total a pagar</span>
                <span className="font-black text-xl text-[#8B4513]">{formatearPrecio(rifa.precioTicket)}</span>
              </div>

              {/* CTA principal */}
              <button className="w-full bg-[#FFD700] hover:bg-[#FFE55C] text-[#1A1008] font-black py-4 rounded-2xl transition-all text-lg mb-3 btn-glow animate-pulse-gold">
                🎟️ Comprar Ticket Ahora
              </button>

              <button className="w-full border-2 border-[#8B4513] text-[#8B4513] font-bold py-3 rounded-2xl hover:bg-[#FFF8E7] transition-colors">
                🛒 Agregar al Carrito
              </button>

              {/* Métodos de pago */}
              <div className="mt-5">
                <p className="text-xs text-gray-400 mb-3 text-center">Métodos de pago disponibles</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {rifa.configuracion.metodosPago.map((metodo) => {
                    const info = metodosPagoInfo[metodo];
                    return (
                      <span
                        key={metodo}
                        className="flex items-center gap-1.5 text-xs bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl text-gray-600"
                      >
                        <span>{info?.emoji}</span>
                        <span>{info?.nombre}</span>
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Garantías */}
              <div className="mt-5 space-y-2">
                {[
                  '🔒 Pago 100% seguro y verificado',
                  '📱 Comprobante enviado por WhatsApp',
                  '🎥 Sorteo en vivo y grabado',
                  '⚡ Confirmación en menos de 60 segundos',
                ].map((g, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{g}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Compartir */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-bold text-sm text-gray-700 mb-3">📣 Compartir esta rifa</h3>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'WhatsApp', emoji: '💬', color: 'bg-green-50 text-green-700 border-green-100' },
                  { label: 'Telegram', emoji: '✈️', color: 'bg-blue-50 text-blue-700 border-blue-100' },
                  { label: 'Copiar link', emoji: '🔗', color: 'bg-gray-50 text-gray-700 border-gray-100' },
                ].map((s) => (
                  <button
                    key={s.label}
                    className={`flex flex-col items-center gap-1 py-3 rounded-2xl border text-xs font-semibold transition-all hover:scale-105 ${s.color}`}
                  >
                    <span className="text-lg">{s.emoji}</span>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
