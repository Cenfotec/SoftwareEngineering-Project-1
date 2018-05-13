setUsuarios();

modal2.classList.add('ocultar');

let btnIniciar = document.querySelector('#btnIniciar').addEventListener('click', obtenerDatos);

// Esta funcion obtiene los datos de inicio de sesion
function obtenerDatos() {
  let sId = document.querySelector('#txtId').value;
  let sContra = document.querySelector('#txtContra').value;
  let acceso = false;


  acceso = validarCredenciales(sId, sContra);

  if (acceso == true) {
    ingresar();
  } else {
    swal({
      title: "Credenciales invalidas",
      text: "La identificación o la contraseña no son correctos, por favor intentelo de nuevo.",
      buttons: {
        cancel: "Aceptar",
      },
    });
  }
}  // limpiar el st y hacer if

//Esta funcion valida que los datos existane en el LS
function validarCredenciales(id, contra) {
  let listaUsuarios = getUsuarios();
  let acceso = false;

  for (let i = 0; i < listaUsuarios.length; i++) {
    if (id == listaUsuarios[i][0] && contra == listaUsuarios[i][1]) {
      acceso = true;
      sessionStorage.setItem('idUsuario', listaUsuarios[i][0]);
      sessionStorage.setItem('passwordUsuario', listaUsuarios[i][1]);
      sessionStorage.setItem('nombreUsuario', listaUsuarios[i][2]);
      sessionStorage.setItem('apellidoUsuario', listaUsuarios[i][3]);
      sessionStorage.setItem('rolUsuario', listaUsuarios[i][4]);
      sessionStorage.setItem('firstLoginSS', true);
    }
  }
  return acceso;
}

//Esta funcion redirige al usuario segun su rol
function ingresar() {
  let rol = sessionStorage.getItem('rolUsuario');

  switch (rol) {
    case '1': //administrador
      if (getSession()[1].length == 4) {
        window.location.href = '../html/modificarPerfilFuncionario.html';
      } else {
        window.location.href = '../html/panelControl_administrador.html';
      }
      break;
    case '2'://gerente
      if (getSession()[1].length == 4) {
        window.location.href = '../html/modificarPerfilFuncionario.html';
      } else {
        window.location.href = '../html/panelControl_gerencia.html';
      }
      break;
    case '3'://rector
      if (getSession()[1].length == 4) {
        window.location.href = '../html/modificarPerfilFuncionario.html';
      } else {
        window.location.href = '../html/panelControl_rector.html';
      }
      break;
    case '4'://decanatura
      if (getSession()[1].length == 4) {
        window.location.href = '../html/modificarPerfilFuncionario.html';
      } else {
        window.location.href = '../html/panelControl_decanatura.html';
      }
      break;
    case '5'://asistente decanatura
      if (getSession()[1].length == 4) {
        window.location.href = '../html/modificarPerfilFuncionario.html';
      } else {
        window.location.href = '../html/panelControl_asistenteDecanatura.html';
      }
      break;
    case '6': //registro
      if (getSession()[1].length == 4) {
        window.location.href = '../html/modificarPerfilFuncionario.html';
      } else {
        window.location.href = '../html/panelControl_registro.html';
      }
      break;
    case '7'://mercadeo
      if (getSession()[1].length == 4) {
        window.location.href = '../html/modificarPerfilFuncionario.html';
      } else {
        window.location.href = '../html/panelControl_mercadeo.html';
      }
      break;
    case '8'://profesor
      if (getSession()[1].length == 4) {
        window.location.href = '../html/modificarPerfilProfesor.html';
      } else {
        window.location.href = '../html/visualizarPerfilProfesor.html';
      }
      break;
  }
}

// Se encanrga de abrir el modal
document.querySelector('#restablecerContra').addEventListener('click', function restablecerContra() {
  openModal()

  document.querySelector('#btnSolicitar').addEventListener('click', modificarContrasenna);

});

//Se encargar de agarrar los datos y compararlo en el LS para segun el rol, mandarlo a la funcion respectiva
function modificarContrasenna() {



  let correo = document.querySelector('#txtCorreo').value;
  let id = document.querySelector('#txtId2').value;
  let listaUsuarios = getUsuarios();
  let rol = '';
  let contraNueva = generarContrasenna();
  let existe = false;


  for (let i = 0; i < listaUsuarios.length; i++) {
    if (id == listaUsuarios[i][0] && correo == listaUsuarios[i][5]) {
      rol = listaUsuarios[i][4];
      existe = true;

    }

  }

  if (existe == true) {

    modal1.classList.add('ocultar');
    modal2.classList.remove('ocultar');

    document.querySelector('#pContraNueva').innerHTML = contraNueva;

    if (rol == '8') {
      modificarContraProfesor(id, correo, contraNueva);
    } else {
      modificarContraFuncionario(id, correo, contraNueva);
    }
  }else{
    swal({
      title: "Credenciales inválidas",
      text: "Los datos ingresados no se encuentran en nuestro sistema, vuelva a intentarlo.",
      buttons: {
        cancel: "Aceptar",
      },
    });
  }

}

// Se encarga de modificar la contraseña si el rol es profesor
function modificarContraProfesor(id, correo, contraNueva) {
  let listaProfesores = getListaProfesores();

  let aProfesor = [];

  let sTipoCedula = '';
  let sPNombre = '';
  let sSNombre = '';
  let sPApellido = '';
  let sSApellido = '';
  let sCorreoP = '';
  let sCorreoS = '';
  let sTelefonoP = '';
  let sTelefonoS = '';
  let sContactoEmergencia = '';
  let sltProvincia = '';
  let sltCanton = '';
  let sltDistrito = '';
  let sDireccionExacta = '';
  let sLugarTrabajo = '';
  let sExperienciaL = '';
  let sExperienciaD = '';
  let sltCVirtual = '';
  let sltCDocente = '';
  let sltNivelIngles = '';
  let sltGrado = '';
  let sEnfermedades = '';
  let sObservaciones = '';
  let aHorario = '';
  let aCertificaciones = '';
  let aCursos = '';
  let aSedes = '';
  let sContrasenna = '';
  let sEstado = '';
  let sFotografia = '';

  for (let i = 0; i < listaProfesores.length; i++) {
    if (id == listaProfesores[i][0]) {
      sTipoCedula = listaProfesores[i][1];
      sPNombre = listaProfesores[i][2];
      sSNombre = listaProfesores[i][3];
      sPApellido = listaProfesores[i][4];
      sSApellido = listaProfesores[i][5];
      sCorreoP = listaProfesores[i][6];
      sCorreoS = listaProfesores[i][7];
      sTelefonoP = listaProfesores[i][8];
      sTelefonoS = listaProfesores[i][9];
      sContactoEmergencia = listaProfesores[i][10];
      sltProvincia = listaProfesores[i][11];
      sltCanton = listaProfesores[i][12];
      sltDistrito = listaProfesores[i][13];
      sDireccionExacta = listaProfesores[i][14];
      sLugarTrabajo = listaProfesores[i][15];
      sExperienciaL = listaProfesores[i][16];
      sExperienciaD = listaProfesores[i][17];
      sltCVirtual = listaProfesores[i][18];
      sltCDocente = listaProfesores[i][19];
      sltNivelIngles = listaProfesores[i][20];
      sltGrado = listaProfesores[i][21];
      sEnfermedades = listaProfesores[i][22];
      sObservaciones = listaProfesores[i][23];
      aHorario = listaProfesores[i][24];
      aCertificaciones = listaProfesores[i][25];
      aCursos = listaProfesores[i][26];
      aSedes = listaProfesores[i][27];
      sContrasenna = contraNueva;
      sEstado = listaProfesores[i][29];
      sFotografia = listaProfesores[i][30];
    }


  }

  aProfesor.push(id, sTipoCedula, sPNombre, sSNombre, sPApellido, sSApellido, sCorreoP, sCorreoS, sTelefonoP, sTelefonoS, sContactoEmergencia, sltProvincia, sltCanton, sltDistrito, sDireccionExacta, sLugarTrabajo, sExperienciaL, sExperienciaD, sltCVirtual, sltCDocente, sltNivelIngles, sltGrado, sEnfermedades, sObservaciones, aHorario, aCertificaciones, aCursos, aSedes, sContrasenna, sEstado, sFotografia);
  actualizarProfesor(aProfesor);
}

// Se encarga de modificar la contraseña si el rol es de funcionario
function modificarContraFuncionario(id, correo, contraNueva) {
  let listaFuncionarios = getListaFuncionarios();

  let aFuncionario = [];

  let sPNombre = '';
  let sSNombre = '';
  let sPApellido = '';
  let sSApellido = '';
  let sTelefono = '';
  let sCorreo = '';
  let sRol = '';
  let sContrasenna = '';
  let sEstado = '';


  for (let i = 0; i < listaFuncionarios.length; i++) {
    if (id == listaFuncionarios[i][0]) {
      sPNombre = listaFuncionarios[i][1];
      sSNombre = listaFuncionarios[i][2];
      sPApellido = listaFuncionarios[i][3];
      sSApellido = listaFuncionarios[i][4];
      sTelefono = listaFuncionarios[i][5];
      sCorreo = listaFuncionarios[i][6];
      sRol = listaFuncionarios[i][7];
      sContrasenna = contraNueva;
      sEstado = listaFuncionarios[i][9];
    }
  }

  aFuncionario.push(id, sPNombre, sSNombre, sPApellido, sSApellido, sTelefono, sCorreo, sRol, sContrasenna, sEstado);
  actualizarFuncionario(aFuncionario);
}

//Se genera una contraseña de forma aleatoria.
function generarContrasenna() {
  let longitud = 4;//No es necesario que sea de 8 o 16 ya que es temporal; cuando se modifque la contraseña, si se le va a exigir al usuario una de 8 o más caractéres.
  let caracteres = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ012346789";
  let contrasenna = "";

  for (let i = 0; i < longitud; i++) {
    contrasenna += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return contrasenna;
}
