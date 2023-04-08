// Importaciones
const { Pool } = require('pg');


// Instancia de clase Pool
const pool= new Pool({
  
  //        CREDENCIALES POSTGRES
  host: "localhost",
  user:"postgres",
  password: "Angie2128",
  database: "conecta_dos",
  allowExitOnIdle: true


   //      CREDENCIALES CLEVER-CLOUD
//   host: "bjfcnsesorhhrgh8f0bj-postgresql.services.clever-cloud.com",
//   user:"ukwjrkcag4d5cuucxwvk",
//   password: "GFho4Km5Q6dkaVbpBCiMSdsr2H80FU",
//   database: "bjfcnsesorhhrgh8f0bj",
//   port: 5432,
//   allowExitOnIdle: true
});


// Consultas rutas get
const infoUsuario = async () => {
  const consulta = "SELECT * FROM usuarios"
  const dataUsuarios = await pool.query(consulta);
  return(dataUsuarios.rows)

};

const infoProductos = async () => {
  const consulta = "SELECT * FROM productos"
  const dataProductos = await pool.query(consulta)
  return(dataProductos.rows)
};


//Consultas rutas post
const verificaCredenciales =  async (correo, contrasena) => {
  try {
    const consultaExisteUsuario = "SELECT idUsuario FROM usuarios WHERE correo = $1 AND contrasena = $2 limit 1";
    const valores = [ correo, contrasena ];
    const data = await pool.query(consultaExisteUsuario, valores);

    var idUsuario = 0;
    
    if (data != null) {
      idUsuario =  data.rows[0].idusuario;
    } else {
      return 0;
    }

    if(idUsuario != 0){
      return idUsuario
    }
    else{ return {"code":500, "message": "Problemas al ejecutar la consulta"}}
    
  } catch (error) {
    console.log("se callo al verificar credenciales");
    console.log(error);
    return 0;
  }
};  

const registrarUsuario = async (nombre, edad, direccion, correo, contrasena, telefono ) => {
  const consulta = "INSERT INTO usuarios VALUES (DEFAULT, $1, $2, $3, $4, $5, $6)";
  const valores = [ nombre, edad, direccion, correo, contrasena, telefono ]
  const resultado = await pool.query(consulta, valores)
  return(resultado)
};

const agregarProducto = async (idusuario, titulo, imagen, descripcion, precio, correoProducto, telefonoProducto) => {
  const consulta = "INSERT INTO productos VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7)";
  const valores = [idusuario, titulo, imagen, descripcion, precio, correoProducto, telefonoProducto];
  const resultado = await pool.query(consulta, valores)
  return(resultado)
};


//Consultas rutas delete
const borrarProducto = async (idproducto) => {
  const consulta = "DELETE FROM productos WHERE idproducto = $1";
  const valores = [ idproducto ];
  await pool.query(consulta, valores);
};



module.exports = {  verificaCredenciales,
                    infoUsuario,
                    infoProductos,
                    registrarUsuario,
                    agregarProducto,
                    borrarProducto};