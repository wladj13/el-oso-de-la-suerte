'use client';

import Link from 'next/link';
import { ArrowRight, Play, Shield, Zap, Users } from 'lucide-react';
import Button from './ui/Button';
import { estadisticasPlataforma } from '@/lib/data';

const stats = [
  { valor: estadisticasPlataforma.rifasActivas.toLocaleString(), label: 'Rifas activas', emoji: '🎪' },
  { valor: estadisticasPlataforma.organizadoresVerificados.toLocaleString(), label: 'Organizadores', emoji: '✅' },
  { valor: `${(estadisticasPlataforma.ticketsVendidos / 1000).toFixed(0)}K+`, label: 'Tickets vendidos', emoji: '🎟️' },
  { valor: `$${(estadisticasPlataforma.montoTotalPremios / 1000000).toFixed(1)}M`, label: 'En premios', emoji: '💰' },
];

const trustBadges = [
  { icono: <Shield size={14} />, texto: 'Organizadores verificados' },
  { icono: <Zap size={14} />, texto: 'Sorteos 100% transparentes' },
  { icono: <Users size={14} />, texto: 'Soporte 24/7 en español' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#FFF8E7]">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Círculos decorativos */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#FFD700]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#8B4513]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#228B22]/5 rounded-full blur-3xl" />

        {/* Patrón de puntos */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(#8B4513 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Emojis flotantes decorativos */}
        <div className="absolute top-20 right-10 text-6xl animate-float opacity-30 hidden lg:block">🍀</div>
        <div className="absolute bottom-32 right-32 text-4xl animate-float opacity-25 hidden lg:block" style={{ animationDelay: '1s' }}>⭐</div>
        <div className="absolute top-48 left-10 text-4xl animate-float opacity-20 hidden lg:block" style={{ animationDelay: '2s' }}>🎟️</div>
        <div className="absolute bottom-48 left-32 text-3xl animate-float opacity-25 hidden lg:block" style={{ animationDelay: '0.5s' }}>💫</div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Columna izquierda: Texto */}
          <div>
            {/* Badge de anuncio */}
            <div className="inline-flex items-center gap-2 bg-white border border-[#FFD700] text-[#8B4513] text-sm font-semibold px-4 py-2 rounded-full shadow-sm mb-6">
              <span className="w-2 h-2 bg-[#228B22] rounded-full animate-pulse" />
              🐻 La plataforma #1 de rifas en Venezuela
              <ArrowRight size={14} />
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-none mb-6 text-[#1A1008]">
              Tu suerte
              <br />
              <span className="text-oso-gradient">tiene nombre</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
              Participa en rifas verificadas o <strong className="text-[#8B4513]">crea las tuyas propias</strong>.
              Sorteos transparentes, pagos con Zelle y Pago Móvil.
              El Oso cuida tu suerte. 🐻🍀
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              {trustBadges.map((badge, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-medium px-3 py-2 rounded-full shadow-sm"
                >
                  <span className="text-[#228B22]">{badge.icono}</span>
                  {badge.texto}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/rifas">
                <Button variante="dorado" tamaño="xl" className="w-full sm:w-auto font-black">
                  🎟️ Ver Rifas Activas
                </Button>
              </Link>
              <Link href="/crear-rifa">
                <Button variante="secundario" tamaño="xl" className="w-full sm:w-auto font-bold">
                  🐻 Crear mi Rifa
                  <ArrowRight size={20} />
                </Button>
              </Link>
            </div>

            {/* Video proof */}
            <button className="group flex items-center gap-3 text-[#8B4513] hover:text-[#A0522D] transition-colors">
              <div className="w-12 h-12 bg-[#8B4513] group-hover:bg-[#A0522D] rounded-full flex items-center justify-center text-white transition-colors shadow-lg">
                <Play size={18} className="ml-0.5" />
              </div>
              <div className="text-left">
                <div className="font-bold text-sm">Ver cómo funciona</div>
                <div className="text-xs text-gray-500">Video de 2 minutos</div>
              </div>
            </button>
          </div>

          {/* Columna derecha: Visual */}
          <div className="relative hidden lg:flex items-center justify-center">
            {/* Card central con el oso */}
            <div className="relative">
              {/* Card principal */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-[#FFD700]/20 animate-float w-80">
                <div className="text-center mb-6">
                  <div className="text-8xl mb-4 animate-bear inline-block">🐻</div>
                  <h3 className="font-black text-2xl text-[#8B4513]">El Oso de la Suerte</h3>
                  <p className="text-gray-500 text-sm mt-1">Tu guardián de la fortuna</p>
                </div>

                {/* Mini stats */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-[#FFF8E7] rounded-xl">
                    <span className="text-sm text-gray-600">🎪 Rifas activas</span>
                    <span className="font-black text-[#8B4513]">347</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                    <span className="text-sm text-gray-600">✅ Verificados</span>
                    <span className="font-black text-[#228B22]">124 org.</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl">
                    <span className="text-sm text-gray-600">💰 En premios</span>
                    <span className="font-black text-[#E5C100]">$2.8M+</span>
                  </div>
                </div>

                {/* CTA mini */}
                <button className="w-full mt-4 bg-[#FFD700] hover:bg-[#FFE55C] text-[#1A1008] font-black py-3 rounded-2xl transition-colors text-sm btn-glow">
                  🎟️ Comprar Tickets
                </button>
              </div>

              {/* Cards flotantes */}
              <div className="absolute -top-4 -right-20 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 w-44 animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🏆</span>
                  <div>
                    <div className="font-black text-sm text-gray-800">¡Nuevo ganador!</div>
                    <div className="text-xs text-gray-400">hace 2 horas</div>
                  </div>
                </div>
                <div className="text-xs text-[#228B22] font-semibold">iPhone 15 Pro Max ✓</div>
              </div>

              <div className="absolute -bottom-4 -left-20 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 w-44 animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="text-xs text-gray-500 mb-1">Última venta</div>
                <div className="font-black text-[#8B4513]">🏦 Zelle</div>
                <div className="text-xs text-gray-400">Ticket #247 • $5</div>
                <div className="flex items-center gap-1 mt-1">
                  <span className="w-1.5 h-1.5 bg-[#228B22] rounded-full animate-pulse" />
                  <span className="text-xs text-[#228B22]">Verificado</span>
                </div>
              </div>

              <div className="absolute top-1/2 -left-24 -translate-y-1/2 bg-[#8B4513] text-white rounded-2xl shadow-xl p-4 w-40 animate-float" style={{ animationDelay: '2s' }}>
                <div className="font-black text-2xl mb-1">78%</div>
                <div className="text-xs text-white/80">Tickets vendidos</div>
                <div className="mt-2 w-full bg-white/20 rounded-full h-2">
                  <div className="bg-[#FFD700] h-2 rounded-full" style={{ width: '78%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:border-[#FFD700]/30 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">{stat.emoji}</div>
              <div className="text-3xl font-black text-[#8B4513] mb-1">{stat.valor}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
