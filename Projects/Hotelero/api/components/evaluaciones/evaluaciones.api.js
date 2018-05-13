const evaluacionModel = require('./evaluaciones.model');

module.exports.registrar  = function (req, res){

    let newEvaluacion = new  evaluacionModel({
      hotel: req.body.hotel,
      cliente: req.body.cliente,
      comida: req.body.comida,
      servicio: req.body.servicio,
      habitacion: req.body.habitacion,
      infraestructura: req.body.infraestructura,
      limpieza: req.body.limpieza


    });

    newEvaluacion.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo registrar la evaluación, ocurrió el siguiente error' + error});
        }else{res.json({success : true, msg : 'La evaluación se registró con éxito'});}

    });


};

module.exports.listar_evaluaciones = function(req, res){
    evaluacionModel.find().then(
        function(evaluaciones){
            res.send(evaluaciones);
        });
};

module.exports.buscar_evaluacion_por_id = function(req, res){
    evaluacionModel.find({hotel:req.body.hotel}).then(
        function(evaluacion){
            res.send(evaluacion);
        });
};

module.exports.actualizar_evaluacion = function(req, res){
    evaluacionModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function(err, evaluacion) {
            if (err) {
                res.json({ success: false, msg: 'No se ha actualizado.' + handleError(err) });

            } else {
            res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
            }
      });
};
