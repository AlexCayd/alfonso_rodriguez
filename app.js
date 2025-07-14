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
