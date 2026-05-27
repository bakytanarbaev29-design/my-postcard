let bookStep = 0;

// Логика перелистывания книги (сохранена полностью)
window.turnPage = function() {
    const p1 = document.getElementById('p1');
    const p2 = document.getElementById('p2');
    const book = document.getElementById('book');
    
    if (bookStep === 0) {
        if (book) book.classList.add('opened');
        if (p1) p1.classList.add('flipped');
        bookStep = 1;
    } else if (bookStep === 1) {
        if (p2) p2.classList.add('flipped');
        bookStep = 2;
    } else if (bookStep === 2) {
        const galleryScreen = document.getElementById('gallery-screen');
        const heartScreen = document.getElementById('heart-screen');
        
        if (galleryScreen && heartScreen) {
            galleryScreen.style.display = 'none';
            heartScreen.classList.replace('hidden', 'active');
        }
    }
};

// Запуск анимаций при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Ваша оригинальная матричная анимация
    const matrixMessage = "HAPPY BIRTHDAY TO MALAKHAT ";
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];

    for (let x = 0; x < columns; x++) {
        drops[x] = Math.random() * -100;
    }

    function drawMatrix() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#db2777"; // Розовый цвет матрицы
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

    // Исправленная логика отсчета и последовательной смены текста
    const countdownElement = document.getElementById('countdown');
    const targetTextElement = document.getElementById('matrix-text');

    // Ставим начальное значение 3
    if (countdownElement) countdownElement.innerText = "3";

    // Через 1 секунду меняем на 2
    setTimeout(() => {
        if (countdownElement) countdownElement.innerText = "2";
    }, 1000);

    // Через 2 секунды меняем на 1
    setTimeout(() => {
        if (countdownElement) countdownElement.innerText = "1";
    }, 2000);

    // Через 3 секунды убираем цифру совсем и показываем первое слово поздравления
    setTimeout(() => {
        if (countdownElement) {
            countdownElement.classList.add('hidden');
            countdownElement.style.display = 'none'; // Гарантированно прячем цифру, чтобы она не зависала на фоне!
        }
        if (targetTextElement) {
            targetTextElement.classList.remove('hidden');
            targetTextElement.innerHTML = "H A P P Y";
        }
    }, 1500);

    // Через 5 секунд меняем текст на BIRTHDAY
    setTimeout(() => {
        if (targetTextElement) targetTextElement.innerHTML = "B I R T H D A Y";
    }, 2500);

    // Через 7 секунд меняем текст на TO MALAKHAT
    setTimeout(() => {
        if (targetTextElement) targetTextElement.innerHTML = "T O<br>M A L A K H A T";
    }, 3500);

    setTimeout(() => {
        if (targetTextElement) targetTextElement.innerHTML = "M A L A K H A T";
    }, 5000);
    // Через 9.5 секунд плавно переходим к экрану с книгой
    setTimeout(() => {
        clearInterval(matrixInterval);
        const matrixScreen = document.getElementById('matrix-screen');
        const galleryScreen = document.getElementById('gallery-screen');
        
        if (matrixScreen && galleryScreen) {
            matrixScreen.style.display = 'none';
            galleryScreen.classList.replace('hidden', 'active');
        }
    }, 9500);
});