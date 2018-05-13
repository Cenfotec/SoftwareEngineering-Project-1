mostrarCarrera();
mostrarProfesores();
mostrarCursosDeCarreras();
disableProfesores();
tabPeriodoFunc();

document.querySelector('#txtBuscarCarreras').addEventListener('keyup', mostrarCarrera);
document.querySelector('#txtBuscarCursosSelec').addEventListener('keyup', mostrarCursosDeCarreras);
document.querySelector('#txtBuscarProf').addEventListener('keyup', mostrarProfesores);
document.querySelector('#tabProfesores').addEventListener('click', mostrarCursosDeCarreras);
document.querySelector('#btnRegistrar').addEventListener('click', obtenerDatos);
document.querySelector('#btnAnnadir').addEventListener('click', asociarProfACursos);
document.querySelector('#tabPeriodo').addEventListener('click', tabPeriodoFunc);
document.querySelector('#btnRegistrar').addEventListener('click', obtenerDatos);

let cursosConProf = [];
let cursosPeriodo = [];


function obtenerDatos() {
    let bError = validarRegistro();
    let bExiste = false;
    if (!bError) {
        let aInfoPeriodo = [];
        let aCursoConProfs = [];

        let sCuatrimestre = document.querySelector('#sltCuatrimestre').value;
        let sAnno = document.querySelector('#txtAnno').value;
        let sEstado = true;


        bExiste = validarPeriodo(sCuatrimestre, sAnno);
        bExisteCurso = validarCursos(cursosPeriodo);


        if (!bExiste) {

            if (bExisteCurso == false) {
                aInfoPeriodo.push(sCuatrimestre, sAnno, sEstado, cursosPeriodo, cursosConProf);
                setListaPeriodos(aInfoPeriodo);
                swal({
                    title: "Periodo registrado",
                    text: "Los datos del funcionario se registraron exitosamente.",
                    buttons: {
                        confirm: "Aceptar",
                    },
                });
                setTimeout(function () {
                  location.href = "listarPeriodos.html";
                }, 1500);
            } else {
                swal({
                    title: "Registro inválido",
                    text: "No se puede registrar un periodo sin cursos y sus profesores asociados.",
                    buttons: {
                        confirm: "Aceptar",
                    },
                });
            }

        } else {
            swal({
                title: "Registro inválido",
                text: "El periodo que desea ingresar ya existe.",
                buttons: {
                    cancel: "Aceptar",
                },
            });
        }
    } else {
        swal({
            title: "Registro inválido",
            text: "Por favor complete todos los espacios obligatorios marcados en rojo.",
            buttons: {
                cancel: "Aceptar",
            },
        });
    }
}



function mostrarCarrera() {
    let sBuscar = document.querySelector('#txtBuscarCarreras').value;
    let listaCarreras = getListaCarrera();
    let cuerpoTabla = document.querySelector('#tblCarreras tbody');
    cuerpoTabla.innerHTML = '';

    for (let i = 0; i < listaCarreras.length; i++) {
        if (listaCarreras[i][0].toLowerCase().includes(sBuscar.toLowerCase())) {
            if (listaCarreras[i][6] == true) {
                let fila = cuerpoTabla.insertRow();

                let checkSeleccion = document.createElement('input');
                checkSeleccion.setAttribute('type', 'checkbox');
                checkSeleccion.addEventListener('click', obtenerCursosCarrera);
                checkSeleccion.dataset.codigo = listaCarreras[i][0];

                let cSeleccionar = fila.insertCell();
                let cCodigo = fila.insertCell();
                let cNombre = fila.insertCell();

                let sCodigo = document.createTextNode(listaCarreras[i][0]);
                let sNombre = document.createTextNode(listaCarreras[i][1]);

                let listaCheckboxCursos = document.querySelectorAll('#tblCarreras tbody input[type=checkbox]');

                cSeleccionar.appendChild(checkSeleccion);
                cCodigo.appendChild(sCodigo);
                cNombre.appendChild(sNombre);

            }
        }
    }
}

function obtenerCursosCarrera() {
    let listaCheckboxCarreras = document.querySelectorAll('#tblCarreras tbody input[type=checkbox]:checked');
    let listaCarreras = getListaCarrera();
    let codigosCarreras = [];
    let codigosCursos = [];

    for (let i = 0; i < listaCheckboxCarreras.length; i++) {
        codigosCarreras.push(listaCheckboxCarreras[i].dataset.codigo);
        for (let j = 0; j < listaCarreras.length; j++) {
            if (listaCarreras[j][0] == codigosCarreras[i]) {
                for (let k = 0; k < listaCarreras[j][7].length; k++) {
                    codigosCursos.push(listaCarreras[j][7][k]);
                }
            }
        }
    }

    let codCursosMostrar = codigosCursos.reduce(function (a, b) {
        if (a.indexOf(b) < 0) a.push(b);
        return a;
    }, []);

    return codCursosMostrar;
}

function guardarCursosAsociar() {
    let listaCheckboxCursos = document.querySelectorAll('#tblCursos tbody input[type=checkbox]:checked');
    let cursosSeleccionados = [];
    let infoCurso;

    for (let i = 0; i < listaCheckboxCursos.length; i++) {
        infoCurso = listaCheckboxCursos[i].dataset.codigo;
        cursosSeleccionados.push(buscarCursoPorCod(infoCurso));
    }

    return cursosSeleccionados;
}

function mostrarCursosDeCarreras() {
	document.querySelector('#Cursos').style.marginTop = '100px';
    document.querySelector('#Cursos').classList.remove('ocultar');
    document.querySelector('#Carreras').classList.add('ocultar');

    let cursosSeleccionados = obtenerCursosCarrera();

    let sBuscar = document.querySelector('#txtBuscarCursosSelec').value;
    let cuerpoTabla = document.querySelector('#tblCursosSelec tbody');
    let curso = [];
    cuerpoTabla.innerHTML = '';

    for (let i = 0; i < cursosSeleccionados.length; i++) {
        curso = buscarCursoPorCod(cursosSeleccionados[i]);

        if (curso[0].toLowerCase().includes(sBuscar.toLowerCase())) {

            let fila = cuerpoTabla.insertRow();

            let checkSeleccion = document.createElement('input');
            checkSeleccion.setAttribute('type', 'checkbox');
            checkSeleccion.addEventListener('click', verificarCheckCursos);
            checkSeleccion.dataset.codigo = curso[0];

            let cSeleccionar = fila.insertCell();
            let cCodigo = fila.insertCell();
            let cNombre = fila.insertCell();
            let cCreditos = fila.insertCell();

            let sCodigo = document.createTextNode(curso[0]);
            let sNombre = document.createTextNode(curso[1]);
            let sCreditos = document.createTextNode(curso[2]);

            let listaCheckboxCursos = document.querySelectorAll('#tblCursosSelec tbody input[type=checkbox]');

            cSeleccionar.appendChild(checkSeleccion);
            cCodigo.appendChild(sCodigo);
            cNombre.appendChild(sNombre);
            cCreditos.appendChild(sCreditos);
        }
    }
}

function verificarCheckCursos() {
    let checkboxes = document.querySelectorAll('#tblCursosSelec tbody input[type=checkbox]');
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
    let checkboxes = document.querySelectorAll('#tblCursosSelec tbody input[type=checkbox]');

    for (let i = 0; i < checkboxes.length; i++) {
        if (!(checkboxes[i].checked)) {
            checkboxes[i].disabled = true;
        }
    }
}

function enableCursos() {
    let checkboxes = document.querySelectorAll('#tblCursosSelec tbody input[type=checkbox]');

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

function asociarProfACursos() {
    let listaCheckboxCursos = document.querySelectorAll('#tblCursosSelec tbody input[type=checkbox]');
    let listaCheckboxProfesores = document.querySelectorAll('#tblProfesores tbody input[type=checkbox]');
    let codCurso;
    let idProfs = [];
    let infoAsoc = [];
    let existe = false;




    for (let i = 0; i < listaCheckboxCursos.length; i++) {
        if (listaCheckboxCursos[i].checked == true) {
            codCurso = listaCheckboxCursos[i].dataset.codigo;
            cursosPeriodo.push(listaCheckboxCursos[i].dataset.codigo);
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
            title: "Curso invalido",
            text: "El curso al que desea asignarle profesores ya fue seleccionado.",
            buttons: {
                cancel: "Aceptar",
            },
        });
    }

}

function limpiarCheckbox() {
    let listaCheckboxCursos = document.querySelectorAll('#tblCursosSelec tbody input[type=checkbox]');
    let listaCheckboxProfesores = document.querySelectorAll('#tblProfesores tbody input[type=checkbox]');

    for (let i = 0; i < listaCheckboxCursos.length; i++) {
        listaCheckboxCursos[i].checked = false;
    }

    for (let i = 0; i < listaCheckboxProfesores.length; i++) {
        listaCheckboxProfesores[i].checked = false;
    }
}

function validarPeriodo(pCuatri, pAnno) {
    let sCuatrimestre = document.querySelector('#sltCuatrimestre');
    let sAnno = document.querySelector('#txtAnno');
    let listaPeriodos = getListaPeriodos();
    let bExiste = false;

    for (let i = 0; i < listaPeriodos.length; i++) {
        if (listaPeriodos[i][0] == pCuatri && listaPeriodos[i][1] == pAnno) {
            bExiste = true;
            sCuatrimestre.classList.add('invalido');
            sCuatrimestre.classList.remove('input');
            sAnno.classList.add('invalido');
            sAnno.classList.remove('input');
        }
    }
    return bExiste;
}

function validarRegistro() {
    let inputsRequeridos = document.querySelectorAll('[required]');
    let bError = false;

    for (let i = 0; i < inputsRequeridos.length; i++) {
        if (inputsRequeridos[i].value == '') {
            inputsRequeridos[i].classList.add('invalido');
            inputsRequeridos[i].classList.remove('input');
            bError = true;
        } else {
            inputsRequeridos[i].classList.remove('invalido');
            inputsRequeridos[i].classList.add('input');
        }
    }
    return bError;
}

function validarCursos(paCursosSelec) {
    let existe = false;
    console.log(paCursosSelec);

    if (paCursosSelec.length == 0) {
        existe = true;
    }

    return existe;
}

function tabPeriodoFunc() {
  document.querySelector('#Carreras').classList.remove('ocultar');
  document.querySelector('#Cursos').classList.add('ocultar');
}
