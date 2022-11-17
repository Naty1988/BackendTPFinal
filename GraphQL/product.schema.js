// import { buildSchema } from "graphql";
const { buildSchema } = require("graphql");

const productSchema = buildSchema(`
    input ProductInput {
        title: String,
        price: Int,
        stock: Int,
    }
    type Product {
        id: ID!,
        title: String,
        price: Int,
        stock: Int,
    }
    type Query {
        getProduct(id: ID!): Product,
        getProducts(field: String, value: String): [Product],
    }
    type Mutation {
        createProduct(data: ProductInput): Product,
        updateProduct(id: ID!, data: ProductInput): Product,
        deleteProduct(id: ID!): Product,
    }
`);

 module.exports = productSchema;