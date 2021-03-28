
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
        informacionProducto = `<div class="card mb-3 col-md-6 p-0 bg-dark text-white">
        <img src="img/principal/imagenpordefecto.jpg"
            class="card-img-top" alt="${listaProducto[i].nombre}">
        <div class="card-body">
            <h5 class="card-title">${listaProducto[i].nombre}</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                additional content. This content is a little bit longer.</p>
            <a href="/error.html" class='btn btn-danger'>Ver mas</a>
        </div>
    </div>`;
    //agregar las cards
    fila.innerHTML+=informacionProducto;

    }
}


