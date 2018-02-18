// Mantenimiento de Artículos Comunes

let btnEnviar = document.querySelector('#btnEnviar-2');
btnEnviar.addEventListener('click', enviarArticulo);

function enviarArticulo() {
  let sNombreArticulo = document.querySelector('#txtNombreArticulo').value;
  let listaTipoArticulo = document.querySelector('#tipoDeArticulo').value;
  let iPrecioArticulo = document.querySelector('#txtPrecioArticulo').value;
  let bPromocion = document.querySelector('#checkboxPromocion').checked;
  let sDistribuidor = document.querySelector('#txtDistribuidor').value;
  let sFabricante = document.querySelector('#txtFabricante').value;

  let listaArticulo = [sNombreArticulo, listaTipoArticulo, iPrecioArticulo, bPromocion, sDistribuidor, sFabricante];

  console.log(listaArticulo);
}
