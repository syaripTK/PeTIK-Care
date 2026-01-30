const express = require("express");
const { updateLaporan } = require("./controllers.js");
const verifyToken = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.patch("/update/:id", verifyToken, updateLaporan);

module.exports = router;
