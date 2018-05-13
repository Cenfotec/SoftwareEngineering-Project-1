mostrarCursosAAsociar();
mostrarDatos();
mostrarCursosAsociados();
mostrarProfesores();
tabPeriodoFunc();

document.querySelector('#btnAnnadir').addEventListener('click', asociarProfACursos);
document.querySelector('#btnActualizar').addEventListener('click', obtenerDatosActualizados);
document.querySelector('#txtBuscarCursos').addEventListener('keyup', mostrarCursosAAsociar);
document.querySelector('#txtBuscarCursosPeriodo').addEventListener('keyup', mostrarProfCurso);
document.querySelector('#txtBuscarProf').addEventListener('keyup', mostrarCursosAAsociar);
document.querySelector('#tabProfesores').addEventListener('click', mostrarProfesores);
document.querySelector('#tabPeriodo').addEventListener('click', tabPeriodoFunc);
let cursosConProf = [];

function mostrarDatos() {
    let listaPeriodo = getPeriodo();

    document.querySelector('#txtCuatrimestre').value = listaPeriodo[0];
    document.querySelector('#txtAnno').value = listaPeriodo[1];
    let listaCheckboxCursos = document.querySelectorAll('#tblCursos tbody input[type=checkbox]');
    let cursosAsociados = [];

    let aCursos = getListaCursos();
    let codigosCursosAsociados = listaPeriodo[3];

    for (let i = 0; i < codigosCursosAsociados.length; i++) {
        cursosAsociados.push(buscarCursoPorCod(codigosCursosAsociados[i]));
    }

    for (let i = 0; i < listaCheckboxCursos.length; i++) {
        for (let j = 0; j < cursosAsociados.length; j++) {
            if (listaCheckboxCursos[i].dataset.codigo == cursosAsociados[j][0]) {

                listaCheckboxCursos[i].checked = true;
            }
        }
    }
}

//Primera tabla en primer tab
function mostrarCursosAAsociar() {
    let sBuscar = document.querySelector('#txtBuscarCursos').value;
    let listaCursos = getListaCursos();
    let cuerpoTabla = document.querySelector('#tblCursos tbody');

    cuerpoTabla.innerHTML = '';

    for (let i = 0; i < listaCursos.length; i++) {
        if (listaCursos[i][0].toLowerCase().includes(sBuscar.toLowerCase())) {

            if (listaCursos[i][5] == true) {
                let fila = cuerpoTabla.insertRow();
                fila.dataset.id = listaCursos[i][0];

                let checkSeleccion = document.createElement('input');
                checkSeleccion.setAttribute('type', 'checkbox');
                checkSeleccion.dataset.codigo = listaCursos[i][0];
                checkSeleccion.addEventListener('click', mostrarCursosAsociados);

                let cSeleccion = fila.insertCell();
                let cCodigo = fila.insertCell();
                let cNombre = fila.insertCell();

                let sCodigo = document.createTextNode(listaCursos[i][0]);
                let sNombre = document.createTextNode(listaCursos[i][1]);

                let listaCheckboxCursos = document.querySelectorAll('#tblCursos tbody input[type=checkbox]');

                cSeleccion.appendChild(checkSeleccion);
                cCodigo.appendChild(sCodigo);
                cNombre.appendChild(sNombre);
            }
        }
    }
    mostrarCursosAsociados();
}

//Tabla de cursos en el segundo tab
function mostrarCursosAsociados() {

    let listaCheckboxCursos = document.querySelectorAll('#tblCursos tbody input[type=checkbox]:checked');

    let cursosAsociados = [];
    let infoCurso;

    for (let i = 0; i < listaCheckboxCursos.length; i++) {
        infoCurso = listaCheckboxCursos[i].dataset.codigo;
        cursosAsociados.push(buscarCursoPorCod(infoCurso));
    }


    let sBuscar = document.querySelector('#txtBuscarCursosPeriodo').value;
    let cuerpoTabla = document.querySelector('#tblCursosPeriodo tbody');
    cuerpoTabla.innerHTML = '';

    for (let i = 0; i < cursosAsociados.length; i++) {
        // if (listaCursos[i][1].toLowerCase().includes(sBuscar.toLowerCase())) {

        if (cursosAsociados[i][5] == true) {
            let fila = cuerpoTabla.insertRow();
            fila.dataset.id = cursosAsociados[i][0];

            let checkSeleccion = document.createElement('input');
            checkSeleccion.setAttribute('type', 'checkbox');
            checkSeleccion.addEventListener('click', verificarCheckCursos);
            checkSeleccion.dataset.codigo = cursosAsociados[i][0];
            checkSeleccion.addEventListener('click', mostrarProfCurso);

            let cSeleccion = fila.insertCell();
            let cCodigo = fila.insertCell();
            let cNombre = fila.insertCell();

            let sCodigo = document.createTextNode(cursosAsociados[i][0]);
            let sNombre = document.createTextNode(cursosAsociados[i][1]);

            let listaCheckboxCursos = document.querySelectorAll('#tblCursosPeriodo tbody input[type=checkbox]');

            cSeleccion.appendChild(checkSeleccion);
            cCodigo.appendChild(sCodigo);
            cNombre.appendChild(sNombre);
        }
    }
}

function verificarCheckCursos() {
    let checkboxes = document.querySelectorAll('#tblCursosPeriodo tbody input[type=checkbox]');
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

function disableCursos() {
    let checkboxes = document.querySelectorAll('#tblCursosPeriodo tbody input[type=checkbox]');

    for (let i = 0; i < checkboxes.length; i++) {
        if (!(checkboxes[i].checked)) {
            checkboxes[i].disabled = true;
        }
    }
}

function enableCursos() {
    let checkboxes = document.querySelectorAll('#tblCursosPeriodo tbody input[type=checkbox]');

    for (let i = 0; i < checkboxes.length; i++) {
        if (!(checkboxes[i].checked)) {
            checkboxes[i].disabled = false;
        }
    }
}

function disableProfesores() {
    let checkboxes = document.querySelectorAll('#tblProfesores tbody input[type=checkbox]');

    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
        checkboxes[i].disabled = true;
    }
}

function enableProfesores() {
    let checkboxes = document.querySelectorAll('#tblProfesores tbody input[type=checkbox]');

    for (let i = 0; i < checkboxes.length; i++) {
        if (!(checkboxes[i].checked)) {
            checkboxes[i].disabled = false;
        }
    }
}

function mostrarProfesores() {
    document.querySelector('#CursoProfesor').style.marginTop = '100px';
    document.querySelector('#CursoProfesor').classList.remove('ocultar');
    document.querySelector('#Profesor').style.display = 'block';
    document.querySelector('#Profesor').classList.remove('ocultar');
    document.querySelector('#Periodo').classList.add('ocultar');
    //document.querySelector('#Curso').classList.add('ocultar');

    let sBuscar = document.querySelector('#txtBuscarProf').value;
    let listaProfesores = getListaProfesores();
    let cuerpoTabla = document.querySelector('#tblProfesores tbody');

    cuerpoTabla.innerHTML = '';

    for (let i = 0; i < listaProfesores.length; i++) {

        if (listaProfesores[i][0].toLowerCase().includes(sBuscar.toLowerCase())) {
            if (listaProfesores[i][30] == true) {
                let fila = cuerpoTabla.insertRow();

                let checkSeleccion = document.createElement('input');
                checkSeleccion.setAttribute('type', 'checkbox');
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

function mostrarProfCurso() {
    let cursoSelect = this.dataset.codigo;
    let periodo = getPeriodo();
    let listaProfesores = getListaProfesores();
    let listaCheckboxProfesores = document.querySelectorAll('#tblProfesores tbody input[type=checkbox]');
    let cedProfs = [];

    for (let i = 0; i < periodo[4].length; i++) {
        if (cursoSelect == periodo[4][i][0]) {
            cedProfs = periodo[4][i][1];
        }
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

function asociarProfACursos() {
    let listaCheckboxCursos = document.querySelectorAll('#tblCursosPeriodo tbody input[type=checkbox]');
    let listaCheckboxProfesores = document.querySelectorAll('#tblProfesores tbody input[type=checkbox]');
    let codCurso;
    let idProfs = [];
    let infoAsoc = [];
    let existe = false;




    for (let i = 0; i < listaCheckboxCursos.length; i++) {
        if (listaCheckboxCursos[i].checked == true) {
            codCurso = listaCheckboxCursos[i].dataset.codigo;
        }
    }

    for (let i = 0; i < cursosConProf.length; i++) {
        if (cursosConProf[i][0] == codCurso) {
            existe = true;
        }
    }

    if (existe == false) {
        for (let i = 0; i < listaCheckboxProfesores.length; i++) {
            if (listaCheckboxProfesores[i].checked == true) {
                idProfs.push(listaCheckboxProfesores[i].dataset.identificacion);
            }
        }
        infoAsoc = [codCurso, idProfs];
        cursosConProf.push(infoAsoc);

        limpiarCheckbox();
        verificarCheckCursos();

        swal({
            title: "Curso asociado",
            text: "Profesor y curso asociados.",
            buttons: {
                confirm: "Aceptar",
            },
        });

    } else {
        swal({
            title: "Curso inválido",
            text: "El curso al que desea asignarle profesores ya fue seleccionado.",
            buttons: {
                cancel: "Aceptar",
            },
        });
    }
}

function limpiarCheckbox() {
    let listaCheckboxCursos = document.querySelectorAll('#tblCursosPeriodo tbody input[type=checkbox]');
    let listaCheckboxProfesores = document.querySelectorAll('#tblProfesores tbody input[type=checkbox]');

    for (let i = 0; i < listaCheckboxCursos.length; i++) {
        listaCheckboxCursos[i].checked = false;
    }

    for (let i = 0; i < listaCheckboxProfesores.length; i++) {
        listaCheckboxProfesores[i].checked = false;
    }
}

function guardarCursosPeriodo() {
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


function obtenerDatosActualizados() {


    let listaPeriodo = [];
    let cuatrimestre = document.querySelector('#txtCuatrimestre').value;
    let anno = document.querySelector('#txtAnno').value;
    let cursosAsociados = guardarCursosPeriodo();
    let bEstado = true;

    if ((cursosConProf.length == 0) || (cursosAsociados.length == 0)) {
        swal({
            title: "Modificación inválida",
            text: "No se puede actualizar un periodo sin cursos y sus profesores asociados.",
            buttons: {
                cancel: "Aceptar",
            },
        });
    } else {
        listaPeriodo.push(cuatrimestre, anno, bEstado, cursosAsociados, cursosConProf);

        actualizarPeriodo(listaPeriodo);

        swal({
            title: "Modificación exitosa",
            text: "Periodo actualizado exitosamente.",
            buttons: {
                confirm: "Aceptar",
            },
        });
        setTimeout(function () {
          location.href = "listarPeriodos.html";
        }, 1500);
    }


}

function tabPeriodoFunc() {
    document.querySelector('#Periodo').classList.remove('ocultar');
    //document.querySelector('#Curso').classList.remove('ocultar');
    document.querySelector('#CursoProfesor').classList.add('ocultar');
    document.querySelector('#Profesor').classList.add('ocultar');
}
