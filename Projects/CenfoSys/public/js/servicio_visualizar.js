function getInfo() {
    let listaUsuarios = JSON.parse(localStorage.getItem('listaUsuariosLS'));

    if (listaUsuarios == null) {
        listaUsuarios = [
            //id, nombre, primer apellido, segundo apellido, correo, correo secundario,telefono, ***contacto de emergencia***, provincia, canton, distrito, direccion exacta
            ['117440610', 'Jimena', 'Vega', 'Ramirez',  'jime@gmail.com', 'jimev@gmail.com', '85292260', 'San José', 'Central', 'Catedral', 'San José, San Cayetano frente al Colegio de Geólogos de Costa Rica'],
            ['109130814', 'Magaly', 'Ramirez', 'Fallas',  'maga@gmail.com', 'magar@gmail.com', '85475762', 'San José', 'Central', 'Catedral', 'San José, San Cayetano frente al Colegio de Geólogos de Costa Rica']
        ]
        ;
    }
    return listaUsuarios;
}
