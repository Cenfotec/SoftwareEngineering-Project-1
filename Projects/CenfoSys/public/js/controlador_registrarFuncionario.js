//Llamada de función
document.querySelector('#btnRegistrar').addEventListener('click', obtenerDatos);
mostrarRoles();

//Obtención de datos del formulario
function obtenerDatos() {
    let bError = validarRegistro();
    let bExiste = false;
    if (!bError) {
        let aInfoFuncionario = [];

        let sNIdentificacion = document.querySelector('#txtNIdentificacion').value;
        let sPNombre = document.querySelector('#txtPNombre').value;
        let sSNombre = document.querySelector('#txtSNombre').value;
        let sPApellido = document.querySelector('#txtPApellido').value;
        let sSApellido = document.querySelector('#txtSApellido').value;
        let sTelefono = document.querySelector('#txtTelefono').value;
        let sCorreo = document.querySelector('#txtCorreo').value;
        let sRol = document.querySelector('#sltRol').value;
        let sContrasenna = generarContrasenna();
        let sEstado = true;

        bExiste = validarFuncionario(sNIdentificacion, sCorreo);

        if (!bExiste) {

            if (sNIdentificacion.length == 9 || sNIdentificacion.length == 10) {
                let bCorreo = validarCorreo(sCorreo);
                if (sCorreo != '') {
                    if (bCorreo) {
                        aInfoFuncionario.push(sNIdentificacion, sPNombre, sSNombre, sPApellido, sSApellido, sTelefono, sCorreo, sRol, sContrasenna, sEstado);
                        // limpiar();
                        setListaFuncionarios(aInfoFuncionario);
                        swal({
                          title: "Funcionario registrado",
                          text: "Los datos del funcionario se registraron exitosamente. La contraseña temporal del usuario es: " + sContrasenna,
                          buttons: {
                            confirm: "Aceptar",
                          },
                        });
                        setTimeout(function () {
                          location.href = "listarFuncionarios.html";
                        }, 5000);
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
                text: "La identificación que ingresó es inválida.",
                buttons: {
                  cancel: "Aceptar",
                },
              });
            }
        } else {
          swal({
            title: "Registro inválido",
            text: "La identificación o correo electronico que ingresó pertenece a un usuario existente.",
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

//Se listan los roles y se valida el rol administrador
function mostrarRoles() {
    let selectRoles = document.querySelector('#sltRol');
    let listaRoles = ["Gerencia", "Rectoría", "Decanatura", "Asist. Decanatura", "Registro", "Mercadeo", "Administrador"];
    let tamArreglo = listaRoles.length;
    let listaFuncionarios = getListaFuncionarios();

    for (let i = 0; i < listaFuncionarios.length; i++) {
        if (listaFuncionarios[i][7] == "Administrador") {
            tamArreglo = listaRoles.length - 1;
        }
    }

    for (let i = 0; i < tamArreglo; i++) {
        let nuevaOpcion = new Option(listaRoles[i]);
        nuevaOpcion.value = listaRoles[i];

        selectRoles.options.add(nuevaOpcion);
    }
}

//Valida si existe un funcionario con un número de identificación o correo electrónico igual
function validarFuncionario(pId, pCorreo) {
    let sNIdentificacion = document.querySelector('#txtNIdentificacion');
    let sCorreo = document.querySelector('#txtCorreo');
    let listaUsuarios = getUsuarios();
    let bExiste = false;

    for (let i = 0; i < listaUsuarios.length; i++) {
        if (listaUsuarios[i][0] == pId || listaUsuarios[i][6] == pCorreo) {
            bExiste = true;
            if (listaUsuarios[i][0] == pId) {
                sNIdentificacion.classList.add('invalido');
                sNIdentificacion.classList.remove('input');
            } else {
                sCorreo.classList.add('invalido');
                sCorreo.classList.remove('input');
            }
        }
    }
    return bExiste;
}

//Validación de campos del formulario
function validarRegistro() {
    let inputsRequeridos = document.querySelectorAll('[required]');
    let bError = false;

    for (let i = 0; i < inputsRequeridos.length; i++) {
        if (inputsRequeridos[i].value == '') {
            inputsRequeridos[i].classList.add('invalido');
            inputsRequeridos[i].classList.remove('input');
            bError = true;
        } else {
            inputsRequeridos[i].classList.remove('invalido');
            inputsRequeridos[i].classList.add('input');
        }
    }
    return bError;
}

//Limpieza de campos del formulario
// function limpiar() {
//     let inputs = document.querySelectorAll('form input');
//     let selectors = document.querySelectorAll('form select');
//     for (let i = 0; i < inputs.length; i++) {
//         inputs[i].value = '';
//     }
//     for (let i = 0; i < selectors.length; i++) {
//         selectors[i].selectedIndex = 0;
//     }
//     setTimeout("location.reload()", 2500);
// }

//Se genera una contraseña de forma aleatoria.
function generarContrasenna() {
    let longitud = 4;//No es necesario que sea de 8 o 16 ya que es temporal; cuando se modifque la contraseña, si se le va a exigir al usuario una de 8 o más caractéres.
    let caracteres = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ012346789";
    let contrasenna = "";

    for (let i = 0; i < longitud; i++) {
        contrasenna += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return contrasenna;
}

function validarCorreo(pCorreo) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(pCorreo.toLowerCase()));
}
