const MongoClient = require("./MongoClient.js");
const FirebaseClient = require("./FirebaseClient");

class StoreFactory {
  createDatabaseClient(database) {
    console.log("database desde factory: ", database)
    if (database == "MONGO") {
      console.log("entrando a mongo")
      return MongoClient.getInstance();
    }
    if (database == "FIREBASE")
      console.log("entrando a firebase")
    return FirebaseClient.getInstance();
  }
}

module.exports = StoreFactory;