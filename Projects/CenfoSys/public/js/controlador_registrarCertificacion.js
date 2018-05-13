document.querySelector('#btnRegistrar').addEventListener('click', obtenerDatos);

//Obtención de datos del formulario
function obtenerDatos(){
    let bError = validarRegistro();
    let bExiste = false;
    if (!bError) {
      let sFecha = document.querySelector('#txtFecha').value;
      let sCertificacion = document.querySelector('#txtCertificacion').value;
      let sCodigo = document.querySelector('#txtCodigo').value;

      bExiste = validarCodigo(sCodigo);

      if (!bExiste) {
        let certArr = [sFecha, sCertificacion, sCodigo];
        let listaProfesores = buscarProfesorPorId(getID());
        listaProfesores[25].push(certArr);
        actualizarProfesor(listaProfesores);
        swal({
          title: "Certificación registrada",
          text: "Los datos de la certificación se registraron exitosamente.",
          buttons: {
            confirm: "Aceptar",
          },
        });
        limpiar();
        setTimeout(function () {
          location.href = "listarProfesor.html";
        }, 1500);
      }else{
        swal({
          title: "Registro inválido",
          text: "La certificación que desea registrar ya existe.",
          buttons: {
            cancel: "Aceptar",
          },
        });
      }
    }else{
      swal({
        title: "Registro inválido",
        text: "Por favor complete todos los espacios obligatorios marcados en rojo.",
        buttons: {
          cancel: "Aceptar",
        },
      });
    }
}

//Valida si existe una certificacion con un número de código igual
function validarCodigo(pCodigo){
    let sCodigo = document.querySelector('#txtCodigo');
    let listaProfesores = getListaProfesores();
    let bExiste = false;

    for (let i = 0; i < listaProfesores.length; i++) {
      for (let j = 0; j < listaProfesores[i][25].length; j++) {
        if (listaProfesores[i][25][j][2] == pCodigo) {
          sCodigo.classList.add('errorInput');
          bExiste = true;
        }else{
          sCodigo.classList.remove('errorInput');
        }
      }
    }
    return bExiste;
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

//Limpieza de campos del formulario
function limpiar(){
    let inputs = document.querySelectorAll('form input');
    let selectors = document.querySelectorAll('form select');
    setTimeout("location.reload()", 1500);
}
