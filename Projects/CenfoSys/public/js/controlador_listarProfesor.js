//Llamadas de funciónes
let mostraStatus = true;
mostrarProfesores();
document.querySelector('#txtBuscar').addEventListener('keyup', mostrarProfesores);

let botonDesactivados = document.querySelector('#btnDesactivados');
botonDesactivados.addEventListener('click', mostrarProfesoresDesactivados);

let botonActivados = document.querySelector('#btnActivados');
botonActivados.addEventListener('click', mostrarProfesoresActivados);

botonActivados.classList.add('ocultar');
mostrarProfesoresActivados();

//Búsqueda de datos por identificación, llamada de funciones y listado de profesores
function mostrarProfesores() {
  if (mostraStatus) {
    mostrarProfesoresActivados();
  } else {
    mostrarProfesoresDesactivados();
  }
}
//Se almacena un (1) profesor en localStorage por medio del id
function editar() {
  let idProfesor = this.dataset.id;
  let profesor = buscarProfesorPorId(idProfesor);
  setProfesor(profesor);
  guardarID(idProfesor);
  location.href = "modificarProfesor.html";
}

//Desactiva un profesor de la lista
function desactivar() {
  let idProfesor = this.dataset.id;
  let profesor = buscarProfesorPorId(idProfesor);
  profesor[30] = false;

  swal({
    title: "Desactivar profesor",
    text: "¿Está seguro que desea desactivar este profesor?",
    buttons: ["Cancelar", "Aceptar"],
  }).then((willDelete) => {
    if (willDelete) {
      actualizarProfesor(profesor);
      mostrarProfesoresActivados();
    }
  });
}

//Activa un profesor de la lista
function activar() {
  let idProfesor = this.dataset.id;
  let profesor = buscarProfesorPorId(idProfesor);
  profesor[30] = true;

  swal({
    title: "Activar profesor",
    text: "¿Está seguro que desea activar este profesor?",
    buttons: ["Cancelar", "Aceptar"],
  }).then((willDelete) => {
    if (willDelete) {
      actualizarProfesor(profesor);
      mostrarProfesoresDesactivados();
    }
  });

}

function modificarCertificacion() {
  let idProfesor = this.dataset.id;
  let profesor = buscarProfesorPorId(idProfesor);
  guardarID(idProfesor);
  if (profesor[25].length == 0) {
    location.href = "registrarCertificacion.html";
    return;
  }
  setProfesor(profesor);
  location.href = "modificarCertificacion.html";
}

function mostrarProfesoresDesactivados() {
  mostraStatus = false;
  botonActivados.classList.remove('ocultar');
  botonDesactivados.classList.add('ocultar');

  let sBuscar = document.querySelector('#txtBuscar').value;
  let listaProfesores = getListaProfesores();
  let cuerpoTabla = document.querySelector('#tblProfesores tbody');

  cuerpoTabla.innerHTML = '';

  for (let i = 0; i < listaProfesores.length; i++) {

    if (listaProfesores[i][0].toLowerCase().includes(sBuscar.toLowerCase())) {

      if (listaProfesores[i][30] == false) {
        let fila = cuerpoTabla.insertRow();

        let botonEditar = document.createElement('button');
        botonEditar.dataset.id = listaProfesores[i][0];
        botonEditar.classList.add('botonNormal');
        botonEditar.classList.add('botonEditar');
        botonEditar.classList.add('botonTabla');
        botonEditar.setAttribute('data-tooltip', 'Editar');
        botonEditar.addEventListener('click', editar);

        let botonDesactivar = document.createElement('button');
        botonDesactivar.dataset.id = listaProfesores[i][0];
        botonDesactivar.classList.add('botonDesactivar');
        botonDesactivar.classList.add('botonTabla');
        botonDesactivar.setAttribute('data-tooltip', 'Desactivar');
        botonDesactivar.addEventListener('click', desactivar);

        let botonActivar = document.createElement('button');
        botonActivar.dataset.id = listaProfesores[i][0];
        botonActivar.classList.add('botonActivar');
        botonActivar.classList.add('botonTabla');
        botonActivar.setAttribute('data-tooltip', 'Activar');
        botonActivar.addEventListener('click', activar);

        let botonCertificaciones = document.createElement('button');
        botonCertificaciones.dataset.id = listaProfesores[i][0];
        botonCertificaciones.classList.add('botonCertificaciones');
        botonCertificaciones.classList.add('botonTabla');
        botonCertificaciones.setAttribute('data-tooltip', 'Certificaciones');
        botonCertificaciones.addEventListener('click', modificarCertificacion);

        if (!listaProfesores[i][30]) {
          botonDesactivar.classList.add('ocultar');
        } else {
          botonActivar.classList.add('ocultar');
        }

        let cConfiguración = fila.insertCell();
        let cIdentificacion = fila.insertCell();
        cIdentificacion.dataset.id = listaProfesores[i][0];
        cIdentificacion.setAttribute('data-tooltip', 'Ver profesor');
        cIdentificacion.classList.add('tooltip-bottom');
        cIdentificacion.addEventListener('click', visualizar);
        let cPNombre = fila.insertCell();
        let cPApellido = fila.insertCell();
        let cCorreo = fila.insertCell();
        let cTelefono = fila.insertCell();

        let sIdentificacion = document.createTextNode(listaProfesores[i][0]);
        let sPNombre = document.createTextNode(listaProfesores[i][2]);
        let sPApellido = document.createTextNode(listaProfesores[i][4]);
        let sCorreo = document.createTextNode(listaProfesores[i][6])
        let sTelefono = document.createTextNode(listaProfesores[i][8]);

        cConfiguración.appendChild(botonEditar);
        cConfiguración.appendChild(botonDesactivar);
        cConfiguración.appendChild(botonActivar);
        cConfiguración.appendChild(botonCertificaciones);
        cIdentificacion.appendChild(sIdentificacion);
        cPNombre.appendChild(sPNombre);
        cPApellido.appendChild(sPApellido);
        cCorreo.appendChild(sCorreo);
        cTelefono.appendChild(sTelefono);
      }
    }
  }
}

document.querySelector('#divPersonal').addEventListener('click', showPersonalInformation);
document.querySelector('#divProfessional').addEventListener('click', showProfessionalInformation);
let bShowInformation = true;

function showPersonalInformation() {
  if (!bShowInformation) {
    document.querySelector('#personalInformation').classList.remove('ocultar');
    document.querySelector('#professionalInformation').classList.add('ocultar');

    document.querySelector('#divPersonal').classList.add('selectInformationActive');
    document.querySelector('#divPersonal').classList.remove('selectInformationInactive');

    document.querySelector('#divProfessional').classList.remove('selectInformationActive');
    document.querySelector('#divProfessional').classList.add('selectInformationInactive');
    bShowInformation = true;
  }
}

function showProfessionalInformation() {
  if (bShowInformation) {
    document.querySelector('#personalInformation').classList.add('ocultar');
    document.querySelector('#professionalInformation').classList.remove('ocultar');

    document.querySelector('#divPersonal').classList.remove('selectInformationActive');
    document.querySelector('#divPersonal').classList.add('selectInformationInactive');

    document.querySelector('#divProfessional').classList.add('selectInformationActive');
    document.querySelector('#divProfessional').classList.remove('selectInformationInactive');
    bShowInformation = false;
  }
}

function insert(str, index, value) {
  return str.substr(0, index) + value + str.substr(index);
}

function visualizar() {
  let idProfesor = this.dataset.id;
  let profesor = buscarProfesorPorId(idProfesor);
  guardarID(idProfesor);
  openModal()

  document.querySelector('#imgPerfil').src = 'http://res.cloudinary.com/pbonillag/image/upload/' + profesor[31] + '.png';
  document.querySelector('#lblIdentificacion').innerHTML = profesor[0] + " (" + profesor[1] + ")";
  document.querySelector('#lblNombre').innerHTML = profesor[2] + ' ' + profesor[3] + ' ' + profesor[4] + ' ' + profesor[5];
  document.querySelector('#lblResidencia').innerHTML = profesor[13] + ', ' + profesor[12] + ', ' + profesor[11];
  document.querySelector('#lblEmailP').innerHTML = profesor[6];
  if (profesor[7] != '') {
    document.querySelector('#lblEmailS').innerHTML = profesor[7];
  } else {
    document.querySelector('#lblEmailS').innerHTML = 'Ninguno';
  }
  let phoneP = profesor[8].split('');
  phoneP[8] = phoneP[7];
  phoneP[7] = phoneP[6];
  phoneP[6] = phoneP[5];
  phoneP[5] = phoneP[4];
  phoneP[4] = phoneP[3];
  phoneP[4] = '-';
  document.querySelector('#lblTelefonoP').innerHTML = phoneP.join('');
  if (profesor[9] != '') {
    let phoneS = profesor[9].split('');
    phoneS[8] = phoneS[7];
    phoneS[7] = phoneS[6];
    phoneS[6] = phoneS[5];
    phoneS[5] = phoneS[4];
    phoneS[4] = phoneS[3];
    phoneS[4] = '-';
    document.querySelector('#lblTelefonoS').innerHTML = phoneS.join('');
  } else {
    document.querySelector('#lblTelefonoS').innerHTML = 'Ninguno';
  }
  let phoneE = profesor[10].split('');
  phoneE[8] = phoneE[7];
  phoneE[7] = phoneE[6];
  phoneE[6] = phoneE[5];
  phoneE[5] = phoneE[4];
  phoneE[4] = phoneE[3];
  phoneE[4] = '-';
  document.querySelector('#lblContactoEmergencia').innerHTML = phoneE.join('');
  document.querySelector('#lblDireccionExacta').innerHTML = profesor[14];

  document.querySelector('#lblLugarTrabajo').innerHTML = profesor[15];
  document.querySelector('#lblAnosExperienciaLaboral').innerHTML = profesor[16] + ' años';
  document.querySelector('#lblAnosExperienciaDocenteUniversitario').innerHTML = profesor[17] + ' años';
  document.querySelector('#lblCapacitacionVirtual').innerHTML = profesor[18].charAt(0).toUpperCase() + profesor[18].charAt(1);
  document.querySelector('#lblCapacitacionDocente').innerHTML = profesor[19].charAt(0).toUpperCase() + profesor[19].charAt(1);
  document.querySelector('#lblNivelIngles').innerHTML = profesor[20];
  document.querySelector('#lblGradoAcademico').innerHTML = profesor[21];
  if (profesor[22] != '') {
    document.querySelector('#lblEnfermedades').innerHTML = profesor[22];
  } else {
    document.querySelector('#lblEnfermedades').innerHTML = 'Ninguna';
  }
  if (profesor[23] != '') {
    document.querySelector('#lblObservaciones').innerHTML = profesor[23];
  } else {
    document.querySelector('#lblObservaciones').innerHTML = 'Ninguna';
  }
  if (profesor[28].length != 0) {
    let idiomas = "";
    for (let i = 0; i < profesor[28].length; i++) {
      idiomas += profesor[28][i] + ", ";
    }
    document.querySelector('#lblIdiomas').innerHTML = idiomas.slice(0, -2);
  } else {
    document.querySelector('#lblIdiomas').innerHTML = 'Ninguno';
  }

  let listaHorario = getHorario();
  let lunes = '';
  let martes = '';
  let miercoles = '';
  let jueves = '';
  let viernes = '';
  let sabado = '';

  document.querySelector('#lblLunes').innerHTML = '';
  document.querySelector('#lblMartes').innerHTML = '';
  document.querySelector('#lblMiercoles').innerHTML = '';
  document.querySelector('#lblJueves').innerHTML = '';
  document.querySelector('#lblViernes').innerHTML = '';
  document.querySelector('#lblSabado').innerHTML = '';

  if (listaHorario[0].length > 0 && listaHorario[0][1].length > 0) {
    for (let i = 0; i < listaHorario[0][1].length; i++) {
      lunes += listaHorario[0][1][i] + ', ';
    }
    document.querySelector('#lblLunes').innerHTML = lunes.slice(0, -2);
  } else {
    document.querySelector('#lblLunes').innerHTML = "Sin horario";
  }

  if (listaHorario[1].length > 0 && listaHorario[1][1].length > 0) {
    for (let i = 0; i < listaHorario[1][1].length; i++) {
      martes += listaHorario[1][1][i] + ', ';
    }
    document.querySelector('#lblMartes').innerHTML = martes.slice(0, -2);
  } else {
    document.querySelector('#lblMartes').innerHTML = "Sin horario";
  }

  if (listaHorario[2].length > 0 && listaHorario[2][1].length > 0) {
    for (let i = 0; i < listaHorario[2][1].length; i++) {
      miercoles += listaHorario[2][1][i] + ', ';
    }
    document.querySelector('#lblMiercoles').innerHTML = miercoles.slice(0, -2);
  } else {
    document.querySelector('#lblMiercoles').innerHTML = "Sin horario";
  }

  if (listaHorario[3].length > 0 && listaHorario[3][1].length > 0) {
    for (let i = 0; i < listaHorario[3][1].length; i++) {
      jueves += listaHorario[3][1][i] + ', ';
    }
    document.querySelector('#lblJueves').innerHTML = jueves.slice(0, -2);
  } else {
    document.querySelector('#lblJueves').innerHTML = "Sin horario";
  }

  if (listaHorario[4].length > 0 && listaHorario[4][1].length > 0) {
    for (let i = 0; i < listaHorario[4][1].length; i++) {
      viernes += listaHorario[4][1][i] + ', ';
    }
    document.querySelector('#lblViernes').innerHTML = viernes.slice(0, -2);
  } else {
    document.querySelector('#lblViernes').innerHTML = "Sin horario";
  }

  if (listaHorario[5].length > 0 && listaHorario[5][1].length > 0) {
    for (let i = 0; i < listaHorario[5][1].length; i++) {
      sabado += listaHorario[5][1][i] + ', ';
    }
    document.querySelector('#lblSabado').innerHTML = sabado.slice(0, -2);
  } else {
    document.querySelector('#lblSabado').innerHTML = "Sin horario";
  }


  // updateAll();
  mostrarCertificaciones();
  // mostrarCursosPuedeImpartir();
  mostrarSedes();
  // mostrarIdiomas();
  // clearEvaluaciones();
  mostrarEvaluaciones();
  mostrarCursosCarreraQueImparte();
  mostrarCursosActiAsignados();

  return false;
}

function updateAll() {
  let sltHorario = document.querySelector('#sltHorario');
  sltHorario.addEventListener('change', function () {
    mostrarHorario(sltHorario.selectedIndex);
  });
  mostrarHorario(sltHorario.selectedIndex);
}

function mostrarHorario(paDia) {
  let sltHorario = document.querySelector('#sltHorario');
  clearRadio();
  if (buscarProfesorPorId(getID())[24][sltHorario.selectedIndex].length > 0) {
    let tiempoRadio = document.getElementsByName("tiempo");
    for (let i = 0; i < tiempoRadio.length; i++) {
      for (let j = 0; j < getHorario()[paDia][1].length; j++) {
        if (tiempoRadio[i].value == getHorario()[paDia][1][j]) {
          tiempoRadio[i].checked = true;
        }
      }
    }
  }
}

function clearRadio() {
  let tiempoRadio = document.getElementsByName("tiempo");
  document.querySelector('#manana').disabled = true;
  document.querySelector('#tarde').disabled = true;
  document.querySelector('#noche').disabled = true;
  document.querySelector('#todoElDia').disabled = true;
  document.querySelector('#virtual').disabled = true;
  for (let i = 0; i < tiempoRadio.length; i++) {
    tiempoRadio[i].checked = false;
  }
}

function getHorario() {
  let listaHorario = buscarProfesorPorId(getID())[24];
  if (listaHorario == null) {
    listaHorario = [];
  }
  return listaHorario;
}



























function mostrarCertificaciones() {
  let listaCertificaciones = getCertificaciones();
  let cuerpoTabla = document.querySelector('#tblCertificaciones tbody');
  cuerpoTabla.innerHTML = '';

  for (let i = 0; i < listaCertificaciones.length; i++) {
    let fila = cuerpoTabla.insertRow();
    let cFecha = fila.insertCell();
    let cCertificacion = fila.insertCell();
    let cCodigo = fila.insertCell();

    let sFecha = document.createTextNode(listaCertificaciones[i][2]);
    let sCertificacion = document.createTextNode(listaCertificaciones[i][1]);
    let sCodigo = document.createTextNode(listaCertificaciones[i][0]);

    cFecha.appendChild(sFecha);
    cCertificacion.appendChild(sCertificacion);
    cCodigo.appendChild(sCodigo);
  }
}

function getCertificaciones() {
  let listaCertificaciones = buscarProfesorPorId(getID())[25];
  if (listaCertificaciones == null) {
    listaCertificaciones = [];
  }
  return listaCertificaciones;
}

function mostrarCursosPuedeImpartir() {
  let listaCursosCarreraPuedeImpartir = buscarProfesorPorId(getID())[26][0];
  let listaCursosActiPuedeImpartir = buscarProfesorPorId(getID())[26][1];
  let cuerpoTabla = document.querySelector('#tblCursosPuedeImpartir tbody');
  cuerpoTabla.innerHTML = '';

  for (let i = 0; i < listaCursosCarreraPuedeImpartir.length; i++) {
    let fila = cuerpoTabla.insertRow();
    let cCursosCarreraPuedeImpartir = fila.insertCell();
    let sCursosCarreraPuedeImpartir = document.createTextNode(listaCursosCarreraPuedeImpartir[i][1]);
    cCursosCarreraPuedeImpartir.appendChild(sCursosCarreraPuedeImpartir);
  }

  for (let i = 0; i < listaCursosActiPuedeImpartir.length; i++) {
    let fila = cuerpoTabla.insertRow();
    let cCursoActiPuedeImpartir = fila.insertCell();
    let sCursoActiPuedeImpartir = document.createTextNode(listaCursosActiPuedeImpartir[i][1]);
    cCursoActiPuedeImpartir.appendChild(sCursoActiPuedeImpartir);
  }
}

function mostrarSedes() {
  let idProfesor = getID();
  let listaSedes = getListaSede();
  let cuerpoTabla = document.querySelector('#tblSedesAsociadas tbody');
  cuerpoTabla.innerHTML = '';



  for (let i = 0; i < listaSedes.length; i++) {
    for (let k = 0; k < listaSedes[i][10].length; k++) {
      if (listaSedes[i][10][k] == idProfesor) {
        let fila = cuerpoTabla.insertRow();

        let cSede = fila.insertCell();
        let cTipo = fila.insertCell();

        let sSede = document.createTextNode(listaSedes[i][0]);
        let sTipo = document.createTextNode(listaSedes[i][1].charAt(0).toUpperCase() + listaSedes[i][1].slice(1));

        cSede.appendChild(sSede);
        cTipo.appendChild(sTipo);
      }
    }
  }
}

function mostrarIdiomas() {
  let listaIdiomas = buscarProfesorPorId(getID())[28];
  let cuerpoTabla = document.querySelector('#tblIdiomas tbody');
  cuerpoTabla.innerHTML = '';

  for (let i = 0; i < listaIdiomas.length; i++) {
    let fila = cuerpoTabla.insertRow();
    let cIdioma = fila.insertCell();
    let sIdioma = document.createTextNode(listaIdiomas[i]);
    cIdioma.appendChild(sIdioma);
  }
}

//Muestra una tabla de los cursos de carrera que imparte el profesor
function mostrarCursosCarreraQueImparte() {
  let listaPeriodos = getListaPeriodos();
  let idProfesor = getID();
  let cuerpoTabla = document.querySelector('#tblPeriodosAsociados tbody');
  cuerpoTabla.innerHTML = '';

  for (let i = 0; i < listaPeriodos.length; i++) {

    for (let j = 0; j < listaPeriodos[i][4].length; j++) {

      for (let k = 0; k < listaPeriodos[i][4][j][1].length; k++) {
        if ((listaPeriodos[i][4][j][1][k] == idProfesor) && (listaPeriodos[i][2] == true)) {



          let fila = cuerpoTabla.insertRow();

          let cCurso = fila.insertCell();
          let cCuatrimestre = fila.insertCell();
          let cAnno = fila.insertCell();


          let sCurso = document.createTextNode(listaPeriodos[i][4][j][0]);
          let sCuatrimestre = document.createTextNode(listaPeriodos[i][0]);
          let sAnno = document.createTextNode(listaPeriodos[i][1]);



          cCurso.appendChild(sCurso);
          cCuatrimestre.appendChild(sCuatrimestre);
          cAnno.appendChild(sAnno);

        }

      }

    }

  }

}




//Muestra una tabla de los cursos de carrera que imparte el profesor
function mostrarCursosActiAsignados() {
  let listaCursosActi = getListaCursosActii();
  let idProfesor = getID();
  let cuerpoTabla = document.querySelector('#tblCursosActiiAsignados tbody');
  cuerpoTabla.innerHTML = '';


  for (let i = 0; i < listaCursosActi.length; i++) {
    for (let l = 0; l < listaCursosActi[i][6].length; l++) {
      if (listaCursosActi[i][6][l] == idProfesor) {

        let fila = cuerpoTabla.insertRow();

        let cCursoActi = fila.insertCell();
        let cInicio = fila.insertCell();
        let cFin = fila.insertCell();

        let sCursoActi = document.createTextNode(listaCursosActi[i][1]);
        let sInicio = document.createTextNode(listaCursosActi[i][7]);
        let sFin = document.createTextNode(listaCursosActi[i][8]);

        cCursoActi.appendChild(sCursoActi);
        cInicio.appendChild(sInicio);
        cFin.appendChild(sFin);

      }
    }
  }
}




function mostrarEvaluaciones() {
  clearEvaluaciones();
  let listaEvaluaciones = getEvaluaciones();
  let cuerpoTabla = document.querySelector('#tblEvaluaciones tbody');
  let profesorRating = document.querySelector('#profesorRating');
  let profesorRating2 = document.querySelector('#profesorRating2');
  let promedioGeneral = document.querySelector('#promedioGeneral');
  let rating = 0, promedio = 0, amount = 0;
  cuerpoTabla.innerHTML = '';

  for (let i = 0; i < listaEvaluaciones.length; i++) {


    if (listaEvaluaciones[i][3][0] == getID()) {



      let fila = cuerpoTabla.insertRow();
      let cPeriodo = fila.insertCell();
      let cCurso = fila.insertCell();
      let cNota = fila.insertCell();
      let cObservaciones = fila.insertCell();

      let sPeriodo = document.createTextNode(listaEvaluaciones[i][0] + "/ " + listaEvaluaciones[i][1]);
      let sCurso = document.createTextNode(buscarCursoPorCod(listaEvaluaciones[i][2])[1]);
      let sNota = document.createTextNode(listaEvaluaciones[i][3][1]);
      let sObservaciones = document.createTextNode(listaEvaluaciones[i][3][2]);

      cPeriodo.appendChild(sPeriodo);
      cCurso.appendChild(sCurso);
      cNota.appendChild(sNota);
      cObservaciones.appendChild(sObservaciones);

      rating += Number(listaEvaluaciones[i][3][1]);
      amount += 1;
      // <i class="far fa-star"></i>
      // <i class="far fa-star-half"></i>
    }


  }
  if (!rating > 0) {
    promedio = 0;
  } else {
    promedio = (rating / 10) / amount;
  }

  for (let j = 0; j < Math.floor(promedio); j++) {
    profesorRating.innerHTML += '<i class="fas fa-star"></i>';
  }
  for (let k = 0; k < 10 - Math.floor(promedio); k++) {
    profesorRating2.innerHTML += '<i class="fas fa-star"></i>';
  }
  promedioGeneral.innerHTML += '' + promedio + '/10';
}

function clearEvaluaciones() {
  profesorRating.innerHTML = '';
  profesorRating2.innerHTML = '';
  promedioGeneral.innerHTML = '';
}










































function mostrarProfesoresActivados() {
  mostraStatus = true;
  let botonActivados = document.querySelector('#btnActivados');
  botonActivados.classList.add('ocultar');

  let botonDesactivados = document.querySelector('#btnDesactivados');
  botonDesactivados.classList.remove('ocultar');

  let sBuscar = document.querySelector('#txtBuscar').value;
  let listaProfesores = getListaProfesores();
  let cuerpoTabla = document.querySelector('#tblProfesores tbody');

  cuerpoTabla.innerHTML = '';

  for (let i = 0; i < listaProfesores.length; i++) {

    if (listaProfesores[i][0].toLowerCase().includes(sBuscar.toLowerCase())) {
      if (listaProfesores[i][30] == true) {
        let fila = cuerpoTabla.insertRow();


        let botonEditar = document.createElement('button');
        // let botonEditar = document.createElement('i');
        // botonEditar.classList.add('far');
        // botonEditar.classList.add('fa-edit');
        botonEditar.dataset.id = listaProfesores[i][0];
        botonEditar.classList.add('botonEditar');
        botonEditar.classList.add('botonTabla');
        botonEditar.setAttribute('data-tooltip', 'Editar');
        botonEditar.addEventListener('click', editar);

        let botonDesactivar = document.createElement('button');
        botonDesactivar.dataset.id = listaProfesores[i][0];
        botonDesactivar.classList.add('botonDesactivar');
        botonDesactivar.classList.add('botonTabla');
        botonDesactivar.setAttribute('data-tooltip', 'Desactivar');
        botonDesactivar.addEventListener('click', desactivar);

        let botonActivar = document.createElement('button');
        botonActivar.dataset.id = listaProfesores[i][0];
        botonActivar.classList.add('botonActivar');
        botonActivar.classList.add('botonTabla');
        botonActivar.setAttribute('data-tooltip', 'Activar');
        botonActivar.addEventListener('click', activar);

        let botonCertificaciones = document.createElement('button');
        botonCertificaciones.dataset.id = listaProfesores[i][0];
        botonCertificaciones.classList.add('botonCertificaciones');
        botonCertificaciones.classList.add('botonTabla');
        botonCertificaciones.setAttribute('data-tooltip', 'Certificaciones');
        botonCertificaciones.addEventListener('click', modificarCertificacion);

        if (!listaProfesores[i][30]) {
          botonDesactivar.classList.add('ocultar');
        } else {
          botonActivar.classList.add('ocultar');
        }

        let cConfiguración = fila.insertCell();
        let cIdentificacion = fila.insertCell();
        cIdentificacion.dataset.id = listaProfesores[i][0];
        cIdentificacion.setAttribute('data-tooltip', 'Ver profesor');
        cIdentificacion.classList.add('tooltip-bottom');
        cIdentificacion.addEventListener('click', visualizar);
        let cPNombre = fila.insertCell();
        let cPApellido = fila.insertCell();
        let cCorreo = fila.insertCell();
        let cTelefono = fila.insertCell();

        let sIdentificacion = document.createTextNode(listaProfesores[i][0]);
        let sPNombre = document.createTextNode(listaProfesores[i][2]);
        let sPApellido = document.createTextNode(listaProfesores[i][4]);
        let sCorreo = document.createTextNode(listaProfesores[i][6])
        let sTelefono = document.createTextNode(listaProfesores[i][8]);

        cConfiguración.appendChild(botonEditar);
        cConfiguración.appendChild(botonDesactivar);
        cConfiguración.appendChild(botonActivar);
        cConfiguración.appendChild(botonCertificaciones);
        cIdentificacion.appendChild(sIdentificacion);
        cPNombre.appendChild(sPNombre);
        cPApellido.appendChild(sPApellido);
        cCorreo.appendChild(sCorreo);
        cTelefono.appendChild(sTelefono);
      }
    }
  }
}
