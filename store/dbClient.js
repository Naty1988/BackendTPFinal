const WSresponseClass = require("../classes/WSresponseClass");

class DBClient {
  connect() {
    throw new WSresponseClass(500, "Connect method not implemented in sub class");
  }

  disconnect() {
    throw new WSresponseClass(
      500,
      "Disconnect method not implemented in sub class"
    );
  }
}

module.exports = DBClient;