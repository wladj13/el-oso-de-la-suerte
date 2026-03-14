import { Metadata } from 'next';
import Link from 'next/link';
import {
  Download,
  FileText,
  BookOpen,
  Smartphone,
  ChevronRight,
  CheckCircle,
  Clock,
  Star,
  Shield,
  Zap,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Descargas | El Oso de la Suerte',
  description:
    'Descarga el manual de usuario, guías rápidas y recursos de El Oso de la Suerte en formato PDF.',
};

const documentos = [
  {
    id: 'manual-completo',
    titulo: 'Manual de Usuario Completo',
    descripcion:
      'Guía exhaustiva para participantes, organizadores y vendedores. Incluye todos los flujos, configuraciones y preguntas frecuentes.',
    version: 'v1.0',
    fecha: 'Marzo 2026',
    paginas: 32,
    tamaño: '~2.4 MB',
    color: 'from-[#8B4513] to-[#5C2D09]',
    icono: '📚',
    href: '/api/descargas/manual',
    tags: ['Completo', 'Recomendado'],
    contenido: [
      'Introducción a la plataforma',
      'Guía para participantes',
      'Guía para organizadores',
      'Gestión de vendedores',
      'Métodos de pago',
      'Preguntas frecuentes',
      'Información de soporte',
    ],
  },
  {
    id: 'guia-organizadores',
    titulo: 'Guía Rápida para Organizadores',
    descripcion:
      'Los pasos esenciales para crear y gestionar tu primera rifa exitosa. Formato compacto ideal para imprimir.',
    version: 'v1.0',
    fecha: 'Marzo 2026',
    paginas: 8,
    tamaño: '~0.8 MB',
    color: 'from-[#8B4513] to-[#B8860B]',
    icono: '⚡',
    href: '/api/descargas/manual',
    tags: ['Organizadores', 'Rápida'],
    contenido: [
      'Crear tu primera rifa',
      'Configurar pagos',
      'Gestionar tickets',
      'Realizar el sorteo',
    ],
  },
  {
    id: 'guia-participantes',
    titulo: 'Guía para Participantes',
    descripcion:
      'Todo lo que necesitas saber para comprar tickets de forma segura y participar en sorteos verificados.',
    version: 'v1.0',
    fecha: 'Marzo 2026',
    paginas: 6,
    tamaño: '~0.6 MB',
    color: 'from-[#228B22] to-[#145214]',
    icono: '🎟️',
    href: '/api/descargas/manual',
    tags: ['Participantes'],
    contenido: [
      'Buscar rifas verificadas',
      'Comprar tickets',
      'Seguimiento de sorteos',
      'Reclamar premios',
    ],
  },
];

const versiones = [
  {
    version: 'v1.0',
    fecha: 'Marzo 2026',
    cambios: [
      'Lanzamiento inicial del manual',
      'Secciones para los 3 tipos de usuario',
      'Guía completa de métodos de pago',
      'FAQ con 15 preguntas frecuentes',
    ],
  },
];

const estadisticas = [
  { valor: '32', label: 'Páginas', icono: FileText },
  { valor: '7', label: 'Secciones', icono: BookOpen },
  { valor: '3', label: 'Tipos de usuario', icono: Star },
  { valor: '15+', label: 'FAQs', icono: Zap },
];

export default function DescargasPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1A1008] via-[#2D1A0A] to-[#3D2211] text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#FFD700]/10 border border-[#FFD700]/20 text-[#FFD700] text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <Download size={14} />
            Centro de Descargas
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Recursos y Documentación
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">
            Descarga nuestros manuales y guías en PDF para consultar cuando quieras, sin necesidad de conexión a internet.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {estadisticas.map((stat) => (
              <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <stat.icono size={20} className="text-[#FFD700] mx-auto mb-2" />
                <div className="text-2xl font-black text-white">{stat.valor}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#8B4513] transition-colors">Inicio</Link>
          <ChevronRight size={14} />
          <span className="text-gray-800 font-medium">Descargas</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-20">
        {/* Trust badges */}
        <div className="flex flex-wrap gap-3 mb-10">
          {[
            { icono: Shield, texto: 'PDFs sin malware verificados' },
            { icono: CheckCircle, texto: 'Contenido actualizado' },
            { icono: Smartphone, texto: 'Optimizado para móvil' },
          ].map((badge) => (
            <div key={badge.texto} className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full text-sm text-gray-600 shadow-sm">
              <badge.icono size={14} className="text-[#228B22]" />
              {badge.texto}
            </div>
          ))}
        </div>

        {/* Documentos */}
        <h2 className="text-2xl font-black text-gray-900 mb-6">Documentos Disponibles</h2>
        <div className="grid gap-6 mb-16">
          {documentos.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row">
                {/* Left accent */}
                <div className={`bg-gradient-to-br ${doc.color} p-8 md:p-10 flex flex-col items-center justify-center md:w-48 shrink-0`}>
                  <div className="text-5xl mb-3">{doc.icono}</div>
                  <div className="text-white/80 text-xs font-semibold uppercase tracking-wider">{doc.version}</div>
                  <div className="text-white/60 text-xs mt-1">{doc.fecha}</div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 md:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {doc.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs font-semibold bg-[#FFF8E7] text-[#8B4513] border border-[#FFD700]/30 px-2.5 py-0.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl font-black text-gray-900">{doc.titulo}</h3>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400 shrink-0">
                      <div className="flex items-center gap-1">
                        <FileText size={14} />
                        {doc.paginas} págs
                      </div>
                      <div className="flex items-center gap-1">
                        <Download size={14} />
                        {doc.tamaño}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-500 text-sm mb-5">{doc.descripcion}</p>

                  {/* Contenido */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-6">
                    {doc.contenido.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle size={13} className="text-[#228B22] shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={doc.href}
                      download
                      className="flex items-center gap-2 bg-[#8B4513] hover:bg-[#5C2D09] text-white font-bold px-6 py-3 rounded-xl transition-colors"
                    >
                      <Download size={16} />
                      Descargar PDF
                    </a>
                    <Link
                      href="/manual"
                      className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-colors"
                    >
                      <BookOpen size={16} />
                      Ver en línea
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Preview del manual */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#FFF8E7] rounded-xl flex items-center justify-center">
              <BookOpen size={20} className="text-[#8B4513]" />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900">Vista Previa del Manual</h2>
              <p className="text-sm text-gray-500">Explora el contenido antes de descargar</p>
            </div>
          </div>

          {/* Simulación de páginas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { titulo: 'Portada', bg: 'bg-gradient-to-br from-[#1A1008] to-[#3D2211]', text: 'text-white' },
              { titulo: 'Índice', bg: 'bg-gray-50', text: 'text-gray-800' },
              { titulo: 'Participantes', bg: 'bg-[#FFF8E7]', text: 'text-[#8B4513]' },
              { titulo: 'Organizadores', bg: 'bg-[#F0FFF0]', text: 'text-[#228B22]' },
            ].map((pagina) => (
              <div
                key={pagina.titulo}
                className={`${pagina.bg} rounded-2xl aspect-[3/4] flex flex-col items-center justify-center border border-gray-100 relative overflow-hidden`}
              >
                {/* Líneas simuladas de texto */}
                <div className="w-3/4 space-y-2 px-3">
                  <div className={`h-2 rounded-full ${pagina.text === 'text-white' ? 'bg-white/30' : 'bg-gray-200'}`} />
                  <div className={`h-1.5 rounded-full w-5/6 ${pagina.text === 'text-white' ? 'bg-white/20' : 'bg-gray-100'}`} />
                  <div className={`h-1.5 rounded-full w-4/6 ${pagina.text === 'text-white' ? 'bg-white/20' : 'bg-gray-100'}`} />
                </div>
                <div className={`absolute bottom-3 text-xs font-semibold ${pagina.text} opacity-70`}>
                  {pagina.titulo}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/manual"
              className="inline-flex items-center gap-2 text-[#8B4513] hover:text-[#5C2D09] font-semibold transition-colors"
            >
              Ver manual completo en línea
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>

        {/* Historial de versiones */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#FFF8E7] rounded-xl flex items-center justify-center">
              <Clock size={20} className="text-[#8B4513]" />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900">Historial de Versiones</h2>
              <p className="text-sm text-gray-500">Registro de actualizaciones del manual</p>
            </div>
          </div>

          <div className="space-y-6">
            {versiones.map((v) => (
              <div key={v.version} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-[#8B4513] text-white text-xs font-black flex items-center justify-center shrink-0">
                    {v.version}
                  </div>
                  <div className="flex-1 w-px bg-gray-100 mt-2" />
                </div>
                <div className="flex-1 pb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-gray-900">{v.version}</span>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{v.fecha}</span>
                    <span className="text-xs font-semibold text-[#228B22] bg-[#F0FFF0] px-2 py-0.5 rounded-full">Actual</span>
                  </div>
                  <ul className="space-y-1.5">
                    {v.cambios.map((cambio) => (
                      <li key={cambio} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle size={13} className="text-[#228B22] shrink-0" />
                        {cambio}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
