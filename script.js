let player;
let isPlaying = false;

// YouTube API Callback
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: 'pp1mVv8lgGk',
        playerVars: {
            'autoplay': 0,
            'loop': 1,
            'playlist': 'pp1mVv8lgGk'
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    event.target.setVolume(20); // Kısık ses (0-100 arası)
}

document.addEventListener('DOMContentLoaded', () => {
    // Load YouTube API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Music Toggle Logic
    const musicBtn = document.getElementById('music-toggle');
    if (musicBtn) {
        musicBtn.addEventListener('click', () => {
            if (!player) return;

            if (!isPlaying) {
                player.playVideo();
                musicBtn.classList.add('playing');
                const icon = musicBtn.querySelector('.icon');
                icon.textContent = '❙❙';
                icon.setAttribute('data-text', '❙❙'); // Update glitch text
                isPlaying = true;
            } else {
                player.pauseVideo();
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
