function setCarreras(paInfoCarrera) {
  let listaCarreras = getListaCarreras();
  listaCarreras.push(paInfoCarrera);

  localStorage.setItem('listaCarrerasLS', JSON.stringify(listaCarreras));
}




function getListaCarreras() {
  let listaCarreras = JSON.parse(localStorage.getItem('listaCarrerasLS'));

  if (listaCarreras == null) {
    listaCarreras = [
      ['BISOFT', 'Bachillerato en Ingenieria del Software', '2012-05-05'],
      ['WEB', 'Diplomado en Desarrollo Web', '2014-6-6']
    ];
  }
  return listaCarreras;
}

function buscarCarreraPorCodigo(paCodigo) {
  let listaCarreras = getListaCarreras();
  let carreraEncontrada = [];

  for (let i = 0; i < listaCarreras.length; i++) {
    if (listaCarreras[i][0] == paCodigo) {
      carreraEncontrada = listaCarreras[i];
    }
  }
  return carreraEncontrada;
}






function actualizarCarreras(paInfoCarrera) {
  let listaCarreras = getListaCarreras();
  for (let i = 0; i < listaCarreras.length; i++) {
    if (listaCarreras[i][0] == paInfoCarrera[0]) {
      listaCarreras[i] = paInfoCarrera;
      localStorage.setItem('listaCarrerasLS', JSON.stringify(listaCarreras));
    }
  }
}
