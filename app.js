const express = require("express");
const productsRoutes = require("./routes/products.router");
const revendedoresRoutes = require("./routes/revendedores.router");
const clientsRoutes = require("./routes/clients.router");
const seguimientoRoutes = require("./routes/seguimiento.router");
var cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

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

//rutas
app.use(`/`, productsRoutes); //rutas de usuario
app.use(`/revendedores`, revendedoresRoutes); //rutas de usuario
app.use("/admin/clientes", clientsRoutes); //rutas de usuario
app.use("/seguimiento", seguimientoRoutes)

module.exports = app;
