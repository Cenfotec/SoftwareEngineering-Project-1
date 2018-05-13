
const userModel = require('./users.model');

module.exports.registrar  = function (req, res){

    let newUser = new  userModel({
        nombre : req.body.nombre,
        correo : req.body.correo,
        tel: req.body.tel

    });

    newUser.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo registrar el usuario, ocurrió el siguiente error' + error});
        }else{
            res.json({success : true, msg : 'El usuario se registró con éxito'});
        }

    });


};

module.exports.listar_usuarios = function(req, res){
    userModel.find().then(
        function(usuarios){
            res.send(usuarios);
        });
};

module.exports.buscar_usuario_por_id = function(req, res){
    userModel.findById({_id:req.body.id}).then(
        function(usuario){
            res.send(usuario);
        });
};

module.exports.actualizar_usuario = function(req, res){
    userModel.findByIdAndUpdate(req.body._id, { $set: req.body }, 
        function(err, user) {
            if (err) {
                res.json({ success: false, msg: 'No se ha actualizado.' + handleError(err) });
        
            } else {
            res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
            }
      });
};