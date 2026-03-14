'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Eye, EyeOff, Mail, Lock, User, Phone, AlertCircle, CheckCircle } from 'lucide-react';

const planes = [
  { id: 'bronce', nombre: 'Bronce', precio: '$19/mes', desc: 'Para empezar' },
  { id: 'plata', nombre: 'Plata', precio: '$49/mes', desc: 'Más popular', popular: true },
  { id: 'oro', nombre: 'Oro', precio: '$99/mes', desc: 'Sin límites' },
];

export default function RegistroPage() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [password, setPassword] = useState('');
  const [verPassword, setVerPassword] = useState(false);
  const [plan, setPlan] = useState('plata');
  const [terminos, setTerminos] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [exito, setExito] = useState(false);

  const supabase = createClient();

  async function handleRegistro(e: React.FormEvent) {
    e.preventDefault();
    if (!terminos) { setError('Debes aceptar los términos y condiciones'); return; }
    if (password.length < 8) { setError('La contraseña debe tener al menos 8 caracteres'); return; }

    setCargando(true);
    setError('');

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nombre, whatsapp, plan, rol: 'organizador' },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message === 'User already registered' ? 'Este email ya está registrado' : error.message);
      setCargando(false);
      return;
    }

    setExito(true);
  }

  async function handleGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  if (exito) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1A1008] via-[#2D1A0A] to-[#3D2211] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">
          <div className="text-6xl mb-4">📧</div>
          <h2 className="text-2xl font-black text-gray-900 mb-3">¡Revisa tu email!</h2>
          <p className="text-gray-500 mb-6">
            Te enviamos un enlace de confirmación a <strong>{email}</strong>. Haz click en el enlace para activar tu cuenta.
          </p>
          <Link href="/login" className="inline-block bg-[#8B4513] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#5C2D09] transition-colors">
            Ir al Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1008] via-[#2D1A0A] to-[#3D2211] flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-2">
            <div className="text-5xl">🐻</div>
            <div className="font-black text-white text-xl">El Oso de la Suerte</div>
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h1 className="text-2xl font-black text-gray-900 mb-1">Crear cuenta de organizador</h1>
          <p className="text-gray-500 text-sm mb-8">Empieza a crear rifas en menos de 10 minutos</p>

          {error && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-6 text-sm">
              <AlertCircle size={16} className="shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleRegistro} className="space-y-5">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre completo</label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Tu nombre" required
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B4513]/20 focus:border-[#8B4513] transition-colors text-sm" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" required
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B4513]/20 focus:border-[#8B4513] transition-colors text-sm" />
              </div>
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp</label>
              <div className="flex">
                <span className="flex items-center px-4 bg-gray-50 border border-r-0 border-gray-200 rounded-l-xl text-sm text-gray-600 font-medium">+58</span>
                <div className="relative flex-1">
                  <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="412-000-0000" required
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-[#8B4513]/20 focus:border-[#8B4513] transition-colors text-sm" />
                </div>
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Contraseña</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type={verPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo 8 caracteres" required
                  className="w-full pl-11 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B4513]/20 focus:border-[#8B4513] transition-colors text-sm" />
                <button type="button" onClick={() => setVerPassword(!verPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {verPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Plan */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Plan</label>
              <div className="grid grid-cols-3 gap-2">
                {planes.map((p) => (
                  <label key={p.id} className={`relative cursor-pointer rounded-xl border-2 p-3 text-center transition-all ${plan === p.id ? 'border-[#8B4513] bg-[#FFF8E7]' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input type="radio" name="plan" value={p.id} checked={plan === p.id} onChange={() => setPlan(p.id)} className="sr-only" />
                    {p.popular && <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#FFD700] text-[#1A1008] text-[10px] font-black px-2 py-0.5 rounded-full whitespace-nowrap">Popular</div>}
                    <div className="font-black text-gray-900 text-sm">{p.nombre}</div>
                    <div className="text-[#8B4513] font-bold text-xs">{p.precio}</div>
                    <div className="text-gray-400 text-[11px]">{p.desc}</div>
                    {plan === p.id && <CheckCircle size={14} className="absolute top-2 right-2 text-[#8B4513]" />}
                  </label>
                ))}
              </div>
            </div>

            {/* Términos */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={terminos} onChange={(e) => setTerminos(e.target.checked)} className="mt-1 w-4 h-4 accent-[#8B4513]" />
              <span className="text-sm text-gray-500">
                Acepto los{' '}
                <Link href="/terminos" className="text-[#8B4513] hover:underline">Términos y Condiciones</Link>
                {' '}y la{' '}
                <Link href="/privacidad" className="text-[#8B4513] hover:underline">Política de Privacidad</Link>
              </span>
            </label>

            <button type="submit" disabled={cargando}
              className="w-full bg-[#8B4513] hover:bg-[#5C2D09] disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors">
              {cargando ? 'Creando cuenta...' : '🐻 Crear mi cuenta gratis'}
            </button>
          </form>

          {/* Divisor */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">o regístrate con</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <button onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 border border-gray-200 hover:bg-gray-50 py-3 rounded-xl transition-colors font-semibold text-gray-700 text-sm">
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/>
              <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"/>
              <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18z"/>
              <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z"/>
            </svg>
            Continuar con Google
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="text-[#8B4513] font-semibold hover:underline">Iniciar sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
