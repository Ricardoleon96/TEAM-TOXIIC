# Configuración del Sitio Web TEAM TOXIIC

## Configuración de Desarrollo

### Prerequisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Python 3.x (para servidor local) o extensión Live Server
- Editor de texto (VS Code recomendado)

### Inicio Rápido
1. Abrir terminal en el directorio del proyecto
2. Ejecutar: `python -m http.server 8000`
3. Abrir navegador en `http://localhost:8000`

### Directrices de Desarrollo

#### Arquitectura CSS
- Diseño responsivo mobile-first
- CSS Grid y Flexbox para layouts
- Propiedades Personalizadas CSS para temas
- Metodología BEM para nombres de clases

#### Patrones JavaScript
- JavaScript moderno ES6+
- Organización de funciones modulares
- Delegación de eventos para rendimiento
- Intersection Observer para animaciones

#### Optimización de Rendimiento
- Minimizar peticiones HTTP
- Optimizar imágenes (formato WebP recomendado)
- Usar transformaciones CSS para animaciones
- Debounce en eventos de scroll
- Carga lazy de contenido no crítico

#### Accesibilidad
- Estructura HTML semántica
- Etiquetas ARIA donde sea necesario
- Soporte de navegación por teclado
- Compatibilidad con lectores de pantalla
- Soporte de alto contraste

### Soporte de Navegadores
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Convenciones de Archivos
- Usar kebab-case para nombres de archivos
- Organizar CSS por componente/sección
- Mantener funciones JavaScript enfocadas y puras
- Comentar lógica compleja detalladamente

### Tokens de Diseño
```css
:root {
  --color-primary: #B2FD4B;
  --color-secondary: #8a2be2;
  --color-background: #0a0a0a;
  --color-surface: #1a1a1a;
  --color-text: #f5f5f5;
  --color-text-muted: #b0b0b0;
  
  --font-primary: 'Inter', sans-serif;
  --font-heading: 'Orbitron', monospace;
  
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 2rem;
  --spacing-lg: 4rem;
  --spacing-xl: 6rem;
  
  --border-radius: 8px;
  --border-radius-large: 12px;
  
  --animation-fast: 0.15s;
  --animation-medium: 0.3s;
  --animation-slow: 0.6s;
}
```

### Lista de Verificación para Despliegue
- [ ] Optimizar imágenes
- [ ] Minificar CSS y JavaScript
- [ ] Probar en múltiples dispositivos
- [ ] Validar HTML
- [ ] Verificar accesibilidad
- [ ] Probar funcionalidad de formularios
- [ ] Verificar enlaces sociales
- [ ] Verificar rendimiento de carga
- [ ] Probar funcionalidad offline
- [ ] Validar meta tags SEO

## Estructura del Sitio

#### Secciones Principales
- **Inicio**: Página principal con video de fondo rotativo y introducción al equipo
- **Nosotros**: Historia y filosofía de TEAM TOXIIC con elementos de cómic interactivos
- **Nuestra Comunidad**: Presentación del equipo principal con tarjetas estilo pixel art
- **Footer**: Enlaces sociales y información de contacto

#### Sección "Nuestra Comunidad"
Esta sección presenta a los miembros principales del equipo usando un carrusel horizontal tipo Rolling Gallery con diseño pixel art/cyberpunk:

**Características del Carrusel:**
- Desplazamiento horizontal infinito y continuo
- Duplicación automática de tarjetas para loop seamless
- Controles de navegación: flechas prev/next y play/pause
- Soporte para swipe/touch en dispositivos móviles
- Pausa automática al hacer hover sobre las tarjetas
- Botón "Ver Todos" que alterna entre carrusel y vista grid

**Características del Diseño:**
- Tarjetas con bordes pixelados animados y efectos de glitch
- Avatares estilo pixel art únicos para cada miembro
- Efectos hover con animaciones de brillo neón y floating
- Iconos sociales pixelados personalizados
- Frases características estilo gamer
- Máscara de gradiente en los extremos para efecto suave

**Funcionalidades JavaScript:**
- Auto-scroll con animación CSS infinita
- Navegación manual con transiciones suaves
- Reset automático de posición al llegar al final
- Efectos glitch aleatorios en avatares
- Control de play/pause del carrusel
- Toggle entre vista carrusel y grid completo

**Miembros del Equipo:**
- CEO & Founder (ALEX_TOXIC) - "Ctrl del caos"
- Head of Marketing (NOVA_MATRIX) - "Buffering ideas..."
- Community Manager (CYBER_SAGE) - "El lag soy yo"
- Lead Developer (CODE_VENOM) - "404: Sleep not found"
- Content Creator (GLITCH_MASTER) - "Spawning content..."
- Esports Manager (BYTE_WARRIOR) - "GG EZ life"
