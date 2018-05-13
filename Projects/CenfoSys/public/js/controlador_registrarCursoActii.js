let botonRegistrar = document.querySelector("#btnRegistrar");

botonRegistrar.addEventListener("click", obtenerDatos);

function obtenerDatos() {
    let bError = validarRegistro();
    let bExiste = false;

    if (bError == false) {

        let sCodigo = document.querySelector("#txtCodigo").value;
        let sNombre = document.querySelector("#txtNombre").value;
        let sHoras = document.querySelector("#nHoras").value;
        let nCosto = document.querySelector("#nCosto").value;
        let sEstado = true;
        let sedesAsociadas = [];
        let profesorAsociado = [];
        let sFechaInicio = document.querySelector("#txtFechaInicio").value;
        let sFechaFin = document.querySelector("#txtFechaFin").value;

        bExiste = validarCodigo(sCodigo);

        if (!bExiste) {
            let infoCursos = [sCodigo, sNombre, sHoras, nCosto, sEstado, sedesAsociadas, profesorAsociado, sFechaInicio, sFechaFin];
            setListaCursosActii(infoCursos);
            swal({
              title: "Curso registrado",
              text: "Los datos del curso se registraron exitosamente.",
              buttons: {
                confirm: "Aceptar",
              },
            });
            setTimeout(function () {
              location.href = "listarCursosActii.html";
            }, 3000);
        } else {
          swal({
            title: "Registro inválido",
            text: "El curso que desea registrar ya existe.",
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
// esto limpia los inputs
function limpiar() {

    document.querySelector("#txtCodigo").value = "";
    document.querySelector("#txtNombre").value = "";
    document.querySelector("#nHoras").value = "";
    document.querySelector("#nCosto").value = "";
    document.querySelector("#txtFechaInicio").value = "";
    document.querySelector("#txtFechaFin").value = "";

}
// esto valida que no se repita el codigo
function validarCodigo(pCodigo) {
    let sCodigo = document.querySelector("#txtCodigo");
    let listaCursosActualizacion = getListaCursosActii();
    let bExiste = false;
    for (let i = 0; i < listaCursosActualizacion.length; i++) {


        if (listaCursosActualizacion[i][0] == pCodigo) {
            sCodigo.classList.add("invalido");
            bExiste = true;


        } else {
            sCodigo.classList.remove("invalido");

        }

    }
    return bExiste;
}
