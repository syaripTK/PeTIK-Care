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
  removeMe,
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

router.post(
  "/auth/register",
  uploads.none(),
  validate(registerSchema),
  register,
);
router.post(
  "/auth/login",
  loginLimiter,
  uploads.none(),
  validate(loginSchema),
  login,
);
router.get(
  "/search/:id",
  verifyToken(["admin"]),
  validateParams(idParamsSchema),
  searchUser,
);
router.get("/", verifyToken(["admin"]), getAllUser);
router.post(
  "/delete/me",
  uploads.none(),
  verifyToken(["user"]),
  confirmPassword,
  removeMe,
);
router.delete(
  "/delete/:id",
  verifyToken(["admin"]),
  validateParams(idParamsSchema),
  removeUser,
);
router.patch(
  "/change-password",
  verifyToken(["user"]),
  uploads.none(),
  validate(changeSchema),
  editPasswordForUser,
);
router.post("/auth/refresh", validate(tokenSchema), refreshToken);

router.post("/auth/logout", verifyToken(["user" , "admin"]), validate(tokenSchema), logout);

module.exports = router;
