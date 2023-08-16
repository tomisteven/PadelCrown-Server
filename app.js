const express = require("express");
const productsRoutes = require("./routes/products.router");
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
app.use(express.static("./uploads"));

//rutas
app.use(`/`, productsRoutes); //rutas de usuario

module.exports = app;
