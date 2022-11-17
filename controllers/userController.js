const config = require("../config");

function getRoot(req, res) {}

function getLogin(req, res) {
  if (req.isAuthenticated()) {
    let user = req.user;
    console.log("user logueado");
    res.render("login-ok", {
      usuario: user.username,
  
    });
  } else {
    console.log("user NO logueado");
    // res.sendFile(__dirname + "/views/login.html");
    res.send("Usuario NO logueado")

  }
}

function getSignup(req, res) {
//   res.sendFile(__dirname + "/views/signup.html");
res.send("mostrando formulario logueo")
}

function postLogin(req, res) {
  let user = req.user.username;
  

  // res.sendFile(__dirname + "/views/index.html");
// res.send("Usuario logueado")
res.render("main", { user })
}

function postSignup(req, res) {
  let user = req.user;
 sendMailNewRegistration(user.username, user.nombre, user.direccion, user.edad)
//   res.sendFile(__dirname + "/views/index.html");
res.send("Usuario registrado")
}

function getFaillogin(req, res) {
  console.log("error en login");
  res.render("login-error",  {});
// res.send("error en login")
}

function getFailsignup(req, res) {
  console.log("error en signup");
//   res.render("signup-error", {});
res.send("error en signup")
}

function failRoute(req, res) {
    res.send("failRoute")
//   render("routing-error", {});
}

// Mails

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: config.MAIL_USUARIO,
    pass: config.MAIL_PASS,
  }
});

const sendMailNewRegistration = async (username, nombre, direccion, edad ) => {
    
    const mailOptions = {
        from: "Servidor Node",
        to: config.MAIL_USUARIO,
        subject: "Nuevo registro",
        html: ` Nuevo usuario registrado:
        Username: ${username},     
        Nombre: ${nombre},
        Dirección: ${direccion},
        Edad: ${edad}, `,
      };
    try {
      const info = await transporter.sendMail(mailOptions);

      console.log(info);
    } catch (error) {
      console.log(error);
    }
  }
 
module.exports = {
  getRoot,
  getLogin,
  postLogin,
  getFaillogin,
  // getLogout,
  failRoute,
  getSignup,
  postSignup,
  getFailsignup,

};
