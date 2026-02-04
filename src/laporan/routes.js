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
  validateCreateLaporan,
  cekIptObatId,
  verifyToken(["user"]),
  createLaporan,
);
router.get("/", verifyToken(["admin"]), getLaporan);
router.get(
  "/search/:id",
  verifyToken(["admin"]),
  checkIdLaporan,
  getLaporanById,
);
router.delete(
  "/delete/:id",
  verifyToken(["user", "admin"]),
  checkIdLaporan,
  deleteLaporan,
);

module.exports = router;
