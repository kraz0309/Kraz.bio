if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

const dot = document.getElementById('cursor-dot');
const outline = document.getElementById('cursor-outline');
const glow = document.getElementById('cursor-glow');

if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
        
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';

        outline.animate({
            left: e.clientX + 'px',
            top: e.clientY + 'px'
        }, { duration: 400, fill: "forwards" });
    });
}

const observerOptions = { threshold: 0.05 };

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const navbar = document.getElementById('navbar');
let isTicking = false;

window.addEventListener('scroll', () => {
    if (!isTicking) {
        window.requestAnimationFrame(() => {
            if (window.scrollY > 30) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            isTicking = false;
        });
        isTicking = true;
    }
});