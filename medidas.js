/**
 * MÓDULO: medidas.js
 * Responsabilidad: Gestionar las dimensiones dinámicas del canvas y el navegador
 * Principio SOLID: Responsabilidad Única (SRP)
 * 
 * Este módulo SOLO se encarga de:
 * - Leer dimensiones del navegador
 * - Actualizar el canvas en tiempo real
 * - Escuchar eventos de redimensionamiento
 */

const medidas = (() => {
    // Variables privadas
    const canvas = document.getElementById('mundoMario');
    const ctx = canvas.getContext('2d');
    
    // Dimensiones iniciales
    let ancho = window.innerWidth;
    let alto = window.innerHeight;
    
    // Configurar canvas inicial
    const actualizarCanvasSize = () => {
        ancho = Math.max(800, window.innerWidth - 40);
        alto = Math.max(600, window.innerHeight - 250);
        
        canvas.width = ancho;
        canvas.height = alto;
        
        console.log(`📐 Canvas redimensionado: ${ancho}x${alto}`);
        document.getElementById('resolucion').textContent = `${ancho}x${alto}`;
    };
    
    // Inicializar tamaño
    actualizarCanvasSize();
    
    // Escuchar evento resize
    window.addEventListener('resize', () => {
        actualizarCanvasSize();
    });
    
    // Interfaz pública
    return {
        get ancho() {
            return ancho;
        },
        get alto() {
            return alto;
        },
        get canvas() {
            return canvas;
        },
        get ctx() {
            return ctx;
        },
        obtener: function() {
            return {
                ancho: this.ancho,
                alto: this.alto
            };
        }
    };
})();

console.log('✅ medidas.js cargado - Módulo de dimensiones dinámicas');