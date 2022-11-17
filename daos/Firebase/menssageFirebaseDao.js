// const Product = require("../models/mongoose/productModel");
const WSresponse = require("../../classes/WSresponseClass");
let admin = require("firebase-admin");
const db = admin.firestore();
const messagesDB = db.collection("Message");
db.settings({ ignoreUndefinedProperties: true });

let instance;

class MessageFirebaseDAO {
  constructor() {

    this.collection = {
      author: {
        alias: this.alias,
        apellido: this.apellido,
        avatar: this.avatar,
        edad: this.edad,
        id: this.id,
        nombre: this.nombre,
      },
      text: this.text,    
    };

  }

  async getAll() {
    try {
      const messageSnapshot = await messagesDB.get()
      const MesaggeDoc = messageSnapshot.docs

      let messages = MesaggeDoc.map(message => ({
        author: {
          alias: message.data().alias,
          apellido: message.data().apellido,
          avatar: message.data().avatar,
          edad: message.data().edad,
          id: message.data().id,
          nombre: message.data().nombre,
        },
        text: message.data().text,
      }))

      return messages;
    } catch (err) {
      console.log(err);

      throw new WSresponse(500, "Error getting products");
    }
  }

  async create( alias, apellido, edad, id, avatar, nombre, text) {
    try {
      const newMessaje = messagesDB.doc();
      const messageCreated = await newMessaje.create({ author: { alias: alias, apellido: apellido, edad: edad, id: id, avatar: avatar, nombre: nombre }, text: text });

      return messageCreated;
    } catch (err) {
      console.log(err);

      throw new WSresponse(500, "Error creating product");
    }
  }

  static getInstance() {
    if (!instance) {
      instance = new MessageFirebaseDAO();
    }
    console.log("New MessageFirebaseDAO instance creadated")
    return instance;
  }
}

module.exports = MessageFirebaseDAO 