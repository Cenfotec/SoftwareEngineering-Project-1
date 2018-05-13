// mostrarSedesAAsociar();
// mostrarCursosCarreraAAsociar();
// mostrarCursosActiAAsociar();
let horarioTempArr = getHorario();
let idiomasTempArr = getIdiomas();
mostrarDatos();
document.querySelector('#btnActualizar').addEventListener('click', obtenerDatosActualizar);
document.querySelector('#sltProvincia').addEventListener('change', llenarCanton);
document.querySelector('#sltCanton').addEventListener('change', llenarDistrito);

function mostrarDatos() {
  // mostrarSedesAAsociar();
  // mostrarCursosCarreraAAsociar();
  // mostrarCursosActiAAsociar();
  let idProfesor = getSession()[0];
  let listaProfesores = buscarProfesorPorId(idProfesor);

  let sNIdentificacion = document.querySelector('#txtNIdentificacion').value = listaProfesores[0];
  let sltTipoCedula = document.querySelector('#sltTipoCedula').value = listaProfesores[1];

  let sPNombre = document.querySelector('#txtPNombre').value = listaProfesores[2];
  let sSNombre = document.querySelector('#txtSNombre').value = listaProfesores[3];
  let sPApellido = document.querySelector('#txtPApellido').value = listaProfesores[4];
  let sSApellido = document.querySelector('#txtSApellido').value = listaProfesores[5];

  let sCorreoP = document.querySelector('#txtCorreoP').value = listaProfesores[6];
  let sCorreoS = document.querySelector('#txtCorreoS').value = listaProfesores[7];

  let sTelefonoP = document.querySelector('#txtTelefonoP').value = listaProfesores[8];
  let stelefonoS = document.querySelector('#txtTelefonoS').value = listaProfesores[9];

  let sContactoEmergencia = document.querySelector('#txtContactoEmergencia').value = listaProfesores[10];
  // FOTOGRAFIA

  let sProvincia = document.querySelector('#sltProvincia');
  for (let i = 1; i < sProvincia.length; i++) {
    if (sProvincia.options[i].value == listaProfesores[11]) {
      sProvincia.selectedIndex = i;
    }
  }
  llenarCanton();
  let sCanton = document.querySelector('#sltCanton');
  for (let i = 1; i < sCanton.length; i++) {
    if (sCanton.options[i].value == listaProfesores[12]) {
      sCanton.selectedIndex = i;
    }
  }
  llenarDistrito();
  let sDistrito = document.querySelector('#sltDistrito');
  for (let i = 1; i < sDistrito.length; i++) {
    if (sDistrito.options[i].value == listaProfesores[13]) {
      sDistrito.selectedIndex = i;
    }
  }


  let sDireccionExacta = document.querySelector('#txtDireccionExacta').value = listaProfesores[14];

  let sLugarTrabajo = document.querySelector('#txtLugarTrabajo').value = listaProfesores[15];
  let sAnosExperienciaLaboral = document.querySelector('#txtAnosExperienciaLaboral').value = listaProfesores[16];
  let sAnosExperienciaDocente = document.querySelector('#txtAnosExperienciaDocenteUniversitario').value = listaProfesores[17];

  let sltCapacitacionVirtual = document.querySelector('#sltCapacitacionVirtual').value = listaProfesores[18];
  let sltCapacitacionDocente = document.querySelector('#sltCapacitacionDocente').value = listaProfesores[19];
  let sltNivelIngles = document.querySelector('#sltNivelIngles').value = listaProfesores[20];
  let sltGradoAcademico = document.querySelector('#sltGradoAcademico').value = listaProfesores[21];

  let sEnfermedades = document.querySelector('#txtEnfermedades').value = listaProfesores[22];
  let sObservacionesGenerales = document.querySelector('#txtObservaciones').value = listaProfesores[23];


  // Radio & Select


  let sltHorario = document.querySelector('#sltHorario');
  let tiempoRadio = document.getElementsByName('tiempo');

  sltHorario.addEventListener('change', function(){
    mostrarHorario(sltHorario.selectedIndex);
  });
  document.querySelector('#manana').addEventListener('click', updateRadio1);
  document.querySelector('#tarde').addEventListener('click', updateRadio1);
  document.querySelector('#noche').addEventListener('click', updateRadio1);
  document.querySelector('#todoElDia').addEventListener('click', updateRadio2);
  document.querySelector('#virtual').addEventListener('click', updateRadio3);

  let sltIdioma = document.querySelector('#sltIdioma');
  for (let i = 0; i < getIdiomas().length; i++) {
    let option = document.createElement('option');
    option.text = getIdiomas()[i];
    sltIdioma.add(option);
  }

  let listaCheckboxCursosCarrera = document.querySelectorAll('#tblCursosCarrera tbody input[type=checkbox]');
  let cursosCarreraAsociados = listaProfesores[26];

  if (listaProfesores[26][0].length > 0) {
    for (let i = 0; i < listaCheckboxCursosCarrera.length; i++) {
      for (let j = 0; j < cursosCarreraAsociados.length; j++) {
        if (listaCheckboxCursosCarrera[i].dataset.codigo == cursosCarreraAsociados[0][0][j][0]) {
          listaCheckboxCursosCarrera[i].checked = true;
        }
      }
    }
  }

  let listaCheckboxCursosActi = document.querySelectorAll('#tblCursosActi tbody input[type=checkbox]');
  let cursosActiAsociados = listaProfesores[26];

  if (listaProfesores[26][1].length > 0) {
    for (let i = 0; i < listaCheckboxCursosActi.length; i++) {
      for (let j = 0; j < cursosActiAsociados.length; j++) {
        if (listaCheckboxCursosActi[i].dataset.codigo == cursosActiAsociados[1][0][j][0]) {
          listaCheckboxCursosActi[i].checked = true;
        }
      }
    }
  }

  let listaCheckboxSedes = document.querySelectorAll('#tblSedes tbody input[type=checkbox]');
  let sedesAsociadas = listaProfesores[27];

  for (let i = 0; i < listaCheckboxSedes.length; i++) {
    for (let j = 0; j < sedesAsociadas.length; j++) {
      if (listaCheckboxSedes[i].dataset.nombre == sedesAsociadas[j][0]) {
        listaCheckboxSedes[i].checked = true;
      }
    }
  }


}
function mostrarHorario(paDia) {
  let sltHorario = document.querySelector('#sltHorario');
  clearRadio();
  if (horarioTempArr[sltHorario.selectedIndex].length > 0) {
    let tiempoRadio = document.getElementsByName("tiempo");
    for (let i = 0; i < tiempoRadio.length; i++) {
      for (let j = 0; j < horarioTempArr[paDia][0].length; j++) {
        if (tiempoRadio[i].value == horarioTempArr[paDia][1][j]) {
          tiempoRadio[i].checked = true;
        }
      }
    }
  }
}
mostrarHorario(sltHorario.selectedIndex);

function mostrarHorario(paDia) {
  clearRadio();
  let sltHorario = document.querySelector('#sltHorario');
  if (horarioTempArr[sltHorario.selectedIndex].length > 0) {
    if (!horarioTempArr[0].length == 0 || !horarioTempArr[1].length == 0 || !horarioTempArr[2].length == 0
    || !horarioTempArr[3].length == 0 || !horarioTempArr[4].length == 0 || !horarioTempArr[5].length == 0) {
      let tiempoRadio = document.getElementsByName("tiempo");
      for (let i = 0; i < tiempoRadio.length; i++) {
        for (let j = 0; j < horarioTempArr[paDia][0].length; j++) {
          if (tiempoRadio[i].value == horarioTempArr[paDia][1][j]) {
            tiempoRadio[i].checked = true;
          }
        }
      }
      if(tiempoRadio[0].checked || tiempoRadio[1].checked || tiempoRadio[2].checked) {
        updateRadio1();
      }
      if(tiempoRadio[3].checked) {
        updateRadio2();
      }
      if(tiempoRadio[4].checked) {
        updateRadio3();
      }
    }
  }
}




function clearRadio() {
  let tiempoRadio = document.getElementsByName("tiempo");
  document.querySelector('#manana').disabled = false;
  document.querySelector('#tarde').disabled = false;
  document.querySelector('#noche').disabled = false;
  document.querySelector('#todoElDia').disabled = false;
  document.querySelector('#virtual').disabled = false;
  for (let i = 0; i < tiempoRadio.length; i++) {
    tiempoRadio[i].checked = false;
  }
}

function updateRadio1() {
  let tiempoRadio = document.getElementsByName("tiempo");
  if (tiempoRadio[0].checked || tiempoRadio[1].checked || tiempoRadio[2].checked || tiempoRadio[4].checked) {
    document.querySelector('#todoElDia').disabled = true;
    document.querySelector('#virtual').disabled = true;
  } else if (!tiempoRadio[0].checked && !tiempoRadio[1].checked && !tiempoRadio[2].checked) {
    document.querySelector('#todoElDia').disabled = false;
    document.querySelector('#virtual').disabled = false;
  }
}

function updateRadio2() {
  let tiempoRadio = document.getElementsByName("tiempo");
  if (tiempoRadio[3].checked) {
    document.querySelector('#manana').disabled = true;
    document.querySelector('#tarde').disabled = true;
    document.querySelector('#noche').disabled = true;
    document.querySelector('#virtual').disabled = true;
  } else if (!tiempoRadio[3].checked) {
    document.querySelector('#manana').disabled = false;
    document.querySelector('#tarde').disabled = false;
    document.querySelector('#noche').disabled = false;
    document.querySelector('#todoElDia').disabled = false;
    document.querySelector('#virtual').disabled = false;
  }
}

function updateRadio3() {
  let tiempoRadio = document.getElementsByName("tiempo");
  if (tiempoRadio[4].checked) {
      document.querySelector('#manana').disabled = true;
      document.querySelector('#tarde').disabled = true;
      document.querySelector('#noche').disabled = true;
      document.querySelector('#todoElDia').disabled = true;
  } else if (!tiempoRadio[4].checked) {
        document.querySelector('#manana').disabled = false;
        document.querySelector('#tarde').disabled = false;
        document.querySelector('#noche').disabled = false;
        document.querySelector('#todoElDia').disabled = false;
    }
}

















function obtenerDatosActualizar() {
  let profesor = buscarProfesorPorId(getSession()[0]);
  let bError = validarRegistro();
  if (!bError) {
    let aInfoProfesor = [];

    let sNIdentificacion = document.querySelector('#txtNIdentificacion').value;
    let sltTipoCedula = document.querySelector('#sltTipoCedula').value;

    let sPNombre = document.querySelector('#txtPNombre').value;
    let sSNombre = document.querySelector('#txtSNombre').value;
    let sPApellido = document.querySelector('#txtPApellido').value;
    let sSApellido = document.querySelector('#txtSApellido').value;

    let sCorreoP = document.querySelector('#txtCorreoP').value;
    let sCorreoS = document.querySelector('#txtCorreoS').value;

    let sTelefonoP = document.querySelector('#txtTelefonoP').value;
    let stelefonoS = document.querySelector('#txtTelefonoS').value;


    let sContactoEmergencia = document.querySelector('#txtContactoEmergencia').value;

    let sltProvincia = document.querySelector('#sltProvincia').value;
    let sltCanton = document.querySelector('#sltCanton').value;
    let sltDistrito = document.querySelector('#sltDistrito').value;

    let sDireccionExacta = document.querySelector('#txtDireccionExacta').value;
    let sLugarTrabajo = document.querySelector('#txtLugarTrabajo').value;
    let sAnosExperienciaLaboral = document.querySelector('#txtAnosExperienciaLaboral').value;
    let sAnosExperienciaDocente = document.querySelector('#txtAnosExperienciaDocenteUniversitario').value;

    let sltCapacitacionVirtual = document.querySelector('#sltCapacitacionVirtual').value;
    let sltCapacitacionDocente = document.querySelector('#sltCapacitacionDocente').value;
    let sltNivelIngles = document.querySelector('#sltNivelIngles').value;
    let sltGradoAcademico = document.querySelector('#sltGradoAcademico').value;

    let sEnfermedades = document.querySelector('#txtEnfermedades').value;
    let sObservacionesGenerales = document.querySelector('#txtObservaciones').value;

    let sHorario = horarioTempArr;
    let sCertificacion = getCertificaciones();
    let sSedes = guardarSedesAsociar();
    let sCursosCarrera = guardarCursosCarrera();
    let sCursosActi = guardarCursosActi();
    let sCursosPuedeImpartir = [sCursosCarrera, sCursosActi];
    let sIdiomas = idiomasTempArr;

    let sContrasenna = profesor[29];
    let sEstado = profesor[30];
    let sFotografia = getTempFotografiaPeril();

    let sContrasennaProbar = document.querySelector('#txtContrasenna').value;
    let sConfContrasenna = document.querySelector('#txtConfContrasenna').value;

    if (sContrasennaProbar != '') {
      if (validarContrasenna(sContrasennaProbar, sConfContrasenna)) {
        sContrasenna = sContrasennaProbar;
      } else {
        swal({
          title: "Modificación inválida",
          text: "La contraseña debe ser mínimo de 8 caracteres, tener 1 mayúscula, 1 número y 1 símbolo.",
          buttons: {
            confirm: "Aceptar",
          },
        });
        return;
      }
    }

    aInfoProfesor.push(sNIdentificacion, sltTipoCedula, sPNombre, sSNombre, sPApellido, sSApellido, sCorreoP, sCorreoS, sTelefonoP, stelefonoS, sContactoEmergencia, sltProvincia, sltCanton, sltDistrito, sDireccionExacta, sLugarTrabajo, sAnosExperienciaLaboral, sAnosExperienciaDocente, sltCapacitacionVirtual, sltCapacitacionDocente, sltNivelIngles, sltGradoAcademico, sEnfermedades, sObservacionesGenerales, sHorario, sCertificacion, sCursosPuedeImpartir, sSedes, sIdiomas, sContrasenna, sEstado, sFotografia);
    actualizarProfesor(aInfoProfesor);
    swal({
      title: "Profesor actualizado",
      text: "Los datos del profesor se actualizaron exitosamente.",
      buttons: {
        confirm: "Aceptar",
      },
    });
    setTimeout(function () {
      location.href = "visualizarPerfilProfesor.html";
    }, 1500);
  }else{
    swal({
      title: "Modificación inválida",
      text: "Por favor complete todos los espacios obligatorios marcados en rojo.",
      buttons: {
        cancel: "Aceptar",
      },
    });
  }
}




document.querySelector('#manana').addEventListener('change', actualizarHorario);
document.querySelector('#tarde').addEventListener('change', actualizarHorario);
document.querySelector('#noche').addEventListener('change', actualizarHorario);
document.querySelector('#todoElDia').addEventListener('change', actualizarHorario);
document.querySelector('#virtual').addEventListener('change', actualizarHorario);



function actualizarHorario() {
  let horario = [];
  let horarioTemp = [];
  let tiempoRadio = document.getElementsByName("tiempo");
  let tiempoChecked = [];

  for(let i = 0; i < tiempoRadio.length; i++) {
     if(tiempoRadio[i].checked)
         tiempoChecked.push(tiempoRadio[i].value);
   }
  let diaChecked = document.querySelector('#sltHorario').value;
  horarioTemp.push(diaChecked, tiempoChecked);
  horario.push(horarioTemp);
  let infoProfesor = buscarProfesorPorId(getProfesor()[0]);
  if (diaChecked == 'Lunes') {
    horarioTempArr[0] = [];
    horarioTempArr[0].push(diaChecked, tiempoChecked);
  }
  if (diaChecked == 'Martes') {
    horarioTempArr[1] = [];
    horarioTempArr[1].push(diaChecked, tiempoChecked);
  }
  if (diaChecked == 'Miércoles') {
    horarioTempArr[2] = [];
    horarioTempArr[2].push(diaChecked, tiempoChecked);
  }
  if (diaChecked == 'Jueves') {
    horarioTempArr[3] = [];
    horarioTempArr[3].push(diaChecked, tiempoChecked);
  }
  if (diaChecked == 'Viernes') {
    horarioTempArr[4] = [];
    horarioTempArr[4].push(diaChecked, tiempoChecked);
  }
  if (diaChecked == 'Sabado') {
    horarioTempArr[5] = [];
    horarioTempArr[5].push(diaChecked, tiempoChecked);
  }

}

function getHorario() {
  let listaHorario = buscarProfesorPorId(getSession()[0])[24];
  if (listaHorario == null) {
    listaHorario = [];
  }
  return listaHorario;
}











document.querySelector('#anadirIdioma').addEventListener('click', actualizarIdiomas);
document.querySelector('#eliminarIdioma').addEventListener('click', eliminarIdioma);

function actualizarIdiomas() {
  let sIdioma = document.querySelector('#txtIdiomaHabla').value;
  let infoProfesor = buscarProfesorPorId(getSession()[0]);

  let sltIdioma = document.querySelector('#sltIdioma');
  let option = document.createElement('option');
  option.text = sIdioma;
  let listaTemp = [];
  for (let i = 1; i < sltIdioma.length; i++) {
    listaTemp[i] = sltIdioma[i].value;
  }
  if (!listaTemp.includes(sIdioma)) {
    idiomasTempArr.push(sIdioma);
    sltIdioma.add(option);
  }
  document.querySelector('#txtIdiomaHabla').value = '';
}

function getIdiomas() {
  let listaIdiomas = buscarProfesorPorId(getSession()[0])[28];
  if (listaIdiomas == null) {
    listaIdiomas = [];
  }
  return listaIdiomas;
}

function eliminarIdioma() {
  let sltIdioma = document.querySelector('#sltIdioma');
  if (sltIdioma.selectedIndex != 0) {
    idiomasTempArr.splice(sltIdioma.selectedIndex-1, 1);
    sltIdioma.remove(sltIdioma.selectedIndex);
  }
}




















function mostrarSedesAAsociar() {
    let listaSedes = getListaSede();
    let cuerpoTabla = document.querySelector('#tblSedes tbody');

    cuerpoTabla.innerHTML = '';

    for (let i = 0; i < listaSedes.length; i++) {
          if (listaSedes[i][6] == true) {
              let fila = cuerpoTabla.insertRow();
              fila.dataset.nombre = listaSedes[i][0];
              //fila.addEventListener('click', visualizar);

              let checkSeleccion = document.createElement('input');
              checkSeleccion.setAttribute('type', 'checkbox');
              checkSeleccion.dataset.nombre = listaSedes[i][0];

              let cSeleccion = fila.insertCell();
              let cNombreSede = fila.insertCell();

              let sNombreSede = document.createTextNode(listaSedes[i][0]);

              cSeleccion.appendChild(checkSeleccion);
              cNombreSede.appendChild(sNombreSede);
            }

    }
}

function guardarSedesAsociar() {
    let listaCheckboxSedes = document.querySelectorAll('#tblSedes tbody input[type=checkbox]:checked');
    let sedesSeleccionadas = [];
    let infoSede;

    //Este ciclo for debe empezar en 1, ya que en el cero "0" se encuentra el id unico del elemento al que se le desea agregar elementos
    for (let i = 0; i < listaCheckboxSedes.length; i++) {
        infoSede = listaCheckboxSedes[i].dataset.nombre;
        sedesSeleccionadas.push(buscarSedePorNombre(infoSede));
    }

    return sedesSeleccionadas;


}

























function mostrarCursosCarreraAAsociar() {
    let listaCursosCarrera = getListaCursos();
    let cuerpoTabla = document.querySelector('#tblCursosCarrera tbody');

    cuerpoTabla.innerHTML = '';

    for (let i = 0; i < listaCursosCarrera.length; i++) {
          if (listaCursosCarrera[i][6] == true) {
              let fila = cuerpoTabla.insertRow();
              fila.dataset.id = listaCursosCarrera[i][0];
              //fila.addEventListener('click', visualizar);

              let checkSeleccion = document.createElement('input');
              checkSeleccion.setAttribute('type', 'checkbox');
              checkSeleccion.dataset.id = listaCursosCarrera[i][0];

              let cSeleccion = fila.insertCell();
              let cNombreCursoCarrera = fila.insertCell();

              let sNombreCursoCarrera = document.createTextNode(listaCursosCarrera[i][1]);

              cSeleccion.appendChild(checkSeleccion);
              cNombreCursoCarrera.appendChild(sNombreCursoCarrera);
            }
    }
}

function guardarCursosCarrera() {
    let listaCheckboxCursosCarrera = document.querySelectorAll('#tblCursosCarrera tbody input[type=checkbox]:checked');
    let cursosCarreraSeleccionadas = [];
    let infoCursoCarrera;

    //Este ciclo for debe empezar en 1, ya que en el cero "0" se encuentra el id unico del elemento al que se le desea agregar elementos
    for (let i = 0; i < listaCheckboxCursosCarrera.length; i++) {
        infoCursoCarrera = listaCheckboxCursosCarrera[i].dataset.id;
        cursosCarreraSeleccionadas.push(buscarCursoPorCod(infoCursoCarrera));
    }
    return cursosCarreraSeleccionadas;
}
















function mostrarCursosActiAAsociar() {
    let listaCursosActi = getListaCursosActii();
    let cuerpoTabla = document.querySelector('#tblCursosActi tbody');

    cuerpoTabla.innerHTML = '';

    for (let i = 0; i < listaCursosActi.length; i++) {
          if (listaCursosActi[i][4] == true) {
              let fila = cuerpoTabla.insertRow();
              fila.dataset.id = listaCursosActi[i][0];
              //fila.addEventListener('click', visualizar);

              let checkSeleccion = document.createElement('input');
              checkSeleccion.setAttribute('type', 'checkbox');
              checkSeleccion.dataset.id = listaCursosActi[i][0];

              let cSeleccion = fila.insertCell();
              let cNombreCursoActi = fila.insertCell();

              let sNombreCursoActi = document.createTextNode(listaCursosActi[i][1]);

              cSeleccion.appendChild(checkSeleccion);
              cNombreCursoActi.appendChild(sNombreCursoActi);
            }
    }
}

function guardarCursosActi() {
    let listaCheckboxCursosActi = document.querySelectorAll('#tblCursosActi tbody input[type=checkbox]:checked');
    let cursosActiSeleccionadas = [];
    let infoCursoActi;

    //Este ciclo for debe empezar en 1, ya que en el cero "0" se encuentra el id unico del elemento al que se le desea agregar elementos
    for (let i = 0; i < listaCheckboxCursosActi.length; i++) {
        infoCursoActi = listaCheckboxCursosActi[i].dataset.id;
        cursosActiSeleccionadas.push(buscarCursoActiiPorCod(infoCursoActi));
    }
    return cursosActiSeleccionadas;
}








// Validación de contraseña
let txtContrasenna = document.querySelector('#txtContrasenna');
let txtConfContrasenna = document.querySelector('#txtConfContrasenna');

function validarContrasenna(pContrasenna, pConfContrasenna){
  let bAprobada = false;
  let bMin = false, bMay = false, bNum = false, bChar = false;
  let letrasMinusculas = "abcdefghijklmnñopqrstuvwxyz";
  let letrasMayusculas = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
  let numeros = "0123456789";
  let caracteres = "@|°¬¡!¿?\\\"#$%&/()='*-+.~{}[]<>_";

  let passwordArray = pContrasenna.split('');

  if (pContrasenna == pConfContrasenna && pContrasenna.length >= 8 && pContrasenna.length <= 64) {
    for (let i = 0; i < letrasMinusculas.length; i++) {
      if (passwordArray.includes(letrasMinusculas[i])) {
        bMin = true;
      }
    }
    for (let j = 0; j < letrasMayusculas.length; j++) {
      if (passwordArray.includes(letrasMayusculas[j])) {
        bMay = true;
      }
    }
    for (let k = 0; k < numeros.length; k++) {
      if (passwordArray.includes(numeros[k])) {
        bNum = true;
      }
    }
    for (let l = 0; l < caracteres.length; l++) {
      if (passwordArray.includes(caracteres[l])) {
        bChar = true;
      }
    }
    if (bMin && bMay && bNum && bChar) {
      bAprobada = true;
    }
  }
  return bAprobada

}

txtContrasenna.addEventListener('keyup', verificarContrasenna);

// Verificar de input
function verificarContrasenna() {
  if (txtContrasenna.value != '') {
    txtConfContrasenna.setAttribute('required', 'true');
  } else {
    txtConfContrasenna.removeAttribute('required', 'false');
  }
}
