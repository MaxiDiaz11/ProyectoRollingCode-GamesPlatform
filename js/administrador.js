import { producto } from "./productoClass.js";

let listaProducto = [];

window.agregarProducto = function (event) {
    event.preventDefault();
    let nuevoProducto = new producto(
        document.getElementById("codigoProducto").value,
        document.getElementById("nombreProducto").value,
        document.getElementById("categoriaProducto").value,
        document.getElementById("checkPublicado").value
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
              <button class="btn btn-warning" onclick='modificarFunkopop(this)' id='${_listaProducto[i].codigo}'>Editar</button>
              <button class="btn btn-danger" onclick="eliminarFunkopop(this)" id='${_listaProducto[i].codigo}'>Borrar</button>
          </td>
        </tr>
          `;
        bodyTablaProductos.innerHTML += codigoHTML;
    }
}
