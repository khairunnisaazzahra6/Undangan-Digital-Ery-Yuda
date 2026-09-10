let isOpened = false;

// Fungsi Utama Membuka Undangan
function openInvitation() {
    if (isOpened) return;
    isOpened = true;

    // Tambahkan class gate-opened agar kipas terbuka dan animasi mulai
    document.body.classList.remove('gate-closed');
    document.body.classList.add('gate-opened');

    // Sembunyikan cover
    const cover = document.getElementById('cover');
    if (cover) {
        cover.classList.add('hidden');
    }

    // Putar musik latar dan aktifkan animasi ikon
    const bgMusic = document.getElementById('bgMusic');
    const musicIcon = document.getElementById('musicIcon');
    if (bgMusic) {
        bgMusic.play().then(() => {
            if (musicIcon) {
                musicIcon.className = "fa-solid fa-compact-disc fa-spin";
            }
        }).catch(err => {
            console.log("Autoplay dicegah browser:", err);
            if (musicIcon) {
                musicIcon.className = "fa-solid fa-volume-xmark";
            }
        });
    }
}

// Kontrol Tombol Musik (Play/Pause manual saat diklik)
document.addEventListener("DOMContentLoaded", function() {
    const musicBtn = document.getElementById("music-btn");
    const bgMusic = document.getElementById("bgMusic");
    const musicIcon = document.getElementById("musicIcon");

    if (musicBtn && bgMusic) {
        musicBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            if (bgMusic.paused) {
                bgMusic.play().then(() => {
                    if (musicIcon) {
                        // Ubah jadi piringan hitam & berputar
                        musicIcon.className = "fa-solid fa-compact-disc fa-spin";
                    }
                }).catch(err => console.log("Gagal memutar musik:", err));
            } else {
                bgMusic.pause();
                if (musicIcon) {
                    // Ubah jadi ikon mute / berhenti
                    musicIcon.className = "fa-solid fa-volume-xmark";
                }
            }
        });
    }
});

// Auto-open jika tamu tidak klik manual setelah beberapa detik
window.addEventListener('DOMContentLoaded', () => {
    document.body.classList.remove('gate-opened');

    setTimeout(() => {
        if (!isOpened) {
            openInvitation();
        }
    }, 5000); 
});

// --- SKRIP ANIMASI MUNCUL SAAT DI-SCROLL ---
document.addEventListener("DOMContentLoaded", function() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                // Berhenti mengamati setelah animasi muncul sekali
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleksi elemen spesifik yang ingin dianimasikannya (Judul, Card, Teks, Gambar)
    const elementsToAnimate = document.querySelectorAll('.section-title, .event-card, .couple-img, .countdown-grid, .hero-content, p, h2, h3');
    
    elementsToAnimate.forEach(el => {
        // Pastikan elemen di dalam cover atau navbar tidak ikut terpengaruh animasi scroll ini
        if (!el.closest('#cover') && !el.classList.contains('floating-nav') && !el.classList.contains('music-btn')) {
            el.classList.add('fade-in-up');
            observer.observe(el);
        }
    });
});

// --- GENERATOR PARTIKEL KILAU EMAS ---
document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('goldDustContainer');
    if (!container) return;

    const sparkleCount = 25; // Jumlah partikel yang turun bersamaan

    for (let i = 0; i < sparkleCount; i++) {
        createSparkle(container);
    }

    function createSparkle(parent) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');

        // Ukuran acak partikel (antara 3px sampai 7px)
        const size = Math.random() * 4 + 3;
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;

        // Posisi horizontal awal acak
        sparkle.style.left = `${Math.random() * 100}vw`;

        // Durasi jatuh acak (antara 5 sampai 10 detik biar pelan dan anggun)
        const duration = Math.random() * 5 + 5;
        sparkle.style.animationDuration = `${duration}s`;

        // Delay acak agar jatuhnya tidak barengan
        const delay = Math.random() * 5;
        sparkle.style.animationDelay = `${delay}s`;

        parent.appendChild(sparkle);

        // Reset partikel setelah animasi selesai agar terus berulang
        sparkle.addEventListener('animationiteration', () => {
            sparkle.style.left = `${Math.random() * 100}vw`;
            sparkle.style.animationDuration = `${Math.random() * 5 + 5}s`;
        });
    }
});

// --- OTOMATIS ISI NAMA TAMU DARI URL ---
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to');
    
    if (guestName) {
        const guestElement = document.getElementById('guest-name');
        if (guestElement) {
            guestElement.textContent = guestName;
        }
    }
});