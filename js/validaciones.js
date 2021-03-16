function validarCodigo (input) {
    if (input.value != '' && !isNaN(input.value)) {
        console.log('esta bien');
        input.className = 'form-control is-valid';
        return true;
    } else {
        console.log('faltan datos');
        input.className = 'form-control is-invalid';
        return false;
    }
}
function validarCampoRequerido(input) {
    if(input.value != '') {
        console.log('esta bien');
        input.className = 'form-control is-valid';
        return true;
    } else {
        console.log('faltan datos');
        input.className = 'form-control is-invalid';
        return false;
    }
}
