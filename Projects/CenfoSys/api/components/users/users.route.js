
const express = require('express');
const router = express.Router();
const users = require('./users.api');

router.param('id', function(req, res, next, id) {
    console.log(req.body)
    req.body.id = id;
    next();
});

router.route('/registrar_usuario')
    .post(function(req, res){
    users.registrar(req, res);
});

router.route('/listar_todos_usuarios')
    .get(function(req, res){
    users.listar_usuarios(req, res);
});

router.route('/buscar_usuario_id')
    .post(function(req, res){
    users.buscar_usuario_por_id(req, res);
});

router.route('/actualizar_usuario')
    .post(function(req, res){
    users.actualizar_usuario(req, res);
});



module.exports = router;