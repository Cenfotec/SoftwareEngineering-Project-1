let mostraStatus = true;
document.querySelector('#txtBuscar').addEventListener('keyup', mostrarPeriodos);

let botonVerDesactivados = document.querySelector('#btnDesactivados');
botonVerDesactivados.addEventListener('click', mostrarPeriodosDesactivados);

let botonVerActivados = document.querySelector('#btnActivados');
botonVerActivados.addEventListener('click', mostrarPeriodosActivados);

botonVerActivados.classList.add('ocultar');

mostrarPeriodosActivados();


// Esta funcion muestra las sedes registradas
function mostrarPeriodos() {
  let botonActivados = document.querySelector('#btnActivados');

    if (mostraStatus) {
      mostrarPeriodosActivados();
    } else {
      mostrarPeriodosDesactivados();
    }
}
//Desactiva la carrera cuando se presiona el boton "desactivar"
function desactivar() {
    let cuatrimestrePeriodo = this.dataset.cuatrimestre;
    let annoPeriodo = this.dataset.anno;
    let periodo = buscarPeriodo(cuatrimestrePeriodo, annoPeriodo);

    periodo[2] = false;

    swal({
        title: "Desactivar periodo",
        text: "¿Está seguro que desea desactivar este periodo?",
        buttons: ["Cancelar", "Aceptar"],
    }).then((willDelete) => {
        if (willDelete) {
            actualizarPeriodo(periodo);
            mostrarPeriodosActivados();
        }
    });
}
//Activa la carrera cuando se presiona el boton "activar"
function activar() {
    let cuatrimestrePeriodo = this.dataset.cuatrimestre;
    let annoPeriodo = this.dataset.anno;
    let periodo = buscarPeriodo(cuatrimestrePeriodo, annoPeriodo);

    periodo[2] = true;

    swal({
        title: "Activar periodo",
        text: "¿Está seguro que desea activar este periodo?",
        buttons: ["Cancelar", "Aceptar"],
    }).then((willDelete) => {
        if (willDelete) {
            actualizarPeriodo(periodo);
            mostrarPeriodosDesactivados();
        }
    });
}
//Muestra una lista de sedes desactivadas
function mostrarPeriodosDesactivados() {
    mostraStatus = false;
    botonVerActivados.classList.remove('ocultar');
    botonVerDesactivados.classList.add('ocultar');

    let sBuscar = document.querySelector('#txtBuscar').value;
    let listaPeriodos = getListaPeriodos();
    let cuerpoTabla = document.querySelector('#tblPeriodos tbody');

    cuerpoTabla.innerHTML = '';

    for (let i = 0; i < listaPeriodos.length; i++) {

        if (listaPeriodos[i][0].toLowerCase().includes(sBuscar.toLowerCase())) {

            if (listaPeriodos[i][2] == false) {

                let fila = cuerpoTabla.insertRow();
                let cSeleccion = fila.insertCell();
                let cCuatrimestre = fila.insertCell();
                cCuatrimestre.dataset.cuatrimestre = listaPeriodos[i][0];
                cCuatrimestre.addEventListener('click', visualizarPeriodo);
                let cAnno = fila.insertCell();

                let sCuatrimestre = document.createTextNode(listaPeriodos[i][0]);
                let sAnno = document.createTextNode(listaPeriodos[i][1]);

                cCuatrimestre.appendChild(sCuatrimestre);
                cAnno.appendChild(sAnno);


                //Creacion del boton modificar
                let btnModificar = document.createElement('button');
                btnModificar.innerText = '';
                btnModificar.dataset.cuatrimestre = listaPeriodos[i][0];
                btnModificar.dataset.anno = listaPeriodos[i][1];
                btnModificar.classList.add('botonTabla');
                btnModificar.classList.add('botonEditar');
                btnModificar.setAttribute('data-tooltip', 'Editar');
                btnModificar.addEventListener('click', editar);

                cSeleccion.appendChild(btnModificar);

                //Creacion del boton desactivar
                let botonDesactivar = document.createElement('button');
                botonDesactivar.innerText = '';
                botonDesactivar.dataset.cuatrimestre = listaPeriodos[i][0];
                botonDesactivar.dataset.anno = listaPeriodos[i][1];
                botonDesactivar.classList.add('botonTabla');
                botonDesactivar.classList.add('botonDesactivar');
                botonDesactivar.setAttribute('data-tooltip', 'Desactivar');
                botonDesactivar.addEventListener('click', desactivar);


                //Creacion del boton Activar
                let botonActivar = document.createElement('button');
                botonActivar.innerText = '';
                botonActivar.dataset.cuatrimestre = listaPeriodos[i][0];
                botonActivar.dataset.anno = listaPeriodos[i][1];
                botonActivar.classList.add('botonTabla');
                botonActivar.classList.add('botonActivar');
                botonActivar.setAttribute('data-tooltip', 'Activar');
                botonActivar.addEventListener('click', activar);

                if (!listaPeriodos[i][2]) {
                    botonDesactivar.classList.add('ocultar');
                } else {
                    botonActivar.classList.add('ocultar');
                }

                cSeleccion.appendChild(botonDesactivar);
                cSeleccion.appendChild(botonActivar);
            }
        }
    }
}
//Muestra una lista de sedes activadas
function mostrarPeriodosActivados() {
    mostraStatus = true;
    
    botonVerDesactivados.classList.remove('ocultar');
    botonVerActivados.classList.add('ocultar');

    let sBuscar = document.querySelector('#txtBuscar').value;
    let listaPeriodos = getListaPeriodos();
    let cuerpoTabla = document.querySelector('#tblPeriodos tbody');

    cuerpoTabla.innerHTML = '';

    for (let i = 0; i < listaPeriodos.length; i++) {

        if (listaPeriodos[i][0].toLowerCase().includes(sBuscar.toLowerCase())) {

            if (listaPeriodos[i][2] == true) {

                let fila = cuerpoTabla.insertRow();
                let cSeleccion = fila.insertCell();
                let cCuatrimestre = fila.insertCell();
                cCuatrimestre.dataset.cuatrimestre = listaPeriodos[i][0];
                cCuatrimestre.dataset.anno = listaPeriodos[i][1];
                cCuatrimestre.addEventListener('click', visualizarPeriodo);
                let cAnno = fila.insertCell();

                let sCuatrimestre = document.createTextNode(listaPeriodos[i][0]);
                let sAnno = document.createTextNode(listaPeriodos[i][1]);

                cCuatrimestre.appendChild(sCuatrimestre);
                cAnno.appendChild(sAnno);


                //Creacion del boton modificar
                let btnModificar = document.createElement('button');
                btnModificar.innerText = '';
                btnModificar.dataset.cuatrimestre = listaPeriodos[i][0];
                btnModificar.dataset.anno = listaPeriodos[i][1];
                btnModificar.classList.add('botonTabla');
                btnModificar.classList.add('botonEditar');
                btnModificar.setAttribute('data-tooltip', 'Editar');
                btnModificar.addEventListener('click', editar);

                cSeleccion.appendChild(btnModificar);

                //Creacion del boton desactivar
                let botonDesactivar = document.createElement('button');
                botonDesactivar.innerText = '';
                botonDesactivar.dataset.cuatrimestre = listaPeriodos[i][0];
                botonDesactivar.dataset.anno = listaPeriodos[i][1];
                botonDesactivar.classList.add('botonTabla');
                botonDesactivar.classList.add('botonDesactivar');
                botonDesactivar.setAttribute('data-tooltip', 'Desactivar');
                botonDesactivar.addEventListener('click', desactivar);


                //Creacion del boton Activar
                let botonActivar = document.createElement('button');
                botonActivar.innerText = '';
                botonActivar.dataset.cuatrimestre = listaPeriodos[i][0];
                botonActivar.dataset.anno = listaPeriodos[i][1];
                botonActivar.classList.add('botonTabla');
                botonActivar.classList.add('botonActivar');
                botonActivar.setAttribute('data-tooltip', 'Activar');
                botonActivar.addEventListener('click', activar);

                if (!listaPeriodos[i][2]) {
                    botonDesactivar.classList.add('ocultar');
                } else {
                    botonActivar.classList.add('ocultar');
                }

                cSeleccion.appendChild(botonDesactivar);
                cSeleccion.appendChild(botonActivar);
            }
        }
    }
}
//Redirecciona a pantalla de modificar de la carrera que se clickeo
function editar() {
    let cuatrimestrePeriodo = this.dataset.cuatrimestre;
    let annoPeriodo = this.dataset.anno;

    let periodo = buscarPeriodo(cuatrimestrePeriodo, annoPeriodo);
    console.log(periodo);
    setPeriodo(periodo);
    location.href = "../html/modificarPeriodo.html";
}

function visualizarPeriodo(){
    console.log('boi');

}
