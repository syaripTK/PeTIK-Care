const express = require("express");
const { updateLaporan } = require("./controllers.js");

const router = express.Router();

router.patch("/update/:id", updateLaporan);

module.exports = router;
