

cargarDatosUsuario();

function cargarDatosUsuario(){
    let idUsuario = sessionStorage.getItem('idUsuario');
    let usuarioInfo = buscarFuncionarioPorId(idUsuario);

    document.querySelector('#nombreUsuario').innerText = usuarioInfo[1] +' '+ usuarioInfo[3] + ' ' + usuarioInfo[4];
    document.querySelector('#cedulaUsuario').innerText = usuarioInfo[0];
    document.querySelector('#correo1Usuario').innerText = usuarioInfo[6];
    document.querySelector('#telefonoUsuario').innerText = usuarioInfo[5];
    document.querySelector('#provinciaUsuario').innerText = usuarioInfo[7];
    document.querySelector('#cantonUsuario').innerText = usuarioInfo[8];
    document.querySelector('#distritoUsuario').innerText = usuarioInfo[9];
    document.querySelector('#direccionUsuario').innerText = usuarioInfo[10];
}
