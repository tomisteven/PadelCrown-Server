const express = require("express");
const productsRoutes = require("./routes/products.router");
const revendedoresRoutes = require("./routes/revendedores.router");
const clientsRoutes = require("./routes/clients.router");
const seguimientoRoutes = require("./routes/seguimiento.router");
const rifa = require("./routes/rifa.router");
const mercadoPago = require("./routes/mercadoPago.router");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { createProxyMiddleware } = require("http-proxy-middleware");

dotenv.config();

//configuramos el servidor
const app = express();

//configuraciones
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//configuramos el cors
app.use(cors());

//archivos estaticos a la carpeta uploads
/* app.use(express.static("./uploads")); */

const proxy = createProxyMiddleware({
  target: "https://particular-bernita-digitalcode.koyeb.app/admin/clientes", // URL del servidor de destino
  changeOrigin: true,
  pathRewrite: {
    "^/api": "", // Opcional: reescribir la parte de la ruta de la URL
  },
  headers: {
    Authorization: "token_padelcrown",
  },
});
app.use("/api/admin/clientes", proxy);

//rutas
app.use(`/`, productsRoutes); //rutas de usuario
app.use(`/revendedores`, revendedoresRoutes); //rutas de usuario
app.use("/admin/clientes", clientsRoutes); //rutas de usuario
app.use("/seguimiento", seguimientoRoutes);
app.use("/rifa", rifa);
app.use("/payment", mercadoPago);

module.exports = app;
