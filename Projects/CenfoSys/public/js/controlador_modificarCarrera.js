//Llamada de funciones

// mostrarSedesAAsociar();
// mostrarCursosAAsociar();

mostrarDatos();
document.querySelector('#btnActualizar').addEventListener('click', obtenerDatosActualizados);
// document.querySelector('#txtBuscarCursos').addEventListener('keyup', mostrarCursosAAsociar);
// document.querySelector('#txtBuscarSedes').addEventListener('keyup', mostrarSedesAAsociar);

//muestra los datos de la lista a modificar en sus respectivos inputs
function mostrarDatos() {
    // mostrarCursosAAsociar();
    // mostrarSedesAAsociar();
    let listaCarrera = getCarrera();

    document.querySelector('#txtCodigo').value = listaCarrera[0];
    document.querySelector('#txtCodigo').disabled = true;
    document.querySelector('#txtNombreCarrera').value = listaCarrera[1];
    document.querySelector('#sltGradoAcademico').value = listaCarrera[2];
    document.querySelector('#nCreditos').value = listaCarrera[3];
    document.querySelector('#txtVersion').value = listaCarrera[4];
    checkbox = document.querySelector('#txtAcreditacion').value = listaCarrera[5];
    let listaCheckboxCursos = document.querySelectorAll('#tblCursos tbody input[type=checkbox]');
    let listaCheckboxSedes = document.querySelectorAll('#tblSedes tbody input[type=checkbox]');


    if (checkbox == 'Acreditada') {
        document.querySelector('#txtAcreditacion').checked = true;
    }


    let aCursos = getListaCursos();
    let cursosAsociados = listaCarrera[7];

    for (let i = 0; i < listaCheckboxCursos.length; i++) {
        for (let j = 0; j < cursosAsociados.length; j++) {
            if (listaCheckboxCursos[i].dataset.codigo == cursosAsociados[j][0]) {
                listaCheckboxCursos[i].checked = true;
            }
        }
    }

    let aSedes = getListaSede();
    let sedesAsociadas = listaCarrera[8];



    for (let i = 0; i < listaCheckboxSedes.length; i++) {
        for (let j = 0; j < sedesAsociadas.length; j++) {
            if (listaCheckboxSedes[i].dataset.nombre == sedesAsociadas[j][0]) {
                listaCheckboxSedes[i].checked = true;
            }
        }
    }
}

//obtiene los datos modificados
function obtenerDatosActualizados() {

    document.querySelector('#txtCodigo').disabled = false;
    let carrera = getCarrera();

    let bError = validar();


    if (bError == false) {
        let listaCarrera = [];

        let sCodigo = document.querySelector('#txtCodigo').value;
        let sNombreCarrera = document.querySelector('#txtNombreCarrera').value;
        let sGradoAcademico = document.querySelector('#sltGradoAcademico').value;
        let nCreditos = document.querySelector('#nCreditos').value;
        let sVersion = document.querySelector('#txtVersion').value;
        let sEstado = carrera[6];
        let cursosAsociados = carrera[7];
        let sedesAsociadas = carrera[8];
        let sumaCreditos;

        let bAcreditacion = document.querySelector('#txtAcreditacion');

        if (bAcreditacion.checked) {
            bAcreditacion = 'Acreditada';
        } else {
            bAcreditacion = 'No acreditada';
        }

        cursosAsociados = guardarCursosAsociar();
        sedesAsociadas = guardarSedesAsociar();
        listaCarrera.push(sCodigo, sNombreCarrera, sGradoAcademico, nCreditos, sVersion, bAcreditacion, sEstado, cursosAsociados, sedesAsociadas);
        actualizarCarrera(listaCarrera);

        for (let i = 0; i < cursosAsociados.length; i++) {
            sumaCreditos += cursosAsociados[i][3];
        }

        // if (sumaCreditos > nCreditos) {
        //     swal({
        //         title: "Ocurrio un error al guardar",
        //         text: "La suma de creditos de los cursos excede a los creditos de la carrera",
        //         icon: "warning",
        //         button: "Ok"
        //     })
        // }

        swal({
          title: "Carrera actualizada",
          text: "Los datos de la carrera se actualizaron exitosamente.",
          buttons: {
            confirm: "Aceptar",
          },
        });
        setTimeout(function () {
            location.href = "listarCarreras.html";
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
//valida que los campos no hayan sido dejados en blanco
function validar() {
    let bError = false;
    let camposRequeridos = document.querySelectorAll('[required]');

    for (let i = 0; i < camposRequeridos.length; i++) {
        if (camposRequeridos[i].value == '') {
            camposRequeridos[i].classList.remove('input');
            camposRequeridos[i].classList.add('invalido');
            bError = true;
        } else {
            camposRequeridos[i].classList.remove('invalido');
            camposRequeridos[i].classList.add('input');
        }
    }

    return bError;
}

// *****Tabla de asociacion de cursos a carrera*************

//Muestra la tabla de cursos que se asocian a una carrera
function mostrarCursosAAsociar() {
    // let sBuscar = document.querySelector('#txtBuscarCursos').value;
    let listaCursos = getListaCursos();
    let cuerpoTabla = document.querySelector('#tblCursos tbody');
    let listaCarrera = getCarrera();

    cuerpoTabla.innerHTML = '';

    for (let i = 0; i < listaCursos.length; i++) {
        // if (listaCursos[i][1].toLowerCase().includes(sBuscar.toLowerCase())) {

        if (listaCursos[i][6] == true) {
            let fila = cuerpoTabla.insertRow();
            fila.dataset.id = listaCursos[i][0];

            let checkSeleccion = document.createElement('input');
            checkSeleccion.setAttribute('type', 'checkbox');
            checkSeleccion.dataset.codigo = listaCursos[i][0];

            let cSeleccion = fila.insertCell();
            let cNombreCurso = fila.insertCell();
            let cCreditos = fila.insertCell();

            let sNombreCurso = document.createTextNode(listaCursos[i][1]);
            let sCreditos = document.createTextNode(listaCursos[i][3]);

            let listaCheckboxCursos = document.querySelectorAll('#tblCursos tbody input[type=checkbox]');

            let cursosAsociados = listaCarrera[7];

            cSeleccion.appendChild(checkSeleccion);
            cNombreCurso.appendChild(sNombreCurso);
            cCreditos.appendChild(sCreditos);
        }
    }
}

//Guarda los cursos seleccionados en el checkbox
function guardarCursosAsociar() {
    let listaCheckboxCursos = document.querySelectorAll('#tblCursos tbody input[type=checkbox]:checked');
    let cursosSeleccionados = [];
    let infoCurso;

    //Este ciclo for debe empezar en 1, ya que en el cero "0" se encuentra el id unico del elemento al que se le desea agregar elementos
    for (let i = 0; i < listaCheckboxCursos.length; i++) {
        infoCurso = listaCheckboxCursos[i].dataset.codigo;
        cursosSeleccionados.push(buscarCursoPorCod(infoCurso));
    }

    return cursosSeleccionados;


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

document.querySelector('.spanCheckbox').addEventListener('click', checkboxAcrediata);
let checkboxEsAcrediata = document.querySelector('#txtAcreditacion');

function checkboxAcrediata() {
  if (checkboxEsAcrediata.checked) {
    checkboxEsAcrediata.checked = false;
    return;
  }
  if (!checkboxEsAcrediata.checked) {
    checkboxEsAcrediata.checked = true;
    return;
  }
}
