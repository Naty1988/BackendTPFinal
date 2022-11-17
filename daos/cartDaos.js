const Cart = require ("../models/cartModel");
const Product = require ("../models/mongoose/productModel");
const config = require("../config");

const getAllCarts = async () => {
  const carts = await Cart.find();

  return carts;
};

// Mensaje carrito

const twilio = require("twilio")

const accountSid = "AC96b91b5781959629eb3ea1e1c90946ee";
const authToken = "0a231f8850ebea8faae0f090fe23cdd1";

const client = twilio(accountSid, authToken);

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: config.MAIL_USUARIO,
    pass: config.MAIL_PASS,
  }
});

  const sendWPClient = async (nombre, telefono) => {
    console.log("Enviando WP a cliente")
    const option = {
      body: `Hola ${nombre}. Su pedido fue recibido. Se encuentra en proceso. `,
      from: "whatsapp:+14155238886",
      to: `whatsapp:+549${telefono}`,
    };
    try {
      const message = await client.messages.create(option);
      console.log(message);

    } catch (error) {
      console.log(error);
    }
  }

const createCart = async ( email, DateAndTime, products, address, user ) => {
  let productToFind = products
  const existingCart = await Cart.find({ email: user });
  const productToAdd = await Product.findById(productToFind);

  if (existingCart === "") {
    existingCart = false}

  if (existingCart) {
    existingCart.products.push(productToAdd);
    existingCart.push(productToAdd);
     await existingCart.save();
      return existingCart;
  } else {

    const newCart = new Cart({ email: user, DateAndTime: DateAndTime, products: [productToAdd], address: address });
console.log("entrndo al else");
    await newCart.save();
    return newCart;
  }
}

const getCartById = async (cartId) => {
  const cart = await Cart.findById(cartId);
  return cart;
};

const updateCart = async (updateData, cartId) => {
  const updatedCart = await Cart.updateOne(
    { _id: cartId },
    updateData
  );
  return updatedCart;
};

const delteCart = async (cartId) => {
  await Cart.deleteOne({ _id: cartId });
};

const getCartProducts = async (user)  => {
  try {
        const productosDelCarritoDelUsuario = await Cart.find({email: user })
    let listaProductos = []; 
    productosDelCarritoDelUsuario.forEach((item) => { 
      item.products.forEach((prod) => {
          listaProductos.push(prod);
      });
    });
      return listaProductos;
     } catch (err) {
    console.log(err);
    res.json(new WSresponse(null, err, true, 320));
  }
}

const cartDao = {
    getAllCarts,
    createCart,
    getCartById,
    updateCart,
    delteCart,
    getCartProducts,
};

module.exports = cartDao;