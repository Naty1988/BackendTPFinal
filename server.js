const config = require("./config");
const express = require('express');
const { json } = require('express');
const path = require('path')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const arrayProductos = []

// Conexión a base de datos
const StoreFactory = require("./store/factoryClient.js");
const storeFactory = new StoreFactory();
const database = storeFactory.createDatabaseClient(config.db);

// ----

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const util = require("util");
const parseArgs = require('minimist');

// const controllersdb = require("./controllersdb");
const MongoClient = require("./store/MongoClient");
const ProductDAO = require("./daos/Mongo/productMongoDao");

const { logger } = require("./libs/log4js")

// // Importación para Autenticación 

const bcrypt = require('bcrypt');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// // Session y cookies

const session = require('express-session')
const cookieParser = require("cookie-parser");

// -------
const cors = require('cors')
app.use(cors())
// Modo cluster opcional

const cluster = require("cluster");
const { cpus } = require("os");

// ---------

let mongoose = require('mongoose');
const Router = require("express");
const router = Router();
const routes = require("./routes/indexRoutes.js")
const routesUser = require("./routes/userRoutes");
const routesProduct = require("./routes/productRoutes");
const routesCart = require("./routes/cartRoutes");
const userController = require("./controllers/userController")

app.set('views', path.join(__dirname + '/views'))
app.set('view engine', 'ejs')

// Para funcionamiento de Socket.io

app.use(express.static(__dirname, + '/public'))
app.use(express.static(__dirname + "/views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// --
const User = require("./models/userModel")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const bodyParser = require( 'body-parser' );
app.use( bodyParser.urlencoded({ extended: true }) );
app.use(
  session({
    secret: config.SESION_PASS,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: config.TIEMPO_EXPIRACION,
    },
    rolling: true,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());


function hashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

function isValidPassword(plainPassword, hashedPassword) {
  return bcrypt.compareSync(plainPassword, hashedPassword);
}

const registerStrategy = new LocalStrategy(
  { passReqToCallback: true },
  async (req, username, password, done) => {
    try {
      const existingUser = await User.findOne({ username });
 
      if (existingUser) {
        return done(null, null);
      }
      console.log("creando un nuevo usuario")
      const newUser = {
        username,
        password: hashPassword(password),
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        edad: req.body.edad,
        telefono: req.body.telefono,
       
      };

      const createdUser = await User.create(newUser);
      req.user = username;
      done(null, createdUser);
    } catch (err) {
      console.log("Erro registrando usuario", err);
      done("Erro en registro", null);
    }
  }
);

const loginStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username });

    if (!user || !isValidPassword(password, user.password)) {
      return done(null, null);
    }

    done(null, user);
  } catch (err) {
    console.log("Error login", err);
    done("Error login", null);
  }
});

passport.use("register", registerStrategy);
passport.use("login", loginStrategy);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, done);
});

//  LOGIN

app.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/user/faillogin"}),
  userController.postLogin
);

//  REGISTER
;
app.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failsignup" }),
  userController.postSignup
);

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.render("login");
  }
}

//  LOGOUT

app.get("/logout", (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
res.send("Usuario deslogueado")
});
})
// ----------

// Configuración firebase

let mensajes = []

const traerMensajes = async () => {
  const db = admin.firestore();

  const mensajesDB = db.collection("mensajes");

  try {

    const userSnapshot = await mensajesDB.get()
    const mensajeDoc = userSnapshot.docs

    let response = mensajeDoc.map(mj => ({
      id: mj.id,
      author: mj.data().author,
      text: mj.data().text
    }))

    mensajes = response

    logger.info("mensajes ", mensajes)

  } catch (err) {
    loggerTodos.error(err);
  }
}

const guardarMensaje = async (mensaje) => {

  const db = admin.firestore();
  db.settings({ ignoreUndefinedProperties: true });

  const mensajesDB = db.collection("mensajes");
  try {
    const newMensaje = mensajesDB.doc();
    await newMensaje.create({ author: { alias: mensaje.author.alias, apellido: mensaje.author.apellido, edad: mensaje.author.edad, id: mensaje.author.id, avatar: mensaje.author.avatar, nombre: mensaje.author.nombre }, text: mensaje.text });

    logger.info('mensaje guardado en Firebase')
  } catch (err) {
    loggerTodos.error(err);
  }
}

// Socket.io

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('client:mensaje', mensaje => {

    console.log('mensaje recibido en el servidor: ', mensaje)

    mensajes.push(mensaje)
    console.log('mensaje pusheado: ', mensajes)

    guardarMensaje(mensaje)

    traerMensajes()

    io.emit('server: mensajes', mensajes)
  })

})

if (config.modoCluster && cluster.isMaster) {
    const numCPUs = cpus().length;

    console.log(`Número de procesadores: ${numCPUs}`);
    console.log(`PID MASTER ${process.pid}`);

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker) => {
      console.log(
        "Worker",
        worker.process.pid,
        "died",
        new Date().toLocaleString()
      );
      cluster.fork();
    });
  } else {
    
    try {
      database.connect();
        } catch(err) {
          console.log(err)
        }
      
    app.use("/", routes)
    app.use("/user", checkAuthentication, routesUser)
    app.use("/product", checkAuthentication, routesProduct)
    app.use('/cart', checkAuthentication, routesCart);
    app.listen(config.PORT, (err) => {
      if (err) return loggerTodos.error("error en listen server", err);
      logger.info(`Server running on port ${config.PORT} - PID WORKER ${process.pid}`);
    });
  }
