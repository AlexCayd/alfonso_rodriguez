// NAVEGACIÓN
// Smooth scroll for anchor links
const enlaces = document.querySelectorAll('a[href^="#"]');
enlaces.forEach(enlace => {
  enlace.addEventListener('click', function(e) {
    const destino = document.querySelector(this.getAttribute('href'));
    if (destino) {
      e.preventDefault();
      destino.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const toggleBtn = document.querySelector('.nav__toggle');
const closeBtn = document.querySelector('.nav__close');
const nav = document.querySelector('.nav');
const overlay = document.querySelector('.nav__overlay');

// Abrir menú
toggleBtn.addEventListener('click', () => {
    nav.classList.add('nav--visible');
    overlay.classList.add('active');
});

// Cerrar menú con overlay
overlay.addEventListener('click', () => {
    nav.classList.remove('nav--visible');
    overlay.classList.remove('active');
});

// Cerrar menú con botón X
closeBtn.addEventListener('click', () => {
    nav.classList.remove('nav--visible');
    overlay.classList.remove('active');
});

// HERO
const heroVideo = document.querySelector('.hero__video');
if (heroVideo) {
  heroVideo.muted = true;
  heroVideo.play().catch(err => {
    // fallback: reinicia al hacer scroll o interacción
    document.addEventListener('touchstart', () => heroVideo.play(), { once: true });
  });
}

// ANIMACION DE ENTRADA
const animados = document.querySelectorAll('.animar-scroll');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animado');
        } else {
            entry.target.classList.remove('animado'); 
        }
    });
}, {
    threshold: 0.2
});

animados.forEach(el => observer.observe(el));

// CONTADORES DE DATOS
function animarContadores() {
  const counters = document.querySelectorAll('.nosotros__numero');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    let actual = 0;
    const velocidad = 100;
    const incremento = target / velocidad;

    const actualizar = () => {
      actual += incremento;
      if (actual < target) {
        counter.textContent = Math.floor(actual);
        requestAnimationFrame(actualizar);
      } else {
        counter.textContent = target + '+';
      }
    };
    actualizar();
  });
}

const observerContadores = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animarContadores();
      observerContadores.disconnect();
    }
  });
}, { threshold: 0.6 });

observerContadores.observe(document.querySelector('.nosotros__datos'));

// PROCESO
const itemsProceso = document.querySelectorAll('.proceso__item');
const observerProceso = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animado');
    }
  });
}, { threshold: 0.3 });

itemsProceso.forEach(item => observerProceso.observe(item));

// CTA
const cta = document.querySelector('.cta');
const observerCTA = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      cta.classList.add('animado');
      observerCTA.disconnect();
    }
  });
}, { threshold: 0.4 });
observerCTA.observe(cta);