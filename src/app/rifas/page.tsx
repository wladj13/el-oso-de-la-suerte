import { Metadata } from 'next';
import { Search, SlidersHorizontal, TrendingUp, Clock, DollarSign, Flame } from 'lucide-react';
import RifaCard from '@/components/RifaCard';
import { rifasEjemplo, categoriasRifa } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Explorar Rifas',
  description: 'Encuentra las mejores rifas de Venezuela. Filtra por categoría, precio y fecha de sorteo. Organización verificada y pagos seguros.',
};

const ordenOptions = [
  { valor: 'populares', label: 'Más populares', icono: <TrendingUp size={14} /> },
  { valor: 'recientes', label: 'Más recientes', icono: <Clock size={14} /> },
  { valor: 'precio_asc', label: 'Precio: menor a mayor', icono: <DollarSign size={14} /> },
  { valor: 'precio_desc', label: 'Precio: mayor a menor', icono: <DollarSign size={14} /> },
  { valor: 'proximos', label: 'Sorteo próximo', icono: <Flame size={14} /> },
];

export default function RifasPage() {
  return (
    <div className="min-h-screen bg-[#FFF8E7] pt-16">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-sm text-[#8B4513] font-semibold mb-2">
                <span>🏠</span>
                <span>/</span>
                <span>Rifas</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-[#1A1008]">
                🎟️ Rifas Activas
              </h1>
              <p className="text-gray-500 mt-2 text-lg">
                <span className="font-bold text-[#8B4513]">{rifasEjemplo.length}</span> rifas verificadas esperando tu ticket de la suerte
              </p>
            </div>

            {/* Buscador */}
            <div className="relative w-full md:w-96">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar rifas, premios..."
                className="w-full pl-11 pr-4 py-3.5 bg-[#FFF8E7] border border-[#FFD700]/30 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:border-[#FFD700]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar de filtros */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-black text-[#1A1008] text-lg flex items-center gap-2">
                  <SlidersHorizontal size={18} className="text-[#8B4513]" />
                  Filtros
                </h2>
                <button className="text-xs text-[#8B4513] font-semibold hover:underline">
                  Limpiar todo
                </button>
              </div>

              {/* Categorías */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-700 text-sm mb-3 uppercase tracking-wider">
                  Categoría
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="categoria"
                      value=""
                      defaultChecked
                      className="text-[#8B4513] focus:ring-[#8B4513]"
                    />
                    <span className="text-sm text-gray-600 group-hover:text-[#8B4513] font-medium">
                      Todas las categorías
                    </span>
                  </label>
                  {categoriasRifa.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="categoria"
                        value={cat.id}
                        className="text-[#8B4513] focus:ring-[#8B4513]"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-[#8B4513]">
                        {cat.emoji} {cat.nombre}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rango de precio */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-700 text-sm mb-3 uppercase tracking-wider">
                  Precio por ticket
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Mínimo</label>
                    <input
                      type="number"
                      placeholder="$0"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Máximo</label>
                    <input
                      type="number"
                      placeholder="$100"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50"
                    />
                  </div>
                </div>
              </div>

              {/* Métodos de pago */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-700 text-sm mb-3 uppercase tracking-wider">
                  Método de pago
                </h3>
                <div className="space-y-2">
                  {[
                    { valor: 'zelle', emoji: '🏦', label: 'Zelle' },
                    { valor: 'pago_movil', emoji: '📲', label: 'Pago Móvil' },
                    { valor: 'binance', emoji: '🟡', label: 'Binance' },
                    { valor: 'efectivo', emoji: '💵', label: 'Efectivo' },
                  ].map((metodo) => (
                    <label key={metodo.valor} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        value={metodo.valor}
                        className="text-[#8B4513] focus:ring-[#8B4513] rounded"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-[#8B4513]">
                        {metodo.emoji} {metodo.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Solo verificados */}
              <div className="pt-4 border-t border-gray-100">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="text-[#228B22] focus:ring-[#228B22] rounded"
                  />
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-[#228B22]">
                    ✅ Solo organizadores verificados
                  </span>
                </label>
              </div>

              <button className="w-full mt-5 bg-[#8B4513] text-white font-bold py-3 rounded-2xl hover:bg-[#A0522D] transition-colors">
                Aplicar Filtros
              </button>
            </div>
          </aside>

          {/* Grid de rifas */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              {/* Categorías rápidas */}
              <div className="flex flex-wrap gap-2">
                <button className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#8B4513] text-white">
                  Todas
                </button>
                {categoriasRifa.slice(0, 4).map((cat) => (
                  <button
                    key={cat.id}
                    className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 hover:border-[#8B4513] hover:text-[#8B4513] transition-colors"
                  >
                    {cat.emoji} {cat.nombre}
                  </button>
                ))}
              </div>

              {/* Ordenar */}
              <select className="text-sm border border-gray-200 rounded-xl px-4 py-2.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 cursor-pointer">
                {ordenOptions.map((o) => (
                  <option key={o.valor} value={o.valor}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {rifasEjemplo.map((rifa) => (
                <RifaCard key={rifa.id} rifa={rifa} destacada={rifa.destacada} />
              ))}
            </div>

            {/* Paginación */}
            <div className="flex items-center justify-center gap-3 mt-12">
              <button className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-500 hover:border-[#8B4513] hover:text-[#8B4513] transition-colors disabled:opacity-50" disabled>
                ← Anterior
              </button>
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  className={`w-10 h-10 rounded-xl text-sm font-bold transition-colors ${
                    p === 1
                      ? 'bg-[#8B4513] text-white'
                      : 'border border-gray-200 text-gray-600 hover:border-[#8B4513] hover:text-[#8B4513]'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:border-[#8B4513] hover:text-[#8B4513] transition-colors">
                Siguiente →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
