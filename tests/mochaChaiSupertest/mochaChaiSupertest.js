const supertest = require("supertest");
const { expect } = require("chai");
// const productsFactory = require("../factory/productsFactory");

let request;
let productToCreate;
let createdProduct;
let productToUpdate;
let updatedProduct;
let findedProduct;
let id = 4;
let idDelete = 59;
let idSerch = 4;

describe("Test over API REST FULL", () => {
    before(() => {
        request = supertest("http://localhost:8000/product");
    });

    describe("- POST /product", () => {
        productToCreate = {
            _id: "60",
            title: "Cartulina opaca",
            price: 200,
            stock: 20,
            __v: 0,
        }

        it("Should return status 200", async () => {
            const response = await request.post("/").send(productToCreate);
            createdProduct = response.body.data
            expect(response.status).to.eql(200);
        });

        it("Response should have id, title, price, stock, __v properties", () => {
            expect(createdProduct).to.keys("_id", "title", "price", "stock", "__v");
        });

        it("Should return created product", () => {
            expect(createdProduct._id).to.eql(productToCreate._id);
            expect(createdProduct.title).to.eql(productToCreate.title);
            expect(createdProduct.price).to.eql(productToCreate.price);
            expect(createdProduct.stock).to.eql(productToCreate.stock);
            expect(createdProduct.__v).to.eql(productToCreate.__v);
        });
    });

    describe("- GET /product", () => {
        it("Should return status 200", async () => {
            const response = await request
                .get("/")
            expect(response.status).to.eql(200);
        });

        it("Response should have id, title, price, stock, __v properties", () => {
            expect(createdProduct).to.keys("_id", "title", "price", "stock", "__v");

        });
    });

    describe("- PUT /product/id", () => {
        productToUpdate = {
            _id: "4",
            title: "Cartulina opaca actualizada13",
            price: 200,
            stock: 20,
            __v: 0,
        }

        it("Should return status 200", async () => {
            const response = await request.put(`/${id}`).send(productToUpdate);
            updatedProduct = response.body.data
            expect(response.status).to.eql(200);
        });

        it("Response should have id, title, price, stock, __v properties", () => {
            expect(updatedProduct).to.keys("_id", "title", "price", "stock", "__v");
        });

        it("Should return created product", () => {
            expect(productToUpdate._id).to.eql(updatedProduct._id);
            expect(productToUpdate.title).to.eql(updatedProduct.title);
            expect(productToUpdate.price).to.eql(updatedProduct.price);
            expect(productToUpdate.stock).to.eql(updatedProduct.stock);
            expect(productToUpdate.__v).to.eql(updatedProduct.__v);
        });
    });

    describe("- DELETE /product/id", () => {

        it("Should return status 200", async () => {
            const response = await request.delete(`/${idDelete}`);
            expect(response.status).to.eql(200);
        });

    });


    describe("- GET /product/id", () => {
        it("Should return status 200", async () => {
            const response = await request
                .get(`/${idSerch}`)
            findedProduct = response.body.data
            expect(response.status).to.eql(200);
        });

        it("Response should have id, title, price, stock, __v properties", () => {
            expect(findedProduct).to.keys("_id", "title", "price", "stock", "__v");
        });
    });
});
