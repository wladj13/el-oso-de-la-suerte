'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  Menu,
  X,
  Search,
  ArrowUp,
  Copy,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/* ─────────────────────────────────────────────
   ESTRUCTURA DEL MANUAL
───────────────────────────────────────────── */
const secciones = [
  {
    id: 'introduccion',
    emoji: '🐻',
    titulo: 'Introducción',
    color: 'brown',
    subsecciones: [
      { id: 'que-es', titulo: '¿Qué es El Oso de la Suerte?' },
      { id: 'como-funciona', titulo: '¿Cómo funciona?' },
      { id: 'por-que-confiable', titulo: '¿Por qué es confiable?' },
    ],
  },
  {
    id: 'participantes',
    emoji: '🎟️',
    titulo: 'Para Participantes',
    color: 'gold',
    subsecciones: [
      { id: 'crear-cuenta', titulo: 'Crear una cuenta' },
      { id: 'explorar-rifas', titulo: 'Explorar el catálogo' },
      { id: 'comprar-ticket', titulo: 'Comprar un ticket' },
      { id: 'metodos-pago', titulo: 'Métodos de pago' },
      { id: 'enviar-voucher', titulo: 'Enviar comprobante' },
      { id: 'ver-sorteo', titulo: 'Ver el sorteo en vivo' },
      { id: 'recibir-premio', titulo: 'Recibir el premio' },
    ],
  },
  {
    id: 'organizadores',
    emoji: '🎪',
    titulo: 'Para Organizadores',
    color: 'green',
    subsecciones: [
      { id: 'registro-org', titulo: 'Registro y verificación' },
      { id: 'elegir-plan', titulo: 'Elegir tu plan' },
      { id: 'crear-rifa', titulo: 'Crear una rifa paso a paso' },
      { id: 'configurar-pagos', titulo: 'Configurar métodos de pago' },
      { id: 'gestionar-vouchers', titulo: 'Gestionar vouchers' },
      { id: 'dominio-propio', titulo: 'Configurar dominio propio' },
      { id: 'realizar-sorteo', titulo: 'Realizar el sorteo en vivo' },
      { id: 'dashboard', titulo: 'Usar el Dashboard' },
    ],
  },
  {
    id: 'vendedores',
    emoji: '🏆',
    titulo: 'Para Vendedores',
    color: 'blue',
    subsecciones: [
      { id: 'unirse-equipo', titulo: 'Unirse a un equipo' },
      { id: 'vender-tickets', titulo: 'Cómo vender tickets' },
      { id: 'ver-comisiones', titulo: 'Ver tus comisiones' },
      { id: 'cobrar-comision', titulo: 'Cobrar tu comisión' },
    ],
  },
  {
    id: 'pagos',
    emoji: '💳',
    titulo: 'Pagos y Seguridad',
    color: 'purple',
    subsecciones: [
      { id: 'zelle', titulo: 'Pagar con Zelle' },
      { id: 'pago-movil', titulo: 'Pagar con Pago Móvil' },
      { id: 'binance', titulo: 'Pagar con Binance' },
      { id: 'seguridad-pagos', titulo: 'Seguridad de pagos' },
    ],
  },
  {
    id: 'faq',
    emoji: '❓',
    titulo: 'Preguntas Frecuentes',
    color: 'red',
    subsecciones: [
      { id: 'faq-compradores', titulo: 'FAQ Compradores' },
      { id: 'faq-organizadores', titulo: 'FAQ Organizadores' },
      { id: 'faq-sorteos', titulo: 'FAQ Sorteos' },
    ],
  },
  {
    id: 'soporte',
    emoji: '🛟',
    titulo: 'Soporte',
    color: 'brown',
    subsecciones: [
      { id: 'contactar-soporte', titulo: 'Contactar soporte' },
      { id: 'canales', titulo: 'Canales de ayuda' },
    ],
  },
];

/* Colores por sección */
const colorMap: Record<string, string> = {
  brown: 'bg-[#FFF8E7] border-[#FFD700]/30 text-[#8B4513]',
  gold: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  green: 'bg-green-50 border-green-200 text-[#228B22]',
  blue: 'bg-blue-50 border-blue-200 text-blue-700',
  purple: 'bg-purple-50 border-purple-200 text-purple-700',
  red: 'bg-red-50 border-red-200 text-red-700',
};

const accentMap: Record<string, string> = {
  brown: 'bg-[#8B4513]',
  gold: 'bg-[#FFD700]',
  green: 'bg-[#228B22]',
  blue: 'bg-blue-600',
  purple: 'bg-purple-600',
  red: 'bg-red-500',
};

/* ─────────────────────────────────────────────
   COMPONENTES REUTILIZABLES DEL MANUAL
───────────────────────────────────────────── */
function Paso({ numero, titulo, descripcion }: { numero: number; titulo: string; descripcion: string }) {
  return (
    <div className="flex gap-4 group">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-2xl bg-[#8B4513] text-white flex items-center justify-center font-black text-base flex-shrink-0 shadow-md">
          {numero}
        </div>
        <div className="w-0.5 bg-[#FFD700]/30 flex-1 mt-2" />
      </div>
      <div className="pb-6 flex-1">
        <h4 className="font-black text-gray-900 mb-1">{titulo}</h4>
        <p className="text-gray-600 text-sm leading-relaxed">{descripcion}</p>
      </div>
    </div>
  );
}

function Alerta({
  tipo,
  titulo,
  children,
}: {
  tipo: 'info' | 'advertencia' | 'exito' | 'error';
  titulo: string;
  children: React.ReactNode;
}) {
  const estilos = {
    info: { bg: 'bg-blue-50 border-blue-200', icono: 'ℹ️', texto: 'text-blue-800' },
    advertencia: { bg: 'bg-yellow-50 border-yellow-200', icono: '⚠️', texto: 'text-yellow-800' },
    exito: { bg: 'bg-green-50 border-green-200', icono: '✅', texto: 'text-[#228B22]' },
    error: { bg: 'bg-red-50 border-red-200', icono: '❌', texto: 'text-red-700' },
  };
  const e = estilos[tipo];
  return (
    <div className={`rounded-2xl border p-4 my-4 ${e.bg}`}>
      <div className={`flex items-center gap-2 font-bold mb-1 ${e.texto}`}>
        <span>{e.icono}</span>
        {titulo}
      </div>
      <div className={`text-sm leading-relaxed ${e.texto} opacity-80`}>{children}</div>
    </div>
  );
}

function Codigo({ children }: { children: string }) {
  const [copiado, setCopiado] = useState(false);
  const copiar = () => {
    navigator.clipboard.writeText(children);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };
  return (
    <div className="relative bg-[#1A1008] rounded-2xl p-4 my-4 font-mono text-sm text-[#FFD700] overflow-x-auto group">
      <button
        onClick={copiar}
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 hover:bg-white/20 text-white p-1.5 rounded-lg"
      >
        {copiado ? <CheckCircle size={14} className="text-green-400" /> : <Copy size={14} />}
      </button>
      <code>{children}</code>
    </div>
  );
}

function SeccionHeader({
  id,
  emoji,
  titulo,
  descripcion,
  color,
}: {
  id: string;
  emoji: string;
  titulo: string;
  descripcion: string;
  color: string;
}) {
  return (
    <div id={id} className={`rounded-3xl border p-6 mb-8 ${colorMap[color]}`}>
      <div className="flex items-center gap-4">
        <div className="text-5xl">{emoji}</div>
        <div>
          <h2 className="text-2xl md:text-3xl font-black">{titulo}</h2>
          <p className="text-sm opacity-70 mt-1">{descripcion}</p>
        </div>
      </div>
    </div>
  );
}

function SubSeccion({ id, titulo, children }: { id: string; titulo: string; children: React.ReactNode }) {
  return (
    <div id={id} className="mb-12 scroll-mt-24">
      <h3 className="text-xl font-black text-[#1A1008] mb-4 flex items-center gap-3 pb-3 border-b border-gray-100">
        <span className="w-1 h-6 rounded-full bg-[#FFD700] inline-block flex-shrink-0" />
        {titulo}
      </h3>
      <div className="space-y-3 text-gray-700 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   COMPONENTE PRINCIPAL
───────────────────────────────────────────── */
export default function ManualClient() {
  const [activoId, setActivoId] = useState('introduccion');
  const [sidebarAbierto, setSidebarAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [mostrarScroll, setMostrarScroll] = useState(false);
  const [seccionesAbiertas, setSeccionesAbiertas] = useState<Record<string, boolean>>({
    introduccion: true,
    participantes: true,
  });

  useEffect(() => {
    const handleScroll = () => {
      setMostrarScroll(window.scrollY > 400);

      // Detectar sección activa
      const ids = secciones.flatMap((s) => [s.id, ...s.subsecciones.map((sub) => sub.id)]);
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActivoId(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSeccion = (id: string) => {
    setSeccionesAbiertas((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const navegar = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setSidebarAbierto(false);
    }
  };

  // Filtrar secciones por búsqueda
  const seccionesFiltradas = busqueda
    ? secciones.filter(
        (s) =>
          s.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
          s.subsecciones.some((sub) => sub.titulo.toLowerCase().includes(busqueda.toLowerCase()))
      )
    : secciones;

  return (
    <div className="min-h-screen bg-[#FFF8E7] pt-16">
      {/* Hero del manual */}
      <div className="bg-[#1A1008] text-white py-14 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFD700]/5 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-5"
            style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '28px 28px' }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight size={14} />
            <span className="text-white">Manual de Usuario</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-6xl animate-bear">🐻</div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-black leading-none">
                    Manual de <span className="text-[#FFD700]">Usuario</span>
                  </h1>
                  <p className="text-gray-400 mt-1 text-lg">El Oso de la Suerte · Guía Completa</p>
                </div>
              </div>
              <p className="text-gray-300 max-w-xl leading-relaxed">
                Todo lo que necesitas saber para participar en rifas, crear las tuyas propias
                o formar parte de un equipo de ventas. Guía oficial en español.
              </p>
            </div>

            {/* Stats del manual */}
            <div className="grid grid-cols-3 gap-3 flex-shrink-0">
              {[
                { valor: '7', label: 'Secciones', emoji: '📚' },
                { valor: '35+', label: 'Temas', emoji: '📄' },
                { valor: '5 min', label: 'Para empezar', emoji: '⚡' },
              ].map((s) => (
                <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                  <div className="text-xl mb-1">{s.emoji}</div>
                  <div className="text-xl font-black text-[#FFD700]">{s.valor}</div>
                  <div className="text-xs text-gray-400">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Accesos rápidos */}
          <div className="flex flex-wrap gap-2 mt-8">
            {secciones.map((s) => (
              <button
                key={s.id}
                onClick={() => navegar(s.id)}
                className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-sm px-4 py-2 rounded-full transition-all"
              >
                {s.emoji} {s.titulo}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-10">
          {/* ── SIDEBAR ── */}
          <>
            {/* Overlay móvil */}
            {sidebarAbierto && (
              <div
                className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                onClick={() => setSidebarAbierto(false)}
              />
            )}

            <aside
              className={cn(
                'fixed lg:sticky top-0 lg:top-24 h-screen lg:h-[calc(100vh-6rem)] w-72 bg-white rounded-3xl border border-gray-100 shadow-xl flex flex-col z-50 transition-transform duration-300',
                sidebarAbierto ? 'translate-x-0 left-0' : '-translate-x-full lg:translate-x-0 left-0'
              )}
            >
              {/* Header sidebar */}
              <div className="p-5 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-black text-gray-900 flex items-center gap-2">
                    📚 Contenido
                  </span>
                  <button
                    className="lg:hidden p-1.5 text-gray-400 hover:text-gray-700 rounded-lg"
                    onClick={() => setSidebarAbierto(false)}
                  >
                    <X size={18} />
                  </button>
                </div>
                {/* Búsqueda */}
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar en el manual..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full pl-8 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:border-[#FFD700]"
                  />
                </div>
              </div>

              {/* Nav items */}
              <nav className="flex-1 overflow-y-auto p-3">
                {seccionesFiltradas.map((seccion) => {
                  const abierta = seccionesAbiertas[seccion.id] ?? false;
                  const esActiva = activoId === seccion.id || seccion.subsecciones.some((s) => s.id === activoId);
                  return (
                    <div key={seccion.id} className="mb-1">
                      <button
                        onClick={() => {
                          toggleSeccion(seccion.id);
                          navegar(seccion.id);
                        }}
                        className={cn(
                          'w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-sm font-bold transition-all',
                          esActiva
                            ? 'bg-[#FFF8E7] text-[#8B4513]'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <span>{seccion.emoji}</span>
                          {seccion.titulo}
                        </span>
                        <ChevronRight
                          size={14}
                          className={cn('transition-transform flex-shrink-0', abierta && 'rotate-90')}
                        />
                      </button>

                      {/* Subsecciones */}
                      {abierta && (
                        <div className="ml-4 mt-1 space-y-0.5">
                          {seccion.subsecciones
                            .filter((sub) =>
                              busqueda ? sub.titulo.toLowerCase().includes(busqueda.toLowerCase()) : true
                            )
                            .map((sub) => (
                              <button
                                key={sub.id}
                                onClick={() => navegar(sub.id)}
                                className={cn(
                                  'w-full text-left px-3 py-2 rounded-xl text-xs transition-all',
                                  activoId === sub.id
                                    ? 'bg-[#8B4513] text-white font-bold'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                                )}
                              >
                                {sub.titulo}
                              </button>
                            ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* Footer sidebar */}
              <div className="p-4 border-t border-gray-100">
                <div className="bg-[#FFF8E7] rounded-2xl p-3 text-center border border-[#FFD700]/20">
                  <div className="text-xl mb-1">💬</div>
                  <p className="text-xs text-gray-600 font-medium">¿Necesitas ayuda extra?</p>
                  <a
                    href="https://wa.me/584120000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#228B22] font-black hover:underline"
                  >
                    Escríbenos por WhatsApp →
                  </a>
                </div>
              </div>
            </aside>
          </>

          {/* ── CONTENIDO PRINCIPAL ── */}
          <main className="flex-1 min-w-0">
            {/* Botón abrir sidebar en móvil */}
            <button
              className="lg:hidden flex items-center gap-2 mb-6 bg-white border border-gray-200 text-gray-700 font-bold px-4 py-2.5 rounded-xl shadow-sm hover:border-[#8B4513] hover:text-[#8B4513] transition-colors text-sm"
              onClick={() => setSidebarAbierto(true)}
            >
              <Menu size={16} />
              Ver índice del manual
            </button>

            {/* ═══════════════════════════════════
                1. INTRODUCCIÓN
            ═══════════════════════════════════ */}
            <div id="introduccion" className="scroll-mt-24 mb-16">
              <SeccionHeader
                id="introduccion-header"
                emoji="🐻"
                titulo="Introducción"
                descripcion="Bienvenido a la plataforma de rifas más confiable de Venezuela"
                color="brown"
              />

              <SubSeccion id="que-es" titulo="¿Qué es El Oso de la Suerte?">
                <p>
                  <strong>El Oso de la Suerte</strong> es la plataforma híbrida de rifas número 1 de Venezuela.
                  Combinamos dos modelos en uno:
                </p>
                <div className="grid md:grid-cols-2 gap-4 my-4">
                  <div className="bg-[#FFF8E7] border border-[#FFD700]/30 rounded-2xl p-5">
                    <div className="text-3xl mb-2">🛒</div>
                    <h4 className="font-black text-[#8B4513] mb-1">Marketplace</h4>
                    <p>Catálogo público donde cualquier persona puede explorar y participar en rifas verificadas.</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
                    <div className="text-3xl mb-2">🎪</div>
                    <h4 className="font-black text-[#228B22] mb-1">SAAS para Organizadores</h4>
                    <p>Herramientas profesionales para crear y gestionar tus propias rifas con tu dominio y marca.</p>
                  </div>
                </div>
                <p>
                  La plataforma fue diseñada <strong>de venezolano para venezolano</strong>, con soporte para
                  Zelle, Pago Móvil, Binance y todos los métodos de pago locales.
                </p>
              </SubSeccion>

              <SubSeccion id="como-funciona" titulo="¿Cómo funciona?">
                <p>El flujo básico de una rifa en El Oso de la Suerte es simple:</p>
                <div className="my-6 space-y-0">
                  <Paso numero={1} titulo="El organizador crea la rifa" descripcion="Define el premio, el precio por ticket, la fecha del sorteo y los métodos de pago aceptados. Todo se configura en menos de 10 minutos." />
                  <Paso numero={2} titulo="Los participantes compran tickets" descripcion="Desde el marketplace o el link directo de la rifa, eligen sus números de la suerte y envían el comprobante de pago." />
                  <Paso numero={3} titulo="El organizador aprueba los pagos" descripcion="Verifica el comprobante (manual o con OCR automático) y asigna oficialmente los tickets al comprador." />
                  <Paso numero={4} titulo="Se realiza el sorteo en vivo" descripcion="El sorteo se transmite por Instagram o YouTube Live. El algoritmo es público y verificable. Queda grabado." />
                  <Paso numero={5} titulo="El ganador recibe su premio" descripcion="Se notifica al ganador, se emite el certificado digital y se coordina la entrega del premio." />
                </div>
              </SubSeccion>

              <SubSeccion id="por-que-confiable" titulo="¿Por qué es confiable?">
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { emoji: '🔒', titulo: 'Organizadores verificados', desc: 'Todos pasan por un proceso de verificación de identidad (KYC) antes de publicar rifas.' },
                    { emoji: '🎥', titulo: 'Sorteos grabados', desc: 'Cada sorteo se transmite en vivo y queda grabado permanentemente para consulta de cualquier participante.' },
                    { emoji: '📋', titulo: 'Algoritmo público', desc: 'El código del algoritmo de sorteo es abierto y auditable. Nadie puede manipular el resultado.' },
                    { emoji: '💾', titulo: 'Backup triple de comprobantes', desc: 'Todos los comprobantes de pago se guardan durante 5 años en 3 servidores diferentes.' },
                    { emoji: '⚡', titulo: 'Verificación en 60 segundos', desc: 'Nuestro sistema OCR valida los comprobantes automáticamente en menos de un minuto.' },
                    { emoji: '🛟', titulo: 'Soporte 24/7', desc: 'Equipo de soporte disponible por WhatsApp, Telegram y email en horario completo.' },
                  ].map((item) => (
                    <div key={item.titulo} className="flex gap-3 p-4 bg-white rounded-2xl border border-gray-100">
                      <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">{item.titulo}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </SubSeccion>
            </div>

            {/* ═══════════════════════════════════
                2. PARTICIPANTES
            ═══════════════════════════════════ */}
            <div id="participantes" className="scroll-mt-24 mb-16">
              <SeccionHeader
                id="participantes-header"
                emoji="🎟️"
                titulo="Para Participantes"
                descripcion="Guía completa para comprar tickets y ganar premios"
                color="gold"
              />

              <SubSeccion id="crear-cuenta" titulo="Crear una cuenta">
                <p>Aunque puedes explorar el catálogo sin cuenta, necesitas registrarte para comprar tickets.</p>
                <div className="my-4 space-y-0">
                  <Paso numero={1} titulo="Ve a elosodelasuerte.com" descripcion="Haz clic en 'Entrar' en la esquina superior derecha del sitio." />
                  <Paso numero={2} titulo="Selecciona 'Crear cuenta'" descripcion="Puedes registrarte con tu email y contraseña o continuar con Google para mayor comodidad." />
                  <Paso numero={3} titulo="Completa tu perfil" descripcion="Ingresa tu nombre, número de WhatsApp y, si aplica, tu cédula de identidad para rifas con verificación KYC." />
                  <Paso numero={4} titulo="Verifica tu correo" descripcion="Recibirás un email de confirmación. Haz clic en el enlace para activar tu cuenta." />
                </div>
                <Alerta tipo="info" titulo="Cuenta sin registro">
                  En algunas rifas puedes participar sin crear cuenta, solo con tu número de WhatsApp. El organizador lo indica en la página de la rifa.
                </Alerta>
              </SubSeccion>

              <SubSeccion id="explorar-rifas" titulo="Explorar el catálogo de rifas">
                <p>El catálogo está en la sección <strong>Explorar Rifas</strong> del menú principal.</p>
                <p className="mt-2">Puedes filtrar por:</p>
                <ul className="list-none mt-3 space-y-2">
                  {[
                    '📱 Categoría — Electrónica, Vehículos, Hogar, Efectivo, Viajes, Joyas',
                    '💵 Precio por ticket — Define un rango mínimo y máximo',
                    '📅 Fecha de sorteo — Filtra rifas por cuándo sortean',
                    '🏦 Método de pago — Solo rifas que acepten Zelle, Pago Móvil, etc.',
                    '✅ Solo verificados — Muestra solo organizadores con verificación KYC',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <span className="text-[#228B22] font-bold flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Alerta tipo="exito" titulo="Consejo">
                  Usa el filtro "Solo verificados" para mayor seguridad. Los organizadores verificados tienen el ícono de escudo azul en su perfil.
                </Alerta>
              </SubSeccion>

              <SubSeccion id="comprar-ticket" titulo="Comprar un ticket paso a paso">
                <div className="my-4 space-y-0">
                  <Paso numero={1} titulo="Selecciona la rifa" descripcion="Haz clic en la rifa que te interese para ver todos los detalles del premio, precio y condiciones." />
                  <Paso numero={2} titulo="Elige tu(s) número(s)" descripcion="Puedes elegir números específicos haciendo clic en la grilla de tickets, o usar el botón 'Número Aleatorio' para dejar que la suerte decida." />
                  <Paso numero={3} titulo="Define la cantidad" descripcion="Usa los botones + y - para ajustar cuántos tickets quieres comprar. Verás el total a pagar actualizarse." />
                  <Paso numero={4} titulo="Haz clic en 'Comprar Ticket'" descripcion="Se abrirá el proceso de pago. Elige tu método preferido (Zelle, Pago Móvil, Binance, etc.)." />
                  <Paso numero={5} titulo="Realiza el pago" descripcion="Sigue las instrucciones del método seleccionado. Guarda la captura de pantalla del comprobante." />
                  <Paso numero={6} titulo="Envía el comprobante" descripcion="Sube la foto del comprobante en el formulario o envíalo por WhatsApp al organizador." />
                  <Paso numero={7} titulo="Espera la confirmación" descripcion="En menos de 60 segundos recibirás confirmación de que tus tickets están asignados a tu nombre." />
                </div>
                <Alerta tipo="advertencia" titulo="Tiempo límite de pago">
                  Tienes entre 20 y 60 minutos para completar el pago según lo que defina el organizador. Después de ese tiempo, los tickets vuelven a estar disponibles.
                </Alerta>
              </SubSeccion>

              <SubSeccion id="metodos-pago" titulo="Métodos de pago disponibles">
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { emoji: '🏦', nombre: 'Zelle', desc: 'Transferencia bancaria en USD desde bancos de EE.UU. El más común en Venezuela.', pasos: ['Abre tu app bancaria', 'Busca el email o número Zelle del organizador', 'Envía el monto exacto', 'Toma captura del comprobante'] },
                    { emoji: '📲', nombre: 'Pago Móvil', desc: 'Transferencia instantánea entre bancos venezolanos en Bolívares.', pasos: ['Abre tu app del banco', 'Selecciona Pago Móvil', 'Ingresa teléfono, cédula y banco del organizador', 'Ingresa el monto y confirma'] },
                    { emoji: '🟡', nombre: 'Binance Pay', desc: 'Pago en USDT u otras criptomonedas a través de Binance.', pasos: ['Abre Binance > Pay', 'Escanea el QR del organizador', 'Confirma el monto en USDT', 'Envía el comprobante de la transacción'] },
                    { emoji: '💵', nombre: 'Efectivo', desc: 'Pago presencial en USD o Bolívares. Solo en rifas locales.', pasos: ['Coordina lugar de pago con el organizador', 'Lleva el monto exacto', 'Recibe tu recibo físico', 'Envía foto del recibo al sistema'] },
                  ].map((m) => (
                    <div key={m.nombre} className="bg-white rounded-2xl border border-gray-100 p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{m.emoji}</span>
                        <div>
                          <h4 className="font-black text-gray-900">{m.nombre}</h4>
                          <p className="text-xs text-gray-400">{m.desc}</p>
                        </div>
                      </div>
                      <ol className="space-y-1">
                        {m.pasos.map((p, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                            <span className="w-4 h-4 bg-[#FFF8E7] text-[#8B4513] rounded-full flex items-center justify-center font-black text-[10px] flex-shrink-0 mt-0.5">{i + 1}</span>
                            {p}
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </SubSeccion>

              <SubSeccion id="enviar-voucher" titulo="Enviar el comprobante de pago">
                <p>El comprobante (voucher) es la prueba de tu pago. Puedes enviarlo por 4 canales:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-4">
                  {[
                    { emoji: '💬', canal: 'WhatsApp', desc: 'Foto al número del organizador' },
                    { emoji: '✈️', canal: 'Telegram', desc: 'Al bot @ElOsoDeLaSuerteBot' },
                    { emoji: '📧', canal: 'Email', desc: 'Al correo del organizador' },
                    { emoji: '🌐', canal: 'Web', desc: 'Sube la foto directamente en la web' },
                  ].map((c) => (
                    <div key={c.canal} className="bg-[#FFF8E7] border border-[#FFD700]/20 rounded-2xl p-4 text-center">
                      <div className="text-2xl mb-1">{c.emoji}</div>
                      <div className="font-bold text-gray-800 text-sm">{c.canal}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{c.desc}</div>
                    </div>
                  ))}
                </div>
                <p><strong>El comprobante debe incluir:</strong></p>
                <ul className="mt-2 space-y-1">
                  {['✓ Fecha y hora de la transacción', '✓ Monto transferido', '✓ Número de referencia', '✓ Nombre del emisor (tú)'].map((i) => (
                    <li key={i} className="text-sm text-gray-600">{i}</li>
                  ))}
                </ul>
                <Alerta tipo="exito" titulo="Verificación automática">
                  Nuestro sistema OCR extrae los datos del comprobante automáticamente en menos de 60 segundos. No tienes que esperar revisión manual.
                </Alerta>
              </SubSeccion>

              <SubSeccion id="ver-sorteo" titulo="Ver el sorteo en vivo">
                <p>Todos los sorteos de El Oso de la Suerte se realizan en vivo. Recibirás una notificación el día del sorteo con el enlace al stream.</p>
                <div className="my-4 grid md:grid-cols-2 gap-4">
                  <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">▶️</span>
                      <span className="font-black text-gray-900">YouTube Live</span>
                    </div>
                    <p className="text-sm text-gray-600">Para rifas grandes con premios mayores a $500. El video queda guardado en el canal del organizador.</p>
                  </div>
                  <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">📷</span>
                      <span className="font-black text-gray-900">Instagram Live</span>
                    </div>
                    <p className="text-sm text-gray-600">Para rifas pequeñas y medianas. El video también se guarda en los highlights del perfil del organizador.</p>
                  </div>
                </div>
                <Alerta tipo="info" titulo="¿Cómo funciona el algoritmo?">
                  El sistema genera un número aleatorio en vivo usando un código abierto que cualquiera puede verificar. El número ganador se anuncia en pantalla durante el stream y queda registrado con sello de tiempo.
                </Alerta>
              </SubSeccion>

              <SubSeccion id="recibir-premio" titulo="Recibir el premio">
                <div className="my-4 space-y-0">
                  <Paso numero={1} titulo="Notificación al ganador" descripcion="El sistema notifica al ganador por WhatsApp, email y notificación push de la app inmediatamente después del sorteo." />
                  <Paso numero={2} titulo="Verificación de identidad" descripcion="Para premios mayores a $100, deberás verificar tu identidad con cédula y selfie (proceso KYC básico)." />
                  <Paso numero={3} titulo="Coordinación de entrega" descripcion="El organizador te contacta en menos de 24 horas para coordinar la entrega del premio en tu ciudad." />
                  <Paso numero={4} titulo="Certificado digital" descripcion="Recibirás un certificado digital oficial de El Oso de la Suerte como constancia de que ganaste." />
                </div>
                <Alerta tipo="advertencia" titulo="¿Qué pasa si el organizador no entrega el premio?">
                  Contamos con un sistema de escrow y garantía. Si el organizador verificado no entrega el premio en 7 días, El Oso de la Suerte interviene directamente. Todos los organizadores firman un contrato de responsabilidad.
                </Alerta>
              </SubSeccion>
            </div>

            {/* ═══════════════════════════════════
                3. ORGANIZADORES
            ═══════════════════════════════════ */}
            <div id="organizadores" className="scroll-mt-24 mb-16">
              <SeccionHeader
                id="organizadores-header"
                emoji="🎪"
                titulo="Para Organizadores"
                descripcion="Crea y gestiona rifas profesionales en minutos"
                color="green"
              />

              <SubSeccion id="registro-org" titulo="Registro y verificación como organizador">
                <p>Para crear rifas en El Oso de la Suerte necesitas una cuenta de organizador verificada.</p>
                <div className="my-4 space-y-0">
                  <Paso numero={1} titulo="Crea tu cuenta en /crear-rifa" descripcion="Completa el formulario con tu nombre, email, WhatsApp y elige tu plan. Los 7 primeros días son gratis." />
                  <Paso numero={2} titulo="Completa la verificación básica" descripcion="Sube tu cédula de identidad y una selfie sosteniendo tu cédula. El proceso tarda menos de 30 minutos." />
                  <Paso numero={3} titulo="Configura tus datos de pago" descripcion="Ingresa tus cuentas Zelle, Pago Móvil o Binance donde recibirás los pagos de tus compradores." />
                  <Paso numero={4} titulo="¡Empieza a crear rifas!" descripcion="Una vez verificado, puedes crear tu primera rifa inmediatamente." />
                </div>
                <Alerta tipo="info" titulo="Plan Bronce gratis 7 días">
                  Todos los planes incluyen 7 días de prueba sin tarjeta de crédito. Puedes crear tu primera rifa y vender tickets reales durante ese período.
                </Alerta>
              </SubSeccion>

              <SubSeccion id="elegir-plan" titulo="Elegir tu plan">
                <div className="grid md:grid-cols-3 gap-4 my-4">
                  {[
                    { emoji: '🥉', nombre: 'Bronce', precio: '$19/mes', ideal: 'Organizadores nuevos', rifas: '1 rifa activa', tickets: 'Hasta 100 tickets', destacado: false },
                    { emoji: '🥈', nombre: 'Plata', precio: '$49/mes', ideal: 'Organizadores activos', rifas: '3 rifas simultáneas', tickets: 'Hasta 500 tickets', destacado: true },
                    { emoji: '🥇', nombre: 'Oro', precio: '$99/mes', ideal: 'Organizadores profesionales', rifas: 'Ilimitadas', tickets: 'Ilimitados', destacado: false },
                  ].map((p) => (
                    <div key={p.nombre} className={`rounded-2xl p-5 border-2 ${p.destacado ? 'border-[#8B4513] bg-[#FFF8E7]' : 'border-gray-100 bg-white'}`}>
                      <div className="text-3xl mb-2">{p.emoji}</div>
                      <div className="font-black text-gray-900">{p.nombre}</div>
                      <div className="text-2xl font-black text-[#8B4513] my-1">{p.precio}</div>
                      <div className="text-xs text-gray-400 space-y-1">
                        <div>👤 Ideal: {p.ideal}</div>
                        <div>🎪 {p.rifas}</div>
                        <div>🎟️ {p.tickets}</div>
                      </div>
                      {p.destacado && <div className="mt-2 text-xs text-[#8B4513] font-black">⭐ Más popular</div>}
                    </div>
                  ))}
                </div>
                <p>Puedes cambiar de plan en cualquier momento desde <strong>Dashboard → Facturación</strong>.</p>
              </SubSeccion>

              <SubSeccion id="crear-rifa" titulo="Crear una rifa paso a paso">
                <div className="my-4 space-y-0">
                  <Paso numero={1} titulo="Ve a Dashboard → Mis Rifas → Nueva Rifa" descripcion="Desde tu panel de control, haz clic en el botón amarillo 'Nueva Rifa'." />
                  <Paso numero={2} titulo="Información básica" descripcion="Ingresa el nombre de la rifa, la descripción del premio, el precio por ticket y la fecha del sorteo." />
                  <Paso numero={3} titulo="Sube fotos del premio" descripcion="Agrega entre 1 y 5 fotos de alta calidad del premio. Las rifas con buenas fotos venden hasta 3x más tickets." />
                  <Paso numero={4} titulo="Define el total de tickets" descripcion="Establece cuántos tickets en total tendrá tu rifa. Considera que el premio vale X, cada ticket vale Y, y necesitas vender Z tickets para cubrir el premio." />
                  <Paso numero={5} titulo="Configura los métodos de pago" descripcion="Activa los métodos de pago que aceptas: Zelle, Pago Móvil, Binance, efectivo. Ingresa tus datos de cada uno." />
                  <Paso numero={6} titulo="Opciones adicionales" descripcion="Configura descuentos por volumen (ej: 3 tickets por $12), promociones 2x1, términos y condiciones, y si permites vendedores." />
                  <Paso numero={7} titulo="Publica tu rifa" descripcion="Revisa todo y haz clic en 'Publicar'. Tu rifa aparecerá en el marketplace y recibirás tu link personalizado para compartir." />
                </div>
                <Alerta tipo="exito" titulo="Tu link personalizado">
                  Cada rifa tiene un link único como <code className="bg-[#FFF8E7] px-2 py-0.5 rounded text-[#8B4513] font-mono text-xs">rifas.elosodelasuerte.com/mi-rifa</code> que puedes compartir en redes sociales, WhatsApp y grupos.
                </Alerta>
              </SubSeccion>

              <SubSeccion id="configurar-pagos" titulo="Configurar métodos de pago">
                <p>Ve a <strong>Dashboard → Configuración → Métodos de Pago</strong> para configurar tus cuentas.</p>
                <div className="my-4 space-y-3">
                  {[
                    { emoji: '🏦', titulo: 'Zelle', campos: ['Email de Zelle', 'Nombre del titular de la cuenta'] },
                    { emoji: '📲', titulo: 'Pago Móvil', campos: ['Número de teléfono', 'Cédula de identidad', 'Banco receptor'] },
                    { emoji: '🟡', titulo: 'Binance', campos: ['Dirección de Binance Pay', 'QR code (opcional)'] },
                    { emoji: '💵', titulo: 'Efectivo', campos: ['Ciudad/zona donde operas', 'Instrucciones de coordinación'] },
                  ].map((m) => (
                    <div key={m.titulo} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-start gap-4">
                      <span className="text-2xl flex-shrink-0">{m.emoji}</span>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm mb-1">{m.titulo}</h4>
                        <p className="text-xs text-gray-500">Campos requeridos: {m.campos.join(' · ')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </SubSeccion>

              <SubSeccion id="gestionar-vouchers" titulo="Gestionar vouchers (comprobantes)">
                <p>Los vouchers son los comprobantes de pago que envían tus compradores. Hay dos modos:</p>
                <div className="grid md:grid-cols-2 gap-4 my-4">
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">⚡</span>
                      <h4 className="font-black text-blue-900">OCR Automático (Plan Plata/Oro)</h4>
                    </div>
                    <p className="text-sm text-blue-700">El sistema lee el comprobante automáticamente y aprueba el pago si los datos coinciden. Sin intervención manual.</p>
                    <div className="mt-3 text-xs text-blue-600 font-semibold">✓ Verificación en menos de 60 segundos</div>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">👁️</span>
                      <h4 className="font-black text-gray-900">Revisión Manual (Plan Bronce)</h4>
                    </div>
                    <p className="text-sm text-gray-600">Recibes notificación por WhatsApp cuando hay un voucher pendiente. Apruebas o rechazas desde el Dashboard.</p>
                    <div className="mt-3 text-xs text-gray-500 font-semibold">⏱ Tiempo recomendado: menos de 30 minutos</div>
                  </div>
                </div>
                <Alerta tipo="advertencia" titulo="Vouchers expirados">
                  Si un comprador envía el comprobante fuera del tiempo límite configurado, el sistema lo marcará como expirado automáticamente y liberará los tickets.
                </Alerta>
              </SubSeccion>

              <SubSeccion id="dominio-propio" titulo="Configurar tu dominio propio">
                <p>Desde el <strong>Plan Plata</strong> puedes usar un dominio personalizado como <code className="bg-[#FFF8E7] px-2 py-0.5 rounded text-[#8B4513] font-mono text-xs">www.misnombrerifas.com</code>.</p>
                <div className="my-4 space-y-0">
                  <Paso numero={1} titulo="Adquiere tu dominio" descripcion="Compra tu dominio en cualquier registrador (GoDaddy, Namecheap, etc.). Cuesta aproximadamente $10-15/año." />
                  <Paso numero={2} titulo="Ve a Dashboard → Configuración → Dominio" descripcion="Ingresa tu dominio en el campo correspondiente y haz clic en 'Verificar DNS'." />
                  <Paso numero={3} titulo="Configura los registros DNS" descripcion="El sistema te mostrará los registros CNAME o A que debes agregar en tu registrador de dominio." />
                  <Paso numero={4} titulo="Espera la propagación" descripcion="Los cambios DNS tardan entre 15 y 60 minutos en propagarse. El SSL se instala automáticamente." />
                </div>
                <Codigo>CNAME  rifas  →  cname.elosodelasuerte.com</Codigo>
                <Alerta tipo="info" titulo="Subdominio gratuito">
                  Si no tienes dominio propio, desde el Plan Bronce recibes un subdominio gratuito como <code className="bg-white px-1.5 py-0.5 rounded text-[#8B4513] font-mono text-xs">rifas.tunombre.elosodelasuerte.com</code>
                </Alerta>
              </SubSeccion>

              <SubSeccion id="realizar-sorteo" titulo="Realizar el sorteo en vivo">
                <div className="my-4 space-y-0">
                  <Paso numero={1} titulo="Configura el stream (1 hora antes)" descripcion="Prepara tu transmisión en YouTube Studio o Instagram. Copia el link del stream y pégalo en Dashboard → Rifas → tu rifa → Configurar Sorteo." />
                  <Paso numero={2} titulo="Cierra la venta de tickets" descripcion="Desde el Dashboard, cambia el estado de la rifa a 'Cerrando ventas' para que no se puedan comprar más tickets." />
                  <Paso numero={3} titulo="Inicia el stream en vivo" descripcion="Comienza tu transmisión. Muestra la lista de todos los tickets vendidos en pantalla para transparencia." />
                  <Paso numero={4} titulo="Ejecuta el sorteo" descripcion="En el Dashboard, haz clic en 'Iniciar Sorteo'. El sistema generará un número aleatorio en tiempo real visible en tu stream." />
                  <Paso numero={5} titulo="Anuncia al ganador" descripcion="El sistema muestra automáticamente el nombre del ganador. Anúncialo en el stream y cierra la transmisión." />
                  <Paso numero={6} titulo="Notifica y entrega" descripcion="El sistema notifica automáticamente al ganador. Coordina la entrega en máximo 7 días hábiles." />
                </div>
                <Alerta tipo="exito" titulo="El sorteo se graba automáticamente">
                  Si conectas tu stream a El Oso de la Suerte, el sistema guarda el video del sorteo automáticamente y lo vincula a la rifa para referencia futura.
                </Alerta>
              </SubSeccion>

              <SubSeccion id="dashboard" titulo="Usar el Dashboard de organizador">
                <div className="grid md:grid-cols-2 gap-4 my-4">
                  {[
                    { emoji: '🏠', seccion: 'Inicio', desc: 'Resumen general: KPIs, vouchers pendientes, actividad reciente y próximos sorteos.' },
                    { emoji: '🎪', seccion: 'Mis Rifas', desc: 'Lista de todas tus rifas con estado, progreso de ventas y acciones rápidas.' },
                    { emoji: '📊', seccion: 'Ventas & Stats', desc: 'Gráficos de ventas, tabla de compras, gestión de vouchers y distribución por método de pago.' },
                    { emoji: '👥', seccion: 'Vendedores', desc: 'Gestiona tu equipo, ve el ranking, configura comisiones y realiza pagos semanales.' },
                    { emoji: '⚙️', seccion: 'Configuración', desc: 'Perfil, dominio, métodos de pago, notificaciones y preferencias generales.' },
                    { emoji: '💳', seccion: 'Facturación', desc: 'Historial de pagos, cambio de plan y ROI de tu inversión en la plataforma.' },
                  ].map((s) => (
                    <div key={s.seccion} className="flex gap-3 p-4 bg-white rounded-2xl border border-gray-100">
                      <span className="text-2xl flex-shrink-0">{s.emoji}</span>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">{s.seccion}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </SubSeccion>
            </div>

            {/* ═══════════════════════════════════
                4. VENDEDORES
            ═══════════════════════════════════ */}
            <div id="vendedores" className="scroll-mt-24 mb-16">
              <SeccionHeader
                id="vendedores-header"
                emoji="🏆"
                titulo="Para Vendedores"
                descripcion="Gana comisiones vendiendo tickets de rifas"
                color="blue"
              />

              <SubSeccion id="unirse-equipo" titulo="Unirse a un equipo de vendedores">
                <p>Hay dos formas de convertirte en vendedor en El Oso de la Suerte:</p>
                <div className="grid md:grid-cols-2 gap-4 my-4">
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                    <h4 className="font-black text-blue-900 mb-2">👤 Con cuenta propia</h4>
                    <p className="text-sm text-blue-700 mb-3">El organizador te invita por email o WhatsApp. Creas una cuenta gratuita y accedes a tu dashboard personal.</p>
                    <ul className="space-y-1 text-xs text-blue-600">
                      <li>✓ Ve tus ventas en tiempo real</li>
                      <li>✓ Link de venta personalizado</li>
                      <li>✓ Dashboard propio con stats</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                    <h4 className="font-black text-gray-900 mb-2">📱 Sin cuenta</h4>
                    <p className="text-sm text-gray-600 mb-3">Trabajas directamente con tu número de WhatsApp. El organizador gestiona tus ventas desde su dashboard.</p>
                    <ul className="space-y-1 text-xs text-gray-500">
                      <li>✓ Sin registro necesario</li>
                      <li>✓ Recibes updates por WhatsApp</li>
                      <li>✓ Ideal para ventas ocasionales</li>
                    </ul>
                  </div>
                </div>
              </SubSeccion>

              <SubSeccion id="vender-tickets" titulo="Cómo vender tickets">
                <div className="my-4 space-y-0">
                  <Paso numero={1} titulo="Recibe tu link de vendedor" descripcion="El organizador te enviará un link único de vendedor. Todas las ventas realizadas a través de ese link se registran a tu nombre." />
                  <Paso numero={2} titulo="Comparte en tus redes" descripcion="Publica el link en tu Instagram, WhatsApp, grupos de Telegram y cualquier red social. Añade fotos del premio para mayor impacto." />
                  <Paso numero={3} titulo="Atiende a tus compradores" descripcion="Cuando alguien te contacte, guíalos durante el proceso de compra: elegir números, hacer el pago y enviar el comprobante." />
                  <Paso numero={4} titulo="Registra la venta" descripcion="Si tienes cuenta, puedes registrar ventas manuales desde tu dashboard. El organizador también puede registrarlas por ti." />
                </div>
                <Alerta tipo="info" titulo="Tip de ventas">
                  Las rifas con premios de alta demanda (iPhone, efectivo, vehículos) se venden más fácil. Comparte historias de ganadores anteriores para generar confianza.
                </Alerta>
              </SubSeccion>

              <SubSeccion id="ver-comisiones" titulo="Ver tus comisiones">
                <p>Tu comisión es un porcentaje del total de ventas que generas. El porcentaje lo define el organizador (típicamente entre 5% y 20%).</p>
                <div className="bg-[#FFF8E7] border border-[#FFD700]/30 rounded-2xl p-5 my-4">
                  <h4 className="font-black text-[#8B4513] mb-3">Ejemplo de cálculo:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Precio por ticket</span>
                      <span className="font-bold">$5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tickets vendidos por ti</span>
                      <span className="font-bold">20 tickets</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total generado</span>
                      <span className="font-bold">$100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tu comisión (10%)</span>
                      <span className="font-black text-[#228B22] text-base">$10</span>
                    </div>
                  </div>
                </div>
                <p>Puedes ver tus comisiones acumuladas en tiempo real desde tu dashboard o recibir actualizaciones por WhatsApp.</p>
              </SubSeccion>

              <SubSeccion id="cobrar-comision" titulo="Cobrar tu comisión">
                <p>El organizador paga las comisiones semanalmente cada lunes. El proceso es:</p>
                <div className="my-4 space-y-0">
                  <Paso numero={1} titulo="El sistema calcula automáticamente" descripcion="Cada lunes el sistema genera un resumen de todas las ventas de la semana y calcula el total de comisión de cada vendedor." />
                  <Paso numero={2} titulo="El organizador aprueba el pago" descripcion="El organizador revisa el resumen y aprueba el pago masivo desde Dashboard → Vendedores → Pagar comisiones." />
                  <Paso numero={3} titulo="Recibes tu pago" descripcion="El organizador te transfiere por el método acordado: Zelle, Pago Móvil, Binance o efectivo. Recibes notificación por WhatsApp." />
                </div>
                <Alerta tipo="advertencia" titulo="Acuerda el método de pago con tu organizador">
                  Antes de empezar a vender, confirma con el organizador el método de pago de tu comisión, el porcentaje y cada cuánto pagan.
                </Alerta>
              </SubSeccion>
            </div>

            {/* ═══════════════════════════════════
                5. PAGOS Y SEGURIDAD
            ═══════════════════════════════════ */}
            <div id="pagos" className="scroll-mt-24 mb-16">
              <SeccionHeader
                id="pagos-header"
                emoji="💳"
                titulo="Pagos y Seguridad"
                descripcion="Todo sobre métodos de pago y protección de tu dinero"
                color="purple"
              />

              <SubSeccion id="zelle" titulo="Pagar con Zelle">
                <p>Zelle es el método más popular en Venezuela para pagar en dólares. Funciona a través de bancos de EE.UU.</p>
                <Alerta tipo="advertencia" titulo="¿No tienes cuenta en banco de EE.UU.?">
                  Si no tienes cuenta bancaria en EE.UU., puedes pedirle a un familiar o amigo que haga el pago de Zelle a tu nombre. Asegúrate de que el nombre en el comprobante coincida con el tuyo.
                </Alerta>
                <div className="my-4 space-y-0">
                  <Paso numero={1} titulo="Abre tu app bancaria" descripcion="Ingresa a la app de tu banco en EE.UU. (Chase, Bank of America, Wells Fargo, etc.)." />
                  <Paso numero={2} titulo="Busca la sección Zelle" descripcion="Generalmente está en la sección de 'Transferencias' o 'Pagos'." />
                  <Paso numero={3} titulo="Ingresa el email o teléfono" descripcion="El organizador te mostrará su email o número de teléfono registrado en Zelle." />
                  <Paso numero={4} titulo="Ingresa el monto exacto" descripcion="El monto debe ser exactamente el precio del ticket (o múltiplo si compras varios)." />
                  <Paso numero={5} titulo="Confirma y toma captura" descripcion="Confirma la transacción y toma una captura de pantalla del comprobante que muestre: monto, destinatario, fecha y referencia." />
                </div>
              </SubSeccion>

              <SubSeccion id="pago-movil" titulo="Pagar con Pago Móvil">
                <p>Pago Móvil es el sistema de transferencias instantáneas entre bancos venezolanos. Los pagos se realizan en Bolívares.</p>
                <div className="my-4 space-y-0">
                  <Paso numero={1} titulo="Abre la app de tu banco venezolano" descripcion="Ingresa a la aplicación de tu banco (Banesco, Mercantil, Venezuela, Provincial, etc.)." />
                  <Paso numero={2} titulo="Selecciona Pago Móvil" descripcion="Busca la opción 'Pago Móvil Interbancario' o 'Transferencia Pago Móvil'." />
                  <Paso numero={3} titulo="Ingresa los datos del organizador" descripcion="El organizador te dará: número de teléfono, cédula de identidad y banco destino." />
                  <Paso numero={4} titulo="Ingresa el monto en Bolívares" descripcion="Convierte el precio en USD al tipo de cambio del día. Asegúrate de usar la tasa correcta para no quedarte corto." />
                  <Paso numero={5} titulo="Confirma y guarda el comprobante" descripcion="El banco generará un número de referencia. Toma captura de pantalla con todos los detalles visibles." />
                </div>
                <Alerta tipo="info" titulo="Tipo de cambio">
                  El organizador indica si acepta la tasa BCV, tasa paralela o una tasa fija. Siempre confirma antes de hacer la transferencia.
                </Alerta>
              </SubSeccion>

              <SubSeccion id="binance" titulo="Pagar con Binance">
                <p>Binance Pay permite pagos instantáneos en USDT u otras criptomonedas sin comisiones.</p>
                <div className="my-4 space-y-0">
                  <Paso numero={1} titulo="Abre Binance en tu teléfono" descripcion="Si no tienes Binance, descárgalo gratis desde la App Store o Google Play y crea una cuenta." />
                  <Paso numero={2} titulo="Asegúrate de tener USDT" descripcion="En tu billetera de Binance necesitas tener USDT (Tether). Si no tienes, puedes comprar con P2P." />
                  <Paso numero={3} titulo="Ve a Binance Pay" descripcion="En la pantalla principal, toca el botón 'Pay'. Luego 'Enviar'." />
                  <Paso numero={4} titulo="Escanea el QR o ingresa el ID" descripcion="El organizador puede darte un QR de Binance Pay o su ID de Binance. Usa el método que prefieras." />
                  <Paso numero={5} titulo="Ingresa el monto y confirma" descripcion="Escribe el monto en USDT, revisa que el nombre del destinatario sea correcto y confirma." />
                  <Paso numero={6} titulo="Guarda el comprobante" descripcion="Binance genera un recibo con número de transacción. Toma captura o descarga el PDF." />
                </div>
              </SubSeccion>

              <SubSeccion id="seguridad-pagos" titulo="Seguridad de tus pagos">
                <div className="grid md:grid-cols-2 gap-4 my-4">
                  {[
                    { emoji: '🔍', titulo: 'Verifica al organizador', desc: 'Siempre comprueba que el organizador tenga el badge de verificado (ícono de escudo azul) antes de pagar.' },
                    { emoji: '📸', titulo: 'Guarda tu comprobante', desc: 'Conserva la captura de pantalla de tu pago por al menos 30 días después del sorteo.' },
                    { emoji: '⏰', titulo: 'Paga en el tiempo límite', desc: 'Respeta el tiempo de espera indicado. Si pagas tarde, tus tickets pueden liberarse para otros compradores.' },
                    { emoji: '🚫', titulo: 'No pagues fuera de la plataforma', desc: 'Realiza todo el proceso dentro de El Oso de la Suerte. No hagas pagos a cuentas no mostradas en la plataforma.' },
                    { emoji: '🛟', titulo: 'Reporta irregularidades', desc: 'Si algo parece sospechoso, contacta a nuestro soporte antes de pagar. Mejor prevenir.' },
                    { emoji: '💬', titulo: 'Confirma por WhatsApp', desc: 'Después de pagar, confirma con el organizador por WhatsApp que recibió tu comprobante.' },
                  ].map((s) => (
                    <div key={s.titulo} className="flex gap-3 p-4 bg-white rounded-2xl border border-gray-100">
                      <span className="text-2xl flex-shrink-0">{s.emoji}</span>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">{s.titulo}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </SubSeccion>
            </div>

            {/* ═══════════════════════════════════
                6. FAQ
            ═══════════════════════════════════ */}
            <div id="faq" className="scroll-mt-24 mb-16">
              <SeccionHeader
                id="faq-header"
                emoji="❓"
                titulo="Preguntas Frecuentes"
                descripcion="Respuestas a las dudas más comunes de nuestra comunidad"
                color="red"
              />

              <SubSeccion id="faq-compradores" titulo="FAQ para Compradores">
                <div className="space-y-4">
                  {[
                    { p: '¿Cómo sé que el sorteo es legítimo?', r: 'Todos los sorteos se realizan en vivo por YouTube o Instagram, quedan grabados y el algoritmo es de código abierto. Los organizadores son verificados con cédula de identidad.' },
                    { p: '¿Qué pasa si el organizador no hace el sorteo?', r: 'Si el organizador no realiza el sorteo en la fecha prometida, El Oso de la Suerte interviene y puede emitir reembolsos o reasignar la gestión de la rifa.' },
                    { p: '¿Puedo devolver un ticket?', r: 'Los tickets no son reembolsables una vez confirmados. Sin embargo, si el organizador cancela la rifa, tienes derecho al reembolso total.' },
                    { p: '¿Qué hago si no recibo confirmación de mis tickets?', r: 'Contacta al soporte por WhatsApp (+58 412-000-0000). Ten a mano el número de referencia de tu pago. Respondemos en menos de 30 minutos.' },
                    { p: '¿Puedo participar desde el exterior?', r: 'Sí. Puedes participar desde cualquier país. Los premios físicos se entregan en Venezuela; los premios en efectivo se pueden enviar vía Zelle o Binance.' },
                    { p: '¿Cuántos tickets puedo comprar?', r: 'Cada organizador define el máximo de tickets por persona. Generalmente es entre 5 y 20 tickets por comprador para garantizar la distribución justa.' },
                  ].map((q, i) => (
                    <details key={i} className="bg-white rounded-2xl border border-gray-100 group overflow-hidden">
                      <summary className="flex items-center justify-between cursor-pointer px-5 py-4 font-bold text-gray-900 text-sm select-none list-none">
                        <span className="flex items-center gap-2">
                          <span className="text-red-400 font-black">Q</span>
                          {q.p}
                        </span>
                        <ChevronRight size={16} className="text-gray-400 group-open:rotate-90 transition-transform flex-shrink-0" />
                      </summary>
                      <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                        <span className="text-[#228B22] font-black mr-2">A</span>{q.r}
                      </div>
                    </details>
                  ))}
                </div>
              </SubSeccion>

              <SubSeccion id="faq-organizadores" titulo="FAQ para Organizadores">
                <div className="space-y-4">
                  {[
                    { p: '¿Cuánto cobra El Oso de la Suerte por cada venta?', r: 'Para rifas en el marketplace, cobramos entre 5% y 8% del total recaudado. Con un plan SAAS activo, la comisión se reduce a 2-3%. El precio del plan ya incluye herramientas ilimitadas.' },
                    { p: '¿Puedo cancelar mi plan cuando quiera?', r: 'Sí, sin penalizaciones. Tu plan seguirá activo hasta el final del período pagado. No hay cargos adicionales ni cláusulas de permanencia.' },
                    { p: '¿Qué pasa si vendo todos los tickets antes de la fecha del sorteo?', r: 'Puedes realizar el sorteo anticipadamente o mantenerlo en la fecha programada. Lo decides tú. Solo notifica a los compradores con anticipación.' },
                    { p: '¿Puedo tener rifas en Venezuela y en el exterior?', r: 'Sí. Puedes configurar tu rifa para aceptar compradores de cualquier país. Los métodos de pago internacionales (Stripe, PayPal) están disponibles desde el Plan Plata.' },
                    { p: '¿Cómo evito el fraude con comprobantes falsos?', r: 'Nuestro sistema OCR verifica automáticamente los comprobantes contra la base de datos bancaria. Para mayor seguridad, activa la verificación KYC para compradores de tickets mayores a $50.' },
                  ].map((q, i) => (
                    <details key={i} className="bg-white rounded-2xl border border-gray-100 group overflow-hidden">
                      <summary className="flex items-center justify-between cursor-pointer px-5 py-4 font-bold text-gray-900 text-sm select-none list-none">
                        <span className="flex items-center gap-2">
                          <span className="text-red-400 font-black">Q</span>
                          {q.p}
                        </span>
                        <ChevronRight size={16} className="text-gray-400 group-open:rotate-90 transition-transform flex-shrink-0" />
                      </summary>
                      <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                        <span className="text-[#228B22] font-black mr-2">A</span>{q.r}
                      </div>
                    </details>
                  ))}
                </div>
              </SubSeccion>

              <SubSeccion id="faq-sorteos" titulo="FAQ sobre Sorteos">
                <div className="space-y-4">
                  {[
                    { p: '¿El algoritmo de sorteo puede ser manipulado?', r: 'No. El algoritmo usa un generador de números pseudoaleatorio criptográfico (CSPRNG) cuyo código está publicado en GitHub. El resultado se genera en tiempo real durante el stream y queda registrado con sello de tiempo.' },
                    { p: '¿Qué pasa si hay problemas técnicos durante el sorteo en vivo?', r: 'Si el stream se interrumpe, el organizador debe reiniciar la transmisión y repetir el sorteo desde cero, visible para todos. El resultado previo a la interrupción no es válido.' },
                    { p: '¿Puedo hacer varios pre-sorteos?', r: 'Sí. El Plan Plata y Oro permiten configurar pre-sorteos de premios menores para generar expectativa. Por ejemplo, sortear un premio menor a mitad de ventas.' },
                    { p: '¿Cuánto tiempo tiene el ganador para reclamar su premio?', r: 'El ganador tiene 72 horas (3 días) para confirmar su datos de entrega. Si no responde, el organizador puede realizar un segundo sorteo (con aprobación del soporte).' },
                  ].map((q, i) => (
                    <details key={i} className="bg-white rounded-2xl border border-gray-100 group overflow-hidden">
                      <summary className="flex items-center justify-between cursor-pointer px-5 py-4 font-bold text-gray-900 text-sm select-none list-none">
                        <span className="flex items-center gap-2">
                          <span className="text-red-400 font-black">Q</span>
                          {q.p}
                        </span>
                        <ChevronRight size={16} className="text-gray-400 group-open:rotate-90 transition-transform flex-shrink-0" />
                      </summary>
                      <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                        <span className="text-[#228B22] font-black mr-2">A</span>{q.r}
                      </div>
                    </details>
                  ))}
                </div>
              </SubSeccion>
            </div>

            {/* ═══════════════════════════════════
                7. SOPORTE
            ═══════════════════════════════════ */}
            <div id="soporte" className="scroll-mt-24 mb-16">
              <SeccionHeader
                id="soporte-header"
                emoji="🛟"
                titulo="Soporte"
                descripcion="Estamos aquí para ayudarte en todo momento"
                color="brown"
              />

              <SubSeccion id="contactar-soporte" titulo="Contactar al soporte">
                <p>Nuestro equipo de soporte está disponible las 24 horas del día, los 7 días de la semana.</p>
                <div className="grid md:grid-cols-2 gap-4 my-6">
                  {[
                    {
                      emoji: '💬',
                      canal: 'WhatsApp',
                      dato: '+58 412-000-0000',
                      tiempo: 'Respuesta en menos de 30 minutos',
                      accion: 'Escribir ahora',
                      href: 'https://wa.me/584120000000',
                      destacado: true,
                    },
                    {
                      emoji: '✈️',
                      canal: 'Telegram',
                      dato: '@ElOsoDeLaSuerteBot',
                      tiempo: 'Bot automático + agente humano',
                      accion: 'Abrir Telegram',
                      href: 'https://t.me/ElOsoDeLaSuerteBot',
                      destacado: false,
                    },
                    {
                      emoji: '📧',
                      canal: 'Email',
                      dato: 'soporte@elosodelasuerte.com',
                      tiempo: 'Respuesta en menos de 4 horas',
                      accion: 'Enviar email',
                      href: 'mailto:soporte@elosodelasuerte.com',
                      destacado: false,
                    },
                    {
                      emoji: '📹',
                      canal: 'Video llamada',
                      dato: 'Solo Plan Oro',
                      tiempo: 'Soporte prioritario programado',
                      accion: 'Agendar sesión',
                      href: '/soporte',
                      destacado: false,
                    },
                  ].map((c) => (
                    <div
                      key={c.canal}
                      className={`rounded-2xl p-5 border-2 transition-all ${
                        c.destacado
                          ? 'border-[#228B22] bg-green-50'
                          : 'border-gray-100 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">{c.emoji}</span>
                        <div>
                          <h4 className="font-black text-gray-900">{c.canal}</h4>
                          <p className="text-sm text-gray-600 font-medium">{c.dato}</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mb-3">{c.tiempo}</p>
                      <a
                        href={c.href}
                        target={c.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 text-sm font-black px-4 py-2 rounded-xl transition-colors ${
                          c.destacado
                            ? 'bg-[#228B22] text-white hover:bg-[#1A6B1A]'
                            : 'bg-[#8B4513] text-white hover:bg-[#A0522D]'
                        }`}
                      >
                        {c.accion}
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  ))}
                </div>
              </SubSeccion>

              <SubSeccion id="canales" titulo="Canales de ayuda adicionales">
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { emoji: '📚', titulo: 'Centro de ayuda', desc: 'Artículos detallados sobre todas las funcionalidades de la plataforma.', href: '/soporte' },
                    { emoji: '🎥', titulo: 'Videos tutoriales', desc: 'Canal de YouTube con tutoriales paso a paso para compradores y organizadores.', href: '#' },
                    { emoji: '👥', titulo: 'Comunidad', desc: 'Grupo de WhatsApp y Telegram donde organizadores comparten tips y experiencias.', href: '#' },
                  ].map((c) => (
                    <div key={c.titulo} className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-[#FFD700]/30 hover:shadow-md transition-all">
                      <div className="text-3xl mb-3">{c.emoji}</div>
                      <h4 className="font-black text-gray-900 mb-1">{c.titulo}</h4>
                      <p className="text-xs text-gray-500 mb-3 leading-relaxed">{c.desc}</p>
                      <Link href={c.href} className="text-xs text-[#8B4513] font-bold hover:underline flex items-center gap-1">
                        Ver más <ChevronRight size={12} />
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Estado del sistema */}
                <div className="mt-6 bg-[#FFF8E7] border border-[#FFD700]/30 rounded-2xl p-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-[#228B22] rounded-full animate-pulse" />
                    <div>
                      <p className="font-black text-[#8B4513]">Sistema operativo al 100%</p>
                      <p className="text-xs text-gray-500">Tiempo de actividad histórico: 99.9%</p>
                    </div>
                  </div>
                  <div className="text-right text-xs text-gray-400">
                    <div>Última verificación</div>
                    <div className="font-bold text-gray-600">hace 2 minutos</div>
                  </div>
                </div>
              </SubSeccion>
            </div>

            {/* Footer del manual */}
            <div className="bg-[#1A1008] rounded-3xl p-8 text-center text-white">
              <div className="text-5xl mb-4 animate-bear inline-block">🐻</div>
              <h2 className="text-2xl font-black mb-2">¿Listo para empezar?</h2>
              <p className="text-gray-400 mb-6 max-w-md mx-auto text-sm">
                Ya tienes todo el conocimiento. El Oso de la Suerte te espera con las rifas más confiables de Venezuela.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/rifas"
                  className="bg-[#FFD700] text-[#1A1008] font-black px-7 py-3 rounded-2xl hover:bg-[#FFE55C] transition-colors btn-glow"
                >
                  🎟️ Ver Rifas Activas
                </Link>
                <Link
                  href="/crear-rifa"
                  className="bg-white/10 text-white font-bold px-7 py-3 rounded-2xl hover:bg-white/20 transition-colors border border-white/20"
                >
                  🐻 Crear mi Rifa
                </Link>
              </div>
              <p className="text-xs text-gray-500 mt-6">
                Manual v1.0 · Actualizado: marzo 2025 · El Oso de la Suerte
              </p>
            </div>
          </main>
        </div>
      </div>

      {/* Botón volver arriba */}
      {mostrarScroll && (
        <button
          onClick={scrollTop}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-[#8B4513] text-white rounded-2xl shadow-xl flex items-center justify-center hover:bg-[#A0522D] transition-all hover:-translate-y-1"
          aria-label="Volver arriba"
        >
          <ArrowUp size={20} />
        </button>
      )}

      {/* Botón sidebar móvil flotante */}
      {!sidebarAbierto && (
        <button
          onClick={() => setSidebarAbierto(true)}
          className="fixed bottom-6 left-6 z-50 lg:hidden flex items-center gap-2 bg-[#FFD700] text-[#1A1008] font-black px-4 py-3 rounded-2xl shadow-xl hover:bg-[#FFE55C] transition-all text-sm"
        >
          <Menu size={16} />
          Índice
        </button>
      )}
    </div>
  );
}
