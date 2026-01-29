process.env.TZ = "Asia/Jakarta";
const express = require("express");
const sequelize = require("./config/koneksi.js");
const path = require("path");
const routerLaporan = require("./laporan/routes.js");
const routerTanggapan = require("./tanggapan/routes.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Tambahkan middlewares static files untuk mempublic folder yang berisi file yang nantinya akan dikonsumsi oleh frontend
app.use("/api", express.static(path.join(__dirname, "uploads")));
const PORT = 8080;

app.use("/api/laporan", routerLaporan);
app.use("/api/tanggapan", routerTanggapan);

// app.get("/", async (req, res) => {
//   try {
//     await sequelize.authenticate();
//     return res.json({
//       message: "Database berhasil terkoneksi",
//     });
//   } catch (error) {
//     return res.json({ message: error.message });
//   }
// });

app.listen(PORT, () => {
  console.info(`Server berjalan di port ${PORT} ${new Date()}`);
});
