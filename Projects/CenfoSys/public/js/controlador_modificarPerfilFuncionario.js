//Llamada de función
mostrarDatos();
let botonActualizar = document.querySelector('#btnActualizar');
botonActualizar.addEventListener('click', obtenerDatosActualizar);

//Se obtienen los datos del funcionario a actualizar
function mostrarDatos() {
    let idFuncionario = getSession()[0];
    let funcionario = buscarFuncionarioPorId(idFuncionario);
    mostrarRoles(funcionario[7]);

    document.querySelector('#txtNIdentificacion').disabled = true;
    document.querySelector('#sltRol').disabled = true;

    document.querySelector('#txtNIdentificacion').value = funcionario[0];
    document.querySelector('#txtPNombre').value = funcionario[1];
    document.querySelector('#txtSNombre').value = funcionario[2];
    document.querySelector('#txtPApellido').value = funcionario[3];
    document.querySelector('#txtSApellido').value = funcionario[4];
    document.querySelector('#txtTelefono').value = funcionario[5];
    document.querySelector('#txtCorreo').value = funcionario[6];
    document.querySelector('#sltRol').value = funcionario[7];

    let txtContrasenna = document.querySelector('#txtContrasenna');
    let txtConfContrasenna = document.querySelector('#txtConfContrasenna');

    if (getSession()[1].length == 4) {
      txtContrasenna.setAttribute('required', 'true');
      txtConfContrasenna.setAttribute('required', 'true');
    }
}


//Se listan los roles
function mostrarRoles(pRol){
    let selectRoles = document.querySelector('#sltRol');
    let listaRoles = ["Gerencia", "Rectoría", "Decanatura", "Asist. Decanatura", "Registro", "Mercadeo", "Administrador"];
    let tamArreglo = listaRoles.length;

    for(let i = 0; i < tamArreglo; i++){
        let nuevaOpcion = new Option(listaRoles[i]);
        nuevaOpcion.value = listaRoles[i];

        selectRoles.options.add(nuevaOpcion);
    }
}

//Obtención de datos del formulario para actualizar
function obtenerDatosActualizar() {
    let idFuncionario = getSession()[0];
    let funcionario = buscarFuncionarioPorId(idFuncionario);
    let bError = validarRegistro();
    if (!bError) {
        let aInfoFuncionario = [];

        let sNIdentificacion = document.querySelector('#txtNIdentificacion').value;
        let sPNombre = document.querySelector('#txtPNombre').value;
        let sSNombre = document.querySelector('#txtSNombre').value;
        let sPApellido = document.querySelector('#txtPApellido').value;
        let sSApellido = document.querySelector('#txtSApellido').value;
        let sTelefono = document.querySelector('#txtTelefono').value;
        let sCorreo = document.querySelector('#txtCorreo').value;
        let sContrasennaProbar = document.querySelector('#txtContrasenna').value;
        let sConfContrasenna = document.querySelector('#txtConfContrasenna').value;
        let sRol = document.querySelector('#sltRol').value;
        let sContrasenna = funcionario[8];
        let sEstado = funcionario[9];

        if (sConfContrasenna != '') {
            if (validarContrasenna(sContrasennaProbar, sConfContrasenna)) {
                sContrasenna = sContrasennaProbar;
            } else {
              swal({
                title: "Modificación inválida",
                text: "La contraseña debe ser mínimo de 8 caracteres, tener 1 mayúscula, 1 número y 1 símbolo",
                buttons: {
                  cancel: "Aceptar",
                },
              });
              return;
            }
        }


        aInfoFuncionario.push(sNIdentificacion, sPNombre, sSNombre, sPApellido, sSApellido, sTelefono, sCorreo, sRol, sContrasenna, sEstado);
        actualizarFuncionario(aInfoFuncionario);
        //Tambien se deben actualizar los datos de la sesión en la que está
        swal({
          title: "Perfil actualizado",
          text: "Sus datos se actualizaron exitosamente.",
          buttons: {
            confirm: "Aceptar",
          },
        });
        setTimeout(function () {
            location.href = "visualizarPerfilFuncionario.html";//-->>Poner pagina a la que debería redireccionarse
        }, 1500);

    } else {
      swal({
        title: "Modificación inválida",
        text: "Por favor complete todos los espacios obligatorios marcados en rojo.",
        buttons: {
          cancel: "Aceptar",
        },
      });
    }
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
//Validación de contraseña
let txtContrasenna = document.querySelector('#txtContrasenna');
let txtConfContrasenna = document.querySelector('#txtConfContrasenna');

function validarContrasenna(pContrasenna, pConfContrasenna) {
    let bAprobada = false;
    let bMin = false, bMay = false, bNum = false, bChar = false;
    let letrasMinusculas = "abcdefghijklmnñopqrstuvwxyz";
    let letrasMayusculas = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    let numeros = "0123456789";
    let caracteres = "@|°¬¡!¿?\\\"#$%&/()='*-+.~{}[]<>_";

    let passwordArray = pContrasenna.split('');

    if (pContrasenna == pConfContrasenna && pContrasenna.length >= 8 && pContrasenna.length <= 64) {
        for (let i = 0; i < letrasMinusculas.length; i++) {
            if (passwordArray.includes(letrasMinusculas[i])) {
                bMin = true;
            }
        }
        for (let j = 0; j < letrasMayusculas.length; j++) {
            if (passwordArray.includes(letrasMayusculas[j])) {
                bMay = true;
            }
        }
        for (let k = 0; k < numeros.length; k++) {
            if (passwordArray.includes(numeros[k])) {
                bNum = true;
            }
        }
        for (let l = 0; l < caracteres.length; l++) {
            if (passwordArray.includes(caracteres[l])) {
                bChar = true;
            }
        }
        if (bMin && bMay && bNum && bChar) {
            bAprobada = true;
        }
    }
    return bAprobada

}

txtContrasenna.addEventListener('keyup', verificarContrasenna);

//Verificación de input
function verificarContrasenna() {
    if (txtContrasenna.value != '') {
        txtConfContrasenna.setAttribute('required', 'true');
    } else {
        txtConfContrasenna.removeAttribute('required', 'false');
    }
}
