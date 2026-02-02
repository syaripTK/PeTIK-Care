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
  cekIptUserId,
} = require("../middlewares/laporanMiddleware.js");

const router = express.Router();

router.post(
  "/create",
  validateCreateLaporan,
  cekIptObatId,
  cekIptUserId,
  verifyToken("user"),
  createLaporan,
);
router.get("/", getLaporan);
router.get("/search/:id", checkIdLaporan, getLaporanById);
router.delete(
  "/delete/byUser/:id",
  verifyToken("user"),
  checkIdLaporan,
  deleteLaporan,
);
router.delete(
  "/delete/byAdmin/:id",
  verifyToken("admin"),
  checkIdLaporan,
  deleteLaporan,
);

module.exports = router;
