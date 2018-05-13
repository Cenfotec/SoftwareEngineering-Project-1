//llamada de la función
mostrarDatos();
let botonActualizar = document.querySelector('#btnActualizar');
botonActualizar.addEventListener('click', obtenerDatosActualizar);


//Se obtienen los datos del curso a actualizar
function mostrarDatos() {
    let curso = getCursoActii();


    document.querySelector('#txtCodigo').disabled = true;

    document.querySelector("#txtCodigo").value = curso[0];
    document.querySelector("#txtNombre").value=curso[1];
    document.querySelector("#txtCantidad").value=curso[2];
    document.querySelector("#nCosto").value=curso[3];
    // [ sCodigo, sNombre, sCantidad,nCosto,sEstado];
}



//obtencion de datos para modificar
function obtenerDatosActualizar() {
    let curso = getCursoActii();
    let bError = validarRegistro();
    if (!bError) {
        let infoCursos = [];

        let sCodigo = document.querySelector("#txtCodigo").value;
        let sNombre = document.querySelector("#txtNombre").value;
        let sCantidad = document.querySelector("#txtCantidad").value;
        let nCosto = document.querySelector("#nCosto").value;
        let sEstado = curso[4];



        infoCursos.push (sCodigo, sNombre, sCantidad,nCosto,sEstado);

        actualizarCursoActii(infoCursos);
        validarRegistro();

        swal({
            title: "Bien!",
            text: "Sea ha registrado un curso exitosamente",
            icon: "success",
            button: "ok",
        });
        setTimeout(() => {
            location.href = "ListarCursosActii.html";
        }, 1500);



    } else {
        swal({
            title: "Alto",
            text: "olvidaste llenar algunos espacios",
            icon: "warning",
            button: "ok",
        });

    }
}
//Validación de campos del formulario
function validarRegistro() {
    let inputsRequeridos = document.querySelectorAll('[required]');
    let bError = false;

    for (let i = 0; i < inputsRequeridos.length; i++) {
        if (inputsRequeridos[i].value == '') {
            inputsRequeridos[i].classList.add('errorInput');
            inputsRequeridos[i].classList.remove('input');
            bError = true;
        } else {
            inputsRequeridos[i].classList.remove('errorInput');
            inputsRequeridos[i].classList.add('input');
        }
    }
    return bError;
}







