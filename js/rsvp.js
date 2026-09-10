document.addEventListener("DOMContentLoaded", function () {
    // Ganti URL di bawah ini dengan URL SheetDB kamu yang sebenarnya
    const SHEET_API_URL = "https://sheetdb.io/api/v1/pjkrc3352wbyb"; 

    const rsvpForm = document.getElementById("rsvp-form");
    const wishesList = document.getElementById("wishes-list");
    const wishCount = document.getElementById("wish-count");

    if (rsvpForm) {
        rsvpForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value;
            const message = document.getElementById("message").value;
            const attendance = document.querySelector('input[name="attendance"]:checked').value;
            
            // Format tanggal saat ini
            const now = new Date();
            const tanggal = now.toLocaleString("id-ID", { 
                dateStyle: "medium", 
                timeStyle: "short" 
            });

            // Data yang dikirim harus cocok persis dengan header di Google Sheets: nama, status, ucapan, tanggal
            const formData = {
                nama: name,
                status: attendance,
                ucapan: message,
                tanggal: tanggal
            };

            // Mengirim data ke SheetDB
            fetch(SHEET_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ data: formData })
            })
            .then(response => response.json())
            .then(data => {
                alert("Terima kasih, ucapan & konfirmasi kehadiran berhasil dikirim!");
                rsvpForm.reset();
                loadWishes(); // Refresh daftar ucapan
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Gagal mengirim data. Periksa kembali koneksi atau URL SheetDB Anda.");
            });
        });
    }

    function loadWishes() {
        if (!wishesList) return;

        fetch(SHEET_API_URL)
            .then(response => response.json())
            .then(data => {
                wishesList.innerHTML = "";
                if (wishCount) {
                    wishCount.textContent = data.length;
                }

                if (data.length === 0) {
                    wishesList.innerHTML = `<p style="text-align: center; color: #888; font-size: 0.8rem;">Belum ada ucapan.</p>`;
                    return;
                }

                // Tampilkan data terbaru di atas
                data.reverse().forEach(row => {
                    const wishCard = document.createElement("div");
                    wishCard.style.cssText = "background: #fff; border: 1px solid #d4c5b9; border-radius: 8px; padding: 10px 12px; margin-bottom: 10px; text-align: left; box-shadow: 0 2px 5px rgba(0,0,0,0.05);";
                    
                    const badgeColor = row.status === "Hadir" ? "#28a745" : "#dc3545";

                    wishCard.innerHTML = `
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                            <span style="font-weight: bold; font-size: 0.8rem; color: var(--primary-color);">${row.nama || "Tanpa Nama"}</span>
                            <span style="font-size: 0.65rem; background: ${badgeColor}; color: #fff; padding: 2px 6px; border-radius: 4px;">${row.status || "-"}</span>
                        </div>
                        <p style="font-size: 0.75rem; color: var(--text-dark); margin-bottom: 6px; line-height: 1.3;">${row.ucapan || ""}</p>
                        <div style="font-size: 0.6rem; color: var(--text-light); text-align: right;">${row.tanggal || ""}</div>
                    `;
                    wishesList.appendChild(wishCard);
                });
            })
            .catch(error => {
                console.error("Error loading wishes:", error);
                wishesList.innerHTML = `<p style="text-align: center; color: #888; font-size: 0.8rem;">Gagal memuat ucapan.</p>`;
            });
    }

    // Load ucapan saat halaman pertama kali dibuka
    loadWishes();
});