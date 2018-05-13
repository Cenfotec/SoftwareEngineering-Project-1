mostrarSedes();
mostrarCursosActii();
disableSedes();

document.querySelector('#btnAsociar').addEventListener('click', asociarCursoACarrera);
document.querySelector('#txtBuscarSedes').addEventListener('keyup', mostrarSedes);
document.querySelector('#txtBuscarCarreras').addEventListener('keyup', mostrarCursosActii);

//Muestra la tabla de cursos que se asocian a una carrera
function mostrarSedes() {
    let sBuscar = document.querySelector('#txtBuscarSedes').value;
    let listaSedes = getListaSede();


    let cuerpoTabla = document.querySelector('#tblSedes tbody');

    cuerpoTabla.innerHTML = '';

    for (let i = 0; i < listaSedes.length; i++) {
        if (listaSedes[i][0].toLowerCase().includes(sBuscar.toLowerCase())) {

            if (listaSedes[i][6] == true) {
                let fila = cuerpoTabla.insertRow();
                fila.dataset.nombre = listaSedes[i][0];

                let checkSeleccion = document.createElement('input');
                checkSeleccion.setAttribute('type', 'checkbox');
				        checkSeleccion.classList.add('checkbox');
                checkSeleccion.dataset.nombre = listaSedes[i][0];

                let cSeleccion = fila.insertCell();
                let cNombre = fila.insertCell();
                let cTipo = fila.insertCell();
                let cProvincia = fila.insertCell();

                let sNombre = document.createTextNode(listaSedes[i][0]);
                let sTipo = document.createTextNode(listaSedes[i][1].charAt(0).toUpperCase() + listaSedes[i][1].slice(1));
                let sProvincia = document.createTextNode(listaSedes[i][2]);

                let listaCheckboxCursos = document.querySelectorAll('#tblSedes tbody input[type=checkbox]');

                cSeleccion.appendChild(checkSeleccion);
                cNombre.appendChild(sNombre);
                cTipo.appendChild(sTipo);
                cProvincia.appendChild(sProvincia);
            }
        }
    }
}

//Muestra una lista de las carreras
function mostrarCursosActii() {
    let sBuscar = document.querySelector('#txtBuscarCarreras').value;
    let listaCarreras = getListaCarrera();
    let cuerpoTabla = document.querySelector('#tblCarreras tbody');

    cuerpoTabla.innerHTML = '';

    for (let i = 0; i < listaCarreras.length; i++) {
        if (listaCarreras[i][0].toLowerCase().includes(sBuscar.toLowerCase())) {

          if (listaCarreras[i][6] == true) {
              let fila = cuerpoTabla.insertRow();
              fila.dataset.id = listaCarreras[i][0];

              let checkSeleccion = document.createElement('input');
              checkSeleccion.setAttribute('type', 'checkbox');
              checkSeleccion.classList.add('checkbox');
              checkSeleccion.addEventListener('click', verificarCheckCarreras);
              checkSeleccion.addEventListener('click', mostrarSedesCarrera);
              checkSeleccion.dataset.codigo = listaCarreras[i][0];


              let cSeleccion = fila.insertCell();
              let cCodigo = fila.insertCell();
              let cNombreCarrera = fila.insertCell();

              let sCodigo = document.createTextNode(listaCarreras[i][0]);
              let sNombreCarrera = document.createTextNode(listaCarreras[i][1]);

              let listaCheckboxCarreras = document.querySelectorAll('#tblCarreras tbody input[type=checkbox]');

              cSeleccion.appendChild(checkSeleccion);
              cCodigo.appendChild(sCodigo);
              cNombreCarrera.appendChild(sNombreCarrera);
          }
        }
    }

}


//Funcion que devuelve un arreglo con los cursos seleccionados
function guardarSedesAsociar() {
    let listaCheckboxSedes = document.querySelectorAll('#tblSedes tbody input[type=checkbox]:checked');
    let sedesSeleccionadas = [];
    let nombreSede;

    //Este ciclo for debe empezar en 1, ya que en el cero "0" se encuentra el id unico del elemento al que se le desea agregar elementos
    for (let i = 0; i < listaCheckboxSedes.length; i++) {
        nombreSede = listaCheckboxSedes[i].dataset.nombre;
        sedesSeleccionadas.push(nombreSede);
    }

    return sedesSeleccionadas;


}

function guardarCarrerasAsociar() {
    let listaCheckboxCarreras = document.querySelectorAll('#tblCarreras tbody input[type=checkbox]:checked');
    let carrerasSeleccionadas = [];
    let codigoCarrera;

    //Este ciclo for debe empezar en 1, ya que en el cero "0" se encuentra el id unico del elemento al que se le desea agregar elementos
    for (let i = 0; i < listaCheckboxCarreras.length; i++) {
        codigoCarrera = listaCheckboxCarreras[i].dataset.codigo;
        carrerasSeleccionadas.push(codigoCarrera);
    }

    return carrerasSeleccionadas;
}

function verificarCheckCarreras() {
    let checkboxes = document.querySelectorAll('#tblCarreras tbody input[type=checkbox]');
    let checkeado = false;

    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkeado = true;
        }
    }
    if (checkeado == true) {
        disableCarreras();
        enableSedes();
    } else {
        enableCarreras();
        disableSedes();
    }

}

function disableCarreras() {
    let checkboxes = document.querySelectorAll('#tblCarreras tbody input[type=checkbox]');

    for (let i = 0; i < checkboxes.length; i++) {
        if (!(checkboxes[i].checked)) {
            checkboxes[i].disabled = true;
        }
    }
}

function enableCarreras() {
    let checkboxes = document.querySelectorAll('#tblCarreras tbody input[type=checkbox]');

    for (let i = 0; i < checkboxes.length; i++) {
        if (!(checkboxes[i].checked)) {
            checkboxes[i].disabled = false;
        }
    }
}

//Desahibilita los checkboxes de los profesores
function disableSedes() {
    let checkboxes = document.querySelectorAll('#tblSedes tbody input[type=checkbox]');

    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
        checkboxes[i].disabled = true;
    }
}

//Habilita los checkboxes de los profesores
function enableSedes() {
    let checkboxes = document.querySelectorAll('#tblSedes tbody input[type=checkbox]');

    for (let i = 0; i < checkboxes.length; i++) {
        if (!(checkboxes[i].checked)) {
            checkboxes[i].disabled = false;
        }
    }
}

function mostrarSedesCarrera() {
    let carreraSelect = this.dataset.codigo;
    let carrera = buscarCarreraPorCodigo(carreraSelect);
    let listaSedes = getListaSede();
    let listaCheckboxSedes = document.querySelectorAll('#tblSedes tbody input[type=checkbox]');
    let nombreSedes = [];

    for (let i = 0; i < carrera[8].length; i++) {
        nombreSedes.push(carrera[8][i]);
    }

    for (let j = 0; j < listaSedes.length; j++) {
        for (let k = 0; k < nombreSedes.length; k++) {
            if (listaSedes[j][0] == nombreSedes[k]) {
                listaCheckboxSedes[j].checked = true;
            }
        }
    }
    verificarCheckCarreras();
}

function asociarCursoACarrera() {
    let codigoCarrera = guardarCarrerasAsociar();

    let carrera = buscarCarreraPorCodigo(codigoCarrera);

    let sedesSeleccionadas = guardarSedesAsociar();

    let listaCarrera = [];

    let sCodigo = carrera[0];
    let sNombreCarrera = carrera[1];
    let sGradoAcademico = carrera[2];
    let nCreditos = carrera[3];
    let sVersion = carrera[4];
    let bAcreditacion = carrera[5]
    let sEstado = carrera[6];
    let cursosAsociados = carrera[7];
    let sedesAsociadas = sedesSeleccionadas;


    if (sedesAsociadas.length == 0) {
        swal({
            title: "Asociación inválida",
            text: "No se le asignó ninguna sede a la carrera.",
            buttons: {
                confirm: "Aceptar",
            },
        });
    } else {
        listaCarrera.push(sCodigo, sNombreCarrera, sGradoAcademico, nCreditos, sVersion, bAcreditacion, sEstado, cursosAsociados, sedesAsociadas);
        actualizarCarrera(listaCarrera);

        swal({
            title: "Asociación registrada",
            text: "Se le asignó una carrera a las sedes exitosamente.",
            buttons: {
                confirm: "Aceptar",
            },
        });
        limpiarCheckbox();
    }
}

//Limpia los checkboxes
function limpiarCheckbox() {
    setTimeout(() => {
        location.reload();
    }, 1500);
}
