const WSresponseClass  = require("../../classes/WSresponseClass");
let admin = require("firebase-admin");
let instance;
const db = admin.firestore();
const productsDB = db.collection("Product");
// db.settings({ ignoreUndefinedProperties: true });

class ProductFirebaseDAO {
  constructor() {
    this.collection = {
      title: this.title,
      price: this.price,
      stock: this.stock,
      _id: this._id,
    };
  }
  
  async getAll() {

    try {
      const productSnapshot = await productsDB.get()
      const ProductDoc = productSnapshot.docs
  
      let products = ProductDoc.map(product => ({
          title: product.data().title,
          price: product.data().price,
          stock: product.data().stock,
      }))
    
      return products;
    } catch (err) {
      console.log(err);

      throw new WSresponseClass(500, "Error getting products");
    }
  }

  async create(title, price, stock) {
   
    try {     
        const newProduct = productsDB.doc();
         const productCreated = await newProduct.create({ title: title, price: price, stock: stock } );
       return productCreated;

    } catch (err) {
      console.log(err);

      throw new WSresponseClass(500, "Error creating product");
    }
  }

  async getProductById(productId) {
    try {
      const Product = db.collection("Product")
      const productFind = Product.doc(productId)
      const ProductDoc = await productFind.get()
      const responseProduct = ProductDoc.data()          
      return responseProduct;

    } catch (err) {
      console.log(err);
      throw new WSresponse(500, "Error looking for product");
    }
  }

  async updateProduct(updateData, productId) {
    try {
      // const Product = db.collection("Product")
      const productUpDate = productsDB.doc(productId)
      const updatedProduct = await productUpDate.update({ title: updateData.title, price: updateData.price, stock: updateData.stock })
      return updatedProduct;

    } catch (err) {
      console.log(err);

      throw new WSresponse(500, "Error updating product");
    }
  }


async deleteProduct(productId) {
    try {
      
      // const Product = db.collection("Product")
      const productToDelete = productsDB.doc(productId)
    const productDeleted = await productToDelete.delete()
     
    } catch (err) {
      console.log(err);

      throw new WSresponse(500, "Error deleting product");
    }
  }
  static getInstance() {
    if (!instance) {
      instance = new ProductFirebaseDAO();
    }
    console.log(" New instance of ProductFirebaseDAO created")
    return instance;
  }
}

module.exports = ProductFirebaseDAO;