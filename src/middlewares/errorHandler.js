const multer = require("multer");

const pengecekanPoto = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {

    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        status: "error",
        message: "Ukuran foto maksimal 2 MB",
      });
    }

    return res.status(400).json({
      status: "error",
      message: "Gagal upload file",
    });
  }

  if (err) {
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  }

  next();
};

module.exports = pengecekanPoto;
