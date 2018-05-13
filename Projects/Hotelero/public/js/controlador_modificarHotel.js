mostrarDatos();
document.querySelector('#btnLogout').addEventListener('click', logout);
document.querySelector('#btnActualizar').addEventListener('click', obtenerDatosActualizados);
document.querySelector('#sltProvincia').addEventListener('change', llenarCanton);
document.querySelector('#sltCanton').addEventListener('change', llenarDistrito);

//Muestra los datos del hotel en sus respectivos inputs
function mostrarDatos() {

    let listaHotel = getHotel()[0];

    document.querySelector('#lblNombre').innerHTML = listaHotel['nombre'];
    document.querySelector('#txtNombreHotel').value = listaHotel['nombre'];
    document.querySelector('#txtNombreHotel').disabled = true;
    document.querySelector('#txtTelefonoServicio').value = listaHotel['telServicio'];
    document.querySelector('#txtCorreoServicio').value = listaHotel['correoServicio'];
    document.querySelector('#txtTelefonoReservacion').value = listaHotel['telReservacion'];
    document.querySelector('#txtCorreoReservacion').value = listaHotel['correoReservacion'];
    document.querySelector('#sltProvincia').options[0].text = listaHotel['provincia'];
    document.querySelector('#sltCanton').options[0].text = listaHotel['canton'];
    document.querySelector('#sltDistrito').options[0].text = listaHotel['distrito'];
    document.querySelector('#txtDireccion').value = listaHotel['direccion'];

    let sProvincia = document.querySelector('#sltProvincia');
    for (let i = 1; i < sProvincia.length; i++) {
        if (sProvincia.options[i].value == listaHotel['provincia']) {
            sProvincia.selectedIndex = i;
        }
    }
    llenarCanton();
    let sCanton = document.querySelector('#sltCanton');
    for (let i = 1; i < sCanton.length; i++) {
        if (sCanton.options[i].value == listaHotel['canton']) {
            sCanton.selectedIndex = i;
        }
    }
    llenarDistrito();
    let sDistrito = document.querySelector('#sltDistrito');
    for (let i = 1; i < sDistrito.length; i++) {
        if (sDistrito.options[i].value == listaHotel['distrito']) {
            sDistrito.selectedIndex = i;
        }
    }
}
//Guarda los datos del hotel cambiados y los actualiza en la base de datos
function obtenerDatosActualizados() {

    document.querySelector('#txtNombreHotel').disabled = false;
    let hotel = getHotel()[0];

    let bError = validar();

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
        let sDireccion = document.querySelector('#txtDireccion').value;
        let latitud;
        let longitud;
        let sFotografia = hotel['fotografia'];
        if (getTempFotografiaHotel() == 'qs6fr1idsl06hztp5fle') {
          sFotografia = hotel['fotografia'];
        } else {
          sFotografia = getTempFotografiaHotel();
        }
        let bEstado = hotel['estado'];

        latitud = getLatitud();
        longitud = getLongitud();

        hotel['telServicio'] = sTelefonoServicio;
        hotel['correoServicio'] = sCorreoServicio;
        hotel['telReservacion'] = sTelefonoReservacion;
        hotel['correoReservacion'] = sCorreoReservacion;
        hotel['provincia'] = sProvincia;
        hotel['canton'] = sCanton;
        hotel['distrito'] = sDistrito;
        hotel['direccion'] = sDireccion;
        hotel['latitud'] = latitud;
        hotel['longitud'] = longitud;
        hotel['fotografia'] = sFotografia;
        hotel['estado'] = bEstado;

        actualizarHotel(hotel);
        swal({
          title: "Hotel actualizado",
          text: "Los datos del hotel se actualizaron exitosamente.",
          buttons: {
            confirm: "Aceptar",
          },
        });
        setTimeout(function () {
            location.href = "panelControl_administrador.html";
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
//valida que los campos requeridos no estén en vacíos.
function validar() {
    let bError = false;
    let camposRequeridos = document.querySelectorAll('[required]');

    for (let i = 0; i < camposRequeridos.length; i++) {
        if (camposRequeridos[i].value == '') {
            camposRequeridos[i].classList.add('invalido');
            bError = true;
        } else {
            camposRequeridos[i].classList.add('input');
        }
    }

    return bError;
}

//----------------Seccion de mapa---------------------
//Muestra el mapa
function initMap() {

    let infoHotel = getHotel()[0];

    let latitudHotel = Number(infoHotel['latitud']);
    let longitudHotel = Number(infoHotel['longitud']);

    let posicionCentral = { lat: latitudHotel, lng: longitudHotel };

    let opciones = {
        zoom: 16,
        center: posicionCentral
    }

    //Creacion de mapa
    let mapa = new google.maps.Map(document.getElementById('mapaHotel'), opciones);

    //Marker
    let marker = new google.maps.Marker({
        position: posicionCentral,
        map: mapa,
        draggable: true
    });

    google.maps.event.addListener(marker, 'dragend', function () {
        latitudHotel = marker.getPosition().lat();
        longitudHotel = marker.getPosition().lng();
        setLatitud(latitudHotel);
        setLongitud(longitudHotel);
    });

}
