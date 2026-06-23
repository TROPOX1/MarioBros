# 🎮 SUPER MARIO BROS - Motor de Videojuegos HTML5

## 📋 Descripción

Motor de videojuegos basado en **arquitectura limpia (Clean Code)** con **5 módulos independientes** que respetan el **Principio de Responsabilidad Única (SRP)**. Implementa la física básica de Mario en el Nivel 1-1 con renderizado en tiempo real.

---

## ✅ Entregables Completados

### 1️⃣ **index.html** - Estructura Base
- ✅ Canvas con ID `mundoMario`
- ✅ Botón "Iniciar Nivel"
- ✅ Botón "Reiniciar"
- ✅ Visualización de estadísticas (FPS, APS, Δt, Resolución)
- ✅ Carga de scripts en orden correcto

### 2️⃣ **medidas.js** - Dimensiones Dinámicas
- ✅ Lee `window.innerWidth` y `window.innerHeight`
- ✅ Event Listener para `resize`
- ✅ Redimensiona canvas sin distorsión
- ✅ Actualiza resolución en tiempo real

### 3️⃣ **evento.js** - Gestión de Eventos
- ✅ Espera `DOMContentLoaded` (DOM 100% cargado)
- ✅ Captura clic del botón "Iniciar Nivel"
- ✅ Inyecta `performance.now()` para timing preciso
- ✅ Captura tecla **Barra Espaciadora** para salto
- ✅ Oculta botón después de iniciar

### 4️⃣ **bucle.js** - Game Loop y Lógica
- ✅ Patrón Game Loop con `requestAnimationFrame()`
- ✅ Subrutina `actualizarLogica()`
- ✅ Objeto Mario con propiedades `x`, `y`, `gravedad`
- ✅ Física: Gravedad atrae hacia el suelo
- ✅ Física: Salto modifica Y negativamente
- ✅ Reporte de FPS, APS, Delta Time en consola
- ✅ Actualización cada 1 segundo (Δt > 999ms)

### 5️⃣ **render.js** - Renderizado Gráfico
- ✅ Captura contexto 2D del canvas
- ✅ Subrutina `refrescar()`
- ✅ Limpia pantalla con `clearRect()`
- ✅ Dibuja **Suelo** (rectángulo café con textura de ladrillos)
- ✅ Dibuja **Mario** (rectángulo rojo con detalles)
- ✅ Lee coordenadas de Mario desde `bucle.js`
- ✅ Dibuja nubes decorativas

---

## 🎮 Criterio de Éxito: ✅ COMPLETADO

✅ Mario aparece en el suelo de ladrillos  
✅ Al presionar **BARRA ESPACIADORA**, Mario salta  
✅ Arco de salto fluido y natural  
✅ Mario cae por gravedad  
✅ Consola reporta ~60 FPS  
✅ Consola reporta ~60 APS  
✅ Arquitectura modular sin dependencias circulares  

---

## 🏗️ Arquitectura Modular (Clean Code)

```
┌──────────────────────────────────────┐
│         index.html (Entrada)        │
│  ├── Canvas: mundoMario             │
│  ├── Botones: Iniciar, Reiniciar    │
│  └── Scripts (Orden correcto)        │
└──────────────────┬───────────────────┘
                   │
     ┌─────────────┼─────────────┐
     │             │             │
  ┌──▼──┐      ┌───▼────┐    ┌──▼──┐
  │medidas.js  │evento.js│   │render.js
  │(Medidas)   │(Entrada)│   │(Gráficos)
  │- Size      │- Eventos│   │- Dibujos
  │- Resize    │- Teclado│   │- Canvas
  └──┬──┘      └────┬────┘   └──┬──┘
     │              │           │
     └──────────────┼───────────┘
                    │
              ┌─────▼──────┐
              │  bucle.js  │
              │ (Motor)    │
              │- Game Loop │
              │- Física    │
              │- Lógica    │
              └────────────┘
```

### Módulos Independientes

| Módulo | Responsabilidad | Dependencias |
|--------|---|---|
| **medidas.js** | Dimensiones dinámicas del canvas | Ninguna |
| **evento.js** | Captura de eventos del usuario | Ninguna |
| **render.js** | Renderizado gráfico | `medidas.js` |
| **bucle.js** | Lógica y Game Loop | `medidas.js`, `evento.js`, `render.js` |
| **index.html** | Estructura HTML y coordinación | Todos |

---

## 🎮 Controles

| Acción | Tecla/Botón |
|--------|-------------|
| Iniciar Nivel | Click en **Iniciar Nivel** |
| Saltar | **BARRA ESPACIADORA** |
| Reiniciar | Click en **Reiniciar** |

---

## 📊 Estadísticas en Tiempo Real

La consola del navegador muestra cada segundo:

```
📊 FPS: 60 | APS: 60 | Δt: 16.67ms | Pos Mario: (100, 480) | VelY: 5.42
```

**Significado:**
- **FPS:** Fotogramas por segundo
- **APS:** Actualizaciones por segundo
- **Δt:** Delta Time entre frames
- **Pos Mario:** Coordenadas (X, Y)
- **VelY:** Velocidad en eje Y

---

## 🚀 Cómo Ejecutar

### Opción 1: GitHub Pages
```
https://TROPOX1.github.io/MarioBros/
```

### Opción 2: Servidor Local (Python)
```bash
cd MarioBros
python -m http.server 8000
# Abre: http://localhost:8000
```

### Opción 3: Servidor Local (Node.js)
```bash
cd MarioBros
npx http-server
# Abre: http://localhost:8080
```

---

## 📐 Especificaciones Técnicas

### Física
- **Gravedad:** 0.6 píxeles/frame²
- **Velocidad de Salto:** 15 píxeles/frame
- **Velocidad máxima de caída:** 20 píxeles/frame
- **Altura del suelo:** 60 píxeles

### Renderizado
- **Canvas dinámico:** Se adapta al tamaño del navegador
- **Mín resolución:** 800x600 píxeles
- **FPS objetivo:** 60 (requestAnimationFrame)
- **Limpieza de pantalla:** Cada frame

### Principios SOLID Aplicados

1. **S - Responsabilidad Única (SRP):**
   - Cada módulo tiene UNA responsabilidad
   - No se mezcla lógica de eventos, física, renderizado

2. **O - Abierto/Cerrado:**
   - Fácil extender (agregar enemigos, items, etc.)
   - Difícil de romper (módulos independientes)

3. **L - Sustitución de Liskov:**
   - Cada módulo es intercambiable
   - Misma interfaz pública

4. **I - Segregación de Interfaz:**
   - Cada módulo expone solo lo necesario
   - Métodos públicos claramente definidos

5. **D - Inversión de Dependencias:**
   - Los módulos dependen de abstracciones (medidas.js)
   - No de implementaciones concretas

---

## 🔧 Mejoras Futuras

- [ ] Agregar enemigos (Goombas, Koopas)
- [ ] Items (Monedas, Hongos, Flores de fuego)
- [ ] Colisiones con obstáculos
- [ ] Animación de Mario (caminata, salto)
- [ ] Niveles adicionales
- [ ] Sonido y música
- [ ] Contador de vidas
- [ ] Sistema de puntuación

---

## 📝 Notas de Desarrollo

- Todo el código está comentado explicando cada función
- Los logs en consola ayudan a debuggear
- La arquitectura permite agregar fácilmente nuevos módulos
- Sin bibliotecas externas (vanilla JavaScript)
- Compatible con navegadores modernos

---

## 🎓 Lecciones Aprendidas

✅ Arquitectura modular es escalable  
✅ Responsabilidad única facilita mantenimiento  
✅ Separación de concerns mejora debugging  
✅ requestAnimationFrame es más eficiente que setInterval  
✅ Canvas 2D es poderoso para juegos 2D simples  

---

**Desarrollado con ❤️ como motor base de videojuegos en HTML5**