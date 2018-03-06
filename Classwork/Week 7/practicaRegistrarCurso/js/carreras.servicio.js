function setCarreras(paInfoCarrera) {
  let listaCarreras = getListaCarreras();
  listaCarreras.push(paInfoCarrera);

  localStorage.setItem('listaCarrerasLS', JSON.stringify(listaCarreras));
}




function getListaCarreras() {
  let listaCarreras = JSON.parse(localStorage.getItem('listaCarrerasLS'));

  if (listaCarreras == null) {
    listaCarreras = [
      ['BISOFT', 'Bachillerato en Ingenieria del Software', '2012-01-01'],
      ['WEB', 'Diplomado en Desarrollo Web', '2012-01-01']
    ];
  }
  return listaCarreras;
}
