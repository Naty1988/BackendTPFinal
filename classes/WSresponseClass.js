 class WSresponse {
    constructor(data, message, error, statusCode) {
      this.data = data;
      this.message = message || "";
      this.error = error || false;
      this.statusCode = statusCode || 0;
    }
  }

  module.exports = WSresponse;
