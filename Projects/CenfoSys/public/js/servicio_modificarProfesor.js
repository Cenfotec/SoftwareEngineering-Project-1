function actualizarProfesor(paInfoProfesor) {
  let listaProfesores = getListaProfesores();
  for (let i = 0; i < listaProfesores.length; i++) {
    if (listaProfesores[i][0] == paInfoProfesor[0]) {
      listaProfesores[i] = paInfoProfesor;
      localStorage.setItem('profesoresLS', JSON.stringify(listaProfesores));
      setUsuarios();
    }
  }
}

function getCertificaciones() {
  let listaCertificaciones = buscarProfesorPorId(getSession()[0])[25];
  if (listaCertificaciones == null) {
    listaCertificaciones = [];
  }
  return listaCertificaciones;
}

//Validación de campos del formulario
function validarRegistro(){
    let inputsRequeridos = document.querySelectorAll('[required]');
    let bError = false;

    for (let i = 0; i < inputsRequeridos.length; i++) {
        if(inputsRequeridos[i].value == ''){
            inputsRequeridos[i].classList.add('invalido');
            inputsRequeridos[i].classList.remove('input');
            bError = true;
        }else{
            inputsRequeridos[i].classList.remove('invalido');
            inputsRequeridos[i].classList.add('input')
        }
    }
    return bError;
}
