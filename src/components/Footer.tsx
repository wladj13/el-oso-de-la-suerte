import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Send } from 'lucide-react';

const enlaces = {
  plataforma: [
    { href: '/rifas', label: 'Explorar Rifas' },
    { href: '/crear-rifa', label: 'Crear mi Rifa' },
    { href: '/precios', label: 'Planes y Precios' },
    { href: '/como-funciona', label: 'Cómo Funciona' },
    { href: '/blog', label: 'Blog' },
  ],
  soporte: [
    { href: '/soporte', label: 'Centro de Ayuda' },
    { href: '/manual', label: '📚 Manual de Usuario' },
    { href: '/descargas', label: '⬇️ Descargas' },
    { href: '/faq', label: 'Preguntas Frecuentes' },
    { href: '/contacto', label: 'Contáctanos' },
    { href: '/terminos', label: 'Términos y Condiciones' },
    { href: '/privacidad', label: 'Política de Privacidad' },
  ],
  organizadores: [
    { href: '/dashboard', label: 'Mi Dashboard' },
    { href: '/dashboard/rifas', label: 'Mis Rifas' },
    { href: '/dashboard/ventas', label: 'Estadísticas' },
    { href: '/dashboard/vendedores', label: 'Gestionar Vendedores' },
    { href: '/dashboard/facturacion', label: 'Facturación' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#1A1008] text-white">
      {/* Banner superior */}
      <div className="bg-oso-gradient py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
              ¿Listo para crear tu rifa? 🐻
            </h2>
            <p className="text-white/80">
              Únete a más de 124 organizadores verificados. Tu suerte tiene nombre.
            </p>
          </div>
          <Link
            href="/crear-rifa"
            className="bg-[#FFD700] text-[#1A1008] font-black px-8 py-4 rounded-2xl hover:bg-[#FFE55C] transition-colors text-lg whitespace-nowrap btn-glow"
          >
            Empezar Gratis →
          </Link>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Marca */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-4xl">🐻</div>
              <div>
                <div className="font-black text-xl text-white">El Oso de la Suerte</div>
                <div className="text-[#FFD700] text-sm font-semibold tracking-widest">
                  Tu suerte tiene nombre
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              La plataforma híbrida de rifas más transparente y completa de Venezuela.
              Marketplace + SAAS para organizadores. Sorteos verificados, pagos seguros.
            </p>
            {/* Métodos de pago */}
            <div className="mb-6">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Métodos de Pago</p>
              <div className="flex flex-wrap gap-2">
                {['🏦 Zelle', '📲 Pago Móvil', '🟡 Binance', '💵 Efectivo', '🪙 USDT'].map((m) => (
                  <span key={m} className="text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-gray-300">
                    {m}
                  </span>
                ))}
              </div>
            </div>
            {/* Redes sociales */}
            <div className="flex gap-3">
              <a
                href="https://instagram.com/elosodelasuerte"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 hover:bg-[#8B4513] border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://t.me/ElOsoDeLaSuerteBot"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 hover:bg-[#8B4513] border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all"
              >
                <Send size={18} />
              </a>
              <a
                href="https://wa.me/584120000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 hover:bg-[#228B22] border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all text-lg"
              >
                💬
              </a>
            </div>
          </div>

          {/* Plataforma */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Plataforma</h3>
            <ul className="space-y-2.5">
              {enlaces.plataforma.map((e) => (
                <li key={e.href}>
                  <Link
                    href={e.href}
                    className="text-gray-400 hover:text-[#FFD700] text-sm transition-colors"
                  >
                    {e.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Soporte</h3>
            <ul className="space-y-2.5">
              {enlaces.soporte.map((e) => (
                <li key={e.href}>
                  <Link
                    href={e.href}
                    className="text-gray-400 hover:text-[#FFD700] text-sm transition-colors"
                  >
                    {e.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <Phone size={16} className="text-[#FFD700] mt-0.5 shrink-0" />
                <span>+58 412-000-0000<br /><span className="text-xs text-gray-500">WhatsApp Business</span></span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <Mail size={16} className="text-[#FFD700] mt-0.5 shrink-0" />
                <span>soporte@elosodelasuerte.com<br /><span className="text-xs text-gray-500">Respuesta en 24h</span></span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin size={16} className="text-[#FFD700] mt-0.5 shrink-0" />
                <span>Caracas, Venezuela<br /><span className="text-xs text-gray-500">Operamos 24/7</span></span>
              </li>
            </ul>

            {/* Stats */}
            <div className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/10">
              <div className="text-[#FFD700] font-black text-xl">48,230+</div>
              <div className="text-gray-400 text-xs">tickets vendidos exitosamente</div>
              <div className="mt-2 text-[#228B22] font-bold text-sm">✓ Plataforma verificada</div>
            </div>
          </div>
        </div>
      </div>

      {/* Pie de página */}
      <div className="border-t border-white/5 px-4 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © 2025 El Oso de la Suerte. Hecho con 🐻 en Venezuela.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/terminos" className="hover:text-gray-300 transition-colors">Términos</Link>
            <Link href="/privacidad" className="hover:text-gray-300 transition-colors">Privacidad</Link>
            <Link href="/cookies" className="hover:text-gray-300 transition-colors">Cookies</Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#228B22] rounded-full animate-pulse" />
            <span>Sistema operativo · 99.9% uptime</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
