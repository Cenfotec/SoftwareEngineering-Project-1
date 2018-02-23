function setListaLibros(paLibro) {
  let listaLibros = obtenerListaLibros();
  listaLibros.push(paLibro);
  
  localStorage.setItem('librosLS', JSON.stringify(listaLibros));
}

function obtenerListaLibros() {
  let listaLibros = JSON.parse(localStorage.getItem('librosLS'));
  if (listaLibros == null) {
    listaLibros = [];
  }
  return listaLibros;
}
