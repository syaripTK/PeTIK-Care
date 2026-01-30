const express = require("express");
const verifyToken = require("../middlewares/authMiddleware.js");
const {
  createLaporan,
  getLaporan,
  getLaporanById,
  deleteLaporan,
} = require("./controllers.js");

const router = express.Router();

router.post("/create", verifyToken("user"), createLaporan);
router.get("/", getLaporan);
router.get("/cari/:id", getLaporanById);
router.delete("/delete/:id", deleteLaporan);

module.exports = router;
