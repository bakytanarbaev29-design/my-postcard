// Настройка фотографий (прежняя)
const photos = [
    "images/1.jpeg",
    "images/2.jpeg",
    "images/3.jpeg",
    "images/4.jpeg"
];
let currentPhotoIndex = 0;

// === ЛОГИКА АНИМАЦИИ "МАТРИЦА" (Новая) ===

const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

// Устанавливаем размер холста равным размеру окна
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// Символы для "падающего кода"
const katakana = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const nums = "0123456789";
const alphabet = katakana + latin + nums;

const fontSize = 16;
// Количество колонок падающего кода
const columns = canvas.width / fontSize;
// Массив для отслеживания Y-позиции каждой колонки
const drops = [];

// Инициализируем drops в 1 для каждой колонки
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

// Функция для отрисовки анимации
function drawMatrix() {
    // Полупрозрачный черный фон для создания эффекта "следа"
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0f0"; // Зеленый цвет текста Матрицы
    ctx.font = fontSize + "px arial";

    // Отрисовываем символы
    for (let i = 0; i < drops.length; i++) {
        // Выбираем случайный символ
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        // Отрисовываем символ в текущей X и Y позиции
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Если символ достиг низа экрана, сбрасываем его наверх
        // (добавляем элемент случайности, чтобы колонки падали неравномерно)
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Перемещаем Y-позицию для следующего кадра
        drops[i]++;
    }
}

// Запускаем анимацию Матрицы (30 кадров в секунду)
const matrixInterval = setInterval(drawMatrix, 33);

// === ЛОГИКА ТЕКСТА И ОБРАТНОГО ОТСЧЕТА (Новая) ===

const verticalText = document.getElementById('vertical-text');
const countdownDisplay = document.getElementById('countdown');

// Сценарий заставки
setTimeout(() => {
    // 1. Показываем вертикальный текст поздравления (анимация CSS)
}, 100);

setTimeout(() => {
    // 2. Скрываем текст и готовимся к обратному отсчету
    verticalText.classList.add('hidden');
    
    // Функция обратного отсчета
    let count = 3;
    countdownDisplay.innerText = count;
    countdownDisplay.classList.remove('hidden');

    const countdownInterval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownDisplay.innerText = count;
        } else {
            // 3. Конец заставки: переключаем экраны
            clearInterval(countdownInterval);
            clearInterval(matrixInterval); // Останавливаем анимацию Матрицы
            
            // Скрываем экран Матрицы и показываем Галерею
            document.getElementById('matrix-screen').classList.replace('active', 'hidden');
            document.getElementById('gallery-screen').classList.replace('hidden', 'active');
        }
    }, 1000); // Раз в секунду

}, 6000); // Начинаем отсчет через 6 секунд после начала (время для чтения текста)


// === ЛОГИКА ГАЛЕРЕИ И КОЛЛАЖА (Старая) ===

function nextPhoto() {
    currentPhotoIndex++;
    if (currentPhotoIndex < photos.length) {
        document.getElementById('main-photo').src = photos[currentPhotoIndex];
    } else {
        document.getElementById('gallery-screen').classList.replace('active', 'hidden');
        document.getElementById('heart-screen').classList.replace('hidden', 'active');
    }
}