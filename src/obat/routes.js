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

const {
  validateObat,
  checkIdObat,
  validateUpdateStok,
} = require("../middlewares/obatMiddleware.js");

router.get("/lookObat/byAdmin", verifyToken(["admin"]), getAllObatAdmin);
router.get("/lookObat/byUser", verifyToken(["user"]), getAllObatUser);
router.get("/search/:id", checkIdObat, verifyToken(["admin"]), getObatById);
router.get("/search", verifyToken(["admin"]), searchObat);
router.post(
  "/create",
  verifyToken(["admin"]),
  uploadObat.single("foto_obat"),
  validateObat,
  createObat,
);
router.patch(
  "/update/:id",
  checkIdObat,
  verifyToken(["admin"]),
  validateUpdateStok,
  updateObat,
);
router.delete("/delete/:id", checkIdObat, verifyToken(["admin"]), deleteObat);

module.exports = router;
