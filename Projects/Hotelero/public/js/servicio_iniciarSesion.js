
/*  Tipos de usuario
    1:administrador
    2:cliente
*/

// Esta funcion llama a la lista de usuarios
function getUsuarios(){

  let listaUsuarios = [];
  let listaTempUsuario = [];
  let rol;

  // Almacena el usuario que inició sesión en el sessionStorage.
  if (obtenerListaUsuarios().length > 0) {
    for (let i = 0; i < obtenerListaUsuarios().length; i++) {
      let id = obtenerListaUsuarios()[i][0];
      let password = obtenerListaUsuarios()[i][9];
      let nombre = obtenerListaUsuarios()[i][1];
      let apellido = obtenerListaUsuarios()[i][3];
      let correo = obtenerListaUsuarios()[i][7];
      switch (obtenerListaUsuarios()[i][8]) {
        case 'Administrador':
          rol = '1';
          break;
        case 'Cliente':
          rol = '2';
          break;
        }
        listaTempUsuario.push(id, password, nombre, apellido, rol, correo);
        listaUsuarios.push(listaTempUsuario);
        listaTempUsuario = [];
      }
    }
}

// Función que se encarga de retornar el usuario que inició sesión.
function getSession() {
  let listaUsuarios = obtenerListaUsuarios();
  for (let i = 0; i < listaUsuarios.length; i++) {
    if (listaUsuarios[i]['cedula'] == sessionStorage.getItem('idUsuario')) {
      let data = [];
      let id = listaUsuarios[i]['cedula'];
      let password = listaUsuarios[i]['password'];
      let nombre = listaUsuarios[i]['pNombre'];
      let apellido = listaUsuarios[i]['pApellido'];
      let rol = listaUsuarios[i]['cliente'];
      data.push(id, password, nombre, apellido, rol);
      return data;
    }
  }
}

// Función que se encarga de cerrar al sesión del usuario.
function logout() {
  swal({
  title: "Cerrar sesión",
  text: "¿Está seguro que desea cerrar sesión?",
  buttons: ["Cancelar", "Aceptar"],
}).then((willLogout) => {
    if (willLogout) {
      location.href = 'index.html';
      sessionStorage.clear()
    }
  });

}
