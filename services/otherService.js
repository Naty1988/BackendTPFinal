const otherDao = require("../daos/otherDaos.js");

const getAllProductsTest = async () => {

    const dataTest = await otherDao.getAllProductsTest();
    return dataTest;
};


const getInfo = async () => {

    const dataInfo = await otherDao.getInfo();
    return dataInfo;
};

module.exports = { getAllProductsTest, getInfo,  }