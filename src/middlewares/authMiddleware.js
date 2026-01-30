const jwt = require("jsonwebtoken");
const { resGagal } = require("../helpers/payloads.js");

const verifyToken = (role) => (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return resGagal(res, 401, "Token tidak ditemukan");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return resGagal(res, 401, "Format token salah");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.username != role) {
      return resGagal(res, 400, "Access denied");
    }
    next();
  } catch (error) {
    return resGagal(res, 401, "Token tidak valid atau expired");
  }
};

module.exports = verifyToken;
