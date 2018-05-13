const hotelModel = require('./hoteles.model');

module.exports.registrar  = function (req, res){

    let newHotel = new  hotelModel({
      nombre: req.body.nombre,
      telServicio: req.body.telServicio,
      correoServicio: req.body.correoServicio,
      telReservacion: req.body.telReservacion,
      correoReservacion: req.body.correoReservacion,
      provincia: req.body.provincia,
      canton: req.body.canton,
      distrito: req.body.distrito,
      direccion: req.body.direccion,
      latitud: req.body.latitud,
      longitud: req.body.longitud,
      fotografia: req.body.fotografia,
      estado: req.body.estado


    });

    newHotel.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo registrar el hotel, ocurrió el siguiente error' + error});
        }else{res.json({success : true, msg : 'El hotel se registró con éxito'});}

    });


};

module.exports.listar_hoteles = function(req, res){
    hotelModel.find().then(
        function(hoteles){
            res.send(hoteles);
        });
};

module.exports.buscar_hotel_por_id = function(req, res){
    hotelModel.find({nombre:req.body.nombre}).then(
        function(hotel){
            res.send(hotel);
        });
};

module.exports.actualizar_hotel = function(req, res){
    hotelModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function(err, hotel) {
            if (err) {
                res.json({ success: false, msg: 'No se ha actualizado.' + handleError(err) });

            } else {
            res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
            }
      });
};
