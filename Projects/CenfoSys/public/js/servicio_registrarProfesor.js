// Almacenado de datos
function setListaProfesores(paInfoProfesor) {
  let listaProfesores = getListaProfesores();
  listaProfesores.push(paInfoProfesor);
  localStorage.setItem('profesoresLS', JSON.stringify(listaProfesores));
  setUsuarios();
}

// Obtención de datos
function getListaProfesores() {
  let listaProfesores = JSON.parse(localStorage.getItem('profesoresLS'));
  if (listaProfesores == null) {
    listaProfesores = [
      ["303600144", "Nacional", "Kimberly", "", "Bonilla", "", "kbonillag@ucenfotec.ac.cr", "", "70192499", "", "22823438", "San José", "San José", "Catedral", "San José, Plaza Víquez, detrás del estadio Antonio Escarre, frente al colegio de Geólogos de Costa Rica.", "Cenfotec", "3", "2", "no", "si", "C1", "Bachillerato", "", "El mejor profesor.", [["Lunes", ["tarde", "noche"]], ["Martes", ["tarde"]], ["Miércoles", ["noche"]], ["Jueves", ["noche"]], ["Viernes", ["todo el día"]], ["Sabado", ["mañana"]]], [["2016-04-24", "Scrum Master", "001"], ["2014-04-16", "Base de datos", "002"], ["2010-03-10", "Certificación CISCO", "0553212"]], [[], []], [], ["Francés", "Inglés"], "1234", true, "audaq6qqr5v6ispj4oua"],
      ["111510526", "Nacional", "Claudio", "", "Borjas", "", "cborjas@ucenfotec.ac.cr", "", "78945623", "78945612", "56231532", "San José", "Montes de Oca", "San Pedro", "Residencial Las Hojas, casa 14A", "Universidad Cenfotec", "10", "10", "si", "si", "C2", "Licenciatura", "", "", [[], [], [], [], [], []], [], [[], []], [], [], "1234", true, "audaq6qqr5v6ispj4oua"],
      ["209480106", "Residente", "Jonathan", "", "Rios", "", "jrios@ucenfotec.ac.cr", "", "45612856", "64235615", "78945612", "Heredia", "Heredia", "Heredia", "Barriada Francosta, casa #23", "Cenfotec", "23", "10", "si", "si", "C2", "Maestría", "", "", [[], [], [], [], [], []], [], [[], []], [], [], "1234", true, "audaq6qqr5v6ispj4oua"],
      ["115950763", "Nacional", "Josué", "", "Praga", "", "jpraga@ucenfotec.ac.cr", "", "64325689", "", "78451245", "Alajuela", "San Ramón", "San Ramón", "Calle Las Alamedas, casa 21C frente a parque Omar", "Cenfotec", "15", "10", "si", "si", "B2", "Licenciatura", "", "", [[], [], [], [], [], []], [], [[], []], [], [], "1234", true, "audaq6qqr5v6ispj4oua"]
    ];
  }
  return listaProfesores;
}

// Recibe un ID de profesor, compara y devuelve los datos del profesor del ID
function buscarProfesorPorId(pID) {
  let listaProfesores = getListaProfesores();
  let profesorEncontrado = [];

  for (let i = 0; i < listaProfesores.length; i++) {
    if (listaProfesores[i][0] == pID) {
      profesorEncontrado = listaProfesores[i];
    }
  }
  return profesorEncontrado;
}

function setProfesor(paProfesor) {
  localStorage.setItem('profesorModificarLS', JSON.stringify(paProfesor));
}

function getProfesor() {
  let profesor = JSON.parse(localStorage.getItem('profesorModificarLS'));
  return profesor;
}
