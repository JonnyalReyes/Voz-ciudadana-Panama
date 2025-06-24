# 🇵🇦 Habla Panamá - Plataforma de Participación Ciudadana

Una plataforma digital moderna para facilitar la participación ciudadana verificada en las problemáticas nacionales de Panamá. Desarrollada con Next.js 14, React y Tailwind CSS.

![Habla Panamá](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Habla+Panam%C3%A1)

## 🌟 Características Principales

### 🔐 Sistema de Verificación Ciudadana
- **Registro con verificación de antecedentes**: Los usuarios deben completar un proceso de verificación que incluye la revisión de antecedentes penales
- **Documentación requerida**: Cédula, dirección, documento de antecedentes penales en PDF
- **Proceso de evaluación**: Los administradores revisan y aprueban/rechazan solicitudes
- **Participación responsable**: Solo usuarios verificados pueden participar en encuestas y foros

### 📊 Gestión de Problemáticas Nacionales
- **Problemáticas dinámicas**: Los administradores pueden crear, editar y eliminar problemáticas
- **Contenido estructurado**: Información detallada con antecedentes, datos clave y voces ciudadanas
- **Categorización**: Organización por temas (Salud, Educación, Seguridad Social, etc.)
- **Estado de participación**: Control de fases (información, recolección, análisis, resultados)

### 🗳️ Sistema de Encuestas Dinámicas
- **Constructor de encuestas**: Herramienta para crear encuestas personalizadas
- **Tipos de preguntas variados**: Texto, selección múltiple, escalas, calificaciones
- **Configuración flexible**: Preguntas obligatorias/opcionales, opciones personalizables
- **Resultados configurables**: Los administradores deciden si mostrar resultados públicamente

### 💬 Foros de Discusión Moderados
- **Comentarios estructurados**: Sistema de comentarios y respuestas
- **Moderación activa**: Herramientas para mantener discusiones constructivas
- **Propuestas ciudadanas**: Marcado especial para propuestas de soluciones
- **Sistema de valoración**: Los usuarios pueden apoyar comentarios y propuestas

### 👨‍💼 Panel de Administración Completo
- **Gestión de problemáticas**: CRUD completo para problemáticas nacionales
- **Revisión de solicitudes**: Aprobar, rechazar o solicitar modificaciones a usuarios
- **Constructor de encuestas**: Interfaz drag-and-drop para crear encuestas
- **Configuración del sistema**: Ajustes generales de la plataforma
- **Notificaciones automáticas**: Sistema de emails para comunicar decisiones

## 🚀 Tecnologías Utilizadas

### Frontend
- **Next.js 14** - Framework de React con App Router
- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Tailwind CSS** - Framework de CSS utilitario
- **shadcn/ui** - Componentes de UI modernos y accesibles

### Herramientas de Desarrollo
- **ESLint** - Linter para código JavaScript/TypeScript
- **Prettier** - Formateador de código
- **Lucide React** - Iconos SVG optimizados

### Características Técnicas
- **Responsive Design** - Adaptable a todos los dispositivos
- **Dark/Light Mode** - Tema claro y oscuro
- **Accesibilidad** - Cumple con estándares WCAG
- **SEO Optimizado** - Meta tags y estructura semántica
- **Performance** - Optimización de imágenes y carga

## 📁 Estructura del Proyecto

\`\`\`
habla-panama/
├── app/                          # App Router de Next.js
│   ├── admin/                    # Panel de administración
│   ├── problematicas/            # Páginas de problemáticas
│   ├── registro/                 # Registro y verificación
│   ├── layout.tsx               # Layout principal
│   ├── page.tsx                 # Página de inicio
│   └── globals.css              # Estilos globales
├── components/                   # Componentes reutilizables
│   ├── ui/                      # Componentes base de shadcn/ui
│   ├── admin-*.tsx              # Componentes del panel admin
│   ├── header.tsx               # Navegación principal
│   ├── footer.tsx               # Pie de página
│   └── *.tsx                    # Otros componentes
├── hooks/                       # Custom hooks de React
├── lib/                         # Utilidades y configuración
├── public/                      # Archivos estáticos
└── README.md                    # Este archivo
\`\`\`

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js 18.0 o superior
- npm, yarn, pnpm o bun

### Instalación

1. **Clonar el repositorio**
\`\`\`bash
git clone https://github.com/tu-usuario/habla-panama.git
cd habla-panama
\`\`\`

2. **Instalar dependencias**
\`\`\`bash
npm install
# o
yarn install
# o
pnpm install
\`\`\`

3. **Configurar variables de entorno**
\`\`\`bash
cp .env.example .env.local
\`\`\`

Edita `.env.local` con tus configuraciones:
\`\`\`env
# Configuración de la aplicación
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Habla Panamá"

# Configuración de email (para notificaciones)
EMAIL_FROM=noreply@hablapanama.pa
EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_USER=tu-email@gmail.com
EMAIL_SMTP_PASSWORD=tu-password

# Configuración de almacenamiento de archivos
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880  # 5MB
\`\`\`

4. **Ejecutar en modo desarrollo**
\`\`\`bash
npm run dev
# o
yarn dev
# o
pnpm dev
\`\`\`

5. **Abrir en el navegador**
Visita [http://localhost:3000](http://localhost:3000)

## 📖 Guía de Uso

### Para Ciudadanos

1. **Registro y Verificación**
   - Completa el formulario de registro con información personal
   - Sube tu documento de antecedentes penales (PDF)
   - Espera la verificación del administrador (3-5 días hábiles)

2. **Participación en Problemáticas**
   - Explora las problemáticas nacionales disponibles
   - Lee la información contextualizada
   - Completa las encuestas de opinión
   - Participa en los foros de discusión

3. **Propuestas Ciudadanas**
   - Marca tus comentarios como "propuestas"
   - Apoya propuestas de otros ciudadanos
   - Contribuye con soluciones constructivas

### Para Administradores

1. **Acceso al Panel**
   - Inicia sesión con credenciales de administrador
   - Accede a `/admin` o usa el enlace en el menú

2. **Gestión de Problemáticas**
   - Crea nuevas problemáticas con el formulario detallado
   - Configura encuestas dinámicas con diferentes tipos de preguntas
   - Establece si se muestran resultados públicamente
   - Habilita/deshabilita foros de discusión

3. **Revisión de Solicitudes**
   - Revisa documentación de nuevos usuarios
   - Aprueba, rechaza o solicita modificaciones
   - Envía notificaciones automáticas por email

## 🎨 Personalización

### Colores y Tema
El proyecto usa un sistema de colores configurado en `tailwind.config.ts`:
- **Primario**: Azul (`hsl(220, 90%, 56%)`)
- **Secundario**: Configurado en el sistema de design tokens
- **Modo oscuro**: Soporte completo con `next-themes`

### Componentes UI
Basado en shadcn/ui, puedes personalizar:
- Colores en `app/globals.css`
- Componentes en `components/ui/`
- Configuración en `tailwind.config.ts`

## 🚀 Despliegue

### Vercel (Recomendado)
1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Despliega automáticamente

### Otros Proveedores
\`\`\`bash
# Construir para producción
npm run build

# Iniciar servidor de producción
npm start
\`\`\`

## 🔧 Scripts Disponibles

\`\`\`bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Construir para producción
npm run start        # Servidor de producción
npm run lint         # Ejecutar ESLint
npm run lint:fix     # Corregir errores de ESLint automáticamente
\`\`\`

## 📝 Estado del Proyecto

### ✅ Funcionalidades Implementadas
- [x] Sistema de registro con verificación
- [x] Panel de administración completo
- [x] Constructor de encuestas dinámicas
- [x] Gestión de problemáticas
- [x] Foros de discusión
- [x] Sistema de notificaciones (simulado)
- [x] Interfaz responsive
- [x] Modo oscuro/claro

### 🚧 Funcionalidades Pendientes
- [ ] Integración con base de datos
- [ ] Sistema de autenticación real
- [ ] Envío de emails automáticos
- [ ] Subida real de archivos
- [ ] Sistema de notificaciones push
- [ ] Analytics y reportes
- [ ] API REST completa

### 🎯 Próximas Mejoras
- [ ] Integración con Prisma ORM
- [ ] Autenticación con NextAuth.js
- [ ] Almacenamiento en la nube (AWS S3/Cloudinary)
- [ ] Sistema de cache con Redis
- [ ] Tests unitarios y de integración
- [ ] Documentación de API

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

### Estándares de Código
- Usa TypeScript para todo el código
- Sigue las convenciones de ESLint
- Escribe componentes funcionales con hooks
- Documenta funciones complejas
- Mantén componentes pequeños y reutilizables

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Equipo

- **Desarrollo Frontend**: Equipo de desarrollo
- **Diseño UX/UI**: Equipo de diseño
- **Gestión de Proyecto**: Product Manager

## 📞 Contacto

- **Email**: contacto@hablapanama.pa
- **Website**: https://hablapanama.pa
- **GitHub**: https://github.com/tu-usuario/habla-panama

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/) por el framework
- [shadcn/ui](https://ui.shadcn.com/) por los componentes
- [Tailwind CSS](https://tailwindcss.com/) por el sistema de estilos
- [Lucide](https://lucide.dev/) por los iconos
- La comunidad de desarrolladores de código abierto

---

**Habla Panamá** - Facilitando la participación ciudadana responsable en el desarrollo nacional 🇵🇦
\`\`\`

He actualizado el componente `problematica-content.tsx` con el contenido específico de la Caja del Seguro Social y la Ley 462, y creado un README completo que incluye:

## 📋 **Contenido del README:**

### 🎯 **Descripción del proyecto**
- Propósito y objetivos
- Características principales
- Sistema de verificación ciudadana

### 🛠️ **Tecnologías y arquitectura**
- Stack tecnológico completo
- Estructura de carpetas
- Componentes principales

### 📖 **Guías de instalación y uso**
- Instalación paso a paso
- Configuración de variables de entorno
- Guías para usuarios y administradores

### 🎨 **Personalización**
- Sistema de colores
- Configuración de temas
- Componentes UI

### 🚀 **Despliegue**
- Instrucciones para Vercel
- Otros proveedores
- Scripts disponibles

### 📝 **Estado del proyecto**
- Funcionalidades implementadas
- Pendientes por desarrollar
- Roadmap futuro

### 🤝 **Contribución**
- Guías para colaboradores
- Estándares de código
- Proceso de pull requests

El README está diseñado para ser profesional, completo y fácil de seguir, evitando cualquier referencia a base de datos ya que el proyecto funciona completamente sin ella por el momento.
