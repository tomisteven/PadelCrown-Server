const Rifa = require("../models/Rifa");

const createRifa = async (req, res) => {
  const { cantidad } = req.body;

  const user = await Rifa.findById("661b77e9f1f1a203e3a23803");

  if (user) {
    let rifas = [];
    for (let i = 0; i < cantidad; i++) {
      rifas.push({
        numero: i + 1,
        fecha: new Date().toISOString(),
        estado: false,
        comprador: "",
        precio: 0,
        emailComprador: "",
        telefonoComprador: "",
        dni: "",
        codigoIdentificacionRifa: "",
      });
    }

    user.rifa = rifas;
    await user.save();
    res.status(200).json(user);
  } else {
    res.status(400).json({ message: "Usuario no encontrado" });
  }
};

const asignarRifa = async (req, res) => {
  const { nombre, telefono, rifas, dni, precio, email } = req.query;

  const user = await Rifa.findById("661b77e9f1f1a203e3a23803");

  const codigoIdentificacionRifa = nombre.substring(0, 2) + dni.substring(0, 3) + telefono.substring(0, 3);


  //solo las rifas que no han sido asignadas
  try {
    const rifasUser = user.rifa.filter((rifa) => rifa.estado === false);

    const rifaClient = rifas.split(",");

    rifasUser.forEach((rifa) => {
      if (rifaClient.includes(rifa.numero.toString())) {
        rifa.estado = true;
        rifa.comprador = nombre;
        rifa.telefonoComprador = telefono;
        rifa.emailComprador = email;
        rifa.dni = dni;
        rifa.precio = precio;
        rifa.codigoIdentificacionRifa = codigoIdentificacionRifa;
      }
    });

    await user.save();
    res.redirect("http://localhost:3000/rifas?ok=true&codigo=" + codigoIdentificacionRifa);
  } catch (error) {
    res.json({ mensaje: "error al asignar rifas", error, ok: false });
  }
};

const getRifas = async (req, res) => {
  const { estado } = req.query;
  const est = estado === "true" ? true : false;
  const user = await Rifa.findById("661b77e9f1f1a203e3a23803");

  let rifas = [];

  estado
    ? (rifas = user.rifa.filter((rifa) => rifa.estado === est))
    : (rifas = user.rifa);

  res.status(200).json(rifas);
};

const deleteAllRifas = async (req, res) => {
  /* const { user_id } = req.user; */
  const user = await Rifa.findById("661b77e9f1f1a203e3a23803");

  if (user) {
    user.rifa = [];
    await user.save();
    res.status(200).json({ user });
  } else {
    res.status(400).json({ message: "Usuario no encontrado" });
  }
};

module.exports = {
  createRifa,
  deleteAllRifas,
  asignarRifa,
  getRifas,
};
