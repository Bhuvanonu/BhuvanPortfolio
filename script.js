
// Loader with 6 seconds duration
document.addEventListener('DOMContentLoaded', function () {
    const loader = document.getElementById('loader');
    const mainContent = document.getElementById('mainContent');
    const progressBar = document.getElementById('progressBar');
    const percentageText = document.getElementById('loaderPercentage');

    let progress = 0;
    const interval = setInterval(function () {
        progress += 1;
        percentageText.textContent = progress + '%';

        if (progress >= 100) {
            clearInterval(interval);
        }
    }, 60); // 60ms * 100 = 6000ms = 6 seconds

    // Hide loader after 6 seconds
    setTimeout(function () {
        loader.classList.add('fade-out');
        mainContent.classList.add('visible');

        // Initialize everything after loader
        initParticles();
        initTyped();
        initAnimations();
    }, 2000);
});

// Particles Background
function initParticles() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ['#00eeff', '#419d78', '#e0a458', '#d9594c', '#53a2be']
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#00eeff',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.5
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
}

// Typed Text
function initTyped() {
    var typed = new Typed('.typed-text', {
        strings: ['Artist', 'Designer', 'Coder', 'Student'],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });
}

// Mobile Menu Toggle
document.querySelector('.menu-btn').addEventListener('click', function () {
    document.querySelector('.navbar').classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.navbar').classList.remove('active');
    });
});

// Active link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Back to top button
    if (window.scrollY > 500) {
        document.getElementById('backToTop').classList.add('show');
    } else {
        document.getElementById('backToTop').classList.remove('show');
    }
});

// Smooth scroll for back to top
document.getElementById('backToTop').addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Social Links
function openSocial(platform) {
    const urls = {
        facebook: 'https://facebook.com',
        instagram: 'https://instagram.com/____bh____uvan___',
        whatsapp: 'https://wa.me/8088836667',
        email: 'mailto:bhuvan7536@gmail.com'
    };

    if (platform === 'whatsapp') {
        window.open(urls[platform], '_blank');
    } else if (platform === 'email') {
        window.location.href = urls[platform];
    } else {
        window.open(urls[platform], '_blank');
    }
}

// Form Submission
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});

// Initialize animations after content is visible
function initAnimations() {
    // Radial Progress Animation
    const radialProgress = document.querySelectorAll('.radial-progress');

    radialProgress.forEach(progress => {
        const circle = progress.querySelector('circle:nth-child(2)');
        const percent = progress.dataset.progress;
        const circumference = 2 * Math.PI * 70;
        const offset = circumference - (percent / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    });

    // Progress Bar Animation
    const progressBars = document.querySelectorAll('.progress');

    function animateProgressBars() {
        progressBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;

            if (barPosition < screenPosition) {
                bar.style.animation = 'fillProgress 1.5s ease forwards';
            }
        });
    }

    window.addEventListener('scroll', animateProgressBars);
    animateProgressBars(); // Initial check
}









