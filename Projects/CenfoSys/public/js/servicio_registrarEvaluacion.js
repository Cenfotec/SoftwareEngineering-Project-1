
//Esta funcion obtiene la lista de las evaluaciones
function getEvaluaciones() {
    let listaEvaluaciones = JSON.parse(localStorage.getItem('listaEvaluacionesLS'));

    if (listaEvaluaciones == null) {
        listaEvaluaciones = [
            ["Cuatrimestre 1", "2014", "ING-01", ["303600144", "82","Buena persona y amigable."]],
            ["Cuatrimestre 1", "2014", "ING-01", ["303600144", "73",""]]
        ];
    }
    return listaEvaluaciones;
}


// Esta funcion agrega una evaluacion a la lista
function setEvaluacion(evaluacion) {
    let listaEvaluaciones = getEvaluaciones();

    listaEvaluaciones.push(evaluacion);
    localStorage.setItem('listaEvaluacionesLS', JSON.stringify(listaEvaluaciones));
    setUsuarios();
}
