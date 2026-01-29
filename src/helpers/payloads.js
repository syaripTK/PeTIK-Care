const resSukses = (res, code, message, data = null) => {
  return res.status(code).json({ status: "success", message, data });
};

const resGagal = (res, code, message) => {
  return res.status(code).json({ status: "error", message });
};

module.exports = { resSukses, resGagal };
