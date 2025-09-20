# CATAL1.5°T Toolkit

Una plataforma web toolkit para participantes de climathones de ClimateTech que proporciona herramientas de IA, recursos multimedia y asistencia interactiva.

## 🚀 Características Principales

### 🎨 Plataforma Web Interactiva
- **Diseño responsive** siguiendo el brand kit CATAL1.5°T
- **Sección de bienvenida** con branding del evento
- **Layout de dos columnas** (sidebar verde oscuro + contenido blanco)
- **Barras blancas** de 1/6 de altura en top/bottom

### 🛠️ Herramientas de IA para climathones
- **UIZARD**: Prototipado rápido de UI/UX
- **MAKE**: Automatizaciones entre aplicaciones
- **Cursor IA**: Desarrollo con inteligencia artificial
- **FlutterFlow**: Desarrollo visual de apps móviles

### 🤖 Asistente de IA Bilingüe
- **Chatbot integrado** con GPT/Claude
- **Respuestas contextuales** sobre herramientas y climathones
- **Soporte español/inglés**
- **Historial de conversaciones**

### 📊 Panel de Administración
- **Dashboard con estadísticas** de uso
- **Análisis del chat** y palabras frecuentes
- **Gestión de herramientas** y contenido
- **Subida de archivos** y recursos

## 🎨 Brand Kit

### Colores Principales
- **Light Green**: `#CFFF91` (fondo principal, botones)
- **Dark Green**: `#063827` (sidebar, texto principal)
- **Dark Purple**: `#42138D` (resaltados, recuadros)
- **White**: `#FFFFFF` (texto, barras)

### Colores Secundarios
- **Light Purple**: `#D4A7FF`
- **Grey**: `#DDDAEB`
- **Blue**: `#81A1DE`

### Tipografía
- **Chesna Grotesk** (Regular, Medium, Bold)
- Fallback: Inter, sans-serif

## 🏗️ Arquitectura

```
catalyst_toolkit/
├── frontend/          # SvelteKit application
│   ├── src/
│   │   ├── lib/components/    # Componentes reutilizables
│   │   ├── routes/           # Páginas de la aplicación
│   │   └── app.css          # Estilos globales
│   └── package.json
├── backend/           # Node.js + Express API
│   ├── src/
│   │   ├── models/          # Modelos de MongoDB
│   │   ├── routes/          # Endpoints de la API
│   │   ├── scripts/         # Scripts de utilidad
│   │   └── index.ts         # Servidor principal
│   └── package.json
├── docs/             # Documentación del proyecto
└── README.md         # Este archivo
```

## 🛠️ Tecnologías

### Frontend
- **SvelteKit** - Framework principal
- **Tailwind CSS** - Sistema de estilos
- **TypeScript** - Tipado estático
- **Lucide Svelte** - Iconos

### Backend
- **Node.js** - Runtime
- **Express** - Framework web
- **TypeScript** - Tipado estático
- **MongoDB** - Base de datos
- **Mongoose** - ODM para MongoDB
- **OpenAI API** - Integración de IA
- **Multer** - Subida de archivos

## 📋 Prerequisitos

- **Node.js** 18+
- **npm** o **yarn**
- **MongoDB** (local o Atlas)
- **OpenAI API Key** (opcional para desarrollo)

## 🚀 Instalación y Ejecución

### Para el Prototipo (Solo Frontend)

```bash
# 1. Navegar al directorio frontend
cd frontend

# 2. Instalar dependencias
npm install

# 3. Ejecutar en desarrollo
npm run dev
```

**¡Listo!** La aplicación estará disponible en http://localhost:5173

### Para Desarrollo Completo (Frontend + Backend)

```bash
# 1. Instalar dependencias de todos los workspaces
npm run install:all

# 2. Configurar variables de entorno del backend
cd backend
cp env.example .env
# Editar .env con tu API key de OpenAI

# 3. Poblar base de datos
npm run seed

# 4. Ejecutar frontend y backend
npm run dev
```

## 🌐 URLs de Desarrollo

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **API Health**: http://localhost:3000/api/health

## 📱 Páginas Disponibles

### Frontend
- **/** - Página principal con sección de bienvenida
- **/tools** - Herramientas de IA con tutoriales
- **/chat** - Asistente de IA bilingüe
- **/resources** - Recursos y documentación
- **/admin** - Panel de administración

### Backend API
- **GET /api/health** - Estado del servidor
- **POST /api/chat/message** - Enviar mensaje al chat
- **GET /api/chat/history/:sessionId** - Historial de chat
- **GET /api/tools** - Listar herramientas
- **GET /api/admin/dashboard** - Estadísticas del dashboard
- **POST /api/admin/tools/seed** - Poblar base de datos

## 🎯 Funcionalidades Implementadas

### ✅ Completado
- [x] Configuración del proyecto SvelteKit
- [x] Sistema de estilos basado en brand kit
- [x] Componentes de layout (header, sidebar, footer)
- [x] Sección de bienvenida con branding
- [x] Sección multimedia con 5 videos de herramientas IA
- [x] Chatbot de IA bilingüe con interfaz
- [x] Backend Node.js con Express
- [x] Integración con OpenAI API
- [x] Base de datos MongoDB con Mongoose
- [x] Panel de administración completo
- [x] API REST para todas las funcionalidades

### 🔄 En Progreso
- [ ] Integración con videos reales
- [ ] Sistema de autenticación
- [ ] Subida de archivos multimedia
- [ ] Notificaciones en tiempo real

### 📋 Pendiente
- [ ] Tests unitarios y de integración
- [ ] Optimización de rendimiento
- [ ] Documentación de API
- [ ] Deployment en producción

## 🚀 Deployment

### Prototipo en Vercel (Recomendado)

1. **Conectar repositorio a Vercel:**
   - Ir a [vercel.com](https://vercel.com)
   - Importar este repositorio
   - Vercel detectará automáticamente que es un proyecto SvelteKit

2. **Configuración automática:**
   - Build Command: `cd frontend && npm run build`
   - Output Directory: `frontend/build`
   - Framework: SvelteKit

3. **Deploy:**
   - Vercel construirá y desplegará automáticamente
   - URL disponible en minutos

### Desarrollo Completo

#### Frontend (Netlify/Vercel)
```bash
cd frontend
npm run build
# Subir carpeta build/ a la plataforma
```

#### Backend (Railway/Render)
```bash
cd backend
npm run build
# Configurar variables de entorno en la plataforma
# Conectar con MongoDB Atlas
```

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama para feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🏢 Partners

- **GIZ** (Deutsche Gesellschaft für Internationale Zusammenarbeit)
- **ClimateKIC**
- **Partners regionales** según el programa específico

## 📞 Soporte

Para soporte técnico o preguntas sobre el proyecto:
- **Email**: support@catalyst-toolkit.org
- **Chat IA**: Disponible en la plataforma
- **Documentación**: `/resources` en la aplicación

---

**CATAL1.5°T Initiative** - Catalizando la innovación en ClimateTech para un futuro sostenible.