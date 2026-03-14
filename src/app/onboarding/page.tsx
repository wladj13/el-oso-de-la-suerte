import { crearPerfilOrganizador } from '@/lib/actions/organizador';
import { requireUser } from '@/lib/queries/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function OnboardingPage() {
  const user = await requireUser();

  // Si ya tiene perfil de organizador, ir al dashboard
  const existente = await prisma.organizador.findUnique({ where: { userId: user.id } });
  if (existente) redirect('/dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1008] via-[#2D1A0A] to-[#3D2211] flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🐻</div>
          <h1 className="text-3xl font-black text-white mb-2">¡Bienvenido!</h1>
          <p className="text-gray-300">Configura tu perfil de organizador para empezar</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <form action={crearPerfilOrganizador} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre de tu negocio / marca *
              </label>
              <input
                name="nombreNegocio"
                type="text"
                placeholder="Ej: Rifas El Campeón"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B4513]/20 focus:border-[#8B4513] text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp</label>
              <div className="flex">
                <span className="flex items-center px-4 bg-gray-50 border border-r-0 border-gray-200 rounded-l-xl text-sm text-gray-600">+58</span>
                <input
                  name="whatsapp"
                  type="tel"
                  placeholder="412-000-0000"
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-[#8B4513]/20 focus:border-[#8B4513] text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Instagram</label>
              <div className="flex">
                <span className="flex items-center px-4 bg-gray-50 border border-r-0 border-gray-200 rounded-l-xl text-sm text-gray-600">@</span>
                <input
                  name="instagram"
                  type="text"
                  placeholder="tunegocio"
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-[#8B4513]/20 focus:border-[#8B4513] text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción</label>
              <textarea
                name="descripcion"
                rows={3}
                placeholder="Cuéntanos sobre tu negocio de rifas..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B4513]/20 focus:border-[#8B4513] text-sm resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Plan</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'bronce', nombre: 'Bronce', precio: '$19/mes' },
                  { id: 'plata', nombre: 'Plata', precio: '$49/mes', popular: true },
                  { id: 'oro', nombre: 'Oro', precio: '$99/mes' },
                ].map((p) => (
                  <label key={p.id} className="relative cursor-pointer">
                    <input type="radio" name="plan" value={p.id} defaultChecked={p.id === 'plata'} className="sr-only peer" />
                    <div className="peer-checked:border-[#8B4513] peer-checked:bg-[#FFF8E7] border-2 border-gray-200 rounded-xl p-3 text-center transition-all">
                      {p.popular && (
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#FFD700] text-[10px] font-black px-2 py-0.5 rounded-full whitespace-nowrap text-[#1A1008]">Popular</div>
                      )}
                      <div className="font-black text-sm text-gray-900">{p.nombre}</div>
                      <div className="text-xs text-[#8B4513] font-bold">{p.precio}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#8B4513] hover:bg-[#5C2D09] text-white font-bold py-3 rounded-xl transition-colors"
            >
              🐻 Crear mi perfil y continuar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
