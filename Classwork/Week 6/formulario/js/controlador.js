let botonRegistrar = document.querySelector('#btnRegistrar');

botonRegistrar.addEventListener('click', obtenerDatos);

function obtenerDatos() {
  let sTitulo = document.querySelector('#txtLibro').value;
  let sGenero = document.querySelector('#sltGenero').value;
  let dFecha = document.querySelector('#txtFecha').value;
  let sEditorial = document.querySelector('#txtEditorial').value;

  let infoLibro = [sTitulo, sGenero, dFecha, sEditorial];

  setListaLibros(infoLibro);
  mostrarLibros();
}



function mostrarLibros() {
  let listaLibros = obtenerListaLibros();
  let cuerpoTable = document.querySelector('#tblLibros tbody');

  cuerpoTable.innerHTML = ''; // Limpa el tbody antes de imprimir los datos.

  for (let i = 0; i < listaLibros.length; i++) {
    let fila = cuerpoTable.insertRow(i);

    let cTitulo = fila.insertCell();
    let cGenero = fila.insertCell();
    let cFecha = fila.insertCell();
    let cEditorial = fila.insertCell();

    let sTitulo = document.createTextNode(listaLibros[i][0]);
    let sGenero = document.createTextNode(listaLibros[i][1]);
    let sFecha = document.createTextNode(listaLibros[i][2]);
    let sEditorial = document.createTextNode(listaLibros[i][3]);

    cTitulo.appendChild(sTitulo);
    cGenero.appendChild(sGenero);
    cFecha.appendChild(sFecha);
    cEditorial.appendChild(sEditorial);


  }
}
