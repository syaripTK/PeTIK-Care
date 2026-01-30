process.env.TZ = "Asia/Jakarta";
const express = require("express");
const path = require("path");
const routerLaporan = require("./laporan/routes.js");
const routerTanggapan = require("./tanggapan/routes.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", express.static(path.join(__dirname, "uploads")));
const PORT = 8080;

app.use("/api/laporan", routerLaporan);
app.use("/api/tanggapan", routerTanggapan);

app.listen(PORT, () => {
  console.info(`Server berjalan di port ${PORT} ${new Date()}`);
});
