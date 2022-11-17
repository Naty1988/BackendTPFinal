const axios = require("axios");

const _id = "6"

// Ruta: /product Metodo: GET 

// const getProduct = async () => {
//   try {
//     const response = await axios.get("http://localhost:8000/product", {
//     });
    
//     console.log("Ruta: /product Metodo: GET  - Mostrando todos los productos")
//     console.log(response.data);
//   } catch (err) {
//     console.log(err);
//   }
// };

// -----------------------------------------

// Ruta: /product/id Metodo: GET 

// const upDateProduct = async () => {
//   try {
//     const response = await axios.put(`http://localhost:8000/product/${_id}`, {
//       _id: "6",
//       title: "Cartulina con brillitos actualizada",
//       price: "400",
//       stock: "40",

//     });

//     console.log(response.data);
//     console.log("Ruta: /product/id Metodo: GET - Actualizando producto")
//   } catch (err) {
//     console.log(err);
//   }
// };

// -----------------------------------------
// Ruta: /product/id Metodo: GET

// const _id = "7"

// const getOneProduct = async () => {
//   try {
//     const response = await axios.get(`http://localhost:8000/product/${_id}`)
//     console.log("Ruta: /product/id Metodo: GET   - Mostrando un producto")
//     console.log(response.data);
//   } catch (err) {
//     console.log(err);
//   }
// };

// -----------------------------------------
// Ruta: /product Metodo: POST

// const createProduct = async () => {
//   try {
//     const response = await axios.post("http://localhost:8000/product", {
//         _id: "7",
//         title: "Cartulina con brillitos",
//         price: "400",
//         stock: "40",
//     });

//     console.log(response.config.data);
//     console.log("Ruta: /product Metodo: POST - Agregando un producto")
//   } catch (err) {
//     console.log(err);
//   }
// };

// -----------------------------------------
// Ruta: /product/id Metodo: DELETE


const deleteProduct = async () => {
  try {
    const response = await axios.delete(`http://localhost:8000/product/${_id}`)
    console.log(response.data);
    console.log("Ruta: /product/id Metodo: DELETE - Borrando un producto")
  } catch (err) {
    console.log(err);
  }
};

// -----------------------------------------
// Funciones:

// getProduct();
// createProduct();
// getOneProduct();
deleteProduct();
// upDateProduct();
