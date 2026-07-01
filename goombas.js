/**
 * MÓDULO: goombas.js
 * Responsabilidad: Gestionar enemigos Goombas (hongos malos)
 * Principio SOLID: Responsabilidad Única (SRP)
 * 
 * Este módulo se encarga de:
 * - Crear y administrar enemigos Goombas
 * - Movimiento y física de Goombas
 * - Detectar colisiones con Mario
 * - Manejar la muerte de Goombas (pisar desde arriba)
 */

const goombas = (() => {
    // ==================== CONSTANTES ====================
    const VELOCIDAD_GOOMBA = 3;
    const ANCHO_GOOMBA = 35;
    const ALTO_GOOMBA = 25;
    const ALTURA_SUELO = 60;
    
    // ==================== ESTADO ====================
    const estado = {
        enemigos: [],
        puntuacionGanada: 0
    };
    
    // ==================== CREAR GOOMBAS ====================
    
    /**
     * Crear un Goomba en una posición específica
     */
    const crearGoomba = (x, y, velocidad = VELOCIDAD_GOOMBA) => {
        return {
            x: x,
            y: y,
            velocidad: velocidad,
            vivo: true,
            direccion: velocidad > 0 ? 1 : -1, // 1 = derecha, -1 = izquierda
            ancho: ANCHO_GOOMBA,
            alto: ALTO_GOOMBA
        };
    };
    
    /**
     * Inicializar el nivel con Goombas
     */
    const inicializarGoombas = () => {
        estado.enemigos = [];
        estado.puntuacionGanada = 0;
        
        // Crear Goombas en diferentes posiciones
        estado.enemigos.push(crearGoomba(250, medidas.alto - ALTURA_SUELO - 25, VELOCIDAD_GOOMBA));
        estado.enemigos.push(crearGoomba(450, medidas.alto - ALTURA_SUELO - 25, -VELOCIDAD_GOOMBA));
        estado.enemigos.push(crearGoomba(700, medidas.alto - ALTURA_SUELO - 25, VELOCIDAD_GOOMBA));
        
        console.log(`🍄 ${estado.enemigos.length} Goombas creados`);
    };
    
    /**
     * Actualizar movimiento de todos los Goombas
     */
    const actualizarGoombas = () => {
        estado.enemigos.forEach((goomba) => {
            if (!goomba.vivo) return;
            
            // Movimiento horizontal
            goomba.x += goomba.velocidad;
            
            // Rebotar en los bordes del canvas
            if (goomba.x <= 0 || goomba.x >= medidas.ancho) {
                goomba.velocidad = -goomba.velocidad;
                goomba.direccion = goomba.velocidad > 0 ? 1 : -1;
            }
        });
    };
    
    // ==================== COLISIONES ====================
    
    /**
     * Detectar si Mario está colisionando con un Goomba
     */
    const detectarColisionConMario = (mario) => {
        estado.enemigos.forEach((goomba) => {
            if (!goomba.vivo) return;
            
            // Obtener posición real de Mario en términos de rectangulos
            const marioAncho = 30;
            const marioAlto = 50;
            const marioIzq = mario.x - marioAncho / 2;
            const marioDer = mario.x + marioAncho / 2;
            const marioArr = mario.y - marioAlto;
            const marioAba = mario.y;
            
            // Posición del Goomba
            const goombaIzq = goomba.x - goomba.ancho / 2;
            const goombaDer = goomba.x + goomba.ancho / 2;
            const goombaArr = goomba.y - goomba.alto;
            const goombaAba = goomba.y;
            
            // Verificar colisión AABB (Axis-Aligned Bounding Box)
            const hayColision = 
                marioIzq < goombaDer &&
                marioDer > goombaIzq &&
                marioArr < goombaAba &&
                marioAba > goombaArr;
            
            if (hayColision) {
                // Verificar si Mario está saltando encima del Goomba
                const marioEncima = mario.velocidadY >= 0 && marioArr < goombaArr - 15;
                
                if (marioEncima) {
                    // Mario pisa al Goomba
                    matarGoomba(goomba);
                    console.log('💥 ¡Goomba eliminado! +100 puntos');
                    return { tipo: 'pisar', puntos: 100 };
                } else {
                    // Mario colisiona normalmente (recibe daño)
                    console.log('💔 ¡Mario golpeado por Goomba!');
                    return { tipo: 'daño', puntos: 0 };
                }
            }
        });
        
        return null;
    };
    
    /**
     * Matar un Goomba
     */
    const matarGoomba = (goomba) => {
        goomba.vivo = false;
        estado.puntuacionGanada += 100;
    };
    
    // ==================== INTERFAZ PÚBLICA ====================
    
    return {
        inicializar: inicializarGoombas,
        actualizar: actualizarGoombas,
        detectarColision: detectarColisionConMario,
        obtenerEnemigos: () => estado.enemigos,
        obtenerPuntuacion: () => estado.puntuacionGanada,
        matarGoomba: matarGoomba
    };
})();

console.log('✅ goombas.js cargado - Módulo de enemigos Goombas');