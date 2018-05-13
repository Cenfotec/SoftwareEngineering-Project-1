mostrarDatos();
document.querySelector('#btnActualizar').addEventListener('click', obtenerDatosActualizados);
document.querySelector('#checkboxMostrarMapa').addEventListener('click', mostrarMapa);
document.querySelector('#sltProvincia').addEventListener('change', llenarCanton);
document.querySelector('#sltCanton').addEventListener('change', llenarDistrito);

//Muestra los datos de la sede en sus respectivos inputs
function mostrarDatos() {

    let listaSede = getSede();

    document.querySelector('#txtNombreSede').value = listaSede[0];
    document.querySelector('#txtNombreSede').disabled = true;
    document.querySelector('#sltTipoSede').value = listaSede[1];
    document.querySelector('#sltProvincia').options[0].text = listaSede[2];
    document.querySelector('#sltCanton').options[0].text = listaSede[3];
    document.querySelector('#sltDistrito').options[0].text = listaSede[4];
    document.querySelector('#txtDireccion').value = listaSede[5];
    checkboxMapa = document.querySelector('#checkboxMostrarMapa').value = listaSede[7];

    if (checkboxMapa == true) {
        document.querySelector('#checkboxMostrarMapa').checked = true;
        document.querySelector('#mapaSede').classList.remove('ocultar');
    } 

    let sProvincia = document.querySelector('#sltProvincia');
    for (let i = 1; i < sProvincia.length; i++) {
        if (sProvincia.options[i].value == listaSede[2]) {
            sProvincia.selectedIndex = i;
        }
    }
    llenarCanton();
    let sCanton = document.querySelector('#sltCanton');
    for (let i = 1; i < sCanton.length; i++) {
        if (sCanton.options[i].value == listaSede[3]) {
            sCanton.selectedIndex = i;
        }
    }
    llenarDistrito();
    let sDistrito = document.querySelector('#sltDistrito');
    for (let i = 1; i < sDistrito.length; i++) {
        if (sDistrito.options[i].value == listaSede[4]) {
            sDistrito.selectedIndex = i;
        }
    }
}
//Guarda los datos de la carrera cambiados y los actualiza en el localStorage
function obtenerDatosActualizados() {

    document.querySelector('#txtNombreSede').disabled = false;
    let sede = getSede();

    let bError = validar();

    if (bError == false) {

        let listaSede = [];

        let sNombreSede = document.querySelector('#txtNombreSede').value;
        let sTipoSede = document.querySelector('#sltTipoSede').value;
        let sProvincia = document.querySelector('#sltProvincia').value;
        let sCanton = document.querySelector('#sltCanton').value;
        let sDistrito = document.querySelector('#sltDistrito').value;
        let sDirección = document.querySelector('#txtDireccion').value;
        let bEstado = sede[6];
        let checkboxMapa = document.querySelector('#checkboxMostrarMapa');
        let mostrarMapa;
        let latitud;
        let longitud;
        let profesoresAsociados= sede[10];

        if (checkboxMapa.checked == false) {
            latitud = 9.934739;
            longitud = -84.087502;
            mostrarMapa = false;
        } else {
            mostrarMapa = true;
            latitud = getLatitud();
            longitud = getLongitud();
        }

        listaSede.push(sNombreSede, sTipoSede, sProvincia, sCanton, sDistrito, sDirección, bEstado, mostrarMapa, latitud, longitud, profesoresAsociados);

        actualizarSede(listaSede);
        swal({
          title: "Carrera actualizada",
          text: "Los datos de la carrera se actualizaron exitosamente.",
          buttons: {
            confirm: "Aceptar",
          },
        });
        setTimeout(function () {
            location.href = "listarSede.html";
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
//valida que los campos no hayan sido dejados en blanco
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

//----------------Seccion de mapa---------------------
//Muestra mapa segun el estado del checkbox
function mostrarMapa() {
    let mapa = document.querySelector('#mapaSede');
    let checkboxMapa = document.querySelector('#checkboxMostrarMapa');

    if (checkboxMapa.checked == false) {
        mapa.classList.add('ocultar');
    } else {
        mapa.classList.remove('ocultar');
    }
}
//Muestra el mapa
function initMap() {

    let infoSede= getSede();

    let latitudSede = infoSede[8];
    let longitudSede = infoSede[9];

    let posicionCentral = { lat: latitudSede, lng: longitudSede };

    let opciones = {
        zoom: 16,
        center: posicionCentral
    }

    //Creacion de mapa
    let mapa = new google.maps.Map(document.getElementById('mapaSede'), opciones);

    //Marker
    let marker = new google.maps.Marker({
        position: posicionCentral,
        map: mapa,
        draggable: true
    });

    google.maps.event.addListener(marker, 'dragend', function () {
        latitudSede = marker.getPosition().lat();
        longitudSede = marker.getPosition().lng();
        setLatitud(latitudSede);
        setLongitud(longitudSede);
    });

}

document.querySelector('.spanCheckbox').addEventListener('click', checkboxMapa2);
let checkboxMostrarMapa = document.querySelector('#checkboxMostrarMapa');

function checkboxMapa2() {
  if (checkboxMostrarMapa.checked) {
    checkboxMostrarMapa.checked = false;
    mostrarMapa();
    return;
  }
  if (!checkboxMostrarMapa.checked) {
    checkboxMostrarMapa.checked = true;
    mostrarMapa();
    return;
  }
}
