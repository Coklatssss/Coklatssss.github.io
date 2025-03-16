document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    const moonIcon = darkModeToggle.querySelector('.fa-moon');
    const sunIcon = darkModeToggle.querySelector('.fa-sun');

    // Cek preferensi pengguna dari localStorage
    if (localStorage.getItem('dark-mode') === 'enabled') {
        body.classList.add('dark-mode');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'inline-block';
    }

    // Toggle dark mode
    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('dark-mode', 'enabled');
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'inline-block';
        } else {
            localStorage.setItem('dark-mode', 'disabled');
            moonIcon.style.display = 'inline-block';
            sunIcon.style.display = 'none';
        }
    });
});

let currentIndex = 0; // Indeks gambar saat ini
const images = [
    'images/portfolio1.png',
    'images/portfolio2.png',
    'images/portfolio3.jpg'
]; // Daftar gambar

// Fungsi untuk membuka lightbox
function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    currentIndex = images.indexOf(imageSrc); // Set indeks gambar yang diklik
    lightboxImg.src = imageSrc; // Set sumber gambar yang diklik
    lightbox.classList.add('active'); // Tampilkan lightbox

    // Set video sources (opsional, jika video berbeda untuk setiap gambar)
    const videos = document.querySelectorAll('.lightbox-video');
    videos[0].querySelector('source').src = 'videos/video1.mp4';
    videos[1].querySelector('source').src = 'videos/video2.mp4';

    // Muat ulang video setelah mengubah sumber
    videos.forEach(video => video.load());
}

// Fungsi untuk menutup lightbox
function closeLightbox(event) {
    if (event.target === document.getElementById('lightbox') || event.target.classList.contains('close-btn')) {
        const lightbox = document.getElementById('lightbox');
        lightbox.classList.remove('active'); // Sembunyikan lightbox

        // Hentikan semua video saat lightbox ditutup
        const videos = document.querySelectorAll('.lightbox-video');
        videos.forEach(video => {
            video.pause(); // Hentikan video
            video.currentTime = 0; // Reset waktu video ke awal
        });
    }
}

/// Fungsi untuk membuka lightbox
function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    currentIndex = images.indexOf(imageSrc); // Set indeks gambar yang diklik
    lightboxImg.src = imageSrc; // Set sumber gambar yang diklik
    lightbox.classList.add('active'); // Tampilkan lightbox

    // Set video sources dan thumbnail
    const videos = document.querySelectorAll('.lightbox-video');
    videos[0].querySelector('source').src = 'videos/video1.mp4';
    videos[0].style.setProperty('--thumbnail', 'url(videos/thumbnail1.jpg)');
    videos[1].querySelector('source').src = 'videos/video2.mp4';
    videos[1].style.setProperty('--thumbnail', 'url(videos/thumbnail2.jpg)');

    // Muat ulang video setelah mengubah sumber
    videos.forEach(video => video.load());

    // Tambahkan event listener untuk menghilangkan thumbnail saat video diputar
    videos.forEach(video => {
        video.addEventListener('play', () => {
            video.classList.add('playing');
        });
        video.addEventListener('pause', () => {
            video.classList.remove('playing');
        });
    });
}

// Fungsi untuk menutup lightbox
function closeLightbox(event) {
    if (event.target === document.getElementById('lightbox') || event.target.classList.contains('close-btn')) {
        const lightbox = document.getElementById('lightbox');
        lightbox.classList.remove('active'); // Sembunyikan lightbox

        // Hentikan semua video saat lightbox ditutup
        const videos = document.querySelectorAll('.lightbox-video');
        videos.forEach(video => {
            video.pause(); // Hentikan video
            video.currentTime = 0; // Reset waktu video ke awal
            video.classList.remove('playing'); // Tampilkan thumbnail kembali
        });
    }
}

// Fungsi untuk mengubah gambar
function changeImage(direction) {
    currentIndex += direction; // Update indeks gambar

    // Handle overflow (jika melebihi jumlah gambar)
    if (currentIndex >= images.length) {
        currentIndex = 0; // Kembali ke gambar pertama
    } else if (currentIndex < 0) {
        currentIndex = images.length - 1; // Pindah ke gambar terakhir
    }

    // Update gambar di lightbox
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = images[currentIndex];

    // Hentikan semua video saat berpindah gambar
    videos.forEach(video => {
        video.pause(); // Hentikan video
        video.currentTime = 0; // Reset waktu video ke awal
        video.classList.remove('playing'); // Tampilkan thumbnail kembali
    });

    // Set video sources dan thumbnail (opsional, jika video berbeda untuk setiap gambar)
    videos[0].querySelector('source').src = `videos/video${currentIndex + 1}-1.mp4`;
    videos[0].style.setProperty('--thumbnail', `url(videos/thumbnail${currentIndex + 1}-1.jpg)`);
    videos[1].querySelector('source').src = `videos/video${currentIndex + 1}-2.mp4`;
    videos[1].style.setProperty('--thumbnail', `url(videos/thumbnail${currentIndex + 1}-2.jpg)`);

    // Muat ulang video setelah mengubah sumber
    videos.forEach(video => video.load());
}

// Fungsi untuk mengirim pesan ke WhatsApp
document.getElementById('whatsapp-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Mencegah form submit default

    // Ambil nilai dari form
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    // Nomor WhatsApp tujuan (ganti dengan nomor Anda)
    const phone = "62085340396793"; // Contoh: Nomor WhatsApp Anda

    // Format nomor telepon (hapus karakter selain angka)
    const formattedPhone = phone.replace(/\D/g, '');

    // Buat pesan yang akan dikirim
    const whatsappMessage = `Halo, saya ${name}. ${message}`;

    // Buat link WhatsApp
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(whatsappMessage)}`;

    // Buka link WhatsApp di tab baru
    window.open(whatsappUrl, '_blank');
});