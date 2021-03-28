
let listaProducto = [];
leerProductos();
function leerProductos(){
    if (localStorage.length>0) {
        listaProducto = JSON.parse( localStorage.getItem('listaProducto'))
        dibujarCard();
    } 
}

function dibujarCard(){
    let fila =document.getElementById('listaProducto');
    //limpiar codigo
    fila.innerHTML='';
    console.log(listaProducto);
    //se recorre el arreglo
    


}