// Список картинок
const photos = [
    "images/1.jpeg",
    "images/2.jpeg",
    "images/3.jpeg",
    "images/4.jpeg"
];
let currentPhotoIndex = 0;

// Функция перелистывания (вынесена вверх для надежности)
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

// Запуск кода при полной загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');

    // Настройка размеров холста под экран устройства
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Символы матрицы
    const matrixChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZQWERTYUIOPASDFGHJKLZXCVBNM";
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];

    // Делаем случайный старт капель, чтобы они падали хаотично с самого начала
    for (let x = 0; x < columns; x++) {
        drops[x] = Math.random() * -100;
    }

    function drawMatrix() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // ИЗМЕНЕНО: Розовый цвет для падающих символов матрицы
        ctx.fillStyle = "#ff00ff";
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    // Запуск анимации матрицы
    const matrixInterval = setInterval(drawMatrix, 33);

    // Поддержка поворота экрана смартфона
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // СЦЕНАРИЙ: Текст (4 сек) -> Отсчет (3 сек) -> Галерея
    const verticalText = document.getElementById('vertical-text');
    const countdownDisplay = document.getElementById('countdown');

    setTimeout(() => {
        if (verticalText) verticalText.style.display = 'none';
        if (countdownDisplay) countdownDisplay.classList.remove('hidden');

        let timeLeft = 3;
        
        const countdownInterval = setInterval(() => {
            timeLeft--;
            if (timeLeft > 0) {
                if (countdownDisplay) countdownDisplay.innerText = timeLeft;
            } else {
                clearInterval(countdownInterval);
                clearInterval(matrixInterval); // Выключаем матрицу для экономии батареи
                
                const matrixScreen = document.getElementById('matrix-screen');
                const galleryScreen = document.getElementById('gallery-screen');
                
                if (matrixScreen && galleryScreen) {
                    matrixScreen.classList.replace('active', 'hidden');
                    galleryScreen.classList.replace('hidden', 'active');
                }
            }
        }, 1000);

    }, 4000); // Надпись держится 4 секунды
});