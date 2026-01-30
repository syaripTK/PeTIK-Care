const { createUser, findByEmail, getUser } = require("./services.js");
const { resSukses, resGagal } = require("../helpers/payloads.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const duplicate = await findByEmail(email);
    if (duplicate != null) {
      return resGagal(
        res,
        409,
        "Email telah digunakan, silahkan masukkan email yang lain",
      );
    }
    const passHashed = await bcrypt.hash(password, 10);
    const body = { username, password: passHashed, email };
    await createUser(body);
    return resSukses(res, 201, "Data user berhasil ditambahkan");
  } catch (error) {
    return resGagal(res, 500, error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(password);
    const user = await findByEmail(email);
    if (user === null) {
      return resGagal(res, 404, "User tidak ditemukan");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return resGagal(res, 401, "Email atau password salah");
    }
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    return resSukses(res, 200, "Login berhasil", token);
  } catch (error) {
    return resGagal(res, 500, error.message);
  }
};

module.exports = { register, login };
