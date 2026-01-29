const { createUser } = require("./services.js");
const { resSukses, resGagal } = require("../helpers/payloads.js");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const passHashed = await bcrypt.hash(password, 10);
    const body = { username, password: passHashed, email };
    await createUser(body);
    return resSukses(res, 201, "Data user berhasil ditambahkan");
  } catch (error) {
    return resGagal(res, 500, error.message);
  }
};

module.exports = { register };
