const DBClient = require("./dbClient");
const mongoose = require("mongoose");
const WSresponseClass = require( "../classes/WSresponseClass");

const config = require("../config");

let instance;

class MongoClient extends DBClient {
  constructor() {
    super();
    this.connected = false;
    this.client = mongoose;
  }

  async connect() {
    try {
       this.client.connect(
        config.mongoDbUrl, { useNewUrlParser: true, useUnifiedTopology: true }
      );

      this.connected = true;

      console.log("Database connected");
    } catch (err) {
      console.log(err);

      throw new WSresponseClass(500, "Error connecting with database");
    }
  }

  async disconnect() {
    try {
      await this.client.connection.close();

      this.connected = false;

      console.log("Database disconnected");
    } catch (err) {
      console.log(err);

      throw new WSresponseClass(500, "Error disconnecting with database");
    }
  }
  
  static getInstance() {
    if (!instance) {
      instance = new MongoClient();
    }
    console.log(" New instance of MongoClient created")
    return instance;
  }
}

module.exports =  MongoClient;