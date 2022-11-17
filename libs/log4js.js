const log4js = require("log4js");

log4js.configure({
  appenders: {
    miLoggerConsola: { type: "console" },
    miLoggerFile: { type: "file", filename: "./src/loggs/info.log" },
  },
  categories: {
    default: { appenders: ["miLoggerConsola"], level: "trace" },
    consola: { appenders: ["miLoggerConsola"], level: "debug" },
    archivo: { appenders: ["miLoggerFile"], level: "warn" },
    todos: { appenders: ["miLoggerConsola", "miLoggerFile"], level: "error" },
  }
});

// Definir niveles

const logger = log4js.getLogger();
const loggerConsola = log4js.getLogger('consola');
const loggerArchivo = log4js.getLogger('archivo');
const loggerTodos = log4js.getLogger('todos');

module.exports = {
  logger,
  loggerConsola,
  loggerArchivo,
  loggerTodos
}