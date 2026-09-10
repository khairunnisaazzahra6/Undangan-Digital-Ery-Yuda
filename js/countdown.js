// Pengaturan Hitung Mundur Acara (04 Oktober 2026)
const weddingDate = new Date('October 04, 2026 09:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance > 0) {
        document.getElementById('days').innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
        document.getElementById('hours').innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById('minutes').innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById('seconds').innerText = Math.floor((distance % (1000 * 60)) / 1000);
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();