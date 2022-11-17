const { expect }  = require("chai");
const supertest  = require("supertest");
const productsFactory = require("./factory/productsFactory.js");
const userFactory = require("./factory/userFactory.js");
let request;
let token;

describe("Testing product routes", () => {
  before(async () => {
    request = supertest("http://localhost:3000");

    const postResponse = await request
      .post("/login")
      .send({ ...userFactory.generateUser(), password: "salva" });

    const createdUser = postResponse.body;

    const response = await request
      .post("/login")
      .send({ email: createdUser.email, password: "salva" });

    token = response.body.token;
  });

  describe("- POST /api/product", () => {
    const productToCreate = factoryProducts.generateProduct();
    let response;

    it("Should return 201", async () => {
      response = await request
        .post("/product")
        .set({ Authorization: `Bearer ${token}` })
        .send(productToCreate);

      expect(response.status).to.eql(201);
    });

    it("Should return the created product", () => {
      expect(response.body.name).to.eql(productToCreate.name);
      expect(response.body.price).to.eql(Number(productToCreate.price));
      expect(response.body.stock).to.eql(Number(productToCreate.stock));
    });
  });
});