let botonRegistrar = document.querySelector('#btnRegistrar');

botonRegistrar.addEventListener('click', obtenerDatos);

function obtenerDatos() {
  let sTitulo = document.querySelector('#txtLibro').value;
  console.log(sTitulo);

  let sGenero = document.querySelector('#sltGenero').value;
  console.log(sGenero);

  let dFecha = document.querySelector('#txtFecha').value;
  console.log(dFecha);

  let sEditorial = document.querySelector('#txtEditorial').value;
  console.log(sEditorial);


  let infoLibro = [sTitulo, sGenero, dFecha, sEditorial];
  console.log(infoLibro);
  console.log("Titulo: " + infoLibro[0]);
  console.log("Genero: " + infoLibro[1]);
  console.log("Fecha: " + infoLibro[2]);
  console.log("Editorial: " + infoLibro[3]);
}
