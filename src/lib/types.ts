// === TIPOS PRINCIPALES DE EL OSO DE LA SUERTE ===

export type EstadoRifa = 'borrador' | 'activa' | 'finalizada' | 'sorteada';
export type PlanOrganizador = 'bronce' | 'plata' | 'oro';
export type EstadoTicket = 'disponible' | 'reservado' | 'vendido' | 'ganador';
export type EstadoVoucher = 'pendiente' | 'aprobado' | 'rechazado' | 'expirado';
export type CanalVoucher = 'whatsapp' | 'telegram' | 'email' | 'web';
export type MetodoPago = 'zelle' | 'pago_movil' | 'binance' | 'efectivo' | 'stripe' | 'paypal' | 'usdt';
export type CategoriaRifa = 'electronica' | 'vehiculos' | 'hogar' | 'dinero' | 'viajes' | 'joyas' | 'otros';

export interface Organizador {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  avatar?: string;
  verificacionKYC: boolean;
  plan: PlanOrganizador;
  rifasCreadas: number;
  rifasActivas: number;
  rifasExitosas: number;
  calificacion: number;
  descripcion?: string;
  redesSociales?: {
    instagram?: string;
    whatsapp?: string;
    telegram?: string;
  };
  creadoEn: Date;
}

export interface Premio {
  nombre: string;
  descripcion: string;
  valorEstimado: number;
  moneda: 'USD' | 'VES';
  imagenes: string[];
  especificaciones?: Record<string, string>;
}

export interface Voucher {
  id: string;
  estado: EstadoVoucher;
  comprobanteUrl: string;
  datosExtraidos?: {
    banco: string;
    monto: number;
    fecha: Date;
    referencia: string;
  };
  canal: CanalVoucher;
  creadoEn: Date;
}

export interface Comprador {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  cedula?: string;
}

export interface Ticket {
  id: string;
  numero: number;
  precio: number;
  moneda: 'USD' | 'VES';
  estado: EstadoTicket;
  comprador?: Comprador;
  fechaCompra?: Date;
  voucher?: Voucher;
  metodoPago?: MetodoPago;
}

export interface ConfiguracionRifa {
  metodosPago: MetodoPago[];
  tiempoEsperaPago: number; // minutos
  mostrarTicketsDisponibles: boolean;
  mostrarBarraProgreso: boolean;
  permitirVendedores: boolean;
  camposAdicionales?: CampoAdicional[];
  descuentos?: Descuento[];
  promociones?: Promocion[];
  terminosCondiciones?: string;
}

export interface CampoAdicional {
  id: string;
  nombre: string;
  tipo: 'texto' | 'numero' | 'email' | 'telefono' | 'cedula' | 'imagen';
  requerido: boolean;
  etiqueta: string;
}

export interface Descuento {
  id: string;
  cantidad: number; // tickets necesarios
  porcentaje: number;
  descripcion: string;
}

export interface Promocion {
  id: string;
  tipo: '2x1' | '3x2' | 'regalo';
  descripcion: string;
  activa: boolean;
}

export interface Vendedor {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  comision: number; // porcentaje
  ticketsVendidos: number;
  ganancias: number;
  ranking: number;
}

export interface Rifa {
  id: string;
  slug: string;
  nombre: string;
  descripcion: string;
  premio: Premio;
  organizador: Organizador;
  tickets: Ticket[];
  totalTickets: number;
  ticketsVendidos: number;
  precioTicket: number;
  moneda: 'USD' | 'VES';
  categoria: CategoriaRifa;
  configuracion: ConfiguracionRifa;
  estado: EstadoRifa;
  fechaInicio: Date;
  fechaSorteo: Date;
  vendedores?: Vendedor[];
  destacada: boolean;
  vistas: number;
  creadoEn: Date;
  actualizadoEn: Date;
}

export interface PlanSaas {
  id: string;
  nombre: string;
  icono: string;
  precio: number;
  moneda: 'USD';
  intervalo: 'mes' | 'año';
  rifasSimultaneas: number | 'ilimitado';
  ticketsPorRifa: number | 'ilimitado';
  caracteristicas: string[];
  destacado: boolean;
  color: string;
}

export interface FiltrosRifa {
  categoria?: CategoriaRifa;
  precioMin?: number;
  precioMax?: number;
  estado?: EstadoRifa;
  ordenarPor?: 'recientes' | 'precio_asc' | 'precio_desc' | 'populares' | 'proximos';
  busqueda?: string;
}
