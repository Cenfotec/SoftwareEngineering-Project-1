let botonRegistrar = document.querySelector('#btnRegistrar');
botonRegistrar.addEventListener('click', obtenerDatos)

let botonActualizar = document.querySelector('#btnActualizar');
botonActualizar.addEventListener('click', obtenerDatosActualizar);
botonActualizar.classList.add('ocultar');

document.querySelector('#txtFiltro').addEventListener('keyup', mostrarCarreras);
mostrarCarreras();

function obtenerDatos() {
  let bError = validar();
  if (bError) {
    let aInfoCarrera = [];

    let sCodigo = document.querySelector('#txtCodigo').value;
    let sNombreCarrera = document.querySelector('#txtCarrera').value;
    let dFecha = new Date(document.querySelector('#txtFecha').value);

    aInfoCarrera.push(sCodigo, sNombreCarrera, dFecha);

    setCarreras(aInfoCarrera);
    limpiar();
    mostrarCarreras();
    swal({
      title: "Ocurrió un error al registrar",
      text: "Revise los campos en rojo",
      icon: "error",
      button: "Ok",
    });
  } else {
    swal({
      title: "Registro exitoso",
      text: "La carrera se ha registrado con éxito",
      icon: "success",
      button: "Ok",
    });
  }
}

function mostrarCarreras() {
  let sFiltro = document.querySelector('#txtFiltro').value;
  let listaCarreras = getListaCarreras();

  let cuerpoTabla = document.querySelector('#tblCarreras tbody');

  cuerpoTabla.innerHTML = '';

  for (let i = 0; i < listaCarreras.length; i++) {
    if (listaCarreras[i][1].toLowerCase().includes(sFiltro.toLowerCase())) {
      let fila = cuerpoTabla.insertRow();

      let cCodigo = fila.insertCell();
      let cCarrera = fila.insertCell();
      let cFecha = fila.insertCell();
      let cConfiguracion = fila.insertCell();

      let sCodigo = document.createTextNode(listaCarreras[i][0]);
      let sCarrera = document.createTextNode(listaCarreras[i][1]);

      let dFecha = new Date(listaCarreras[i][2]);

      let nDia = dFecha.getUTCDay();
      let nMes = dFecha.getUTCMonth() + 1;
      let nAnno = dFecha.getUTCFullYear();

      let sFecha = document.createTextNode(nDia + '-' + nMes + '-' + nAnno);

      cCodigo.appendChild(sCodigo);
      cCarrera.appendChild(sCarrera);
      cFecha.appendChild(sFecha);

      // Creación del botón de editar
      let botonEditar = document.createElement('button');
      botonEditar.innerText = 'Editar';
      botonEditar.dataset.codigo = listaCarreras[i][0];
      botonEditar.classList.add('btnEditar');

      botonEditar.addEventListener('click', editar);

      cConfiguracion.appendChild(botonEditar);

      // Creación de deshabilitar
      let botonDeshabilitar = document.createElement('button');
      botonDeshabilitar.innerText = 'Deshabilitar';
      botonDeshabilitar.dataset.codigo = listaCarreras[i][0];
      botonDeshabilitar.classList.add('btnDeshabilitar');

      botonDeshabilitar.addEventListener('click', deshabilitar);

      cConfiguracion.appendChild(botonDeshabilitar);

    }
  }
}

function limpiar() {
  let inputs = document.querySelectorAll('form input');
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = '';
  }
}

function editar() {
  let codigoCarrera = this.dataset.codigo;
  let carrera = buscarCarreraPorCodigo(codigoCarrera);

  botonRegistrar.classList.add('ocultar');
  botonActualizar.classList.remove('ocultar');

  document.querySelector('#txtCodigo').disabled = true;
  document.querySelector('#txtCodigo').value = carrera[0];
  document.querySelector('#txtCarrera').value = carrera[1];

  let dFecha = new Date(carrera[2]);
  let nAnno = dFecha.getUTCFullYear();
  let nMes = dFecha.getUTCMonth() + 1;
  let nDia = dFecha.getUTCDate();

  if(nMes < 10) {
    nMes = '0' + nMes;
  }
  if(nDia < 10) {
    nDia = '0' + nDia;
  }

  document.querySelector('#txtFecha').value = nAnno + '-' + nMes + '-' + nDia;

  console.log(carrera);
}


function deshabilitar() {

}


function obtenerDatosActualizar() {
  let aInfoCarrera = [];

  let sCodigo = document.querySelector('#txtCodigo').value;
  let sNombreCarrera = document.querySelector('#txtCarrera').value;
  let dFecha = new Date(document.querySelector('#txtFecha').value);

  aInfoCarrera.push(sCodigo, sNombreCarrera, dFecha);

  actualizarCarreras(aInfoCarrera);
  limpiar();
  mostrarCarreras();
  document.querySelector('#txtCodigo').disabled = false;
  botonRegistrar.classList.remove('ocultar')
  botonActualizar.classList.add('ocultar');
}

function validar() {
  let bError = false;
  let camposRequeridos = document.querySelectorAll('[required]');

  for (let i = 0; i < camposRequeridos.length; i++) {
    if (camposRequeridos[i].value == '') {
      camposRequeridos[i].classList.add('errorInput');
      bError = true;
    } else {
      camposRequeridos[i].classList.remove('errorInput');
    }
  }
  return bError;
}
