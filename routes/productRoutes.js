const Router = require("express");
const router = Router();
const config = require("../config");
const productController = require("../controllers/productController")
const DaoFactory = require("../factory/productDaoFactory")
const daoFactory = new DaoFactory();
const productDao = daoFactory.createDao(config.db);

router.get("/", productController.getAll);
router.post("/", productController.create);
router.get("/cotizador", productController.getAllWithCurrencies);
router.get("/:id", productController.getProductById);
router.get("/category/:category", productController.getProductByCategory);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;