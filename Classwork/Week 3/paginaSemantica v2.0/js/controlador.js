let botonEnviar = document.querySelector('#btnEnviar');
botonEnviar.addEventListener('click', obtenerDatos);

function obtenerDatos() {
  let inputNombre = document.querySelector('#txtNombre');
  let sNombre = inputNombre.value;

  let inputCorreo = document.querySelector('#txtCorreo');
  let sCorreo = inputCorreo.value;

  let inputTelefono = document.querySelector('#txtTelefono');
  let sTelefono = inputTelefono.value;
  console.log("Nombre: " + sNombre + "\nCorreo: " + sCorreo + "\nTelefono: " + sTelefono);
}
