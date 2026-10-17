/* ##### AUDIO ##### */
const weddingAudio = document.getElementById('wedding-audio');

function playBgAudio() {
    if (!weddingAudio) return;
    weddingAudio.volume = 0.8;
    if (weddingAudio.paused) {
        const playPromise = weddingAudio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                removeGestureListeners();
            }).catch(() => {
            });
        }
    } else {
        removeGestureListeners();
    }
}

const gestureEvents = [
    'pointerdown', 'pointermove', 'mousedown', 'mousemove',
    'touchstart', 'touchmove', 'scroll', 'wheel',
    'keydown', 'click', 'focus'
];

function removeGestureListeners() {
    gestureEvents.forEach(evt => {
        window.removeEventListener(evt, playBgAudio);
        document.removeEventListener(evt, playBgAudio);
    });
}

playBgAudio();
document.addEventListener('DOMContentLoaded', playBgAudio);
window.addEventListener('load', playBgAudio);

gestureEvents.forEach(evt => {
    window.addEventListener(evt, playBgAudio, { passive: true });
    document.addEventListener(evt, playBgAudio, { passive: true });
});

if (weddingAudio) {
    weddingAudio.addEventListener('ended', function () {
        weddingAudio.currentTime = 0;
        weddingAudio.play().catch(() => {});
    });
}

/* ##### TOMBOL BUKA UNDANGAN ##### */
document.getElementById('open-invitation-btn').addEventListener('click', function () {
    playBgAudio();
    document.getElementById('invitation').scrollIntoView({ behavior: 'smooth' });
});

/* ##### NAVIGASI TOMBOL NAVBAR ##### */
const navBtns = document.querySelectorAll('.navbr-web .nav-btn');

navBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-target');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/* #####  NAVBAR ##### */
const navbar = document.getElementById('main-navbar');
const landingSec = document.getElementById('landing');

function updateNavbarVisibility() {
    if (!landingSec || !navbar) return;
    const rect = landingSec.getBoundingClientRect();
    if (rect.bottom > window.innerHeight * 0.4) {
        navbar.classList.remove('navbar-visible');
    } else {
        navbar.classList.add('navbar-visible');
    }
}

window.addEventListener('scroll', updateNavbarVisibility, { passive: true });
document.body.addEventListener('scroll', updateNavbarVisibility, { passive: true });


const sectionNavMap = [
    { id: 'invitation', navTarget: 'invitation' },
    { id: 'section-next', navTarget: 'section-next' },
    { id: 'section-three', navTarget: 'section-three' },
    { id: 'section-four', navTarget: 'section-four' },
    { id: 'section-five', navTarget: 'section-four' },
    { id: 'section-six', navTarget: 'section-six' },
    { id: 'section-seven', navTarget: 'section-seven' },
    { id: 'section-eight', navTarget: 'section-eight' },
    { id: 'section-nine', navTarget: 'section-nine' }
];

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const match = sectionNavMap.find(item => item.id === entry.target.id);
            if (match) {
                navBtns.forEach(b => {
                    b.classList.toggle('active', b.getAttribute('data-target') === match.navTarget);
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
    // Tanggal Pernikahan: 18 Februari 2027 pukul 09:00:00 WITA (GMT+8)
    const weddingDate = new Date('2027-02-18T09:00:00+08:00').getTime();
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minutesEl = document.getElementById('cd-minutes');
    const secondsEl = document.getElementById('cd-seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    function updateTimer() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance <= 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = days < 10 ? `0${days}` : days;
        hoursEl.textContent = hours < 10 ? `0${hours}` : hours;
        minutesEl.textContent = minutes < 10 ? `0${minutes}` : minutes;
        secondsEl.textContent = seconds < 10 ? `0${seconds}` : seconds;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

initCountdown();
