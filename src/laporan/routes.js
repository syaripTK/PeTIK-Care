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
  cekIptObatId,
} = require("../middlewares/laporanMiddleware.js");

const router = express.Router();

router.post(
  "/create",
  verifyToken("user"),
  validateCreateLaporan,
  cekIptObatId,
  createLaporan,
);
router.get("/", verifyToken("admin"), getLaporan);
router.get("/search/:id", verifyToken("admin"), checkIdLaporan, getLaporanById);
router.delete("/delete/byUser/:id", checkIdLaporan, deleteLaporan);
router.delete("/delete/byAdmin/:id", checkIdLaporan, deleteLaporan);

module.exports = router;
