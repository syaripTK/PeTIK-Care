const { ubahLaporan, tampilId } = require("./services.js");

const { resSukses, resGagal } = require("../helpers/payloads.js");

const updateLaporan = async (req, res) => {
  try {
    const id = req.params.id;
    const datas = await tampilId(id);
    if (datas === null) {
      return resGagal(res, 404, "Data laporan tidak ditemukan");
    }
    const { tanggapan } = req.body;
    const body = { tanggapan };
    const data = await ubahLaporan(id, body);
    return resSukses(res, 200, "Data laporan berhasil di update", data);
  } catch (error) {
    return resGagal(res, 500, error.message);
  }
};

module.exports = { updateLaporan };
