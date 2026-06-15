// --- ЛОГИКА МУЗЫКИ (AUTOPLAY + FALLBACK) ---
document.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-toggle');

    if (music && musicBtn) {
        music.volume = 0.5; // Комфортная громкость 50%

        // 1. Попытка запустить трек сразу при загрузке
        const playPromise = music.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Если браузер разрешил — супер!
                musicBtn.classList.remove('muted');
                musicBtn.classList.add('playing');
            }).catch(error => {
                // Если заблокировал — не страшно, ждем первого касания
                console.log("Браузер заблокировал автоплей. Ждем первого клика.");
            });
        }

        // Функция ручного переключения музыки
        function toggleMusic() {
            if (music.paused) {
                music.play().then(() => {
                    musicBtn.classList.remove('muted');
                    musicBtn.classList.add('playing');
                }).catch(err => console.log("Браузер ждет клика:", err));
            } else {
                music.pause();
                musicBtn.classList.remove('playing');
                musicBtn.classList.add('muted');
            }
        }

        musicBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            toggleMusic();
        });

        // 2. Страховка: Включаем музыку при самом первом касании экрана
        const startMusicOnInteraction = () => {
            if (music.paused) {
                music.play().then(() => {
                    musicBtn.classList.remove('muted');
                    musicBtn.classList.add('playing');
                }).catch(e => console.log("Ждем касания..."));
            }
            // Удаляем слушатели, чтобы они сработали только один раз
            document.removeEventListener('click', startMusicOnInteraction);
            document.removeEventListener('touchstart', startMusicOnInteraction);
        };

        document.addEventListener('click', startMusicOnInteraction);
        document.addEventListener('touchstart', startMusicOnInteraction);
    }
});

// --- ЛОГИКА ОТКРЫТКИ ---
let bookStep = 0;

const TEXTS = {
    cover: "Для Малахат! Нажми, чтобы открыть книгу... ✨",
    spread1: "Каждый день рядом с тобой приносит невероятную радость и тепло. 💕",
    spread2: "Ты заставляешь этот мир сиять ярче, и я благодарен за каждый миг! 🌸",
    closing: "Пусть все твои самые заветные желания обязательно сбудутся. С праздником! 🎉❤️"
};

// Функция печатной машинки
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

// Логика перелистывания книги (3 клика)
window.turnPage = function() {
    const p1 = document.getElementById('p1');
    const p2 = document.getElementById('p2');
    const p3 = document.getElementById('p3'); 
    const book = document.getElementById('book');
    const sharedText = document.getElementById('shared-text');
    
    if (bookStep === 0) {
        // Клик 1: Открываем разворот 1
        if (book) book.classList.add('opened');
        if (p1) p1.classList.add('flipped');
        bookStep = 1;
        
        setTimeout(() => {
            typeWriter('shared-text', TEXTS.spread1, 40);
        }, 800);

    } else if (bookStep === 1) {
        // Клик 2: Разворот 2
        if (p2) p2.classList.add('flipped');
        bookStep = 2;
        
        setTimeout(() => {
            typeWriter('shared-text', TEXTS.spread2, 40);
        }, 800);

    } else if (bookStep === 2) {
        // Клик 3: Закрываем книгу
        if (p3) p3.classList.add('flipped');
        bookStep = 3;
        
        if (sharedText) sharedText.classList.remove('visible');
        
        // Переход на экран сердца
        setTimeout(() => {
            const galleryScreen = document.getElementById('gallery-screen');
            const heartScreen = document.getElementById('heart-screen');
            
            if (galleryScreen && heartScreen) {
                galleryScreen.classList.replace('active', 'hidden');
                heartScreen.classList.replace('hidden', 'active');
            }
        }, 1200);
    }
};

// --- ЛОГИКА АНИМАЦИИ ОТСЧЕТА И ВСТУПИТЕЛЬНОГО ТЕКСТА ---
document.addEventListener('DOMContentLoaded', () => {
    const countdownElement = document.getElementById('countdown');
    const targetTextElement = document.getElementById('matrix-text');

    const applyBeautifulStyle = (el, size) => {
        if (!el) return;
        el.style.opacity = "0";
        el.style.transform = "scale(0.8)"; 
        
        let finalSize = window.innerWidth < 600 ? size * 0.5 : size;
        el.style.fontSize = finalSize + "px";
        
        setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "scale(1)"; 
        }, 50);
    };

    const changeTextSmoothly = (el, newText, size) => {
        if (!el) return;
        el.style.opacity = "0";
        el.style.transform = "scale(0.8)"; 
        
        setTimeout(() => {
            el.innerHTML = newText;
            applyBeautifulStyle(el, size);
        }, 400); 
    };

    if (countdownElement) {
        countdownElement.innerText = "3";
        applyBeautifulStyle(countdownElement, 180);
    }
    
    if (targetTextElement) {
        targetTextElement.classList.add('hidden');
    }

    setTimeout(() => changeTextSmoothly(countdownElement, "2", 180), 1000);
    setTimeout(() => changeTextSmoothly(countdownElement, "1", 180), 2000);

    setTimeout(() => {
        if (countdownElement) countdownElement.style.display = 'none';
        
        if (targetTextElement) {
            targetTextElement.classList.remove('hidden');
            targetTextElement.innerHTML = "H A P P Y";
            applyBeautifulStyle(targetTextElement, 100);
        }
    }, 3000);

    setTimeout(() => changeTextSmoothly(targetTextElement, "B I R T H D A Y", 90), 4500);
    setTimeout(() => changeTextSmoothly(targetTextElement, "T O", 90), 6000);
    setTimeout(() => changeTextSmoothly(targetTextElement, "M A L A K H A T", 80), 7500);

    setTimeout(() => {
        const matrixScreen = document.getElementById('matrix-screen');
        const galleryScreen = document.getElementById('gallery-screen');
        
        if (matrixScreen && galleryScreen) {
            matrixScreen.style.opacity = "0";
            
            setTimeout(() => {
                matrixScreen.classList.replace('active', 'hidden');
                galleryScreen.classList.replace('hidden', 'active');
                
                const sharedText = document.getElementById('shared-text');
                if (sharedText) sharedText.classList.add('visible');
                typeWriter('shared-text', TEXTS.cover, 40);
            }, 1000);
        }
    }, 9500);
});