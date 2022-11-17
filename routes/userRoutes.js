const Router = require("express");
const router = Router();
const userController = require("../controllers/userController")

router.get("/login", userController.getLogin);
router.get("/faillogin", userController.getFaillogin);
router.get("/register", userController.getSignup);
router.get("/failsignup", userController.getFailsignup);

module.exports = router;