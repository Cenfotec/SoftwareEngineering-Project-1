function setFormasPago(formaPago) {
  listaFormasPago = obtenerListaFormasPago();
  listaFormasPago.push(formaPago);

  localStorage.setItem('formasPagoLS', JSON.stringify(listaFormasPago));
}

function obtenerListaFormasPago() {
  let listaFormasPago = JSON.parse(localStorage.getItem('formasPagoLS'));
  if (listaFormasPago == null) {
    listaFormasPago = []
  }
  return listaFormasPago;
}
