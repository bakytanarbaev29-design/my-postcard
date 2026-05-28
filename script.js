let bookStep = 0;

// ТЕКСТЫ ДЛЯ ВАШЕЙ ОТКРЫТКИ
const TEXTS = {
    cover: "Для Малахат! Нажми, чтобы открыть книгу воспоминаний... ✨",
    // ОДИН единый текст, когда открываются две фотографии одновременно:
    spread: "Каждый день рядом с тобой приносит невероятную радость и тепло. Ты заставляешь этот мир сиять ярче, и я благодарен за каждый миг! 🌸💕",
    page2Back: "Пусть все твои самые заветные желания обязательно сбудутся. С праздником! 🎉❤️"
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

// Логика пошагового перелистывания книги
window.turnPage = function() {
    const p1 = document.getElementById('p1');
    const p2 = document.getElementById('p2');
    const book = document.getElementById('book');
    
    if (bookStep === 0) {
        // 1. Открываем книгу (показывается разворот из двух фото)
        if (book) book.classList.add('opened');
        if (p1) p1.classList.add('flipped');
        bookStep = 1;
        
        // Прячем текст обложки
        const coverText = document.getElementById('text-cover');
        if (coverText) coverText.style.opacity = "0";
        
        // Делаем видимым общий контейнер и печатаем текст ДЛЯ ДВУХ ФОТО
        const spreadTextEl = document.getElementById('spread-text');
        if (spreadTextEl) spreadTextEl.classList.add('visible');
        
        setTimeout(() => {
            typeWriter('spread-text', TEXTS.spread, 40);
        }, 400);

    } else if (bookStep === 1) {
        // 2. Листаем на финальное фото
        if (p2) p2.classList.add('flipped');
        bookStep = 2;
        
        // Плавно убираем общий текст разворота
        const spreadTextEl = document.getElementById('spread-text');
        if (spreadTextEl) spreadTextEl.classList.remove('visible');
        
        // Запускаем печать текста на последней странице
        setTimeout(() => {
            typeWriter('text-p2-back', TEXTS.page2Back, 40);
        }, 400);

    } else if (bookStep === 2) {
        // 3. Закрываем галерею и переходим к сердцу
        const galleryScreen = document.getElementById('gallery-screen');
        const heartScreen = document.getElementById('heart-screen');
        
        if (galleryScreen && heartScreen) {
            galleryScreen.style.transition = "opacity 0.6s ease";
            galleryScreen.style.opacity = "0";
            setTimeout(() => {
                galleryScreen.style.display = 'none';
                heartScreen.classList.replace('hidden', 'active');
            }, 600);
        }
    }
};

// МАТРИЧНАЯ АНИМАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
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
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0f0'; 
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = matrixMessage.charAt(Math.floor(Math.random() * matrixMessage.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    const matrixInterval = setInterval(drawMatrix, 30);

    // Логика обратного отсчета слов
    const countdownElement = document.getElementById('countdown');
    const targetTextElement = document.getElementById('matrix-text');

    function changeTextSmoothly(element, text, size) {
        if (!element) return;
        element.style.opacity = "0";
        setTimeout(() => {
            element.textContent = text;
            if (size) element.style.fontSize = size + "px";
            element.style.opacity = "1";
        }, 400);
    }

    setTimeout(() => changeTextSmoothly(countdownElement, "2"), 1000);
    setTimeout(() => changeTextSmoothly(countdownElement, "1"), 2000);

    setTimeout(() => {
        if (countdownElement) countdownElement.style.display = 'none';
        
        if (targetTextElement) {
            targetTextElement.classList.remove('hidden');
            targetTextElement.style.opacity = "0"; 
            changeTextSmoothly(targetTextElement, "H A P P Y", 60);
        }
    }, 3000);

    setTimeout(() => changeTextSmoothly(targetTextElement, "B I R T H D A Y", 50), 4500);
    setTimeout(() => changeTextSmoothly(targetTextElement, "T O", 60), 6000);
    setTimeout(() => changeTextSmoothly(targetTextElement, "M A L A K H A T", 42), 7500);

    // Плавный переход от матрицы к 3D-книге
    setTimeout(() => {
        clearInterval(matrixInterval);
        const matrixScreen = document.getElementById('matrix-screen');
        const galleryScreen = document.getElementById('gallery-screen');
        
        if (matrixScreen && galleryScreen) {
            matrixScreen.style.transition = "opacity 0.8s ease-in-out";
            matrixScreen.style.opacity = "0";
            
            setTimeout(() => {
                matrixScreen.style.display = 'none';
                galleryScreen.classList.replace('hidden', 'active');
                galleryScreen.style.opacity = "0";
                setTimeout(() => {
                    galleryScreen.style.transition = "opacity 0.8s ease-in-out";
                    galleryScreen.style.opacity = "1";
                    typeWriter('text-cover', TEXTS.cover, 40);
                }, 50);
            }, 800);
        }
    }, 9500);
});