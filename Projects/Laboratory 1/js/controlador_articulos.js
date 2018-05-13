// Mantenimiento de Artículos Comunes

document.onload = mostrarArticulos();

let btnEnviar = document.querySelector('#btnEnviar-2');
btnEnviar.addEventListener('click', enviarArticulo);

function enviarArticulo() {
  let sNombreArticulo = document.querySelector('#txtNombreArticulo').value;
  let listaTipoArticulo = document.querySelector('#tipoDeArticulo').value;
  let iPrecioArticulo = document.querySelector('#txtPrecioArticulo').value;
  let bPromocion = document.querySelector('#checkboxPromocion').checked;
  let sDistribuidor = document.querySelector('#txtDistribuidor').value;
  let sFabricante = document.querySelector('#txtFabricante').value;

  let infoArticulo = [sNombreArticulo, listaTipoArticulo, iPrecioArticulo, bPromocion, sDistribuidor, sFabricante];

  setArticulo(infoArticulo);
  mostrarArticulos();
}

function mostrarArticulos() {
  let listaArticulos = obtenerListaArticulos();
  let cuerpoTable = document.querySelector('#tblArticulos tbody');

  cuerpoTable.innerHTML = '';

  for (let i = 0; i < listaArticulos.length; i++) {
    let fila = cuerpoTable.insertRow(i);

    let cNombre = fila.insertCell();
    let cTipo = fila.insertCell();
    let cPrecio = fila.insertCell();
    let cPromocion = fila.insertCell();
    let cDistribuidor = fila.insertCell();
    let cFabricante = fila.insertCell();

    let sNombre = document.createTextNode(listaArticulos[i][0]);
    let sTipo = document.createTextNode(listaArticulos[i][1]);
    let sPrecio = document.createTextNode(listaArticulos[i][2]);
    let sPromocion = document.createTextNode(listaArticulos[i][3]);
    let sDistribuidor = document.createTextNode(listaArticulos[i][4]);
    let sFabricante = document.createTextNode(listaArticulos[i][5]);

    cNombre.appendChild(sNombre);
    cTipo.appendChild(sTipo);
    cPrecio.appendChild(sPrecio);
    cPromocion.appendChild(sPromocion);
    cDistribuidor.appendChild(sDistribuidor);
    cFabricante.appendChild(sFabricante);
  }
}
