mostrarPeriodo();

let botonRegistrar = document.querySelector('#btnRegistrar').addEventListener('click', obtenerDatos);
document.querySelector('#txtBuscarPeriodos').addEventListener('keyup', mostrarPeriodo);
document.querySelector('#txtBuscarCursos').addEventListener('keyup', mostrarCursosPeriodo);

function mostrarPeriodo() {
    let sBuscar = document.querySelector('#txtBuscarPeriodos').value;
    let listaPeriodos = getListaPeriodos();
    let cuerpoTabla = document.querySelector('#tblPeriodos tbody');

    cuerpoTabla.innerHTML = '';

    for (let i = 0; i < listaPeriodos.length; i++) {

        if (listaPeriodos[i][0].toLowerCase().includes(sBuscar.toLowerCase())) {

            if (listaPeriodos[i][2] == true) {
                let fila = cuerpoTabla.insertRow();

                let checkSeleccion = document.createElement('input');
                checkSeleccion.setAttribute('type', 'checkbox');
                checkSeleccion.classList.add('checkbox');
                checkSeleccion.addEventListener('click', verificarCheckPeriodos);
                checkSeleccion.dataset.cuatrimestre = listaPeriodos[i][0];
                checkSeleccion.dataset.anno = listaPeriodos[i][1];
                checkSeleccion.addEventListener('click', mostrarCursosPeriodo);


                let cSeleccion = fila.insertCell();
                let cCuatrimestre = fila.insertCell();
                let cAnno = fila.insertCell();

                let sCuatrimestre = document.createTextNode(listaPeriodos[i][0]);
                let sAnno = document.createTextNode(listaPeriodos[i][1]);

                cSeleccion.appendChild(checkSeleccion);
                cCuatrimestre.appendChild(sCuatrimestre);
                cAnno.appendChild(sAnno);
            }
        }
    }
}

function verificarCheckPeriodos() {
    let checkboxes = document.querySelectorAll('#tblPeriodos tbody input[type=checkbox]');
    let checkeado = false;

    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkeado = true;
        }
    }
    if (checkeado == true) {
        disablePeriodos();
    } else {
        enablePeriodos();
    }
}

function disablePeriodos() {
    let checkboxes = document.querySelectorAll('#tblPeriodos tbody input[type=checkbox]');

    for (let i = 0; i < checkboxes.length; i++) {
        if (!(checkboxes[i].checked)) {
            checkboxes[i].disabled = true;
        }
    }
}

function enablePeriodos() {
    let checkboxes = document.querySelectorAll('#tblPeriodos tbody input[type=checkbox]');

    for (let i = 0; i < checkboxes.length; i++) {
        if (!(checkboxes[i].checked)) {
            checkboxes[i].disabled = false;
        }
    }
}

function mostrarCursosPeriodo() {
    let cuatrimestre = this.dataset.cuatrimestre;

    let anno = this.dataset.anno;

    let periodo = buscarPeriodo(cuatrimestre, anno);
    let cursosPeriodo = periodo[3];
    let sBuscar = document.querySelector('#txtBuscarCursos').value;
    let cuerpoTabla = document.querySelector('#tblCursos tbody');

    cuerpoTabla.innerHTML = '';

    for (let i = 0; i < cursosPeriodo.length; i++) {

        let fila = cuerpoTabla.insertRow();

        let checkSeleccion = document.createElement('input');
        checkSeleccion.setAttribute('type', 'checkbox');
        checkSeleccion.classList.add('checkbox');
        checkSeleccion.addEventListener('click', verificarCheckCursos);
        checkSeleccion.dataset.codigo = cursosPeriodo[i];
        checkSeleccion.dataset.cuatrimestre = cuatrimestre;
        checkSeleccion.dataset.anno = anno;
        checkSeleccion.addEventListener('click', mostrarProfesoresCurso);


        let cSeleccion = fila.insertCell();
        let cCodigo = fila.insertCell();
        let cNombre = fila.insertCell();


        let sCodigo = document.createTextNode(cursosPeriodo[i]);
        let sNombre = document.createTextNode(buscarCursoPorCod(cursosPeriodo[i])[1]);

        cSeleccion.appendChild(checkSeleccion);
        cCodigo.appendChild(sCodigo);
        cNombre.appendChild(sNombre);
    }
}

function verificarCheckCursos() {
    let checkboxes = document.querySelectorAll('#tblCursos tbody input[type=checkbox]');
    let checkeado = false;

    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkeado = true;
        }
    }
    if (checkeado == true) {
        disableCursos();
    } else {
        enableCursos();
    }
}

function disableCursos() {
    let checkboxes = document.querySelectorAll('#tblCursos tbody input[type=checkbox]');

    for (let i = 0; i < checkboxes.length; i++) {
        if (!(checkboxes[i].checked)) {
            checkboxes[i].disabled = true;
        }
    }
}

function enableCursos() {
    let checkboxes = document.querySelectorAll('#tblCursos tbody input[type=checkbox]');

    for (let i = 0; i < checkboxes.length; i++) {
        if (!(checkboxes[i].checked)) {
            checkboxes[i].disabled = false;
        }
    }
}

function mostrarProfesoresCurso() {
    let cuatrimestre = this.dataset.cuatrimestre;
    let anno = this.dataset.anno;
    let curso = this.dataset.codigo;

    let periodo = buscarPeriodo(cuatrimestre, anno);

    let profesoresCurso = periodo[4];
    let profesores = [];

    let sBuscar = document.querySelector('#txtBuscarProfesores').value;
    let cuerpoTabla = document.querySelector('#tblProfesores tbody');

    for (let i = 0; i < profesoresCurso.length; i++) {
        if (profesoresCurso[i][0] == curso) {
            profesores = profesoresCurso[i][1];
        }
    }


    cuerpoTabla.innerHTML = '';

    for (let i = 0; i < profesores.length; i++) {

        let fila = cuerpoTabla.insertRow();

        let checkSeleccion = document.createElement('input');
        checkSeleccion.setAttribute('type', 'checkbox');
        checkSeleccion.classList.add('checkbox');
        checkSeleccion.addEventListener('click', verificarCheckProfesores);
        checkSeleccion.dataset.identificacion = profesores[i];

        let cSeleccion = fila.insertCell();
        let cIdentificacion = fila.insertCell();
        let cNombre = fila.insertCell();
        let cApellido = fila.insertCell();

        let sIdentificacion = document.createTextNode(profesores[i]);
        let sNombre = document.createTextNode(buscarProfesorPorId(profesores[i])[2]);
        let sApellido = document.createTextNode(buscarProfesorPorId(profesores[i])[4]);

        cSeleccion.appendChild(checkSeleccion);
        cIdentificacion.appendChild(sIdentificacion);
        cNombre.appendChild(sNombre);
        cApellido.appendChild(sApellido);
    }
}

function verificarCheckProfesores() {
    let checkboxes = document.querySelectorAll('#tblProfesores tbody input[type=checkbox]');
    let checkeado = false;

    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkeado = true;
        }
    }
    if (checkeado == true) {
        disableProfesores();
    } else {
        enableProfesores();
    }
}

function disableProfesores() {
    let checkboxes = document.querySelectorAll('#tblProfesores tbody input[type=checkbox]');

    for (let i = 0; i < checkboxes.length; i++) {
        if (!(checkboxes[i].checked)) {
            checkboxes[i].disabled = true;
        }
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

function obtenerDatos() {

    let listaEvaluacion = [];
    let evaluacionProfesor = [];

    periodo = document.querySelector('#tblPeriodos tbody input[type=checkbox]:checked');
    curso = document.querySelector('#tblCursos tbody input[type=checkbox]:checked');
    profesor = document.querySelector('#tblProfesores tbody input[type=checkbox]:checked');

    if (!(profesor == null)) {
        cuatrimestre = periodo.dataset.cuatrimestre;
        anno = periodo.dataset.anno;
        codigoCurso = curso.dataset.codigo;
        idProfe = profesor.dataset.identificacion;
        nota = document.querySelector('#txtNota').value;
        observaciones = document.querySelector('#txtAObservacion').value;

        evaluacionProfesor.push(idProfe, nota, observaciones);

        let bError = validarRegistro();

        if (!bError) {
            listaEvaluacion.push(cuatrimestre, anno, codigoCurso, evaluacionProfesor);

            setEvaluacion(listaEvaluacion);
            swal({
                title: "Evaluación registrada",
                text: "La evaluación se registró exitosamente.",
                buttons: {
                    confirm: "Aceptar",
                },
            });
            setTimeout(() => {
                location.reload();
            }, 1500);
        } else {
            swal({
                title: "Registro inválido",
                text: "Por favor complete todos los espacios obligatorios marcados en rojo.",
                buttons: {
                    cancel: "Aceptar",
                },
            });
        }

    } else{
        swal({
            title: "Registro inválido",
            text: "Por favor seleccione un profesor para evaluar.",
            buttons: {
                cancel: "Aceptar",
            },
        });
    }


}

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
