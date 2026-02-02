const multer = require("multer");
const { resGagal } = require("../helpers/payloads.js");

const pengecekanPoto = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return resGagal(400, "error", "Ukuran foto maksimal 2 MB");
    }

    return resGagal(400, "error", "Gagal Upload File");
  }

  if (err) {
    return resGagal(400, message.error);
  }

  next();
};

module.exports = pengecekanPoto;
