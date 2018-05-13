
const express = require('express');
const router = express.Router();
const hoteles = require('./hoteles.api');


router.param('id', function(req, res, next, id) {
    console.log(req.body)
    req.body.id = id;
    next();
});

router.route('/registrar_hotel')
    .post(function(req, res){
    hoteles.registrar(req, res);
});

router.route('/listar_todos_hoteles')
    .get(function(req, res){
    hoteles.listar_hoteles(req, res);
});

router.route('/buscar_hotel_id')
    .post(function(req, res){
    hoteles.buscar_hotel_por_id(req, res);
});

router.route('/actualizar_hotel')
    .post(function(req, res){
    hoteles.actualizar_hotel(req, res);
});



module.exports = router;
