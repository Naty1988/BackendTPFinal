const productDao = require("../daos/Mongo/productMongoDao");

const getAll = async () => {
  const data = await productDao.getAll();

  return data;
};

const create = async ({ title, price, stock }) => {
    price = Number(price)
    stock = Number(stock)
  if (typeof title !== "string") throw "Title must be string";
  // if (typeof price !== "number") throw "Price must be number";
  if (typeof stock !== "number") throw "Stock must be number";

  const createdProduct = await productDao.createProduct({
    title,
    price,
    stock,
  });

  return createdProduct;
};

const getProductById = async (productId) => {
  
  if (typeof productId !== "string") throw "Product ID must be string";

  const product = await productDao.getProductById(productId);

  if (!product) throw "Product doesn't exist";

  return product;
};

const getProductByCategory = async(Category) => {
  const response = await productDao.getProductByCategory(Category)   
  res.json(new WSresponse(response, "Product found by category"));
  
};

const updateProduct = async ({ title, price, stock }, productId) => {
    price = Number(price)
    stock = Number(stock)
  if (typeof title !== "string") throw "Title must be string";
  if (typeof price !== "number") throw "Price must be number";
  if (typeof stock !== "number") throw "Stock must be number";
  if (typeof productId !== "string") throw "Product ID must be string";

  const updatedProduct = await productDao.updateProduct(
    { title, price, stock },
    productId
  );

  return updatedProduct;
};

const deleteProduct = async (productId) => {
  if (typeof productId !== "string") throw "Product ID must be string";

  await productDao.deleteProduct(productId);
};

 const productService = {
   getAll,
   create,
   getProductById,
  updateProduct,
  getProductByCategory,
  deleteProduct,
};
module.exports = productService;