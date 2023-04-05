// Importaciones
const express = require('express');
const cors = require('cors')
const jwt = require("jsonwebtoken");

// const { confirmarCredenciales, verificacionDeToken } =require('./middlewares')
const { secretKey } = require('./secretKey') 
const { verificaCredenciales,
        infoProductos,
        infoUsuario,
        registrarUsuario, 
        agregarProducto,
        borrarProducto} = require('./consultas');


// Uso de express
const app = express();
// const port = process.env.PORT || "8080"
app.listen(3001, console.log("SERVIDOR ENCENDIDO"));

app.use(express.json());
app.use(cors());


//                      Rutas get

//Para ver información de los usuarios registrados
app.get("/perfil/:idusuario", async (req, res) => {
  try {
    const usuario = await infoUsuario()
    res.json(usuario)
    console.log(usuario)
    } catch (error) {
        res.status(500).send(error)
    }
});

//Para ver información de todos los productos agregados
app.get("/productos", async (req, res) => {
  try {
    const productos = await infoProductos()
      res.json(productos)
      console.log(productos)    
  } catch (error) {
      res.status(error.code || 500).send(error)    
  }
});



//                        Rutas post

//Para registrar un usuario nuevo
app.post("/registro", async (req, res) => {
  try {
    const { nombre, edad, correo, contraseña, telefono, imagen } = req.body
    await registrarUsuario( nombre, edad, correo, contraseña, telefono, imagen )
    res.send("Usuario registrado con éxito")
  } catch (error) {
    res.status(error.code).send(error)
  }  
});


//Para verificar credenciales e iniciar sesión de usuario ya registrado
app.post("/login", async (req, res) => {
  console.log("aloha")
  try {
    const {correo, contraseña} = req.body;
    console.log(req.body)
    const response = await verificaCredenciales(correo, contraseña);
    if( response === 1) {
      const token = jwt.sign({ correo }, secretKey);
      console.log(token)
      res.status(200).send(token)
    } else if(response === 0){
      res.sendStatus(401)
    } else {res.status(500).send(response)}
    
  } catch (error) {
      console.log(error)
      res.status(error.code || 500).send(error)    
  }
});

//Para añadir un producto nuevo
app.post("/productos", async (req, res) => {
  try {
    const { titulo, imagen, descripcion, precio, correo, telefono } = req.body;
    await agregarProducto(titulo, imagen, descripcion, precio, correo, telefono );
    res.send("Producto agregado con éxito")  
  } catch (error) {
    res.status(error.code).send(error)
  } 
});




//                        Rutas delete

//Para borrar un producto identificado por su id de producto
app.delete("/productos/:idproducto", async (req, res) => {
  try{
    const { idproducto } = req.params
    const Authorization = req.header("Authorization")
    const token = Authorization.split("Bearer ")[1]
    jwt.verify(token, secretKey)
    const {correo} = jwt.decode(token)
    await borrarProducto(idproducto)
    res.send(`El usuario ${correo} ha eliminado el producto de id ${idproducto}`)
  } catch (error) {
    res.status(error.code || 500).send(error)
  }
})



//               Ruta Home
app.use("/", (req, res) => {
    res.status(200).send({ message: "Ruta Home" })
});

//               Ruta por defecto
app.use("*", (req, res) => {
  res.status(400).send({ message: "La ruta consultada no existe" })
});

module.exports = { app };