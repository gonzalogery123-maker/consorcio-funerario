const botonMenu = document.getElementById('botonMenu');
const menuMovil = document.getElementById('menuMovil');

botonMenu.addEventListener('click', function () {
    menuMovil.classList.toggle('activo');
});

const enlacesMenu = menuMovil.querySelectorAll('a');
enlacesMenu.forEach(function (enlace) {
    enlace.addEventListener('click', function () {
        menuMovil.classList.remove('activo');
    });
});


const elementosReveal = document.querySelectorAll('.reveal');

const observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('visible');
            observador.unobserve(entrada.target);
        }
    });
}, { threshold: 0.15 });

elementosReveal.forEach(function (el) {
    observador.observe(el);
});


const contadores = document.querySelectorAll('.dato-numero');

function animarContador(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const duracion = 1500;
    const inicio = performance.now();

    function actualizar(ahora) {
        const progreso = Math.min((ahora - inicio) / duracion, 1);
        const valor = Math.floor(progreso * target);
        el.textContent = prefix + valor + suffix;

        if (progreso < 1) {
            requestAnimationFrame(actualizar);
        } else {
            el.textContent = prefix + target + suffix;
        }
    }

    requestAnimationFrame(actualizar);
}

const observadorContadores = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
            animarContador(entrada.target);
            observadorContadores.unobserve(entrada.target);
        }
    });
}, { threshold: 0.5 });

contadores.forEach(function (el) {
    observadorContadores.observe(el);
});

const gridServicios = document.querySelector('.servicios-grid');

if (gridServicios) {
    const observadorServicios = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visible');
                observadorServicios.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.2 });

    observadorServicios.observe(gridServicios);
}



function activarCascada(selector, threshold) {
    const contenedor = document.querySelector(selector);

    if (contenedor) {
        const observador = new IntersectionObserver(function (entradas) {
            entradas.forEach(function (entrada) {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add('visible');
                    observador.unobserve(entrada.target);
                }
            });
        }, { threshold: threshold });

        observador.observe(contenedor);
    }
}

activarCascada('.proceso-pasos', 0.2);
activarCascada('.incluye-grid', 0.2);