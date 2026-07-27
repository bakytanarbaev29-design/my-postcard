let bookStep = 0;
// Теперь у нас 11 листов (21 фото + финальная обложка сзади)
const TOTAL_PAGES = 11;

// НАСТРОЙКА ТЕКСТОВ ДЛЯ СТРАНИЦ КНИГИ (Для 11 разворотов)
const TEXTS = {
    cover: "Нажми, чтобы открыть книгу воспоминаний... ✨",
    p1Back: "Каждое воспоминание - это маленькое сокровище, которое мы будем бережно хранить всю жизнь. 💕",
    p2Front: "Әр сапар бақытқа толы болсын, ал әр күні жаңа әсер сыйласын! 🌸",
    p2Back: "С каждым днем наши общие воспоминания становятся всё дороже... 💖",
    p3Front: "Ты наполняешь жизнь улыбками, смехом и вдохновением! ✨",
    p3Back: "А теперь просто понастольгируй моментами! 🌹",
    p4Front: "☀️",
    p4Back: " 💫",
    p5Front: " 🌺",
    p5Back: " ✨",
    p6Front: " 🌟",
    p6Back: "Едем пропобоавть печенье в Амстердаме! 🤭",
    p7Front: "Нас ругали, но мы все равно делали своё! 😂",
    p7Back: "В супермаркете Аучан пробуем лапшичку. P.S  мы ходили туда потом несколько раз! 🤣",
    p8Front: "У нас не было реквизита, но была Ты 🌞",
    p8Back: "🎊",
    p9Front: "💖",
    p9Back: " ✨",
    p10Front: "Спасибо тебе что ты есть в моей жизни. 💗",
    p10Back: "Біздің махаббат хикаямыз енді ғана басталады...! 💫",
    p11Front: "Я люблю Тебя. ❤️",
    p11Back: "HAPPY BIRTHDAY BALAPAN 🎉❤️"
};

// Функция эффекта пишущей машинки
function typeWriter(elementId, text, speed = 40) {
    const element = document.getElementById(elementId);
    if (!element || !text) return;
    
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

// Логика последовательного перелистывания 11 листов книги
window.turnPage = function() {
    if (bookStep < TOTAL_PAGES) {
        bookStep++;
        const currentPage = document.getElementById(`p${bookStep}`);
        if (currentPage) {
            currentPage.classList.add('flipped');
        }

        // Запуск печати текста для открывшегося разворота
        if (bookStep === 1) {
            typeWriter('text-p1-back', TEXTS.p1Back);
            typeWriter('text-p2-front', TEXTS.p2Front);
        } else if (bookStep === 2) {
            typeWriter('text-p2-back', TEXTS.p2Back);
            typeWriter('text-p3-front', TEXTS.p3Front);
        } else if (bookStep === 3) {
            typeWriter('text-p3-back', TEXTS.p3Back);
            typeWriter('text-p4-front', TEXTS.p4Front);
        } else if (bookStep === 4) {
            typeWriter('text-p4-back', TEXTS.p4Back);
            typeWriter('text-p5-front', TEXTS.p5Front);
        } else if (bookStep === 5) {
            typeWriter('text-p5-back', TEXTS.p5Back);
            typeWriter('text-p6-front', TEXTS.p6Front);
        } else if (bookStep === 6) {
            typeWriter('text-p6-back', TEXTS.p6Back);
            typeWriter('text-p7-front', TEXTS.p7Front);
        } else if (bookStep === 7) {
            typeWriter('text-p7-back', TEXTS.p7Back);
            typeWriter('text-p8-front', TEXTS.p8Front);
        } else if (bookStep === 8) {
            typeWriter('text-p8-back', TEXTS.p8Back);
            typeWriter('text-p9-front', TEXTS.p9Front);
        } else if (bookStep === 9) {
            typeWriter('text-p9-back', TEXTS.p9Back);
            typeWriter('text-p10-front', TEXTS.p10Front);
        } else if (bookStep === 10) {
            typeWriter('text-p10-back', TEXTS.p10Back);
            typeWriter('text-p11-front', TEXTS.p11Front);
        } else if (bookStep === 11) {
            typeWriter('text-p11-back', TEXTS.p11Back);
        }
    } else {
        // Переход к финалу с сердцем (из 21 фото)
        const galleryScreen = document.getElementById('gallery-screen');
        const heartScreen = document.getElementById('heart-screen');
        
        if (galleryScreen && heartScreen) {
            galleryScreen.style.transition = "opacity 0.8s ease-in-out";
            galleryScreen.style.opacity = "0";
            
            setTimeout(() => {
                galleryScreen.style.display = 'none';
                heartScreen.classList.replace('hidden', 'active');
            }, 800);
        }
    }
};

// Запуск анимаций и логика звука
document.addEventListener('DOMContentLoaded', () => {
    
    // --- ИНТЕЛЛЕКТУАЛЬНАЯ СИСТЕМА ЗАПУСКА МУЗЫКИ ---
    const music = document.getElementById('bg-music');
    const soundBtn = document.getElementById('sound-btn');

    function tryPlayMusic() {
        if (music && music.paused) {
            music.volume = 0.6;
            music.play().then(() => {
                if (soundBtn) soundBtn.style.display = 'none';
            }).catch(e => console.log("Браузер ожидает активности пользователя...", e));
        }
    }

    // Попытка 1: Сразу при загрузке кода
    tryPlayMusic();

    // Попытка 2: При первом клике в любую область экрана
    document.body.addEventListener('click', () => {
        tryPlayMusic();
    }, { once: true });

    // Попытка 3: Ручное нажатие на розовую кнопку
    if (soundBtn) {
        soundBtn.addEventListener('click', function(e) {
            e.stopPropagation(); 
            tryPlayMusic();
            this.innerHTML = "🎵 Звук включен!";
            this.style.background = "#22c55e";
            this.style.boxShadow = "0 0 15px rgba(34, 197, 94, 0.6)";
            setTimeout(() => {
                this.style.transition = "opacity 0.5s ease";
                this.style.opacity = "0";
                setTimeout(() => this.style.display = 'none', 500);
            }, 2000);
        });
    }

    // --- МАТРИЦА И ОТСЧЕТ ---
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
    
    if (targetTextElement) {
        targetTextElement.classList.add('hidden');
    }

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

    // Переход к книге
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
                
                // Дублирующий запуск музыки перед началом книги
                tryPlayMusic();
                
                typeWriter('text-cover', TEXTS.cover, 40);
            }, 800);
        }
    }, 9500);
});