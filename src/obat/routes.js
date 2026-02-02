const express = require("express");
const router = express.Router();

const uploadObat = require("../middlewares/uploadMiddleware.js");
const {
  getAllObat,
  createObat,
  getObatById,
  updateObat,
  deleteObat,
} = require("./controllers.js");

const { validateObat } = require("../middlewares/obatMiddleware.js");

router.get("/", getAllObat);
router.get("/search/:id", getObatById);
router.post(
  "/create",
  uploadObat.single("foto_obat"),
  validateObat,
  createObat,
);
router.patch(
  "/update/:id",
  uploadObat.single("foto_obat"),
  validateObat,
  updateObat,
);
router.delete("/delete/:id", deleteObat);

module.exports = router;
