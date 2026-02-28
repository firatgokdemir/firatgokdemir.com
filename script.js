let audioPlayer;
let isPlaying = false;

document.addEventListener('DOMContentLoaded', () => {
    // HTML5 Audio Player Setup
    audioPlayer = new Audio('music.mp3');
    audioPlayer.loop = true;
    audioPlayer.volume = 0.3; // %30 ses seviyesi

    // Music Toggle Logic
    const musicBtn = document.getElementById('music-toggle');
    if (musicBtn) {
        musicBtn.addEventListener('click', () => {
            if (!isPlaying) {
                audioPlayer.play();
                musicBtn.classList.add('playing');
                const icon = musicBtn.querySelector('.icon');
                icon.textContent = '❙❙';
                icon.setAttribute('data-text', '❙❙'); // Update glitch text
                isPlaying = true;
            } else {
                audioPlayer.pause();
                musicBtn.classList.remove('playing');
                const icon = musicBtn.querySelector('.icon');
                icon.textContent = '♪';
                icon.setAttribute('data-text', '♪'); // Update glitch text
                isPlaying = false;
            }
        });
    }

    // Smooth Scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for reveal animations
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, revealOptions);

    // Elements to reveal
    const revealElements = [
        document.querySelector('#about'),
        document.querySelector('#projects'),
        ...document.querySelectorAll('.project-card')
    ];

    revealElements.forEach(el => {
        if (el) {
            el.classList.add('reveal');
            revealObserver.observe(el);
        }
    });

    // Subtle parallax for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundPositionY = (scrolled * 0.5) + 'px';
        }
    });
});
