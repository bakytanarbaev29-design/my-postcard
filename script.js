let bookStep = 0;

// НАСТРОЙКА ТЕКСТОВ ДЛЯ КНИГИ ВСПЛЫВАЮЩИХ НА СТРАНИЦАХ
const TEXTS = {
    cover: "Для Малахат! Нажми на обложку, чтобы открыть книгу... ✨",
    page1Back: "Каждый день приносит невероятную радость. 💕",
    page2Front: "Ты заставляешь этот мир сиять намного ярче! 🌸",
    page2Back: "Пусть сбудутся все заветные мечты. С праздником! 🎉❤️"
};

// Функция эффекта печатающегося текста
function typeWriter(elementId, text, speed = 40) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    element.innerHTML = ''; 
    let i = 0;
    
    if (element.typewriterInterval) clearInterval(element.typewriterInterval);
    
    element.typewriterInterval = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(element.typewriterInterval);
        }
    }, speed);
}

// Логика перелистывания книги по клику
window.turnPage = function() {
    const p1 = document.getElementById('p1');
    const p2 = document.getElementById('p2');
    const book = document.getElementById('book');
    
    if (bookStep === 0) {
        // Открываем обложку (Фото 2 уходит влево, открывается разворот Фото 3 и Фото 4)
        if (book) book.classList.add('opened');
        if (p1) p1.classList.add('flipped');
        bookStep = 1;
        
        // Запускаем текст для открывшегося разворота
        setTimeout(() => {
            typeWriter('text-p1-back', TEXTS.page1Back, 40);
            typeWriter('text-p2-front', TEXTS.page2Front, 40);
        }, 600);

    } else if (bookStep === 1) {
        // Перелистываем вторую страницу (показывается Фото 5)
        if (p2) p2.classList.add('flipped');
        bookStep = 2;
        
        // Запускаем финальный текст книги
        setTimeout(() => {
            typeWriter('text-p2-back', TEXTS.page2Back, 40);
        }, 600);

    } else if (bookStep === 2) {
        // Последний клик — закрываем галерею и собираем сердце из всех 5 фото
        const galleryScreen = document.getElementById('gallery-screen');
        const heartScreen = document.getElementById('heart-screen');
        
        if (galleryScreen && heartScreen) {
            galleryScreen.classList.replace('active', 'hidden');
            heartScreen.classList.replace('hidden', 'active');
        }
    }
};

// Работа анимации Неоновой Матрицы
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrixMessage = "HAPPY BIRTHDAY TO MALAKHAT ";
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ff4d6d';
        ctx.font = fontSize + 'px Arial';
        
        for (let i = 0; i < drops.length; i++) {
            const char = matrixMessage[Math.floor(Math.random() * matrixMessage.length)];
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    const matrixInterval = setInterval(drawMatrix, 33);

    // Управление текстом по центру матрицы
    const countdownElement = document.getElementById('countdown');
    const targetTextElement = document.getElementById('matrix-text');

    function changeTextSmoothly(element, newText, delay) {
        if (!element) return;
        element.style.opacity = "0";
        setTimeout(() => {
            element.innerHTML = newText;
            element.style.opacity = "1";
        }, delay);
    }

    setTimeout(() => changeTextSmoothly(countdownElement, "2", 180), 1000);
    setTimeout(() => changeTextSmoothly(countdownElement, "1", 180), 2000);

    setTimeout(() => {
        if (countdownElement) countdownElement.style.display = 'none';
        if (targetTextElement) {
            targetTextElement.classList.remove('hidden');
            changeTextSmoothly(targetTextElement, "H A P P Y", 100);
        }
    }, 3000);

    setTimeout(() => changeTextSmoothly(targetTextElement, "B I R T H D A Y", 90), 4500);
    setTimeout(() => changeTextSmoothly(targetTextElement, "T O", 90), 6000);
    setTimeout(() => changeTextSmoothly(targetTextElement, "M A L A K H A T", 80), 7500);

    // ПЛАНЕТАРНЫЙ ПЕРЕХОД К ФОНУ 1 И КНИГЕ (Через 9.5 сек после старта)
    setTimeout(() => {
        clearInterval(matrixInterval);
        const matrixScreen = document.getElementById('matrix-screen');
        const galleryScreen = document.getElementById('gallery-screen');
        
        if (matrixScreen && galleryScreen) {
            matrixScreen.style.opacity = "0";
            
            setTimeout(() => {
                matrixScreen.classList.replace('active', 'hidden');
                // Плавно открываем экран с установленным фоном из 1.jpeg
                galleryScreen.classList.replace('hidden', 'active');
                
                // Печатаем первый приветственный текст на обложке
                typeWriter('text-cover', TEXTS.cover, 40);
            }, 1000);
        }
    }, 9500);
});