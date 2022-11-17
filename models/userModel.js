let mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    username: { type: String, required: false },
    password:{ type: String, required: false },
    nombre: { type: String, required: false },
    direccion: { type: String, required: false },
    edad: { type: Number, required: false },
    telefono: { type: Number, required: false },
})

const User = mongoose.model('User', userSchema)

module.exports = User