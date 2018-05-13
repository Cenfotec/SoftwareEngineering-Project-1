function actualizarProfesor(paInfoProfesor) {
  let listaProfesores = getListaProfesores();
  for (let i = 0; i < listaProfesores.length; i++) {
    if (listaProfesores[i][0] == paInfoProfesor[0]) {
      listaProfesores[i] = paInfoProfesor;
      localStorage.setItem('profesoresLS', JSON.stringify(listaProfesores));
      setUsuarios();
    }
  }
}
