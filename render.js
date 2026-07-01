/**
 * MÓDULO: render.js
 * Responsabilidad: SOLO renderizado gráfico en el canvas
 * Principio SOLID: Responsabilidad Única (SRP)
 * 
 * Este módulo SOLO se encarga de:
 * - Obtener contexto del canvas
 * - Limpiar la pantalla
 * - Dibujar primitivas geométricas
 * - No contiene lógica de física ni eventos
 */

const render = (() => {
    // Obtener contexto 2D
    const ctx = medidas.ctx;
    
    /**
     * Dibuja el suelo del nivel (rectángulo café/ladrillo)
     */
    const dibujarSuelo = () => {
        const alturaSuelo = 60;
        
        // Fondo del suelo
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(0, medidas.alto - alturaSuelo, medidas.ancho, alturaSuelo);
        
        // Textura de ladrillos
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 2;
        
        const anchoLadrillo = 40;
        const altoLadrillo = 30;
        
        for (let x = 0; x < medidas.ancho; x += anchoLadrillo) {
            for (let y = medidas.alto - alturaSuelo; y < medidas.alto; y += altoLadrillo) {
                ctx.strokeRect(x, y, anchoLadrillo, altoLadrillo);
            }
        }
    };
    
    /**
     * Dibuja a Mario (rectángulo rojo con detalles)
     * @param {number} x - Coordenada X
     * @param {number} y - Coordenada Y
     */
    const dibujarMario = (x, y) => {
        const ancho = 30;
        const alto = 50;
        
        // Cuerpo rojo
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(x - ancho / 2, y - alto, ancho, alto);
        
        // Cabeza (círculo para simplificar)
        ctx.fillStyle = '#FFAA99';
        ctx.beginPath();
        ctx.arc(x, y - alto - 15, 12, 0, Math.PI * 2);
        ctx.fill();
        
        // Ojos
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(x - 6, y - alto - 17, 2.5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(x + 6, y - alto - 17, 2.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Botas
        ctx.fillStyle = '#FFFF00';
        ctx.fillRect(x - 10, y - 5, 8, 8);
        ctx.fillRect(x + 2, y - 5, 8, 8);
        
        // Botones del uniforme
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(x - 5, y - alto + 15, 3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(x + 5, y - alto + 15, 3, 0, Math.PI * 2);
        ctx.fill();
    };
    
    /**
     * Dibuja un Goomba (enemigo champiñón)
     * @param {object} goomba - Objeto Goomba con x, y, vivo
     */
    const dibujarGoomba = (goomba) => {
        if (!goomba.vivo) return;
        
        const ancho = 35;
        const alto = 25;
        const x = goomba.x;
        const y = goomba.y;
        
        // Cuerpo marrón oscuro
        ctx.fillStyle = '#8B4513';
        ctx.beginPath();
        ctx.ellipse(x, y - alto / 2, ancho / 2, alto / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Borde del cuerpo
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Puntos rojos (características del Goomba)
        ctx.fillStyle = '#FF0000';
        
        // Punto izquierdo
        ctx.beginPath();
        ctx.arc(x - 10, y - alto / 2 - 2, 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Punto central
        ctx.beginPath();
        ctx.arc(x, y - alto / 2 - 3, 5, 0, Math.PI * 2);
        ctx.fill();
        
        // Punto derecho
        ctx.beginPath();
        ctx.arc(x + 10, y - alto / 2 - 2, 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Ojos blancos
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(x - 6, y - alto / 2 + 1, 3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(x + 6, y - alto / 2 + 1, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Pupilas negras
        ctx.fillStyle = '#000000';
        
        // Pupila izquierda (direccion)
        ctx.beginPath();
        ctx.arc(x - 6 + (goomba.direccion * 1.5), y - alto / 2 + 1, 1.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Pupila derecha (dirección)
        ctx.beginPath();
        ctx.arc(x + 6 + (goomba.direccion * 1.5), y - alto / 2 + 1, 1.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Sonrisa
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x, y - alto / 2 + 4, 6, 0, Math.PI);
        ctx.stroke();
    };
    
    /**
     * Dibuja nube (decorativa)
     */
    const dibujarNube = (x, y) => {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(x, y, 25, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(x - 20, y, 20, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(x + 20, y, 20, 0, Math.PI * 2);
        ctx.fill();
    };
    
    /**
     * Función principal: Refrescar la pantalla
     * @param {object} marioObj - Objeto con propiedades x, y de Mario
     * @param {array} enemigos - Array de Goombas
     */
    const refrescar = (marioObj, enemigos) => {
        // 1. Limpiar pantalla
        ctx.fillStyle = 'rgba(135, 206, 235, 0.3)';
        ctx.fillRect(0, 0, medidas.ancho, medidas.alto);
        
        // 2. Dibujar decoración
        dibujarNube(medidas.ancho * 0.2, medidas.alto * 0.15);
        dibujarNube(medidas.ancho * 0.7, medidas.alto * 0.2);
        
        // 3. Dibujar suelo
        dibujarSuelo();
        
        // 4. Dibujar Goombas
        if (enemigos) {
            enemigos.forEach((goomba) => {
                dibujarGoomba(goomba);
            });
        }
        
        // 5. Dibujar Mario (al último para que esté encima)
        dibujarMario(marioObj.x, marioObj.y);
    };
    
    // Interfaz pública
    return {
        refrescar: refrescar,
        dibujarMario: dibujarMario,
        dibujarSuelo: dibujarSuelo,
        dibujarGoomba: dibujarGoomba
    };
})();

console.log('✅ render.js cargado - Módulo de renderizado gráfico');