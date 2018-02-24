// Mantenimiento de Medicamientos

document.onload = mostrarMedicamentos();

let btnEnviar = document.querySelector('#btnEnviar-1');
btnEnviar.addEventListener('click', enviarMedicamento);

function enviarMedicamento() {
  let sNombre = document.querySelector('#txtNombre').value;
  let sUsos = document.querySelector('#txtUsos').value;
  let listaTipoUso = document.querySelector('#selectTipoUso').value;
  let listaTipoPresentacion = document.querySelector('#selectTipoPresentacion').value;
  let iPrecio = document.querySelector('#numPrecio').value;
  let bRecetaMedica = document.querySelector('#checkboxReceta').checked;
  let sCasaFarmaceutica = document.querySelector('#txtCasaFarmaceutica').value;

  let infoMedicamento = [sNombre, sUsos, listaTipoUso, listaTipoPresentacion, iPrecio, bRecetaMedica, sCasaFarmaceutica];

  setMedicamento(infoMedicamento);
  mostrarMedicamentos();
}

function mostrarMedicamentos() {
  let listaMedicamentos = obtenerListaMedicamentos();
  let cuerpoTable = document.querySelector('#tblMedicamentos tbody');

  cuerpoTable.innerHTML = '';

  for (let i = 0; i < listaMedicamentos.length; i++) {
    let fila = cuerpoTable.insertRow(i);

    let cNombre = fila.insertCell();
    let cUsos = fila.insertCell();
    let cTipoUso = fila.insertCell();
    let cTipoPresentacion = fila.insertCell();
    let cPrecio = fila.insertCell();
    let cRecetaMedica = fila.insertCell();
    let cCasaFarmaceutica = fila.insertCell();

    let sNombre = document.createTextNode(listaMedicamentos[i][0]);
    let sUsos = document.createTextNode(listaMedicamentos[i][1]);
    let sTipoUso = document.createTextNode(listaMedicamentos[i][2]);
    let sTipoPresentacion = document.createTextNode(listaMedicamentos[i][3]);
    let sPrecio = document.createTextNode(listaMedicamentos[i][4]);
    let sRecetaMedica = document.createTextNode(listaMedicamentos[i][5]);
    let sCasaFarmaceutica = document.createTextNode(listaMedicamentos[i][6]);

    cNombre.appendChild(sNombre);
    cUsos.appendChild(sUsos);
    cTipoUso.appendChild(sTipoUso);
    cTipoPresentacion.appendChild(sTipoPresentacion);
    cPrecio.appendChild(sPrecio);
    cRecetaMedica.appendChild(sRecetaMedica);
    cCasaFarmaceutica.appendChild(sCasaFarmaceutica);
  }
}
