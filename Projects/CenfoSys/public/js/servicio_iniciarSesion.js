
/*  Tipos de usuario
    1:administrador
    2:gerencia
    3:rector
    4:decanatura
    5:asist. decanatura
    6:registro
    7:mercadeo
    8:profesor
*/

// Esta funcion une a lista de funcionarios y profesores registrados

function setUsuarios(){
  let listaUsuarios = getUsuarios();

  localStorage.setItem('usuariosLS', JSON.stringify(listaUsuarios));
}

// Esta funcion llama a la lista de usuarios
function getUsuarios(){

  let listaUsuarios = [];
  let listaTempUsuario = [];
  let rol;

  // Funcionarios
  if (getListaFuncionarios().length > 0) {
    for (let i = 0; i < getListaFuncionarios().length; i++) {
      let id = getListaFuncionarios()[i][0];
      let password = getListaFuncionarios()[i][8];
      let nombre = getListaFuncionarios()[i][1];
      let apellido = getListaFuncionarios()[i][3];
      let correo = getListaFuncionarios()[i][6];
      switch (getListaFuncionarios()[i][7]) {
        case 'Administrador':
          rol = '1';
          break;
        case 'Gerencia':
          rol = '2';
          break;
        case 'Rector':
          rol = '3';
          break;
        case 'Decanatura':
          rol = '4';
          break;
        case 'Asist. Decanatura':
          rol = '5';
          break;
        case 'Registro':
          rol = '6';
          break;
        case 'Mercadeo':
          rol = '7';
          break;
        }
        listaTempUsuario.push(id, password, nombre, apellido, rol, correo);
        listaUsuarios.push(listaTempUsuario);
        listaTempUsuario = [];
      }
    }


    // Profesor
    if (getListaProfesores().length > 0) {
      for (let i = 0; i < getListaProfesores().length; i++) {
        let id = getListaProfesores()[i][0];
        let password = getListaProfesores()[i][29];
        let nombre = getListaProfesores()[i][2];
        let apellido = getListaProfesores()[i][4];
        let correo = getListaProfesores()[i][6];
        rol = '8';
        listaTempUsuario.push(id, password, nombre, apellido, rol, correo);
        listaUsuarios.push(listaTempUsuario);
        listaTempUsuario = [];
      }
    }
    return listaUsuarios;
}

function getSession() {
  let listaUsuarios = JSON.parse(localStorage.getItem('usuariosLS'));
  for (let i = 0; i < listaUsuarios.length; i++) {
    if (listaUsuarios[i][0] == sessionStorage.getItem('idUsuario')) {
      let data = [];
      let id = listaUsuarios[i][0];
      let password = listaUsuarios[i][1];
      let nombre = listaUsuarios[i][2];
      let apellido = listaUsuarios[i][3];
      let rol = listaUsuarios[i][4];
      data.push(id, password, nombre, apellido, rol);
      return data;
    }
  }
}

function logout() {
  swal({
  title: "Cerrar sesión",
  text: "¿Está seguro que desea cerrar sesión?",
  buttons: ["Cancelar", "Aceptar"],
}).then((willLogout) => {
    if (willLogout) {
      location.href = 'homePage.html';
      sessionStorage.clear()
    }
  });

}
