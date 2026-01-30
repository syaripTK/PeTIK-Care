process.env.TZ = "Asia/Jakarta";
const express = require("express");
const path = require("path");
const routerLaporan = require("./laporan/routes.js");
const routerTanggapan = require("./tanggapan/routes.js");
const routeUser = require("./users/routes.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", express.static(path.join(__dirname, "uploads")));
app.use("/api/laporan", routerLaporan);
app.use("/api/tanggapan", routerTanggapan);

//Tambahkan middlewares static files untuk mempublic folder yang berisi file yang nantinya akan dikonsumsi oleh frontend
// app.use("/api", express.static(path.join(__dirname, "uploads")));
const PORT = 3000;

app.use("/api/users", routeUser);

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

// const bcrypt = require("bcrypt");

// (async () => {
//   const password = "123456";
//   const hash = await bcrypt.hash(password, 10);

//   console.log("HASH:", hash);

//   const match = await bcrypt.compare("123456", hash);
//   console.log("MATCH:", match);
// })();


app.listen(PORT, () => {
  console.info(`Server berjalan di port ${PORT} ${new Date()}`);
});
