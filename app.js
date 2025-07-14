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


// modal
const proyectos = document.querySelectorAll('.proyecto');
const modal = document.getElementById('modalProyecto');
const modalImg = document.getElementById('modalImagen');
const modalEtiqueta = document.querySelector('.modal__etiqueta');
const modalNombre = document.querySelector('.modal__nombre');
const modalUbicacion = document.getElementById('modalUbicacion');
const modalRol = document.getElementById('modalRol');
const btnCerrar = document.querySelector('.modal__cerrar');
const btnAnterior = document.querySelector('.modal__anterior');
const btnSiguiente = document.querySelector('.modal__siguiente');
let indexActual = 0;

const abrirModal = (index) => {
  const proyecto = proyectos[index];
  const img = proyecto.querySelector('img').src;
  const nombre = proyecto.querySelector('.proyecto__nombre').textContent;
  const etiqueta = proyecto.querySelector('.proyecto__etiqueta').textContent;
  const [ubicacion, rol] = [...proyecto.querySelectorAll('.proyecto__meta span')].map(e => e.textContent);

  modalImg.src = img;
  modalNombre.textContent = nombre;
  modalEtiqueta.textContent = etiqueta;
  modalUbicacion.textContent = ubicacion;
  modalRol.textContent = rol;
  modal.classList.remove('oculto');
  indexActual = index;
};

proyectos.forEach((proyecto, i) => {
  proyecto.addEventListener('click', () => abrirModal(i));
});

btnCerrar.addEventListener('click', () => modal.classList.add('oculto'));

modal.addEventListener('click', e => {
  if (e.target === modal) modal.classList.add('oculto');
});

btnAnterior.addEventListener('click', () => {
  indexActual = (indexActual - 1 + proyectos.length) % proyectos.length;
  abrirModal(indexActual);
});

btnSiguiente.addEventListener('click', () => {
  indexActual = (indexActual + 1) % proyectos.length;
  abrirModal(indexActual);
});

// Soporte para swipe en móvil
let xInicio = null;
modal.addEventListener('touchstart', e => {
  xInicio = e.touches[0].clientX;
});
modal.addEventListener('touchend', e => {
  if (xInicio === null) return;
  let xFin = e.changedTouches[0].clientX;
  let deltaX = xFin - xInicio;
  if (deltaX > 50) btnAnterior.click();
  if (deltaX < -50) btnSiguiente.click();
  xInicio = null;
});