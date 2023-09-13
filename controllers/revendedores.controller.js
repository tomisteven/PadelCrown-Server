const Revendedores = require("../models/revendedores.js");


const createRevendedor = async (req, res) => {
    const { name, direccion, telefono, perfil, email } = req.body;
    const newRevendedor = new Revendedores({ name, direccion, telefono, perfil, email });
    const revendedorSaved = await newRevendedor.save();
    res.status(201).json(revendedorSaved);
}

const getRevendedores = async (req, res) => {
    const revendedores = await Revendedores.find();
    res.json(revendedores);
}



module.exports = {

    getRevendedores,
    createRevendedor
}