function setUsuario(usuario) {
  listaUsuarios = obtenerListaUsuarios();
  listaUsuarios.push(usuario)

  localStorage.setItem('usuariosLS', JSON.stringify(listaUsuarios));
}

function obtenerListaUsuarios() {
  listaUsuarios = JSON.parse(localStorage.getItem('usuariosLS'));
  if (listaUsuarios == null) {
    listaUsuarios = [];
  }
  return listaUsuarios;
}
