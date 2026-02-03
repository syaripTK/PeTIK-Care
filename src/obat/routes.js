const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware.js");
const uploadObat = require("../middlewares/uploadMiddleware.js");

const {
  getAllObatAdmin,
  getAllObatUser,
  createObat,
  getObatById,
  updateObat,
  deleteObat,
  searchObat,
} = require("./controllers.js");

const { validateObat } = require("../middlewares/obatMiddleware.js");

router.get("/admin", verifyToken("admin"), getAllObatAdmin);
router.get("/user", verifyToken("user"), getAllObatUser);
router.get("/cari/:id", verifyToken("admin"), getObatById);
router.get("/search", verifyToken("admin"), searchObat);
router.post(
  "/create",
  verifyToken("admin"),
  uploadObat.single("foto_obat"),
  validateObat,
  createObat,
);
router.patch(
  "/update/:id",
  verifyToken("admin"),
  uploadObat.single("foto_obat"),
  validateObat,
  updateObat,
);
router.delete("/hapus/:id", verifyToken("admin"), deleteObat);

module.exports = router;
