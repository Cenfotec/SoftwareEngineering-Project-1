

/*document.querySelector('#descendenteID').addEventListener('click', mostrarFuncionariosDescendente);
document.querySelector('#descendenteID').addEventListener('click', mostrarFuncionariosDesactivadosDescendente);*/

// muestra las sedes de forma descendente
function mostrarFuncionariosDescendente() {

    let botonActivados = document.querySelector('#btnActivados');
    botonActivados.classList.add('ocultar');

    let botonDesactivados = document.querySelector('#btnDesactivados');
    botonDesactivados.classList.remove('ocultar');

    let sBuscar = document.querySelector('#txtBuscar').value;
    let listaFuncionarios = getListaFuncionarios();

    listaFuncionarios.reverse();

    let cuerpoTabla = document.querySelector('#tblFuncionarios tbody');

    cuerpoTabla.innerHTML = '';

    for (let i = 0; i < listaFuncionarios.length; i++) {

        if (listaFuncionarios[i][0].toLowerCase().includes(sBuscar.toLowerCase())) {

            if (listaFuncionarios[i][9] == true) {
                if (listaFuncionarios[i][7] != "Administrador") {
                    let fila = cuerpoTabla.insertRow();

                    let botonEditar = document.createElement('button');
                    botonEditar.innerText = 'Editar';
                    botonEditar.dataset.id = listaFuncionarios[i][0];
                    botonEditar.classList.add('botonNormal');
                    botonEditar.classList.add('botonTabla');
                    botonEditar.addEventListener('click', editar);

                    let botonDesactivar = document.createElement('button');
                    botonDesactivar.innerText = 'Desactivar';
                    botonDesactivar.dataset.id = listaFuncionarios[i][0];
                    botonDesactivar.classList.add('btnDesactivar');
                    botonDesactivar.classList.add('botonTabla');
                    botonDesactivar.addEventListener('click', desactivar);

                    let botonActivar = document.createElement('button');
                    botonActivar.innerText = 'Activar';
                    botonActivar.dataset.id = listaFuncionarios[i][0];
                    botonActivar.classList.add('botonActivar');
                    botonActivar.classList.add('botonTabla');
                    botonActivar.addEventListener('click', activar);

                    if (!listaFuncionarios[i][9]) {
                        botonDesactivar.classList.add('ocultar');
                    } else {
                        botonActivar.classList.add('ocultar');
                    }

                    let cConfiguración = fila.insertCell();
                    let cIdentificacion = fila.insertCell();
                    cIdentificacion.dataset.id = listaFuncionarios[i][0];
                    cIdentificacion.addEventListener('click', visualizar);
                    let cPNombre = fila.insertCell();
                    let cPApellido = fila.insertCell();
                    let cCorreo = fila.insertCell();
                    let cRol = fila.insertCell();

                    let sIdentificacion = document.createTextNode(listaFuncionarios[i][0]);
                    let sPNombre = document.createTextNode(listaFuncionarios[i][1]);
                    let sPApellido = document.createTextNode(listaFuncionarios[i][3]);
                    let sCorreo = document.createTextNode(listaFuncionarios[i][6])
                    let sRol = document.createTextNode(listaFuncionarios[i][7]);

                    cConfiguración.appendChild(botonEditar);
                    cConfiguración.appendChild(botonDesactivar);
                    cConfiguración.appendChild(botonActivar);
                    cIdentificacion.appendChild(sIdentificacion);
                    cPNombre.appendChild(sPNombre);
                    cPApellido.appendChild(sPApellido);
                    cCorreo.appendChild(sCorreo);
                    cRol.appendChild(sRol);
                }
            }
        }
    }
}

function mostrarFuncionariosDesactivadosDescendente() {
    botonActivados.classList.remove('ocultar');
    botonDesactivados.classList.add('ocultar');

    let sBuscar = document.querySelector('#txtBuscar').value;
    let listaFuncionarios = getListaFuncionarios();

    listaFuncionarios.reverse();

    let cuerpoTabla = document.querySelector('#tblFuncionarios tbody');

    cuerpoTabla.innerHTML = '';

    for (let i = 0; i < listaFuncionarios.length; i++) {

        if (listaFuncionarios[i][0].toLowerCase().includes(sBuscar.toLowerCase())) {

            if (listaFuncionarios[i][9] == false) {
                if (listaFuncionarios[i][7] != "Administrador") {
                    let fila = cuerpoTabla.insertRow();

                    let botonEditar = document.createElement('button');
                    botonEditar.innerText = 'Editar';
                    botonEditar.dataset.id = listaFuncionarios[i][0];
                    botonEditar.classList.add('botonNormal');
                    botonEditar.classList.add('botonTabla');
                    botonEditar.addEventListener('click', editar);

                    let botonDesactivar = document.createElement('button');
                    botonDesactivar.innerText = 'Desactivar';
                    botonDesactivar.dataset.id = listaFuncionarios[i][0];
                    botonDesactivar.classList.add('btnDesactivar');
                    botonDesactivar.classList.add('botonTabla');
                    botonDesactivar.addEventListener('click', desactivar);

                    let botonActivar = document.createElement('button');
                    botonActivar.innerText = 'Activar';
                    botonActivar.dataset.id = listaFuncionarios[i][0];
                    botonActivar.classList.add('botonActivar');
                    botonActivar.classList.add('botonTabla');
                    botonActivar.addEventListener('click', activar);

                    if (!listaFuncionarios[i][9]) {
                        botonDesactivar.classList.add('ocultar');
                    } else {
                        botonActivar.classList.add('ocultar');
                    }

                    let cConfiguración = fila.insertCell();
                    let cIdentificacion = fila.insertCell();
                    cIdentificacion.dataset.id = listaFuncionarios[i][0];
                    cIdentificacion.addEventListener('click', visualizar);
                    let cPNombre = fila.insertCell();
                    let cPApellido = fila.insertCell();
                    let cCorreo = fila.insertCell();
                    let cRol = fila.insertCell();

                    let sIdentificacion = document.createTextNode(listaFuncionarios[i][0]);
                    let sPNombre = document.createTextNode(listaFuncionarios[i][1]);
                    let sPApellido = document.createTextNode(listaFuncionarios[i][3]);
                    let sCorreo = document.createTextNode(listaFuncionarios[i][6])
                    let sRol = document.createTextNode(listaFuncionarios[i][7]);

                    cConfiguración.appendChild(botonEditar);
                    cConfiguración.appendChild(botonDesactivar);
                    cConfiguración.appendChild(botonActivar);
                    cIdentificacion.appendChild(sIdentificacion);
                    cPNombre.appendChild(sPNombre);
                    cPApellido.appendChild(sPApellido);
                    cCorreo.appendChild(sCorreo);
                    cRol.appendChild(sRol);
                }
            }
        }
    }
}
