import { Metadata } from 'next';
import { Plus, Trophy, TrendingUp, DollarSign, Phone, Mail, MoreVertical } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';

export const metadata: Metadata = { title: 'Vendedores | Dashboard' };

const vendedores = [
  {
    id: 1,
    nombre: 'Luis Hernández',
    email: 'luis@gmail.com',
    telefono: '+58 412-111-2222',
    avatar: '👨',
    ticketsVendidos: 89,
    gananciaOrganizador: 489.5,
    comision: 10,
    gananciaVendedor: 54.4,
    ranking: 1,
    estado: 'activo',
    rifasAsignadas: ['iPhone 15 Pro Max', 'Toyota Corolla 2024'],
    ultimaVenta: 'Hace 2 horas',
    tipo: 'con_usuario',
  },
  {
    id: 2,
    nombre: 'Carmen Blanco',
    email: 'carmen@gmail.com',
    telefono: '+58 414-333-4444',
    avatar: '👩',
    ticketsVendidos: 67,
    gananciaOrganizador: 368.5,
    comision: 8,
    gananciaVendedor: 32.2,
    ranking: 2,
    estado: 'activo',
    rifasAsignadas: ['Samsung 55" 4K', 'PlayStation 5'],
    ultimaVenta: 'Hace 5 horas',
    tipo: 'sin_usuario',
  },
  {
    id: 3,
    nombre: 'Roberto Pérez',
    email: 'roberto@gmail.com',
    telefono: '+58 424-555-6666',
    avatar: '🧑',
    ticketsVendidos: 54,
    gananciaOrganizador: 297,
    comision: 12,
    gananciaVendedor: 40.4,
    ranking: 3,
    estado: 'activo',
    rifasAsignadas: ['Toyota Corolla 2024'],
    ultimaVenta: 'Ayer',
    tipo: 'con_usuario',
  },
  {
    id: 4,
    nombre: 'Sofia Gutiérrez',
    email: 'sofia@gmail.com',
    telefono: '+58 416-777-8888',
    avatar: '👩‍💼',
    ticketsVendidos: 38,
    gananciaOrganizador: 209,
    comision: 10,
    gananciaVendedor: 23.2,
    ranking: 4,
    estado: 'activo',
    rifasAsignadas: ['iPhone 15 Pro Max'],
    ultimaVenta: 'Hace 2 días',
    tipo: 'sin_usuario',
  },
  {
    id: 5,
    nombre: 'Marco González',
    email: 'marco@gmail.com',
    telefono: '+58 412-999-0000',
    avatar: '👨‍💼',
    ticketsVendidos: 21,
    gananciaOrganizador: 115.5,
    comision: 8,
    gananciaVendedor: 10.1,
    ranking: 5,
    estado: 'pausado',
    rifasAsignadas: ['MacBook Air M3'],
    ultimaVenta: 'Hace 4 días',
    tipo: 'con_usuario',
  },
];

const rankingEmojis: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };

export default function VendedoresPage() {
  const totalTicketsEquipo = vendedores.reduce((acc, v) => acc + v.ticketsVendidos, 0);
  const totalGananciasEquipo = vendedores.reduce((acc, v) => acc + v.gananciaOrganizador, 0);
  const vendedoresActivos = vendedores.filter((v) => v.estado === 'activo').length;

  return (
    <div className="space-y-8">
      {/* KPIs del equipo */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard titulo="Vendedores activos" valor={String(vendedoresActivos)} subvalor={`de ${vendedores.length} totales`} icono="👥" color="brown" />
        <StatCard titulo="Tickets por equipo" valor={String(totalTicketsEquipo)} cambio={+31} icono="🎟️" color="green" />
        <StatCard titulo="Generado por equipo" valor={`$${totalGananciasEquipo.toFixed(0)}`} cambio={+19} icono="💰" color="gold" />
        <StatCard titulo="Mejor vendedor" valor="Luis H." subvalor="89 tickets este mes" icono="🏆" color="purple" />
      </div>

      {/* Header tabla */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">
            Gestiona tu equipo de ventas, asigna rifas y configura comisiones
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:border-[#8B4513] hover:text-[#8B4513] transition-colors">
            📊 Ver ranking completo
          </button>
          <button className="flex items-center gap-2 bg-[#FFD700] text-[#1A1008] text-sm font-black px-5 py-2.5 rounded-xl hover:bg-[#FFE55C] transition-colors btn-glow">
            <Plus size={16} />
            Agregar Vendedor
          </button>
        </div>
      </div>

      {/* Ranking top 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vendedores.slice(0, 3).map((v) => (
          <div
            key={v.id}
            className={`rounded-2xl p-5 border text-center relative overflow-hidden ${
              v.ranking === 1
                ? 'bg-[#FFD700]/5 border-[#FFD700]/40'
                : v.ranking === 2
                ? 'bg-gray-50 border-gray-200'
                : 'bg-orange-50/50 border-orange-100'
            }`}
          >
            <div className="text-4xl mb-1">{rankingEmojis[v.ranking] ?? '🏅'}</div>
            <div className="text-2xl mb-2">{v.avatar}</div>
            <div className="font-black text-gray-900">{v.nombre}</div>
            <div className="text-xs text-gray-400 mb-3">{v.tipo === 'con_usuario' ? '👤 Con cuenta' : '📱 Sin cuenta'}</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white rounded-xl py-2">
                <div className="text-lg font-black text-[#8B4513]">{v.ticketsVendidos}</div>
                <div className="text-xs text-gray-400">tickets</div>
              </div>
              <div className="bg-white rounded-xl py-2">
                <div className="text-lg font-black text-[#228B22]">${v.gananciaVendedor.toFixed(0)}</div>
                <div className="text-xs text-gray-400">comisión</div>
              </div>
            </div>
            <div className="mt-3 text-xs text-gray-400">Última venta: {v.ultimaVenta}</div>
          </div>
        ))}
      </div>

      {/* Tabla completa de vendedores */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
          <h2 className="font-black text-gray-900">🏆 Todos los Vendedores</h2>
          <select className="text-xs border border-gray-200 rounded-xl px-3 py-2 text-gray-500 focus:outline-none">
            <option>Este mes</option>
            <option>Esta semana</option>
            <option>Todo el tiempo</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider px-6 py-3">#</th>
                <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Vendedor</th>
                <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Tipo</th>
                <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Tickets</th>
                <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Generado</th>
                <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Comisión</th>
                <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Rifas</th>
                <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Estado</th>
                <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {vendedores.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-lg">{rankingEmojis[v.ranking] ?? `#${v.ranking}`}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-[#FFF8E7] rounded-xl flex items-center justify-center text-xl border border-[#FFD700]/10">
                        {v.avatar}
                      </div>
                      <div>
                        <div className="font-bold text-gray-800 text-sm">{v.nombre}</div>
                        <div className="text-xs text-gray-400 flex items-center gap-2">
                          <Mail size={10} />
                          {v.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      v.tipo === 'con_usuario'
                        ? 'bg-blue-50 text-blue-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {v.tipo === 'con_usuario' ? '👤 Con cuenta' : '📱 Sin cuenta'}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5">
                      <TrendingUp size={14} className="text-[#228B22]" />
                      <span className="font-black text-gray-900">{v.ticketsVendidos}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5">
                      <DollarSign size={14} className="text-[#228B22]" />
                      <span className="font-black text-[#228B22]">${v.gananciaOrganizador.toFixed(0)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <span className="font-bold text-[#8B4513] text-sm">{v.comision}%</span>
                      <div className="text-xs text-gray-400">${v.gananciaVendedor.toFixed(1)} a pagar</div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1">
                      {v.rifasAsignadas.slice(0, 2).map((r) => (
                        <span key={r} className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded-lg truncate max-w-[120px]">
                          {r}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      v.estado === 'activo'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {v.estado === 'activo' ? '● Activo' : '○ Pausado'}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1">
                      <a
                        href={`tel:${v.telefono}`}
                        className="w-8 h-8 border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:text-[#228B22] hover:border-[#228B22] transition-colors"
                        title="Llamar"
                      >
                        <Phone size={12} />
                      </a>
                      <button
                        className="w-8 h-8 border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:text-[#8B4513] hover:border-[#8B4513] transition-colors"
                        title="Más opciones"
                      >
                        <MoreVertical size={12} />
                      </button>
                      <button className="text-xs bg-[#8B4513] text-white px-3 py-1.5 rounded-xl font-bold hover:bg-[#A0522D] transition-colors">
                        Editar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#FFF8E7] border-t border-[#FFD700]/20">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              💰 Total comisiones a pagar este mes:{' '}
              <span className="font-black text-[#8B4513]">
                ${vendedores.reduce((acc, v) => acc + v.gananciaVendedor, 0).toFixed(1)}
              </span>
            </p>
            <button className="text-sm bg-[#228B22] text-white font-black px-5 py-2.5 rounded-xl hover:bg-[#1A6B1A] transition-colors">
              💸 Pagar comisiones semanales
            </button>
          </div>
        </div>
      </div>

      {/* Info sobre tipos de vendedores */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-2xl">👤</div>
            <div>
              <h3 className="font-black text-blue-900">Vendedor con Cuenta</h3>
              <p className="text-xs text-blue-600">Acceso al dashboard propio</p>
            </div>
          </div>
          <ul className="space-y-1.5 text-sm text-blue-700">
            <li>✓ Ve sus tickets vendidos en tiempo real</li>
            <li>✓ Comparte su link de venta personalizado</li>
            <li>✓ Ve sus comisiones acumuladas</li>
            <li>✓ Accede desde cualquier dispositivo</li>
          </ul>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-2xl">📱</div>
            <div>
              <h3 className="font-black text-gray-900">Vendedor sin Cuenta</h3>
              <p className="text-xs text-gray-500">Vende sin registro</p>
            </div>
          </div>
          <ul className="space-y-1.5 text-sm text-gray-600">
            <li>✓ Solo necesita su número de teléfono</li>
            <li>✓ Recibe notificaciones por WhatsApp</li>
            <li>✓ Tú controlas todas sus ventas</li>
            <li>✓ Ideal para vendedores ocasionales</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
