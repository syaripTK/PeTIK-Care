const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  createUser,
  findByEmail,
  getUser,
  findById,
  remove,
  editPassword,
  createRefresh,
  findByToken,
  removeToken,
  findId,
} = require("./services.js");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../helpers/generateToken.js");
const { resSukses, resGagal } = require("../helpers/payloads.js");

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
    return resSukses(res, 201, "Registrasi berhasil");
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
      return resGagal(res, 401, "Password salah!");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const body = { userId: user.id, token: refreshToken };
    await createRefresh(body);
    return resSukses(res, 200, "Login berhasil", { accessToken, refreshToken });
  } catch (error) {
    return resGagal(res, 500, error.message);
  }
};

const searchUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findById(id);
    return resSukses(res, 200, "Data user berhasil ditemukan", user);
  } catch (error) {
    return resGagal(res, 500, error.message);
  }
};

const getAllUser = async (req, res) => {
  try {
    const data = await getUser();
    return resSukses(res, 200, "Data semua user", data);
  } catch (error) {
    return resGagal(res, 500, error.message);
  }
};

const editPasswordForUser = async (req, res) => {
  try {
    const { email, passwordLama, passwordBaru } = req.body;
    const account = await findByEmail(email);
    if (account === null) {
      return resGagal(res, 404, "User tidak ditemukan");
    }
    const isMatch = await bcrypt.compare(passwordLama, account.password);
    if (!isMatch) {
      return resGagal(res, 401, "Password salah!");
    }
    const newPassword = await bcrypt.hash(passwordBaru, 10);
    const body = { password: newPassword };
    await editPassword(email, body);
    return resSukses(res, 201, "Password berhasil diubah");
  } catch (error) {
    return resGagal(res, 500, error.message);
  }
};

const removeUserForUser = async (req, res) => {
  try {
    const { id } = req.params;
    await remove(id);
    return resSukses(res, 200, "Data berhasil dihapus");
  } catch (error) {
    return resGagal(res, 500, error.message);
  }
};

const refreshToken = async (req, res) => {
  try {
    if (!req.body) {
      return resGagal(res, 400, "Body request tidak valid");
    }
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return resGagal(res, 400, "Refresh token tidak ditemukan");
    }
    const token = await findByToken(refreshToken);
    if (!token) {
      return resGagal(res, 403, "Refresh token tidak valid");
    }
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET,
      async (err, decoded) => {
        if (err) {
          return resGagal(res, 403, "Refresh token tdk valid!");
        }
        const user = await findId(decoded.id);
        const newAccessToken = generateAccessToken(user);
        console.info(newAccessToken);
        return resSukses(res, 200, "Token berhasil direfresh!", {
          accessToken: newAccessToken,
        });
      },
    );
  } catch (error) {
    return resGagal(res, 500, error.message);
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    await removeToken(refreshToken);
    return resSukses(res, 200, "Logout berhasil");
  } catch (error) {
    return resGagal(res, 500, error.message);
  }
};

module.exports = {
  register,
  login,
  searchUser,
  getUser,
  getAllUser,
  editPasswordForUser,
  removeUserForUser,
  refreshToken,
  logout,
};
