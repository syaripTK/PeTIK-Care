const multer = require("multer");

const pengecekanPoto = (err, req, res, next) => {
  // error dari multer
  if (err instanceof multer.MulterError) {

    // file terlalu besar
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        status: "error",
        message: "Ukuran foto maksimal 3 MB",
      });
    }

    return res.status(400).json({
      status: "error",
      message: "Gagal upload file",
    });
  }

  // error dari fileFilter (PNG/JPEG)
  if (err) {
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  }

  next();
};

module.exports = pengecekanPoto;
