//Llamadas de funciónes
let mostraStatus = true;
document.querySelector('#txtBuscar').addEventListener('keyup', mostrarFuncionarios);
/*document.querySelector('#ascendenteID').addEventListener('click', mostrarFuncionarios);
document.querySelector('#ascendenteID').addEventListener('click', mostrarFuncionariosDesactivados);*/

let botonDesactivados = document.querySelector('#btnDesactivados');
botonDesactivados.addEventListener('click', mostrarFuncionariosDesactivados);

let botonActivados = document.querySelector('#btnActivados');
botonActivados.addEventListener('click', mostrarFuncionariosActivados);

botonActivados.classList.add('ocultar');
mostrarFuncionariosActivados();

//Búsqueda de datos por identificación, llamada de funciones y listado de funcionarios
function mostrarFuncionarios() {
  if (mostraStatus) {
    mostrarFuncionariosActivados();
  } else {
    mostrarFuncionariosDesactivados();
  }
}

//Se almacena un (1) usuario en localStorage por medio del id
function editar() {
    let idFuncionario = this.dataset.id;
    let funcionario = buscarFuncionarioPorId(idFuncionario);
    setFuncionario(funcionario);
    location.href = "modificarFuncionarios.html";
}

//Desactiva un funcionario de la lista
function desactivar() {
    let idFuncionario = this.dataset.id;
    let funcionario = buscarFuncionarioPorId(idFuncionario);
    funcionario[9] = false;

    swal({
    title: "Desactivar funcionario",
    text: "¿Está seguro que desea desactivar este funcionario?",
    buttons: ["Cancelar", "Aceptar"],
    }).then((willDelete) => {
      if (willDelete) {
        actualizarFuncionario(funcionario);
        mostrarFuncionariosActivados();
      }
    });
}

//Activa un funcionario de la lista
function activar() {
    let idFuncionario = this.dataset.id;
    let funcionario = buscarFuncionarioPorId(idFuncionario);
    funcionario[9] = true;

    swal({
    title: "Activar funcionario",
    text: "¿Está seguro que desea activar este funcionario?",
    buttons: ["Cancelar", "Aceptar"],
    }).then((willDelete) => {
      if (willDelete) {
        actualizarFuncionario(funcionario);
        mostrarFuncionariosDesactivados();
      }
    });
}
//Búsqueda de datos por identificación, llamada de funciones  y listado de funcionarios desactivados
function mostrarFuncionariosDesactivados() {
    mostraStatus = false;
    botonActivados.classList.remove('ocultar');
    botonDesactivados.classList.add('ocultar');

    let sBuscar = document.querySelector('#txtBuscar').value;
    let listaFuncionarios = getListaFuncionarios();
    let cuerpoTabla = document.querySelector('#tblFuncionarios tbody');

    cuerpoTabla.innerHTML = '';

    for (let i = 0; i < listaFuncionarios.length; i++) {

        if (listaFuncionarios[i][0].toLowerCase().includes(sBuscar.toLowerCase())) {

            if (listaFuncionarios[i][9] == false) {
                if (listaFuncionarios[i][7] != "Administrador") {
                    let fila = cuerpoTabla.insertRow();

                    let botonEditar = document.createElement('button');
                    botonEditar.dataset.id = listaFuncionarios[i][0];
                    botonEditar.classList.add('botonNormal');
                    botonEditar.classList.add('botonEditar');
                    botonEditar.classList.add('botonTabla');
                    botonEditar.setAttribute('data-tooltip', 'Editar');
                    botonEditar.addEventListener('click', editar);

                    let botonDesactivar = document.createElement('button');
                    botonDesactivar.dataset.id = listaFuncionarios[i][0];
                    botonDesactivar.classList.add('botonDesactivar');
                    botonDesactivar.classList.add('botonTabla');
                    botonDesactivar.setAttribute('data-tooltip', 'Desactivar');
                    botonDesactivar.addEventListener('click', desactivar);

                    let botonActivar = document.createElement('button');
                    botonActivar.dataset.id = listaFuncionarios[i][0];
                    botonActivar.classList.add('botonActivar');
                    botonActivar.classList.add('botonTabla');
                    botonActivar.setAttribute('data-tooltip', 'Activar');
                    botonActivar.addEventListener('click', activar);

                    if (!listaFuncionarios[i][9]) {
                        botonDesactivar.classList.add('ocultar');
                    } else {
                        botonActivar.classList.add('ocultar');
                    }

                    let cConfiguración = fila.insertCell();
                    let cIdentificacion = fila.insertCell();
                    cIdentificacion.dataset.id = listaFuncionarios[i][0];
                    cIdentificacion.setAttribute('data-tooltip', 'Ver funcionario');
                    cIdentificacion.classList.add('tooltip-bottom');
                    cIdentificacion.addEventListener('click', visualizar);
                    let cPNombre = fila.insertCell();
                    let cPApellido = fila.insertCell();
                    let cCorreo = fila.insertCell();
                    let cTelefono = fila.insertCell();
                    let cRol = fila.insertCell();

                    let sIdentificacion = document.createTextNode(listaFuncionarios[i][0]);
                    let sPNombre = document.createTextNode(listaFuncionarios[i][1]);
                    let sPApellido = document.createTextNode(listaFuncionarios[i][3]);
                    let sCorreo = document.createTextNode(listaFuncionarios[i][6])
                    let sTelefono = document.createTextNode(listaFuncionarios[i][5])
                    let sRol = document.createTextNode(listaFuncionarios[i][7]);

                    cConfiguración.appendChild(botonEditar);
                    cConfiguración.appendChild(botonDesactivar);
                    cConfiguración.appendChild(botonActivar);
                    cIdentificacion.appendChild(sIdentificacion);
                    cPNombre.appendChild(sPNombre);
                    cPApellido.appendChild(sPApellido);
                    cCorreo.appendChild(sCorreo);
                    cTelefono.appendChild(sTelefono);
                    cRol.appendChild(sRol);
                }
            }
        }
    }
}

function mostrarFuncionariosActivados() {
    mostraStatus = true;
    botonActivados.classList.add('ocultar');
    botonDesactivados.classList.remove('ocultar');

    let sBuscar = document.querySelector('#txtBuscar').value;
    let listaFuncionarios = getListaFuncionarios();
    let cuerpoTabla = document.querySelector('#tblFuncionarios tbody');

    cuerpoTabla.innerHTML = '';

    for (let i = 0; i < listaFuncionarios.length; i++) {

        if (listaFuncionarios[i][0].toLowerCase().includes(sBuscar.toLowerCase())) {

            if (listaFuncionarios[i][9] == true) {
                if (listaFuncionarios[i][7] != "Administrador") {
                    let fila = cuerpoTabla.insertRow();

                    let botonEditar = document.createElement('button');
                    botonEditar.dataset.id = listaFuncionarios[i][0];
                    botonEditar.classList.add('botonNormal');
                    botonEditar.classList.add('botonEditar');
                    botonEditar.classList.add('botonTabla');
                    botonEditar.setAttribute('data-tooltip', 'Editar');
                    botonEditar.addEventListener('click', editar);

                    let botonDesactivar = document.createElement('button');
                    botonDesactivar.dataset.id = listaFuncionarios[i][0];
                    botonDesactivar.classList.add('botonDesactivar');
                    botonDesactivar.classList.add('botonTabla');
                    botonDesactivar.setAttribute('data-tooltip', 'Desactivar');
                    botonDesactivar.addEventListener('click', desactivar);

                    let botonActivar = document.createElement('button');
                    botonActivar.dataset.id = listaFuncionarios[i][0];
                    botonActivar.classList.add('botonActivar');
                    botonActivar.classList.add('botonTabla');
                    botonActivar.setAttribute('data-tooltip', 'Activar');
                    botonActivar.addEventListener('click', activar);

                    if (!listaFuncionarios[i][9]) {
                        botonDesactivar.classList.add('ocultar');
                    } else {
                        botonActivar.classList.add('ocultar');
                    }

                    let cConfiguración = fila.insertCell();
                    let cIdentificacion = fila.insertCell();
                    cIdentificacion.dataset.id = listaFuncionarios[i][0];
                    cIdentificacion.setAttribute('data-tooltip', 'Ver funcionario');
                    cIdentificacion.classList.add('tooltip-bottom');
                    cIdentificacion.addEventListener('click', visualizar);
                    let cPNombre = fila.insertCell();
                    let cPApellido = fila.insertCell();
                    let cCorreo = fila.insertCell();
                    let cTelefono = fila.insertCell();
                    let cRol = fila.insertCell();

                    let sIdentificacion = document.createTextNode(listaFuncionarios[i][0]);
                    let sPNombre = document.createTextNode(listaFuncionarios[i][1]);
                    let sPApellido = document.createTextNode(listaFuncionarios[i][3]);
                    let sCorreo = document.createTextNode(listaFuncionarios[i][6])
                    let sTelefono = document.createTextNode(listaFuncionarios[i][5])
                    let sRol = document.createTextNode(listaFuncionarios[i][7]);

                    cConfiguración.appendChild(botonEditar);
                    cConfiguración.appendChild(botonDesactivar);
                    cConfiguración.appendChild(botonActivar);
                    cIdentificacion.appendChild(sIdentificacion);
                    cPNombre.appendChild(sPNombre);
                    cPApellido.appendChild(sPApellido);
                    cCorreo.appendChild(sCorreo);
                    cTelefono.appendChild(sTelefono);
                    cRol.appendChild(sRol);
                }
            }
        }
    }
}

//Se vizualiza el detalle de los datos de un funcionario
function visualizar() {
    let idFuncionario = this.dataset.id;
    let funcionario = buscarFuncionarioPorId(idFuncionario);

    openModal()

    document.querySelector('#lblIdentificacion').innerHTML = funcionario[0];
    document.querySelector('#lblNombre').innerHTML = funcionario[1] + ' ' + funcionario[2] + ' ' + funcionario[3] + ' ' + funcionario[4];
    let phone = funcionario[5].split('');
    phone[8] = phone[7];
    phone[7] = phone[6];
    phone[6] = phone[5];
    phone[5] = phone[4];
    phone[4] = phone[3];
    phone[4] = '-';
    document.querySelector('#lblTelefono').innerHTML = phone.join('');
    document.querySelector('#lblEmail').innerHTML = funcionario[6];
    document.querySelector('#lblRol').innerHTML = funcionario[7];



    return false;
}
