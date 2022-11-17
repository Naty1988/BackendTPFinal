const DBClient = require("./dbClient");
const config = require("../config.js");

let admin = require("firebase-admin");
let serviceAccount = require("../configFirebase.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let instance;

class FirebaseClient extends DBClient {
  constructor() {
    super();
    this.connected = false;
    
  }
  
  async connect() {
    
    const db = admin.firestore();
    const mensajesDB = db.collection("Messages");

    try {
       
      const userSnapshot = await mensajesDB.get()
      const mensajeDoc = userSnapshot.docs


      console.log("Database connected");
    } catch (err) {
      console.log(err);

      throw new CustomError(500, "Error connecting with database");
    }
  }

  async disconnect() {
    try {
      await this.client.close();

      this.connected = false;

      console.log("Database disconnected");
    } catch (err) {
      console.log(err);

      throw new CustomError(500, "Error disconnecting with database");
    }
  }

  static getInstance() {
    if (!instance) {
      instance = new FirebaseClient();
      console.log(" New instance of FirebaseClient created")
    }

    return instance;
  }
}

module.exports = FirebaseClient;
