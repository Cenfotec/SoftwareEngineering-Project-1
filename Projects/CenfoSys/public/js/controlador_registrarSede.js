let botonRegistrar = document.querySelector('#btnRegistrar');
botonRegistrar.addEventListener('click', obtenerDatos);
document.querySelector('#checkboxMostrarMapa').addEventListener('click', mostrarMapa);
document.querySelector('#sltProvincia').addEventListener('change', llenarCanton);
document.querySelector('#sltCanton').addEventListener('change', llenarDistrito);

//Obtiene los datos de la sede y los guarda dentro de una lista ademas ejecuta la funcion de validacion
function obtenerDatos() {
    let bError = validar();
    let bExiste = false;
    if (bError == false) {
        let listaSede = [];

        let sNombreSede = document.querySelector('#txtNombreSede').value;
        let sTipoSede = document.querySelector('#sltTipoSede').value;
        let sProvincia = document.querySelector('#sltProvincia').value;
        let sCanton = document.querySelector('#sltCanton').value;
        let sDistrito = document.querySelector('#sltDistrito').value;
        let sDirección = document.querySelector('#txtDireccion').value;
        let bEstado = true;
        let checkboxMapa = document.querySelector('#checkboxMostrarMapa');
        let mostrarMapa;
        let latitud;
        let longitud;
        let profesoresAsociados= [];


        //Si la checkbox del mapa no esta checkeada se guarda el estado (mostrarMapa = false) en el arreglo de sede
        //la latitud se le asigna la latitud de costa rica para que el mapa no asigne por default lat y lng = 0

        if (checkboxMapa.checked == false) {
            latitud = 9.934739;
            longitud = -84.087502;
            mostrarMapa = false;
        } else {
            mostrarMapa = true;
            latitud = getLatitud();
            longitud = getLongitud();
        }
        bExiste = validarSede(sNombreSede);

        if (!bExiste) {
            listaSede.push(sNombreSede, sTipoSede, sProvincia, sCanton, sDistrito, sDirección, bEstado, mostrarMapa, latitud, longitud, profesoresAsociados);

            setListaSede(listaSede);
            swal({
              title: "Sede registrada",
              text: "Los datos de la sede se registraron exitosamente.",
              buttons: {
                confirm: "Aceptar",
              },
            });
            limpiar();
            setTimeout(() => {
                window.location.href = 'listarSede.html';
            }, 1500);

        } else {
          swal({
            title: "Registro inválido",
            text: "La sede que desea registrar ya existe.",
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
//Limpia los espacios y resetea el formulario
function limpiar() {
    setTimeout('location.reload()', 1500);
}
//Revisa los campos requeridos y retorna un valor booleano que determina si hay campos en blancos
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

function validarSede(pNombreSede) {
    let sNombreSede = document.querySelector('#txtNombreSede');
    let listaSedes = getListaSede();
    let bExiste = false;

    for (let i = 0; i < listaSedes.length; i++) {
        if (listaSedes[i][0] == pNombreSede) {
            sNombreSede.classList.remove('input');
            sNombreSede.classList.add('invalido');
            bExiste = true;
        }
    }
    return bExiste;
}

function mostrarMapa() {
    mapa = document.querySelector('#mapaSede');
    checkboxMapa = document.querySelector('#checkboxMostrarMapa');

    if (checkboxMapa.checked == false) {
        mapa.classList.add('ocultar');
    } else {
        mapa.classList.remove('ocultar');
    }
}

//Funcion del api de Google Maps que crea el mapa 
function initMap() {

    //la posicion por default va a estar encima de costa rica para que el usuario de zoom y posicione
    //el marker
    posicionCentral = { lat: 9.934739, lng: -84.087502 };

    //configuracion del mapa (tendra zoom de 7) y se centrara en la posicion guardada
    let opciones = {
        zoom: 7,
        center: posicionCentral
    }

    //Creacion de mapa
    let mapa = new google.maps.Map(document.getElementById('mapaSede'), opciones);

    //Marker (la posicion del marker es la misma posicion que donde se centra el mapa y hace que el marker sea arrastrable)
    let marker = new google.maps.Marker({
        position: posicionCentral,
        map: mapa,
        draggable: true
    });


    //event listener que cuando el marker se mueva, guarde la latitud y longitud en el localstorage
    google.maps.event.addListener(marker, 'dragend', function () {
        latitudSede = marker.getPosition().lat();
        longitudSede = marker.getPosition().lng();
        setLatitud(latitudSede);
        setLongitud(longitudSede);
    });
}
