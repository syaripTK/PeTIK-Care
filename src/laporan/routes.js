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
const { laporanSchema } = require("../schemas/laporanSchema.js");
const params = require("../schemas/paramsSchema.js");
const { validate, validateParams } = require("../middlewares/validate.js");
const router = express.Router();

router.post(
  "/create",
  validate(laporanSchema),
  verifyToken(["user"]),
  createLaporan,
);
router.get("/", verifyToken(["admin"]), getLaporan);
router.get(
  "/search/:id",
  verifyToken(["admin"]),
  validateParams(params),
  getLaporanById,
);
router.delete(
  "/delete/:id",
  verifyToken(["user", "admin"]),
  validateParams(params),
  deleteLaporan,
);

module.exports = router;
