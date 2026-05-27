let bookStep = 0;

// 1. Логика перелистывания книги (сохранена полностью без изменений)
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

// 2. Элегантная и плавная анимация появления текста (Без матрицы и точек)
document.addEventListener('DOMContentLoaded', () => {
    // Полностью скрываем холст матрицы, чтобы его не было видно
    const canvas = document.getElementById('matrix-canvas');
    if (canvas) {
        canvas.style.display = 'none';
    }

    // Скрываем старый блок отсчета, чтобы избежать зависания цифры 3
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        countdownElement.style.display = 'none';
    }

    // Настраиваем главный текстовый блок для плавных переходов
    const matrixText = document.getElementById('matrix-text');
    if (!matrixText) return;

    // Сбрасываем старые классы скрытия и готовим элемент к анимации через CSS
    matrixText.classList.remove('hidden');
    matrixText.style.display = 'block';
    matrixText.style.opacity = '0';
    matrixText.style.transform = 'scale(0.92)';
    matrixText.style.transition = 'opacity 700ms ease-in-out, transform 700ms ease-in-out';
    matrixText.style.color = '#db2777'; // Красивый благородный розовый цвет
    matrixText.style.textShadow = '0 0 25px rgba(219, 39, 119, 0.4)'; // Мягкое неоновое свечение букв
    matrixText.style.fontFamily = 'sans-serif';
    matrixText.style.fontWeight = 'bold';
    matrixText.style.textAlign = 'center';

    // Функция для плавной смены фраз
    function changeTextSmoothly(htmlContent, baseFontSize) {
        // Шаг 1: Плавно гасим текущий текст и слегка уменьшаем его
        matrixText.style.opacity = '0';
        matrixText.style.transform = 'scale(0.92)';
        
        // Шаг 2: В момент когда текст невидим — меняем содержимое и размер
        setTimeout(() => {
            matrixText.innerHTML = htmlContent;
            
            // Адаптируем размер шрифта под мобильные экраны телефонов
            let finalSize = baseFontSize;
            if (window.innerWidth < 600) {
                finalSize = Math.round(baseFontSize * 0.6); // На смартфонах текст будет аккуратнее
            }
            matrixText.style.fontSize = finalSize + 'px';
            
            // Шаг 3: Плавно проявляем новый текст с красивым приближением
            matrixText.style.opacity = '1';
            matrixText.style.transform = 'scale(1)';
        }, 700); // Время на исчезновение текста
    }

    // Последовательность появления текста (Текст, Размер шрифта в пикселях)
    const sequence = [
        { text: "3", size: 180 },
        { text: "2", size: 180 },
        { text: "1", size: 180 },
        { text: "HAPPY", size: 90 },
        { text: "BIRTHDAY", size: 90 },
        { text: "TO<br>MALAKHAT", size: 75 } // Тег <br> перенесет имя на новую строку для красоты
    ];

    let currentStep = 0;

    function runAnimationSequence() {
        if (currentStep < sequence.length) {
            const currentItem = sequence[currentStep];
            changeTextSmoothly(currentItem.text, currentItem.size);
            currentStep++;
            
            // Каждое слово задерживается на экране перед следующим переходом
            // Для цифр сделаем чуть быстрее (1.6 сек), для длинных слов чуть дольше (2.2 сек)
            let displayDuration = currentStep <= 3 ? 1600 : 2200; 
            setTimeout(runAnimationSequence, displayDuration);
        } else {
            // Когда поздравление закончилось, плавно гасим текст и переходим к книге
            matrixText.style.opacity = '0';
            matrixText.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                const matrixScreen = document.getElementById('matrix-screen');
                const galleryScreen = document.getElementById('gallery-screen');
                
                if (matrixScreen && galleryScreen) {
                    matrixScreen.style.display = 'none';
                    galleryScreen.classList.replace('hidden', 'active');
                }
            }, 800);
        }
    }

    // Запускаем красивый цикл анимации через долю секунды после загрузки
    setTimeout(runAnimationSequence, 300);
});