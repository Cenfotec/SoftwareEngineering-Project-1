//Llamada de función
document.querySelector('#btnRegistrar').addEventListener('click', obtenerDatos);
document.querySelector('#sltProvincia').addEventListener('change', llenarCanton);
document.querySelector('#sltCanton').addEventListener('change', llenarDistrito);

//Obtención de datos del formulario
function obtenerDatos(){
    let bError = validarRegistro();
    let bExiste = false;
    if (!bError) {
        let aInfoProfesor = [];

        let sNIdentificacion = document.querySelector('#txtNIdentificacion').value;
        let sltTipoCedula = document.querySelector('#sltTipoCedula').value;

        let sPNombre = document.querySelector('#txtPNombre').value;
        let sSNombre = document.querySelector('#txtSNombre').value;
        let sPApellido = document.querySelector('#txtPApellido').value;
        let sSApellido = document.querySelector('#txtSApellido').value;

        let sCorreoP = document.querySelector('#txtCorreoP').value;
        let sCorreoS = document.querySelector('#txtCorreoS').value;

        let sTelefonoP = document.querySelector('#txtTelefonoP').value;
        let stelefonoS = document.querySelector('#txtTelefonoS').value;


        let sContactoEmergencia = document.querySelector('#txtContactoEmergencia').value;
        // FOTOGRAFIA

        let sltProvincia = document.querySelector('#sltProvincia').value;
        let sltCanton = document.querySelector('#sltCanton').value;
        let sltDistrito = document.querySelector('#sltDistrito').value;

        let sDireccionExacta = document.querySelector('#txtDireccionExacta').value;
        let sLugarTrabajo = document.querySelector('#txtLugarTrabajo').value;
        let sAnosExperienciaLaboral = document.querySelector('#txtAnosExperienciaLaboral').value;
        let sAnosExperienciaDocente = document.querySelector('#txtAnosExperienciaDocenteUniversitario').value;

        let sltCapacitacionVirtual = document.querySelector('#sltCapacitacionVirtual').value;
        let sltCapacitacionDocente = document.querySelector('#sltCapacitacionDocente').value;
        let sltNivelIngles = document.querySelector('#sltNivelIngles').value;
        let sltGradoAcademico = document.querySelector('#sltGradoAcademico').value;

        let sEnfermedades = document.querySelector('#txtEnfermedades').value;
        let sObservacionesGenerales = document.querySelector('#txtObservaciones').value;

        let sContrasenna = generarContrasenna();
        let sEstado = true;
        let sFotografia = getTempFotografiaPeril();

        bExiste = validarProfesor(sNIdentificacion);

        if (!bExiste) {
          if (sNIdentificacion.length == 9 || sNIdentificacion.length == 10) {
            let bCorreoP = validarCorreo(sCorreoP);
            if (sCorreoS != '') {
              let bCorreoS = validarCorreo(sCorreoS)
              if (bCorreoP && bCorreoS) {
                aInfoProfesor.push(sNIdentificacion, sltTipoCedula, sPNombre, sSNombre, sPApellido, sSApellido, sCorreoP, sCorreoS, sTelefonoP, stelefonoS, sContactoEmergencia, sltProvincia, sltCanton, sltDistrito, sDireccionExacta, sLugarTrabajo, sAnosExperienciaLaboral, sAnosExperienciaDocente, sltCapacitacionVirtual, sltCapacitacionDocente, sltNivelIngles, sltGradoAcademico, sEnfermedades, sObservacionesGenerales, [[], [], [], [], [], []], [], [[], []], [], [], sContrasenna, sEstado, sFotografia);
                setListaProfesores(aInfoProfesor);
                swal({
                  title: "Profesor registrado",
                  text: "Los datos del profesor se registraron exitosamente. La contraseña temporal del usuario es: " + sContrasenna,
                  buttons: {
                    confirm: "Aceptar",
                  },
                });
                // limpiar();
                setTimeout(function () {
                  location.href = "listarProfesor.html";
                }, 5000);
              }else{
                swal({
                  title: "Registro inválido",
                  text: "El correo que ingresó es inválido.",
                  buttons: {
                    cancel: "Aceptar",
                  },
                });
              }
            } else {
              if (bCorreoP) {
                aInfoProfesor.push(sNIdentificacion, sltTipoCedula, sPNombre, sSNombre, sPApellido, sSApellido, sCorreoP, sCorreoS, sTelefonoP, stelefonoS, sContactoEmergencia, sltProvincia, sltCanton, sltDistrito, sDireccionExacta, sLugarTrabajo, sAnosExperienciaLaboral, sAnosExperienciaDocente, sltCapacitacionVirtual, sltCapacitacionDocente, sltNivelIngles, sltGradoAcademico, sEnfermedades, sObservacionesGenerales, [[], [], [], [], [], []], [], [[], []], [], [], sContrasenna, sEstado, sFotografia);
                setListaProfesores(aInfoProfesor);
                swal({
                  title: "Profesor registrado",
                  text: "Los datos del profesor se registraron exitosamente. La contraseña temporal del usuario es: " + sContrasenna,
                  buttons: {
                    confirm: "Aceptar",
                  },
                });
                // limpiar();
                setTimeout(function () {
                  location.href = "listarProfesor.html";
                }, 5000);
              }else{
                swal({
                  title: "Registro inválido",
                  text: "El correo que ingresó es inválido.",
                  buttons: {
                    cancel: "Aceptar",
                  },
                });
              }
            }
          }else{
            swal({
              title: "Registro inválido",
              text: "La identificación que ingresó es inválida.",
              buttons: {
                cancel: "Aceptar",
              },
            });
          }
        }else{
          swal({
            title: "Registro inválido",
            text: "La identificación o correo electronico que ingresó pertenece a un usuario existente.",
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

//Valida si existe un funcionario con un número de identificación igual
function validarProfesor(pId, pCorreo){
    let sNIdentificacion = document.querySelector('#txtNIdentificacion');
    let sCorreo = document.querySelector('#txtCorreo');
    let listaUsuarios = getUsuarios();
    let bExiste = false;

    for (let i = 0; i < listaUsuarios.length; i++) {
        if (listaUsuarios[i][0] == pId || listaUsuarios[i][5] == pCorreo) {
          bExiste = true;
          if (listaUsuarios[i][0] == pId) {
            sNIdentificacion.classList.add('invalido');
          } else {
            sCorreo.classList.add('invalido');
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
            bError = true;
        }else{
            inputsRequeridos[i].classList.remove('invalido');
        }
    }
    return bError;
}

//Limpieza de campos del formulario
// function limpiar(){
//     let inputs = document.querySelectorAll('form input');
//     let selectors = document.querySelectorAll('form select');
//     for (let i = 0; i < inputs.length; i++) {
//         inputs[i].value = '';
//     }
//     for (let i = 0; i < selectors.length; i++) {
//         selectors[i].selectedIndex = 0;
//     }
//     setTimeout("location.reload()", 1500);
// }

//Se genera una contraseña de forma aleatoria.
function generarContrasenna(){
    let longitud = 4;//No es necesario que sea de 8 o 16 ya que es temporal; cuando se modifque la contraseña, si se le va a exigir al usuario una de 8 o más caractéres.
    let caracteres = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789";
    let contrasenna = "";

    for (let i = 0; i < longitud; i++) {
        contrasenna += caracteres.charAt(Math.floor(Math.random()*caracteres.length));
    }
    return contrasenna;
}

function validarCorreo(paCorreo) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(paCorreo.toLowerCase()));
}
