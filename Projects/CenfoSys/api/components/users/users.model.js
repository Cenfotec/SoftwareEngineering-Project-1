

let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    nombre : {type: String, required : true},
    correo :  {type: String, required : true},
    tel : {type: String, required : false}
});

module.exports = mongoose.model('User', userSchema);