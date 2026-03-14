import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import RifaCard from './RifaCard';
import { rifasEjemplo } from '@/lib/data';

export default function FeaturedRifas() {
  const rifasDestacadas = rifasEjemplo.filter((r) => r.destacada);
  const rifasRecientes = rifasEjemplo.filter((r) => !r.destacada).slice(0, 3);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado sección Destacadas */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#FFD700]/10 text-[#8B4513] text-sm font-bold px-4 py-2 rounded-full mb-3">
              ⭐ Rifas Destacadas
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1008]">
              Los premios más
              <br />
              <span className="text-oso-gradient">codiciados</span>
            </h2>
          </div>
          <Link
            href="/rifas"
            className="hidden md:flex items-center gap-2 text-[#8B4513] font-bold hover:gap-3 transition-all group"
          >
            Ver todas las rifas
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid de rifas destacadas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {rifasDestacadas.map((rifa) => (
            <RifaCard key={rifa.id} rifa={rifa} destacada />
          ))}
        </div>

        {/* Separador con CTA */}
        <div className="relative my-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-6 text-gray-400 text-sm font-medium">También te puede interesar</span>
          </div>
        </div>

        {/* Rifas recientes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {rifasRecientes.map((rifa) => (
            <RifaCard key={rifa.id} rifa={rifa} />
          ))}
        </div>

        {/* CTA ver todas - móvil */}
        <div className="text-center md:hidden">
          <Link
            href="/rifas"
            className="inline-flex items-center gap-2 bg-[#8B4513] text-white font-bold px-8 py-4 rounded-2xl hover:bg-[#A0522D] transition-colors"
          >
            Ver todas las rifas
            <ArrowRight size={20} />
          </Link>
        </div>

        {/* CTA desktop */}
        <div className="hidden md:flex justify-center mt-6">
          <Link
            href="/rifas"
            className="inline-flex items-center gap-2 border-2 border-[#8B4513] text-[#8B4513] font-bold px-10 py-4 rounded-2xl hover:bg-[#FFF8E7] transition-colors text-lg"
          >
            Ver las {rifasEjemplo.length}+ rifas disponibles
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
