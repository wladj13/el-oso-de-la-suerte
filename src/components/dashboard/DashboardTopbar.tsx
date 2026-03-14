'use client';

import { usePathname } from 'next/navigation';
import { Bell, Search, HelpCircle, Menu } from 'lucide-react';
import Link from 'next/link';

const titulos: Record<string, { titulo: string; descripcion: string }> = {
  '/dashboard': { titulo: 'Resumen General', descripcion: 'Bienvenida de vuelta, María 👋' },
  '/dashboard/rifas': { titulo: 'Mis Rifas', descripcion: 'Gestiona todas tus rifas activas y pasadas' },
  '/dashboard/ventas': { titulo: 'Ventas & Estadísticas', descripcion: 'Analiza el rendimiento de tus rifas' },
  '/dashboard/vendedores': { titulo: 'Mis Vendedores', descripcion: 'Gestiona tu equipo de ventas' },
  '/dashboard/configuracion': { titulo: 'Configuración', descripcion: 'Ajusta tu cuenta y preferencias' },
  '/dashboard/facturacion': { titulo: 'Facturación', descripcion: 'Historial de pagos y planes' },
};

export default function DashboardTopbar() {
  const pathname = usePathname();
  const info = titulos[pathname] ?? { titulo: 'Dashboard', descripcion: '' };

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-72 bg-white/95 backdrop-blur-md border-b border-gray-100 z-30">
      <div className="flex items-center justify-between px-4 md:px-8 h-16">
        {/* Título de la sección */}
        <div className="flex items-center gap-3">
          {/* Botón menú móvil */}
          <button className="lg:hidden p-2 text-gray-500 hover:text-[#8B4513] rounded-xl hover:bg-gray-100 transition-colors">
            <Menu size={20} />
          </button>
          <div>
            <h1 className="font-black text-gray-900 text-base md:text-lg leading-none">{info.titulo}</h1>
            <p className="text-xs text-gray-400 hidden md:block mt-0.5">{info.descripcion}</p>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-2">
          {/* Búsqueda rápida - desktop */}
          <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-52">
            <Search size={14} className="text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              className="bg-transparent text-sm text-gray-600 placeholder-gray-400 focus:outline-none w-full"
            />
            <kbd className="text-xs text-gray-300 bg-gray-100 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
          </div>

          {/* Ayuda */}
          <button className="p-2 text-gray-400 hover:text-[#8B4513] rounded-xl hover:bg-gray-50 transition-colors">
            <HelpCircle size={20} />
          </button>

          {/* Notificaciones */}
          <button className="relative p-2 text-gray-400 hover:text-[#8B4513] rounded-xl hover:bg-gray-50 transition-colors">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* Avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-gray-100">
            <div className="w-8 h-8 bg-[#FFF8E7] rounded-xl flex items-center justify-center text-lg border border-[#FFD700]/20">
              👩
            </div>
            <div className="hidden md:block">
              <div className="text-xs font-bold text-gray-700 leading-none">María G.</div>
              <div className="text-xs text-gray-400 mt-0.5">Plan Oro 🥇</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
