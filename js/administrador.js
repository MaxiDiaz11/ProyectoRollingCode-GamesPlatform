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
// existeProducto=true significa que estoy editando un producto
// existeProducto=false significa que agrego un nuevo funko
let existeProducto = false;
leerDatos();

window.agregarProducto = function () {

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
        document.getElementById("descripcionProducto").value,
        document.getElementById("imagenProducto").value,
        isChecked
    );
    

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
    let descripcionProducto = document.getElementById(`descripcionProducto`);
    descripcionProducto.className = "form-control";
    let imagenProducto = document.getElementById(`imagenProducto`);
    imagenProducto.className = "form-control";

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
          <td>${_listaProducto[i].descripcion}</td>
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

    Swal.fire({
        title: '¿Estas seguro de eliminar el producto seleccionado?',
        text: "No puede volver atras esta accion",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'si',
        cancelButtonText: 'cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // borrar el producto
            // se utiliza el nombre productoAux porque producto ya esta siendo utilizado        
            let productoFiltrados = listaProducto.filter((productoAux) => {

                return productoAux.codigo != producto.id;
            })
            // pasamos los productos filtrados al arreglo principal
            listaProducto = productoFiltrados;
            // guardar en localstorage
            localStorage.setItem('listaProducto', JSON.stringify(listaProducto));
            // volver a dibujar la tabla
            leerDatos();
            Swal.fire(
                'Producto eliminado',
                'El producto seleccionado fue eliminado del sistema',
                'success'
            )
        }
    })
}
// esta funcion carga los datos del producto seleccionado
window.modificarProducto = function (btnEditar) {
    //console.log(btnEditar.id);
    // limpiar los datos de la ventana modal
    limpiarFormulario();
    // buscar el objeto a modificar
    let objetoEncontrado = listaProducto.find((productoss) => {
        return productoss.codigo === btnEditar.id;
    });

    //console.log(objetoEncontrado);
    //cargar los datos en el formulario
    document.getElementById('codigoProducto').value = objetoEncontrado.codigo;
    document.getElementById('nombreProducto').value = objetoEncontrado.nombre;
    document.getElementById('categoriaProducto').value = objetoEncontrado.categoria;
    document.getElementById('descripcionProducto').value = objetoEncontrado.descripcion;
    document.getElementById('imagenProducto').value = objetoEncontrado.imagen;
    //console.log(objetoEncontrado.publicado);

    var isChecked = objetoEncontrado.publicado;
    if (isChecked == 'Publicado') {
        document.getElementById('checkPublicado').checked = true;
    } else {
        isChecked = 'No publicado'
        document.getElementById('checkPublicado').checked = false;
    }


    //cambiar el valor de la variable existeProducto 
    existeProducto = true;
    // mostrar la ventana modal
    modalProducto.show();
}

window.guardarProducto = function (event) {

    event.preventDefault();
    if (existeProducto === true) {
        // en este caso quiero modificar
        actualizarDatos();
    } else {
        // en este caso quiero agregar un funko nuevo
        agregarProducto();
    }
}

function actualizarDatos() {
    // esta funcion guarda en LS con los datos modificados
    console.log('modificar');
    console.log(document.getElementById('codigoProducto').value);
    let codigo = document.getElementById('codigoProducto').value;
    let nombre = document.getElementById('nombreProducto').value;
    let categoria = document.getElementById('categoriaProducto').value;

    let descripcion = document.getElementById('descripcionProducto').value;
    let imagen = document.getElementById('imagenProducto').value;

    let publicado = document.getElementById('checkPublicado').checked;
    if (publicado == true) {
        publicado = 'Publicado'
    } else {
        publicado = 'No publicado'
    }
    // buscar el objeto que quiero modificar y cambiar sus valores
    for (let i in listaProducto) {
        if (listaProducto[i].codigo === codigo) {
            // encontre el producto que quiero editar
            listaProducto[i].nombre = nombre;
            listaProducto[i].categoria = categoria;
            
            listaProducto[i].descripcion = descripcion;
            listaProducto[i].imagen = imagen;
            listaProducto[i].publicado = publicado;

        }
    }

    // guardar el arreglo de productos en localstorage
    localStorage.setItem('listaProducto', JSON.stringify(listaProducto))
    // limpiar los datos del formulario
    limpiarFormulario();
    // cerrar ventana modal
    modalProducto.hide();
    // mostrar mensaje de modificacion exitosa
    Swal.fire(
        "Modificacion exitosa",
        "Se actualizo correctamente su producto",
        "success"
    );
    // leer localstorage y dibujar los datos actualizados en la tabla
    leerDatos();

}