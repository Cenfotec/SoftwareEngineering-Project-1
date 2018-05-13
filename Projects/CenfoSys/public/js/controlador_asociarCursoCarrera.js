mostrarCarreras();
mostrarCursos();
disableCursos();

document.querySelector('#btnAsociar').addEventListener('click', asociarCursosCarrera);
document.querySelector('#txtBuscarCarreras').addEventListener('keyup', mostrarCarreras);
document.querySelector('#txtBuscarCursos').addEventListener('keyup', mostrarCursos);

//Muestra todos los cursos de actualizacion activados en una tabla
function mostrarCarreras() {
    let sBuscar = document.querySelector('#txtBuscarCarreras').value;
    let listaCarreras = getListaCarrera();


    let cuerpoTabla = document.querySelector('#tblCarreras tbody');

    cuerpoTabla.innerHTML = '';

    for (let i = 0; i < listaCarreras.length; i++) {
        if (listaCarreras[i][0].toLowerCase().includes(sBuscar.toLowerCase())) {

            if (listaCarreras[i][6] == true) {
                let fila = cuerpoTabla.insertRow();
                fila.dataset.codigo = listaCarreras[i][0];

                let checkSeleccion = document.createElement('input');
                checkSeleccion.setAttribute('type', 'checkbox');
                checkSeleccion.classList.add('checkbox');
                checkSeleccion.dataset.codigo = listaCarreras[i][0];
                checkSeleccion.addEventListener('click', verificarCheckCarreras);
                checkSeleccion.addEventListener('click', mostrarSedesCarrera);



                let cSeleccion = fila.insertCell();
                let cCodigo = fila.insertCell();
                let cNombreCarrera = fila.insertCell();
                let cCreditos = fila.insertCell();


                let sCodigo = document.createTextNode(listaCarreras[i][0]);
                let sNombreCarrera = document.createTextNode(listaCarreras[i][1]);
                let sCreditos = document.createTextNode(listaCarreras[i][3]);

                let listaCheckboxCarreras = document.querySelectorAll('#tblCursosActii tbody input[type=checkbox]');

                cSeleccion.appendChild(checkSeleccion);
                cCodigo.appendChild(sCodigo);
                cNombreCarrera.appendChild(sNombreCarrera);
                cCreditos.appendChild(sCreditos);
            }
        }
    }
}
//Muestra todos los profesores activados en una tabla
function mostrarCursos() {
    let sBuscar = document.querySelector('#txtBuscarCursos').value;
    let listaCursos = getListaCursos();
    let cuerpoTabla = document.querySelector('#tblCursos tbody');

    cuerpoTabla.innerHTML = '';

    for (let i = 0; i < listaCursos.length; i++) {

        if (listaCursos[i][0].toLowerCase().includes(sBuscar.toLowerCase())) {
            if (listaCursos[i][5] == true) {
                let fila = cuerpoTabla.insertRow();

                let checkSeleccion = document.createElement('input');
                checkSeleccion.setAttribute('type', 'checkbox');
                checkSeleccion.classList.add('checkbox');
                checkSeleccion.dataset.codigo = listaCursos[i][0];

                let cSeleccionar = fila.insertCell();
                let cCodigo = fila.insertCell();
                let cNombre = fila.insertCell();
                let cCreditos = fila.insertCell();

                let sCodigo = document.createTextNode(listaCursos[i][0]);
                let sNombre = document.createTextNode(listaCursos[i][1]);
                let sCreditos = document.createTextNode(listaCursos[i][2]);

                let listaCheckboxCursos = document.querySelectorAll('#tblCursos tbody input[type=checkbox]');

                cSeleccionar.appendChild(checkSeleccion);
                cCodigo.appendChild(sCodigo);
                cNombre.appendChild(sNombre);
                cCreditos.appendChild(sCreditos);
            }
        }
    }
}

//Verifica que solo un curso sea seleccionado o que al menos uno sea seleccionado antes de asociar profesores
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
        enableCursos();
    } else {
        enableCarreras();
        disableCursos();
    }

}

//Deshabilita checkboxes de cursos actii
function disableCarreras() {
    let checkboxes = document.querySelectorAll('#tblCarreras tbody input[type=checkbox]');

    for (let i = 0; i < checkboxes.length; i++) {
        if (!(checkboxes[i].checked)) {
            checkboxes[i].disabled = true;
        }
    }
}

//Habilita checkboxes de cursos actii
function enableCarreras() {
    let checkboxes = document.querySelectorAll('#tblCarreras tbody input[type=checkbox]');

    for (let i = 0; i < checkboxes.length; i++) {
        if (!(checkboxes[i].checked)) {
            checkboxes[i].disabled = false;
        }
    }
}

//Desahibilita los checkboxes de los profesores
function disableCursos() {
    let checkboxes = document.querySelectorAll('#tblCursos tbody input[type=checkbox]');

    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
        checkboxes[i].disabled = true;
    }
}

//Habilita los checkboxes de los profesores
function enableCursos() {
    let checkboxes = document.querySelectorAll('#tblCursos tbody input[type=checkbox]');

    for (let i = 0; i < checkboxes.length; i++) {
        if (!(checkboxes[i].checked)) {
            checkboxes[i].disabled = false;
        }
    }
}

//Limpia los checkboxes
function limpiarCheckbox() {
    setTimeout(() => {
        location.reload();
    }, 1500);
}

//Devuelve codigo de curso actii seleccionado
function guardarCarreraAsociar() {
    let listaCheckboxCarreras = document.querySelectorAll('#tblCarreras tbody input[type=checkbox]:checked');
    let carreraSeleccionada = [];
    let codigoCarrera;

    for (let i = 0; i < listaCheckboxCarreras.length; i++) {
        codigoCarrera = listaCheckboxCarreras[i].dataset.codigo;
        carreraSeleccionada.push(codigoCarrera);
    }

    return carreraSeleccionada;
}
//Devuelve las identificaciones de los profesores seleccionados
function guardarCursosAsociar() {

    let listaCheckboxCursos = document.querySelectorAll('#tblCursos tbody input[type=checkbox]:checked');
    let cursosSeleccionados = [];
    let codigoCurso;

    //Este ciclo for debe empezar en 1, ya que en el cero "0" se encuentra el id unico del elemento al que se le desea agregar elementos
    for (let i = 0; i < listaCheckboxCursos.length; i++) {
        codigoCurso = listaCheckboxCursos[i].dataset.codigo;
        cursosSeleccionados.push(codigoCurso);
    }

    return cursosSeleccionados;


}
//muestra chequeados los profesores ya asignados
function mostrarSedesCarrera() {
    let carreraSelect = this.dataset.codigo;
    let carrera = buscarCarreraPorCodigo(carreraSelect);
    let listaCursos = getListaCursos();
    let listaCheckboxCursos = document.querySelectorAll('#tblCursos tbody input[type=checkbox]');
    let codigosCursos = [];

    for (let i = 0; i < carrera[7].length; i++) {
            codigosCursos.push(carrera[7][i]);
    }

    for (let j = 0; j < listaCursos.length; j++) {
        for (let k = 0; k < codigosCursos.length; k++) {
            if (listaCursos[j][0] == codigosCursos[k]) {
                listaCheckboxCursos[j].checked = true;
            }
        }
    }
    verificarCheckCarreras();
}
//Asociar profesores a curso actii
function asociarCursosCarrera() {
    let codigoCarrera = guardarCarreraAsociar();

    let carrera = buscarCarreraPorCodigo(codigoCarrera);

    let cursosSeleccionados = guardarCursosAsociar();



    let listaCarrera = [];

    let sCodigo = carrera[0];
    let sNombreCarrera = carrera[1];
    let sGradoAcademico = carrera[2];
    let nCreditos = carrera[3];
    let sVersion = carrera[4];
    let bAcreditacion = carrera[5]
    let bEstado = carrera[6];
    let cursosAsociados = cursosSeleccionados;
    let sedesAsociadas = carrera[8];

    if (cursosAsociados.length == 0) {
        swal({
            title: "Asociación inválida",
            text: "No se le asignó ningun curso a la carrera.",
            buttons: {
                confirm: "Aceptar",
            },
        });
    } else {
        listaCarrera.push(sCodigo, sNombreCarrera, sGradoAcademico, nCreditos, sVersion, bAcreditacion, bEstado, cursosAsociados, sedesAsociadas);
        actualizarCarrera(listaCarrera);

        swal({
            title: "Asociación registrada",
            text: "Se le asignaron cursos a la carrera exitosamente.",
            buttons: {
              confirm: "Aceptar",
            },
          });
          limpiarCheckbox();
    }
}
