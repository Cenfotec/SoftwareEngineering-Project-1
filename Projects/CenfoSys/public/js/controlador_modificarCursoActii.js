//llamada de la función
mostrarDatos();
let botonActualizar = document.querySelector('#btnActualizar');
botonActualizar.addEventListener('click', obtenerDatosActualizar);


//Se obtienen los datos del curso a actualizar
function mostrarDatos() {
    // mostrarSedesAAsociar();
    // mostrarProfesorAAsociar();
    let curso = getCursoActii();


    document.querySelector('#txtCodigo').disabled = true;

    document.querySelector("#txtCodigo").value = curso[0];
    document.querySelector("#txtNombre").value = curso[1];
    document.querySelector("#nHoras").value = curso[2];
    document.querySelector("#nCosto").value = curso[3];
    let listaCheckboxSedes = document.querySelectorAll('#tblSedes tbody input[type=checkbox]');
    let listaCheckboxProfesores = document.querySelectorAll('#tblProfesores tbody input[type=checkbox]');
    document.querySelector("#txtFechaInicio").value = curso[7];
    document.querySelector("#txtFechaFin").value = curso[8];


    let sedesAsociadas = curso[5];


    for (let i = 0; i < listaCheckboxSedes.length; i++) {
        for (let j = 0; j < sedesAsociadas.length; j++) {
            if (listaCheckboxSedes[i].dataset.nombre == sedesAsociadas[j][0]) {
                listaCheckboxSedes[i].checked = true;
            }
        }
    }

    let profesoresAsociados = curso[6];

    for (let i = 0; i < listaCheckboxProfesores.length; i++) {
        for (let j = 0; j < profesoresAsociados.length; j++) {
            if (listaCheckboxProfesores[i].dataset.identificacion == profesoresAsociados[j][0]) {
                listaCheckboxProfesores[i].checked = true;
            }
        }
    }
}



//obtencion de datos para modificar
function obtenerDatosActualizar() {
    let curso = getCursoActii();
    let bError = validarRegistro();
    if (!bError) {
        let infoCursos = [];

        let sCodigo = document.querySelector("#txtCodigo").value;
        let sNombre = document.querySelector("#txtNombre").value;
        let nHoras = document.querySelector("#nHoras").value;
        let nCosto = document.querySelector("#nCosto").value;
        let sEstado = curso[4];
        let sedesAsociadas = [];

        sedesAsociadas = guardarSedesAsociar();
        profesoresAsociados = guardarProfesorAsociar();

        let sFechaInicio = document.querySelector("#txtFechaInicio").value;
        let sFechaFin = document.querySelector("#txtFechaFin").value;

        infoCursos.push(sCodigo, sNombre, nHoras, nCosto, sEstado, sedesAsociadas, profesoresAsociados, sFechaInicio, sFechaFin);

        actualizarCursoActii(infoCursos);
        swal({
          title: "Curso actualizado",
          text: "Los datos del curso se actualizaron exitosamente.",
          buttons: {
            confirm: "Aceptar",
          },
        });
        setTimeout(() => {
            location.href = "ListarCursosActii.html";
        }, 1500);
    } else {
      swal({
        title: "Modificación inválida",
        text: "Por favor complete todos los espacios obligatorios marcados en rojo.",
        buttons: {
          cancel: "Aceptar",
        },
      });
    }
}
//Validación de campos del formulario
function validarRegistro() {
    let inputsRequeridos = document.querySelectorAll('[required]');
    let bError = false;

    for (let i = 0; i < inputsRequeridos.length; i++) {
        if (inputsRequeridos[i].value == '') {
            inputsRequeridos[i].classList.add('invalido');
            bError = true;
        } else {
            inputsRequeridos[i].classList.remove('invalido');
        }
    }
    return bError;
}


// *******************Tabla de asociacion de sedes

//Muestra tabla de las sedes que se pueden asociar a una carrera
function mostrarSedesAAsociar() {
    // let sBuscar = document.querySelector('#txtBuscarSedes').value;
    let listaSedes = getListaSede();
    let cuerpoTabla = document.querySelector('#tblSedes tbody');

    cuerpoTabla.innerHTML = '';

    for (let i = 0; i < listaSedes.length; i++) {
        // if (listaSedes[i][0].toLowerCase().includes(sBuscar.toLowerCase())) {

        if (listaSedes[i][6] == true) {
            let fila = cuerpoTabla.insertRow();
            fila.dataset.nombre = listaSedes[i][0];
            //fila.addEventListener('click', visualizar);

            let checkSeleccion = document.createElement('input');
            checkSeleccion.setAttribute('type', 'checkbox');
            checkSeleccion.dataset.nombre = listaSedes[i][0];

            let cSeleccion = fila.insertCell();
            let cNombreSede = fila.insertCell();

            let sNombreSede = document.createTextNode(listaSedes[i][0]);

            cSeleccion.appendChild(checkSeleccion);
            cNombreSede.appendChild(sNombreSede);
        }
    }
}

//Guarda las sedes seleccionadas con checkbox
function guardarSedesAsociar() {
    let listaCheckboxSedes = document.querySelectorAll('#tblSedes tbody input[type=checkbox]:checked');
    let sedesSeleccionadas = [];
    let infoSede;

    //Este ciclo for debe empezar en 1, ya que en el cero "0" se encuentra el id unico del elemento al que se le desea agregar elementos
    for (let i = 0; i < listaCheckboxSedes.length; i++) {
        infoSede = listaCheckboxSedes[i].dataset.nombre;
        sedesSeleccionadas.push(buscarSedePorNombre(infoSede));
    }

    return sedesSeleccionadas;


}

// *******************Tabla de asociacion de profesores

//Muestra tabla de los profesores que se pueden asociar a un curso de carrera
function mostrarProfesorAAsociar() {

    let listaProfesores = getListaProfesores();
    let cuerpoTabla = document.querySelector('#tblProfesores tbody');

    cuerpoTabla.innerHTML = '';

    for (let i = 0; i < listaProfesores.length; i++) {


        if (listaProfesores[i][30] == true) {
            let fila = cuerpoTabla.insertRow();
            fila.dataset.identificacion = listaProfesores[i][0];

            let checkSeleccion = document.createElement('input');
            checkSeleccion.setAttribute('type', 'checkbox');
            checkSeleccion.dataset.identificacion = listaProfesores[i][0];

            let cSeleccion = fila.insertCell();
            let cNombreProfesor = fila.insertCell();
            let cApellidoProfesor = fila.insertCell();

            let sNombreProfesor = document.createTextNode(listaProfesores[i][2]);
            let sApellidoProfesor = document.createTextNode(listaProfesores[i][4])

            cSeleccion.appendChild(checkSeleccion);
            cNombreProfesor.appendChild(sNombreProfesor);
            cApellidoProfesor.appendChild(sApellidoProfesor);
        }
    }
}

//Guarda las sedes seleccionadas con checkbox
function guardarProfesorAsociar() {
    let listaCheckboxProfesores = document.querySelectorAll('#tblProfesores tbody input[type=checkbox]:checked');
    let profesoresSeleccionados = [];
    let infoProfesores;


    for (let i = 0; i < listaCheckboxProfesores.length; i++) {
        infoProfesores = listaCheckboxProfesores[i].dataset.identificacion;
        profesoresSeleccionados.push(buscarProfesorPorId(infoProfesores));
    }

    return profesoresSeleccionados;

}
