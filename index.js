const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, (err, res) => {
  if (err) {
    throw err;
  } else {
    console.log("La conexion a la base de datos es correcta");
    app.listen(process.env.PORT || 8080, () => {
      console.log("#####################");
      console.log("##### API REST #####");
      console.log("http://localhost:" + process.env.PORT);
      console.log("PORT: " + process.env.PORT);
    });
  }
});
