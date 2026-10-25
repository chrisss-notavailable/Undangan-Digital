/* ##### AUDIO ##### */
const weddingAudio = document.getElementById('wedding-audio');

function playBgAudio() {
    if (!weddingAudio) return;
    weddingAudio.volume = 0.8;
    if (weddingAudio.paused) {
        weddingAudio.play().then(removeGestureListeners).catch(() => {});
    } else {
        removeGestureListeners();
    }
}

const gestureEvents = ['click', 'touchstart', 'keydown'];

function removeGestureListeners() {
    gestureEvents.forEach(evt => window.removeEventListener(evt, playBgAudio));
}

playBgAudio();
document.addEventListener('DOMContentLoaded', playBgAudio);
window.addEventListener('load', playBgAudio);
gestureEvents.forEach(evt => window.addEventListener(evt, playBgAudio, { passive: true }));

if (weddingAudio) {
    weddingAudio.addEventListener('ended', function () {
        weddingAudio.currentTime = 0;
        weddingAudio.play().catch(() => {});
    });
}

/* ##### TOMBOL BUKA UNDANGAN ##### */
document.getElementById('open-invitation-btn')?.addEventListener('click', function () {
    playBgAudio();
    document.getElementById('section-two')?.scrollIntoView({ behavior: 'smooth' });
    if (typeof startPetalRain === 'function') {
        startPetalRain();
    }
});

/* ##### NAVIGASI TOMBOL NAVBAR ##### */
const navBtns = document.querySelectorAll('.navbr-web .nav-btn');

navBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        const targetEl = document.getElementById(this.getAttribute('data-target'));
        if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/* ##### NAVBAR ##### */
const navbar = document.getElementById('main-navbar');
const landingSec = document.getElementById('section-one');

function updateNavbarVisibility() {
    if (!landingSec || !navbar) return;
    navbar.classList.toggle('navbar-visible', landingSec.getBoundingClientRect().bottom <= window.innerHeight * 0.4);
}

window.addEventListener('scroll', updateNavbarVisibility, { passive: true });

const sectionNavMap = [
    { id: 'section-two', navTarget: 'section-two' },
    { id: 'section-three', navTarget: 'section-three' },
    { id: 'section-four', navTarget: 'section-four' },
    { id: 'section-five', navTarget: 'section-five' },
    { id: 'section-six', navTarget: 'section-six' },
    { id: 'section-seven', navTarget: 'section-six' },
    { id: 'section-eight', navTarget: 'section-eight' },
    { id: 'section-nine', navTarget: 'section-nine' },
    { id: 'section-ten', navTarget: 'section-ten' }
];

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const match = sectionNavMap.find(item => item.id === entry.target.id);
            if (match) {
                navBtns.forEach(b => {
                    const isActive = b.getAttribute('data-target') === match.navTarget;
                    b.classList.toggle('active', isActive);
                    if (isActive && navbar?.classList.contains('navbar-visible')) {
                        b.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
                    }
                });
            }
        }
    });
    updateNavbarVisibility();
}, { threshold: 0.4 });

if (landingSec) navObserver.observe(landingSec);
sectionNavMap.forEach(item => {
    const el = document.getElementById(item.id);
    if (el) navObserver.observe(el);
});

/* ##### COUNTDOWN TIMER (UNTIL FOREVER) ##### */
function initCountdown() {
    const weddingDate = new Date('2027-02-18T09:00:00+08:00').getTime();
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minutesEl = document.getElementById('cd-minutes');
    const secondsEl = document.getElementById('cd-seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    function updateTimer() {
        const distance = Math.max(0, weddingDate - Date.now());
        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const m = Math.floor((distance / (1000 * 60)) % 60);
        const s = Math.floor((distance / 1000) % 60);

        daysEl.textContent = String(d).padStart(2, '0');
        hoursEl.textContent = String(h).padStart(2, '0');
        minutesEl.textContent = String(m).padStart(2, '0');
        secondsEl.textContent = String(s).padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

initCountdown();

