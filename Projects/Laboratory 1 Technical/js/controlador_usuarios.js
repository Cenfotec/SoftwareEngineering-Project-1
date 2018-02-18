// Mantenimiento de Usuarios

let btnEnviar = document.querySelector('#btnEnviar-3');
btnEnviar.addEventListener('click', enviarUsuario);

function enviarUsuario() {
  let sPrimerNombre = document.querySelector('#txtPrimerNombre').value;
  let sSegundoNombre = document.querySelector('#txtSegundoNombre').value;
  let sPrimerApellido = document.querySelector('#txtPrimerApellido').value;
  let sSegundoApellido = document.querySelector('#txtSegundoApellido').value;
  let iIdentificacion = document.querySelector('#numberID').value;
  let sNacionalidad = document.querySelector('#txtNacionalidad').value;
  let sCorreo = document.querySelector('#emailCorreo').value;
  let sPassword = document.querySelector('#passwordContrasena').value;
  let iEdad = document.querySelector('#numberEdad').value;
  let sNacimiento = document.querySelector('#dateNacimiento').value;

  let listaUsuario = [sPrimerNombre, sSegundoNombre, sPrimerApellido, sSegundoApellido, iIdentificacion, sNacionalidad, sCorreo, sPassword, iEdad, sNacimiento];

  console.log(listaUsuario);
}
