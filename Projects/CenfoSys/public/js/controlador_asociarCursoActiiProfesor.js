mostrarCursos();
mostrarProfesores();
disableProfesores();

document.querySelector('#btnAsociar').addEventListener('click', asociarSedeProfesor);
document.querySelector('#txtBuscarCursos').addEventListener('keyup', mostrarCursos)
document.querySelector('#txtBuscarProfesores').addEventListener('keyup', mostrarProfesores);

//Muestra todos los cursos de actualizacion activados en una tabla
function mostrarCursos() {
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
                checkSeleccion.addEventListener('click', verificarCheckCursos);
                checkSeleccion.addEventListener('click', mostrarProfesoresSede);



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
function mostrarProfesores() {
    let sBuscar = document.querySelector('#txtBuscarProfesores').value;
    let listaProfesores = getListaProfesores();
    let cuerpoTabla = document.querySelector('#tblProfesores tbody');

    cuerpoTabla.innerHTML = '';

    for (let i = 0; i < listaProfesores.length; i++) {

        if (listaProfesores[i][0].toLowerCase().includes(sBuscar.toLowerCase())) {
            if (listaProfesores[i][30] == true) {
                let fila = cuerpoTabla.insertRow();

                let checkSeleccion = document.createElement('input');
                checkSeleccion.setAttribute('type', 'checkbox');
                checkSeleccion.classList.add('checkbox');
                checkSeleccion.dataset.identificacion = listaProfesores[i][0];

                let cSeleccionar = fila.insertCell();
                let cIdentificacion = fila.insertCell();
                cIdentificacion.dataset.id = listaProfesores[i][0];
                cIdentificacion.setAttribute('data-tooltip', 'Ver profesor');
                cIdentificacion.classList.add('tooltip-bottom');
                //cIdentificacion.addEventListener('click', visualizar);
                let cPNombre = fila.insertCell();
                let cPApellido = fila.insertCell();

                let sIdentificacion = document.createTextNode(listaProfesores[i][0]);
                let sPNombre = document.createTextNode(listaProfesores[i][2]);
                let sPApellido = document.createTextNode(listaProfesores[i][4]);

                let listaCheckboxProfesores = document.querySelectorAll('#tblProfesores tbody input[type=checkbox]');

                cSeleccionar.appendChild(checkSeleccion);
                cIdentificacion.appendChild(sIdentificacion);
                cPNombre.appendChild(sPNombre);
                cPApellido.appendChild(sPApellido);
            }
        }
    }
}

//Verifica que solo un curso sea seleccionado o que al menos uno sea seleccionado antes de asociar profesores
function verificarCheckCursos() {
    let checkboxes = document.querySelectorAll('#tblCursosActii tbody input[type=checkbox]');
    let checkeado = false;

    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkeado = true;
        }
    }
    if (checkeado == true) {
        disableCursos();
        enableProfesores();
    } else {
        enableCursos();
        disableProfesores();
    }

}

//Deshabilita checkboxes de cursos actii
function disableCursos() {
    let checkboxes = document.querySelectorAll('#tblCursosActii tbody input[type=checkbox]');

    for (let i = 0; i < checkboxes.length; i++) {
        if (!(checkboxes[i].checked)) {
            checkboxes[i].disabled = true;
        }
    }
}

//Habilita checkboxes de cursos actii
function enableCursos() {
    let checkboxes = document.querySelectorAll('#tblCursosActii tbody input[type=checkbox]');

    for (let i = 0; i < checkboxes.length; i++) {
        if (!(checkboxes[i].checked)) {
            checkboxes[i].disabled = false;
        }
    }
}

//Desahibilita los checkboxes de los profesores
function disableProfesores() {
    let checkboxes = document.querySelectorAll('#tblProfesores tbody input[type=checkbox]');

    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
        checkboxes[i].disabled = true;
    }
}

//Habilita los checkboxes de los profesores
function enableProfesores() {
    let checkboxes = document.querySelectorAll('#tblProfesores tbody input[type=checkbox]');

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
function guardarSedeAsociar() {
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
function guardarProfesoresAsociar() {

    let listaCheckboxProfesores = document.querySelectorAll('#tblProfesores tbody input[type=checkbox]:checked');
    let profesoresSeleccionados = [];
    let idProfesor;

    //Este ciclo for debe empezar en 1, ya que en el cero "0" se encuentra el id unico del elemento al que se le desea agregar elementos
    for (let i = 0; i < listaCheckboxProfesores.length; i++) {
        idProfesor = listaCheckboxProfesores[i].dataset.identificacion;
        profesoresSeleccionados.push(idProfesor);
    }

    return profesoresSeleccionados;


}
//muestra chequeados los profesores ya asignados
function mostrarProfesoresSede() {
    let cursoSelect = this.dataset.codigo;
    let cursoActii = buscarCursoActiiPorCod(cursoSelect);
    let listaProfesores = getListaProfesores();
    let listaCheckboxProfesores = document.querySelectorAll('#tblProfesores tbody input[type=checkbox]');
    let cedProfs = [];

    for (let i = 0; i < cursoActii[6].length; i++) {
            cedProfs.push(cursoActii[6][i]);
    }

    for (let j = 0; j < listaProfesores.length; j++) {
        for (let k = 0; k < cedProfs.length; k++) {
            if (listaProfesores[j][0] == cedProfs[k]) {
                listaCheckboxProfesores[j].checked = true;
            }
        }
    }
    verificarCheckCursos();
}
//Asociar profesores a curso actii
function asociarSedeProfesor() {
    let codigoCursoActii = guardarSedeAsociar();

    let cursoActii = buscarCursoActiiPorCod(codigoCursoActii);

    let profesoresSeleccionados = guardarProfesoresAsociar();

    console.log(profesoresSeleccionados);


    let listaCursoActii = [];

    let sCodigo = cursoActii[0];
    let sNombreCurso = cursoActii[1];
    let nHoras = cursoActii[2];
    let nCosto = cursoActii[3];
    let bEstado = cursoActii[4];
    let CursosAsociadas = cursoActii[5]
    let profesoresAsociados = profesoresSeleccionados;
    let sFechaInicio = cursoActii[7];
    let sFechaFin = cursoActii[8];

    if (profesoresAsociados.length == 0) {
        swal({
            title: "Asociación inválida",
            text: "No se le asignó ningun profesor al curso.",
            buttons: {
                confirm: "Aceptar",
            },
        });
    } else {
        listaCursoActii.push(sCodigo, sNombreCurso, nHoras, nCosto, bEstado, CursosAsociadas, profesoresAsociados, sFechaInicio, sFechaFin);
        actualizarCursoActii(listaCursoActii);

        swal({
            title: "Asociación registrada",
            text: "Se le asignó un curso de actualización a un profesor exitosamente.",
            buttons: {
              confirm: "Aceptar",
            },
          });
          limpiarCheckbox();
    }
}
