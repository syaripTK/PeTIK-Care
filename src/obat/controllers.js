const {
  tampilObat,
  tambahObat,
  cariIdObat,
  ubahObat,
  hapusObat,
  cariNamaObat,
} = require("./services.js");
const fs = require("fs");
const path = require("path");
const { resSukses, resGagal } = require("../helpers/payloads.js");

const getAllObat = async (req, res) => {
  try {
    const obat = await tampilObat();
    return resSukses(res, 200, "Data Obat", obat);
  } catch (error) {
    return resGagal(res, 500, error.message);
  }
};

const createObat = async (req, res) => {
  try {
    const { nama_obat, stok, kategori } = req.body;
    let foto_obat = null;
    if (req.file) {
      // console.log(req.file);
      // path basename digunakan untuk membaca full fatch dari direktori yang dimaksud
      // ini contohnya src/uploads/foto_alat-1769574062797-385646126.mp4
      // tapi akan membaca nama file nya aja
      foto_obat = path.basename(req.file.path);
    }
    const body = {
      nama_obat,
      stok,
      kategori,
      foto_obat,
    };

    const obat = await tambahObat(body);
    return resSukses(res, 201, "Data Obat", obat);
  } catch (error) {
    return resGagal(res, 500, error.message);
  }
};

const getObatById = async (req, res) => {
  try {
    const obat = await cariIdObat(req.params.id);
    if (!obat) {
      return resGagal(res, 404, "Obat not found");
    }
    return resSukses(res, 200, "Data Obat", obat);
  } catch (error) {
    return resGagal(res, 500, error.message);
  }
};

const updateObat = async (req, res) => {
  try {
    const id = req.params.id;
    const obatLama = await cariIdObat(id);
    const { nama_obat, stok, kategori } = req.body;
    let foto_obat = obatLama.foto_obat;
    // console.log(foto_barang);

    if (req.file) {
      if (obatLama.foto_obat) {
        const pathLama = path.join(__dirname, "../uploads", obatLama.foto_obat);

        if (fs.existsSync(pathLama)) {
          fs.unlinkSync(pathLama);
        }
      }

      foto_barang = path.basename(req.file.path);
    }
    const body = {
      nama_obat,
      kategori,
      foto_obat,
      stok,
    };
    const data = await ubahObat(id, body);
    return resSukses(res, 200, "Data obat berhasil diupdate", data);
  } catch (error) {
    return resGagal(res, 500, error.message);
  }
};

const deleteObat = async (req, res) => {
  try {
    const id = req.params.id;
    const obat = await cariIdObat(id);
    if (obat.foto_obat) {
      const filePath = path.join(__dirname, "../uploads", obat.foto_obat);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    const data = await hapusObat(id);
    return resSukses(res, 200, "Data berhasil dihapus", data);
  } catch (error) {
    return resGagal(res, 500, error.message);
  }
};

const searchObat = async (req, res) => {
  try {
    const { nama } = req.query;
    const data = await cariNamaObat(nama);
    return resSukses(res, 200, "Hasil pencarian obat", data);
  } catch (error) {
    return resGagal(res, 500, error.message);
  }
};

module.exports = {
  getAllObat,
  createObat,
  getObatById,
  updateObat,
  deleteObat,
  searchObat,
};
