'use client';

import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: 'primario' | 'secundario' | 'dorado' | 'verde' | 'fantasma' | 'peligro';
  tamaño?: 'sm' | 'md' | 'lg' | 'xl';
  cargando?: boolean;
  icono?: React.ReactNode;
  iconoDerecho?: React.ReactNode;
  anchoCompleto?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variante = 'primario',
      tamaño = 'md',
      cargando = false,
      icono,
      iconoDerecho,
      anchoCompleto = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const base =
      'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantes = {
      primario:
        'bg-[#8B4513] text-white hover:bg-[#A0522D] active:bg-[#6B3410] focus:ring-[#8B4513] shadow-md hover:shadow-lg',
      secundario:
        'bg-white text-[#8B4513] border-2 border-[#8B4513] hover:bg-[#FFF8E7] active:bg-[#F5E6D0] focus:ring-[#8B4513]',
      dorado:
        'bg-[#FFD700] text-[#1A1008] hover:bg-[#FFE55C] active:bg-[#E5C100] focus:ring-[#FFD700] shadow-md hover:shadow-lg btn-glow',
      verde:
        'bg-[#228B22] text-white hover:bg-[#2ECC2E] active:bg-[#1A6B1A] focus:ring-[#228B22] shadow-md hover:shadow-lg',
      fantasma:
        'bg-transparent text-[#8B4513] hover:bg-[#FFF8E7] active:bg-[#F5E6D0] focus:ring-[#8B4513]',
      peligro:
        'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-600 shadow-md',
    };

    const tamaños = {
      sm: 'text-sm px-3 py-2',
      md: 'text-base px-5 py-2.5',
      lg: 'text-lg px-7 py-3',
      xl: 'text-xl px-9 py-4',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || cargando}
        className={cn(
          base,
          variantes[variante],
          tamaños[tamaño],
          anchoCompleto && 'w-full',
          className
        )}
        {...props}
      >
        {cargando ? (
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : (
          icono
        )}
        {children}
        {!cargando && iconoDerecho}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
