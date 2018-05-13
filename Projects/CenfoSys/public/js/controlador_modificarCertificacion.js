function getCertificaciones() {
  return buscarProfesorPorId(getID())[25];
}

mostrarDatos();
document.querySelector('#btnActualizar').addEventListener('click', obtenerDatosActualizar);
document.querySelector('#btnEliminar').addEventListener('click', eliminarCertificacion);
document.querySelector('#btnRegistrar').addEventListener('click', irARegistro);
document.querySelector('#sltCertificacion').addEventListener('change', updateCertificaciones);

function mostrarDatos() {
  let listaProfesores = buscarProfesorPorId(getID());
  let sltCertificacion = document.querySelector('#sltCertificacion');

  for (let i = 0; i < getCertificaciones().length; i++) {
    let option = document.createElement('option');
    option.text = getCertificaciones()[i][1];
    sltCertificacion.appendChild(option);
  }
  let sFecha = document.querySelector('#txtFecha').value = listaProfesores[25][sltCertificacion.selectedIndex][0];
  let sCertificacion = document.querySelector('#txtCertificacion').value = listaProfesores[25][sltCertificacion.selectedIndex][1];
  let sCodigo = document.querySelector('#txtCodigo').value = listaProfesores[25][sltCertificacion.selectedIndex][2];
}

function updateCertificaciones() {
  let listaProfesores = buscarProfesorPorId(getID());
  let sltCertificacion = document.querySelector('#sltCertificacion');
  document.querySelector('#txtFecha').value = '';
  document.querySelector('#txtCertificacion').value = '';
  document.querySelector('#txtCodigo').value = '';

  if (listaProfesores[25].length == 0) {
    location.href = "listarProfesor.html";
  }

  document.querySelector('#txtFecha').value = listaProfesores[25][sltCertificacion.selectedIndex][0];
  document.querySelector('#txtCertificacion').value = listaProfesores[25][sltCertificacion.selectedIndex][1];
  document.querySelector('#txtCodigo').value = listaProfesores[25][sltCertificacion.selectedIndex][2];

}





function obtenerDatosActualizar() {
  let profesor = buscarProfesorPorId(getID());
  let bError = validarRegistro();
  let sltCertificacion = document.querySelector('#sltCertificacion');
  if (!bError) {
    let aInfoProfesor = buscarProfesorPorId(getID());

    let sFecha = document.querySelector('#txtFecha').value;
    let sCertificacion = document.querySelector('#txtCertificacion').value;
    let sCodigo = document.querySelector('#txtCodigo').value;

    aInfoProfesor[25][sltCertificacion.selectedIndex] = [];
    aInfoProfesor[25][sltCertificacion.selectedIndex].push(sFecha, sCertificacion, sCodigo);
    actualizarProfesor(aInfoProfesor);
    swal({
      title: "Certificación actualizada",
      text: "Los datos de la certificación se actualizaron exitosamente.",
      buttons: {
        confirm: "Aceptar",
      },
    });
	if (getSession()[4] == 8) {
		setTimeout(function () {
			location.href = "visualizarPerfilProfesor.html";
		}, 1500);
	} else {		
		setTimeout(function () {
			location.href = "listarProfesor.html";
		}, 1500);
	}
  }else{
    swal({
      title: "Modificación inválida",
      text: "Por favor complete todos los espacios obligatorios marcados en rojo.",
      buttons: {
        cancel: "Aceptar",
      },
    });
  }
}

//Elimina una certificación del profesor
function eliminarCertificacion(){
    let sltCertificacion = document.querySelector('#sltCertificacion');
    let infoProfesor = buscarProfesorPorId(getID());

    swal({
    title: "Eliminar certificación",
    text: "¿Está seguro que desea eliminar esta certificación?",
    buttons: ["Cancelar", "Aceptar"],
    }).then((willDelete) => {
      if (willDelete) {
        infoProfesor[25].splice(sltCertificacion.selectedIndex, 1);
        sltCertificacion.remove(sltCertificacion.selectedIndex);
        actualizarProfesor(infoProfesor);
        updateCertificaciones();
      }
    });
}

function irARegistro() {
  location.href = "registrarCertificacion.html";
}
