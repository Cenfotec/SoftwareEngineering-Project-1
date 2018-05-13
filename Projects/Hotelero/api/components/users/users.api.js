const userModel = require('./users.model');
const nodemailer = require('nodemailer');

module.exports.registrar  = function (req, res){

    let newUser = new  userModel({
      cedula: req.body.cedula,
      pNombre: req.body.pNombre,
      sNombre: req.body.sNombre,
      pApellido: req.body.pApellido,
      sApellido: req.body.sApellido,
      edad: req.body.edad,
      telefono: req.body.telefono,
      correo: req.body.correo,
      cliente: req.body.cliente,
      password: req.body.password,
      estado: req.body.estado


    });

    newUser.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo registrar el usuario, ocurrió el siguiente error' + error});
        }else{

          let correoPersona = req.body.correo;
                      let nombrePersona = req.body.pNombre;

                      let transporter = nodemailer.createTransport({
                          service: 'gmail',
                          port: 587,
                          secure: false,
                          auth: {
                              user: 'hotelerocompany@gmail.com',
                              pass: 'Hotelero123'
                          },
                          tls: {
                              rejectUnauthorized: false
                          }
                      });
                      let mailOptions = {
                          from: '"Hotelero" <hotelerocompany@gmail.com>',
                          to: correoPersona,
                          subject: 'Hotelero - Cuenta registrada',
                          html: 'Hola ' + nombrePersona + ', su cuenta ha sido regitrada exitosamente en Hotelero!'
                      };
                      transporter.sendMail(mailOptions, (error, info) => {
                          if (error) {
                              console.log(error);
                          } else {
                              console.log('Email sent: ' + info.response);
                          }
                      });

          res.json({success : true, msg : 'El usuario se registró con éxito'});
        }

    });


};

module.exports.listar_users = function(req, res){
    userModel.find().then(
        function(users){
            res.send(users);
        });
};

module.exports.buscar_user_por_id = function(req, res){
    userModel.findById({_id:req.body.id}).then(
        function(user){
            res.send(user);
        });
};

module.exports.actualizar_user = function(req, res){
    userModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function(err, user) {
            if (err) {
                res.json({ success: false, msg: 'No se ha actualizado.' + handleError(err) });

            } else {
            res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
            }
      });
};
