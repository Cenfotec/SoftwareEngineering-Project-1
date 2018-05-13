function setArticulo(articulo) {
  listaArticulos = obtenerListaArticulos();
  listaArticulos.push(articulo);

  localStorage.setItem('articulosLS', JSON.stringify(listaArticulos));
}

function obtenerListaArticulos() {
  let listaArticulos = JSON.parse(localStorage.getItem('articulosLS'));
  if (listaArticulos == null) {
    listaArticulos = [];
  }
  return listaArticulos;
}
