let botonRegistrar = document.querySelector('#btnRegistrar');
botonRegistrar.addEventListener('click', obtenerDatos);

//Obtiene los datos de la sede y los guarda dentro de una lista y ejecuta las verificaciones
function obtenerDatos() {
    let bError = validar();
    let bExiste = false;

    if (bError == false) {
        let listaCarrera = [];

        let sCodigo = document.querySelector('#txtCodigo').value;
        let sNombreCarrera = document.querySelector('#txtNombreCarrera').value;
        let sGradoAcademico = document.querySelector('#sltGradoAcademico').value;
        let nCreditos = document.querySelector('#nCreditos').value;
        let sVersion = document.querySelector('#txtVersion').value;
        let sEstado = true;
        let cursosAsociados = [];
        let sedesAsociadas = [];

        let sAcreditacion = document.querySelector('#txtAcreditacion');

        if (sAcreditacion.checked) {
            sAcreditacion = 'Acreditada';
        } else {
            sAcreditacion = 'No acreditada';
        }

        bExiste = validarCarrera(sCodigo);


        if (bExiste == false) {
            listaCarrera.push(sCodigo, sNombreCarrera, sGradoAcademico, nCreditos, sVersion, sAcreditacion, sEstado, cursosAsociados, sedesAsociadas);
            setListaCarrera(listaCarrera);
            swal({
              title: "Carrera registrada",
              text: "Los datos de la carrera se registraron exitosamente.",
              buttons: {
                confirm: "Aceptar",
              },
            });
            setTimeout(function () {
              window.location.href = 'listarCarreras.html';
            }, 1500);        
        } else {
          swal({
            title: "Registro inválido",
            text: "La carrera que desea registrar ya existe.",
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
//Limpia los inputs
function limpiar() {
    document.querySelector('#txtCodigo').value = '';
    document.querySelector('#txtNombreCarrera').value = '';
    document.querySelector('#sltGradoAcademico').selectedIndex = 0;
    document.querySelector('#nCreditos').value = '';
    document.querySelector('#txtVersion').value = '';
    document.querySelector('#txtAcreditacion').checked = false;
}
//revisa que todos los input esten rellenos
function validar() {
    let bError = false;
    let camposRequeridos = document.querySelectorAll('[required]');

    for (let i = 0; i < camposRequeridos.length; i++) {
        if (camposRequeridos[i].value == '') {
            camposRequeridos[i].classList.remove('input');
            camposRequeridos[i].classList.add('invalido');
            bError = true;
        } else {
            camposRequeridos[i].classList.remove('invalido');
            camposRequeridos[i].classList.add('input');
        }
    }

    return bError;
}
//valida que el codigo ingresado no este registrado previamente
function validarCarrera(pCodigo) {
    let sCodigo = document.querySelector('#txtCodigo');
    let listaCarreras = getListaCarrera();
    let bExiste = false;

    for (let i = 0; i < listaCarreras.length; i++) {
        if (listaCarreras[i][0] == pCodigo) {
            sCodigo.classList.remove('input');
            sCodigo.classList.add('invalido');
            bExiste = true;
        }
    }
    return bExiste;
}

document.querySelector('.spanCheckbox').addEventListener('click', checkboxAcrediata);
let checkboxEsAcrediata = document.querySelector('#txtAcreditacion');

function checkboxAcrediata() {
  if (checkboxEsAcrediata.checked) {
    checkboxEsAcrediata.checked = false;
    return;
  }
  if (!checkboxEsAcrediata.checked) {
    checkboxEsAcrediata.checked = true;
    return;
  }
}
