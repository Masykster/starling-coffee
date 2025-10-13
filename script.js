document.addEventListener('DOMContentLoaded', () => {
    // -- Fitur Umum (untuk semua halaman) --

    // 1. Mode Gelap
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('theme-icon-sun');
    const moonIcon = document.getElementById('theme-icon-moon');
    const body = document.body;

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        } else {
            body.classList.remove('dark-mode');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }
    };
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });

    // 2. Menu Hamburger
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });


    // -- Fitur Spesifik Halaman --

    // 1. Slider Gambar (hanya untuk index.html)
    const sliderWrapper = document.querySelector('.slider-wrapper');
    if (sliderWrapper) {
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const dotsContainer = document.querySelector('.slider-dots');

        let currentIndex = 0;
        const totalSlides = slides.length;
        let autoPlayInterval;

        slides.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => { goToSlide(i); resetAutoPlay(); });
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');
        const goToSlide = (index) => {
            if (index < 0) index = totalSlides - 1;
            else if (index >= totalSlides) index = 0;
            sliderWrapper.style.transform = `translateX(-${index * 100}%)`;
            currentIndex = index;
            updateDots();
        };
        const updateDots = () => {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        };

        prevBtn.addEventListener('click', () => { goToSlide(currentIndex - 1); resetAutoPlay(); });
        nextBtn.addEventListener('click', () => { goToSlide(currentIndex + 1); resetAutoPlay(); });

        const startAutoPlay = () => { autoPlayInterval = setInterval(() => goToSlide(currentIndex + 1), 4000); };
        const resetAutoPlay = () => { clearInterval(autoPlayInterval); startAutoPlay(); };
        
        goToSlide(0);
        startAutoPlay();
    }

    // 2. Validasi Form (hanya untuk contact.html)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Logika validasi form Anda ada di sini...
            // (Saya akan menyalinnya dari contact.html)
            console.log("Form submitted!");
            // Tampilkan pesan sukses dan reset form
            document.getElementById('form-success-message').style.display = 'block';
            contactForm.reset();
        });
    }
});