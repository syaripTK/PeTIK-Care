const express = require("express");
const { register, login, searchUser } = require("./controllers.js");
const { loginLimiter } = require("../middlewares/rateLimit.js");
const { validate, validateParams } = require("../middlewares/validate.js");
const { loginSchema, registerSchema } = require("../schemas/authSchema.js");
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

module.exports = router;
