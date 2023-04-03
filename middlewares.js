const jwt = require("jsonwebtoken");
const { secretKey } = require("./secretKey");


const confirmarCredenciales = (req, res, next) => {
    const { correo, contraseña } = req.body
    if (!correo || !contraseña) {
        res
            .status(401)
            .send({ message: "No se recibieron las credenciales en esta consulta" })
    }
    next()
}

const verificacionDeToken = (req, res, next) => {
    const token = req.header("Authorization").split("Bearer ")[1]
    if (!token) throw { code: 401, message: "Debe incluir el token en las cabeceras (Authorization)" }

    const tokenValido = jwt.verify(token, secretKey)
    if (!tokenValido) throw { code: 401, message: "El token es inválido" }
    next()
}

module.exports = { confirmarCredenciales, verificacionDeToken }