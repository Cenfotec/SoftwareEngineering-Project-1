let btnIniciar = document.querySelector('#btnLogin').addEventListener('click', obtenerDatos);

// Esta funcion obtiene los datos de inicio de sesion
function obtenerDatos() {
  let sId = document.querySelector('#txtCedula').value;
  let sContra = document.querySelector('#txtPassword').value;
  let acceso = false;


  acceso = validarCredenciales(sId, sContra);

  if (acceso == true) {
    ingresar();
  } else {
    swal({
      title: "Credenciales inválidas",
      text: "La identificación o la contraseña no son correctos, por favor intentelo de nuevo.",
      buttons: {
        cancel: "Aceptar",
      },
    });
  }
}

// Valida y compara la cédula y contraseña
function validarCredenciales(id, contra) {
  let listaUsuarios = obtenerListaUsuarios();
  let acceso = false;
  let rol;
  for (let i = 0; i < listaUsuarios.length; i++) {
    if (id == listaUsuarios[i]['cedula'] && contra == listaUsuarios[i]['password']) {
      acceso = true;
      sessionStorage.setItem('idUsuario', listaUsuarios[i]['cedula']);
      sessionStorage.setItem('passwordUsuario', listaUsuarios[i]['password']);
      sessionStorage.setItem('nombreUsuario', listaUsuarios[i]['pNombre']);
      sessionStorage.setItem('apellidoUsuario', listaUsuarios[i]['pApellido']);
      switch (obtenerListaUsuarios()[i]['cliente']) {
        case 'Administrador':
          rol = '1';
          break;
        case 'Cliente':
          rol = '2';
          break;
        }
      sessionStorage.setItem('rolUsuario', rol);
    }
  }
  return acceso;
}

//Esta funcion redirige al usuario segun su rol
function ingresar() {
  let rol = sessionStorage.getItem('rolUsuario');

  switch (rol) {
    case '1': //administrador
      window.location.href = 'panelControl_administrador.html';
      break;
    case '2'://cliente
      window.location.href = 'panelControl_cliente.html';
      break;
  }
}
