const express = require("express")
const { registerUser, getAllUser, deleteAllUser } = require("../controllers/userController")
const router = express.Router()

router.get("/", getAllUser)
router.post("/register", registerUser)
router.delete("/destroy", deleteAllUser)

module.exports = router