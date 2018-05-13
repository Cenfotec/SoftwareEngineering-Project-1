//Llamada de función
document.querySelector('#btnRegistrar').addEventListener('click', obtenerDatos);

//Obtención de datos del formulario
function obtenerDatos() {
    let bError = validarRegistro();
    let bExiste = false;
    if (!bError) {
        let aInfoUsuario = [];

        let sCedula = document.querySelector('#txtCedula').value;
        let sPNombre = document.querySelector('#txtPNombre').value;
        let sSNombre = document.querySelector('#txtSNombre').value;
        let sPApellido = document.querySelector('#txtPApellido').value;
        let sSApellido = document.querySelector('#txtSApellido').value;
        let sEdad = document.querySelector('#txtEdad').value;
        let sTelefono = document.querySelector('#txtTelefono').value;
        let sCorreo = document.querySelector('#txtCorreo').value;
        let sContrasenna = document.querySelector('#txtPassword').value;
        let sEstado = true;

        bExiste = validarUsuario(sCedula, sCorreo);

        if (!bExiste) {

            if (sCedula.length == 9 || sCedula.length == 10) {
                let bCorreo = validarCorreo(sCorreo);
                if (sCorreo != '') {
                    if (bCorreo) {
                      let bEdad = validarEdad(sEdad);
                      if (bEdad) {
                        aInfoUsuario.push(sCedula, sPNombre, sSNombre, sPApellido, sSApellido, sEdad, sTelefono, sCorreo, 'Cliente', sContrasenna, sEstado, []);
                        // setListaUsuarios(aInfoUsuario);
                        guardarUsuario(aInfoUsuario);
                        swal({
                          title: "Usuario registrado",
                          text: "Su cuenta ha sido registrada exitosamente.",
                          buttons: {
                            confirm: "Aceptar",
                          },
                        });
                        setTimeout(function () {
                          location.href = "iniciarSesion.html";
                        }, 3000);
                      } else {
                        swal({
                          title: "Registro inválido",
                          text: "Tiene que ser mayor de 18 años para registrarse.",
                          buttons: {
                            cancel: "Aceptar",
                          },
                        });
                      }
                    } else {
                      swal({
                        title: "Registro inválido",
                        text: "El correo que ingresó es inválido.",
                        buttons: {
                          cancel: "Aceptar",
                        },
                      });
                    }
                }
            } else {
              swal({
                title: "Registro inválido",
                text: "La cédula que ingresó es inválida.",
                buttons: {
                  cancel: "Aceptar",
                },
              });
            }
        } else {
          swal({
            title: "Registro inválido",
            text: "La cédula o correo electronico que ingresó pertenece a un usuario existente.",
            buttons: {
              cancel: "Aceptar",
            },
          });
        }
    } else {
      swal({
        title: "Registro inválido",
        text: "Por favor complete todos los espacios obligatorios marcados en rojo.",
        buttons: {
          cancel: "Aceptar",
        },
      });
    }
}

// Función que valida si la cédula o correo ya están en uso por otro usuario existente.
function validarUsuario(pID, pCorreo) {
    let sCedula = document.querySelector('#txtCedula');
    let sCorreo = document.querySelector('#txtCorreo');
    // let listaUsuarios = getListaUsuarios();
    let listaUsuarios = obtenerListaUsuarios();
    let bExiste = false;

    for (let i = 0; i < listaUsuarios.length; i++) {
        if (listaUsuarios[i]['cedula'] == pID || listaUsuarios[i]['correo'] == pCorreo) {
            bExiste = true;
            if (listaUsuarios[i]['cedula'] == pID) {
                sCedula.classList.add('invalido');
            } else {
                sCorreo.classList.add('invalido');
            }
        }
    }
    return bExiste;
}

// Función que valida si hay campos requeridos sin llenar.
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

// Función que valida si el correo tiene formato de correo.
function validarCorreo(pCorreo) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(pCorreo.toLowerCase()));
}

// Función que valida que el usuario regitrado sea mayor de 18 años de edad
function validarEdad(pEdad) {
  if (pEdad => 18) {
    return true;
  } else {
    return false;
  }
}
