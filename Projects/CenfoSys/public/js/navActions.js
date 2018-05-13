mostrarDatos();

document.querySelector('#sesionDerecha').addEventListener('click', perfil);
document.querySelector('#logoutDerecha').addEventListener('click', logout);

let pageURL = window.location.href;
let toRemove = '/html/';
let parts = pageURL.split(toRemove);
let currentPage = parts[1].split('.html')[0];

if (!currentPage.includes('panelControl_')) {
  document.querySelector('#flechaIzquierda').addEventListener('click', paginaAtras);
}

if (getSession()[1].length == 4) {
  const imageURL = '../img/logoCenfoSysSwal.png';
  swal({
    title: "Bienvenido a CenfoSys",
    text: "Para empezar, por favor cambie su contraseña. Su contraseña es: " + getSession()[1],
    icon: imageURL,
    button: "Aceptar",
  });
}


function mostrarDatos() {
  let password = getSession()[1];
  let nombre = getSession()[2];
  let apellido = getSession()[3];
  document.querySelector('#nombreSesion').innerHTML = nombre + ' ' + apellido;
}


function paginaAtras() {
  if (getSession()[1].length != 4) {
    let rol;

    switch (getSession()[4]) {
      case '1':
        rol = 'administrador';
        break;
      case '2':
        rol = 'gerencia';
        break;
      case '3':
        rol = 'rector';
        break;
      case '4':
        rol = 'decanatura';
        break;
      case '5':
        rol = 'asistenteDecanatura';
        break;
      case '6':
        rol = 'registro';
        break;
      case '7':
        rol = 'mercadeo';
        break;
      case '8':
        rol = 'profesor';
        break;
    }
    if (currentPage == 'visualizarPerfilFuncionario') {
      location.href = 'panelControl_' + rol + '.html';
    }
    if (currentPage.includes('registrar')) {
      if (currentPage == 'registrarCertificacion') {
        if (getSession()[4] != 8) {
          location.href = 'listarProfesor.html'
        } else {
          location.href = 'visualizarPerfilProfesor.html';
        }
      } else {
        location.href = 'panelControl_' + rol + '.html';
      }
    }
    if (currentPage.includes('listar')) {
      rol = rol.charAt(0).toUpperCase() + rol.slice(1);
      location.href = 'panelControl_' + rol + '.html';
    }

    if (currentPage.includes('asociar')) {
      rol = rol.charAt(0).toUpperCase() + rol.slice(1);
      location.href = 'panelControl_' + rol + '.html';
    }

    if (currentPage == 'modificarPerfilFuncionario') {
      location.href = 'visualizarPerfilFuncionario.html';
    }

    if (currentPage == 'modificarPerfilProfesor') {
      location.href = 'visualizarPerfilProfesor.html';
    }

    if (currentPage == 'modificarSede') {
      location.href = 'listarSede.html';
    }
    if (currentPage == 'modificarProfesor') {
      location.href = 'listarProfesor.html';
    }
    if (currentPage == 'modificarFuncionarios') {
      location.href = 'listarFuncionarios.html';
    }
    if (currentPage == 'modificarCursoCarrera') {
      location.href = 'listarCursoCarrera.html';
    }
    if (currentPage == 'modificarCursoActii') {
      location.href = 'listarCursosActii.html';
    }
    if (currentPage == 'modificarCertificacion') {
      if (getSession()[4] != 8) {
        location.href = 'listarProfesor.html';
      } else {
        location.href = 'visualizarPerfilProfesor.html';    
      }
    }
    if (currentPage == 'modificarCarrera') {
      location.href = 'listarCarreras.html';
    }
    if (currentPage == 'modificarPeriodo') {
      location.href = 'listarPeriodos.html';
    }
  }
}

function perfil() {
  if (getSession()[1].length != 4) {
    if (getSession()[4] == '8') {
      location.href = 'visualizarPerfilProfesor.html';
    }else{
      location.href = 'visualizarPerfilFuncionario.html';
    }
  }
}
