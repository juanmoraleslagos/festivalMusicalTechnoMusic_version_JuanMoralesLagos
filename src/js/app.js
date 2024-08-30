document.addEventListener('DOMContentLoaded', function () {
    navegacionFija();
    crearGaleria();
    resaltarEnlace();
    scrollNav();
});

function navegacionFija() {
    const header = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');

    document.addEventListener('scroll', function () {
        if (sobreFestival.getBoundingClientRect().bottom < 1) {
            header.classList.add('fixed');
        } else {
            header.classList.remove('fixed');
        }
    })
}

function crearGaleria() {
    const cantidad_imagenes = 16;
    const galeria = document.querySelector('.galeria-imagenes');

    for (let i = 1; i <= cantidad_imagenes; i++) {
        const imagen = document.createElement('PICTURE');
        imagen.innerHTML =
            `
            <source srcset="build/img/gallery/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/gallery/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.jpg" alt="imagen galeria">
        `;

        // Event Handler.
        imagen.onclick = function () {
            mostrarImagen(i);

        }

        galeria.appendChild(imagen);
    }
}
// 
function mostrarImagen(i) {
    // Generar Imagen.
    const imagen = document.createElement('PICTURE');
    imagen.innerHTML =
        `
    <source srcset="build/img/gallery/full/${i}.avif" type="image/avif">
    <source srcset="build/img/gallery/full/${i}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/gallery/full/${i}.jpg" alt="imagen galeria">
`;

    // Generar Modal.
    const modal = document.createElement('DIV')
    modal.classList.add('modal')
    modal.onclick = cerrarModal

    // Crear Boton Cerrar.
    const cerrarModalBtn = document.createElement('BUTTON')
    cerrarModalBtn.textContent = 'X'
    cerrarModalBtn.classList.add('btn-cerrar')
    cerrarModalBtn.onclick = cerrarModal

    // Agregar Imagen a Modal.
    modal.appendChild(imagen)
    // Agregar Boton Cerrar Modal a Modal.
    modal.appendChild(cerrarModalBtn)

    // Agregar al Modal HTML.
    const body = document.querySelector('body')
    body.classList.add('overflow-hidden')
    body.appendChild(modal);
}

function cerrarModal() {
    const modal = document.querySelector('.modal')
    modal.classList.add('fade-out')

    setTimeout(() => {
        modal?.remove();

        // Quitar clase overflow-hidden.
        const body = document.querySelector('body')
        body.classList.remove('overflow-hidden')
    }, 500);
}

function resaltarEnlace() {
    document.addEventListener('scroll', function () {
        const sections = document.querySelectorAll('section')
        const navLinks = document.querySelectorAll('.navegacion-principal a')

        let actual = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop
            const sectionHeight = section.clientHeight

            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                actual = section.id
            }
        })

        navLinks.forEach(link => {
            link.classList.remove('active')
            if (link.getAttribute('href') === '#' + actual) {
                link.classList.add('active')
            }
        })
    })
}

function scrollNav() {
    const navLinks = document.querySelectorAll('.navegacion-principal a');

    navLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const sectionScroll = event.target.getAttribute('href');
            const section = document.querySelector(sectionScroll);

            section.scrollIntoView({ behavior: 'smooth' });
        })
    })
}