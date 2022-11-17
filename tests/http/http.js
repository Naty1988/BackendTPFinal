const http = require("http");

// Ruta: /product Metodo: GET 

// const options = {
//   hostname: "127.0.0.1",
//   port: 8000,
//   path: "/product",
//   method: "GET",
//   headers: {
//     _id: "636aef729afe497ab3fe4af8",
//   },
// };

// const req = http.request(options, (res) => {
//   console.log(`StatusCode: ${res.statusCode}`);
// console.log("Ruta: /product Metodo: GET  - Mostrando todos los productos")
//   res.on("data", (data) => {
//     console.log(data.toString('utf-8'));
    
//   });
// });

// req.on("error", (err) => {
//   console.log(err);
// });

// req.end();

// ---------------------------
// Ruta: /product/id Metodo: GET 

// const _id = "5"

// const options = {
//   hostname: "127.0.0.1",
//   port: 8000,
//   path: `/product/${_id}`,
//   method: "GET",
//   headers: {
//     _id: "636aef729afe497ab3fe4af8",
//   },
// };

// const req = http.request(options, (res) => {
//   console.log(`StatusCode: ${res.statusCode}`);
// console.log("Ruta: /product/id Metodo: GET - Producto encontrado")
//   res.on("data", (data) => {
//     console.log(data.toString('utf-8'));
    
//   });
// });

// req.on("error", (err) => {
//   console.log(err);
// });

// req.end();

// ---------------------------
// Ruta: /product Metodo: POST 

// const data = JSON.stringify({
//     _id: "6",
//   title: "Cartulina opaca",
//   price: "200",
//   stock: "20",
// });

// const options = {
//   hostname: "127.0.0.1",
//   port: 8000,
//   headers: {
//     "Content-Type": "application/json",
//     "Content-length": data.length,
//   },
//   method: "POST",
//   path: "/product",
// };

// const request = http.request(options, (res) => {
//   console.log(`Statuscode ${res.statusCode}`);
// console.log("Ruta: /product Metodo: POST - Producto actualizado")

//   res.on("data", (data) => {
//     console.log(JSON.parse(data.toString("utf8")));
//   });
// });

// request.on("error", (err) => {
//   console.log(err);
// });

// request.write(data);

// request.end();

// // ---------------------------
// // Ruta: /product Metodo: POST 

// const _id = "637014d88f77253ed73ed903"

// const data = JSON.stringify({
//     _id: "4",
//   title: "Cartulina con brillitos",
//   price: "400",
//   stock: "40",
// });

// const options = {
//   hostname: "127.0.0.1",
//   port: 8000,
//   headers: {
//     "Content-Type": "application/json",
//     "Content-length": data.length,
//   },
//   method: "PUT",
//   path: `/product/${_id}`,
// };

// const request = http.request(options, (res) => {
//   console.log(`Statuscode ${res.statusCode}`);
//   console.log("Ruta: /product Metodo: POST  - Producto actualizado")
//   res.on("data", (data) => {
//     console.log(data.toString("utf8"));
//   });
// });

// request.on("error", (err) => {
//   console.log(err);
// });

// request.write(data);

// request.end();


// ---------------------------
// Ruta: /product Metodo: DELETE 

const _id = "637014d88f77253ed73ed903"

const options = {
  hostname: "127.0.0.1",
  port: 8000,
  method: "DELETE",
  path: `/product/${_id}`,
};

const request = http.request(options, (res) => {
  console.log(`Statuscode ${res.statusCode}`);
  console.log("Ruta: /product Metodo: DELETE - Producto borrado")
});

request.on("error", (err) => {
  console.log(err);
});

request.end();
