//Llamada de función
document.querySelector('#btnLogout').addEventListener('click', logout);
document.querySelector('#btnEvaluar').addEventListener('click', obtenerDatos);
let hotel = getHotel()[0];
document.querySelector('#imgHotel').src = 'http://res.cloudinary.com/pbonillag/image/upload/' + hotel['fotografia'] + '.png';
document.querySelector('#lblNombre').innerHTML = 'Hotel ' + hotel['nombre'];

//Obtención de datos del formulario
function obtenerDatos() {
    let bError = validarRegistro();
    if (!bError) {
        let hotelEvaluacion = [];
        let evaluacion = obtenerListaEvaluaciones();

        let sCedula = getSession()[0];
        let sComidaRating = document.querySelector('#txtComidaRating').value;
        let sServicioRating = document.querySelector('#txtServicioRating').value;
        let sHabitacionRating = document.querySelector('#txtHabitacionRating').value;
        let sInfraestructuraRating = document.querySelector('#txtInfraestructuraRating').value;
        let sLimpiezaRating = document.querySelector('#txtLimpiezaRating').value;

        if (validarEvaluacion(sComidaRating) && validarEvaluacion(sServicioRating) &&
            validarEvaluacion(sHabitacionRating) && validarEvaluacion(sInfraestructuraRating) && validarEvaluacion(sLimpiezaRating)) {
              hotelEvaluacion.push(hotel['nombre'], sCedula, sComidaRating, sServicioRating, sHabitacionRating, sInfraestructuraRating, sLimpiezaRating);
              let noEsta = false;
              for (let i = 0; i < evaluacion.length; i++) {
                if (evaluacion[i]['hotel'] == hotel['nombre'] && evaluacion[i]['cliente'] == sCedula) {

                  evaluacion[i]['hotel'] = hotel['nombre'];
                  evaluacion[i]['cliente'] = sCedula;
                  evaluacion[i]['comida'] = sComidaRating;
                  evaluacion[i]['servicio'] = sServicioRating;
                  evaluacion[i]['habitacion'] = sHabitacionRating;
                  evaluacion[i]['infraestructura'] = sInfraestructuraRating;
                  evaluacion[i]['limpieza'] = sLimpiezaRating;

                  noEsta = true;
                  actualizarEvaluacion(evaluacion[i]);
                  swal({
                    title: "Evaluación actualizada",
                    text: "La evaluación ha sido actualizada exitosamente.",
                    buttons: {
                      confirm: "Aceptar",
                    },
                  });
                }
              }
              if (!noEsta) {
                guardarEvaluacion(hotelEvaluacion);
                swal({
                  title: "Evaluación regitrada",
                  text: "La evaluación ha sido registrada exitosamente.",
                  buttons: {
                    confirm: "Aceptar",
                  },
                });
              }
              setTimeout(function () {
                location.href = "panelControl_cliente.html";
              }, 3000);
        } else {
          swal({
            title: "Evaluación inválida",
            text: "La evalución tiene que ser entre 1 y 5.",
            buttons: {
              cancel: "Aceptar",
            },
          });
        }
    } else {
      swal({
        title: "Evaluación inválida",
        text: "Por favor complete todos los espacios obligatorios marcados en rojo.",
        buttons: {
          cancel: "Aceptar",
        },
      });
    }
}

// Validar el registro
function validarRegistro() {
    let inputsRequeridos = document.querySelectorAll('[required]');
    let bError = false;

    for (let i = 0; i < inputsRequeridos.length; i++) {
        if (inputsRequeridos[i].value == '') {
            inputsRequeridos[i].classList.add('invalido');
            bError = true;
        } else {
            inputsRequeridos[i].classList.remove('invalido');
        }
    }
    return bError;
}

// Validar la evaluación
function validarEvaluacion(pEvaluacion) {
  if (pEvaluacion >= 0 && pEvaluacion <= 5) {
    return true;
  } else {
    return false;
  }
}
