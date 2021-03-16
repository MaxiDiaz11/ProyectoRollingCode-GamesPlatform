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
};
