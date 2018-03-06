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
