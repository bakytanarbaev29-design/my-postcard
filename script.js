// Обновленный массив с вашими новыми названиями фото
const photos = [
    "images/1.jpg",
    "images/2.jpg",
    "images/3.jpg",
    "images/4.jpg"
];

let currentPhotoIndex = 0;

// Убираем заставку через 4 секунды и показываем галерею
setTimeout(() => {
    document.getElementById('intro-screen').classList.replace('active', 'hidden');
    document.getElementById('gallery-screen').classList.replace('hidden', 'active');
}, 4000);

// Функция перелистывания фото по клику
function nextPhoto() {
    currentPhotoIndex++;
    
    if (currentPhotoIndex < photos.length) {
        // Показываем следующее фото
        document.getElementById('main-photo').src = photos[currentPhotoIndex];
    } else {
        // Если фото закончились, переходим к финальному коллажу-сердцу
        document.getElementById('gallery-screen').classList.replace('active', 'hidden');
        document.getElementById('heart-screen').classList.replace('hidden', 'active');
    }
}