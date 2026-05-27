let bookStep = 0;

// 1. Логика перелистывания книги (сохранена полностью)
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

// 2. Объединенная Матричная и Частичная анимация
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // ГАРАНТИРОВАННО УБИРАЕМ СТАТИЧНЫЕ HTML ЦИФРЫ И ТЕКСТ, ЧТОБЫ НЕ БЫЛО ДУБЛИКАТОВ
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) countdownElement.style.display = 'none';
    const targetTextElement = document.getElementById('matrix-text');
    if (targetTextElement) targetTextElement.style.display = 'none';

    // --- НАСТРОЙКИ МАТРИЧНОГО ДОЖДЯ (ЗАДНИЙ ФОН) ---
    const matrixMessage = "HAPPY BIRTHDAY TO MALAKHAT ";
    const matrixFontSize = 16;
    let columns = Math.floor(canvas.width / matrixFontSize);
    let drops = [];
    
    function initMatrix() {
        columns = Math.floor(canvas.width / matrixFontSize);
        drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = Math.random() * -100;
        }
    }
    initMatrix();
    window.addEventListener('resize', initMatrix);

    // --- НАСТРОЙКИ СВЕТЯЩИХСЯ ЧАСТИЦ (СОБИРАЮЩИЙСЯ ТЕКСТ) ---
    let particles = [];
    const particleColors = ["#db2777", "#f43f5e", "#ec4899", "#f472b6"]; // Праздничные розовые оттенки

    class Particle {
        constructor(x, y) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.targetX = x;
            this.targetY = y;
            this.vx = 0;
            this.vy = 0;
            this.size = Math.random() * 2 + 1.8; 
            this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
            this.friction = 0.83; // Плавность торможения
            this.spring = 0.06;   // Сила притяжения к буквам
        }

        update() {
            let dx = this.targetX - this.x;
            let dy = this.targetY - this.y;
            
            this.vx += dx * this.spring;
            this.vy += dy * this.spring;
            this.vx *= this.friction;
            this.vy *= this.friction;
            
            this.x += this.vx;
            this.y += this.vy;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Сканирование шрифта на виртуальном холсте (чтобы дождь не мешал координатам точек)
    function createTextParticles(text, fontSize) {
        const memCanvas = document.createElement('canvas');
        memCanvas.width = canvas.width;
        memCanvas.height = canvas.height;
        const memCtx = memCanvas.getContext('2d');
        
        memCtx.fillStyle = "white";
        memCtx.font = `bold ${fontSize}px sans-serif`;
        memCtx.textAlign = "center";
        memCtx.textBaseline = "middle";
        
        // Поддержка переноса строк для красивого отображения на смартфонах
        const lines = text.split('\n');
        const lineHeight = fontSize * 1.2;
        const startY = memCanvas.height / 2 - ((lines.length - 1) * lineHeight) / 2;
        
        lines.forEach((line, index) => {
            memCtx.fillText(line, memCanvas.width / 2, startY + index * lineHeight);
        });
        
        const data = memCtx.getImageData(0, 0, memCanvas.width, memCanvas.height).data;
        const targets = [];
        const gap = window.innerWidth < 600 ? 5 : 7; // Плотность точек
        
        for (let y = 0; y < memCanvas.height; y += gap) {
            for (let x = 0; x < memCanvas.width; x += gap) {
                const index = (y * memCanvas.width + x) * 4;
                if (data[index + 3] > 128) {
                    targets.push({ x: x, y: y });
                }
            }
        }
        
        // Перемешивание точек для эффекта хаотичной сборки
        for (let i = targets.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [targets[i], targets[j]] = [targets[j], targets[i]];
        }
        
        if (particles.length < targets.length) {
            while (particles.length < targets.length) {
                particles.push(new Particle(canvas.width / 2, canvas.height / 2));
            }
        }
        
        for (let i = 0; i < particles.length; i++) {
            if (i < targets.length) {
                particles[i].targetX = targets[i].x;
                particles[i].targetY = targets[i].y;
            } else {
                // Лишние частицы красиво улетают во все стороны за экран
                particles[i].targetX = (Math.random() - 0.5) * canvas.width * 3 + canvas.width / 2;
                particles[i].targetY = (Math.random() - 0.5) * canvas.height * 3 + canvas.height / 2;
            }
        }
    }

    // ЕДИНЫЙ ЦИКЛ ОТРИСОВКИ СЦЕНЫ
    function loop() {
        // Создаем шлейф для матрицы
        ctx.fillStyle = "rgba(0, 0, 0, 0.08)"; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 1. Отрисовка фонового матричного дождя
        ctx.fillStyle = "rgba(219, 39, 119, 0.3)"; // Полупрозрачный розовый для кода матрицы
        ctx.font = matrixFontSize + "px monospace";
        for (let i = 0; i < drops.length; i++) {
            const charIndex = Math.floor(drops[i]) % matrixMessage.length;
            const safeCharIndex = charIndex < 0 ? 0 : charIndex;
            const text = matrixMessage.charAt(safeCharIndex);
            ctx.fillText(text, i * matrixFontSize, drops[i] * matrixFontSize);

            if (drops[i] * matrixFontSize > canvas.height && Math.random() > 0.98) {
                drops[i] = 0;
            }
            drops[i] += 0.8; // Скорость падения букв матрицы
        }

        // 2. Отрисовка и обновление собирающихся частиц текста поверх матрицы
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }

        requestAnimationFrame(loop);
    }

    loop();

    // ПОСЛЕДОВАТЕЛЬНОСТЬ И РАЗМЕРЫ БУКВ ДЛЯ СБОРКИ
    const sequence = [
        { text: "3", size: 300 },
        { text: "2", size: 300 },
        { text: "1", size: 300 },
        { text: "HAPPY", size: 130 },
        { text: "BIRTHDAY", size: 110 },
        { text: "TO\nMALAKHAT", size: 100 } // \n автоматически перенесет имя на мобильных
    ];
    
    let currentIdx = 0;

    function runSequence() {
        if (currentIdx < sequence.length) {
            let item = sequence[currentIdx];
            let fontSize = item.size;
            
            // Адаптируем крупный шрифт под мобильные дисплеи
            if (window.innerWidth < 600) {
                fontSize = fontSize * 0.55; 
            }
            
            createTextParticles(item.text, fontSize);
            currentIdx++;
            setTimeout(runSequence, 1700); // Интервал смены слов (1.7 секунды)
        } else {
            // Плавное переключение экрана на интерактивную книгу в конце поздравления
            setTimeout(() => {
                const matrixScreen = document.getElementById('matrix-screen');
                const galleryScreen = document.getElementById('gallery-screen');
                
                if (matrixScreen && galleryScreen) {
                    matrixScreen.style.display = 'none';
                    galleryScreen.classList.replace('hidden', 'active');
                }
            }, 1200);
        }
    }

    // Запускаем сборку букв из точек спустя мгновение после старта
    setTimeout(runSequence, 200);
});