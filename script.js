// Loader
document.addEventListener('DOMContentLoaded', function () {
    const loader = document.getElementById('loader');
    const mainContent = document.getElementById('mainContent');
    const percentageText = document.getElementById('loaderPercentage');
    let progress = 0;
    const interval = setInterval(function () {
        progress += 1;
        percentageText.textContent = progress + '%';
        if (progress >= 100) clearInterval(interval);
    }, 60);

    setTimeout(function () {
        loader.classList.add('fade-out');
        mainContent.classList.add('visible');
        initParticles();
        initTyped();
        initAnimations();
    }, 6000);
});

// Particles
function initParticles() {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: ['#00eeff', '#419d78', '#e0a458', '#d9594c', '#53a2be'] },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
            size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.1, sync: false } },
            line_linked: { enable: true, distance: 150, color: '#00eeff', opacity: 0.2, width: 1 },
            move: { enable: true, speed: 2, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false, attract: { enable: false, rotateX: 600, rotateY: 1200 } }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
            modes: { grab: { distance: 140, line_linked: { opacity: 0.5 } }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    });
}

// Typed
function initTyped() {
    new Typed('.typed-text', { strings: ['Artist', 'Designer', 'Coder', 'Student'], typeSpeed: 100, backSpeed: 60, loop: true });
}

// Mobile menu
document.querySelector('.menu-btn').addEventListener('click', function () {
    document.querySelector('.navbar').classList.toggle('active');
});
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => document.querySelector('.navbar').classList.remove('active'));
});

// Active link & back to top
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
    const btt = document.getElementById('backToTop');
    if (window.scrollY > 500) btt.classList.add('show'); else btt.classList.remove('show');
});

document.getElementById('backToTop').addEventListener('click', function (e) {
    e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Social links
function openSocial(platform) {
    const urls = {
        facebook: 'https://www.facebook.com/bhuvan.gr.58',
        instagram: 'https://instagram.com/____bh____uvan___',
        whatsapp: 'https://wa.me/918088836667',
        email: 'mailto:bhuvan7536@gmail.com'
    };
    if (platform === 'whatsapp') window.open(urls[platform], '_blank');
    else if (platform === 'email') window.location.href = urls[platform];
    else window.open(urls[platform], '_blank');
}
window.openSocial = openSocial;

// radial progress init
function initAnimations() {
    document.querySelectorAll('.radial-progress').forEach(progress => {
        const circle = progress.querySelector('circle:nth-child(2)');
        const percent = progress.dataset.progress;
        const circumference = 2 * Math.PI * 70;
        const offset = circumference - (percent / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    });
}

// THEME TOGGLE (Dark/Light)
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('light-mode')) {
        icon.className = 'bx bxs-sun';
        // update particles color if needed? optional, but keep as is.
    } else {
        icon.className = 'bx bxs-moon';
    }
});
