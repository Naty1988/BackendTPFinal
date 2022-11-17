let mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({

    email: { type: String, required: false },
    DateAndTime: { type: String, required: false },
    products: { type: Array, required: false },
    address: { type: String, required: false },
    
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart