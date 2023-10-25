const autenticacion = (req, res, next) => {
  let token = req.headers.authorization;
  token == "token_padelcrown"
    ? next()
    : res.status(403).send({ message: "No tienes autorización" });
};

module.exports = { autenticacion };
