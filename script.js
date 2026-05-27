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

// 2. Анимация светящихся частиц (отсчет и поздравление)
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    let particles = [];
    let animationFrameId;
    
    // Праздничные розовые цвета для точек
    const colors = ["#db2777", "#f43f5e", "#ec4899", "#f472b6"];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Класс точки с физикой плавного перетекания
    class Particle {
        constructor(x, y) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.targetX = x;
            this.targetY = y;
            this.vx = 0;
            this.vy = 0;
            this.size = Math.random() * 2 + 1.5; 
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.friction = 0.82; 
            this.spring = 0.06;   
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

    // Сканирование слова и перевод его в точки
    function createTextParticles(text, fontSize) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "white";
        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);
        
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const targets = [];
        const gap = window.innerWidth < 600 ? 6 : 8; 
        
        for (let y = 0; y < canvas.height; y += gap) {
            for (let x = 0; x < canvas.width; x += gap) {
                const index = (y * canvas.width + x) * 4;
                if (data[index + 3] > 128) {
                    targets.push({ x: x, y: y });
                }
            }
        }
        
        // Перемешивание, чтобы точки разлетались красиво
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
                // Лишние точки улетают за экран
                particles[i].targetX = (Math.random() - 0.5) * canvas.width * 2 + canvas.width / 2;
                particles[i].targetY = (Math.random() - 0.5) * canvas.height * 2 + canvas.height / 2;
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        animationFrameId = requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // ПОЛНАЯ ПОСЛЕДОВАТЕЛЬНОСТЬ СЛОВ И ИХ РАЗМЕРЫ:
    const sequence = [
        { text: "3", size: 320 },
        { text: "2", size: 320 },
        { text: "1", size: 320 },
        { text: "HAPPY", size: 320 },
        { text: "BIRTHDAY", size: 320 },
        { text: "TO", size: 320 },
        { text: "MALAKHAT", size: 320 }
    ];
    
    let currentIdx = 0;

    function runSequence() {
        if (currentIdx < sequence.length) {
            let item = sequence[currentIdx];
            let fontSize = item.size;
            
            // Адаптация размеров букв под экраны смартфонов
            if (window.innerWidth < 600) {
                fontSize = fontSize * 0.55; 
            }
            
            createTextParticles(item.text, fontSize);
            currentIdx++;
            
            // Скорость смены слов (1600 миллисекунд = 1.6 секунды на слово)
            setTimeout(runSequence, 1600);
        } else {
            // Конец анимации текста: переходим к книге с фотографиями
            setTimeout(() => {
                cancelAnimationFrame(animationFrameId);
                const matrixScreen = document.getElementById('matrix-screen');
                const galleryScreen = document.getElementById('gallery-screen');
                
                if (matrixScreen && galleryScreen) {
                    matrixScreen.style.display = 'none';
                    galleryScreen.classList.replace('hidden', 'active');
                }
            }, 1200);
        }
    }

    // Запуск показа через 0.5 секунды после открытия сайта
    setTimeout(runSequence, 500);
});