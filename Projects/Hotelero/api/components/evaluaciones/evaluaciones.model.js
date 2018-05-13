

let mongoose = require('mongoose');

let evaluacionSchema = new mongoose.Schema({

    hotel: {type: String, required: true},
    cliente: {type: String, required: true},
    comida: {type: String},
    servicio: {type: String, required: true},
    habitacion: {type: String},
    infraestructura: {type: String, required : true},
    limpieza: {type: String, required : true},
});

module.exports = mongoose.model('Evaluacion', evaluacionSchema);
