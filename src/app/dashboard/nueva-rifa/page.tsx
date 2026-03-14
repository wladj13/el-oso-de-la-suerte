import { crearRifa } from '@/lib/actions/rifas';
import { requireOrganizador } from '@/lib/queries/auth';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const categorias = [
  'Tecnología', 'Vehículos', 'Electrodomésticos', 'Joyas', 'Viajes', 'Efectivo', 'Otros',
];

const metodosPago = [
  { id: 'zelle', label: '🏦 Zelle' },
  { id: 'pago-movil', label: '📲 Pago Móvil' },
  { id: 'binance', label: '🟡 Binance' },
  { id: 'efectivo', label: '💵 Efectivo' },
  { id: 'usdt', label: '🪙 USDT' },
];

export default async function NuevaRifaPage() {
  await requireOrganizador();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/dashboard/rifas" className="w-9 h-9 bg-white border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors">
          <ArrowLeft size={16} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-gray-900">Crear Nueva Rifa</h1>
          <p className="text-sm text-gray-500">Completa los datos para publicar tu rifa</p>
        </div>
      </div>

      <form action={crearRifa} className="space-y-6">
        {/* Información básica */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
          <h2 className="font-black text-gray-900 text-lg">📋 Información Básica</h2>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Título de la rifa *</label>
            <input name="titulo" type="text" required placeholder="Ej: iPhone 15 Pro Max 256GB"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B4513]/20 focus:border-[#8B4513] text-sm" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción</label>
            <textarea name="descripcion" rows={3} placeholder="Describe el premio, condiciones del sorteo..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B4513]/20 focus:border-[#8B4513] text-sm resize-none" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Categoría</label>
            <select name="categoria"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B4513]/20 focus:border-[#8B4513] text-sm bg-white">
              <option value="">Seleccionar categoría</option>
              {categorias.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Tickets y precio */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
          <h2 className="font-black text-gray-900 text-lg">🎟️ Tickets y Precio</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Precio por ticket (USD) *</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">$</span>
                <input name="precioTicket" type="number" required min="0.50" step="0.50" placeholder="5.00"
                  className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B4513]/20 focus:border-[#8B4513] text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Total de tickets *</label>
              <input name="totalTickets" type="number" required min="10" max="10000" placeholder="100"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B4513]/20 focus:border-[#8B4513] text-sm" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha del sorteo</label>
            <input name="fechaSorteo" type="datetime-local"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B4513]/20 focus:border-[#8B4513] text-sm" />
          </div>
        </div>

        {/* Métodos de pago */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-black text-gray-900 text-lg mb-4">💳 Métodos de Pago Aceptados</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {metodosPago.map((m) => (
              <label key={m.id} className="flex items-center gap-3 cursor-pointer p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors has-[:checked]:border-[#8B4513] has-[:checked]:bg-[#FFF8E7]">
                <input type="checkbox" name="metodosPago" value={m.id} className="accent-[#8B4513]" defaultChecked />
                <span className="text-sm font-medium text-gray-700">{m.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Premio principal */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="font-black text-gray-900 text-lg">🏆 Premio Principal</h2>
          <input type="hidden" name="premios" id="premiosInput" />

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción del premio *</label>
            <input id="premioPrincipal" type="text" placeholder="Ej: iPhone 15 Pro Max 256GB Titanio Negro"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B4513]/20 focus:border-[#8B4513] text-sm" />
            <p className="text-xs text-gray-400 mt-1">Escribe el premio y se guardará automáticamente</p>
          </div>
        </div>

        {/* Botones */}
        <div className="flex gap-3 pb-6">
          <Link href="/dashboard/rifas"
            className="flex-1 text-center border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-3 rounded-xl transition-colors">
            Cancelar
          </Link>
          <button type="submit"
            className="flex-1 bg-[#8B4513] hover:bg-[#5C2D09] text-white font-bold py-3 rounded-xl transition-colors">
            🐻 Crear Rifa
          </button>
        </div>
      </form>

      <script dangerouslySetInnerHTML={{ __html: `
        document.querySelector('form').addEventListener('submit', function() {
          var desc = document.getElementById('premioPrincipal').value;
          if (desc) {
            document.getElementById('premiosInput').value = JSON.stringify([{posicion: 1, descripcion: desc}]);
          }
        });
      `}} />
    </div>
  );
}
