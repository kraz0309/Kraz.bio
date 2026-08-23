if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

const words = ["JERRY", "KRAZ", "くらす"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById('typewriter-text');

function typeEffect() {
  const currentWord = words[wordIndex];
  
  if (isDeleting) {
    typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let typingSpeed = isDeleting ? 80 : 150;

  if (!isDeleting && charIndex === currentWord.length) {
    typingSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typingSpeed = 500;
  }

  setTimeout(typeEffect, typingSpeed);
}

document.addEventListener('DOMContentLoaded', typeEffect);

function copyEmail() {
  navigator.clipboard.writeText('kraz@formosa.network');
  const status = document.getElementById('copy-status');
  status.textContent = 'Copied!';
  status.style.opacity = '1';
  status.classList.add('text-green-400');
  setTimeout(() => {
    status.textContent = 'Click to copy';
    status.style.opacity = '';
    status.classList.remove('text-green-400');
  }, 2000);
}

const loaderText = document.getElementById('loader-text');
const loaderBrandWrapper = document.getElementById('loader-brand-wrapper');
const loaderBrandText = document.getElementById('loader-brand-text');
const loadingScreen = document.getElementById('loading-screen');

const frames = [
  { text: 'loading.', delay: 300 },
  { text: 'loading..', delay: 300 },
  { text: 'loading...', delay: 400 }
];

let frameIndex = 0;

function runLoader() {
  if (frameIndex < frames.length) {
    loaderText.textContent = frames[frameIndex].text;
    const delay = frames[frameIndex].delay;
    frameIndex++;
    setTimeout(runLoader, delay);
  } else {
    loaderText.style.opacity = '0';
    
    setTimeout(() => {
      loaderText.classList.add('hidden');
      loaderBrandWrapper.classList.remove('hidden');
      void loaderBrandWrapper.offsetWidth;
      loaderBrandWrapper.classList.add('active');

      setTimeout(() => {
        loaderBrandWrapper.classList.add('shifted');
        loaderBrandText.classList.add('show');

        setTimeout(() => {
          loadingScreen.classList.add('hidden-loader');
        }, 1400);
      }, 800);

    }, 250);
  }
}

window.addEventListener('load', runLoader);

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
