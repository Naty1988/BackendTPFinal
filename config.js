const dotenv = require('dotenv')
dotenv.config()

const parseArgs = require('minimist');

const options = {
	alias: {
		p: "PORT",
	}
}

const args = parseArgs(process.argv.slice(2), options);

console.log("Puerto recibido por CLI: ", args.PORT);

const modoCluster = process.argv[3] == "CLUSTER";

console.log("modoCluster?: ", modoCluster);

const db = process.argv[2] || "MONGO";
console.log("db desde config: ", db)


 
const mariaDbUri = process.env.DB_URI;
const mongoDbUrl = process.env.MONGO_URL;
const TIEMPO_EXPIRACION = 100000;
const URL_BASE_DE_DATOS = process.env.URL_BASE_DE_DATOS;
const SESION_PASS = process.env.SESION_PASS;
const PORT = process.env.PORT  || 8000;
const MAIL_USUARIO = process.env.MAIL_USUARIO
const MAIL_PASS = process.env.MAIL_PASS
const TEL_ADMIN = process.env.TEL_ADMIN

module.exports = {
	db,
	modoCluster,
	mariaDbUri,
	mongoDbUrl,
	TIEMPO_EXPIRACION,
	URL_BASE_DE_DATOS,
	SESION_PASS,
	PORT,	
	MAIL_USUARIO,
	MAIL_PASS,
	TEL_ADMIN
}

