// Mantenimiento de Usuarios

document.onload = mostrarUsuarios();

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

  let infoUsuario = [sPrimerNombre, sSegundoNombre, sPrimerApellido, sSegundoApellido, iIdentificacion, sNacionalidad, sCorreo, sPassword, iEdad, sNacimiento];

  setUsuario(infoUsuario);
  mostrarUsuarios();
}

function mostrarUsuarios() {
  let listaUsuarios = obtenerListaUsuarios();
  let cuerpoTable = document.querySelector('#tblUsuarios tbody');

  cuerpoTable.innerHTML = '';

  for (let i = 0; i < listaUsuarios.length; i++) {
    let fila = cuerpoTable.insertRow(i);

    let cPrimerNombre = fila.insertCell();
    let cSegundoNombre = fila.insertCell();
    let cPrimerApellido = fila.insertCell();
    let cSegundoApellido = fila.insertCell();
    let cIdentificacion = fila.insertCell();
    let cNacionalidad = fila.insertCell();
    let cCorreo = fila.insertCell();
    let cContrasena = fila.insertCell();
    let cEdad = fila.insertCell();
    let cNacimiento = fila.insertCell();

    let sPrimerNombre = document.createTextNode(listaUsuarios[i][0]);
    let sSegundoNombre = document.createTextNode(listaUsuarios[i][1]);
    let sPrimerApellido = document.createTextNode(listaUsuarios[i][2]);
    let sSegundoApellido = document.createTextNode(listaUsuarios[i][3]);
    let sIdentificacion = document.createTextNode(listaUsuarios[i][4]);
    let sNacionalidad = document.createTextNode(listaUsuarios[i][5]);
    let sCorreo = document.createTextNode(listaUsuarios[i][6]);
    let sContrasena = document.createTextNode(listaUsuarios[i][7]);
    let sEdad = document.createTextNode(listaUsuarios[i][8]);
    let sNacimiento = document.createTextNode(listaUsuarios[i][9]);






    cPrimerNombre.appendChild(sPrimerNombre);
    cSegundoNombre.appendChild(sSegundoNombre);
    cPrimerApellido.appendChild(sPrimerApellido);
    cSegundoApellido.appendChild(sSegundoApellido);
    cIdentificacion.appendChild(sIdentificacion);
    cNacionalidad.appendChild(sNacionalidad);
    cCorreo.appendChild(sCorreo);
    cContrasena.appendChild(sContrasena);
    cEdad.appendChild(sEdad);
    cNacimiento.appendChild(sNacimiento);
  }
}
