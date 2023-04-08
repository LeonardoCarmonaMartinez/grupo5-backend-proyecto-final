const jwt = require("jsonwebtoken");
const { secretKey } = require("./secretKey");


const verificacionDeToken = (req, res, next) => {
    const token = req.header("Authorization").split("Bearer ")[1]
    if (!token) throw { code: 401, message: "Debe incluir el token en las cabeceras (Authorization)" }

    const tokenValido = jwt.verify(token, secretKey)
    if (!tokenValido) throw { code: 401, message: "El token es inválido" }
    next()
}

module.exports = { verificacionDeToken }