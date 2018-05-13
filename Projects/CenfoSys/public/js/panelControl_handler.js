function getURL() {
  let pageURL = window.location.href;
  let toRemove = '/html/';
  let parts = pageURL.split(toRemove);
  let currentPage = parts[1].split('.html')[0];
  return currentPage;
}
let rol;

switch (getSession()[4]) {
  case '1':
    rol = 'administrador';
    break;
  case '2':
    rol = 'gerencia';
    break;
  case '3':
    rol = 'rector';
    break;
  case '4':
    rol = 'decanatura';
    break;
  case '5':
    rol = 'asistenteDecanatura';
    break;
  case '6':
    rol = 'registro';
    break;
  case '7':
    rol = 'mercadeo';
    break;
  case '8':
    rol = 'profesor';
    break;
}

updatePageAside();
firstLogin();

function firstLogin() {
  let firstLogin = sessionStorage.getItem('firstLoginSS');
  if (firstLogin == 'true') {
    sessionStorage.setItem('firstLoginSS', false);
    if (getSession()[4] != '7') {
      updateAside();
      updateCards();
      sessionStorage.setItem('pageAsideSS', 'Profesores');
      document.querySelector('#btnProfesores').classList.add('activeAside');
      if (getURL().includes('panelControl')) {
        document.querySelector('#sectionProfesor').classList.remove('ocultar');
      }
    } else {
      updateAside();
      updateCards();
      sessionStorage.setItem('pageAsideSS', 'CursosActualizacion');
      document.querySelector('#btnCursosActualizacion').classList.add('activeAside');
      if (getURL().includes('panelControl')) {
        document.querySelector('#sectionCursoActualizacion').classList.remove('ocultar');
      }
    }
  }
}



function updatePageAside() {
  if (getSession()[1].length != 4) {
    let pageAside = sessionStorage.getItem('pageAsideSS');
    updateAside();
    updateCards();
    if (pageAside == 'Profesores') {
      updateProfesores();
    }
    if (pageAside == 'Funcionarios') {
      updateFuncionarios();
    }
    if (pageAside == 'Sedes') {
      updateSedes();
    }
    if (pageAside == 'Carreras') {
      updateCarreras();
    }
    if (pageAside == 'CursosCarrera') {
      updateCursosCarrera();
    }
    if (pageAside == 'CursosActualizacion') {
      updateCursosActualizacion();
    }
    if (pageAside == 'Periodos') {
      updatePeriodos();
    }
    if (pageAside == 'Evaluaciones') {
      updateEvaluaciones();
    }
    if (pageAside == 'Asociaciones') {
      updateAsociaciones();
    }
  }
}

document.querySelector('#btnProfesores').addEventListener('click', function(){
  sessionStorage.setItem('pageAsideSS', 'Profesores');
  if (!getURL().includes('panelControl') && getSession()[1].length != 4) {
    rol = rol.charAt(0).toUpperCase() + rol.slice(1);
    location.href = 'panelControl_' + rol + '.html';
  }
  updatePageAside();
});

document.querySelector('#btnFuncionarios').addEventListener('click', function(){
  sessionStorage.setItem('pageAsideSS', 'Funcionarios');
  if (!getURL().includes('panelControl') && getSession()[1].length != 4) {
    rol = rol.charAt(0).toUpperCase() + rol.slice(1);
    location.href = 'panelControl_' + rol + '.html';
  }
  updatePageAside();
});

document.querySelector('#btnSedes').addEventListener('click', function(){
  sessionStorage.setItem('pageAsideSS', 'Sedes');
  if (!getURL().includes('panelControl') && getSession()[1].length != 4) {
    rol = rol.charAt(0).toUpperCase() + rol.slice(1);
    location.href = 'panelControl_' + rol + '.html';
  }
  updatePageAside();
});

document.querySelector('#btnCarreras').addEventListener('click', function(){
  sessionStorage.setItem('pageAsideSS', 'Carreras');
  if (!getURL().includes('panelControl') && getSession()[1].length != 4) {
    rol = rol.charAt(0).toUpperCase() + rol.slice(1);
    location.href = 'panelControl_' + rol + '.html';
  }
  updatePageAside();
});

document.querySelector('#btnCursosCarrera').addEventListener('click', function(){
  sessionStorage.setItem('pageAsideSS', 'CursosCarrera');
  if (!getURL().includes('panelControl') && getSession()[1].length != 4) {
    rol = rol.charAt(0).toUpperCase() + rol.slice(1);
    location.href = 'panelControl_' + rol + '.html';
  }
  updatePageAside();
});

document.querySelector('#btnCursosActualizacion').addEventListener('click', function(){
  sessionStorage.setItem('pageAsideSS', 'CursosActualizacion');
  if (!getURL().includes('panelControl') && getSession()[1].length != 4) {
    rol = rol.charAt(0).toUpperCase() + rol.slice(1);
    location.href = 'panelControl_' + rol + '.html';
  }
  updatePageAside();
});

document.querySelector('#btnEvaluaciones').addEventListener('click', function(){
  sessionStorage.setItem('pageAsideSS', 'Evaluaciones');
  if (!getURL().includes('panelControl') && getSession()[1].length != 4) {
    rol = rol.charAt(0).toUpperCase() + rol.slice(1);
    location.href = 'panelControl_' + rol + '.html';
  }
  updatePageAside();
});

document.querySelector('#btnPeriodos').addEventListener('click', function(){
  sessionStorage.setItem('pageAsideSS', 'Periodos');
  if (!getURL().includes('panelControl') && getSession()[1].length != 4) {
    rol = rol.charAt(0).toUpperCase() + rol.slice(1);
    location.href = 'panelControl_' + rol + '.html';
  }
  updatePageAside();
});

document.querySelector('#btnAsociaciones').addEventListener('click', function(){
  sessionStorage.setItem('pageAsideSS', 'Asociaciones');
  if (!getURL().includes('panelControl') && getSession()[1].length != 4) {
    rol = rol.charAt(0).toUpperCase() + rol.slice(1);
    location.href = 'panelControl_' + rol + '.html';
  }
  updatePageAside();
});























// Gerente y Rector
if (getSession()[4] == '2' || getSession()[4] == '3') {
  document.querySelector('#btnCursosActualizacion').classList.add('ocultar');
}

// Asistente de decanatura
if (getSession()[4] == '5') {
  document.querySelector('#btnSedes').classList.add('ocultar');
  document.querySelector('#btnCarreras').classList.add('ocultar');
  document.querySelector('#btnCursosActualizacion').classList.add('ocultar');
  document.querySelector('#btnPeriodos').classList.add('ocultar');
  document.querySelector('#btnAsociaciones').classList.add('ocultar');
}

// Registro
if (getSession()[4] == '6') {
  document.querySelector('#btnSedes').classList.add('ocultar');
  document.querySelector('#btnCarreras').classList.add('ocultar');
  document.querySelector('#btnCursosActualizacion').classList.add('ocultar');
  document.querySelector('#btnEvaluaciones').classList.add('ocultar');
  document.querySelector('#btnPeriodos').classList.add('ocultar');
  document.querySelector('#btnAsociaciones').classList.add('ocultar');
}

// Mercadeo
if (getSession()[4] == '7') {
  document.querySelector('#btnFuncionarios').classList.add('ocultar');
  document.querySelector('#btnProfesores').classList.add('ocultar');
  document.querySelector('#btnSedes').classList.add('ocultar');
  document.querySelector('#btnCarreras').classList.add('ocultar');
  document.querySelector('#btnCursosCarrera').classList.add('ocultar');
  document.querySelector('#btnPeriodos').classList.add('ocultar');
  document.querySelector('#btnAsociaciones').classList.add('ocultar');
}













function updateCards() {
  if (getURL().includes('panelControl')) {
    if (getSession()[4] != '7') {
      document.querySelector('#sectionProfesor').classList.add('ocultar');
      document.querySelector('#sectionFuncionario').classList.add('ocultar');
      document.querySelector('#sectionCursoCarrera').classList.add('ocultar');
    }

    if (getSession()[4] != '5' && getSession()[4] != '6' && getSession()[4] != '7') {
      document.querySelector('#sectionSede').classList.add('ocultar');
      document.querySelector('#sectionCarrera').classList.add('ocultar');
      document.querySelector('#sectionPeriodo').classList.add('ocultar');
      document.querySelector('#sectionAsociacion').classList.add('ocultar');
    }

    if (getSession()[4] != '2' && getSession()[4] != '3' && getSession()[4] != '5' && getSession()[4] != '6') {
      document.querySelector('#sectionCursoActualizacion').classList.add('ocultar');
    }

    if (getSession()[4] != '6') {
      document.querySelector('#sectionEvaluacion').classList.add('ocultar');
    }
    document.querySelector('#sectionAsociacion').classList.add('ocultar');
  }
}

function updateAside() {
  document.querySelector('#btnProfesores').classList.remove('activeAside');
  document.querySelector('#btnFuncionarios').classList.remove('activeAside');
  document.querySelector('#btnSedes').classList.remove('activeAside');
  document.querySelector('#btnCarreras').classList.remove('activeAside');
  document.querySelector('#btnCursosCarrera').classList.remove('activeAside');
  document.querySelector('#btnCursosActualizacion').classList.remove('activeAside');
  document.querySelector('#btnEvaluaciones').classList.remove('activeAside');
  document.querySelector('#btnPeriodos').classList.remove('activeAside');
  document.querySelector('#btnAsociaciones').classList.remove('activeAside');
}

























if (getURL().includes('panelControl')) {
  if (getSession()[4] != '7') {
    document.querySelector('#btnRegistrarFuncionario').addEventListener('click', function() {
      window.location.href = 'registrarFuncionarios.html';
    });
    document.querySelector('#btnRegistrarProfesor').addEventListener('click', function(){
      window.location.href = 'registrarProfesor.html';
    });
  }

  if (getSession()[4] != '5' && getSession()[4] != '6' && getSession()[4] != '7') {
    document.querySelector('#btnRegistrarSede').addEventListener('click', function(){
      window.location.href = 'registrarSede.html';
    });
    document.querySelector('#btnRegistrarCarrera').addEventListener('click', function(){
      window.location.href = 'registrarCarrera.html';
    });
    document.querySelector('#btnRegistrarPeriodo').addEventListener('click', function(){
      window.location.href = 'registrarPeriodo.html';
    });
    document.querySelector('#btnAsociarCarreraSede').addEventListener('click', function(){
      window.location.href = 'asociarCarreraSede.html';
    });
    document.querySelector('#btnAsociarCursoCarrera').addEventListener('click', function(){
      window.location.href = 'asociarCursoCarrera.html';
    });
    document.querySelector('#btnAsociarProfesorSede').addEventListener('click', function(){
      window.location.href = 'asociarProfesorSede.html';
    });
    document.querySelector('#btnAsociarCursoActiiProfesor').addEventListener('click', function(){
      window.location.href = 'asociarCursoActiiProfesor.html';
    });
    document.querySelector('#btnAsociarCursoActiiSede').addEventListener('click', function(){
      window.location.href = 'asociarCursoActiiSede.html';
    });
  }

  if (getSession()[4] != '5' && getSession()[4] != '7') {
    document.querySelector('#btnRegistrarCursoCarrera').addEventListener('click', function(){
      window.location.href = 'registrarCursoCarrera.html';
    });
  }

  if (getSession()[4] != '2' && getSession()[4] != '3' && getSession()[4] != '5' && getSession()[4] != '6') {
    document.querySelector('#btnRegistrarCursoActualizacion').addEventListener('click', function(){
      window.location.href = 'registrarCursosActii.html';
    });
  }

  if (getSession()[4] != '6') {
    document.querySelector('#btnRegistrarEvaluacion').addEventListener('click', function(){
      window.location.href = 'registrarEvaluaciones.html';
    });
  }
}












if (getURL().includes('panelControl')) {
  if (getSession()[4] != '7') {
    document.querySelector('#btnListarFuncionarios').addEventListener('click', function(){
      window.location.href = 'listarFuncionarios.html';
    });
    document.querySelector('#btnListarProfesor').addEventListener('click', function(){
      window.location.href = 'listarProfesor.html';
    });
  }

  if (getSession()[4] != '5' && getSession()[4] != '6' && getSession()[4] != '7') {
    document.querySelector('#btnListarSede').addEventListener('click', function(){
      window.location.href = 'listarSede.html';
    });
    document.querySelector('#btnListarCarrera').addEventListener('click', function(){
      window.location.href = 'listarCarreras.html';
    });
    document.querySelector('#btnListarPeriodo').addEventListener('click', function(){
      window.location.href = 'listarPeriodos.html';
    });
  }

  if (getSession()[4] != '7') {
    document.querySelector('#btnListarCursoCarrera').addEventListener('click', function(){
      window.location.href = 'listarCursoCarrera.html';
    });
  }

  if (getSession()[4] != '2' && getSession()[4] != '3' && getSession()[4] != '5' && getSession()[4] != '6') {
    document.querySelector('#btnListarCursoActualizacion').addEventListener('click', function(){
      window.location.href = 'listarCursosActii.html';
    });
  }
}

















function updateProfesores() {
  document.querySelector('#btnProfesores').classList.add('activeAside');
  if (getURL().includes('panelControl')) {
    document.querySelector('#sectionProfesor').classList.remove('ocultar');

  }
}

function updateFuncionarios() {
  document.querySelector('#btnFuncionarios').classList.add('activeAside');
  if (getURL().includes('panelControl')) {
    document.querySelector('#sectionFuncionario').classList.remove('ocultar');
  }
}

function updateSedes() {
  document.querySelector('#btnSedes').classList.add('activeAside');
  if (getURL().includes('panelControl')) {
    document.querySelector('#sectionSede').classList.remove('ocultar');
  }
}

function updateCarreras() {
  document.querySelector('#btnCarreras').classList.add('activeAside');
  if (getURL().includes('panelControl')) {
    document.querySelector('#sectionCarrera').classList.remove('ocultar');
  }
}

function updateCursosCarrera() {
  document.querySelector('#btnCursosCarrera').classList.add('activeAside');
  if (getURL().includes('panelControl')) {
    document.querySelector('#sectionCursoCarrera').classList.remove('ocultar');
  }
}

function updateCursosActualizacion() {
  document.querySelector('#btnCursosActualizacion').classList.add('activeAside');
  if (getURL().includes('panelControl')) {
    document.querySelector('#sectionCursoActualizacion').classList.remove('ocultar');
  }
}

function updateEvaluaciones() {
  document.querySelector('#btnEvaluaciones').classList.add('activeAside');
  if (getURL().includes('panelControl')) {
    document.querySelector('#sectionEvaluacion').classList.remove('ocultar');
  }
}

function updatePeriodos() {
  document.querySelector('#btnPeriodos').classList.add('activeAside');
  if (getURL().includes('panelControl')) {
    document.querySelector('#btnPeriodos').classList.add('activeAside');
    document.querySelector('#sectionPeriodo').classList.remove('ocultar');
  }
}

function updateAsociaciones() {
  document.querySelector('#btnAsociaciones').classList.add('activeAside');
  if (getURL().includes('panelControl')) {
    document.querySelector('#btnAsociaciones').classList.add('activeAside');
    document.querySelector('#sectionAsociacion').classList.remove('ocultar');
  }
}




















if (getSession()[4] == 8) {
  // document.querySelector('.fa-arrow-left').classList.add('ocultar');
  // document.querySelector('#flechaIzquierda').classList.add('noFlecha');
  //
  document.querySelector('#btnProfesores').classList.add('ocultar');
  document.querySelector('#btnFuncionarios').classList.add('ocultar');
  document.querySelector('#btnSedes').classList.add('ocultar');
  document.querySelector('#btnCarreras').classList.add('ocultar');
  document.querySelector('#btnCursosCarrera').classList.add('ocultar');
  document.querySelector('#btnCursosActualizacion').classList.add('ocultar');
  document.querySelector('#btnEvaluaciones').classList.add('ocultar');
  document.querySelector('#btnPeriodos').classList.add('ocultar');
  document.querySelector('#btnAsociaciones').classList.add('ocultar');
}
