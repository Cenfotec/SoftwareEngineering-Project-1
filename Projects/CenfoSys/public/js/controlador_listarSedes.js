let mostraStatus = true;
document.querySelector('#txtBuscar').addEventListener('keyup', mostrarSedes);

let botonVerDesactivadas = document.querySelector('#btnDesactivados');
botonVerDesactivadas.addEventListener('click', mostrarSedesDesactivadas);

let botonVerActivadas = document.querySelector('#btnActivados');
botonVerActivadas.addEventListener('click', mostrarSedesActivadas);

botonVerActivadas.classList.add('ocultar');

mostrarSedesActivadas();


// Esta funcion muestra las sedes registradas
function mostrarSedes() {
  if (mostraStatus) {
    mostrarSedesActivadas();
  } else {
    mostrarSedesDesactivadas();
  }
}
//Desactiva la carrera cuando se presiona el boton "desactivar"
function desactivar() {
  let nombreSede = this.dataset.nombre;
  let sede = buscarSedePorNombre(nombreSede);

  sede[6] = false;

  swal({
  title: "Desactivar sede",
  text: "¿Está seguro que desea desactivar esta sede?",
  buttons: ["Cancelar", "Aceptar"],
  }).then((willDelete) => {
    if (willDelete) {
      actualizarSede(sede);
      mostrarSedesActivadas();
    }
  });
}
//Activa la carrera cuando se presiona el boton "activar"
function activar() {
    let nombreSede = this.dataset.nombre;
    let sede = buscarSedePorNombre(nombreSede);

    sede[6] = true;

    swal({
    title: "Activar sede",
    text: "¿Está seguro que desea activar esta sede?",
    buttons: ["Cancelar", "Aceptar"],
    }).then((willDelete) => {
      if (willDelete) {
        actualizarSede(sede);
        mostrarSedesDesactivadas();
      }
    });
}
//Muestra una lista de sedes desactivadas
function mostrarSedesDesactivadas() {
    mostraStatus = false;
    botonVerActivadas.classList.remove('ocultar');
    botonVerDesactivadas.classList.add('ocultar');

    let sBuscar = document.querySelector('#txtBuscar').value;
    let listaSedes = getListaSede();
    let cuerpoTabla = document.querySelector('#tblSedes tbody');

    cuerpoTabla.innerHTML = '';

    for (let i = 0; i < listaSedes.length; i++) {

        if (listaSedes[i][0].toLowerCase().includes(sBuscar.toLowerCase())) {

            if (listaSedes[i][6] == false) {

                let fila = cuerpoTabla.insertRow();
                let cSeleccion = fila.insertCell();
                let cNombre = fila.insertCell();
                cNombre.dataset.nombre = listaSedes[i][0];
                cNombre.setAttribute('data-tooltip', 'Ver sede');
                cNombre.classList.add('tooltip-bottom');
                cNombre.addEventListener('click', visualizarSede);
                let cTipo = fila.insertCell();
                let cProvincia = fila.insertCell();

                let sNombre = document.createTextNode(listaSedes[i][0]);
                let sTipo = document.createTextNode(listaSedes[i][1].charAt(0).toUpperCase() + listaSedes[i][1].slice(1));
                let sProvincia = document.createTextNode(listaSedes[i][2]);

                cNombre.appendChild(sNombre);
                cTipo.appendChild(sTipo);
                cProvincia.appendChild(sProvincia);

                //Creacion del boton modificar
                let btnModificar = document.createElement('button');
                btnModificar.innerText = '';
                btnModificar.dataset.nombre = listaSedes[i][0];
                btnModificar.classList.add('botonTabla');
                btnModificar.classList.add('botonEditar');
                btnModificar.setAttribute('data-tooltip', 'Editar');
                btnModificar.addEventListener('click', editar);

                cSeleccion.appendChild(btnModificar);

                //Creacion del boton desactivar
                let botonDesactivar = document.createElement('button');
                botonDesactivar.innerText = '';
                botonDesactivar.dataset.nombre = listaSedes[i][0];
                botonDesactivar.classList.add('botonTabla');
                botonDesactivar.classList.add('botonDesactivar');
                botonDesactivar.setAttribute('data-tooltip', 'Desactivar');
                botonDesactivar.addEventListener('click', desactivar);


                //Creacion del boton Activar
                let botonActivar = document.createElement('button');
                botonActivar.innerText = '';
                botonActivar.dataset.nombre = listaSedes[i][0];
                botonActivar.classList.add('botonTabla');
                botonActivar.classList.add('botonActivar');
                botonActivar.setAttribute('data-tooltip', 'Activar');
                botonActivar.addEventListener('click', activar);

                if (!listaSedes[i][6]) {
                    botonDesactivar.classList.add('ocultar');
                } else {
                    botonActivar.classList.add('ocultar');
                }

                cSeleccion.appendChild(botonDesactivar);
                cSeleccion.appendChild(botonActivar);
            }
        }
    }
}
//Muestra una lista de sedes activadas
function mostrarSedesActivadas() {
    mostraStatus = true;
    botonVerDesactivadas.classList.remove('ocultar');
    botonVerActivadas.classList.add('ocultar');

    let sBuscar = document.querySelector('#txtBuscar').value;
    let listaSedes = getListaSede();
    let cuerpoTabla = document.querySelector('#tblSedes tbody');

    cuerpoTabla.innerHTML = '';

    for (let i = 0; i < listaSedes.length; i++) {

        if (listaSedes[i][0].toLowerCase().includes(sBuscar.toLowerCase())) {

            if (listaSedes[i][6] == true) {

                let fila = cuerpoTabla.insertRow();
                let cSeleccion = fila.insertCell();
                let cNombre = fila.insertCell();
                cNombre.dataset.nombre = listaSedes[i][0];
                cNombre.setAttribute('data-tooltip', 'Ver sede');
                cNombre.classList.add('tooltip-bottom');
                cNombre.addEventListener('click', visualizarSede);
                let cTipo = fila.insertCell();
                let cProvincia = fila.insertCell();

                let sNombre = document.createTextNode(listaSedes[i][0]);
                let sTipo = document.createTextNode(listaSedes[i][1].charAt(0).toUpperCase() + listaSedes[i][1].slice(1));
                let sProvincia = document.createTextNode(listaSedes[i][2]);

                cNombre.appendChild(sNombre);
                cTipo.appendChild(sTipo);
                cProvincia.appendChild(sProvincia);

                //Creacion del boton modificar
                let btnModificar = document.createElement('button');
                btnModificar.innerText = '';
                btnModificar.dataset.nombre = listaSedes[i][0];
                btnModificar.classList.add('botonTabla');
                btnModificar.classList.add('botonEditar');
                btnModificar.setAttribute('data-tooltip', 'Editar');
                btnModificar.addEventListener('click', editar);

                cSeleccion.appendChild(btnModificar);

                //Creacion del boton desactivar
                let botonDesactivar = document.createElement('button');
                botonDesactivar.innerText = '';
                botonDesactivar.dataset.nombre = listaSedes[i][0];
                botonDesactivar.classList.add('botonTabla');
                botonDesactivar.classList.add('botonDesactivar');
                botonDesactivar.setAttribute('data-tooltip', 'Desactivar');
                botonDesactivar.addEventListener('click', desactivar);


                //Creacion del boton Activar
                let botonActivar = document.createElement('button');
                botonActivar.innerText = '';
                botonActivar.dataset.nombre = listaSedes[i][0];
                botonActivar.classList.add('botonTabla');
                botonActivar.classList.add('botonActivar');
                botonActivar.setAttribute('data-tooltip', 'Activar');
                botonActivar.addEventListener('click', activar);

                if (!listaSedes[i][6]) {
                    botonDesactivar.classList.add('ocultar');
                } else {
                    botonActivar.classList.add('ocultar');
                }

                cSeleccion.appendChild(botonDesactivar);
                cSeleccion.appendChild(botonActivar);
            }
        }
    }
}
//Redirecciona a pantalla de modificar de la carrera que se clickeo
function editar() {
    let nombreSede = this.dataset.nombre;

    let sede = buscarSedePorNombre(nombreSede);

    setSede(sede);
    location.href = "../html/modificarSede.html";
}
//Abre el modal con los datos de la sede al clickear la celda con el nombre
function visualizarSede() {
    let nombreSede = this.dataset.nombre;
    let sede = buscarSedePorNombre(nombreSede);

    setSedeVisualizar(sede);

    initMap();
    openModal()

    document.querySelector('#lblNombre').innerHTML = sede[0];
    document.querySelector('#lblTipo').innerHTML = sede[1].charAt(0).toUpperCase() + sede[1].slice(1);
    document.querySelector('#lblUbicacion').innerHTML = sede[2] + ', ' + sede[3] + ', ' + sede[4];
    document.querySelector('#lblDireccion').innerHTML = sede[5];

    if (!sede[7]){
        document.querySelector('#mapaSede').classList.add('ocultar');
    }

    mostrarCarrerasQueImparte();
    // mostrarCursosCarreraQueImparte();
    mostrarCursosActiiQueImparte();

    return false;
}
//Muestra la tabla de carreras que imparte la sede
function mostrarCarrerasQueImparte() {
    let listaCarreras = getListaCarrera();
    let sede = getSedeVisualizar();
    let nombreSede = sede[0];
    let cuerpoTabla = document.querySelector('#tblCarreras tbody');
    cuerpoTabla.innerHTML = '';
    
    for (let i = 0; i < listaCarreras.length; i++) {

        let sedeAsociada = listaCarreras[i][8];

        for (let j = 0; j < sedeAsociada.length; j++) {

            if (sedeAsociada[j] == nombreSede) {
                let fila = cuerpoTabla.insertRow();

                let cCodigo = fila.insertCell();
                let cCarrera = fila.insertCell();

                let sCodigo = document.createTextNode(listaCarreras[i][0]);
                let sCarrera = document.createTextNode(listaCarreras[i][1]);

                cCodigo.appendChild(sCodigo);
                cCarrera.appendChild(sCarrera);
            }
        }

    }
}
//Muestra una tabla de los cursos de carrera que se imparten en la sede
function mostrarCursosCarreraQueImparte(){
    let listaCursosCarrera = getListaCursos();
    let sede = getSedeVisualizar();
    let nombreSede = sede[0];
    let cuerpoTabla = document.querySelector('#tblCursosCarrera tbody');
    cuerpoTabla.innerHTML = '';

    for (let i = 0; i < listaCursosCarrera.length; i++) {

        let sedeAsociada = listaCursosCarrera[i][7];

        for (let j = 0; j < sedeAsociada.length; j++) {

            if (sedeAsociada[j][0] == nombreSede) {
                let fila = cuerpoTabla.insertRow();
                let cCursoCarrera = fila.insertCell();
                let sCursoCarrera = document.createTextNode(listaCursosCarrera[i][1]);
                cCursoCarrera.appendChild(sCursoCarrera);

            }
        }

    }
}
//Muesra una tabla de los cursos actii que se imparten en la sede
function mostrarCursosActiiQueImparte(){
    let listaCursosActii = getListaCursosActii();
    let sede = getSedeVisualizar();
    let nombreSede = sede[0];
    let cuerpoTabla = document.querySelector('#tblCursosActii tbody');
    cuerpoTabla.innerHTML = '';

    for (let i = 0; i < listaCursosActii.length; i++) {

        let sedeAsociada = listaCursosActii[i][5];

        for (let j = 0; j < sedeAsociada.length; j++) {
            
            if (sedeAsociada[j] == nombreSede) {
                let fila = cuerpoTabla.insertRow();

                let cCodigo = fila.insertCell();
                let cCursoActii = fila.insertCell();
                let sCodigo = document.createTextNode(listaCursosActii[i][0]);
                let sCursoActii = document.createTextNode(listaCursosActii[i][1]);
                cCodigo.appendChild(sCodigo);
                cCursoActii.appendChild(sCursoActii);

            }
        }

    }
}
//Funcion que muestra el mapa
function initMap() {

    let infoSede = getSedeVisualizar();

    let latitudSede = infoSede[8];
    let longitudSede = infoSede[9];


    let posicionCentral = { lat: latitudSede, lng: longitudSede };

    let opciones = {
        zoom: 16,
        center: posicionCentral,
        mapTypeControl: false

    }

    //Creacion de mapa
    let mapa = new google.maps.Map(document.getElementById('mapaSede'), opciones);

    //Marker
    let marker = new google.maps.Marker({
        position: posicionCentral,
        map: mapa,
    });
}
