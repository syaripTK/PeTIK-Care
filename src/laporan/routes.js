const express = require("express");
const verifyToken = require("../middlewares/authMiddleware.js");
const {
  createLaporan,
  getLaporan,
  getLaporanById,
  deleteLaporan,
} = require("./controllers.js");
const {
  checkIdLaporan,
  validateCreateLaporan,
} = require("../middlewares/laporanMiddleware.js");

const router = express.Router();

router.post(
  "/create",
  validateCreateLaporan,
  verifyToken("user"),
  createLaporan,
);
router.get("/", getLaporan);
router.get("/cari/:id", checkIdLaporan, getLaporanById);
router.delete("/delete/:id", checkIdLaporan, deleteLaporan);

module.exports = router;
