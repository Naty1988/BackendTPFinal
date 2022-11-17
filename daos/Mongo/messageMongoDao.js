const Message = require("../../models/mongoose/messageModel ");
const WSresponse = require("../../classes/WSresponseClass");
const MongoClient = require("../../store/MongoClient");

let instance;

class MessageMongoDAO {
  constructor() {

    this.collection = Message

  }

  async getAll() {
    try {
      const messages = await Message.find();
      return messages;
    } catch (err) {
      console.log(err);

      throw new WSresponse(500, "Error getting messages");
    }
  }

  async create(newMessage) {
    try {
      const createdMessage = await Message.create(newMessage);

      return createdMessage;
    } catch (err) {
      console.log(err);

      throw new WSresponse(500, "Error creating message");
    }
  }

  async getMessageById(MessageId) {
    try {   
      const messageFound = await Message.find({email: MessageId })
      return messageFound;
    } catch (err) {
      console.log(err);

      throw new WSresponse(500, "Error looking for product");
    }
  }

  static getInstance() {
    if (!instance) {
      instance = new MessageMongoDAO();
    }
    console.log(" New instance of MessageMongoDAO created")
    return instance;
  }
}

module.exports = MessageMongoDAO 