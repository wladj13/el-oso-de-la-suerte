import Link from 'next/link';
import Image from 'next/image';
import { Eye, Clock, Shield, Users } from 'lucide-react';
import { Rifa } from '@/lib/types';
import { calcularProgreso, diasRestantes, formatearPrecio, truncarTexto } from '@/lib/utils';
import Badge from './ui/Badge';
import ProgressBar from './ui/ProgressBar';
import { metodosPagoInfo, categoriasRifa } from '@/lib/data';

interface RifaCardProps {
  rifa: Rifa;
  destacada?: boolean;
}

export default function RifaCard({ rifa, destacada = false }: RifaCardProps) {
  const progreso = calcularProgreso(rifa.ticketsVendidos, rifa.totalTickets);
  const dias = diasRestantes(rifa.fechaSorteo);
  const categoria = categoriasRifa.find((c) => c.id === rifa.categoria);

  return (
    <Link href={`/rifas/${rifa.slug}`} className="block">
      <div
        className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#8B4513]/10 group ${
          destacada
            ? 'border-[#FFD700] shadow-lg shadow-[#FFD700]/10'
            : 'border-gray-100 shadow-md'
        }`}
      >
        {/* Imagen del premio */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#FFF8E7] to-[#F5E6D0]">
          <Image
            src={rifa.premio.imagenes[0]}
            alt={rifa.premio.nombre}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
          />

          {/* Overlay superior */}
          <div className="absolute inset-x-0 top-0 p-3 flex justify-between items-start">
            {/* Badge estado */}
            <div className="flex gap-1.5 flex-wrap">
              {rifa.destacada && (
                <span className="bg-[#FFD700] text-[#1A1008] text-xs font-black px-2.5 py-1 rounded-full shadow">
                  ⭐ Destacada
                </span>
              )}
              {categoria && (
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shadow ${categoria.color}`}>
                  {categoria.emoji} {categoria.nombre}
                </span>
              )}
            </div>

            {/* Días restantes */}
            <div
              className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full shadow backdrop-blur-sm ${
                dias <= 3
                  ? 'bg-red-500 text-white animate-pulse'
                  : dias <= 7
                  ? 'bg-orange-500 text-white'
                  : 'bg-black/60 text-white'
              }`}
            >
              <Clock size={10} />
              {dias === 0 ? '¡Hoy!' : dias === 1 ? 'Mañana' : `${dias}d`}
            </div>
          </div>

          {/* Overlay inferior con precio */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-white/70 text-xs mb-0.5">Precio por ticket</div>
                <div className="text-white font-black text-2xl leading-none">
                  {formatearPrecio(rifa.precioTicket)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-white/70 text-xs mb-0.5">Premio valorado en</div>
                <div className="text-[#FFD700] font-black text-lg leading-none">
                  {formatearPrecio(rifa.premio.valorEstimado)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-5">
          {/* Organizador */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-[#FFF8E7] rounded-full flex items-center justify-center text-sm">
              🐻
            </div>
            <span className="text-xs text-gray-500 font-medium">
              {rifa.organizador.nombre}
            </span>
            {rifa.organizador.verificacionKYC && (
              <Shield size={12} className="text-[#228B22]" />
            )}
          </div>

          {/* Título */}
          <h3 className="font-black text-gray-900 text-lg leading-tight mb-2 group-hover:text-[#8B4513] transition-colors">
            {truncarTexto(rifa.nombre, 45)}
          </h3>

          {/* Descripción */}
          <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
            {truncarTexto(rifa.descripcion, 90)}
          </p>

          {/* Barra de progreso */}
          <ProgressBar
            progreso={progreso}
            vendidos={rifa.ticketsVendidos}
            total={rifa.totalTickets}
            className="mb-4"
          />

          {/* Métodos de pago y vistas */}
          <div className="flex items-center justify-between">
            {/* Métodos de pago */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {rifa.configuracion.metodosPago.slice(0, 3).map((metodo) => {
                const info = metodosPagoInfo[metodo];
                return (
                  <span
                    key={metodo}
                    title={info?.nombre}
                    className="text-base"
                  >
                    {info?.emoji}
                  </span>
                );
              })}
              {rifa.configuracion.metodosPago.length > 3 && (
                <span className="text-xs text-gray-400 font-medium">
                  +{rifa.configuracion.metodosPago.length - 3}
                </span>
              )}
            </div>

            {/* Vistas */}
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Eye size={13} />
              <span>{rifa.vistas.toLocaleString('es-VE')}</span>
            </div>
          </div>

          {/* CTA */}
          <button className="mt-4 w-full bg-[#8B4513] hover:bg-[#A0522D] text-white font-bold py-3 rounded-2xl transition-colors group-hover:bg-oso-gradient text-sm">
            Ver Tickets Disponibles →
          </button>
        </div>
      </div>
    </Link>
  );
}
