-- ============================================================
-- EL OSO DE LA SUERTE — Setup inicial de base de datos
-- Ejecutar en: Supabase → SQL Editor
-- ============================================================

-- ENUMS
CREATE TYPE rol AS ENUM ('comprador', 'organizador', 'vendedor', 'admin');
CREATE TYPE plan_org AS ENUM ('bronce', 'plata', 'oro');
CREATE TYPE estado_rifa AS ENUM ('borrador', 'activa', 'pausada', 'finalizada', 'cancelada');
CREATE TYPE estado_ticket AS ENUM ('disponible', 'reservado', 'pagado', 'ganador');
CREATE TYPE estado_voucher AS ENUM ('pendiente', 'aprobado', 'rechazado');
CREATE TYPE estado_suscripcion AS ENUM ('activa', 'cancelada', 'vencida');

-- PROFILES (extiende auth.users de Supabase)
CREATE TABLE profiles (
  id          UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  nombre      TEXT,
  email       TEXT UNIQUE NOT NULL,
  whatsapp    TEXT,
  rol         rol DEFAULT 'comprador',
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ORGANIZADORES
CREATE TABLE organizadores (
  id                    UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id               UUID UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  nombre_negocio        TEXT NOT NULL,
  slug                  TEXT UNIQUE NOT NULL,
  descripcion           TEXT,
  logo_url              TEXT,
  plan                  plan_org DEFAULT 'bronce',
  plan_vence_en         TIMESTAMPTZ,
  kyc_verificado        BOOLEAN DEFAULT FALSE,
  whatsapp              TEXT,
  instagram             TEXT,
  dominio_personalizado TEXT,
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

-- RIFAS
CREATE TABLE rifas (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organizador_id   UUID REFERENCES organizadores(id) ON DELETE CASCADE,
  titulo           TEXT NOT NULL,
  descripcion      TEXT,
  imagen_url       TEXT,
  precio_ticket    DECIMAL(10,2) NOT NULL,
  total_tickets    INTEGER NOT NULL,
  tickets_vendidos INTEGER DEFAULT 0,
  fecha_sorteo     TIMESTAMPTZ,
  estado           estado_rifa DEFAULT 'borrador',
  categoria        TEXT,
  slug             TEXT UNIQUE NOT NULL,
  metodos_pago     TEXT[] DEFAULT '{}',
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- PREMIOS
CREATE TABLE premios (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  rifa_id     UUID REFERENCES rifas(id) ON DELETE CASCADE,
  posicion    INTEGER NOT NULL,
  descripcion TEXT NOT NULL,
  imagen_url  TEXT
);

-- TICKETS
CREATE TABLE tickets (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  rifa_id      UUID REFERENCES rifas(id) ON DELETE CASCADE,
  numero       INTEGER NOT NULL,
  comprador_id UUID REFERENCES profiles(id),
  vendedor_id  UUID REFERENCES profiles(id),
  estado       estado_ticket DEFAULT 'disponible',
  monto_pagado DECIMAL(10,2),
  metodo_pago  TEXT,
  voucher_url  TEXT,
  comprado_en  TIMESTAMPTZ,
  UNIQUE(rifa_id, numero)
);

-- VOUCHERS
CREATE TABLE vouchers (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id    UUID REFERENCES tickets(id) ON DELETE CASCADE,
  comprador_id UUID REFERENCES profiles(id),
  rifa_id      UUID REFERENCES rifas(id),
  imagen_url   TEXT,
  monto        DECIMAL(10,2) NOT NULL,
  metodo_pago  TEXT NOT NULL,
  referencia   TEXT,
  estado       estado_voucher DEFAULT 'pendiente',
  nota_rechazo TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- VENDEDORES
CREATE TABLE vendedores (
  id                   UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organizador_id       UUID REFERENCES organizadores(id) ON DELETE CASCADE,
  user_id              UUID UNIQUE REFERENCES profiles(id),
  nombre               TEXT NOT NULL,
  whatsapp             TEXT,
  comision_porcentaje  DECIMAL(5,2) DEFAULT 10,
  activo               BOOLEAN DEFAULT TRUE,
  created_at           TIMESTAMPTZ DEFAULT NOW()
);

-- SUSCRIPCIONES
CREATE TABLE suscripciones (
  id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organizador_id UUID REFERENCES organizadores(id) ON DELETE CASCADE,
  plan           plan_org NOT NULL,
  precio         DECIMAL(10,2) NOT NULL,
  estado         estado_suscripcion DEFAULT 'activa',
  inicio         TIMESTAMPTZ NOT NULL,
  fin            TIMESTAMPTZ NOT NULL,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TRIGGER: crear profile automáticamente al registrarse
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, nombre, whatsapp, rol)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'nombre', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'whatsapp',
    COALESCE((NEW.raw_user_meta_data->>'rol')::rol, 'comprador')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizadores ENABLE ROW LEVEL SECURITY;
ALTER TABLE rifas ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE vouchers ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendedores ENABLE ROW LEVEL SECURITY;
ALTER TABLE suscripciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE premios ENABLE ROW LEVEL SECURITY;

-- Profiles: cada usuario ve y edita solo su perfil
CREATE POLICY "perfil_propio" ON profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "perfil_publico_lectura" ON profiles FOR SELECT USING (true);

-- Rifas: lectura pública de rifas activas
CREATE POLICY "rifas_publicas" ON rifas FOR SELECT USING (estado = 'activa');
CREATE POLICY "rifas_organizador" ON rifas FOR ALL USING (
  organizador_id IN (SELECT id FROM organizadores WHERE user_id = auth.uid())
);

-- Premios: lectura pública
CREATE POLICY "premios_publicos" ON premios FOR SELECT USING (true);
CREATE POLICY "premios_organizador" ON premios FOR ALL USING (
  rifa_id IN (SELECT r.id FROM rifas r JOIN organizadores o ON r.organizador_id = o.id WHERE o.user_id = auth.uid())
);

-- Organizadores: lectura pública, escritura propia
CREATE POLICY "organizadores_publico" ON organizadores FOR SELECT USING (true);
CREATE POLICY "organizadores_propio" ON organizadores FOR ALL USING (user_id = auth.uid());

-- Tickets: el comprador ve sus tickets; organizador ve todos los de sus rifas
CREATE POLICY "tickets_comprador" ON tickets FOR SELECT USING (comprador_id = auth.uid());
CREATE POLICY "tickets_organizador" ON tickets FOR ALL USING (
  rifa_id IN (SELECT r.id FROM rifas r JOIN organizadores o ON r.organizador_id = o.id WHERE o.user_id = auth.uid())
);
CREATE POLICY "tickets_publicos_disponibles" ON tickets FOR SELECT USING (estado = 'disponible');

-- Vouchers: el comprador ve los suyos; organizador los gestiona
CREATE POLICY "vouchers_comprador" ON vouchers FOR ALL USING (comprador_id = auth.uid());
CREATE POLICY "vouchers_organizador" ON vouchers FOR ALL USING (
  rifa_id IN (SELECT r.id FROM rifas r JOIN organizadores o ON r.organizador_id = o.id WHERE o.user_id = auth.uid())
);

-- Vendedores: organizador gestiona su equipo
CREATE POLICY "vendedores_organizador" ON vendedores FOR ALL USING (
  organizador_id IN (SELECT id FROM organizadores WHERE user_id = auth.uid())
);

-- Suscripciones: solo el organizador ve las suyas
CREATE POLICY "suscripciones_organizador" ON suscripciones FOR SELECT USING (
  organizador_id IN (SELECT id FROM organizadores WHERE user_id = auth.uid())
);

-- ============================================================
-- STORAGE BUCKETS para imágenes
-- ============================================================
INSERT INTO storage.buckets (id, name, public) VALUES ('rifas', 'rifas', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('vouchers', 'vouchers', false);
INSERT INTO storage.buckets (id, name, public) VALUES ('avatares', 'avatares', true);

CREATE POLICY "rifas_publico" ON storage.objects FOR SELECT USING (bucket_id = 'rifas');
CREATE POLICY "rifas_subir" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'rifas' AND auth.role() = 'authenticated');
CREATE POLICY "vouchers_propio" ON storage.objects FOR ALL USING (bucket_id = 'vouchers' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "avatares_publico" ON storage.objects FOR SELECT USING (bucket_id = 'avatares');
CREATE POLICY "avatares_subir" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatares' AND auth.role() = 'authenticated');
