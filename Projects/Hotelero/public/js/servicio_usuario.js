// //Almacenado de datos
// function setListaUsuarios(paInfoUsuarios){
//     let listaUsuarios = getListaUsuarios();
//     listaUsuarios.push(paInfoUsuarios);
//     localStorage.setItem('usuariosLS', JSON.stringify(listaUsuarios));
// }
//
// //Obtención de datos
// function getListaUsuarios(){
//     let listaUsuarios = JSON.parse(localStorage.getItem('usuariosLS'));
//     if(listaUsuarios == null){
//       listaUsuarios = [
//                   ['000000000', 'Admin', '', 'General', '', '30', '11992288', 'admin@ucenfotec.ac.cr', 'Administrador', '1234', true],
//                   ['117630799', 'Pablo', '', 'Bonilla', '', '18', '70192499', 'pbonillag@ucenfotec.ac.cr', 'Cliente', '1234', true],
//               ];
//     }
//     return listaUsuarios;
// }
//
// function buscarUsuariosPorId(pID){
//     let listaUsuarios = getListaUsuarios();
//     let usuarioEncontrado = [];
//
//     for (let i = 0; i < listaUsuarios.length; i++) {
//         if (listaUsuarios[i][0] == pID) {
//             usuarioEncontrado = listaUsuarios[i];
//         }
//     }
//
//     return usuarioEncontrado;
// }
//
//
// function setUsuario(paUsuario){
//     localStorage.setItem('usuarioModificarLS', JSON.stringify(paUsuario));
// }
//
//
// function getUsuario(){
//     let usuario = JSON.parse(localStorage.getItem('usuarioModificarLS'));
//     return usuario;
// }
//
//
// function actualizarUsuarios(paInfoUsuario){
//     let listaUsuarios = getListaUsuarios();
//
//     for (let i = 0; i < listaUsuarios.length; i++) {
//         if (listaUsuarios[i][0] == paInfoUsuario[0]) {
//             listaUsuarios[i] = paInfoUsuario;
//             localStorage.setItem('usuariosLS', JSON.stringify(listaUsuarios));
//             setUsuarios();
//         }
//     }
// }


function guardarUsuario(paDatosUsuario) {
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_user',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            'cedula': paDatosUsuario[0],
            'pNombre': paDatosUsuario[1],
            'sNombre': paDatosUsuario[2],
            'pApellido': paDatosUsuario[3],
            'sApellido': paDatosUsuario[4],
            'edad': paDatosUsuario[5],
            'telefono': paDatosUsuario[6],
            'correo': paDatosUsuario[7],
            'cliente': paDatosUsuario[8],
            'password': paDatosUsuario[9],
            'estado': paDatosUsuario[10]
        }
    });

    peticion.done(function (response) {

    });

    peticion.fail(function () {

    });
}

function obtenerListaUsuarios() {
    let listaUsuarios = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_todos_users',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {

        }
    });

    peticion.done(function (response) {
        listaUsuarios = response;
    });

    peticion.fail(function () {

    });

    return listaUsuarios;
}

function buscarUsuarioPorId(pid){
    let usuario = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/buscar_user_id',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
            'id' : pid
        }
      });

      peticion.done(function(response){
        usuario = response;
      });

      peticion.fail(function(){

      });

    return usuario;
}

function actualizarUsuario(pDatosUsuario){
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/actualizar_user',
        type: 'put',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
            '_id' : pDatosUsuario._id,
            'cedula': pDatosUsuario.cedula,
            'pNombre': pDatosUsuario.pNombre,
            'sNombre': pDatosUsuario.sNombre,
            'pApellido': pDatosUsuario.pApellido,
            'sApellido': pDatosUsuario.sApellido,
            'edad': pDatosUsuario.edad,
            'telefono': pDatosUsuario.telefono,
            'correo': pDatosUsuario.correo,
            'cliente': pDatosUsuario.cliente,
            'password': pDatosUsuario.password,
            'estado': pDatosUsuario.estado
        }
      });

      peticion.done(function(response){

      });

      peticion.fail(function(){

      });
}
