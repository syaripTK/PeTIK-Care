const {
  tampilObatAdmin,
  tampilObatUser,

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

const getAllObatAdmin = async (req, res) => {
  try {
    const obat = await tampilObatAdmin();
    return resSukses(res, 200, "Data Obat", obat);
  } catch (error) {
    return resGagal(res, 500, error.message);
  }
};

const getAllObatUser = async (req, res) => {
  try {
    const obat = await tampilObatUser();
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
      foto_obat = path.basename(req.file.path);
    }
    const body = {
      nama_obat,
      stok,
      kategori,
      foto_obat,
    };

    const obat = await tambahObat(body);
    return resSukses(res, 201, "Data obat berhasil ditambahkan", obat);
  } catch (error) {
    return resGagal(res, 500, error.message);
  }
};

const getObatById = async (req, res) => {
  try {
    const id = req.params.id;
    const obat = await cariIdObat(id);
    return resSukses(res, 200, "Data Obat By Id", obat);
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

    if (req.file) {
      if (obatLama.foto_obat) {
        const pathLama = path.join(__dirname, "../uploads", obatLama.foto_obat);

        if (fs.existsSync(pathLama)) {
          fs.unlinkSync(pathLama);
        }
      }

      foto_obat = path.basename(req.file.path);
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
  getAllObatAdmin,
  getAllObatUser,
  createObat,
  getObatById,
  updateObat,
  deleteObat,
  searchObat,
};
