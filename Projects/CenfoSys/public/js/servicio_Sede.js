//obtiene la lista de sedes
function getListaSede() {
    let listaSedes = JSON.parse(localStorage.getItem('listaSedesLS'));

    if (listaSedes == null) {
        listaSedes = [
        ["Sede San Pedro","física","San José","Montes de Oca","San Pedro","Del semaforo a la derecha AMPM frente a Fidélitas, hacia arriba 300m",true,true,9.932260804904143,-84.03103613581845,[]],
        ["Espacio San Carlos","virtual","Alajuela","San Carlos","Quesada","Ubicado en Ciudad Quesada, en Plaza San Carlos",true,true,10.333179642655583,-84.43440818515012, []]
    ];
    }
    return listaSedes;
}
//guarda la lista de sedes en el localstorage
function setListaSede(paSede) {
    let listaSedes = getListaSede();

    listaSedes.push(paSede);
    localStorage.setItem('listaSedesLS', JSON.stringify(listaSedes));
}
function buscarSedePorNombre(pNombre) {
    let listaSedes = getListaSede();
    let sedeEncontrada = [];

    for (let i = 0; i < listaSedes.length; i++) {
        if (listaSedes[i][0] == pNombre) {
            sedeEncontrada = listaSedes[i];
        }
    }
    return sedeEncontrada;
}
function setSede(paSede) {
    localStorage.setItem('sedeModificarLS', JSON.stringify(paSede));
}
function getSede() {
    let sede = JSON.parse(localStorage.getItem('sedeModificarLS'));
    return sede;
}
function actualizarSede(paInfoSede) {
    let listaSedes = getListaSede();

    for (let i = 0; i < listaSedes.length; i++) {
        if (listaSedes[i][0] == paInfoSede[0]) {
            listaSedes[i] = paInfoSede;
            localStorage.setItem('listaSedesLS', JSON.stringify(listaSedes));
        }
    }
}

//Funcion que toma como parametro la latitud de la sede y la guarda en el local storage
function setLatitud(paLatitud) {
    localStorage.setItem('latitudSedeLS', JSON.stringify(paLatitud));
}
//Funcion que devuelve la latitud de la sede guardada en el localstorage
function getLatitud() {
    let latitudSede = JSON.parse(localStorage.getItem('latitudSedeLS'));
    return latitudSede;
}
//Funcion que toma como parametro la longitud de la sede y la guarda en el local storage
function setLongitud(paLongitud) {
    localStorage.setItem('longitudSedeLS', JSON.stringify(paLongitud));
}
//Funcion que devuelve la longitud de la sede guardada en el localstorage
function getLongitud() {
    let longitudSede = JSON.parse(localStorage.getItem('longitudSedeLS'));
    return longitudSede;
}

//Guarda en local storage la sede que se visualiza en el modal
function setSedeVisualizar(paSedeVisualizar){
    localStorage.setItem('sedeVisualizarLS', JSON.stringify(paSedeVisualizar));
}
//retorna la lista de datos de la sede siendo visualizada
function getSedeVisualizar(){
    let sede = JSON.parse(localStorage.getItem('sedeVisualizarLS'));
    return sede;
}
