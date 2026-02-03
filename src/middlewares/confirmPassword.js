const bcrypt = require("bcrypt");
const { findId } = require("../users/services.js");
const { resGagal } = require("../helpers/payloads.js");

module.exports = async (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return resGagal(res, 400, "Password wajib diisi");
  }
  const user = await findId(req.user.id);
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return resGagal(res, 401, "Password salah");
  }
  next();
};
