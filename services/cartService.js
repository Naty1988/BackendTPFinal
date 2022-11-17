const cartDao = require("../daos/cartDaos.js");

const getAllCarts = async () => {
  const data = await cartDao.getAllCarts();

  return data;
};

const createCart = async (email, DateAndTime, products, address, user)  => {
   
  const createdCart = await cartDao.createCart(email, DateAndTime, products, address, user);

  return createdCart;
};

const getCartById = async (cartId) => {
  
  if (typeof cartId !== "string") throw "cart ID must be string";

  const cart = await cartDao.getCartById(cartId);

  if (!cartId) throw "cart doesn't exist";

  return cart;
};

const updateCart = async ({ user, products }, cartId) => {
  
  const updatedCart = await cartDao.updateCart(
    { user, products },
    cartId
  );

  return updatedCart;
};

const delteCart = async (cartId) => {
  if (typeof cartId !== "string") throw "cart ID must be string";

  await cartDao.delteCart(cartId);
};

const getCartProducts = async (user) => {
  
  try {
    const response = await cartDao.getCartProducts(user)  
    return response;
  } catch (err) {
    console.log(err);
    res.json(new WSresponse(null, err, true, 320));
  }
}



 const cartService = {
    getAllCarts,
  createCart,
  getCartById,
  updateCart,
  delteCart,
  getCartProducts,
};

module.exports = cartService;