function setListaCursos(paInfoCursos) { // paInfoCursos: Es el arreglo con datos que viene del controlador.
  listaCursos = getListaCursos();
  listaCursos.push(paInfoCursos);

  localStorage.setItem('listaCursosLS', JSON.stringify(listaCursos));
}

function getListaCursos() {
  let listaCursos = JSON.parse(localStorage.getItem('listaCursosLS'));
  if (listaCursos == null) {
    listaCursos = [];
  }
  return listaCursos;
}

function buscarCursoPorCodigo(paCodigo) {
  let listaCursos = getListaCursos();
  let cursoEncontrado = [];

  for (let i = 0; i < listaCursos.length; i++) {
    if (listaCursos[i][0] == paCodigo) {
      cursoEncontrado = listaCursos[i];
    }
  }
  return cursoEncontrado;
}
