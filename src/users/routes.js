const express = require("express");
const { register } = require("./controllers.js");
// const upload = require("../middlewares/upload.js");
const multer = require("multer")
const uploads = multer()

const router = express.Router();

router.post("/register", uploads.none(), register);

module.exports = router;
