import { Metadata } from 'next';
import { Save, Upload, Globe, Bell, Shield, Palette } from 'lucide-react';

export const metadata: Metadata = { title: 'Configuración | Dashboard' };

export default function ConfiguracionPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      {/* Perfil del organizador */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3">
          <div className="w-8 h-8 bg-[#FFF8E7] rounded-xl flex items-center justify-center">
            <Shield size={16} className="text-[#8B4513]" />
          </div>
          <div>
            <h2 className="font-black text-gray-900">Perfil del Organizador</h2>
            <p className="text-xs text-gray-400">Esta información aparece en tus páginas de rifas</p>
          </div>
        </div>
        <div className="p-6 space-y-5">
          {/* Avatar */}
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 bg-[#FFF8E7] rounded-2xl flex items-center justify-center text-4xl border-2 border-[#FFD700]/30">
              👩
            </div>
            <div>
              <button className="flex items-center gap-2 text-sm font-semibold text-[#8B4513] border-2 border-[#8B4513] px-4 py-2 rounded-xl hover:bg-[#FFF8E7] transition-colors">
                <Upload size={14} />
                Cambiar foto
              </button>
              <p className="text-xs text-gray-400 mt-1">JPG, PNG o GIF · Máx 2MB</p>
            </div>
          </div>

          {/* Campos */}
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: 'Nombre completo', valor: 'María González', tipo: 'text' },
              { label: 'Nombre para mostrar', valor: 'María González Rifas', tipo: 'text' },
              { label: 'Email', valor: 'maria@rifasvenezuela.com', tipo: 'email' },
              { label: 'WhatsApp', valor: '+58 412-111-2222', tipo: 'tel' },
            ].map((f) => (
              <div key={f.label}>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">{f.label}</label>
                <input
                  type={f.tipo}
                  defaultValue={f.valor}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:border-[#FFD700] transition-all"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Descripción pública</label>
            <textarea
              defaultValue="Organizadora verificada con más de 2 años de experiencia en rifas solidarias."
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:border-[#FFD700] transition-all resize-none"
            />
          </div>
        </div>
      </div>

      {/* Dominio y URL */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
            <Globe size={16} className="text-blue-600" />
          </div>
          <div>
            <h2 className="font-black text-gray-900">Dominio y URL</h2>
            <p className="text-xs text-gray-400">Personaliza tu enlace de organización</p>
          </div>
        </div>
        <div className="p-6 space-y-5">
          {/* Subdominio */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              Subdominio (incluido en Plan Bronce)
            </label>
            <div className="flex items-center gap-0">
              <span className="px-4 py-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-xl text-sm text-gray-400 whitespace-nowrap">
                rifas.
              </span>
              <input
                type="text"
                defaultValue="mariagonzalez"
                className="flex-1 px-4 py-3 border border-gray-200 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:border-[#FFD700] transition-all"
              />
              <span className="px-4 py-3 bg-gray-50 border border-l-0 border-gray-200 rounded-r-xl text-sm text-gray-400 whitespace-nowrap">
                .elosodelasuerte.com
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Disponible: <span className="text-[#228B22] font-semibold">✓ rifas.mariagonzalez.elosodelasuerte.com</span>
            </p>
          </div>

          {/* Dominio propio */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              Dominio propio (Plan Plata y Oro)
              <span className="ml-2 text-xs text-[#228B22] font-semibold bg-green-50 px-2 py-0.5 rounded-full">✓ Activo en tu plan</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                defaultValue="mariagonzalez-rifas.com"
                placeholder="tudominio.com"
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:border-[#FFD700] transition-all"
              />
              <button className="bg-[#8B4513] text-white font-bold px-5 py-3 rounded-xl hover:bg-[#A0522D] transition-colors text-sm whitespace-nowrap">
                Verificar DNS
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              SSL automático incluido · Activación en ~30 minutos
            </p>
          </div>
        </div>
      </div>

      {/* Métodos de pago predeterminados */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3">
          <div className="w-8 h-8 bg-green-50 rounded-xl flex items-center justify-center text-lg">
            💳
          </div>
          <div>
            <h2 className="font-black text-gray-900">Métodos de Pago Predeterminados</h2>
            <p className="text-xs text-gray-400">Estos métodos se activarán por defecto en tus rifas</p>
          </div>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { emoji: '🏦', nombre: 'Zelle', desc: 'USD · Cuenta bancaria EE.UU.', activo: true },
              { emoji: '📲', nombre: 'Pago Móvil', desc: 'VES · Bancos venezolanos', activo: true },
              { emoji: '🟡', nombre: 'Binance', desc: 'USDT · Crypto', activo: true },
              { emoji: '💵', nombre: 'Efectivo', desc: 'USD/VES · Pago presencial', activo: false },
              { emoji: '🪙', nombre: 'USDT directo', desc: 'TRC20/ERC20', activo: false },
              { emoji: '💳', nombre: 'Tarjeta (Stripe)', desc: 'Visa, Mastercard · Internacional', activo: false },
            ].map((m) => (
              <div
                key={m.nombre}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                  m.activo
                    ? 'border-[#228B22]/30 bg-green-50'
                    : 'border-gray-100 bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{m.emoji}</span>
                  <div>
                    <div className="font-bold text-gray-800 text-sm">{m.nombre}</div>
                    <div className="text-xs text-gray-400">{m.desc}</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={m.activo} className="sr-only peer" />
                  <div className="w-10 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-[#FFD700]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#228B22] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
                </label>
              </div>
            ))}
          </div>

          {/* Info Zelle */}
          <div className="mt-5 p-4 bg-[#FFF8E7] rounded-2xl border border-[#FFD700]/20">
            <p className="text-sm font-bold text-[#8B4513] mb-3">🏦 Datos de Zelle</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Email Zelle</label>
                <input type="email" defaultValue="maria@email.com" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Nombre del titular</label>
                <input type="text" defaultValue="María González" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notificaciones */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-50 rounded-xl flex items-center justify-center">
            <Bell size={16} className="text-purple-600" />
          </div>
          <h2 className="font-black text-gray-900">Notificaciones</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { label: 'Nueva venta de ticket', desc: 'Recibir alerta al instante por WhatsApp', activo: true },
              { label: 'Voucher pendiente de revisión', desc: 'Alerta cuando hay un comprobante esperando', activo: true },
              { label: 'Rifa alcanza 50% de ventas', desc: 'Milestone de progreso importante', activo: true },
              { label: 'Rifa alcanza 90% de ventas', desc: 'Urgencia - pocos tickets disponibles', activo: true },
              { label: 'Nuevo vendedor se une', desc: 'Cuando alguien acepta tu invitación', activo: false },
              { label: 'Resumen diario', desc: 'Email con estadísticas del día', activo: false },
              { label: 'Resumen semanal', desc: 'Email con métricas semanales + ganancias', activo: true },
            ].map((n, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{n.label}</p>
                  <p className="text-xs text-gray-400">{n.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-4">
                  <input type="checkbox" defaultChecked={n.activo} className="sr-only peer" />
                  <div className="w-10 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-[#FFD700]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#8B4513] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Guardar cambios */}
      <div className="flex items-center justify-between bg-white rounded-2xl border border-gray-100 px-6 py-4">
        <p className="text-sm text-gray-500">
          Última actualización: hace 3 días
        </p>
        <button className="flex items-center gap-2 bg-[#8B4513] text-white font-black px-8 py-3 rounded-xl hover:bg-[#A0522D] transition-colors">
          <Save size={16} />
          Guardar Cambios
        </button>
      </div>
    </div>
  );
}
