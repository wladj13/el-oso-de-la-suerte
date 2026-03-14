'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart, Bell, ChevronDown, Star } from 'lucide-react';
import Button from './ui/Button';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/rifas', label: 'Explorar Rifas' },
  {
    label: 'Organizar',
    submenu: [
      { href: '/crear-rifa', label: '🎪 Crear mi Rifa', desc: 'Empieza en 10 minutos' },
      { href: '/precios', label: '💎 Planes y Precios', desc: 'Desde $19/mes' },
      { href: '/como-funciona', label: '📖 Cómo Funciona', desc: 'Guía paso a paso' },
    ],
  },
  { href: '/precios', label: 'Precios' },
  { href: '/manual', label: 'Manual' },
  { href: '/descargas', label: 'Descargas' },
  { href: '/blog', label: 'Blog' },
];

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [submenuAbierto, setSubmenuAbierto] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-[#8B4513]/10'
          : 'bg-white/80 backdrop-blur-sm'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="text-3xl group-hover:animate-bear transition-transform">🐻</div>
            <div className="flex flex-col leading-none">
              <span className="font-black text-[#8B4513] text-lg tracking-tight">El Oso</span>
              <span className="font-bold text-[#FFD700] text-xs tracking-widest uppercase">
                de la Suerte
              </span>
            </div>
          </Link>

          {/* Nav Desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.submenu ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setSubmenuAbierto(link.label)}
                  onMouseLeave={() => setSubmenuAbierto(null)}
                >
                  <button className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-[#8B4513] font-medium rounded-lg hover:bg-[#FFF8E7] transition-colors">
                    {link.label}
                    <ChevronDown
                      size={16}
                      className={cn(
                        'transition-transform',
                        submenuAbierto === link.label && 'rotate-180'
                      )}
                    />
                  </button>
                  {submenuAbierto === link.label && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 animate-in fade-in slide-in-from-top-2">
                      {link.submenu.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="flex flex-col px-3 py-2.5 rounded-xl hover:bg-[#FFF8E7] transition-colors group"
                        >
                          <span className="font-semibold text-gray-800 group-hover:text-[#8B4513] text-sm">
                            {sub.label}
                          </span>
                          <span className="text-xs text-gray-400">{sub.desc}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href!}
                  className="px-4 py-2 text-gray-700 hover:text-[#8B4513] font-medium rounded-lg hover:bg-[#FFF8E7] transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Acciones Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Badge de confianza */}
            <div className="flex items-center gap-1 bg-[#FFF8E7] px-3 py-1.5 rounded-full border border-[#FFD700]/30">
              <Star size={12} className="text-[#FFD700] fill-[#FFD700]" />
              <span className="text-xs font-semibold text-[#8B4513]">+48K tickets vendidos</span>
            </div>

            <button className="relative p-2 text-gray-600 hover:text-[#8B4513] hover:bg-[#FFF8E7] rounded-lg transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            <button className="relative p-2 text-gray-600 hover:text-[#8B4513] hover:bg-[#FFF8E7] rounded-lg transition-colors">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#8B4513] text-white text-xs rounded-full flex items-center justify-center font-bold">
                3
              </span>
            </button>

            <Link href="/login">
              <Button variante="fantasma" tamaño="sm">Entrar</Button>
            </Link>
            <Link href="/crear-rifa">
              <Button variante="dorado" tamaño="sm">
                🐻 Crear Rifa
              </Button>
            </Link>
          </div>

          {/* Botón menú móvil */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:text-[#8B4513] rounded-lg"
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            {menuAbierto ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menú Móvil */}
      {menuAbierto && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) =>
              link.submenu ? (
                <div key={link.label}>
                  <button
                    className="w-full text-left px-4 py-3 font-medium text-gray-700 hover:text-[#8B4513] hover:bg-[#FFF8E7] rounded-xl transition-colors"
                    onClick={() =>
                      setSubmenuAbierto(submenuAbierto === link.label ? null : link.label)
                    }
                  >
                    {link.label}
                  </button>
                  {submenuAbierto === link.label && (
                    <div className="ml-4 mt-1 space-y-1">
                      {link.submenu.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block px-4 py-2.5 text-sm text-gray-600 hover:text-[#8B4513] hover:bg-[#FFF8E7] rounded-xl transition-colors"
                          onClick={() => setMenuAbierto(false)}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href!}
                  className="block px-4 py-3 font-medium text-gray-700 hover:text-[#8B4513] hover:bg-[#FFF8E7] rounded-xl transition-colors"
                  onClick={() => setMenuAbierto(false)}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="pt-3 space-y-2 border-t border-gray-100">
              <Link href="/login" onClick={() => setMenuAbierto(false)}>
                <Button variante="secundario" anchoCompleto>Entrar</Button>
              </Link>
              <Link href="/crear-rifa" onClick={() => setMenuAbierto(false)}>
                <Button variante="dorado" anchoCompleto>🐻 Crear mi Rifa</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
