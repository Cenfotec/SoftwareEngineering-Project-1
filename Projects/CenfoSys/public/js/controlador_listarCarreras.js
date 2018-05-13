//Llamadas de funciónes
let mostraStatus = true;
document.querySelector('#txtBuscar').addEventListener('keyup', mostrarCarreras);

let botonVerDesactivadas = document.querySelector('#btnDesactivados');
botonVerDesactivadas.addEventListener('click', mostrarCarrerasDesactivadas);

let botonVerActivadas = document.querySelector('#btnActivados');
botonVerActivadas.addEventListener('click', mostrarCarrerasActivadas);

botonVerActivadas.classList.add('ocultar');
mostrarCarrerasActivadas();

//Búsqueda de datos por identificación y listado de datos
function mostrarCarreras() {
  if (mostraStatus) {
    mostrarCarrerasActivadas();
  } else {
    mostrarCarrerasDesactivadas();
  }
}
//Guarda el codigo de la carrera y la busca en la lista de sedes ademas manda la carrera para ser almacenada en el local storage y cambia al modulo de modificar
function editar() {
  let codigoCarrera = this.dataset.codigo;

  let carrera = buscarCarreraPorCodigo(codigoCarrera);

  setCarrera(carrera);
  location.href = "../html/modificarCarrera.html";


}
//desactiva la carrera clickeada
function desactivar() {
  let codigoCarrera = this.dataset.codigo;
  let carrera = buscarCarreraPorCodigo(codigoCarrera);

  carrera[6] = false;

  swal({
    title: "Desactivar carrera",
    text: "¿Está seguro que desea desactivar esta carrera?",
    buttons: ["Cancelar", "Aceptar"],
  }).then((willDelete) => {
    if (willDelete) {
      actualizarCarrera(carrera);
      mostrarCarrerasActivadas();
    }
  });
}
//activa la carrera clickeada
function activar() {
  let codigoCarrera = this.dataset.codigo;
  let carrera = buscarCarreraPorCodigo(codigoCarrera);

  carrera[6] = true;

  swal({
    title: "Activar carrera",
    text: "¿Está seguro que desea activar esta carrera?",
    buttons: ["Cancelar", "Aceptar"],
  }).then((willDelete) => {
    if (willDelete) {
      actualizarCarrera(carrera);
      mostrarCarrerasDesactivadas();
    }
  });
}

//Muestra una lista de los elementos desactivados al clickear el boton 'ver desactivadas'
function mostrarCarrerasDesactivadas() {
  mostraStatus = false;
  botonVerActivadas.classList.remove('ocultar');
  botonVerDesactivadas.classList.add('ocultar');

  let sBuscar = document.querySelector('#txtBuscar').value;
  let listaCarreras = getListaCarrera();
  let cuerpoTabla = document.querySelector('#tblCarreras tbody');

  let listaAsc = [];
  cuerpoTabla.innerHTML = '';

  for (let i = 0; i < listaCarreras.length; i++) {

    if (listaCarreras[i][0].toLowerCase().includes(sBuscar.toLowerCase())) {

      if (listaCarreras[i][6] == false) {
        let fila = cuerpoTabla.insertRow();

        let cConfiguración = fila.insertCell();
        let cCodigo = fila.insertCell();
        cCodigo.dataset.codigo = listaCarreras[i][0];
        cCodigo.setAttribute('data-tooltip', 'Ver carrera');
        cCodigo.classList.add('tooltip-bottom');
        cCodigo.addEventListener('click', visualizarCarrera);
        let cNombreCarrera = fila.insertCell();
        let cCantidadCreditos = fila.insertCell();
        let cAcreditacion = fila.insertCell();

        let sCodigo = document.createTextNode(listaCarreras[i][0]);
        let sNombreCarrera = document.createTextNode(listaCarreras[i][1]);
        let nCreditos = document.createTextNode(listaCarreras[i][3]);
        let bAcreditacion = '';
        if (listaCarreras[i][5] == 'Acreditada') {
          bAcreditacion = document.createTextNode('Si');
        } else {
          bAcreditacion = document.createTextNode('No');
        }


        cCodigo.appendChild(sCodigo);
        cNombreCarrera.appendChild(sNombreCarrera);
        cCantidadCreditos.appendChild(nCreditos);
        cAcreditacion.appendChild(bAcreditacion);

        let botonDesactivar = document.createElement('button');
        botonDesactivar.innerText = '';
        botonDesactivar.classList.add('botonTabla');
        botonDesactivar.classList.add('botonDesactivar');
        botonDesactivar.setAttribute('data-tooltip', 'Desactivar');
        botonDesactivar.dataset.codigo = listaCarreras[i][0];
        botonDesactivar.addEventListener('click', desactivar);

        let botonActivar = document.createElement('button');
        botonActivar.innerText = '';
        botonActivar.classList.add('botonTabla');
        botonActivar.classList.add('botonActivar');
        botonActivar.setAttribute('data-tooltip', 'Activar');
        botonActivar.dataset.codigo = listaCarreras[i][0];
        botonActivar.addEventListener('click', activar);

        let botonEditar = document.createElement('button');
        botonEditar.innerText = '';
        botonEditar.classList.add('botonTabla');
        botonEditar.classList.add('botonEditar');
        botonEditar.setAttribute('data-tooltip', 'Editar');
        botonEditar.dataset.codigo = listaCarreras[i][0];
        botonEditar.addEventListener('click', editar)

        if (!listaCarreras[i][6]) {
          botonDesactivar.classList.add('ocultar');
        } else {
          botonActivar.classList.add('ocultar');
        }

        cConfiguración.appendChild(botonEditar);
        cConfiguración.appendChild(botonDesactivar);
        cConfiguración.appendChild(botonActivar);
      }
    }
  }
}
//muestra una lista de los elementos activados al clickear el boton 'ver activadas'
function mostrarCarrerasActivadas() {
  mostraStatus = true;
  botonVerActivadas.classList.add('ocultar');
  botonVerDesactivadas.classList.remove('ocultar');

  let sBuscar = document.querySelector('#txtBuscar').value;
  let listaCarreras = getListaCarrera();
  let cuerpoTabla = document.querySelector('#tblCarreras tbody');

  let listaAsc = [];
  cuerpoTabla.innerHTML = '';

  for (let i = 0; i < listaCarreras.length; i++) {

    if (listaCarreras[i][0].toLowerCase().includes(sBuscar.toLowerCase())) {

      if (listaCarreras[i][6] == true) {
        let fila = cuerpoTabla.insertRow();

        let cConfiguración = fila.insertCell();
        let cCodigo = fila.insertCell();
        cCodigo.dataset.codigo = listaCarreras[i][0];
        cCodigo.setAttribute('data-tooltip', 'Ver carrera');
        cCodigo.classList.add('tooltip-bottom');
        cCodigo.addEventListener('click', visualizarCarrera);
        let cNombreCarrera = fila.insertCell();
        let cCantidadCreditos = fila.insertCell();
        let cAcreditacion = fila.insertCell();

        let sCodigo = document.createTextNode(listaCarreras[i][0]);
        let sNombreCarrera = document.createTextNode(listaCarreras[i][1]);
        let nCreditos = document.createTextNode(listaCarreras[i][3]);
        let bAcreditacion = '';
        if (listaCarreras[i][5] == 'Acreditada') {
          bAcreditacion = document.createTextNode('Si');
        } else {
          bAcreditacion = document.createTextNode('No');
        }


        cCodigo.appendChild(sCodigo);
        cNombreCarrera.appendChild(sNombreCarrera);
        cCantidadCreditos.appendChild(nCreditos);
        cAcreditacion.appendChild(bAcreditacion);

        let botonDesactivar = document.createElement('button');
        botonDesactivar.innerText = '';
        botonDesactivar.classList.add('botonTabla');
        botonDesactivar.classList.add('botonDesactivar');
        botonDesactivar.setAttribute('data-tooltip', 'Desactivar');
        botonDesactivar.dataset.codigo = listaCarreras[i][0];
        botonDesactivar.addEventListener('click', desactivar);

        let botonActivar = document.createElement('button');
        botonActivar.innerText = '';
        botonActivar.classList.add('botonTabla');
        botonActivar.classList.add('botonActivar');
        botonActivar.setAttribute('data-tooltip', 'Activar');
        botonActivar.dataset.codigo = listaCarreras[i][0];
        botonActivar.addEventListener('click', activar);



        let botonEditar = document.createElement('button');
        botonEditar.innerText = '';
        botonEditar.classList.add('botonTabla');
        botonEditar.classList.add('botonEditar');
        botonEditar.setAttribute('data-tooltip', 'Editar');
        botonEditar.dataset.codigo = listaCarreras[i][0];
        botonEditar.addEventListener('click', editar)

        if (!listaCarreras[i][6]) {
          botonDesactivar.classList.add('ocultar');
        } else {
          botonActivar.classList.add('ocultar');
        }

        cConfiguración.appendChild(botonEditar);
        cConfiguración.appendChild(botonDesactivar);
        cConfiguración.appendChild(botonActivar);
      }
    }
  }
}
//Muestra el modal de la carrera con sus respectivos datos
function visualizarCarrera() {
  let codigoCarrera = this.dataset.codigo;
  let carrera = buscarCarreraPorCodigo(codigoCarrera);
  let cursosCarrera = carrera[7];


  setCarreraVisualizar(carrera);

  openModal()


  document.querySelector('#lblNombre').innerHTML = carrera[1];
  document.querySelector('#lblGradoAcademico').innerHTML = carrera[2].charAt(0).toUpperCase() + carrera[2].slice(1);
  document.querySelector('#lblCreditos').innerHTML = carrera[3] + ' creditos';
  if (!carrera[4].includes('.')) {
    document.querySelector('#lblVersion').innerHTML = carrera[4] + '.0';
  } else {
    document.querySelector('#lblVersion').innerHTML = carrera[4];
  }

  if (carrera[5].includes('No')) {
    document.querySelector('#lblAcreditada').innerHTML = 'No';
  } else {
    document.querySelector('#lblAcreditada').innerHTML = 'Si';
  }

  let cuerpoTabla = document.querySelector('#tblCursos tbody');
  cuerpoTabla.innerHTML = '';

  for (let i = 0; i < cursosCarrera.length; i++) {
    let fila = cuerpoTabla.insertRow();

    let cCodigo = fila.insertCell();
    let cNombre = fila.insertCell();

    let sCodigo = document.createTextNode(cursosCarrera[i]);
    let sNombre = document.createTextNode(buscarCursoPorCod(cursosCarrera[i])[1]);

    cCodigo.appendChild(sCodigo);
    cNombre.appendChild(sNombre);
  }

  return false;
}
