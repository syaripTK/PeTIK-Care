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
const params = require("../schemas/paramsSchema.js");
const {
  createObatSchema,
  updateObatSchema,
} = require("../schemas/obatSchemas.js");
const { validate, validateParams } = require("../middlewares/validate.js");

router.get("/lookObat/byAdmin", verifyToken(["admin"]), getAllObatAdmin);
router.get("/lookObat/byUser", verifyToken(["user"]), getAllObatUser);
router.get(
  "/search/:id",
  verifyToken(["admin"]),
  validateParams(params),
  getObatById,
);
router.get("/search", verifyToken(["admin"]), searchObat);
router.post(
  "/create",
  verifyToken(["admin"]),
  uploadObat.single("foto_obat"),
  validate(createObatSchema),
  createObat,
);
router.patch(
  "/update/:id",
  validateParams(params),
  verifyToken(["admin"]),
  validate(updateObatSchema),
  updateObat,
);
router.delete(
  "/delete/:id",
  validateParams(params),
  verifyToken(["admin"]),
  deleteObat,
);

module.exports = router;
