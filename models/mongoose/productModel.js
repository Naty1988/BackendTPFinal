let mongoose = require('mongoose');
let model = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    id: { type: Number, required: false },
    title: { type: String, required: true },
    url: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
  });
  
  const Product = mongoose.model("Product", productSchema);
  
module.exports = Product 
