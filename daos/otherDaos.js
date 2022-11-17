const { faker } = require('@faker-js/faker')

const util = require("util");
const parseArgs = require('minimist');

faker.locale = 'es'
let arrayProductos = [];


const getAllProductsTest = () => {

    let id = arrayProductos.length ? (arrayProductos.length + 1) : 1

    for (let i = 1; i <= 5; i++) {
        arrayProductos.push({
            id,
            title: faker.animal.type(),
            price: faker.finance.account(2),
            stock: faker.finance.account(2),
        })
        id++
    }
    return arrayProductos;
}

const getInfo = () => {
 
    const info = `
        Argumentos de entrada: ${parseArgs(process.argv.slice(2))}     
        Nombre de la plataforma / Sistema operativo: ${process.platform}
        Version de Node.js: ${process.version}
        Memoria total reservada: ${util.inspect(process.memoryUsage(), {
      showHidden: false,
      depth: null,
      colors: true,
    })}
        Path de ejecución: ${process.cwd()}
        Process ID: ${process.pid}
        Carpeta del proyecto: ${process.execPath}
    `;
    return info;
};

module.exports =  { getAllProductsTest, getInfo,  }