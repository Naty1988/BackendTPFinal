const crypto = require("crypto");
const  Product = require("./product.class.js");

const productMap = {};

const createProduct = ({ data }) => {
  const id = crypto.randomBytes(10).toString("hex");
  const newProdcut = new Product(id, data);

  productMap[id] = newProdcut;

  return newProdcut;
};

const getProduct = ({ id }) => {
  if (!productMap[id]) throw new Error("Product doesn't exist");

  return productMap[id];
};

const getProducts = ({ field, value }) => {
  const products = Object.values(productMap);

  if (field && value) {
    return products.filter((product) => product[field] == value);
  } else {
    return products;
  }
};

const updateProduct = ({ id, data }) => {
  if (!productMap[id]) throw new Error("Product doesn't exist");

  const productUpDated = new Product(id, data);

  productMap[id] = productUpDated;

  return productUpDated;
};

const deleteProduct = ({ id }) => {
  if (!productMap[id]) throw new Error("Product doesn't exist");

  const productDeleted = productMap[id];

  delete productMap[id];

  return productDeleted;
};

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};