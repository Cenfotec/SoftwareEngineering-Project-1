document.querySelector('#btnRegistrar').addEventListener('click', obtenerDatos);
document.querySelector('#txtFiltro').addEventListener('keyup', mostrarCarreras);
mostrarCarreras();

function obtenerDatos() {
  let aInfoCarrera = [];

  let sCodigo = document.querySelector('#txtCodigo').value;
  let sNombreCarrera = document.querySelector('#txtCarrera').value;
  let dFecha = new Date(document.querySelector('#txtFecha').value);

  aInfoCarrera.push(sCodigo, sNombreCarrera, dFecha);

  setCarreras(aInfoCarrera);
  mostrarCarreras();
  limpiar();
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

      let sCodigo = document.createTextNode(listaCarreras[i][0]);
      let sCarrera = document.createTextNode(listaCarreras[i][1]);

      let dFecha = new Date(listaCarreras[i][2]);

      let nDia = dFecha.getUTCDay();
      let nMes = dFecha.getUTCMonth() + 1;
      let nAnno = dFecha.getUTCFullYear();

      let sFecha = document.createTextNode(nDia + '/' + nMes + '/' + nAnno);

      cCodigo.appendChild(sCodigo);
      cCarrera.appendChild(sCarrera);
      cFecha.appendChild(sFecha);
    }
  }
}

function limpiar() {
  let inputs = document.querySelectorAll('form input');
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = '';
  }
}
