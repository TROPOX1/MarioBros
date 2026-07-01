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
    const VELOCIDAD_MARIO = 5;
    
    // ==================== ESTADO DEL JUEGO ====================
    const estado = {
        mario: {
            x: 100,
            y: 0,
            velocidadY: 0,
            velocidadX: 0,
            enAire: false
        },
        juego: {
            vidas: 3,
            puntuacion: 0,
            gameOver: false,
            nivel: 1
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
        estado.mario.x = 100;
        
        // Inicializar Goombas
        goombas.inicializar();
        
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
        }
        
        // 5. Movimiento horizontal (flechas)
        if (evento.obtener_izquierda()) {
            mario.velocidadX = -VELOCIDAD_MARIO;
        } else if (evento.obtener_derecha()) {
            mario.velocidadX = VELOCIDAD_MARIO;
        } else {
            mario.velocidadX = 0;
        }
        
        // 6. Actualizar posición X
        mario.x += mario.velocidadX;
        
        // 7. Limitar posición X
        mario.x = Math.max(20, Math.min(medidas.ancho - 20, mario.x));
        
        // 8. Actualizar Goombas
        goombas.actualizar();
        
        // 9. Detectar colisiones con Goombas
        const colision = goombas.detectarColision(mario);
        if (colision) {
            if (colision.tipo === 'pisar') {
                // Mario pisó un Goomba
                estado.juego.puntuacion += colision.puntos;
            } else if (colision.tipo === 'daño') {
                // Mario recibe daño
                estado.juego.vidas--;
                console.log(`💔 Vidas restantes: ${estado.juego.vidas}`);
                
                // Resetear posición de Mario
                mario.x = 100;
                mario.y = posicionSuelo;
                mario.velocidadY = 0;
                mario.velocidadX = 0;
                
                if (estado.juego.vidas <= 0) {
                    finalizarJuego();
                }
            }
        }
        
        // Actualizar UI de vidas
        document.getElementById('vidas').textContent = estado.juego.vidas;
        document.getElementById('puntuacion').textContent = estado.juego.puntuacion;
        document.getElementById('goombas').textContent = goombas.obtenerEnemigos().filter(g => g.vivo).length;
    };
    
    /**
     * Renderizar un frame
     */
    const renderizar = () => {
        render.refrescar(estado.mario, goombas.obtenerEnemigos());
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
            stats.aps = stats.contadorFrames;
            
            console.log(
                `📊 FPS: ${stats.fps} | APS: ${stats.aps} | Δt: ${deltaTime.toFixed(2)}ms | ` +
                `Pos Mario: (${estado.mario.x.toFixed(0)}, ${estado.mario.y.toFixed(0)})`
            );
            
            // Actualizar UI
            document.getElementById('fps').textContent = stats.fps;
            document.getElementById('deltaTime').textContent = deltaTime.toFixed(1);
            
            // Resetear contadores
            stats.contadorFrames = 0;
            stats.tiempoTotal = 0;
        }
    };
    
    /**
     * Finalizar el juego
     */
    const finalizarJuego = () => {
        estado.juego.gameOver = true;
        console.log('💀 GAME OVER');
        
        // Mostrar pantalla de Game Over
        const gameOverScreen = document.getElementById('gameOverScreen');
        document.getElementById('puntuacionFinal').textContent = estado.juego.puntuacion;
        gameOverScreen.classList.add('activo');
        
        detenerGameLoop();
    };
    
    // ==================== GAME LOOP ====================
    
    let idAnimacion = null;
    let ultimoTiempo = 0;
    
    /**
     * Bucle principal del juego
     */
    const gameLoop = (tiempoActual) => {
        if (estado.juego.gameOver) return;
        
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
            velocidadX: 0,
            enAire: false
        };
        
        estado.juego = {
            vidas: 3,
            puntuacion: 0,
            gameOver: false,
            nivel: 1
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
        
        // Ocultar Game Over screen
        document.getElementById('gameOverScreen').classList.remove('activo');
        
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