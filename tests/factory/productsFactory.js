const { faker } = require('@faker-js/faker')
faker.locale = "es";

function generateProduct() {
  return {
    _id: faker.finance.amount(5, 10, 0),
    title: faker.commerce.productName(),
    price: faker.finance.amount(5, 10, 0),
    stock: faker.finance.amount(5, 10, 0),
  };
}

module.exports = { generateProduct: generateProduct }