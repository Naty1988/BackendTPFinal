let mongoose = require('mongoose');
let model = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    email: { type: String, required: false },
    typeUserOrSystem: { type: String, required: false },
    date: { type: String, required: true },
    text: { type: String, required: true },
   
  });
  
  const Message = mongoose.model("Message", messageSchema);
  
module.exports = Message 
