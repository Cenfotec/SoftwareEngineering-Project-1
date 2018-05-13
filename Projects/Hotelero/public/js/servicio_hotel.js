//obtiene la lista de hoteles
function getListaHotel() {
    let listaHoteles = JSON.parse(localStorage.getItem('listaHotelesLS'));

    if (listaHoteles == null) {
        listaHoteles = [];
    }
    return listaHoteles;
}
//guarda la lista de hoteles en el localstorage
function setListaHotel(paHotel) {
    let listaHoteles = getListaHotel();

    listaHoteles.push(paHotel);
    localStorage.setItem('listaHotelesLS', JSON.stringify(listaHoteles));
}
// function buscarHotelPorNombre(pNombre) {
//     let listaHoteles = getListaHotel();
//     let hotelEncontrado = [];
//
//     for (let i = 0; i < listaHoteles.length; i++) {
//         if (listaHoteles[i][0] == pNombre) {
//             hotelEncontrado = listaHoteles[i];
//         }
//     }
//     return hotelEncontrado;
// }
function setHotel(paHotel) {
    localStorage.setItem('hotelModificarLS', JSON.stringify(paHotel));
}
function getHotel() {
    let hotel = JSON.parse(localStorage.getItem('hotelModificarLS'));
    return hotel;
}
// function actualizarHotel(paInfoHotel) {
//     let listaHoteles = getListaHotel();
//
//     for (let i = 0; i < listaHoteles.length; i++) {
//         if (listaHoteles[i][0] == paInfoHotel[0]) {
//             listaHoteles[i] = paInfoHotel;
//             localStorage.setItem('listaHotelesLS', JSON.stringify(listaHoteles));
//         }
//     }
// }

//Funcion que toma como parametro la latitud de el hotel y la guarda en el local storage
function setLatitud(paLatitud) {
    localStorage.setItem('latitudHotelLS', JSON.stringify(paLatitud));
}
//Funcion que devuelve la latitud de el hotel guardada en el localstorage
function getLatitud() {
    let latitudHotel = JSON.parse(localStorage.getItem('latitudHotelLS'));
    return latitudHotel;
}
//Funcion que toma como parametro la longitud de el hotel y la guarda en el local storage
function setLongitud(paLongitud) {
    localStorage.setItem('longitudHotelLS', JSON.stringify(paLongitud));
}
//Funcion que devuelve la longitud de el hotel guardada en el localstorage
function getLongitud() {
    let longitudHotel = JSON.parse(localStorage.getItem('longitudHotelLS'));
    return longitudHotel;
}

//Guarda en local storage el hotel que se visualiza en el modal
function setHotelVisualizar(paHotelVisualizar){
    localStorage.setItem('hotelVisualizarLS', JSON.stringify(paHotelVisualizar));
}
//retorna la lista de datos de el hotel siendo visualizada
function getHotelVisualizar(){
    let hotel = JSON.parse(localStorage.getItem('hotelVisualizarLS'));
    return hotel;
}

function getEvaluacionTotal(pNombre) {
  let hotelEvaluacion = buscarEvaluacionPorHotel(pNombre);
  let suma = 0;
  let cont = 0;
  if (hotelEvaluacion != null) {
    for (let i = 0; i < hotelEvaluacion.length; i++) {
      for (let j = 2; j < 6; j++) {
        suma += Number(hotelEvaluacion[i]['comida']);
        suma += Number(hotelEvaluacion[i]['servicio']);
        suma += Number(hotelEvaluacion[i]['habitacion']);
        suma += Number(hotelEvaluacion[i]['infraestructura']);
        suma += Number(hotelEvaluacion[i]['limpieza']);
        cont++;
      }
    }
  }
  return suma/(cont*5);
}


































function guardarHotel(paDatosHotel) {
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_hotel',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            'nombre': paDatosHotel[0],
            'telServicio': paDatosHotel[1],
            'correoServicio': paDatosHotel[2],
            'telReservacion': paDatosHotel[3],
            'correoReservacion': paDatosHotel[4],
            'provincia': paDatosHotel[5],
            'canton': paDatosHotel[6],
            'distrito': paDatosHotel[7],
            'direccion': paDatosHotel[8],
            'latitud': paDatosHotel[9],
            'longitud': paDatosHotel[10],
            'fotografia': paDatosHotel[11],
            'estado': paDatosHotel[12]
        }
    });

    peticion.done(function (response) {

    });

    peticion.fail(function () {

    });
}

function obtenerListaHoteles() {
    let listaHotel = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_todos_hoteles',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {

        }
    });

    peticion.done(function (response) {
        listaHotel = response;
    });

    peticion.fail(function () {

    });

    return listaHotel;
}

function buscarHotelPorNombre(pnombre){
    let hotel = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/buscar_hotel_id',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
            'nombre' : pnombre
        }
      });

      peticion.done(function(response){
        hotel = response;
      });

      peticion.fail(function(){

      });

    return hotel;
}

function actualizarHotel(pDatosHotel){
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/actualizar_hotel',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
            '_id' : pDatosHotel._id,
            'nombre': pDatosHotel.nombre,
            'telServicio': pDatosHotel.telServicio,
            'correoServicio': pDatosHotel.correoServicio,
            'telReservacion': pDatosHotel.telReservacion,
            'correoReservacion': pDatosHotel.correoReservacion,
            'provincia': pDatosHotel.provincia,
            'canton': pDatosHotel.canton,
            'distrito': pDatosHotel.distrito,
            'direccion': pDatosHotel.direccion,
            'latitud': pDatosHotel.latitud,
            'longitud': pDatosHotel.longitud,
            'fotografia': pDatosHotel.fotografia,
            'estado': pDatosHotel.estado
        }
      });

      peticion.done(function(response){

      });

      peticion.fail(function(){

      });
}
