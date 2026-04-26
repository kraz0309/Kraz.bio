lucide.createIcons();

function removeLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('loader-hidden');
        document.body.style.overflow = 'auto';
    }
}

window.addEventListener('load', removeLoader);

setTimeout(removeLoader, 3000);

const dot = document.getElementById('cursor-dot');
const outline = document.getElementById('cursor-outline');

window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    dot.style.left = `${clientX}px`;
    dot.style.top = `${clientY}px`;

    outline.animate({
        left: `${clientX}px`,
        top: `${clientY}px`
    }, { duration: 500, fill: "forwards" });
});

const activeElements = document.querySelectorAll('a, .bento-card');
activeElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        outline.style.width = '60px';
        outline.style.height = '60px';
    });
    el.addEventListener('mouseleave', () => {
        outline.style.width = '35px';
        outline.style.height = '35px';
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

