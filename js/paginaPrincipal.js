
let listaProducto = [];
leerProductos();
function leerProductos() {
    if (localStorage.length > 0) {
        listaProducto = JSON.parse(localStorage.getItem('listaProducto'))
        dibujarCard();
    }
}

function dibujarCard() {
    let fila = document.getElementById('listaProducto');
    //limpiar codigo
    fila.innerHTML = '';
    console.log(listaProducto);
    //se recorre el arreglo
    let informacionProducto = '';


    for (let i in listaProducto) {
        let img = '';
        if (listaProducto[i].imagen==='') {
            img = "img/principal/imagenpordefecto.jpg"
        }
        else {
            img = listaProducto[i].imagen
         }



        informacionProducto = `<div class="card mb-3 col-md-5 p-0 bg-dark text-white ">
        <img src="${img}"
            class="card-img-top" alt="${listaProducto[i].nombre}">
        <div class="card-body">
            <h5 class="card-title">${listaProducto[i].nombre}</h5>
            <p class="card-text">${listaProducto[i].descripcion}</p>
            <a href="/error.html" class='btn btn-danger'>Ver mas</a>
        </div>
    </div>`;
        //agregar las cards
        fila.innerHTML += informacionProducto;

    }
}


const fila = document.querySelector('.contenedor-carousel');
const peliculas = document.querySelectorAll('.pelicula');

const flechaIzquierda = document.getElementById('flecha-izquierda');
const flechaDerecha = document.getElementById('flecha-derecha');


// ? ----- ----- Event Listener para la flecha derecha. ----- -----
flechaDerecha.addEventListener('click', () => {
    fila.scrollLeft += fila.offsetWidth;

    const indicadorActivo = document.querySelector('.indicadores .activo');
    if (indicadorActivo.nextSibling) {
        indicadorActivo.nextSibling.classList.add('activo');
        indicadorActivo.classList.remove('activo');
    }
});

// ? ----- ----- Event Listener para la flecha izquierda. ----- -----
flechaIzquierda.addEventListener('click', () => {
    fila.scrollLeft -= fila.offsetWidth;

    const indicadorActivo = document.querySelector('.indicadores .activo');
    if (indicadorActivo.previousSibling) {
        indicadorActivo.previousSibling.classList.add('activo');
        indicadorActivo.classList.remove('activo');
    }
});

// ? ----- ----- Paginacion ----- -----
const numeroPaginas = Math.ceil(peliculas.length / 5);
for (let i = 0; i < numeroPaginas; i++) {
    const indicador = document.createElement('button');

    if (i === 0) {
        indicador.classList.add('activo');
    }

    document.querySelector('.indicadores').appendChild(indicador);
    indicador.addEventListener('click', (e) => {
        fila.scrollLeft = i * fila.offsetWidth;

        document.querySelector('.indicadores .activo').classList.remove('activo');
        e.target.classList.add('activo');
    });
}

// ? ----- ----- Hover ----- -----
peliculas.forEach((pelicula) => {
    pelicula.addEventListener('mouseenter', (e) => {
        const elemento = e.currentTarget;
        setTimeout(() => {
            peliculas.forEach(pelicula => pelicula.classList.remove('hover'));
            elemento.classList.add('hover');
        }, 300);
    });
});

fila.addEventListener('mouseleave', () => {
    peliculas.forEach(pelicula => pelicula.classList.remove('hover'));
});