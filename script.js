let bookStep = 0;

// ТЕКСТЫ ДЛЯ ВАШЕЙ ОТКРЫТКИ
const TEXTS = {
    cover: "Для Малахат! Нажми, чтобы открыть книгу... ✨",
    spread1: "Каждый день рядом с тобой приносит невероятную радость и тепло. 💕",
    spread2: "Ты заставляешь этот мир сиять ярче, и я благодарен за каждый миг! 🌸",
    closing: "Пусть все твои самые заветные желания обязательно сбудутся. С праздником! 🎉❤️"
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
            if (text.charAt(i) === '\n') {
                element.innerHTML += '<br>';
            } else {
                element.innerHTML += text.charAt(i);
            }
            i++;
        } else {
            clearInterval(element.typewriterInterval);
        }
    }, speed);
}

// Логика перелистывания книги из 3-х страниц (5 фото)
window.turnPage = function() {
    const p1 = document.getElementById('p1');
    const p2 = document.getElementById('p2');
    const p3 = document.getElementById('p3'); // Наша новая третья страница
    const book = document.getElementById('book');
    const sharedText = document.getElementById('shared-text');
    
    if (bookStep === 0) {
        // Клик 1: Открываем обложку, показываем первый разворот (фото 2 и 3)
        if (book) book.classList.add('opened');
        if (p1) p1.classList.add('flipped');
        bookStep = 1;
        
        setTimeout(() => {
            typeWriter('shared-text', TEXTS.spread1, 40);
        }, 500);

    } else if (bookStep === 1) {
        // Клик 2: Перелистываем на второй разворот (фото 4 и 5)
        if (p2) p2.classList.add('flipped');
        bookStep = 2;
        
        setTimeout(() => {
            typeWriter('shared-text', TEXTS.spread2, 40);
        }, 500);

    } else if (bookStep === 2) {
        // Клик 3: Закрываем книгу (перелистываем 3-ю страницу)
        if (p3) p3.classList.add('flipped');
        bookStep = 3;
        
        // Плавно убираем текст под книгой
        if (sharedText) sharedText.classList.remove('visible');
        
        // Через секунду уходим на экран с сердцем
        setTimeout(() => {
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
        }, 1000); // Пауза, чтобы полюбоваться закрытием книги
    }
};

// МАТРИЧНАЯ АНИМАЦИЯ И ОТСЧЕТ
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

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
        ctx.fillStyle = "#db2777";
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

    const countdownElement = document.getElementById('countdown');
    const targetTextElement = document.getElementById('matrix-text');

    const applyBeautifulStyle = (el, size) => {
        if (!el) return;
        el.style.transition = "opacity 0.4s ease-in-out, transform 0.4s ease-in-out";
        el.style.color = "#db2777"; 
        el.style.textShadow = "none"; 
        el.style.fontFamily = "sans-serif";
        el.style.fontWeight = "900";
        el.style.textAlign = "center";
        
        let finalSize = window.innerWidth < 600 ? size * 0.5 : size;
        el.style.fontSize = finalSize + "px";
    };

    const changeTextSmoothly = (el, newText, size) => {
        if (!el) return;
        el.style.opacity = "0";
        el.style.transform = "scale(0.8)"; 
        
        setTimeout(() => {
            el.innerHTML = newText;
            applyBeautifulStyle(el, size);
            el.style.opacity = "1";
            el.style.transform = "scale(1)"; 
        }, 400); 
    };

    if (countdownElement) {
        countdownElement.innerText = "3";
        applyBeautifulStyle(countdownElement, 180);
        countdownElement.style.opacity = "1";
        countdownElement.style.transform = "scale(1)";
    }
    
    if (targetTextElement) targetTextElement.classList.add('hidden');

    setTimeout(() => changeTextSmoothly(countdownElement, "2", 180), 1000);
    setTimeout(() => changeTextSmoothly(countdownElement, "1", 180), 2000);

    setTimeout(() => {
        if (countdownElement) countdownElement.style.display = 'none';
        
        if (targetTextElement) {
            targetTextElement.classList.remove('hidden');
            targetTextElement.style.opacity = "0"; 
            changeTextSmoothly(targetTextElement, "H A P P Y", 100);
        }
    }, 3000);

    setTimeout(() => changeTextSmoothly(targetTextElement, "B I R T H D A Y", 90), 4500);
    setTimeout(() => changeTextSmoothly(targetTextElement, "T O", 90), 6000);
    setTimeout(() => changeTextSmoothly(targetTextElement, "M A L A K H A T", 80), 7500);

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
                    galleryScreen.style.transition = "opacity 1.2s ease-in-out";
                    galleryScreen.style.opacity = "1";
                    
                    // Делаем видимым общий блок текста и печатаем текст обложки
                    const sharedText = document.getElementById('shared-text');
                    if (sharedText) sharedText.classList.add('visible');
                    typeWriter('shared-text', TEXTS.cover, 40);
                }, 50);
            }, 800);
        }
    }, 9500);
});