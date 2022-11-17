const ProductMongoDAO = require("../daos/Mongo/messageMongoDao");
const ProductFirebaseDAO = require("../daos/Firebase/productFirebaseDao");

class DaoFactory {
  createDao(database) {
    console.log("database from message dao factory Firebase", database)
    if (database === "FIREBASE") {
      console.log("Returning ProductFirebaseDAO", ProductFirebaseDAO)
      return new ProductFirebaseDAO();
  }
    if (database === "MONGO") {
      console.log("database from message dao factory Mongo", database)
    console.log("Returning ProductMongoDAO", ProductMongoDAO)
    return new ProductMongoDAO()
  }
}
}

module.exports = DaoFactory;