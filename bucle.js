/**
 * MÓDULO: bucle.js
 * Responsabilidad: Lógica del juego y Game Loop
 * Principio SOLID: Responsabilidad Única (SRP)
 * 
 * Este módulo:
 * - Implementa el Game Loop con requestAnimationFrame
 * - Calcula la física (gravedad, saltos)
 * - Mantiene el estado del juego
 * - Coordina los otros módulos
 */

const bucle = (() => {
    // ==================== CONSTANTES ====================
    const GRAVEDAD = 0.6;
    const VELOCIDAD_SALTO = 15;
    const ALTURA_SUELO = 60;
    
    // ==================== ESTADO DEL JUEGO ====================
    const estado = {
        mario: {
            x: 100,
            y: 0,  // Se calculará dinámicamente
            velocidadY: 0,
            enAire: false
        },
        estadisticas: {
            fps: 0,
            aps: 0,
            deltaTime: 0,
            ultimaActualizacion: performance.now(),
            contadorFrames: 0,
            tiempoTotal: 0
        }
    };
    
    // ==================== INICIALIZACIÓN ====================
    const inicializar = () => {
        // Calcular posición inicial de Mario (sobre el suelo)
        estado.mario.y = medidas.alto - ALTURA_SUELO;
        
        console.log('🎮 Motor de videojuegos inicializado');
        console.log(`📊 Física: Gravedad=${GRAVEDAD}, Velocidad Salto=${VELOCIDAD_SALTO}`);
        console.log(`📐 Canvas: ${medidas.ancho}x${medidas.alto}`);
    };
    
    // ==================== LÓGICA FÍSICA ====================
    
    /**
     * Actualizar la lógica de Mario
     * Aquí ocurre toda la física del personaje
     */
    const actualizarLogica = () => {
        const mario = estado.mario;
        
        // 1. Aplicar gravedad
        mario.velocidadY += GRAVEDAD;
        
        // 2. Actualizar posición Y
        mario.velocidadY = Math.min(mario.velocidadY, 20); // Velocidad máxima
        mario.y += mario.velocidadY;
        
        // 3. Detectar colisión con suelo
        const posicionSuelo = medidas.alto - ALTURA_SUELO;
        if (mario.y >= posicionSuelo) {
            mario.y = posicionSuelo;
            mario.velocidadY = 0;
            mario.enAire = false;
        } else {
            mario.enAire = true;
        }
        
        // 4. Capturar salto
        if (evento.obtener_salto() && !mario.enAire) {
            mario.velocidadY = -VELOCIDAD_SALTO;
            mario.enAire = true;
            console.log('⬆️ ¡SALTO! Velocidad Y:', mario.velocidadY);
        }
        
        // 5. Limitar posición X
        mario.x = Math.max(20, Math.min(medidas.ancho - 20, mario.x));
    };
    
    /**
     * Renderizar un frame
     */
    const renderizar = () => {
        render.refrescar(estado.mario);
    };
    
    /**
     * Calcular estadísticas de rendimiento
     */
    const actualizarEstadisticas = (deltaTime) => {
        const stats = estado.estadisticas;
        
        stats.deltaTime = deltaTime;
        stats.contadorFrames++;
        stats.tiempoTotal += deltaTime;
        
        // Cada 1 segundo (~999ms), reportar estadísticas
        if (stats.tiempoTotal >= 999) {
            stats.fps = stats.contadorFrames;
            stats.aps = stats.contadorFrames; // En este caso son iguales
            
            console.log(
                `📊 FPS: ${stats.fps} | APS: ${stats.aps} | Δt: ${deltaTime.toFixed(2)}ms | ` +
                `Pos Mario: (${estado.mario.x.toFixed(0)}, ${estado.mario.y.toFixed(0)}) | ` +
                `VelY: ${estado.mario.velocidadY.toFixed(2)}`
            );
            
            // Actualizar UI
            document.getElementById('fps').textContent = stats.fps;
            document.getElementById('aps').textContent = stats.aps;
            document.getElementById('deltaTime').textContent = deltaTime.toFixed(1);
            
            // Resetear contadores
            stats.contadorFrames = 0;
            stats.tiempoTotal = 0;
        }
    };
    
    // ==================== GAME LOOP ====================
    
    let idAnimacion = null;
    let ultimoTiempo = 0;
    
    /**
     * Bucle principal del juego
     */
    const gameLoop = (tiempoActual) => {
        // Calcular Delta Time
        if (ultimoTiempo === 0) {
            ultimoTiempo = tiempoActual;
        }
        const deltaTime = tiempoActual - ultimoTiempo;
        ultimoTiempo = tiempoActual;
        
        // Actualizar lógica
        actualizarLogica();
        
        // Renderizar
        renderizar();
        
        // Actualizar estadísticas
        actualizarEstadisticas(deltaTime);
        
        // Siguiente frame
        idAnimacion = requestAnimationFrame(gameLoop);
    };
    
    /**
     * Iniciar el game loop
     */
    const iniciarGameLoop = () => {
        inicializar();
        console.log('▶️ Game Loop iniciado con requestAnimationFrame');
        idAnimacion = requestAnimationFrame(gameLoop);
    };
    
    /**
     * Detener el game loop
     */
    const detenerGameLoop = () => {
        if (idAnimacion) {
            cancelAnimationFrame(idAnimacion);
            console.log('⏸️ Game Loop pausado');
        }
    };
    
    /**
     * Reiniciar el juego
     */
    const reiniciar = () => {
        detenerGameLoop();
        
        // Resetear estado
        estado.mario = {
            x: 100,
            y: 0,
            velocidadY: 0,
            enAire: false
        };
        estado.estadisticas = {
            fps: 0,
            aps: 0,
            deltaTime: 0,
            ultimaActualizacion: performance.now(),
            contadorFrames: 0,
            tiempoTotal: 0
        };
        
        ultimoTiempo = 0;
        
        console.log('🔄 Juego reiniciado');
    };
    
    // ==================== REGISTRO DE EVENTOS ====================
    
    // Registrar callback para iniciar el game loop
    evento.registrar_iniciar(() => {
        reiniciar();
        iniciarGameLoop();
    });
    
    // Interfaz pública
    return {
        iniciar: iniciarGameLoop,
        detener: detenerGameLoop,
        reiniciar: reiniciar,
        obtenerEstado: () => estado
    };
})();

console.log('✅ bucle.js cargado - Motor de videojuegos y Game Loop');
console.log('🎯 El juego está listo. ¡Presiona "Iniciar Nivel" para comenzar!');
