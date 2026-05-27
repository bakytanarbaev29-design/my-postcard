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

    // Логика отсчета и смены текста
    const countdownElement = document.getElementById('countdown');
    const targetTextElement = document.getElementById('matrix-text');
    let count = 3;

    const countdownInterval = setInterval(() => {
        count--;
        if (count > 0) {
            if (countdownElement) countdownElement.innerText = count;
        } else {
            // Отсчет окончен
            clearInterval(countdownInterval);
            if (countdownElement) countdownElement.classList.add('hidden');
            if (targetTextElement) targetTextElement.classList.remove('hidden');

            // Запускаем смену слов
            setTimeout(() => {
                if (targetTextElement) targetTextElement.innerHTML = "B I R T H D A Y";
            }, 2000);

            setTimeout(() => {
                if (targetTextElement) targetTextElement.innerHTML = "T O<br>M A L A K H A T";
            }, 4000);

            // Переход к книге
            setTimeout(() => {
                clearInterval(matrixInterval);
                const matrixScreen = document.getElementById('matrix-screen');
                const galleryScreen = document.getElementById('gallery-screen');
                
                if (matrixScreen && galleryScreen) {
                    matrixScreen.style.display = 'none';
                    galleryScreen.classList.replace('hidden', 'active');
                }
            }, 6500);
        }
    }, 1000);
});
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
let text = "3"; // Ваша цифра или текст

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function drawDots(text) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "bold 300px Arial"; // Размер шрифта для расчета
    ctx.textAlign = "center";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const gridSize = 10; // Размер шага (меньше = четче, но тяжелее)
    for (let y = 0; y < canvas.height; y += gridSize) {
        for (let x = 0; x < canvas.width; x += gridSize) {
            const index = (y * canvas.width + x) * 4;
            if (data[index + 3] > 128) { // Если пиксель виден
                ctx.beginPath();
                ctx.arc(x, y, 3, 0, Math.PI * 2); // Рисуем кружок
                ctx.fillStyle = "#ff1447"; // Ваш розовый цвет
                ctx.fill();
            }
        }
    }
}

// Запуск анимации
drawDots("3");