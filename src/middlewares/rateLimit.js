const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 5,
  ipv6Subnet: 56,
  message: {
    staus: "error",
    message: "Terlalu banyak percobaan login, coba lagi nanti",
  },
});

module.exports = {
  loginLimiter,
};
