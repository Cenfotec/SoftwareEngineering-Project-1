document.querySelector('#btnLogout').addEventListener('click', logout);
document.querySelector('#btnRegistrarHotel').addEventListener('click', function() {
  location.href = 'registrarHotel.html';
});
document.querySelector('#btnRegistrarCliente').addEventListener('click', function() {
  location.href = 'registrarCliente.html';
});

let filtroAlfabetico = document.querySelector('#filtroAlfabetico');
filtroAlfabetico.addEventListener('click', mostrarHoteles);

//------------------------------------------------------------------------------------

let mostraStatus = true;
document.querySelector('#txtBuscar').addEventListener('keyup', mostrarHoteles);

let botonVerDesactivados = document.querySelector('#btnDesactivados');
botonVerDesactivados.addEventListener('click', mostrarHotelesDesactivados);

let botonVerActivados = document.querySelector('#btnActivados');
botonVerActivados.addEventListener('click', mostrarHotelesActivados);

botonVerActivados.classList.add('ocultar');

mostrarHotelesActivados();


// Esta función muestra los hoteles registradas
function mostrarHoteles() {
  if (mostraStatus) {
    mostrarHotelesActivados();
  } else {
    mostrarHotelesDesactivados();
  }
}
//Desactiva el hotel cuando se presiona el boton "desactivar"
function desactivar() {
  let nombreHotel = this.dataset.nombre;
  let hotel = buscarHotelPorNombre(nombreHotel);

  hotel[0]['estado'] = 'false';

  swal({
  title: "Desactivar hotel",
  text: "¿Está seguro que desea desactivar este hotel?",
  buttons: ["Cancelar", "Aceptar"],
  }).then((willDelete) => {
    if (willDelete) {
      actualizarHotel(hotel[0]);
      mostrarHotelesActivados();
    }
  });
}
//Activa el hotel cuando se presiona el boton "activar"
function activar() {
    let nombreHotel = this.dataset.nombre;
    let hotel = buscarHotelPorNombre(nombreHotel);

    hotel[0]['estado'] = 'true';

    swal({
    title: "Activar hotel",
    text: "¿Está seguro que desea activar este hotel?",
    buttons: ["Cancelar", "Aceptar"],
    }).then((willDelete) => {
      if (willDelete) {
        actualizarHotel(hotel[0]);
        mostrarHotelesDesactivados();
      }
    });
}
//Muestra una lista de hoteles desactivados
function mostrarHotelesDesactivados() {
    mostraStatus = false;
    botonVerDesactivados.classList.add('ocultar');
    botonVerActivados.classList.remove('ocultar');

    let sBuscar = document.querySelector('#txtBuscar').value;
    // let listaHoteles = getListaHotel();
    let listaHoteles = obtenerListaHoteles();
    let lista = [];
    lista.sort();
    if (filtroAlfabetico.checked) {
      for (let j = 0; j < listaHoteles.length; j++) {
        lista.push(listaHoteles[j]['nombre']);
      }
      lista.sort();
    } else {
      for (let j = 0; j < listaHoteles.length; j++) {
        lista.push(listaHoteles[j]['nombre']);
      }
    }
    document.querySelector('#hotelList').innerHTML = '';

    for (let i = 0; i < lista.length; i++) {

        if (buscarHotelPorNombre(lista[i])[0]['nombre'].toLowerCase().includes(sBuscar.toLowerCase())) {

          if (buscarHotelPorNombre(lista[i])[0]['estado'] == 'false') {
            listaHoteles = buscarHotelPorNombre(lista[i])[0];

            // Card
            let divHotelCard = document.createElement('div');
            divHotelCard.classList.add('hotelCard');
            divHotelCard.dataset.nombre = listaHoteles['nombre'];
            divHotelCard.addEventListener('click', visualizarHotel);

            // Imagen
            let divHotelImagen = document.createElement('div');
            divHotelImagen.classList.add('hotelImagen');
            let imgHotelImagen = document.createElement('img');
            imgHotelImagen.src = 'http://res.cloudinary.com/pbonillag/image/upload/' + listaHoteles['fotografia'];
            imgHotelImagen.id = 'hotelImagenLink';
            divHotelImagen.appendChild(imgHotelImagen);
            divHotelCard.appendChild(divHotelImagen);

            // Información
            let divHotelInformacion = document.createElement('div');
            divHotelInformacion.classList.add('hotelInformacion');

            let spanHotelNombre = document.createElement('span');
            spanHotelNombre.id = 'hotelNombre';
            spanHotelNombre.innerHTML = listaHoteles['nombre'];
            spanHotelNombre.dataset.hotel = listaHoteles['nombre'];

            let divHotelRating = document.createElement('div');
            divHotelRating.id = 'divHotelRating';

            let pHotelRating = document.createElement('p');
            pHotelRating.id = 'hotelRating';
            pHotelRating.classList.add('rating');
            let pHotelRating2 = document.createElement('p');
            pHotelRating2.id = 'hotelRating2';
            pHotelRating2.classList.add('rating');



            divHotelRating.appendChild(pHotelRating);
            divHotelRating.appendChild(pHotelRating2);

            let divHotelDireccion = document.createElement('div');
            let spanHotelDireccion = document.createElement('span');
            spanHotelDireccion.id = 'hotelDireccion';
            spanHotelDireccion.innerHTML = listaHoteles['direccion'];
            divHotelDireccion.appendChild(spanHotelDireccion);

            divHotelInformacion.appendChild(spanHotelNombre);
            divHotelInformacion.appendChild(divHotelRating);
            divHotelInformacion.appendChild(spanHotelDireccion);


            let buttonEditar = document.createElement('button');
            buttonEditar.type = 'button';
            buttonEditar.classList.add('hotelEvaluar');
            buttonEditar.innerHTML = 'Editar';
            buttonEditar.addEventListener('click', editar);
            buttonEditar.dataset.nombre = listaHoteles['nombre'];
            buttonEditar.addEventListener('mouseover', function() {
              spanHotelNombre.style.textDecoration = 'underline';
            });
            buttonEditar.addEventListener('mouseout', function() {
              spanHotelNombre.style.textDecoration = 'none';
            });





            let buttonActivar = document.createElement('button');
            buttonActivar.type = 'button';
            buttonActivar.classList.add('hotelActivar');
            buttonActivar.addEventListener('click', activar);
            buttonActivar.dataset.nombre = listaHoteles['nombre'];

            buttonActivar.addEventListener('mouseover', function() {
              visualizar = false;
            });
            buttonActivar.addEventListener('mouseout', function() {
              visualizar = true;
            });

            buttonActivar.setAttribute('data-tooltip', 'Activar');
            buttonActivar.classList.add('tooltip-top');

            divHotelCard.appendChild(divHotelInformacion);
            divHotelCard.appendChild(buttonEditar);
            divHotelCard.appendChild(buttonActivar);

            document.querySelector('#hotelList').appendChild(divHotelCard);

            let evaluacion = getEvaluacionTotal(listaHoteles['nombre']);

            if (isNaN(evaluacion)) {
              evaluacion = 0;
            }

            for (let j = 0; j < Math.floor(evaluacion); j++) {
              pHotelRating.innerHTML += '<i class="fas fa-star"></i>';
            }
            for (let k = 0; k < 5 - Math.floor(evaluacion); k++) {
              pHotelRating2.innerHTML += '<i class="fas fa-star"></i>';
            }
          }
        }
    }
}
//Muestra una lista de hoteles activados
function mostrarHotelesActivados() {
    mostraStatus = true;
    botonVerDesactivados.classList.remove('ocultar');
    botonVerActivados.classList.add('ocultar');

    let sBuscar = document.querySelector('#txtBuscar').value;
    // let listaHoteles = getListaHotel();
    let listaHoteles = obtenerListaHoteles();
    let lista = [];
    lista.sort();
    if (filtroAlfabetico.checked) {
      for (let j = 0; j < listaHoteles.length; j++) {
        lista.push(listaHoteles[j]['nombre']);
      }
      lista.sort();
    } else {
      for (let j = 0; j < listaHoteles.length; j++) {
        lista.push(listaHoteles[j]['nombre']);
      }
    }
    document.querySelector('#hotelList').innerHTML = '';

    for (let i = 0; i < lista.length; i++) {

        if (buscarHotelPorNombre(lista[i])[0]['nombre'].toLowerCase().includes(sBuscar.toLowerCase())) {

          if (buscarHotelPorNombre(lista[i])[0]['estado'] == 'true') {
            listaHoteles = buscarHotelPorNombre(lista[i])[0];

            // Card
            let divHotelCard = document.createElement('div');
            divHotelCard.classList.add('hotelCard');
            divHotelCard.dataset.nombre = listaHoteles['nombre'];
            divHotelCard.addEventListener('click', visualizarHotel);

            // Imagen
            let divHotelImagen = document.createElement('div');
            divHotelImagen.classList.add('hotelImagen');
            let imgHotelImagen = document.createElement('img');
            imgHotelImagen.src = 'http://res.cloudinary.com/pbonillag/image/upload/' + listaHoteles['fotografia'];
            imgHotelImagen.id = 'hotelImagenLink';
            divHotelImagen.appendChild(imgHotelImagen);
            divHotelCard.appendChild(divHotelImagen);

            // Información
            let divHotelInformacion = document.createElement('div');
            divHotelInformacion.classList.add('hotelInformacion');

            let spanHotelNombre = document.createElement('span');
            spanHotelNombre.id = 'hotelNombre';
            spanHotelNombre.innerHTML = listaHoteles['nombre'];
            spanHotelNombre.dataset.hotel = listaHoteles['nombre'];

            let divHotelRating = document.createElement('div');
            divHotelRating.id = 'divHotelRating';

            let pHotelRating = document.createElement('p');
            pHotelRating.id = 'hotelRating';
            pHotelRating.classList.add('rating');
            let pHotelRating2 = document.createElement('p');
            pHotelRating2.id = 'hotelRating2';
            pHotelRating2.classList.add('rating');



            divHotelRating.appendChild(pHotelRating);
            divHotelRating.appendChild(pHotelRating2);

            let divHotelDireccion = document.createElement('div');
            let spanHotelDireccion = document.createElement('span');
            spanHotelDireccion.id = 'hotelDireccion';
            spanHotelDireccion.innerHTML = listaHoteles['direccion'];
            divHotelDireccion.appendChild(spanHotelDireccion);

            divHotelInformacion.appendChild(spanHotelNombre);
            divHotelInformacion.appendChild(divHotelRating);
            divHotelInformacion.appendChild(spanHotelDireccion);


            let buttonEditar = document.createElement('button');
            buttonEditar.type = 'button';
            buttonEditar.classList.add('hotelEvaluar');
            buttonEditar.innerHTML = 'Editar';
            buttonEditar.addEventListener('click', editar);
            buttonEditar.dataset.nombre = listaHoteles['nombre'];
            buttonEditar.addEventListener('mouseover', function() {
              spanHotelNombre.style.textDecoration = 'underline';
            });
            buttonEditar.addEventListener('mouseout', function() {
              spanHotelNombre.style.textDecoration = 'none';
            });



            let buttonDesactivar = document.createElement('button');
            buttonDesactivar.type = 'button';
            buttonDesactivar.classList.add('hotelDesactivar');
            buttonDesactivar.addEventListener('click', desactivar);
            buttonDesactivar.dataset.nombre = listaHoteles['nombre'];

            buttonDesactivar.addEventListener('mouseover', function() {
              visualizar = false;
            });
            buttonDesactivar.addEventListener('mouseout', function() {
              visualizar = true;
            });

            buttonDesactivar.setAttribute('data-tooltip', 'Desactivar');
            buttonDesactivar.classList.add('tooltip-top');

            divHotelCard.appendChild(divHotelInformacion);
            divHotelCard.appendChild(buttonEditar);
            divHotelCard.appendChild(buttonDesactivar);

            document.querySelector('#hotelList').appendChild(divHotelCard);

            let evaluacion = getEvaluacionTotal(listaHoteles['nombre']);

            if (isNaN(evaluacion)) {
              evaluacion = 0;
            }

            for (let j = 0; j < Math.floor(evaluacion); j++) {
              pHotelRating.innerHTML += '<i class="fas fa-star"></i>';
            }
            for (let k = 0; k < 5 - Math.floor(evaluacion); k++) {
              pHotelRating2.innerHTML += '<i class="fas fa-star"></i>';
            }
          }
        }
    }
}
//Redirecciona a pantalla de modificar del hotel clikeado
function editar() {
    let nombreHotel = this.dataset.nombre;

    let hotel = buscarHotelPorNombre(nombreHotel);

    setHotel(hotel);
    location.href = "modificarHotel.html";
}

let visualizar = true;

//Abre el modal con los datos del hotel al clikear la carta
function visualizarHotel() {
  console.log(visualizar);
  if (visualizar) {
    let nombreHotel = this.dataset.nombre;

    let hotel = buscarHotelPorNombre(nombreHotel)[0];

    setHotelVisualizar(hotel);

    initMap();
    openModal()

    document.querySelector('#imgHotel').src = 'http://res.cloudinary.com/pbonillag/image/upload/' + hotel['fotografia'] + '.png';
    document.querySelector('#lblNombre').innerHTML = 'Hotel ' + hotel['nombre'];

    let phoneS = hotel['telServicio'].split('');
    phoneS[8] = phoneS[7];
    phoneS[7] = phoneS[6];
    phoneS[6] = phoneS[5];
    phoneS[5] = phoneS[4];
    phoneS[4] = phoneS[3];
    phoneS[4] = '-';
    document.querySelector('#lblTelefonoServicio').innerHTML = phoneS.join('');
    document.querySelector('#lblCorreoServicio').innerHTML = hotel['correoServicio'];

    let phoneR = hotel['telReservacion'].split('');
    phoneR[8] = phoneR[7];
    phoneR[7] = phoneR[6];
    phoneR[6] = phoneR[5];
    phoneR[5] = phoneR[4];
    phoneR[4] = phoneR[3];
    phoneR[4] = '-';
    document.querySelector('#lblTelefonoReservacion').innerHTML = phoneR.join('');
    document.querySelector('#lblCorreoReservacion').innerHTML = hotel['correoReservacion'];

    document.querySelector('#lblUbicacion').innerHTML = hotel['distrito'] + ', ' + hotel['canton'] + ', ' + hotel['provincia'];
    document.querySelector('#lblDireccion').innerHTML = hotel['direccion'];

    mostrarEvaluaciones(hotel['nombre']);




    return false;
  }
}

//Funcion que muestra el mapa
function initMap() {

    let infoHotel = getHotelVisualizar();

    let latitudHotel = Number(infoHotel['latitud']);
    let longitudHotel = Number(infoHotel['longitud']);


    let posicionCentral = { lat: latitudHotel, lng: longitudHotel };

    let opciones = {
        zoom: 16,
        center: posicionCentral,
        mapTypeControl: false

    }

    //Creacion de mapa
    let mapa = new google.maps.Map(document.getElementById('mapaHotel'), opciones);

    //Marker
    let marker = new google.maps.Marker({
        position: posicionCentral,
        map: mapa,
    });
}





















// Función para mostrar las evaluaciones dentro del modal de cada hotel
function mostrarEvaluaciones(pNombre) {
  clearEvaluaciones();
  let hotelEvaluacion = buscarEvaluacionPorHotel(pNombre);
  let comidaRating = document.querySelector('#comidaRating');
  let comidaRating2 = document.querySelector('#comidaRating2');

  let servicioRating = document.querySelector('#servicioRating');
  let servicioRating2 = document.querySelector('#servicioRating2');

  let habitacionRating = document.querySelector('#habitacionRating');
  let habitacionRating2 = document.querySelector('#habitacionRating2');

  let infraestructuraRating = document.querySelector('#infraestructuraRating');
  let infraestructuraRating2 = document.querySelector('#infraestructuraRating2');

  let limpiezaRating = document.querySelector('#limpiezaRating');
  let limpiezaRating2 = document.querySelector('#limpiezaRating2');

  let ratingComida = 0, promedioComida = 0, amountComida = 0;
  let ratingServicio = 0, promedioServicio = 0, amountServicio = 0;
  let ratingHabitacion = 0, promedioHabitacion = 0, amountHabitacion = 0;
  let ratingInfraestructura = 0, promedioInfraestructura = 0, amountInfraestructura = 0;
  let ratingLimpieza = 0, promedioLimpieza = 0, amountLimpieza = 0;

  if (hotelEvaluacion.length > 0) {
    for (let i = 0; i < hotelEvaluacion.length; i++) {
      ratingComida += Number(hotelEvaluacion[i]['comida']);
      amountComida += 1;
      // <i class="far fa-star"></i>
      // <i class="far fa-star-half"></i>
    }
    for (let i = 0; i < hotelEvaluacion.length; i++) {
      ratingServicio += Number(hotelEvaluacion[i]['servicio']);
      amountServicio += 1;
      // <i class="far fa-star"></i>
      // <i class="far fa-star-half"></i>
    }

    for (let i = 0; i < hotelEvaluacion.length; i++) {
      ratingHabitacion += Number(hotelEvaluacion[i]['habitacion']);
      amountHabitacion += 1;
      // <i class="far fa-star"></i>
      // <i class="far fa-star-half"></i>
    }


    for (let i = 0; i < hotelEvaluacion.length; i++) {
      ratingInfraestructura += Number(hotelEvaluacion[i]['infraestructura']);
      amountInfraestructura += 1;
      // <i class="far fa-star"></i>
      // <i class="far fa-star-half"></i>
    }


    for (let i = 0; i < hotelEvaluacion.length; i++) {
      ratingLimpieza += Number(hotelEvaluacion[i]['limpieza']);
      amountLimpieza += 1;
      // <i class="far fa-star"></i>
      // <i class="far fa-star-half"></i>
    }
  }
  promedioComida = (!ratingComida > 0) ? 0 : (ratingComida / amountComida);
  promedioServicio = (!ratingServicio > 0) ? 0 : (ratingServicio / amountServicio);
  promedioHabitacion = (!ratingHabitacion > 0) ? 0 : (ratingHabitacion / amountHabitacion);
  promedioInfraestructura = (!ratingInfraestructura > 0) ? 0 : (ratingInfraestructura / amountInfraestructura);
  promedioLimpieza = (!ratingLimpieza > 0) ? 0 : (ratingLimpieza / amountLimpieza);


  for (let j = 0; j < Math.floor(promedioComida); j++) {
    comidaRating.innerHTML += '<i class="fas fa-star"></i>';
  }
  for (let k = 0; k < 5 - Math.floor(promedioComida); k++) {
    comidaRating2.innerHTML += '<i class="fas fa-star"></i>';
  }


  for (let j = 0; j < Math.floor(promedioServicio); j++) {
    servicioRating.innerHTML += '<i class="fas fa-star"></i>';
  }
  for (let k = 0; k < 5 - Math.floor(promedioServicio); k++) {
    servicioRating2.innerHTML += '<i class="fas fa-star"></i>';
  }


  for (let j = 0; j < Math.floor(promedioHabitacion); j++) {
    habitacionRating.innerHTML += '<i class="fas fa-star"></i>';
  }
  for (let k = 0; k < 5 - Math.floor(promedioHabitacion); k++) {
    habitacionRating2.innerHTML += '<i class="fas fa-star"></i>';
  }


  for (let j = 0; j < Math.floor(promedioInfraestructura); j++) {
    infraestructuraRating.innerHTML += '<i class="fas fa-star"></i>';
  }
  for (let k = 0; k < 5 - Math.floor(promedioInfraestructura); k++) {
    infraestructuraRating2.innerHTML += '<i class="fas fa-star"></i>';
  }


  for (let j = 0; j < Math.floor(promedioLimpieza); j++) {
    limpiezaRating.innerHTML += '<i class="fas fa-star"></i>';
  }
  for (let k = 0; k < 5 - Math.floor(promedioLimpieza); k++) {
    limpiezaRating2.innerHTML += '<i class="fas fa-star"></i>';
  }
}

function clearEvaluaciones() {
  comidaRating.innerHTML = 'Comida: ';
  comidaRating2.innerHTML = '';

  servicioRating.innerHTML = 'Servicio: ';
  servicioRating2.innerHTML = '';

  habitacionRating.innerHTML = 'Habitación: ';
  habitacionRating2.innerHTML = '';

  infraestructuraRating.innerHTML = 'Infraestructura: ';
  infraestructuraRating2.innerHTML = '';

  limpiezaRating.innerHTML = 'Limpieza: ';
  limpiezaRating2.innerHTML = '';
}
