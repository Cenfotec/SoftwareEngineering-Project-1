let botonRegistrar = document.querySelector('#btnRegistrar');
botonRegistrar.addEventListener('click', obtenerDatos);
let inputFiltro = document.querySelector('#txtFiltro');
inputFiltro.addEventListener('keyup', mostrarCursos);

mostrarCursos();
mostrarCarreras();

function obtenerDatos() {
  let bError = validarRegistro();
  if (!bError) {
    let aInfoCurso = [];

    let sCarrera = document.querySelector('#sltCarrera').value;
    let sCurso = document.querySelector('#txtCurso').value;
    let nCreditos = Number(document.querySelector('#txtCreditos').value);

    aInfoCurso.push(sCarrera, sCurso, nCreditos);

    setListaCursos(aInfoCurso);
    mostrarCursos();
    limpiar();
  } else {

  }

}

function mostrarCursos() {
  let sFiltro = document.querySelector('#txtFiltro').value;
  let listaCursos = getListaCursos();

  let cuerpoTabla = document.querySelector('#tblCursos tbody');

  cuerpoTabla.innerHTML = '';

  for (let i = 0; i < listaCursos.length; i++) {
    if (listaCursos[i][1].toLowerCase().includes(sFiltro.toLowerCase())) {
      let fila = cuerpoTabla.insertRow();

      let cCarrera = fila.insertCell();
      let cCurso = fila.insertCell();
      let cCreditos = fila.insertCell();
      let cConfiguracion = fila.insertCell();

      let sCarrera = document.createTextNode(listaCursos[i][0]);
      let sCurso = document.createTextNode(listaCursos[i][1]);
      let sCreditos = document.createTextNode(listaCursos[i][2]);

      cCarrera.appendChild(sCarrera);
      cCreditos.appendChild(sCreditos);
      cCurso.appendChild(sCurso);

      // Creación del botón de editar
      let botonEditar = document.createElement('button');
      botonEditar.innerText = 'Editar';
      botonEditar.dataset.codigo = listaCursos[i][0];
      botonEditar.classList.add('btnEditar');

      botonEditar.addEventListener('click', editar);

      cConfiguracion.appendChild(botonEditar);

      // Creación de deshabilitar
      let botonDeshabilitar = document.createElement('button');
      botonDeshabilitar.innerText = 'Deshabilitar';
      botonDeshabilitar.dataset.codigo = listaCursos[i][0];
      botonDeshabilitar.classList.add('btnDeshabilitar');

      botonDeshabilitar.addEventListener('click', deshabilitar);

      cConfiguracion.appendChild(botonDeshabilitar);
    }
  }
}

function validarRegistro() {
  let inputsRequeridos = document.querySelectorAll('form input:required, form select:required');
  //let inputsRequeridos = document.querySelectorAll('[required]');
  let bError = false;

  for (let i = 0; i < inputsRequeridos.length; i++) {
    if (inputsRequeridos[i].value == '') {
      inputsRequeridos[i].classList.add('errorInput');
      bError = true;
    } else {
      inputsRequeridos[i].classList.remove('errorInput');
    }
  }
  return bError;
}

function mostrarCarreras() {
  let selectCarreras = document.querySelector('#sltCarrera');
  let listaCarreras = getListaCarreras();

  for (let i = 0; i < listaCarreras.length; i++) {
    let nuevaOpcion = new Option(listaCarreras[i][1]);
    nuevaOpcion.value = listaCarreras[i][0];

    selectCarreras.options.add(nuevaOpcion);
  }
}

function limpiar() {
  let inputs = document.querySelectorAll('form input');
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = '';
  }
  let selectors = document.querySelectorAll('form select');
  for (let i = 0; i < selectors.length; i++) {
    selectors[i].selectedIndex = 0;
  }
}

function editar() {
  let codigoCurso = this.dataset.codigo;
  let curso = buscarCursoPorCodigo(codigoCurso);

  document.querySelector('#sltCarrera').value = curso[0];
  document.querySelector('#txtCurso').value = curso[1];
  document.querySelector('#txtCreditos').value = curso[2];

  console.log(curso);
}


function deshabilitar() {

}

function deshabilitar() {

}
