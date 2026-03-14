'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Ticket,
  BarChart2,
  Users,
  Settings,
  CreditCard,
  LogOut,
  Plus,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  {
    href: '/dashboard',
    label: 'Inicio',
    icono: LayoutDashboard,
    exacto: true,
  },
  {
    href: '/dashboard/rifas',
    label: 'Mis Rifas',
    icono: Ticket,
    badge: '3',
  },
  {
    href: '/dashboard/ventas',
    label: 'Ventas & Stats',
    icono: BarChart2,
  },
  {
    href: '/dashboard/vendedores',
    label: 'Vendedores',
    icono: Users,
    badge: '5',
  },
  {
    href: '/dashboard/configuracion',
    label: 'Configuración',
    icono: Settings,
  },
  {
    href: '/dashboard/facturacion',
    label: 'Facturación',
    icono: CreditCard,
  },
];

// Datos del organizador simulado
const organizador = {
  nombre: 'María González',
  email: 'maria@rifas.com',
  plan: 'Oro',
  planEmoji: '🥇',
  avatar: '👩',
  rifasActivas: 3,
};

export default function DashboardSidebar() {
  const pathname = usePathname();

  const esActivo = (href: string, exacto?: boolean) => {
    if (exacto) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Sidebar desktop */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-72 bg-[#1A1008] z-40">
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="text-3xl group-hover:animate-bear transition-all">🐻</div>
            <div className="leading-none">
              <div className="font-black text-white text-lg">El Oso</div>
              <div className="text-[#FFD700] text-xs font-bold tracking-widest uppercase">de la Suerte</div>
            </div>
          </Link>
        </div>

        {/* Perfil del organizador */}
        <div className="p-4 mx-4 mt-4 bg-white/5 rounded-2xl border border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#8B4513]/30 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
              {organizador.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-white text-sm truncate">{organizador.nombre}</div>
              <div className="text-gray-400 text-xs truncate">{organizador.email}</div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
            <span className="flex items-center gap-1.5 text-xs">
              <span className="text-[#FFD700]">{organizador.planEmoji}</span>
              <span className="text-gray-300 font-semibold">Plan {organizador.plan}</span>
            </span>
            <span className="text-xs text-[#228B22] font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[#228B22] rounded-full" />
              Activo
            </span>
          </div>
        </div>

        {/* Botón crear rifa */}
        <div className="px-4 mt-4">
          <Link
            href="/dashboard/rifas/nueva"
            className="flex items-center justify-center gap-2 w-full bg-[#FFD700] hover:bg-[#FFE55C] text-[#1A1008] font-black py-3 rounded-2xl transition-all text-sm btn-glow"
          >
            <Plus size={16} />
            Crear Nueva Rifa
          </Link>
        </div>

        {/* Navegación */}
        <nav className="flex-1 px-4 mt-6 space-y-1 overflow-y-auto">
          <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-3 px-3">
            Navegación
          </p>
          {navItems.map((item) => {
            const activo = esActivo(item.href, item.exacto);
            const Icono = item.icono;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-semibold transition-all group',
                  activo
                    ? 'bg-[#8B4513] text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                )}
              >
                <Icono
                  size={18}
                  className={activo ? 'text-[#FFD700]' : 'text-gray-500 group-hover:text-gray-300'}
                />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span
                    className={cn(
                      'text-xs px-2 py-0.5 rounded-full font-bold',
                      activo
                        ? 'bg-[#FFD700] text-[#1A1008]'
                        : 'bg-white/10 text-gray-400'
                    )}
                  >
                    {item.badge}
                  </span>
                )}
                {activo && <ChevronRight size={14} className="text-[#FFD700]" />}
              </Link>
            );
          })}
        </nav>

        {/* Upgrade banner */}
        <div className="p-4">
          <div className="bg-gradient-to-br from-[#8B4513] to-[#6B3410] rounded-2xl p-4 border border-[#FFD700]/20">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={16} className="text-[#FFD700]" />
              <span className="text-white text-xs font-black">Tienes Plan Oro</span>
            </div>
            <p className="text-white/60 text-xs mb-3">
              Rifas y tickets ilimitados. Soporte 24/7 prioritario.
            </p>
            <Link
              href="/dashboard/facturacion"
              className="text-xs text-[#FFD700] font-bold hover:underline"
            >
              Ver detalles →
            </Link>
          </div>
        </div>

        {/* Cerrar sesión */}
        <div className="px-4 pb-6 border-t border-white/5 pt-4">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-3 rounded-2xl text-gray-400 hover:text-white hover:bg-white/5 text-sm font-semibold transition-all"
          >
            <LogOut size={18} />
            Cerrar Sesión
          </Link>
        </div>
      </aside>
    </>
  );
}
