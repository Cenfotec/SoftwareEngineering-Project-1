//Llamada de función
editarDatos();
let botonActualizar = document.querySelector('#btnActualizar');
botonActualizar.addEventListener('click', obtenerDatosActualizar);

//Se obtienen los datos del funcionario a actualizar
function editarDatos(){
    let funcionario = getFuncionario();
    mostrarRoles(funcionario[7]);

    document.querySelector('#txtNIdentificacion').disabled = true;

    document.querySelector('#txtNIdentificacion').value = funcionario[0];
    document.querySelector('#txtPNombre').value = funcionario[1];
    document.querySelector('#txtSNombre').value = funcionario[2];
    document.querySelector('#txtPApellido').value = funcionario[3];
    document.querySelector('#txtSApellido').value = funcionario[4];
    document.querySelector('#txtTelefono').value = funcionario[5];
    document.querySelector('#txtCorreo').value = funcionario[6];
    document.querySelector('#sltRol').value = funcionario[7];
}

//Se listan los roles y se valida el rol administrador
function mostrarRoles(pRol){
    let selectRoles = document.querySelector('#sltRol');
    let listaRoles = ["Gerencia", "Rectoría", "Decanatura", "Asist. Decanatura", "Registro", "Mercadeo", "Administrador"];
    let tamArreglo = listaRoles.length;

    if (pRol != "Administrador") {
        tamArreglo = listaRoles.length - 1;
    }else{
        document.querySelector('#sltRol').disabled = true;
    }

    for(let i = 0; i < tamArreglo; i++){
        let nuevaOpcion = new Option(listaRoles[i]);
        nuevaOpcion.value = listaRoles[i];

        selectRoles.options.add(nuevaOpcion);
    }
}

//Obtención de datos del formulario para actualizar
function obtenerDatosActualizar(){
    let funcionario = getFuncionario();
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
        let sRol = document.querySelector('#sltRol').value;
        let sContrasenna = funcionario[8];
        let sEstado = funcionario[9];


        aInfoFuncionario.push(sNIdentificacion, sPNombre, sSNombre, sPApellido, sSApellido, sTelefono, sCorreo, sRol, sContrasenna, sEstado);
        actualizarFuncionario(aInfoFuncionario);
        swal({
          title: "Funcionario actualizado",
          text: "Los datos del funcionario se actualizaron exitosamente.",
          buttons: {
            confirm: "Aceptar",
          },
        });
        setTimeout(function () {
            location.href = "listarFuncionarios.html";
        }, 1500);

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
            inputsRequeridos[i].classList.add('input');
        }
    }
    return bError;
}
