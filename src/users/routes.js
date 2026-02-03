const express = require("express");
const {
  register,
  login,
  searchUser,
  getAllUser,
  editPasswordForUser,
  removeUser,
  refreshToken,
  logout,
} = require("./controllers.js");
const confirmPassword = require("../middlewares/confirmPassword.js");
const { loginLimiter } = require("../middlewares/rateLimit.js");
const { validate, validateParams } = require("../middlewares/validate.js");
const { loginSchema, registerSchema } = require("../schemas/authSchema.js");
const { changeSchema, tokenSchema } = require("../schemas/userSchema.js");
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
  verifyToken("admin"),
  validateParams(idParamsSchema),
  searchUser,
);
router.get("/", verifyToken("admin"), getAllUser);
router.post(
  "/delete/byUser/:id",
  uploads.none(),
  verifyToken("user"),
  validateParams(idParamsSchema),
  confirmPassword,
  removeUser,
);
router.delete(
  "/delete/byAdmin/:id",
  verifyToken("admin"),
  validateParams(idParamsSchema),
  removeUser,
);
router.patch(
  "/change",
  verifyToken("user"),
  uploads.none(),
  validate(changeSchema),
  editPasswordForUser,
);
router.post("/auth/refresh", validate(tokenSchema), refreshToken);

router.post("/logout", validate(tokenSchema), logout);

module.exports = router;
