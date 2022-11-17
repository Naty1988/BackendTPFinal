const Router = require("express");
const router = Router();
const messageController = require("../controllers/messageController")

router.get("/", messageController.getAll);
router.get("/:id", messageController.getMessageById);

module.exports = router;