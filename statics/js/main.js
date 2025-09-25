/**
 * ===== SCRIPT PRINCIPAL PARA LA PÁGINA "¿QUIERES SER MI NOVIA?" =====
 * 
 * Este archivo contiene toda la lógica interactiva para:
 * 1. Animación de fondo con corazones flotantes
 * 2. Comportamiento del botón "Sí" (mostrar modal y redireccionar)
 * 3. Comportamiento del botón "No" (movimiento evasivo)
 * 4. Control del modal de confirmación
 * 5. Efectos visuales y sonoros
 */

// ===== VARIABLES GLOBALES =====
let noButtonClickCount = 0; // Contador de clicks en el botón "No"
const maxNoClicks = 5; // Máximo número de clicks antes de que el botón "No" desaparezca
let heartsInterval; // Intervalo para generar corazones flotantes
let isModalOpen = false; // Estado del modal

// ===== ELEMENTOS DEL DOM =====
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const modalOverlay = document.getElementById('modalOverlay');
const heartsBackground = document.getElementById('heartsBackground');
const buttonsContainer = document.getElementById('buttonsContainer');

/**
 * ===== INICIALIZACIÓN AL CARGAR LA PÁGINA =====
 * Se ejecuta cuando el DOM está completamente cargado
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌸 Página de propuesta cargada correctamente');
    
    // Iniciar animaciones de fondo
    startHeartAnimation();
    
    // Configurar event listeners para los botones
    setupEventListeners();
    
    // Agregar efectos de sonido (opcional)
    preloadSounds();
});

/**
 * ===== CONFIGURACIÓN DE EVENT LISTENERS =====
 * Configura todos los eventos de click y interacción
 */
function setupEventListeners() {
    // Event listener para el botón "Sí"
    yesBtn.addEventListener('click', handleYesClick);
    
    // Event listener para el botón "No"
    noBtn.addEventListener('click', handleNoClick);
    
    // Event listener para cerrar modal (click fuera del contenido)
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay && isModalOpen) {
            // No permitir cerrar el modal clickeando fuera
            // El modal solo se cierra automáticamente después del timeout
        }
    });
    
    // Event listener para efectos hover adicionales
    setupHoverEffects();
}

/**
 * ===== MANEJO DEL CLICK EN BOTÓN "SÍ" =====
 * Muestra el modal de confirmación y programa la redirección
 */
function handleYesClick() {
    console.log('💖 ¡Ella dijo que SÍ!');
    
    // Agregar efecto de pulso al botón
    yesBtn.classList.add('pulse-effect');
    
    // Mostrar modal después de una pequeña pausa
    setTimeout(() => {
        showModal();
        
        // Generar explosión de corazones
        createHeartExplosion();
        
        // Programar redirección después de 3 segundos
        setTimeout(() => {
            redirectToNextPage();
        }, 3000);
        
    }, 300);
}

/**
 * ===== MANEJO DEL CLICK EN BOTÓN "NO" =====
 * Implementa el comportamiento evasivo del botón "No"
 */
function handleNoClick() {
    noButtonClickCount++;
    console.log(`😅 Intento ${noButtonClickCount} de clickear "No"`);
    
    // Mensajes divertidos según el número de intentos
    const messages = [
        "¡Ay no! ¿Estás segura? 🥺",
        "¡Vamos, inténtalo de nuevo! 😊",
        "¡No puedes escapar del amor! 💕",
        "¡Una oportunidad más! 🌟",
        "¡Está bien, tú ganas... pero elige 'Sí'! 😉"
    ];
    
    // Mostrar mensaje temporal
    showTemporaryMessage(messages[Math.min(noButtonClickCount - 1, messages.length - 1)]);
    
    if (noButtonClickCount < maxNoClicks) {
        // Mover el botón a una posición aleatoria
        moveNoButton();
    } else {
        // Después de varios intentos, hacer el botón más difícil de clickear
        makeNoButtonHarder();
    }
}

/**
 * ===== MOVIMIENTO DEL BOTÓN "NO" =====
 * Mueve el botón "No" a una posición aleatoria dentro del contenedor
 */
function moveNoButton() {
    // Agregar clase de movimiento
    noBtn.classList.add('moving');
    
    // Calcular posición aleatoria dentro del contenedor
    const container = buttonsContainer;
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    // Rangos seguros para el movimiento (evitar que se salga del contenedor)
    const maxX = containerRect.width - btnRect.width;
    const maxY = containerRect.height - btnRect.height;
    
    const randomX = Math.random() * Math.min(maxX, 200) - 100;
    const randomY = Math.random() * Math.min(maxY, 100) - 50;
    
    // Aplicar transformación
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    
    // Remover clase de movimiento después de la animación
    setTimeout(() => {
        noBtn.classList.remove('moving');
    }, 500);
}

/**
 * ===== HACER EL BOTÓN "NO" MÁS DIFÍCIL =====
 * Después de varios intentos, hace el botón más pequeño y esquivo
 */
function makeNoButtonHarder() {
    console.log('😈 Activando modo difícil para el botón "No"');
    
    // Hacer el botón más pequeño
    noBtn.style.transform = 'scale(0.8)';
    noBtn.style.opacity = '0.7';
    
    // Agregar movimiento continuo al hover
    noBtn.addEventListener('mouseenter', function() {
        if (noButtonClickCount >= maxNoClicks) {
            moveNoButton();
        }
    });
    
    // Cambiar el texto del botón
    noBtn.innerHTML = 'No... 🏃‍♀️';
    
    // Después de un tiempo, hacer que desaparezca gradualmente
    setTimeout(() => {
        fadeOutNoButton();
    }, 2000);
}

/**
 * ===== DESVANECER EL BOTÓN "NO" =====
 * Hace que el botón "No" desaparezca gradualmente
 */
function fadeOutNoButton() {
    console.log('👻 Desvaneciendo botón "No"');
    
    noBtn.style.transition = 'all 2s ease-out';
    noBtn.style.opacity = '0';
    noBtn.style.transform = 'scale(0) rotate(360deg)';
    
    // Remover el botón del DOM después de la animación
    setTimeout(() => {
        noBtn.style.display = 'none';
        
        // Mostrar mensaje final
        showTemporaryMessage('¡Perfecto! Solo queda una opción... 😉💕');
        
        // Hacer el botón "Sí" más prominente
        yesBtn.style.transform = 'scale(1.2)';
        yesBtn.style.boxShadow = '0 10px 30px rgba(255, 107, 107, 0.6)';
        
    }, 2000);
}

/**
 * ===== MOSTRAR MODAL DE CONFIRMACIÓN =====
 * Muestra la ventana emergente con el mensaje "Lo sabía"
 */
function showModal() {
    console.log('🎉 Mostrando modal de confirmación');
    
    isModalOpen = true;
    modalOverlay.classList.add('active');
    
    // Pausar animación de corazones de fondo
    clearInterval(heartsInterval);
    
    // Agregar clase al body para evitar scroll
    document.body.style.overflow = 'hidden';
}

/**
 * ===== CERRAR MODAL =====
 * Cierra la ventana emergente (no se usa en este caso, pero está disponible)
 */
function closeModal() {
    console.log('❌ Cerrando modal');
    
    isModalOpen = false;
    modalOverlay.classList.remove('active');
    
    // Reanudar animación de corazones
    startHeartAnimation();
    
    // Restaurar scroll del body
    document.body.style.overflow = 'auto';
}

/**
 * ===== REDIRECCIÓN A LA SIGUIENTE PÁGINA =====
 * Redirige a la página principal de la propuesta (template)
 */
function redirectToNextPage() {
    console.log('🚀 Redirigiendo a la página principal...');
    
    // Crear efecto de transición antes de redireccionar
    document.body.style.transition = 'opacity 1s ease-out';
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        // Aquí puedes cambiar la URL a tu template principal
        // Por ahora, recarga la página con un parámetro
        window.location.href = 'templates/main-proposal.html';
        
        // Si no tienes el template aún, puedes usar:
        // window.location.reload();
    }, 1000);
}

/**
 * ===== ANIMACIÓN DE CORAZONES FLOTANTES =====
 * Crea corazones que flotan desde abajo hacia arriba
 */
function startHeartAnimation() {
    console.log('💕 Iniciando animación de corazones');
    
    // Limpiar intervalo anterior si existe
    if (heartsInterval) {
        clearInterval(heartsInterval);
    }
    
    // Crear corazones cada 800ms
    heartsInterval = setInterval(createFloatingHeart, 800);
}

/**
 * ===== CREAR CORAZÓN FLOTANTE =====
 * Crea un corazón individual que flota hacia arriba
 */
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    
    // Emojis de corazones aleatorios
    const heartEmojis = ['💕', '💖', '💗', '💝', '💘', '💞'];
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    
    // Posición horizontal aleatoria
    heart.style.left = Math.random() * 100 + '%';
    
    // Tamaño aleatorio
    const size = Math.random() * 10 + 15;
    heart.style.fontSize = size + 'px';
    
    // Duración de animación aleatoria
    const duration = Math.random() * 2 + 3;
    heart.style.animationDuration = duration + 's';
    
    // Agregar al contenedor
    heartsBackground.appendChild(heart);
    
    // Remover después de la animación
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, duration * 1000);
}

/**
 * ===== EXPLOSIÓN DE CORAZONES =====
 * Crea una explosión de corazones cuando se selecciona "Sí"
 */
function createHeartExplosion() {
    console.log('💥 Creando explosión de corazones');
    
    // Crear múltiples corazones desde el centro
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = '💖';
            heart.style.fontSize = '30px';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.transform = 'translate(-50%, -50%)';
            
            // Dirección aleatoria para la explosión
            const angle = (Math.PI * 2 * i) / 20;
            const velocity = Math.random() * 200 + 100;
            const x = Math.cos(angle) * velocity;
            const y = Math.sin(angle) * velocity;
            
            heart.style.animation = `explode 2s ease-out forwards`;
            heart.style.setProperty('--x', x + 'px');
            heart.style.setProperty('--y', y + 'px');
            
            heartsBackground.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 2000);
        }, i * 50);
    }
}

/**
 * ===== MOSTRAR MENSAJE TEMPORAL =====
 * Muestra un mensaje temporal en la pantalla
 */
function showTemporaryMessage(message) {
    console.log('💬 Mostrando mensaje:', message);
    
    // Crear elemento de mensaje
    const messageElement = document.createElement('div');
    messageElement.className = 'temporary-message';
    messageElement.textContent = message;
    messageElement.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 107, 107, 0.9);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-weight: 600;
        z-index: 1001;
        animation: slideInDown 0.5s ease-out, slideOutUp 0.5s ease-out 2s forwards;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(messageElement);
    
    // Remover después de 2.5 segundos
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.parentNode.removeChild(messageElement);
        }
    }, 2500);
}

/**
 * ===== CONFIGURAR EFECTOS HOVER =====
 * Agrega efectos adicionales al pasar el mouse sobre elementos
 */
function setupHoverEffects() {
    // Efecto hover para la imagen de personajes
    const charactersImg = document.querySelector('.characters-img');
    if (charactersImg) {
        charactersImg.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1) saturate(1.2)';
        });
        
        charactersImg.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1) saturate(1)';
        });
    }
    
    // Efecto de partículas al hover de botones
    [yesBtn, noBtn].forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            createButtonParticles(this);
        });
    });
}

/**
 * ===== CREAR PARTÍCULAS EN BOTONES =====
 * Crea pequeñas partículas cuando se hace hover sobre los botones
 */
function createButtonParticles(button) {
    const rect = button.getBoundingClientRect();
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            animation: particleFloat 1s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }
}

/**
 * ===== PRECARGAR SONIDOS (OPCIONAL) =====
 * Precarga archivos de sonido para efectos (si decides agregarlos)
 */
function preloadSounds() {
    // Aquí puedes precargar archivos de sonido si decides agregarlos
    console.log('🔊 Sistema de sonidos listo (opcional)');
}

/**
 * ===== AGREGAR ANIMACIONES CSS DINÁMICAS =====
 * Agrega estilos CSS para animaciones que se crean dinámicamente
 */
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInDown {
            0% {
                opacity: 0;
                transform: translateX(-50%) translateY(-30px);
            }
            100% {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
        
        @keyframes slideOutUp {
            0% {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
            100% {
                opacity: 0;
                transform: translateX(-50%) translateY(-30px);
            }
        }
        
        @keyframes explode {
            0% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) scale(0);
                opacity: 0;
            }
        }
        
        @keyframes particleFloat {
            0% {
                opacity: 1;
                transform: translateY(0);
            }
            100% {
                opacity: 0;
                transform: translateY(-20px);
            }
        }
        
        .pulse-effect {
            animation: pulse 0.6s ease-in-out !important;
        }
    `;
    document.head.appendChild(style);
}

// Agregar estilos dinámicos al cargar
addDynamicStyles();

/**
 * ===== MANEJO DE ERRORES =====
 * Manejo básico de errores para debugging
 */
window.addEventListener('error', function(e) {
    console.error('❌ Error en la página:', e.error);
});

// ===== LOG DE INICIALIZACIÓN =====
console.log('🌸✨ Sistema de propuesta inicializado correctamente ✨🌸');