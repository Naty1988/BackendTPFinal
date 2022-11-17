const MessageMongoDAO = require("../daos/Mongo/productMongoDao.js");
const MessageFirebaseDAO = require("../daos/Firebase/menssageFirebaseDao");

class DaoFactory {
  createDao(database) {
    console.log("database desde dao factory", database)
    if (database === "FIREBASE") {
      console.log("Returning MessageFirebaseDAO", MessageFirebaseDAO)
      return new MessageFirebaseDAO();
  }
    if (database === "MONGO") {
    console.log("Returning MessageMongoDAO", MessageMongoDAO)
    return new MessageMongoDAO()
  }
}
}

module.exports = DaoFactory;