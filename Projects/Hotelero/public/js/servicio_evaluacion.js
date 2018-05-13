function guardarEvaluacion(paDatosEvaluacion) {
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_evaluacion',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            'hotel': paDatosEvaluacion[0],
            'cliente': paDatosEvaluacion[1],
            'comida': paDatosEvaluacion[2],
            'servicio': paDatosEvaluacion[3],
            'habitacion': paDatosEvaluacion[4],
            'infraestructura': paDatosEvaluacion[5],
            'limpieza': paDatosEvaluacion[6]
        }
    });

    peticion.done(function (response) {

    });

    peticion.fail(function () {

    });
}

function obtenerListaEvaluaciones() {
    let listaEvaluaciones = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_todos_evaluaciones',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {

        }
    });

    peticion.done(function (response) {
        listaEvaluaciones = response;
    });

    peticion.fail(function () {

    });

    return listaEvaluaciones;
}

function buscarEvaluacionPorHotel(photel){
    let evaluacion = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/buscar_evaluacion_id',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
            'hotel' : photel
        }
      });

      peticion.done(function(response){
        evaluacion = response;
      });

      peticion.fail(function(){

      });

    return evaluacion;
}

function actualizarEvaluacion(pDatosEvaluacion){
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/actualizar_evaluacion',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async:false,
        data:{
            '_id' : pDatosEvaluacion._id,
            'hotel': pDatosEvaluacion.hotel,
            'cliente': pDatosEvaluacion.cliente,
            'comida': pDatosEvaluacion.comida,
            'servicio': pDatosEvaluacion.servicio,
            'habitacion': pDatosEvaluacion.habitacion,
            'infraestructura': pDatosEvaluacion.infraestructura,
            'limpieza': pDatosEvaluacion.limpieza
        }
      });

      peticion.done(function(response){

      });

      peticion.fail(function(){

      });
}
