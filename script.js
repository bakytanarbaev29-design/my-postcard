// Переменная для отслеживания текущего фото
let currentPhotoIndex = 0;
const photos = [
    "images/1.jpeg",
    "images/2.jpeg",
    "images/3.jpeg",
    "images/4.jpeg"
];

// Ждем полной загрузки страницы, чтобы избежать ошибок с поиском элементов
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');

    // Настраиваем размеры холста под экран
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const katakana = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホмоヨョロヲゴゾドボポヴッン";
    const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums = "0123456789";
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];

    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }

    // Функция отрисовки падающего кода
    function drawMatrix() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#0f0";
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    // Запуск эффекта Матрицы
    const matrixInterval = setInterval(drawMatrix, 33);

    // Логика переключения на обратный отсчет через 4 секунды
    const verticalText = document.getElementById('vertical-text');
    const countdownDisplay = document.getElementById('countdown');

    setTimeout(() => {
        if (verticalText) verticalText.classList.add('hidden');
        
        let count = 3;
        if (countdownDisplay) {
            countdownDisplay.innerText = count;
            countdownDisplay.classList.remove('hidden');
        }

        // Интервал обратного отсчета (раз в секунду)
        const countdownInterval = setInterval(() => {
            count--;
            if (count > 0) {
                if (countdownDisplay) countdownDisplay.innerText = count;
            } else {
                // Конец отсчета: останавливаем всё и переключаем экран
                clearInterval(countdownInterval);
                clearInterval(matrixInterval);
                
                const matrixScreen = document.getElementById('matrix-screen');
                const galleryScreen = document.getElementById('gallery-screen');
                
                if (matrixScreen && galleryScreen) {
                    matrixScreen.classList.replace('active', 'hidden');
                    galleryScreen.classList.replace('hidden', 'active');
                }
            }
        }, 1000);

    }, 4000); // Поздравление висит 4 секунды, затем включается отсчет
});

// Глобальная функция для перелистывания фотографий (вызывается по клику в HTML)
window.nextPhoto = function() {
    currentPhotoIndex++;
    const mainPhoto = document.getElementById('main-photo');
    
    if (currentPhotoIndex < photos.length) {
        if (mainPhoto) mainPhoto.src = photos[currentPhotoIndex];
    } else {
        const galleryScreen = document.getElementById('gallery-screen');
        const heartScreen = document.getElementById('heart-screen');
        
        if (galleryScreen && heartScreen) {
            galleryScreen.classList.replace('active', 'hidden');
            heartScreen.classList.replace('hidden', 'active');
        }
    }
};