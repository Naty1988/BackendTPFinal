class ProductDTO {
    constructor(data, currencies) {
      this.title = data.title;
      this.price = data.price;
      this.stock = data.stock;      
      this._id = data._id;
      for (const [currency, value] of Object.entries(currencies)) {
        this[currency] = value;
      }
    }
  }
   
module.exports = ProductDTO;
