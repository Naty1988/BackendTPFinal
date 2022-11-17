const WSresponse = require("../classes/WSresponseClass");
const otherService = require("../services/otherService");

const getAllProductsTest = async (req, res) => {

  try {
    const response = await otherService.getAllProductsTest();

    res.json(new WSresponse(response, "Succes"));
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json(new WSresponse(null, "Internal server error", true, 500));
  }
};

const getInfo = async (req, res) => {

  try {
    const response = await otherService.getInfo();

    res.json(new WSresponse(response, "Succes"));
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json(new WSresponse(null, "Internal server error", true, 500));
  }
};

 module.exports = { getAllProductsTest, getInfo }