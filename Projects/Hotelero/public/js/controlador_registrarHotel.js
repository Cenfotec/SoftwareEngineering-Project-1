document.querySelector('#btnLogout').addEventListener('click', logout);
let botonRegistrar = document.querySelector('#btnRegistrar');
botonRegistrar.addEventListener('click', obtenerDatos);
document.querySelector('#sltProvincia').addEventListener('change', llenarCanton);
document.querySelector('#sltCanton').addEventListener('change', llenarDistrito);

//Obtiene los datos del hotel y los guarda dentro de una lista ademas ejecuta la funcion de validación
function obtenerDatos() {
    let bError = validar();
    let bExiste = false;
    if (bError == false) {
        let listaHotel = [];

        let sNombreHotel = document.querySelector('#txtNombreHotel').value;
        let sTelefonoServicio = document.querySelector('#txtTelefonoServicio').value;
        let sCorreoServicio = document.querySelector('#txtCorreoServicio').value;
        let sTelefonoReservacion = document.querySelector('#txtTelefonoReservacion').value;
        let sCorreoReservacion = document.querySelector('#txtCorreoReservacion').value;
        let sProvincia = document.querySelector('#sltProvincia').value;
        let sCanton = document.querySelector('#sltCanton').value;
        let sDistrito = document.querySelector('#sltDistrito').value;
        let sDirección = document.querySelector('#txtDireccion').value;
        let evaluacion = [];
        let sFotografia = getTempFotografiaHotel();
        let bEstado = true;

        let latitud;
        let longitud;

        latitud = getLatitud();
        longitud = getLongitud();

        bExiste = validarHotel(sNombreHotel);
        if (!bExiste) {
          listaHotel.push(sNombreHotel, sTelefonoServicio, sCorreoServicio, sTelefonoReservacion, sCorreoReservacion, sProvincia, sCanton, sDistrito, sDirección, latitud, longitud, sFotografia, bEstado);

          // setListaHotel(listaHotel);
          guardarHotel(listaHotel);
          swal({
            title: "Hotel registrado",
            text: "Los datos del hotel se registraron exitosamente.",
            buttons: {
            confirm: "Aceptar",
            },
          });
          setTimeout(() => {
              window.location.href = 'panelControl_administrador.html';
          }, 1500);
        } else {
          swal({
            title: "Registro inválido",
            text: "El hotel que desea registrar ya existe.",
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

//Revisa los campos requeridos y retorna un valor booleano que determina si hay campos en blancos
function validar() {
    let bError = false;
    let camposRequeridos = document.querySelectorAll('[required]');

    for (let i = 0; i < camposRequeridos.length; i++) {
        if (camposRequeridos[i].value == '') {
            camposRequeridos[i].classList.add('invalido');
            bError = true;
        } else {
            camposRequeridos[i].classList.remove('invalido');
        }
    }
    return bError;
}

function validarHotel(pNombreHotel) {
    let sNombreHotel = document.querySelector('#txtNombreHotel');
    // let listaHoteles = getListaHotel();
    let listaHoteles = obtenerListaHoteles();
    let bExiste = false;

    for (let i = 0; i < listaHoteles.length; i++) {
        if (listaHoteles[i]['nombre'] == pNombreHotel) {
            sNombreHotel.classList.add('invalido');
            bExiste = true;
        }
    }
    return bExiste;
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
    let mapa = new google.maps.Map(document.getElementById('mapaHotel'), opciones);

    //Marker (la posicion del marker es la misma posicion que donde se centra el mapa y hace que el marker sea arrastrable)
    let marker = new google.maps.Marker({
        position: posicionCentral,
        map: mapa,
        draggable: true
    });


    //event listener que cuando el marker se mueva, guarde la latitud y longitud en el sessionStorage
    google.maps.event.addListener(marker, 'dragend', function () {
        latitudHotel = marker.getPosition().lat();
        longitudHotel = marker.getPosition().lng();
        setLatitud(latitudHotel);
        setLongitud(longitudHotel);
    });
}
