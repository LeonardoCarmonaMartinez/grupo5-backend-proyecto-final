// Importaciones
const express = require("express");
const cors = require("cors")
const jwt = require("jsonwebtoken");
const { secretKey } = require("./secretKey") 
const { verificaCredenciales,
        infoProductos,
        infoUsuario,
        registrarUsuario, 
        agregarProducto, 
        borrarProducto} = require("./consultas");


// Uso de express
const app = express();
app.listen(3001, console.log("SERVIDOR ENCENDIDO"));
app.use(express.json());
app.use(cors());


//                    RUTAS GET

//Para ver información de los usuarios registrados
app.get("/perfil", async (req, res) => {
  try {
    const usuarios = await infoUsuario()
    res.json(usuarios)
    } catch (error) {
        res.status(500).send(error)
    }
});

//Para ver información de todos los productos agregados
app.get("/productos", async (req, res) => {
  try {
    const productos = await infoProductos()
      res.json(productos)   
  } catch (error) {
      res.status(error.code || 500).send(error)    
  }
});


//                    RUTAS POST

//Para registrar un usuario nuevo
app.post("/registro", async (req, res) => {
  try {
    const { nombre, edad, direccion, correo, contrasena, telefono } = req.body
    await registrarUsuario( nombre, edad, direccion, correo, contrasena, telefono )
    res.send("Usuario registrado con éxito")
  } catch (error) {
    res.status(error).send(error)
  }  
});


//Para verificar credenciales e iniciar sesión de usuario ya registrado
app.post("/login",async (req, res) => {
  try {
    const {correo, contrasena} = req.body;
    
    const idUsuario = await verificaCredenciales(correo, contrasena);

    if( idUsuario != 0) {
      const token = jwt.sign({ correo }, secretKey);
      const data = {
        token: token,
        idUsuario: idUsuario
      };
      res.status(200).send(data);
    } else if(idUsuario === 0){
      res.sendStatus(401)
    } else {res.status(500).send({})}
    
  } catch (error) {
      console.log(error)
      res.status(error.code || 500).send(error)    
  }
});


//Para añadir un producto nuevo
app.post("/productos", async (req, res) => {
  try {
    const {idusuario, titulo, imagen, descripcion, precio, correoProducto, telefonoProducto} = req.body;
    await agregarProducto(idusuario, titulo, imagen, descripcion, precio, correoProducto, telefonoProducto);
    res.send("Producto agregado con éxito")  
  } catch (error) {
    res.status(error).send(error)
  } 
});


//                    RUTAS DELETE

//Para borrar un producto de las vistas En Venta y Galeria
app.delete("/productos/:idproducto", async (req, res) => {
  try {
    const {idproducto} = req.params;
    await borrarProducto (idproducto);
    res.send("Producto borrado con éxito")  
  } catch (error) {
    res.status(error).send(error)
  } 
});



//                    RUTA NOT FOUND
app.use("*", (req, res) => {
    res.status(200).send({ message: "La ruta consultada no esta disponible" })
});


module.exports = { app };