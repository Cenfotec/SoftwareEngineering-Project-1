let mostraStatus = true;
let fecha = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]

document.querySelector('#txtBuscar').addEventListener('keyup', mostrarCursos);
let botonDesactivados = document.querySelector('#btnDesactivados');
botonDesactivados.addEventListener('click', mostrarCursosDeshabilitados);

let botonActivados = document.querySelector('#btnActivados');
botonActivados.addEventListener('click', mostrarCursosActivados);

botonActivados.classList.add('ocultar');
mostrarCursosActivados();

function mostrarCursos() {
  if (mostraStatus) {
    mostrarCursosActivados();
  } else {
    mostrarCursosDeshabilitados();
  }
}


function editar() {
    let CodigoCurso = this.dataset.codigo;
    let Curso = buscarCursoActiiPorCod(CodigoCurso);
    setCursoActii(Curso);
    location.href = "modificarCursoActii.html";




}
function desactivar() {
    let idCurso = this.dataset.codigo;
    let curso = buscarCursoActiiPorCod(idCurso);
    curso[4] = false;

    swal({
    title: "Desactivar curso",
    text: "¿Está seguro que desea desactivar este curso?",
    buttons: ["Cancelar", "Aceptar"],
    }).then((willDelete) => {
      if (willDelete) {
        actualizarCursoActii(curso);
        mostrarCursosActivados();
      }
    });
}

function activar() {
    let idCurso = this.dataset.codigo;
    let curso = buscarCursoActiiPorCod(idCurso);
    curso[4] = true;

    swal({
    title: "Activar curso",
    text: "¿Está seguro que desea activar este curso?",
    buttons: ["Cancelar", "Aceptar"],
    }).then((willDelete) => {
      if (willDelete) {
        actualizarCursoActii(curso);
        mostrarCursosDeshabilitados();
      }
    });
}

function mostrarCursosDeshabilitados() {
    mostraStatus = false;
    botonActivados.classList.remove('ocultar');
    botonDesactivados.classList.add('ocultar');
    let sBuscar = document.querySelector('#txtBuscar').value;
    let listaCursos = getListaCursosActii();
    let cuerpoTabla = document.querySelector('#tblCursos tbody');
    cuerpoTabla.innerHTML = '';

    for (let i = 0; i < listaCursos.length; i++) {
        if (listaCursos[i][0].toLowerCase().includes(sBuscar.toLowerCase())) {

            if (listaCursos[i][4] == false) {
                let fila = cuerpoTabla.insertRow();
                let cConfiguracion = fila.insertCell();
                let cCodigo = fila.insertCell();
                let cNombre = fila.insertCell();
                let cHoras = fila.insertCell();
                let cCosto = fila.insertCell();
                let cFechaInicio = fila.insertCell();
                let cFechaFin = fila.insertCell();

                let sConfiguracion = document.createTextNode("");
                let sCodigo = document.createTextNode(listaCursos[i][0]);
                let sNombre = document.createTextNode(listaCursos[i][1]);
                let sHoras = document.createTextNode(listaCursos[i][2]);
                let sCosto = document.createTextNode('₡' + listaCursos[i][3].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                let sFechaInicio = document.createTextNode(new Date(listaCursos[i][7]).getDate()+1 + ' de ' + fecha[new Date(listaCursos[i][7]).getMonth()] + ' de ' + new Date(listaCursos[i][7]).getFullYear());
                let sFechaFin = document.createTextNode(new Date(listaCursos[i][8]).getDate()+1 + ' de ' + fecha[new Date(listaCursos[i][8]).getMonth()] + ' de ' + new Date(listaCursos[i][8]).getFullYear());

                cConfiguracion.appendChild(sConfiguracion);
                cCodigo.appendChild(sCodigo);
                cNombre.appendChild(sNombre);
                cHoras.appendChild(sHoras);
                cCosto.appendChild(sCosto);
                cFechaInicio.appendChild(sFechaInicio);
                cFechaFin.appendChild(sFechaFin);

                let botonDesactivar = document.createElement('button');
                botonDesactivar.innerText = '';
                botonDesactivar.classList.add('botonTabla');
                botonDesactivar.classList.add('botonDesactivar');
                botonDesactivar.setAttribute('data-tooltip', 'Desactivar');
                botonDesactivar.dataset.codigo = listaCursos[i][0];
                botonDesactivar.addEventListener('click', desactivar);

                let botonActivar = document.createElement('button');
                botonActivar.innerText = '';
                botonActivar.classList.add('botonTabla');
                botonActivar.classList.add('botonActivar');
                botonActivar.setAttribute('data-tooltip', 'Activar');
                botonActivar.dataset.codigo = listaCursos[i][0];
                botonActivar.addEventListener('click', activar);

                let botonEditar = document.createElement('button');
                botonEditar.innerText = '';
                botonEditar.classList.add('botonTabla');
                botonEditar.classList.add('botonEditar');
                botonEditar.setAttribute('data-tooltip', 'Editar');
                botonEditar.dataset.codigo = listaCursos[i][0];
                botonEditar.addEventListener('click', editar)

                if (!listaCursos[i][4]) {
                    botonDesactivar.classList.add('ocultar');
                } else {
                    botonActivar.classList.add('ocultar');
                }

                cConfiguracion.appendChild(botonEditar);
                cConfiguracion.appendChild(botonDesactivar);
                cConfiguracion.appendChild(botonActivar);

            }
        }
    }
}

function mostrarCursosActivados() {
    mostraStatus = true;
    botonActivados.classList.add('ocultar');
    botonDesactivados.classList.remove('ocultar');
    let sBuscar = document.querySelector('#txtBuscar').value;
    let listaCursos = getListaCursosActii();
    let cuerpoTabla = document.querySelector('#tblCursos tbody');
    cuerpoTabla.innerHTML = '';

    for (let i = 0; i < listaCursos.length; i++) {
        if (listaCursos[i][0].toLowerCase().includes(sBuscar.toLowerCase())) {
            if (listaCursos[i][4] == true) {
                let fila = cuerpoTabla.insertRow();
                let cConfiguracion = fila.insertCell();
                let cCodigo = fila.insertCell();
                let cNombre = fila.insertCell();
                let cHoras = fila.insertCell();
                let cCosto = fila.insertCell();
                let cFechaInicio = fila.insertCell();
                let cFechaFin = fila.insertCell();

                let sConfiguracion = document.createTextNode("");
                let sCodigo = document.createTextNode(listaCursos[i][0]);
                let sNombre = document.createTextNode(listaCursos[i][1]);
                let sHoras = document.createTextNode(listaCursos[i][2]);
                let sCosto = document.createTextNode('₡' + listaCursos[i][3].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                let sFechaInicio = document.createTextNode(new Date(listaCursos[i][7]).getDate()+1 + ' de ' + fecha[new Date(listaCursos[i][7]).getMonth()] + ' de ' + new Date(listaCursos[i][7]).getFullYear());
                let sFechaFin = document.createTextNode(new Date(listaCursos[i][8]).getDate()+1 + ' de ' + fecha[new Date(listaCursos[i][8]).getMonth()] + ' de ' + new Date(listaCursos[i][8]).getFullYear());

                cConfiguracion.appendChild(sConfiguracion);
                cCodigo.appendChild(sCodigo);
                cNombre.appendChild(sNombre);
                cHoras.appendChild(sHoras);
                cCosto.appendChild(sCosto);
                cFechaInicio.appendChild(sFechaInicio);
                cFechaFin.appendChild(sFechaFin);

                let botonDesactivar = document.createElement('button');
                botonDesactivar.innerText = '';
                botonDesactivar.classList.add('botonTabla');
                botonDesactivar.classList.add('botonDesactivar');
                botonDesactivar.setAttribute('data-tooltip', 'Desactivar');
                botonDesactivar.dataset.codigo = listaCursos[i][0];
                botonDesactivar.addEventListener('click', desactivar);

                let botonActivar = document.createElement('button');
                botonActivar.innerText = '';
                botonActivar.classList.add('botonTabla');
                botonActivar.classList.add('botonActivar');
                botonActivar.setAttribute('data-tooltip', 'Activar');
                botonActivar.dataset.codigo = listaCursos[i][0];
                botonActivar.addEventListener('click', activar);

                let botonEditar = document.createElement('button');
                botonEditar.innerText = '';
                botonEditar.classList.add('botonTabla');
                botonEditar.classList.add('botonEditar');
                botonEditar.setAttribute('data-tooltip', 'Editar');
                botonEditar.dataset.codigo = listaCursos[i][0];
                botonEditar.addEventListener('click', editar)

                if (!listaCursos[i][4]) {
                    botonDesactivar.classList.add('ocultar');
                } else {
                    botonActivar.classList.add('ocultar');
                }

                cConfiguracion.appendChild(botonEditar);
                cConfiguracion.appendChild(botonDesactivar);
                cConfiguracion.appendChild(botonActivar);

            }
        }
    }
}
