// Importaciones
const { Pool } = require('pg');


// Instancia de clase Pool
const pool= new Pool({
  host: "localhost",
  user:"postgres",
  password: "Angie2128",
  database: "conecta_dos",
  allowExitOnIdle: true
});


// Consultas rutas get
const infoUsuario = async () => {
  const consulta = "SELECT * FROM usuarios"
  const resultado = await pool.query(consulta);
  console.log(resultado)
};

const infoProductos = async () => {
  const consulta = "SELECT * FROM productos"
  const resultado = await pool.query(consulta)
  console.log(resultado)
  return(resultado)
};


//Consultas rutas post
const verificaCredenciales =  async (correo, contraseña) => {
  const consulta = "SELECT * FROM usuarios WHERE correo = $1 AND contraseña = $2";
  const valores = [ correo, contraseña ];
  const { rowCount } = await pool.query(consulta, valores)
  if(rowCount === 1 || rowCount === 0){
    return rowCount
  }
  else{ return {"code":500, "message": "Problemas al ejecutar la consulta"}}
  
 
  // const { contraseña: contraseñaEncriptada } = usuario;
  // const contraseñaCorrecta =  bcrypt.compareSync(contraseña, contraseñaEncriptada)
  // if (!rowCount) 
  //   throw { code: 404, message: "No se encuentra usuario con estas credenciales" }

};

const registrarUsuario = async (nombre, edad, correo, contraseña, telefono, imagen) => {
  // const contraseñaEncriptada = bcrypt.hashSync(contrasena);
  // contraseña = contraseñaEncriptada;
  const consulta = "INSERT INTO usuarios VALUES (DEFAULT, $1, $2, $3, $4, $5, $6)";
  const valores = [ nombre, edad, correo, contraseña, telefono, imagen ]
  const resultado = await pool.query(consulta, valores)
  console.log("Usuario agregado con éxito")
  return(resultado)
};

const agregarProducto = async (titulo, imagen, descripcion, precio, correo, telefono) => {
  const consulta = "INSERT INTO productos VALUES (DEFAULT, $1, $2, $3, $4, $5, $6)";
  const valores = [titulo, imagen, descripcion, precio, correo, telefono];
  const resultado = await pool.query(consulta, valores)
  console.log("Producto agregado con éxito")
  return(resultado)
};


//Consultas rutas delete
const borrarProducto = async (idproducto) => {
  const consulta = "DELETE FROM productos WHERE idproducto = $1";
  const valores = [ idproducto ];
  const resultado = await pool.query(consulta, valores);
  console.log(resultado)
};



module.exports = {  verificaCredenciales,
                    infoUsuario,
                    infoProductos,
                    registrarUsuario,
                    agregarProducto,
                    borrarProducto};