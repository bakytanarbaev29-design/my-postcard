// Список картинок открытки
const photos = [
    "images/1.jpeg",
    "images/2.jpeg",
    "images/3.jpeg",
    "images/4.jpeg"
];
let currentPhotoIndex = 0;

// Логика перелистывания фотографий в галерее
window.nextPhoto = function() {
    currentPhotoIndex++;
    const mainPhoto = document.getElementById('main-photo');
    
    if (currentPhotoIndex < photos.length) {
        if (mainPhoto) {
            mainPhoto.src = photos[currentPhotoIndex];
        }
    } else {
        const galleryScreen = document.getElementById('gallery-screen');
        const heartScreen = document.getElementById('heart-screen');
        
        if (galleryScreen && heartScreen) {
            galleryScreen.classList.replace('active', 'hidden');
            heartScreen.classList.replace('hidden', 'active');
        }
    }
};

// Запуск анимации при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Символы фонового дождя: только буквы поздравления
    const matrixMessage = "HAPPY BIRTHDAY TO MALAKHAT   ";
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];

    // Хаотичное начало падения капель
    for (let x = 0; x < columns; x++) {
        drops[x] = Math.random() * -100;
    }

    // Отрисовка фоновой матрицы
    function drawMatrix() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#db2777"; // Обычный розовый цвет для фона
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const charIndex = Math.floor(drops[i]) % matrixMessage.length;
            const safeCharIndex = charIndex < 0 ? 0 : charIndex;
            const text = matrixMessage.charAt(safeCharIndex);
            
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    const matrixInterval = setInterval(drawMatrix, 33);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // ТАЙМИНГ: ПОСЛЕДОВАТЕЛЬНАЯ СМЕНА СЛОВ ЦЕНТРАЛЬНОГО ТЕКСТА
    const targetTextElement = document.getElementById('matrix-text');

    // 1. Через 2 секунды меняем HAPPY на BIRTHDAY
    setTimeout(() => {
        if (targetTextElement) {
            targetTextElement.innerHTML = "B I R T H D A Y";
        }
    }, 2000);

    // 2. Еще через 2 секунды (итого 4 сек) меняем на TO MALAKHAT
    setTimeout(() => {
        if (targetTextElement) {
            targetTextElement.innerHTML = "T O<br>M A L A K H A T";
        }
    }, 4000);

    // 3. Еще через 2.5 секунды (итого 6.5 сек) завершаем матрицу и плавно открываем галерею
    setTimeout(() => {
        clearInterval(matrixInterval); // Останавливаем фон
        
        const matrixScreen = document.getElementById('matrix-screen');
        const galleryScreen = document.getElementById('gallery-screen');
        
        if (matrixScreen && galleryScreen) {
            matrixScreen.classList.replace('active', 'hidden');
            galleryScreen.classList.replace('hidden', 'active');
        }
    }, 6500);
});