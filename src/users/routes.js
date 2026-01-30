const express = require("express");
const { register, login } = require("./controllers.js");
const { loginLimiter } = require("../middlewares/rateLimit.js");
const validate = require("../middlewares/validate.js");
const { loginSchema, registerSchema } = require("../schemas/authSchema.js");
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

module.exports = router;
