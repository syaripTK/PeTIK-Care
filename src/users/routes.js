const express = require("express");
const { register, login } = require("./controllers.js");
const { loginLimiter } = require("../middlewares/rateLimit.js");
const multer = require("multer");
const uploads = multer();

const router = express.Router();

router.post("/register", uploads.none(), register);
router.post("/auth/login", loginLimiter, uploads.none(), login);

module.exports = router;
