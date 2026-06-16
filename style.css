/* ОБЩИЕ СТИЛИ */
body, html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background-color: #000000;
    font-family: 'Arial', sans-serif;
    overflow: hidden;
    -webkit-tap-highlight-color: transparent;
}

/* КНОПКА МУЗЫКИ */
#music-toggle {
    position: fixed;
    top: 20px;
    right: 20px;
    width: 45px;
    height: 45px;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(5px);
    border: 2px solid #db2777;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 9999;
    box-shadow: 0 0 10px #db2777;
    transition: all 0.3s ease;
    user-select: none;
}

#music-toggle:hover {
    transform: scale(1.1);
    box-shadow: 0 0 20px #db2777, inset 0 0 10px #db2777;
}

#music-toggle.playing {
    animation: musicPulse 1.5s infinite alternate;
    border-color: #ffb6c1;
    box-shadow: 0 0 15px #ffb6c1;
}

#music-toggle.muted {
    border-color: #555555;
    box-shadow: none;
    opacity: 0.6;
}

@keyframes musicPulse {
    0% { transform: scale(1); }
    100% { transform: scale(1.08); box-shadow: 0 0 25px #db2777; }
}

.music-icon { font-size: 20px; }

/* ФОН СО ЗВЕЗДАМИ */
#stars-bg {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    z-index: 0;
    background-color: #000000;
}

.stars-layer { position: absolute; top: 0; left: 0; right: 0; bottom: 0; }

.stars-1 {
    background-image: 
        radial-gradient(3px 3px at 20px 30px, #ffffff, rgba(0,0,0,0)),
        radial-gradient(3px 3px at 80px 70px, #ffffff, rgba(0,0,0,0)),
        radial-gradient(4px 4px at 150px 160px, #ffffff, rgba(0,0,0,0)),
        radial-gradient(2px 2px at 210px 40px, #ffffff, rgba(0,0,0,0));
    background-size: 250px 250px;
    animation: twinkle 4s infinite ease-in-out alternate;
}

.stars-2 {
    background-image: 
        radial-gradient(4px 4px at 50px 120px, #ffebf0, rgba(0,0,0,0)),
        radial-gradient(2px 2px at 120px 220px, #ffffff, rgba(0,0,0,0)),
        radial-gradient(3px 3px at 200px 90px, #ffffff, rgba(0,0,0,0)),
        radial-gradient(5px 5px at 280px 180px, #ffd1dc, rgba(0,0,0,0));
    background-size: 320px 320px;
    animation: twinkle 3s infinite ease-in-out alternate-reverse;
}

.stars-3 {
    background-image: 
        radial-gradient(2px 2px at 30px 280px, #ffffff, rgba(0,0,0,0)),
        radial-gradient(4px 4px at 170px 270px, #ffffff, rgba(0,0,0,0)),
        radial-gradient(3px 3px at 290px 40px, #ffffff, rgba(0,0,0,0));
    background-size: 350px 350px;
    animation: twinkle 5s infinite ease-in-out alternate;
}

@keyframes twinkle {
    0% { opacity: 0.2; transform: scale(1); }
    100% { opacity: 1; transform: scale(1.1); }
}

.screen {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    display: flex; flex-direction: column; justify-content: center; align-items: center;
    transition: opacity 0.8s ease-in-out;
}

.hidden { display: none !important; }
.active { opacity: 1 !important; z-index: 10 !important; }

/* ЭКРАН 1: МАТРИЦА И ТОЧЕЧНЫЙ ОТСЧЕТ */
#matrix-screen { background-color: transparent; }
#matrix-canvas { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; }
#matrix-content { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; justify-content: center; }

#countdown {
    font-family: 'Impact', 'Arial Black', sans-serif;
    font-size: 16rem; 
    font-weight: bold;
    text-align: center;
}

#matrix-text {
    font-family: 'Impact', 'Arial Black', sans-serif;
    font-size: 6rem;
    font-weight: bold;
    text-align: center;
    letter-spacing: 10px;
    line-height: 1.2;
}

/* ЭКРАН 2: ИНТЕРАКТИВНАЯ КНИГА */
#gallery-screen { background-color: transparent; }

.book-container {
    width: 500px; height: 380px; position: relative; perspective: 1600px;
    display: flex; justify-content: center; align-items: center; z-index: 5;
}

.book {
    width: 250px; height: 100%; position: absolute; right: 0;
    transform-style: preserve-3d; transition: transform 0.8s ease-in-out; transform-origin: left center;
}

.book.opened { transform: translateX(-50%); }

.page {
    width: 100%; height: 100%; position: absolute; top: 0; left: 0;
    transform-origin: left center; transform-style: preserve-3d;
    transition: transform 1.8s cubic-bezier(0.4, 0, 0.2, 1) !important;
    z-index: 5; cursor: pointer;
}

.page .front, .page .back {
    position: absolute; width: 100%; height: 100%; backface-visibility: hidden;
    background: #ffffff; box-shadow: inset 4px 0 10px rgba(0,0,0,0.05), 0 0 20px rgba(255, 255, 255, 0.2);
    padding: 10px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between;
}

.page .front { border-radius: 0 12px 12px 0; }
.page .back { transform: rotateY(180deg); border-radius: 12px 0 0 12px; }

.page-content { width: 100%; height: 85%; overflow: hidden; background: #fafafa; border-radius: 6px; }
.page img { width: 100%; height: 100%; object-fit: contain; }

/* СТИЛЬ ПИШУЩЕЙ МАШИНКИ */
.page-footer { 
    font-family: 'Courier New', Courier, monospace !important; font-size: 14px; font-weight: bold; 
    color: #db2777; text-align: center; min-height: 3.5em; white-space: pre-wrap; 
    display: flex; align-items: center; justify-content: center;
}

#p1 { z-index: 3; }
#p2 { z-index: 2; }
#p1.flipped { transform: rotateY(-180deg); z-index: 2; }
#p2.flipped { transform: rotateY(-180deg); z-index: 3; }

/* ЭКРАН 3: ПУСТОЕ СЕРДЦЕ */
#heart-screen { background-color: transparent; overflow: hidden; position: relative; }

.glow-text {
    color: #ffffff; margin-bottom: 40px; font-size: 2rem; text-align: center; font-weight: bold; z-index: 2;
    text-shadow: 0 0 10px rgba(219, 39, 119, 0.8), 0 0 20px rgba(219, 39, 119, 0.5);
}

.heart-wrap {
    position: relative; width: 340px; height: 360px; z-index: 2; transform: scale(1.4);
    animation: finalHeartBeat 2s infinite ease-in-out 3.5s; 
}

.photo-cell {
    position: absolute; width: 50px; height: 50px; background: #000000; border-radius: 8px; box-sizing: border-box;
    border: 2px solid #ffffff; box-shadow: 0 0 15px rgba(255, 255, 255, 0.3); opacity: 0; transform: scale(0);
    animation: popInPhoto 0.5s ease-out forwards;
}

.photo-cell img { width: 100%; height: 100%; object-fit: cover; border-radius: 5px; }

.p1  { left: 145px; top: 60px;  animation-delay: 0.5s;  } 
.p2  { left: 195px; top: 30px;  animation-delay: 0.65s; } 
.p3  { left: 250px; top: 40px;  animation-delay: 0.8s;  }
.p4  { left: 290px; top: 85px;  animation-delay: 0.95s; }
.p5  { left: 290px; top: 140px; animation-delay: 1.1s;  } 
.p6  { left: 260px; top: 190px; animation-delay: 1.25s; }
.p7  { left: 220px; top: 235px; animation-delay: 1.4s;  }
.p8  { left: 180px; top: 275px; animation-delay: 1.55s; }
.p9  { left: 145px; top: 310px; animation-delay: 1.7s;  } 
.p10 { left: 110px; top: 275px; animation-delay: 1.85s; }
.p11 { left: 70px;  top: 235px; animation-delay: 2.0s;  }
.p12 { left: 30px;  top: 190px; animation-delay: 2.15s; }
.p13 { left: 0px;   top: 140px; animation-delay: 2.3s;  } 
.p14 { left: 0px;   top: 85px;  animation-delay: 2.45s; }
.p15 { left: 40px;  top: 40px;  animation-delay: 2.6s;  }
.p16 { left: 95px;  top: 30px;  animation-delay: 2.75s; } 

@keyframes popInPhoto {
    0% { opacity: 0; transform: scale(0) translateY(20px); }
    60% { opacity: 1; transform: scale(1.1) translateY(-5px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
}

@keyframes finalHeartBeat {
    0% { transform: scale(1.4); }
    50% { transform: scale(1.45); }
    100% { transform: scale(1.4); }
}

@media (max-width: 520px) {
    .book-container { width: 90vw; height: 65vw; }
    .book { width: 45vw; }
    .heart-wrap { transform: scale(1); }
    @keyframes finalHeartBeat { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
}