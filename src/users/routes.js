const express = require("express");
const {
  register,
  login,
  searchUser,
  getAllUser,
  editPasswordForUser,
  removeUserForUser,
} = require("./controllers.js");
const confirmPassword = require("../middlewares/confirmPassword.js");
const { loginLimiter } = require("../middlewares/rateLimit.js");
const { validate, validateParams } = require("../middlewares/validate.js");
const { loginSchema, registerSchema } = require("../schemas/authSchema.js");
const changeSchema = require("../schemas/userSchema.js");
const idParamsSchema = require("../schemas/paramsSchema.js");
const verifyToken = require("../middlewares/authMiddleware.js");
const multer = require("multer");
const uploads = multer();

const router = express.Router();

router.post("/register", uploads.none(), validate(registerSchema), register);
router.post(
  "/auth/login",
  loginLimiter,
  uploads.none(),
  validate(loginSchema),
  login,
);
router.get(
  "/search/:id",
  validateParams(idParamsSchema),
  verifyToken("admin"),
  searchUser,
);
router.get("/", verifyToken("admin"), getAllUser);
router.post(
  "/delete/:id",
  validateParams(idParamsSchema),
  verifyToken("user"),
  confirmPassword,
  removeUserForUser,
);
router.patch(
  "/change",
  verifyToken("user"),
  uploads.none(),
  validate(changeSchema),
  editPasswordForUser,
);

module.exports = router;
