const config = require("../config");
const User = require("../models/userModel")
const Product = require("../models/mongoose/productModel")
const Cart = require("../models/cartModel")

const WSresponse = require("../classes/WSresponseClass.js");
const cartService = require("../services/cartService.js");

const getAllCarts = async (req, res) => {
  try {
    const response = await cartService.getAllCarts();

    res.json(new WSresponse(response, "Succes"));
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json(new WSresponse(null, "Internal server error", true, 500));
  }
};

const createCart = async (req, res) => {
  let user = req.user.username;  
  try {
    const response = await cartService.createCart(req.body.email, req.body.DateAndTime, req.body.products, req.body.address, user);

    sendWPClient(usuario.nombre, usuario.telefono)
    sendWPAdmin(usuario.nombre, usuario.username, product)

    const mailOptions = {
      from: "Servidor Node",
      to: "dale.kuphal47@ethereal.email",
      subject: `Nuevo pedido de ${usuario.nombre}  - ${usuario.username}`,
      html: ` Productos solicitados: ${product} `,
    };
    // Mail a admin

    const mandarMailCarritoAAdmin = async () => {
      try {
        const info = await transporter.sendMail(mailOptions);

        console.log(info);
      } catch (error) {
        console.log(error);
      }
    }

    mandarMailCarritoAAdmin()
    
    res.json(new WSresponse(response, "Products added"));
   } catch (err) {
    console.log(err);
    res.status(400).json(new WSresponse(null, err, true, 400));
  }
};

const getCartById = async (req, res) => {
  try {

    const response = await cartService.getCartById(req.params.id);
    res.json(new WSresponse(response, "Succes"));
  } catch (err) {
    console.log(err);
    res.json(new WSresponse(null, err, true, 460));
  }
};

const updateCart = async (req, res) => {
  try {
    const response = await cartService.updateCart(
      req.body,
      req.params.id
    );

    res.json(new WSresponse(response, "Cart updated"));
  } catch (err) {
    console.log(err);
    res.json(new WSresponse(null, err, true, 489));
  }
};

const delteCart = async (req, res) => {
  try {
    await cartService.delteCart(req.params.id);

    res.json(new WSresponse(null, "Cart deleted"));
  } catch (err) {
    console.log(err);
    res.json(new WSresponse(null, err, true, 320));
  }
};

const getCartProducts = async (req, res) => {
  let user = req.user.username;
  try {   
    const response = await cartService.getCartProducts(req.user.username)
    res.json(new WSresponse(response, "Cart probando cart constoler"));
  } catch (err) {
    console.log(err);
    res.json(new WSresponse(null, err, true, 320));
  }
};

// Mensaje wp carrito configuracion

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

// WP a cliente

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

// WP a admin

const sendWPAdmin = async (nombre, usuario, productos) => {
  console.log("Enviando WP a admin")
  const option = {
    body: `Nuevo pedido de ${nombre} - ${usuario}. Pedido: ${productos}  `,
    from: "whatsapp:+14155238886",
    to: `whatsapp:+549${config.TEL_ADMIN}`,
  };
  try {
    const message = await client.messages.create(option);
    console.log(message);

  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllCarts,
  createCart,
  getCartProducts,
  getCartById,
  updateCart,
  delteCart,
};