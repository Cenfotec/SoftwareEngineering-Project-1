
let mongoose = require('mongoose');

let hotelSchema = new mongoose.Schema({

    nombre : {type: String, required: true},
    telServicio : {type: String, required: true},
    correoServicio : {type: String, required: true},
    telReservacion: {type: String, required: true},
    correoReservacion: {type: String, required: true},
    provincia: {type: String, required : true},
    canton:{type: String, required : true},
    distrito: {type: String, required : true},
    direccion:{type: String, required : true},
    latitud: {type: String, required : true},
    longitud: {type: String, required : true},
    fotografia:{type: String, required : true},
    estado: {type: String, required : true},
});

module.exports = mongoose.model('Hotel', hotelSchema);
