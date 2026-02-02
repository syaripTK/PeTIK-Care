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
} = require("./controllers.js");

const { validateObat } = require("../middlewares/obatMiddleware.js");

router.get("/", verifyToken("admin"), getAllObatAdmin);
router.get("/", verifyToken("user"), getAllObatUser);
router.get("/search/:id", verifyToken("admin"), getObatById);
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
router.delete("/delete/:id", verifyToken("admin"), deleteObat);

module.exports = router;
