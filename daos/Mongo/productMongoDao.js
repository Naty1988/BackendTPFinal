const Product = require("../../models/mongoose/productModel");
const WSresponse = require("../../classes/WSresponseClass");
const MongoClient = require("../../store/MongoClient");

let instance;

class ProductMongoDAO {
  constructor() {

    this.collection = Product;

  }

  async getAll() {
    try {
      const products = await Product.find();
      return products;
    } catch (err) {
      console.log(err);

      throw new WSresponse(500, "Error getting products");
    }
  }

  async create(newProduct) {
    try {
      const createdProduct = await Product.create(newProduct);

      return createdProduct;
    } catch (err) {
      console.log(err);

      throw new WSresponse(500, "Error creating product");
    }
  }

  async getProductById(productId) {
    try {
      const product = await Product.findById(productId)
      return product;
    } catch (err) {
      console.log(err);

      throw new WSresponse(500, "Error looking for product");
    }
  }

  async getProductByCategory(Category) {
    try {  
      const response = await Product.find({category: Category })      
       return response;
    } catch (err) {
      console.log(err);
      res.json(new WSresponse(null, err, `No product ID: ${req.params.id} found`, 460));
    }
  };

  async updateProduct(updateData, productId) {
    try {
      const updateProduct = await Product.updateOne(
        { _id: productId },
        updateData
      );
      const updatedProduct = await Product.findById(productId)
      return updatedProduct;
      // return updatedProduct;
    } catch (err) {
      console.log(err);

      throw new WSresponse(500, "Error updating product");
    }
  }

  async deleteProduct(productId) {
    try {
      await Product.deleteOne({ _id: productId });

    } catch (err) {
      console.log(err);

      throw new WSresponse(500, "Error deleting product");
    }
  }

  static getInstance() {
    if (!instance) {
      instance = new ProductMongoDAO();
    }
    console.log(" New instance of ProductMongoDAO created")
    return instance;
  }
}

module.exports = ProductMongoDAO 