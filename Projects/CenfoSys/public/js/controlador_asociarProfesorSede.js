mostrarSedes();
mostrarProfesores();
disableProfesores();

document.querySelector('#btnAsociar').addEventListener('click', asociarSedeProfesor);
document.querySelector('#txtBuscarSedes').addEventListener('keyup', mostrarSedes);
document.querySelector('#txtBuscarProfesores').addEventListener('keyup', mostrarProfesores);

//Muestra todos los cursos de actualizacion activados en una tabla
function mostrarSedes() {
    let sBuscar = document.querySelector('#txtBuscarSedes').value;
    let listaSedes = getListaSede();


    let cuerpoTabla = document.querySelector('#tblSedes tbody');

    cuerpoTabla.innerHTML = '';

    for (let i = 0; i < listaSedes.length; i++) {
        if (listaSedes[i][0].toLowerCase().includes(sBuscar.toLowerCase())) {

            if (listaSedes[i][6] == true) {
                let fila = cuerpoTabla.insertRow();
                fila.dataset.codigo = listaSedes[i][0];

                let checkSeleccion = document.createElement('input');
                checkSeleccion.setAttribute('type', 'checkbox');
                checkSeleccion.classList.add('checkbox');
                checkSeleccion.dataset.nombre = listaSedes[i][0];
                checkSeleccion.addEventListener('click', verificarCheckSedes);
                checkSeleccion.addEventListener('click', mostrarProfesoresSede);



                let cSeleccion = fila.insertCell();
                let cNombre = fila.insertCell();
                let cTipo = fila.insertCell();


                let sNombre = document.createTextNode(listaSedes[i][0]);
                let sTipo = document.createTextNode(listaSedes[i][1].charAt(0).toUpperCase() + listaSedes[i][1].slice(1));

                let listaCheckboxSedes = document.querySelectorAll('#tblSedes tbody input[type=checkbox]');

                cSeleccion.appendChild(checkSeleccion);
                cNombre.appendChild(sNombre);
                cTipo.appendChild(sTipo);
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
function verificarCheckSedes() {
    let checkboxes = document.querySelectorAll('#tblSedes tbody input[type=checkbox]');
    let checkeado = false;

    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkeado = true;
        }
    }
    if (checkeado == true) {
        disableSedes();
        enableProfesores();
    } else {
        enableSedes();
        disableProfesores();
    }

}

//Deshabilita checkboxes de cursos actii
function disableSedes() {
    let checkboxes = document.querySelectorAll('#tblSedes tbody input[type=checkbox]');

    for (let i = 0; i < checkboxes.length; i++) {
        if (!(checkboxes[i].checked)) {
            checkboxes[i].disabled = true;
        }
    }
}

//Habilita checkboxes de cursos actii
function enableSedes() {
    let checkboxes = document.querySelectorAll('#tblSedes tbody input[type=checkbox]');

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
    let listaCheckboxSedes = document.querySelectorAll('#tblSedes tbody input[type=checkbox]:checked');
    let sedeSeleccionada = [];
    let nombreSede;

    for (let i = 0; i < listaCheckboxSedes.length; i++) {
        nombreSede = listaCheckboxSedes[i].dataset.nombre;
        sedeSeleccionada.push(nombreSede);
    }

    return sedeSeleccionada;
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
    let sedeSelect = this.dataset.nombre;
    let sede = buscarSedePorNombre(sedeSelect);
    let listaProfesores = getListaProfesores();
    let listaCheckboxProfesores = document.querySelectorAll('#tblProfesores tbody input[type=checkbox]');
    let cedProfs = [];

    for (let i = 0; i < sede[10].length; i++) {
            cedProfs.push(sede[10][i]);
    }

    for (let j = 0; j < listaProfesores.length; j++) {
        for (let k = 0; k < cedProfs.length; k++) {
            if (listaProfesores[j][0] == cedProfs[k]) {
                listaCheckboxProfesores[j].checked = true;
            }
        }
    }
    verificarCheckSedes();
}
//Asociar profesores a curso actii
function asociarSedeProfesor() {
    let nombreSede = guardarSedeAsociar();

    let sede = buscarSedePorNombre(nombreSede);

    let profesoresSeleccionados = guardarProfesoresAsociar();




    let listaSede = [];

    let sNombre = sede[0];
    let sTipo = sede[1];
    let sProvincia = sede[2];
    let sCanton = sede[3];
    let sDistrito = sede[4];
    let sDireccion = sede[5]
    let bEstado = sede[6];
    let bMostrarMapa = sede[7];
    let latitud = sede[8];
    let longitud = sede[9];
    let profesoresAsociados = profesoresSeleccionados;

    if (profesoresAsociados.length == 0) {
        swal({
            title: "Asociación inválida",
            text: "No se le asignó ningun profesor al curso.",
            buttons: {
                confirm: "Aceptar",
            },
        });
    } else {
        listaSede.push(sNombre, sTipo, sProvincia, sCanton, sDistrito, sDireccion, bEstado, bMostrarMapa, latitud, longitud, profesoresAsociados);
        actualizarSede(listaSede);

        swal({
            title: "Asociación registrada",
            text: "Se le asignó un curso a un profesor exitosamente.",
            buttons: {
              confirm: "Aceptar",
            },
          });
          limpiarCheckbox();
    }
}
