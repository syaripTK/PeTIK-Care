const express = require("express");
const { updateLaporan } = require("./controllers.js");
const verifyToken = require("../middlewares/authMiddleware.js");
const {
  validateCreateLaporan,
  checkIdLaporan,
} = require("../middlewares/tanggapanMiddleware.js");

const router = express.Router();

router.patch(
  "/update/:id",
  checkIdLaporan,
  validateCreateLaporan,
  verifyToken(["admin"]),
  updateLaporan,
);

module.exports = router;
