
const express = require('express');
const router = express.Router();
const evaluaciones = require('./evaluaciones.api');


router.param('id', function(req, res, next, id) {
    console.log(req.body)
    req.body.id = id;
    next();
});

router.route('/registrar_evaluacion')
    .post(function(req, res){
    evaluaciones.registrar(req, res);
});

router.route('/listar_todos_evaluaciones')
    .get(function(req, res){
    evaluaciones.listar_evaluaciones(req, res);
});

router.route('/buscar_evaluacion_id')
    .post(function(req, res){
    evaluaciones.buscar_evaluacion_por_id(req, res);
});

router.route('/actualizar_evaluacion')
    .post(function(req, res){
    evaluaciones.actualizar_evaluacion(req, res);
});



module.exports = router;
