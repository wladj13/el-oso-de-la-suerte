import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Link,
} from '@react-pdf/renderer';

/* ─────────────────────────────────────────────
   ESTILOS PDF
───────────────────────────────────────────── */
const colores = {
  brown: '#8B4513',
  gold: '#FFD700',
  green: '#228B22',
  dark: '#1A1008',
  gray: '#6B7280',
  grayLight: '#F5F0E8',
  grayBorder: '#E5E7EB',
  white: '#FFFFFF',
  blue: '#1D4ED8',
  red: '#DC2626',
  purple: '#7C3AED',
};

const s = StyleSheet.create({
  /* Página */
  page: {
    fontFamily: 'Helvetica',
    backgroundColor: colores.white,
    paddingTop: 50,
    paddingBottom: 60,
    paddingHorizontal: 50,
  },

  /* Portada */
  portadaPage: {
    fontFamily: 'Helvetica',
    backgroundColor: colores.dark,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  portadaContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60,
    width: '100%',
  },
  portadaOso: { fontSize: 80, marginBottom: 24, textAlign: 'center', color: colores.white },
  portadaTitulo: { fontSize: 38, fontFamily: 'Helvetica-Bold', color: colores.white, textAlign: 'center', marginBottom: 6 },
  portadaSubtitulo: { fontSize: 18, color: colores.gold, textAlign: 'center', marginBottom: 30, fontFamily: 'Helvetica-Bold' },
  portadaLinea: { width: 60, height: 3, backgroundColor: colores.gold, marginVertical: 20 },
  portadaDesc: { fontSize: 11, color: '#9CA3AF', textAlign: 'center', maxWidth: 360, lineHeight: 1.6 },
  portadaVersion: { fontSize: 9, color: '#6B7280', textAlign: 'center', marginTop: 40 },
  portadaBadgeRow: { flexDirection: 'row', gap: 12, marginTop: 28 },
  portadaBadge: { backgroundColor: '#FFFFFF10', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6 },
  portadaBadgeText: { fontSize: 9, color: '#D1D5DB', fontFamily: 'Helvetica-Bold' },

  /* Header de página */
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `1 solid ${colores.grayBorder}`,
    paddingBottom: 10,
    marginBottom: 24,
  },
  pageHeaderLogo: { fontSize: 9, color: colores.brown, fontFamily: 'Helvetica-Bold' },
  pageHeaderSeccion: { fontSize: 9, color: colores.gray },

  /* Footer de página */
  pageFooter: {
    position: 'absolute',
    bottom: 24,
    left: 50,
    right: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: `1 solid ${colores.grayBorder}`,
    paddingTop: 8,
  },
  pageFooterText: { fontSize: 8, color: '#9CA3AF' },
  pageNumber: { fontSize: 8, color: colores.brown, fontFamily: 'Helvetica-Bold' },

  /* Sección */
  seccionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colores.grayLight,
    borderRadius: 8,
    padding: 14,
    marginBottom: 18,
    marginTop: 8,
    borderLeft: `4 solid ${colores.brown}`,
  },
  seccionEmoji: { fontSize: 22, marginRight: 12 },
  seccionTitulo: { fontSize: 18, fontFamily: 'Helvetica-Bold', color: colores.dark },
  seccionDesc: { fontSize: 10, color: colores.gray, marginTop: 2 },

  /* Subsección */
  subSeccionTitulo: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: colores.dark,
    marginTop: 18,
    marginBottom: 8,
    paddingBottom: 5,
    borderBottom: `1 solid ${colores.grayBorder}`,
  },
  subSeccionAccent: {
    width: 3,
    height: 14,
    backgroundColor: colores.gold,
    marginRight: 8,
    borderRadius: 2,
  },
  subSeccionRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },

  /* Texto */
  parrafo: { fontSize: 10, color: '#374151', lineHeight: 1.7, marginBottom: 8 },
  negrita: { fontFamily: 'Helvetica-Bold' },

  /* Pasos */
  pasoContainer: { flexDirection: 'row', marginBottom: 12, alignItems: 'flex-start' },
  pasoNumero: {
    width: 24,
    height: 24,
    backgroundColor: colores.brown,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    flexShrink: 0,
    marginTop: 1,
  },
  pasoNumeroText: { fontSize: 10, color: colores.white, fontFamily: 'Helvetica-Bold' },
  pasoContenido: { flex: 1 },
  pasoTitulo: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: colores.dark, marginBottom: 2 },
  pasoDesc: { fontSize: 9, color: colores.gray, lineHeight: 1.5 },

  /* Alerta */
  alertaContainer: { borderRadius: 6, padding: 10, marginVertical: 8, flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  alertaInfo: { backgroundColor: '#EFF6FF', borderLeft: `3 solid #3B82F6` },
  alertaExito: { backgroundColor: '#F0FFF4', borderLeft: `3 solid ${colores.green}` },
  alertaAdvert: { backgroundColor: '#FFFBEB', borderLeft: `3 solid #F59E0B` },
  alertaError: { backgroundColor: '#FEF2F2', borderLeft: `3 solid ${colores.red}` },
  alertaTitulo: { fontSize: 9, fontFamily: 'Helvetica-Bold', marginBottom: 2 },
  alertaTexto: { fontSize: 9, lineHeight: 1.5 },

  /* Grid 2 columnas */
  grid2: { flexDirection: 'row', gap: 10, marginVertical: 8 },
  gridItem: { flex: 1, backgroundColor: colores.grayLight, borderRadius: 6, padding: 10 },
  gridEmoji: { fontSize: 16, marginBottom: 4 },
  gridTitulo: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: colores.dark, marginBottom: 2 },
  gridDesc: { fontSize: 8, color: colores.gray, lineHeight: 1.4 },

  /* Lista */
  listaItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 5 },
  listaBullet: { fontSize: 9, color: colores.green, fontFamily: 'Helvetica-Bold', marginRight: 6, marginTop: 1 },
  listaTexto: { fontSize: 9, color: '#374151', flex: 1, lineHeight: 1.5 },

  /* Tabla */
  tabla: { borderRadius: 6, overflow: 'hidden', marginVertical: 8, border: `1 solid ${colores.grayBorder}` },
  tablaHeader: { flexDirection: 'row', backgroundColor: colores.dark, padding: 8 },
  tablaHeaderCell: { flex: 1, fontSize: 8, fontFamily: 'Helvetica-Bold', color: colores.white },
  tablaFila: { flexDirection: 'row', borderBottom: `1 solid ${colores.grayBorder}`, paddingHorizontal: 8, paddingVertical: 6 },
  tablaFilaAlterna: { backgroundColor: colores.grayLight },
  tablaCell: { flex: 1, fontSize: 8, color: '#374151' },
  tablaCellDestacado: { flex: 1, fontSize: 8, color: colores.brown, fontFamily: 'Helvetica-Bold' },

  /* Box destacado */
  boxDestacado: {
    backgroundColor: '#FFF8E7',
    borderRadius: 6,
    padding: 12,
    marginVertical: 8,
    borderLeft: `3 solid ${colores.gold}`,
  },
  boxTitulo: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: colores.brown, marginBottom: 4 },
  boxTexto: { fontSize: 9, color: '#374151', lineHeight: 1.5 },

  /* Plan card */
  planCard: { flex: 1, borderRadius: 6, padding: 10, borderWidth: 1 },
  planEmoji: { fontSize: 20, marginBottom: 4 },
  planNombre: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: colores.dark },
  planPrecio: { fontSize: 16, fontFamily: 'Helvetica-Bold', color: colores.brown, marginVertical: 2 },
  planDesc: { fontSize: 8, color: colores.gray },

  /* Índice */
  indiceItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6, borderBottom: `1 solid ${colores.grayBorder}` },
  indiceNum: { fontSize: 10, color: colores.brown, fontFamily: 'Helvetica-Bold', width: 24 },
  indiceTexto: { fontSize: 10, color: colores.dark, flex: 1 },
  indicePagina: { fontSize: 10, color: colores.gray },
  indiceSubItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4, paddingLeft: 24 },
  indiceSubTexto: { fontSize: 9, color: colores.gray, flex: 1 },

  /* Separador */
  separador: { height: 1, backgroundColor: colores.grayBorder, marginVertical: 14 },

  /* CTA final */
  ctaBox: {
    backgroundColor: colores.dark,
    borderRadius: 8,
    padding: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  ctaOso: { fontSize: 30, marginBottom: 8, textAlign: 'center' },
  ctaTitulo: { fontSize: 16, fontFamily: 'Helvetica-Bold', color: colores.white, marginBottom: 6, textAlign: 'center' },
  ctaTexto: { fontSize: 9, color: '#9CA3AF', textAlign: 'center', marginBottom: 12 },
  ctaUrl: { fontSize: 10, color: colores.gold, fontFamily: 'Helvetica-Bold' },
});

/* ─────────────────────────────────────────────
   COMPONENTES REUTILIZABLES
───────────────────────────────────────────── */
const HeaderPagina = ({ seccion }: { seccion: string }) => (
  <View style={s.pageHeader} fixed>
    <Text style={s.pageHeaderLogo}>🐻 El Oso de la Suerte</Text>
    <Text style={s.pageHeaderSeccion}>{seccion}</Text>
  </View>
);

const FooterPagina = () => (
  <View style={s.pageFooter} fixed>
    <Text style={s.pageFooterText}>Manual de Usuario · v1.0 · Marzo 2025</Text>
    <Text style={s.pageNumber} render={({ pageNumber, totalPages }) => `Pág. ${pageNumber} / ${totalPages}`} />
  </View>
);

const Paso = ({ numero, titulo, desc }: { numero: number; titulo: string; desc: string }) => (
  <View style={s.pasoContainer}>
    <View style={s.pasoNumero}>
      <Text style={s.pasoNumeroText}>{numero}</Text>
    </View>
    <View style={s.pasoContenido}>
      <Text style={s.pasoTitulo}>{titulo}</Text>
      <Text style={s.pasoDesc}>{desc}</Text>
    </View>
  </View>
);

const Alerta = ({
  tipo,
  titulo,
  texto,
}: {
  tipo: 'info' | 'exito' | 'advertencia' | 'error';
  titulo: string;
  texto: string;
}) => {
  const estiloMap = {
    info: { container: [s.alertaContainer, s.alertaInfo], tituloColor: '#1D4ED8', textoColor: '#1E40AF', emoji: 'ℹ' },
    exito: { container: [s.alertaContainer, s.alertaExito], tituloColor: colores.green, textoColor: '#166534', emoji: '✓' },
    advertencia: { container: [s.alertaContainer, s.alertaAdvert], tituloColor: '#B45309', textoColor: '#92400E', emoji: '!' },
    error: { container: [s.alertaContainer, s.alertaError], tituloColor: colores.red, textoColor: '#991B1B', emoji: '✗' },
  };
  const e = estiloMap[tipo];
  return (
    <View style={e.container}>
      <Text style={{ fontSize: 10, color: e.tituloColor, fontFamily: 'Helvetica-Bold', marginRight: 4 }}>{e.emoji}</Text>
      <View style={{ flex: 1 }}>
        <Text style={[s.alertaTitulo, { color: e.tituloColor }]}>{titulo}</Text>
        <Text style={[s.alertaTexto, { color: e.textoColor }]}>{texto}</Text>
      </View>
    </View>
  );
};

const SubSeccion = ({ titulo }: { titulo: string }) => (
  <View style={s.subSeccionRow}>
    <View style={s.subSeccionAccent} />
    <Text style={s.subSeccionTitulo}>{titulo}</Text>
  </View>
);

const Lista = ({ items }: { items: string[] }) => (
  <View style={{ marginBottom: 8 }}>
    {items.map((item, i) => (
      <View key={i} style={s.listaItem}>
        <Text style={s.listaBullet}>✓</Text>
        <Text style={s.listaTexto}>{item}</Text>
      </View>
    ))}
  </View>
);

/* ─────────────────────────────────────────────
   DOCUMENTO PDF PRINCIPAL
───────────────────────────────────────────── */
export default function ManualPDF() {
  return (
    <Document
      title="Manual de Usuario — El Oso de la Suerte"
      author="El Oso de la Suerte"
      subject="Guía completa para participantes, organizadores y vendedores"
      keywords="rifas, Venezuela, manual, El Oso de la Suerte"
      creator="El Oso de la Suerte Platform"
    >
      {/* ══════════════════════════════
          PORTADA
      ══════════════════════════════ */}
      <Page size="A4" style={s.portadaPage}>
        <View style={s.portadaContent}>
          <Text style={s.portadaOso}>🐻</Text>
          <Text style={s.portadaTitulo}>El Oso de la Suerte</Text>
          <Text style={s.portadaSubtitulo}>Manual de Usuario</Text>
          <View style={s.portadaLinea} />
          <Text style={s.portadaDesc}>
            Guía completa oficial para participantes, organizadores y vendedores.
            Todo lo que necesitas saber para usar la plataforma de rifas más
            confiable de Venezuela.
          </Text>
          <View style={s.portadaBadgeRow}>
            {['📚 7 Secciones', '📄 35+ Temas', '🇻🇪 En Español'].map((b) => (
              <View key={b} style={s.portadaBadge}>
                <Text style={s.portadaBadgeText}>{b}</Text>
              </View>
            ))}
          </View>
          <Text style={s.portadaVersion}>
            Versión 1.0 · Marzo 2025 · elosodelasuerte.com
          </Text>
        </View>
      </Page>

      {/* ══════════════════════════════
          ÍNDICE
      ══════════════════════════════ */}
      <Page size="A4" style={s.page}>
        <HeaderPagina seccion="Índice de Contenidos" />

        <Text style={{ fontSize: 20, fontFamily: 'Helvetica-Bold', color: colores.dark, marginBottom: 20 }}>
          Índice de Contenidos
        </Text>

        {[
          { num: '1', titulo: 'Introducción', subs: ['¿Qué es El Oso de la Suerte?', '¿Cómo funciona?', '¿Por qué es confiable?'] },
          { num: '2', titulo: 'Para Participantes', subs: ['Crear cuenta', 'Explorar rifas', 'Comprar tickets', 'Métodos de pago', 'Enviar comprobante', 'Ver sorteo en vivo', 'Recibir premio'] },
          { num: '3', titulo: 'Para Organizadores', subs: ['Registro y verificación', 'Elegir plan', 'Crear una rifa', 'Configurar pagos', 'Gestionar vouchers', 'Dominio propio', 'Realizar sorteo', 'Dashboard'] },
          { num: '4', titulo: 'Para Vendedores', subs: ['Unirse a un equipo', 'Cómo vender tickets', 'Ver comisiones', 'Cobrar comisión'] },
          { num: '5', titulo: 'Pagos y Seguridad', subs: ['Pagar con Zelle', 'Pagar con Pago Móvil', 'Pagar con Binance', 'Seguridad de pagos'] },
          { num: '6', titulo: 'Preguntas Frecuentes', subs: ['FAQ Compradores', 'FAQ Organizadores', 'FAQ Sorteos'] },
          { num: '7', titulo: 'Soporte y Contacto', subs: ['Canales de soporte', 'Horarios de atención'] },
        ].map((sec) => (
          <View key={sec.num}>
            <View style={s.indiceItem}>
              <Text style={s.indiceNum}>{sec.num}.</Text>
              <Text style={[s.indiceTexto, { fontFamily: 'Helvetica-Bold' }]}>{sec.titulo}</Text>
            </View>
            {sec.subs.map((sub) => (
              <View key={sub} style={s.indiceSubItem}>
                <Text style={{ fontSize: 9, color: colores.gray, marginRight: 6 }}>›</Text>
                <Text style={s.indiceSubTexto}>{sub}</Text>
              </View>
            ))}
          </View>
        ))}

        <FooterPagina />
      </Page>

      {/* ══════════════════════════════
          1. INTRODUCCIÓN
      ══════════════════════════════ */}
      <Page size="A4" style={s.page}>
        <HeaderPagina seccion="1. Introducción" />

        <View style={s.seccionHeader}>
          <Text style={s.seccionEmoji}>🐻</Text>
          <View>
            <Text style={s.seccionTitulo}>1. Introducción</Text>
            <Text style={s.seccionDesc}>Bienvenido a la plataforma de rifas más confiable de Venezuela</Text>
          </View>
        </View>

        <SubSeccion titulo="1.1 ¿Qué es El Oso de la Suerte?" />
        <Text style={s.parrafo}>
          El Oso de la Suerte es la plataforma híbrida de rifas número 1 de Venezuela.
          Combinamos dos modelos en uno para ofrecer la mejor experiencia tanto a compradores
          como a organizadores.
        </Text>
        <View style={s.grid2}>
          <View style={[s.gridItem, { borderLeft: `3 solid ${colores.brown}` }]}>
            <Text style={s.gridEmoji}>🛒</Text>
            <Text style={s.gridTitulo}>Marketplace Público</Text>
            <Text style={s.gridDesc}>Catálogo público donde cualquier persona puede explorar y participar en rifas verificadas de organizadores de toda Venezuela.</Text>
          </View>
          <View style={[s.gridItem, { borderLeft: `3 solid ${colores.green}` }]}>
            <Text style={s.gridEmoji}>🎪</Text>
            <Text style={s.gridTitulo}>SAAS para Organizadores</Text>
            <Text style={s.gridDesc}>Herramientas profesionales para crear y gestionar tus propias rifas con tu dominio personalizado y marca propia.</Text>
          </View>
        </View>

        <SubSeccion titulo="1.2 ¿Cómo funciona?" />
        <Paso numero={1} titulo="El organizador crea la rifa" desc="Define el premio, precio por ticket, fecha del sorteo y métodos de pago. Todo en menos de 10 minutos." />
        <Paso numero={2} titulo="Los participantes compran tickets" desc="Desde el marketplace o el link directo de la rifa, eligen sus números y envían el comprobante de pago." />
        <Paso numero={3} titulo="El organizador aprueba los pagos" desc="Verifica el comprobante (manual o con OCR automático) y asigna los tickets al comprador." />
        <Paso numero={4} titulo="Se realiza el sorteo en vivo" desc="Transmisión por YouTube/Instagram Live. El algoritmo es público y verificable. Queda grabado." />
        <Paso numero={5} titulo="El ganador recibe su premio" desc="Se notifica al ganador, se emite el certificado digital y se coordina la entrega del premio." />

        <SubSeccion titulo="1.3 ¿Por qué es confiable?" />
        <Lista items={[
          'Organizadores verificados con cédula de identidad (KYC)',
          'Sorteos transmitidos en vivo y grabados permanentemente',
          'Algoritmo de sorteo de código abierto y auditable',
          'Backup triple de comprobantes por 5 años',
          'Verificación OCR de vouchers en menos de 60 segundos',
          'Soporte humano disponible 24/7 por WhatsApp',
        ]} />

        <FooterPagina />
      </Page>

      {/* ══════════════════════════════
          2. PARTICIPANTES
      ══════════════════════════════ */}
      <Page size="A4" style={s.page}>
        <HeaderPagina seccion="2. Para Participantes" />

        <View style={s.seccionHeader}>
          <Text style={s.seccionEmoji}>🎟️</Text>
          <View>
            <Text style={s.seccionTitulo}>2. Para Participantes</Text>
            <Text style={s.seccionDesc}>Guía completa para comprar tickets y ganar premios</Text>
          </View>
        </View>

        <SubSeccion titulo="2.1 Crear una cuenta" />
        <Paso numero={1} titulo="Ve a elosodelasuerte.com" desc="Haz clic en 'Entrar' en la esquina superior derecha." />
        <Paso numero={2} titulo="Selecciona 'Crear cuenta'" desc="Con tu email y contraseña, o continúa con Google." />
        <Paso numero={3} titulo="Completa tu perfil" desc="Nombre, WhatsApp y cédula (requerida en rifas con KYC)." />
        <Paso numero={4} titulo="Verifica tu correo" desc="Haz clic en el enlace de confirmación enviado a tu email." />
        <Alerta tipo="info" titulo="Cuenta sin registro" texto="En algunas rifas puedes participar solo con tu número de WhatsApp, sin crear cuenta." />

        <SubSeccion titulo="2.2 Comprar un ticket paso a paso" />
        <Paso numero={1} titulo="Selecciona la rifa" desc="Explora el catálogo y haz clic en la rifa que te interese." />
        <Paso numero={2} titulo="Elige tus números" desc="Selecciona números específicos en la grilla o usa el botón 'Número Aleatorio'." />
        <Paso numero={3} titulo="Define la cantidad" desc="Usa los botones + y - para ajustar cuántos tickets compras." />
        <Paso numero={4} titulo="Realiza el pago" desc="Sigue las instrucciones del método seleccionado. Guarda el comprobante." />
        <Paso numero={5} titulo="Envía el comprobante" desc="Súbelo en el formulario web o envíalo por WhatsApp al organizador." />
        <Paso numero={6} titulo="Espera la confirmación" desc="En menos de 60 segundos recibirás confirmación de tus tickets asignados." />

        <Alerta tipo="advertencia" titulo="Tiempo límite de pago" texto="Tienes entre 20 y 60 minutos para completar el pago. Después, los tickets vuelven a estar disponibles." />

        <FooterPagina />
      </Page>

      <Page size="A4" style={s.page}>
        <HeaderPagina seccion="2. Para Participantes" />

        <SubSeccion titulo="2.3 Métodos de pago disponibles" />
        <View style={s.grid2}>
          {[
            { emoji: '🏦', nombre: 'Zelle', pasos: ['Abre tu app bancaria de EE.UU.', 'Busca la sección Zelle', 'Ingresa email/teléfono del organizador', 'Envía el monto exacto y toma captura'] },
            { emoji: '📲', nombre: 'Pago Móvil', pasos: ['Abre la app de tu banco venezolano', 'Selecciona Pago Móvil Interbancario', 'Ingresa teléfono, cédula y banco destino', 'Ingresa el monto en Bs. y confirma'] },
          ].map((m) => (
            <View key={m.nombre} style={s.gridItem}>
              <Text style={s.gridEmoji}>{m.emoji}</Text>
              <Text style={s.gridTitulo}>{m.nombre}</Text>
              {m.pasos.map((p, i) => (
                <View key={i} style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 3 }}>
                  <Text style={{ fontSize: 8, color: colores.brown, fontFamily: 'Helvetica-Bold', marginRight: 4 }}>{i + 1}.</Text>
                  <Text style={{ fontSize: 8, color: colores.gray, flex: 1, lineHeight: 1.4 }}>{p}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
        <View style={s.grid2}>
          {[
            { emoji: '🟡', nombre: 'Binance Pay', pasos: ['Abre Binance > Pay > Enviar', 'Escanea el QR o ingresa el ID del organizador', 'Ingresa el monto en USDT', 'Confirma y guarda el comprobante'] },
            { emoji: '💵', nombre: 'Efectivo', pasos: ['Coordina lugar de pago con el organizador', 'Lleva el monto exacto', 'Recibe tu recibo físico', 'Envía foto del recibo al sistema'] },
          ].map((m) => (
            <View key={m.nombre} style={s.gridItem}>
              <Text style={s.gridEmoji}>{m.emoji}</Text>
              <Text style={s.gridTitulo}>{m.nombre}</Text>
              {m.pasos.map((p, i) => (
                <View key={i} style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 3 }}>
                  <Text style={{ fontSize: 8, color: colores.brown, fontFamily: 'Helvetica-Bold', marginRight: 4 }}>{i + 1}.</Text>
                  <Text style={{ fontSize: 8, color: colores.gray, flex: 1, lineHeight: 1.4 }}>{p}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        <SubSeccion titulo="2.4 Enviar el comprobante de pago" />
        <Text style={s.parrafo}>El comprobante (voucher) es la prueba de tu pago. Puedes enviarlo por 4 canales:</Text>
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 10 }}>
          {[
            { emoji: '💬', canal: 'WhatsApp', desc: 'Foto al número del organizador' },
            { emoji: '✈️', canal: 'Telegram', desc: '@ElOsoDeLaSuerteBot' },
            { emoji: '📧', canal: 'Email', desc: 'Al correo del organizador' },
            { emoji: '🌐', canal: 'Web', desc: 'Sube la foto directamente' },
          ].map((c) => (
            <View key={c.canal} style={[s.gridItem, { alignItems: 'center' }]}>
              <Text style={{ fontSize: 14, marginBottom: 3 }}>{c.emoji}</Text>
              <Text style={[s.gridTitulo, { textAlign: 'center' }]}>{c.canal}</Text>
              <Text style={[s.gridDesc, { textAlign: 'center' }]}>{c.desc}</Text>
            </View>
          ))}
        </View>
        <Alerta tipo="exito" titulo="Verificación automática" texto="Nuestro sistema OCR extrae los datos del comprobante automáticamente en menos de 60 segundos." />

        <SubSeccion titulo="2.5 Recibir el premio" />
        <Paso numero={1} titulo="Notificación al ganador" desc="El sistema notifica por WhatsApp, email y notificación push inmediatamente." />
        <Paso numero={2} titulo="Verificación de identidad" desc="Para premios mayores a $100, deberás verificar identidad con cédula y selfie." />
        <Paso numero={3} titulo="Coordinación de entrega" desc="El organizador te contacta en menos de 24 horas para coordinar la entrega." />
        <Paso numero={4} titulo="Certificado digital" desc="Recibirás un certificado oficial de El Oso de la Suerte como constancia." />

        <FooterPagina />
      </Page>

      {/* ══════════════════════════════
          3. ORGANIZADORES
      ══════════════════════════════ */}
      <Page size="A4" style={s.page}>
        <HeaderPagina seccion="3. Para Organizadores" />

        <View style={s.seccionHeader}>
          <Text style={s.seccionEmoji}>🎪</Text>
          <View>
            <Text style={s.seccionTitulo}>3. Para Organizadores</Text>
            <Text style={s.seccionDesc}>Crea y gestiona rifas profesionales en minutos</Text>
          </View>
        </View>

        <SubSeccion titulo="3.1 Registro y verificación" />
        <Paso numero={1} titulo="Crea tu cuenta en /crear-rifa" desc="Completa el formulario con nombre, email, WhatsApp y elige tu plan. 7 primeros días gratis." />
        <Paso numero={2} titulo="Completa la verificación básica" desc="Sube tu cédula y una selfie sosteniéndola. El proceso tarda menos de 30 minutos." />
        <Paso numero={3} titulo="Configura tus datos de pago" desc="Ingresa tus cuentas Zelle, Pago Móvil o Binance para recibir pagos." />
        <Paso numero={4} titulo="¡Empieza a crear rifas!" desc="Una vez verificado, puedes crear tu primera rifa inmediatamente." />

        <SubSeccion titulo="3.2 Planes disponibles" />
        <View style={{ ...s.grid2, marginBottom: 10 }}>
          {[
            { emoji: '🥉', nombre: 'Oso Bronce', precio: '$19/mes', rifas: '1 rifa activa', tickets: 'Hasta 100 tickets', color: '#CD7F32' },
            { emoji: '🥈', nombre: 'Oso Plata', precio: '$49/mes', rifas: '3 rifas simultáneas', tickets: 'Hasta 500 tickets', color: '#C0C0C0' },
            { emoji: '🥇', nombre: 'Oso Oro', precio: '$99/mes', rifas: 'Ilimitadas', tickets: 'Ilimitados', color: colores.gold },
          ].map((p) => (
            <View key={p.nombre} style={[s.planCard, { borderColor: p.color }]}>
              <Text style={s.planEmoji}>{p.emoji}</Text>
              <Text style={s.planNombre}>{p.nombre}</Text>
              <Text style={[s.planPrecio, { color: p.color }]}>{p.precio}</Text>
              <Text style={s.planDesc}>🎪 {p.rifas}</Text>
              <Text style={s.planDesc}>🎟️ {p.tickets}</Text>
            </View>
          ))}
        </View>

        <SubSeccion titulo="3.3 Crear una rifa paso a paso" />
        <Paso numero={1} titulo="Dashboard → Mis Rifas → Nueva Rifa" desc="Haz clic en el botón amarillo 'Nueva Rifa'." />
        <Paso numero={2} titulo="Información básica" desc="Nombre de la rifa, descripción del premio, precio por ticket y fecha del sorteo." />
        <Paso numero={3} titulo="Sube fotos del premio" desc="Entre 1 y 5 fotos de alta calidad. Las rifas con buenas fotos venden hasta 3x más." />
        <Paso numero={4} titulo="Define el total de tickets" desc="Considera: valor del premio ÷ precio del ticket = tickets mínimos para cubrir el costo." />
        <Paso numero={5} titulo="Configura métodos de pago" desc="Activa Zelle, Pago Móvil, Binance o efectivo e ingresa tus datos de cada uno." />
        <Paso numero={6} titulo="Opciones adicionales" desc="Descuentos por volumen, promociones 2x1, términos y condiciones, sistema de vendedores." />
        <Paso numero={7} titulo="¡Publica tu rifa!" desc="Revisa todo y haz clic en Publicar. Tu rifa aparece en el marketplace." />

        <Alerta tipo="exito" titulo="Tu link personalizado" texto="Cada rifa recibe un link único (rifas.elosodelasuerte.com/mi-rifa) para compartir en redes sociales." />

        <FooterPagina />
      </Page>

      <Page size="A4" style={s.page}>
        <HeaderPagina seccion="3. Para Organizadores" />

        <SubSeccion titulo="3.4 Gestionar vouchers (comprobantes)" />
        <View style={s.grid2}>
          <View style={[s.gridItem, { borderLeft: `3 solid #3B82F6` }]}>
            <Text style={[s.gridTitulo, { color: '#1D4ED8' }]}>⚡ OCR Automático (Plan Plata/Oro)</Text>
            <Text style={s.gridDesc}>El sistema lee el comprobante automáticamente y aprueba si los datos coinciden. Sin intervención manual en menos de 60 segundos.</Text>
          </View>
          <View style={[s.gridItem, { borderLeft: `3 solid ${colores.gray}` }]}>
            <Text style={s.gridTitulo}>👁️ Revisión Manual (Plan Bronce)</Text>
            <Text style={s.gridDesc}>Recibes notificación por WhatsApp cuando hay un voucher pendiente. Apruebas o rechazas desde el Dashboard.</Text>
          </View>
        </View>

        <SubSeccion titulo="3.5 Configurar dominio propio" />
        <Text style={s.parrafo}>Desde el Plan Plata puedes usar un dominio personalizado como www.minombrerifas.com.</Text>
        <Paso numero={1} titulo="Adquiere tu dominio" desc="Compra tu dominio en GoDaddy, Namecheap, etc. Cuesta ~$10-15/año." />
        <Paso numero={2} titulo="Dashboard → Configuración → Dominio" desc="Ingresa tu dominio y haz clic en 'Verificar DNS'." />
        <Paso numero={3} titulo="Configura los registros DNS" desc="El sistema muestra los registros CNAME que debes agregar en tu registrador." />
        <Paso numero={4} titulo="Espera la propagación" desc="Los cambios DNS tardan 15-60 minutos. SSL se instala automáticamente." />
        <View style={s.boxDestacado}>
          <Text style={s.boxTitulo}>Registro DNS requerido:</Text>
          <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: colores.green }}>CNAME  rifas  →  cname.elosodelasuerte.com</Text>
        </View>

        <SubSeccion titulo="3.6 Realizar el sorteo en vivo" />
        <Paso numero={1} titulo="Configura el stream (1 hora antes)" desc="Prepara tu transmisión en YouTube Studio o Instagram y vincula el link al Dashboard." />
        <Paso numero={2} titulo="Cierra la venta de tickets" desc="Cambia el estado de la rifa a 'Cerrando ventas' desde el Dashboard." />
        <Paso numero={3} titulo="Inicia el stream en vivo" desc="Comienza la transmisión. Muestra la lista de tickets vendidos en pantalla." />
        <Paso numero={4} titulo="Ejecuta el sorteo" desc="En el Dashboard, haz clic en 'Iniciar Sorteo'. El número se genera en tiempo real." />
        <Paso numero={5} titulo="Anuncia al ganador" desc="El sistema muestra el nombre del ganador. Anúncialo en el stream." />
        <Paso numero={6} titulo="Notifica y entrega" desc="El sistema notifica automáticamente al ganador. Coordina entrega en máx. 7 días." />

        <Alerta tipo="exito" titulo="Grabación automática" texto="Si conectas tu stream a la plataforma, el video del sorteo se guarda automáticamente y queda vinculado a la rifa." />

        <FooterPagina />
      </Page>

      {/* ══════════════════════════════
          4. VENDEDORES
      ══════════════════════════════ */}
      <Page size="A4" style={s.page}>
        <HeaderPagina seccion="4. Para Vendedores" />

        <View style={s.seccionHeader}>
          <Text style={s.seccionEmoji}>🏆</Text>
          <View>
            <Text style={s.seccionTitulo}>4. Para Vendedores</Text>
            <Text style={s.seccionDesc}>Gana comisiones vendiendo tickets de rifas</Text>
          </View>
        </View>

        <SubSeccion titulo="4.1 Modalidades de vendedor" />
        <View style={s.grid2}>
          <View style={[s.gridItem, { borderLeft: `3 solid #3B82F6` }]}>
            <Text style={[s.gridTitulo, { color: '#1D4ED8' }]}>👤 Con cuenta propia</Text>
            <Text style={s.gridDesc}>El organizador te invita. Creas una cuenta gratuita y accedes a tu dashboard personal con estadísticas en tiempo real y link de venta propio.</Text>
          </View>
          <View style={[s.gridItem, { borderLeft: `3 solid ${colores.gray}` }]}>
            <Text style={s.gridTitulo}>📱 Sin cuenta</Text>
            <Text style={s.gridDesc}>Trabajas con tu número de WhatsApp. El organizador gestiona tus ventas. Ideal para vendedores ocasionales.</Text>
          </View>
        </View>

        <SubSeccion titulo="4.2 Cómo vender tickets" />
        <Paso numero={1} titulo="Recibe tu link de vendedor" desc="El organizador te enviará un link único. Todas las ventas a través de ese link se registran a tu nombre." />
        <Paso numero={2} titulo="Comparte en tus redes" desc="Publica en Instagram, WhatsApp, grupos de Telegram. Añade fotos del premio para mayor impacto." />
        <Paso numero={3} titulo="Atiende a tus compradores" desc="Guíalos durante el proceso: elegir números, hacer el pago y enviar el comprobante." />
        <Paso numero={4} titulo="Registra la venta" desc="Si tienes cuenta, registra ventas manuales desde tu dashboard." />

        <SubSeccion titulo="4.3 Cálculo de comisiones" />
        <View style={s.boxDestacado}>
          <Text style={s.boxTitulo}>Ejemplo de cálculo:</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
            {[
              { label: 'Precio ticket', valor: '$5' },
              { label: 'Tickets vendidos', valor: '20' },
              { label: 'Total generado', valor: '$100' },
              { label: 'Tu comisión (10%)', valor: '$10' },
            ].map((c) => (
              <View key={c.label} style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 14, fontFamily: 'Helvetica-Bold', color: colores.brown }}>{c.valor}</Text>
                <Text style={{ fontSize: 8, color: colores.gray }}>{c.label}</Text>
              </View>
            ))}
          </View>
        </View>
        <Text style={s.parrafo}>El organizador define el porcentaje de comisión (típicamente entre 5% y 20%). Las comisiones se pagan semanalmente cada lunes.</Text>

        <SubSeccion titulo="4.4 Cobrar tu comisión" />
        <Paso numero={1} titulo="El sistema calcula automáticamente" desc="Cada lunes el sistema genera el resumen de ventas y calcula el total de comisión." />
        <Paso numero={2} titulo="El organizador aprueba el pago" desc="Desde Dashboard → Vendedores → Pagar comisiones." />
        <Paso numero={3} titulo="Recibes tu pago" desc="Por el método acordado: Zelle, Pago Móvil, Binance o efectivo." />
        <Alerta tipo="advertencia" titulo="Acuerda las condiciones antes de empezar" texto="Confirma con el organizador: porcentaje de comisión, método de pago y frecuencia de pago." />

        <FooterPagina />
      </Page>

      {/* ══════════════════════════════
          5. PAGOS Y SEGURIDAD
      ══════════════════════════════ */}
      <Page size="A4" style={s.page}>
        <HeaderPagina seccion="5. Pagos y Seguridad" />

        <View style={s.seccionHeader}>
          <Text style={s.seccionEmoji}>💳</Text>
          <View>
            <Text style={s.seccionTitulo}>5. Pagos y Seguridad</Text>
            <Text style={s.seccionDesc}>Todo sobre métodos de pago y protección de tu dinero</Text>
          </View>
        </View>

        <SubSeccion titulo="5.1 Pagar con Zelle" />
        <Text style={s.parrafo}>Zelle es el método más popular en Venezuela para pagos en dólares. Funciona a través de bancos de EE.UU.</Text>
        <Paso numero={1} titulo="Abre tu app bancaria (banco de EE.UU.)" desc="Chase, Bank of America, Wells Fargo, etc." />
        <Paso numero={2} titulo="Busca la sección Zelle" desc="Generalmente en 'Transferencias' o 'Pagos'." />
        <Paso numero={3} titulo="Ingresa el email o teléfono del organizador" desc="El organizador te lo mostrará en la página de la rifa." />
        <Paso numero={4} titulo="Ingresa el monto exacto" desc="Igual al precio del ticket (o múltiplo si compras varios)." />
        <Paso numero={5} titulo="Confirma y toma captura" desc="El comprobante debe mostrar: monto, destinatario, fecha y referencia." />

        <SubSeccion titulo="5.2 Pagar con Pago Móvil" />
        <Paso numero={1} titulo="Abre la app de tu banco venezolano" desc="Banesco, Mercantil, Venezuela, Provincial, etc." />
        <Paso numero={2} titulo="Selecciona Pago Móvil Interbancario" desc="O 'Transferencia Pago Móvil' según tu banco." />
        <Paso numero={3} titulo="Ingresa los datos del organizador" desc="Teléfono, cédula de identidad y banco destino." />
        <Paso numero={4} titulo="Ingresa el monto en Bolívares" desc="Convierte el precio USD al tipo de cambio del día." />
        <Paso numero={5} titulo="Confirma y guarda el comprobante" desc="El banco genera un número de referencia. Guarda la captura." />
        <Alerta tipo="info" titulo="Tipo de cambio" texto="El organizador indica si acepta tasa BCV, tasa paralela o una tasa fija. Siempre confirma antes de transferir." />

        <SubSeccion titulo="5.3 Reglas de seguridad" />
        <Lista items={[
          'Siempre verifica que el organizador tenga el badge de verificado (escudo azul)',
          'Conserva la captura de pantalla de tu pago por al menos 30 días',
          'Respeta el tiempo límite de pago indicado en la rifa',
          'No realices pagos a cuentas que no aparezcan en la plataforma oficial',
          'Si algo parece sospechoso, contacta al soporte ANTES de pagar',
          'Después de pagar, confirma por WhatsApp que el organizador recibió el comprobante',
        ]} />

        <FooterPagina />
      </Page>

      {/* ══════════════════════════════
          6. FAQ
      ══════════════════════════════ */}
      <Page size="A4" style={s.page}>
        <HeaderPagina seccion="6. Preguntas Frecuentes" />

        <View style={s.seccionHeader}>
          <Text style={s.seccionEmoji}>❓</Text>
          <View>
            <Text style={s.seccionTitulo}>6. Preguntas Frecuentes</Text>
            <Text style={s.seccionDesc}>Respuestas a las dudas más comunes</Text>
          </View>
        </View>

        <SubSeccion titulo="6.1 FAQ para Compradores" />
        {[
          { p: '¿Cómo sé que el sorteo es legítimo?', r: 'Todos los sorteos se realizan en vivo por YouTube o Instagram, quedan grabados y el algoritmo es de código abierto. Los organizadores son verificados con cédula.' },
          { p: '¿Qué pasa si el organizador no entrega el premio?', r: 'El Oso de la Suerte interviene directamente. Todos los organizadores firman un contrato de responsabilidad y pueden ser inhabilitados de la plataforma.' },
          { p: '¿Puedo devolver un ticket?', r: 'Los tickets no son reembolsables una vez confirmados. Si el organizador cancela la rifa, tienes derecho al reembolso total.' },
          { p: '¿Qué hago si no recibo confirmación de mis tickets?', r: 'Contacta al soporte por WhatsApp (+58 412-000-0000). Ten a mano el número de referencia de tu pago. Respondemos en menos de 30 minutos.' },
          { p: '¿Puedo participar desde el exterior?', r: 'Sí, desde cualquier país. Los premios físicos se entregan en Venezuela; los premios en efectivo se pueden enviar vía Zelle o Binance.' },
        ].map((q, i) => (
          <View key={i} style={{ marginBottom: 8, backgroundColor: '#F9FAFB', borderRadius: 6, padding: 10, borderLeft: `3 solid ${colores.red}` }}>
            <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: colores.dark, marginBottom: 3 }}>P: {q.p}</Text>
            <Text style={{ fontSize: 9, color: '#374151', lineHeight: 1.5 }}>R: {q.r}</Text>
          </View>
        ))}

        <SubSeccion titulo="6.2 FAQ para Organizadores" />
        {[
          { p: '¿Cuánto cobra El Oso de la Suerte por cada venta?', r: 'Para rifas en el marketplace: 5-8% del total. Con plan SAAS activo: 2-3%. El precio del plan ya incluye herramientas ilimitadas.' },
          { p: '¿Puedo cancelar mi plan cuando quiera?', r: 'Sí, sin penalizaciones. Tu plan seguirá activo hasta el final del período pagado.' },
          { p: '¿Cómo evito el fraude con comprobantes falsos?', r: 'Nuestro OCR verifica automáticamente los comprobantes. Para mayor seguridad, activa la verificación KYC para tickets mayores a $50.' },
        ].map((q, i) => (
          <View key={i} style={{ marginBottom: 8, backgroundColor: '#F9FAFB', borderRadius: 6, padding: 10, borderLeft: `3 solid ${colores.red}` }}>
            <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: colores.dark, marginBottom: 3 }}>P: {q.p}</Text>
            <Text style={{ fontSize: 9, color: '#374151', lineHeight: 1.5 }}>R: {q.r}</Text>
          </View>
        ))}

        <FooterPagina />
      </Page>

      {/* ══════════════════════════════
          7. SOPORTE
      ══════════════════════════════ */}
      <Page size="A4" style={s.page}>
        <HeaderPagina seccion="7. Soporte" />

        <View style={s.seccionHeader}>
          <Text style={s.seccionEmoji}>🛟</Text>
          <View>
            <Text style={s.seccionTitulo}>7. Soporte y Contacto</Text>
            <Text style={s.seccionDesc}>Estamos aquí para ayudarte en todo momento</Text>
          </View>
        </View>

        <SubSeccion titulo="7.1 Canales de soporte" />
        <View style={s.tabla}>
          <View style={s.tablaHeader}>
            <Text style={[s.tablaHeaderCell, { flex: 0.8 }]}>Canal</Text>
            <Text style={s.tablaHeaderCell}>Contacto</Text>
            <Text style={s.tablaHeaderCell}>Tiempo de respuesta</Text>
            <Text style={[s.tablaHeaderCell, { flex: 0.8 }]}>Disponibilidad</Text>
          </View>
          {[
            ['💬 WhatsApp', '+58 412-000-0000', 'Menos de 30 min', '24/7'],
            ['✈️ Telegram', '@ElOsoDeLaSuerteBot', 'Bot instantáneo + humano', '24/7'],
            ['📧 Email', 'soporte@elosodelasuerte.com', 'Menos de 4 horas', 'Lun-Vie'],
            ['📹 Video (Oro)', 'Agendado vía dashboard', 'Programado', 'Plan Oro'],
          ].map((row, i) => (
            <View key={i} style={i % 2 === 1 ? [s.tablaFila, s.tablaFilaAlterna] : s.tablaFila}>
              <Text style={[s.tablaCell, { flex: 0.8, fontFamily: 'Helvetica-Bold' }]}>{row[0]}</Text>
              <Text style={s.tablaCell}>{row[1]}</Text>
              <Text style={s.tablaCell}>{row[2]}</Text>
              <Text style={[s.tablaCellDestacado, { flex: 0.8 }]}>{row[3]}</Text>
            </View>
          ))}
        </View>

        <SubSeccion titulo="7.2 Recursos adicionales" />
        <Lista items={[
          'Centro de ayuda en línea: elosodelasuerte.com/soporte',
          'Videos tutoriales en YouTube: youtube.com/ElOsoDeLaSuerte',
          'Comunidad en Telegram: t.me/ElOsoComunidad',
          'Blog oficial con tips y novedades: elosodelasuerte.com/blog',
          'Manual en línea (siempre actualizado): elosodelasuerte.com/manual',
        ]} />

        <SubSeccion titulo="7.3 Reportar un problema" />
        <Text style={s.parrafo}>
          Si encuentras algún comportamiento sospechoso, un organizador que no cumple sus compromisos,
          o un error técnico, repórtalo inmediatamente al soporte con la siguiente información:
        </Text>
        <Lista items={[
          'ID o nombre de la rifa afectada',
          'Número de referencia de tu pago (si aplica)',
          'Capturas de pantalla del problema',
          'Descripción detallada de lo ocurrido',
          'Tu número de WhatsApp para el seguimiento',
        ]} />

        <Alerta tipo="advertencia" titulo="Tiempo de respuesta para emergencias" texto="Para situaciones urgentes (sorteo en curso con problemas, pago no confirmado a horas del sorteo), llama directamente al WhatsApp de soporte. Respondemos en menos de 10 minutos." />

        {/* CTA Final */}
        <View style={s.ctaBox}>
          <Text style={s.ctaOso}>🐻</Text>
          <Text style={s.ctaTitulo}>¡Listo para empezar!</Text>
          <Text style={s.ctaTexto}>
            Ya tienes todo el conocimiento. Únete a más de 124 organizadores verificados
            y 48,000+ participantes activos en la plataforma.
          </Text>
          <Link src="https://elosodelasuerte.com" style={s.ctaUrl}>
            elosodelasuerte.com
          </Link>
        </View>

        <FooterPagina />
      </Page>
    </Document>
  );
}

