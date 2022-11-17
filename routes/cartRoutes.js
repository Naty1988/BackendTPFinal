const Router = require("express");
const router = Router();


const cartController = require("../controllers/cartController.js")

router.get("/", cartController.getAllCarts);
router.post("/", cartController.createCart);
router.get("/productos", cartController.getCartProducts);
router.get("/:id", cartController.getCartById);
router.put("/:id", cartController.updateCart);
router.delete("/:id", cartController.delteCart);

module.exports = router;