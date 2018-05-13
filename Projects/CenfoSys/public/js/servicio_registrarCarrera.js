//funcion que devuelve la lista de carreras guardada en el local storage
function getListaCarrera() {
    let listaCarreras = JSON.parse(localStorage.getItem('listaCarrerasLS'));

    if (listaCarreras == null) {
        listaCarreras =
            [
                ["BITIC", "Ingeniería en tecnologias de información y comunicación", "bachillerato", "144", "1", "Acreditada", true, ["INF-02", "WEB02"], []],
                ["BISOFT", "Ingeniera del Software", "bachillerato", "144", "2", "No acreditada", true, ["BISOFT-04", "INF-01"], []],
                ["DTEL", "Diplomado en Telemática", "diplomado", "102", "3", "No acreditada", true, ["ING-01", "ING-02"], []],
                ["WEB","Diplomado en Desarrollo y Diseño Web", "diplomado", "96", "1", "Acreditada", true, [], []]

            ]

            ;
    }
    return listaCarreras;
}
//guarda la lista de carreras en el local storage, toma como parametro una carrera nueva registrada
function setListaCarrera(paCarrera) {
    let listaCarreras = getListaCarrera();

    listaCarreras.push(paCarrera);
    localStorage.setItem('listaCarrerasLS', JSON.stringify(listaCarreras));
    setUsuarios();
}
//busca una carrera segun su codigo y devuelve la carrera encontrada
function buscarCarreraPorCodigo(pCodigo) {
    let listaCarreras = getListaCarrera();
    let carreraEncontrada = [];

    for (let i = 0; i < listaCarreras.length; i++) {
        if (listaCarreras[i][0] == pCodigo) {
            carreraEncontrada = listaCarreras[i];
        }
    }
    return carreraEncontrada;
}
//toma como parametro la carrera que se modificare y la guarda en el localstorage
function setCarrera(paCarrera) {
    localStorage.setItem('carreraModificarLS', JSON.stringify(paCarrera));
}
//Funcion que devuelve la carrera con la llave guardada en el localstorage
function getCarrera() {
    let carrera = JSON.parse(localStorage.getItem('carreraModificarLS'));
    return carrera;
}
//Actualiza todas las listas y aplica los cambios hechos a la carrera modificada
function actualizarCarrera(paInfoCarrera) {
    let listaCarreras = getListaCarrera();

    for (let i = 0; i < listaCarreras.length; i++) {
        if (listaCarreras[i][0] == paInfoCarrera[0]) {
            listaCarreras[i] = paInfoCarrera;
            localStorage.setItem('listaCarrerasLS', JSON.stringify(listaCarreras));
            //setUsuarios();
        }
    }
}


//Guarda en local storage la carrera que se visualiza en el modal
function setCarreraVisualizar(paCarreraVisualizar) {
    localStorage.setItem('carreraVisualizarLS', JSON.stringify(paCarreraVisualizar));
}
//retorna la lista de datos de la carrera siendo visualizada
function getCarreraVisualizar() {
    let carrera = JSON.parse(localStorage.getItem('carreraVisualizarLS'));
    return carrera;
}
