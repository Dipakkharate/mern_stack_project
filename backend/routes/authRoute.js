const express = require("express")
const { loginWithGoogle } = require("../controllers/auth")
const router = express.Router()

router.post("/google", loginWithGoogle)

module.exports = router