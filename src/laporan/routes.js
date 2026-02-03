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
<<<<<<< HEAD
=======
  cekIptUserId,
>>>>>>> main
} = require("../middlewares/laporanMiddleware.js");

const router = express.Router();

router.post(
  "/create",
<<<<<<< HEAD
  verifyToken("user"),
  validateCreateLaporan,
  cekIptObatId,
=======
  validateCreateLaporan,
  cekIptUserId,
  cekIptObatId,
  verifyToken("user"),
>>>>>>> main
  createLaporan,
);
router.get("/", verifyToken("admin"), getLaporan);
router.get("/search/:id", verifyToken("admin"), checkIdLaporan, getLaporanById);
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
