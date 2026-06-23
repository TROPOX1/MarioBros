/**
 * MÓDULO: evento.js
 * Responsabilidad: Gestionar TODOS los eventos del usuario y del DOM
 * Principio SOLID: Responsabilidad Única (SRP)
 * 
 * Este módulo SOLO se encarga de:
 * - Esperar que el DOM esté completamente cargado
 * - Capturar clics del botón
 * - Capturar eventos de teclado
 * - No contiene lógica de física ni renderizado
 */

const evento = (() => {
    // Variables privadas
    let juegoIniciado = false;
    let tiempoInicio = 0;
    let saltoPresionado = false;
    let callback_iniciar = null;
    
    // Estados del teclado
    const teclas = {
        espacio: false
    };
    
    /**
     * Función para encender el juego
     */
    const iniciarJuego = () => {
        if (juegoIniciado) return;
        
        juegoIniciado = true;
        tiempoInicio = performance.now();
        
        console.log('🎮 JUEGO INICIADO a las', new Date().toLocaleTimeString());
        
        // Ocultar botón de iniciar y habilitar reiniciar
        document.getElementById('btnIniciar').disabled = true;
        document.getElementById('btnReiniciar').disabled = false;
        
        // Llamar callback
        if (callback_iniciar) {
            callback_iniciar();
        }
    };
    
    /**
     * Función para reiniciar el juego
     */
    const reiniciarJuego = () => {
        juegoIniciado = false;
        tiempoInicio = 0;
        saltoPresionado = false;
        
        console.log('🔄 Juego reiniciado');
        
        // Habilitar botón de iniciar y deshabilitar reiniciar
        document.getElementById('btnIniciar').disabled = false;
        document.getElementById('btnReiniciar').disabled = true;
    };
    
    /**
     * Esperar a que el DOM esté 100% cargado
     */
    document.addEventListener('DOMContentLoaded', () => {
        console.log('📄 DOM completamente cargado');
        
        // Registrar listeners de botones
        document.getElementById('btnIniciar').addEventListener('click', iniciarJuego);
        document.getElementById('btnReiniciar').addEventListener('click', reiniciarJuego);
    });
    
    /**
     * Capturar evento de teclado (Barra Espaciadora)
     */
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && juegoIniciado) {
            e.preventDefault();
            if (!saltoPresionado) {
                saltoPresionado = true;
                console.log('⬆️ Salto detectado');
            }
        }
    });
    
    document.addEventListener('keyup', (e) => {
        if (e.code === 'Space') {
            saltoPresionado = false;
        }
    });
    
    // Interfaz pública
    return {
        registrar_iniciar: function(callback) {
            callback_iniciar = callback;
        },
        obtener_salto: function() {
            return saltoPresionado;
        },
        obtener_tiempo_inicio: function() {
            return tiempoInicio;
        },
        verificar_juego_iniciado: function() {
            return juegoIniciado;
        },
        reiniciar_juego: reiniciarJuego
    };
})();

console.log('✅ evento.js cargado - Módulo de eventos y entrada del usuario');