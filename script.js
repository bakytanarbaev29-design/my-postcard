const canvas = document.getElementById('matrix-canvas');
// willReadFrequently убирает предупреждения браузера при частом чтении пикселей
const ctx = canvas.getContext('2d', { willReadFrequently: true });

let particles = [];
// Розово-красные оттенки как в оригинале
const colors = ['#ff1447', '#ff4d79', '#ff8da1']; 

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Класс для каждой точки (частицы)
class Particle {
    constructor(targetX, targetY) {
        // Точки появляются случайным образом за пределами/на краях экрана
        this.x = (Math.random() - 0.5) * canvas.width * 2 + canvas.width / 2;
        this.y = (Math.random() - 0.5) * canvas.height * 2 + canvas.height / 2;
        this.targetX = targetX;
        this.targetY = targetY;
        this.size = Math.random() * 2 + 2; // Размер точек (от 2 до 4 пикселей)
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        this.vx = 0;
        this.vy = 0;
        this.friction = 0.85; // Насколько плавно они тормозят
        this.springFactor = 0.08; // Скорость притяжения к цели
    }

    update() {
        let dx = this.targetX - this.x;
        let dy = this.targetY - this.y;
        
        // Пружинная физика (притяжение к нужной позиции)
        this.vx += dx * this.springFactor;
        this.vy += dy * this.springFactor;
        
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

// Функция, которая читает текст и превращает его в координаты для точек
function createTextParticles(text, fontSize) {
    particles = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "white";
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const gap = 9; // Расстояние между точками (чем меньше цифра, тем плотнее)
    
    for (let y = 0; y < canvas.height; y += gap) {
        for (let x = 0; x < canvas.width; x += gap) {
            const index = (y * canvas.width + x) * 4;
            // Если пиксель непрозрачный — создаем там точку
            if (data[index + 3] > 128) {
                particles.push(new Particle(x, y));
            }
        }
    }
}

// Главный цикл анимации
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    
    requestAnimationFrame(animate);
}

// Запускаем отрисовку
animate();

// --- ЛОГИКА ОТСЧЕТА И ТЕКСТА ---
const sequence = ["3", "2", "1", "I LOVE YOU"]; // Ваш текст
let currentIndex = 0;

function runSequence() {
    if (currentIndex < sequence.length) {
        let currentText = sequence[currentIndex];
        
        // Цифры делаем огромными, а текст — поменьше, чтобы влез
        let fontSize = currentIndex === sequence.length - 1 ? 120 : 350; 
        
        // Адаптация под телефоны
        if (window.innerWidth < 600) {
            fontSize = fontSize / 2; 
        }

        createTextParticles(currentText, fontSize);
        currentIndex++;
        
        // Время задержки перед следующей цифрой/словом (1500 мс = 1.5 сек)
        setTimeout(runSequence, 1500);
    } else {
        // Когда анимация закончилась, через 2 секунды очищаем экран
        setTimeout(() => {
            particles = []; // Точки исчезнут
            
            // Здесь будет логика для показа вашей открытки/книги с фото
            console.log("Анимация завершена, показываем фото!");
            // document.getElementById('matrix-screen').style.display = 'none';
            // document.getElementById('gallery-screen').classList.add('active');
            
        }, 2000);
    }
}

// Запускаем секвенцию через 0.5 секунды после загрузки
setTimeout(runSequence, 500);