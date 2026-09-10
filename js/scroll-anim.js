document.addEventListener("DOMContentLoaded", function () {
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15 // Animasi akan triggered saat 15% elemen terlihat di layar
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Jika ingin animasi hanya terjadi sekali saat pertama di-scroll, uncomment baris bawah:
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Daftarkan semua elemen yang memiliki kelas .scroll-animate
    const animatedElements = document.querySelectorAll(".scroll-animate");
    animatedElements.forEach(el => observer.observe(el));
});