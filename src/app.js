process.env.TZ = "Asia/Jakarta";
const express = require("express");
const path = require("path");

const obatRoutes = require("./obat/routes.js");
const routerLaporan = require("./laporan/routes.js");
const routerTanggapan = require("./tanggapan/routes.js");
const routeUser = require("./users/routes.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", express.static(path.join(__dirname, "uploads")));
app.use("/api/obat", obatRoutes);
app.use("/api/laporan", routerLaporan);
app.use("/api/tanggapan", routerTanggapan);
app.use("/api/users", routeUser);
const PORT = 3000;

app.listen(PORT, () => {
  console.info(`Server berjalan di port ${PORT} ${new Date()}`);
});
