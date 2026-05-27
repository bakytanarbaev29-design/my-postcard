let bookStep = 0;

// Логика перелистывания книги
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

    const matrixMessage = "HAPPY BIRTHDAY TO MALAKHAT ";
    const fontSize = 17;
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

    // --- УЛУЧШЕННАЯ ЛОГИКА ТЕКСТА И ОТСЧЕТА ---
    const countdownElement = document.getElementById('countdown');
    const targetTextElement = document.getElementById('matrix-text');

    // Функция, которая делает текст красивым, светящимся и адаптивным
    const applyBeautifulStyle = (el, size) => {
        if (!el) return;
        el.style.transition = "opacity 0.4s ease-in-out, transform 0.4s ease-in-out";
        el.style.color = "#db2777"; // Розовый текст для идеальной читаемости
        el.style.textShadow = "0 0 15px #db2777, 0 0 30px #db2777"; // Красивое розовое свечение
        el.style.fontFamily = "sans-serif";
        el.style.fontWeight = "900";
        el.style.textAlign = "center";
        
        // Уменьшаем текст на мобильных, чтобы он не вылезал за края
        let finalSize = window.innerWidth < 600 ? size * 0.5 : size;
        el.style.fontSize = finalSize + "px";
    };

    // Функция для плавной смены текста с эффектом затухания и увеличения
    const changeTextSmoothly = (el, newText, size) => {
        if (!el) return;
        el.style.opacity = "0";
        el.style.transform = "scale(0.8)"; // Текст слегка уменьшается при исчезновении
        
        setTimeout(() => {
            el.innerHTML = newText;
            applyBeautifulStyle(el, size);
            el.style.opacity = "1";
            el.style.transform = "scale(1)"; // Текст красиво приближается при появлении
        }, 400); // 0.4 секунды на анимацию затухания
    };

    // 1. Изначально настраиваем и показываем цифру 3
    if (countdownElement) {
        countdownElement.innerText = "3";
        applyBeautifulStyle(countdownElement, 180);
        countdownElement.style.opacity = "1";
        countdownElement.style.transform = "scale(1)";
    }
    
    // Прячем основной текстовый блок в самом начале
    if (targetTextElement) {
        targetTextElement.classList.add('hidden');
    }

    // 2. Последовательность анимаций (Тайминги)
    setTimeout(() => changeTextSmoothly(countdownElement, "2", 180), 1000);
    setTimeout(() => changeTextSmoothly(countdownElement, "1", 180), 2000);

    setTimeout(() => {
        // Убираем цифры отсчета
        if (countdownElement) countdownElement.style.display = 'none';
        
        // Показываем текстовый блок и запускаем первое слово
        if (targetTextElement) {
            targetTextElement.classList.remove('hidden');
            targetTextElement.style.opacity = "0"; 
            changeTextSmoothly(targetTextElement, "H A P P Y", 100);
        }
    }, 3000);

    setTimeout(() => changeTextSmoothly(targetTextElement, "B I R T H D A Y", 100), 4500);
    setTimeout(() => changeTextSmoothly(targetTextElement, "T O", 100), 6000);
    setTimeout(() => changeTextSmoothly(targetTextElement, "M A L A K H A T", 100), 7500);

    // 3. Плавный переход к книге через 9.5 секунд
    setTimeout(() => {
        clearInterval(matrixInterval);
        const matrixScreen = document.getElementById('matrix-screen');
        const galleryScreen = document.getElementById('gallery-screen');
        
        if (matrixScreen && galleryScreen) {
            // Плавно растворяем матрицу перед переходом
            matrixScreen.style.transition = "opacity 0.8s ease-in-out";
            matrixScreen.style.opacity = "0";
            
            setTimeout(() => {
                matrixScreen.style.display = 'none';
                galleryScreen.classList.replace('hidden', 'active');
            }, 800);
        }
    }, 9500);
});