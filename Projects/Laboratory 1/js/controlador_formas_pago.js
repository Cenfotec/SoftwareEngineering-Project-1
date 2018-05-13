// Mantenimiento de Formas de Pago

document.onload = mostrarFormasPago();

let btnEnviar = document.querySelector('#btnEnviar-4');
btnEnviar.addEventListener('click', enviarMedicamentos);

function enviarMedicamentos() {
  let iNumeroTarjeta = document.querySelector('#numTarjeta').value;
  let sTipoTarjeta = document.querySelector('#txtTipoTarjeta').value;
  let listaEmisorTarjeta = document.querySelector('#selectEmisorTarjeta').value;
  let txtNombreTarjeta = document.querySelector('#txtNombreTarjeta').value;
  let listaTipoCliente = document.querySelector('#selectTipoCliente').value;
  let listaDescuento = document.querySelector('#numDescuento').value;

  let infoFormasPago = [iNumeroTarjeta, sTipoTarjeta, listaEmisorTarjeta, txtNombreTarjeta, listaTipoCliente, listaDescuento];

  setFormasPago(infoFormasPago);
  mostrarFormasPago();
}

function mostrarFormasPago() {
  let listaFormasPago = obtenerListaFormasPago();
  let cuerpoTable = document.querySelector('#tblFormasPago tbody');

  cuerpoTable.innerHTML = '';

  for (let i = 0; i < listaFormasPago.length; i++) {
    let fila = cuerpoTable.insertRow(i);

    let cNumeroTarjeta = fila.insertCell();
    let cTipoTarjeta = fila.insertCell();
    let cEmisor = fila.insertCell();
    let cNombre = fila.insertCell();
    let cTipoCliente = fila.insertCell();
    let cDescuento = fila.insertCell();

    let sNumeroTarjeta = document.createTextNode(listaFormasPago[i][0]);
    let sTipoTarjeta = document.createTextNode(listaFormasPago[i][1]);
    let sEmisor = document.createTextNode(listaFormasPago[i][2]);
    let sNombre = document.createTextNode(listaFormasPago[i][3]);
    let sTipoCliente = document.createTextNode(listaFormasPago[i][4]);
    let sDescuento = document.createTextNode(listaFormasPago[i][5]);





    cNumeroTarjeta.appendChild(sNumeroTarjeta);
    cTipoTarjeta.appendChild(sTipoTarjeta);
    cEmisor.appendChild(sEmisor);
    cNombre.appendChild(sNombre);
    cTipoCliente.appendChild(sTipoCliente);
    cDescuento.appendChild(sDescuento);
  }
}
