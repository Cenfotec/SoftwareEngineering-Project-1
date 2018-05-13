
const express = require('express');
const router = express.Router();
const users = require('./users.api');


router.param('id', function(req, res, next, id) {
    console.log(req.body)
    req.body.id = id;
    next();
});

router.route('/registrar_user')
    .post(function(req, res){
    users.registrar(req, res);
});

router.route('/listar_todos_users')
    .get(function(req, res){
    users.listar_users(req, res);
});

router.route('/buscar_user_id')
    .post(function(req, res){
    users.buscar_user_por_id(req, res);
});

router.route('/actualizar_user')
    .post(function(req, res){
    users.actualizar_user(req, res);
});



module.exports = router;