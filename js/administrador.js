import { producto } from "./productoClass.js";

let listaProducto = [];
const modalProducto = new bootstrap.Modal(
    document.getElementById("modalProducto")
);
let btnAgregar = document.getElementById("btnAgregar");
btnAgregar.addEventListener("click", () => {
    limpiarFormulario();
    modalProducto.show();
});

leerDatos();
window.agregarProducto = function (event) {
    event.preventDefault();
    var isChecked = document.getElementById('checkPublicado').checked;
    if (isChecked) {
        isChecked = 'Publicado'

    } else {
        isChecked = 'No publicado'
    }
    let nuevoProducto = new producto(
        document.getElementById("codigoProducto").value,
        document.getElementById("nombreProducto").value,
        document.getElementById("categoriaProducto").value,
        isChecked
    );

    console.log(nuevoProducto);
    listaProducto.push(nuevoProducto);
    localStorage.setItem("listaProducto", JSON.stringify(listaProducto));
    Swal.fire("Producto creado", "", "success");
    limpiarFormulario();
    leerDatos();
};
function limpiarFormulario() {
    // document.getElementById('formProducto').reset();
    let formulario = document.getElementById("formProducto");
    formulario.reset();
    let codigoProducto = document.getElementById(`codigoProducto`);
    codigoProducto.className = "form-control";
    let nombreProducto = document.getElementById(`nombreProducto`);
    nombreProducto.className = "form-control";
    let categoriaProducto = document.getElementById(`categoriaProducto`);
    categoriaProducto.className = "form-control";
    //limpiar las clases de los input
}
function leerDatos() {
    if (localStorage.length > 0) {
        let _listaProducto = JSON.parse(localStorage.getItem("listaProducto"));
        if (listaProducto.length === 0) {
            listaProducto = _listaProducto;
        }
        dibujarDatos(_listaProducto);
    }
}

function dibujarDatos(_listaProducto) {

    let bodyTablaProductos = document.getElementById("tbodyProductos");
    bodyTablaProductos.innerHTML = "";
    let codigoHTML = "";


    for (let i in _listaProducto) {
        codigoHTML = `
          <tr>
          <th scope="row">${_listaProducto[i].codigo}</th>
          <td>${_listaProducto[i].nombre}</td>
          <td>${_listaProducto[i].categoria}</td>
          <td>${_listaProducto[i].publicado}</td>
          <td>
              <button class="btn btn-warning" onclick='modificarProducto(this)' id='${_listaProducto[i].codigo}'>Editar</button>
              <button class="btn btn-danger" onclick="eliminarProducto(this)" id='${_listaProducto[i].codigo}'>Borrar</button>
          </td>
        </tr>
          `;
        bodyTablaProductos.innerHTML += codigoHTML;
    }
}
window.eliminarProducto = function (producto) {
    console.log('prueba', producto.id)

    Swal.fire({
        title: '¿Estas seguro de eliminar el funkopop seleccionado?',
        text: "No puede volver atras esta accion",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'si',
        cancelButtonText: 'cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // aqui borrar el producto
            let productoFiltrados = listaProducto.filter((producto) => {

                return producto.codigo != producto.id;

            })
            console.log(productoFiltrados);
            // pasamos los funko filtrados al arreglo principal
            listaProducto = productoFiltrados;
            // guardar en localstorage

            localStorage.setItem('listaProducto', JSON.stringify(listaProducto));
            // volver a dibujar la tabla
            leerDatos();
            // console.log(funkopopFiltrados)

            Swal.fire(
                'Funkopop eliminado',
                'El funkopop seleccionado fue eliminado del sistema',
                'success'
            )
        }
    })
}