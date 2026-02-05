const express = require("express");
const { updateLaporan } = require("./controllers.js");
const verifyToken = require("../middlewares/authMiddleware.js");
const {
  validateCreateLaporan,
  checkIdLaporan,
} = require("../middlewares/tanggapanMiddleware.js");
const { updateLaporanSchema } = require("../schemas/laporanSchema.js");
const { validate, validateParams } = require("../middlewares/validate.js");
const params = require("../schemas/paramsSchema.js");
const router = express.Router();

router.patch(
  "/update/:id",
  verifyToken(["admin"]),
  validate(updateLaporanSchema),
  validateParams(params),
  updateLaporan,
);

module.exports = router;
