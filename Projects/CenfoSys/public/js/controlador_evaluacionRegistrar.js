
let botonRegistrar = document.querySelector('#btnRegistrar').addEventListener('click', obtenerDatos);

// Esta funcion obtiene los datos del formulario
function obtenerDatos() {
    let bError = validar();

    if (bError == false) {
        let infoEvaluacion = [];

        let sID = document.querySelector('#txtID').value;
        let sNombre = buscarProfesorPorId(sID)[2];
        let sApellido = buscarProfesorPorId(sID)[4];
        let sFecha = document.querySelector('#txtFecha').value;
        let sPeriodo = document.querySelector('#sltPeriodo').value;
        let sCurso = document.querySelector('#txtCurso').value;
        let sNota = document.querySelector('#txtNota').value;
        let sObservaciones = document.querySelector('#txtObservaciones').value;

        if (validarID) {
          if (sNota >= 0 && sNota <= 100) {
            infoEvaluacion.push(sID, sNombre, sApellido, sFecha, sPeriodo, sCurso, sNota, sObservaciones);

            setEvaluacion(infoEvaluacion);
            // limpiar();
            swal({
              title: "Evaluación registrada",
              text: "La evaluación se ha registrado con éxito",
              icon: "success",
              button: "Aceptar",
            });
            setTimeout(function () {
              location.href = "listarProfesor.html";
            }, 1500);
          } else {
            swal({
                title: "Registro inválido",
                text: "La nota debe ser entre 1 y 100",
                icon: "warning",
                button: "Aceptar",
            });
            setTimeout(function () {
              location.href = "listarProfesor.html";
            }, 1500);
          }
        } else {
          swal({
              title: "Registro inválido",
              text: "La identificación no corresponde a ningún profesor",
              icon: "warning",
              button: "Aceptar",
          });
        }


    }else{
        swal({
            title: "Ocurrió un error al registrar.",
            text: "Revise los campos en rojo.",
            icon: "warning",
            button: "Aceptar",
        });
    }

}

// Esta funcion valida que los campos no esten vacios
function validar() {
    let bError = false;
    let camposRequeridos = document.querySelectorAll('[required]');
    let sPeriodo = document.querySelector('#sltPeriodo');

    for (let i = 0; i < camposRequeridos.length; i++) {
        if (camposRequeridos[i].value == '') {
            camposRequeridos[i].classList.remove('input');
            camposRequeridos[i].classList.add('invalido');
            sPeriodo.classList.remove('select');
            sPeriodo.classList.add('invalidoSlt');
            bError = true;
        } else {
            camposRequeridos[i].classList.remove('invalido');
            camposRequeridos[i].classList.add('input');
            sPeriodo.classList.remove('invalidoSlt');
            sPeriodo.classList.add('select');
        }
    }

    return bError;

}

// Esta funcion limpia el formulario
// function limpiar() {
//     document.querySelector('#txtID').value = '';
//     document.querySelector('#txtFecha').value = '';
//     document.querySelector('#sltPeriodo').value = '1';
//     document.querySelector('#txtNota').value = '';
//     document.querySelector('#txtProfesor').value = '';
//     document.querySelector('#txtCurso').value = '';
//     document.querySelector('#txtObservaciones').value = '';
// }

function validarID(pID) {
  let listaProfesores = getListaProfesores();
  for (let i = 0; i < listaProfesores.length; i++) {
    if (listaProfesores[i][0] == pID) {
      return true;
    }
  }
  return false;
}
