// Mantenimiento de Formas de Pago

let btnEnviar = document.querySelector('#btnEnviar-4');
btnEnviar.addEventListener('click', enviarMedicamentos);

function enviarMedicamentos() {
  let iNumeroTarjeta = document.querySelector('#numTarjeta').value;
  let sTipoTarjeta = document.querySelector('#txtTipoTarjeta').value;
  let listaEmisorTarjeta = document.querySelector('#selectEmisorTarjeta').value;
  let txtNombreTarjeta = document.querySelector('#txtNombreTarjeta').value;
  let listaTipoCliente = document.querySelector('#selectTipoCliente').value;
  let listaDescuento = document.querySelector('#numDescuento').value;

  let listaFormasPago = [iNumeroTarjeta, sTipoTarjeta, listaEmisorTarjeta, txtNombreTarjeta, listaTipoCliente, listaDescuento];

  console.log(listaFormasPago);
}
