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

// MODAL PROYECTOS
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
  document.body.style.overflow = 'hidden'; // evitar scroll en móvil
  indexActual = index;
};

const cerrarModal = () => {
  modal.classList.add('oculto');
  document.body.style.overflow = ''; // restaurar scroll
};

proyectos.forEach((proyecto, i) => {
  proyecto.addEventListener('click', () => abrirModal(i));
});

btnCerrar.addEventListener('click', cerrarModal);
modal.addEventListener('click', e => {
  if (e.target === modal) cerrarModal();
});

btnAnterior.addEventListener('click', () => {
  indexActual = (indexActual - 1 + proyectos.length) % proyectos.length;
  abrirModal(indexActual);
});

btnSiguiente.addEventListener('click', () => {
  indexActual = (indexActual + 1) % proyectos.length;
  abrirModal(indexActual);
});

// Swipe en móvil
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

// Navegación con flechas
document.addEventListener('keydown', e => {
  if (!modal.classList.contains('oculto')) {
    if (e.key === 'ArrowLeft') btnAnterior.click();
    if (e.key === 'ArrowRight') btnSiguiente.click();
    if (e.key === 'Escape') cerrarModal();
  }
});

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

// cta
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