const express = require("express");
const router = express.Router();
const uploadObat = require("../middlewares/uploadMiddleware.js");
const cekUkuran = require("../middlewares/errorHandler.js");
const {
  getAllObat,
  createObat,
  getObatById,
  updateObat,
  deleteObat,
  searchObat,
} = require("./controllers.js");

router.get("/", getAllObat);
router.post("/tambah/", uploadObat.single("foto_obat"), cekUkuran, createObat);
router.get("/cari/:id", getObatById);
router.patch("/ubah/:id", uploadObat.single("foto_obat"), updateObat);
router.delete("/hapus/:id", deleteObat);
router.get("/search", searchObat);

module.exports = router;
