

let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({

    cedula : {type: String, required: true},
    pNombre : {type: String, required: true},
    sNombre : {type: String},
    pApellido: {type: String, required: true},
    sApellido: {type: String},
    edad: {type: String, required : true},
    telefono:{type: String, required : true},
    correo: {type: String, required : true},
    cliente:{type: String, required : true},
    password: {type: String, required : true},
    estado: {type: String, required : true},
});

module.exports = mongoose.model('User', userSchema);
