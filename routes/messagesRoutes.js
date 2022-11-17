const Router = require("express");
const router = Router();
const config = require("../config");
const messageController = require("../controllers/messageController")

router.get("/", messageController.getAll);
router.post("/", messageController.create);
router.get("/:id", messageController.getMessageById);
module.exports = router;