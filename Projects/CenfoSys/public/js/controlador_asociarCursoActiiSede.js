mostrarCursosActii();
mostrarSedes();
disableSedes();

document.querySelector('#btnAsociar').addEventListener('click', asociarCursoActiiSedes);
document.querySelector('#txtBuscarCursos').addEventListener('keyup', mostrarCursosActii);
document.querySelector('#txtBuscarSedes').addEventListener('keyup', mostrarSedes);

//Muestra todos los cursos de actualizacion activados en una tabla
function mostrarCursosActii() {
    let sBuscar = document.querySelector('#txtBuscarCursos').value;
    let listaCursos = getListaCursosActii();


    let cuerpoTabla = document.querySelector('#tblCursosActii tbody');

    cuerpoTabla.innerHTML = '';

    for (let i = 0; i < listaCursos.length; i++) {
        if (listaCursos[i][1].toLowerCase().includes(sBuscar.toLowerCase())) {

            if (listaCursos[i][4] == true) {
                let fila = cuerpoTabla.insertRow();
                fila.dataset.codigo = listaCursos[i][0];

                let checkSeleccion = document.createElement('input');
                checkSeleccion.setAttribute('type', 'checkbox');
                checkSeleccion.classList.add('checkbox');
                checkSeleccion.dataset.codigo = listaCursos[i][0];
                checkSeleccion.addEventListener('click', verificarCheckCursosActii);
                checkSeleccion.addEventListener('click', mostrarSedesCurso);



                let cSeleccion = fila.insertCell();
                let cCodigo = fila.insertCell();
                let cNombreCurso = fila.insertCell();


                let sCodigo = document.createTextNode(listaCursos[i][0]);
                let sNombreCurso = document.createTextNode(listaCursos[i][1]);

                let listaCheckboxCursos = document.querySelectorAll('#tblCursosActii tbody input[type=checkbox]');

                cSeleccion.appendChild(checkSeleccion);
                cCodigo.appendChild(sCodigo);
                cNombreCurso.appendChild(sNombreCurso);
            }
        }
    }
}
//Muestra todos los profesores activados en una tabla
function mostrarSedes() {
    let sBuscar = document.querySelector('#txtBuscarSedes').value;
    let listaSedes = getListaSede();
    let cuerpoTabla = document.querySelector('#tblSedes tbody');

    cuerpoTabla.innerHTML = '';

    for (let i = 0; i < listaSedes.length; i++) {

        if (listaSedes[i][0].toLowerCase().includes(sBuscar.toLowerCase())) {
            if (listaSedes[i][7] == true) {
                let fila = cuerpoTabla.insertRow();

                let checkSeleccion = document.createElement('input');
                checkSeleccion.setAttribute('type', 'checkbox');
                checkSeleccion.classList.add('checkbox');
                checkSeleccion.dataset.nombre = listaSedes[i][0];

                let cSeleccionar = fila.insertCell();
                let cNombre = fila.insertCell();
                cNombre.dataset.nombre = listaSedes[i][0];
                let cTipo = fila.insertCell();

                let sNombre = document.createTextNode(listaSedes[i][0]);
                let sTipo = document.createTextNode(listaSedes[i][1].charAt(0).toUpperCase() + listaSedes[i][1].slice(1));

                let listaCheckboxSedes = document.querySelectorAll('#tblSedes tbody input[type=checkbox]');

                cSeleccionar.appendChild(checkSeleccion);
                cNombre.appendChild(sNombre);
                cTipo.appendChild(sTipo);
            }
        }
    }
}

//Verifica que solo un curso sea seleccionado o que al menos uno sea seleccionado antes de asociar profesores
function verificarCheckCursosActii() {
    let checkboxes = document.querySelectorAll('#tblCursosActii tbody input[type=checkbox]');
    let checkeado = false;

    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkeado = true;
        }
    }
    if (checkeado == true) {
        disableCursosActii();
        enableSedes();
    } else {
        enableCursosActii();
        disableSedes();
    }

}

//Deshabilita checkboxes de cursos actii
function disableCursosActii() {
    let checkboxes = document.querySelectorAll('#tblCursosActii tbody input[type=checkbox]');

    for (let i = 0; i < checkboxes.length; i++) {
        if (!(checkboxes[i].checked)) {
            checkboxes[i].disabled = true;
        }
    }
}

//Habilita checkboxes de cursos actii
function enableCursosActii() {
    let checkboxes = document.querySelectorAll('#tblCursosActii tbody input[type=checkbox]');

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

//Limpia los checkboxes
function limpiarCheckbox() {
    setTimeout(() => {
        location.reload();
    }, 1500);
}

//Devuelve codigo de curso actii seleccionado
function guardarCursoActiiAsociar() {
    let listaCheckboxCursos = document.querySelectorAll('#tblCursosActii tbody input[type=checkbox]:checked');
    let cursoSeleccionado = [];
    let codigoCurso;

    for (let i = 0; i < listaCheckboxCursos.length; i++) {
        codigoCurso = listaCheckboxCursos[i].dataset.codigo;
        cursoSeleccionado.push(codigoCurso);
    }

    return cursoSeleccionado;
}
//Devuelve las identificaciones de los profesores seleccionados
function guardarSedesAsociar() {

    let listaCheckboxSedes = document.querySelectorAll('#tblSedes tbody input[type=checkbox]:checked');
    let sedesSeleccionadas = [];
    let nombreSedes;

    for (let i = 0; i < listaCheckboxSedes.length; i++) {
        nombreSedes = listaCheckboxSedes[i].dataset.nombre;
        sedesSeleccionadas.push(nombreSedes);
    }

    return sedesSeleccionadas;


}
//muestra chequeados los profesores ya asignados
function mostrarSedesCurso() {
    let cursoSelect = this.dataset.codigo;
    let cursoActii = buscarCursoActiiPorCod(cursoSelect);
    let listaSedes = getListaSede();
    let listaCheckboxSedes = document.querySelectorAll('#tblSedes tbody input[type=checkbox]');
    let nombreSedes = [];


    for (let i = 0; i < cursoActii[5].length; i++) {
        nombreSedes.push(cursoActii[5][i]);
    }

    for (let j = 0; j < listaSedes.length; j++) {
        for (let k = 0; k < nombreSedes.length; k++) {
            if (listaSedes[j][0] == nombreSedes[k]) {
                listaCheckboxSedes[j].checked = true;
            }
        }
    }
    verificarCheckCursosActii();
}
//Asociar profesores a curso actii
function asociarCursoActiiSedes() {
    let codigoCursoActii = guardarCursoActiiAsociar();

    let cursoActii = buscarCursoActiiPorCod(codigoCursoActii);

    let sedesSeleccionadas = guardarSedesAsociar();


    let listaCursoActii = [];

    let sCodigo = cursoActii[0];
    let sNombreCurso = cursoActii[1];
    let nHoras = cursoActii[2];
    let nCosto = cursoActii[3];
    let bEstado = cursoActii[4];
    let sedesAsociadas = sedesSeleccionadas;
    let profesoresAsociados = cursoActii[6];
    let sFechaInicio = cursoActii[7];
    let sFechaFin = cursoActii[8];

    if (sedesAsociadas.length == 0) {
        swal({
            title: "Asociación inválida",
            text: "No se le asignó ningun profesor al curso.",
            buttons: {
                confirm: "Aceptar",
            },
        });
    } else {
        listaCursoActii.push(sCodigo, sNombreCurso, nHoras, nCosto, bEstado, sedesAsociadas, profesoresAsociados, sFechaInicio, sFechaFin);
        actualizarCursoActii(listaCursoActii);

        swal({
            title: "Asociación registrada",
            text: "Se le asignó un curso de actualización a una sede exitosamente.",
            buttons: {
                confirm: "Aceptar",
            },
        });
        limpiarCheckbox();
    }
}
