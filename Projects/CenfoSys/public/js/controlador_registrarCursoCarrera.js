let botonRegistrar = document.querySelector("#btnRegistrar");

botonRegistrar.addEventListener("click", obtenerDatos);

function obtenerDatos() {
    let bExiste = false;
    let bError = validarRegistro();

    if (bError == false) {


        let sCodigo = document.querySelector("#txtCodigo").value;
        let sNombre = document.querySelector("#txtNombre").value;
        let sCreditos = document.querySelector("#txtCreditos").value;
        let sHoras = document.querySelector('#nHoras').value;
        let sCosto = document.querySelector("#nCosto").value;
        let sEstado = true;
        let sedeAsociada = [];
        let profesorAsociado=[];

        bExiste = validarCodigos(sCodigo);
        if (!bExiste) {
            let infoCursos = [sCodigo, sNombre, sCreditos, sHoras, sCosto, sEstado, sedeAsociada, profesorAsociado];
            setListaCursos(infoCursos);
            swal({
              title: "Curso registrado",
              text: "Los datos del curso se registraron exitosamente.",
              buttons: {
                confirm: "Aceptar",
              },
            });
            setTimeout(function () {
              location.href = "listarCursoCarrera.html";
            }, 1500);
        } else {
          swal({
            title: "Registro inválido",
            text: "Por favor complete todos los espacios obligatorios marcados en rojo.",
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
function limpiar() {

    document.querySelector('#txtCodigo').value = '';
    document.querySelector('#txtNombre').value = '';
    document.querySelector('#txtCreditos').value = '';
    document.querySelector('#nHoras').value = '';
    document.querySelector('#nCosto').value = '';
}
function validarCodigos(pCodigo) {
    let sCodigo = document.querySelector("#txtCodigo");
    let listaCursos = getListaCursos();
    let bExiste = false;

    for (let i = 0; i < listaCursos.length; i++) {
        if (listaCursos[i][0] == pCodigo) {
            bExiste = true;
            sCodigo.classList.add("invalido");
            sCodigo.classList.remove("input");

        }

        return bExiste;
    }


}
