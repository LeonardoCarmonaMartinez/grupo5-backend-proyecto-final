-- Crear base de datos
CREATE DATABASE conecta_dos;

-- Crear Tablas
CREATE TABLE usuarios   ( idusuario serial primary key NOT NULL,
                          nombre varchar(100),
                          edad varchar(50),
                          direccion varchar (255),
                          correo varchar (255) NOT NULL,
                          contrasena varchar (100) NOT NULL,                       
                          telefono varchar (100)
                        );

CREATE TABLE productos  ( idproducto serial primary key,
                          usuario_id integer NOT NULL,
						              FOREIGN KEY (usuario_id)
					  	            REFERENCES usuarios(idusuario),
                          titulo varchar(100),
                          imagen varchar (255),
                          descripcion varchar (255),
                          precio varchar(50),                         
                          correoProducto varchar (255),
                          telefonoProducto varchar (100)
                        );

-- Insertar ejemplos en tablas
INSERT INTO usuarios values   ( DEFAULT,
                                'Ejemplo Primero',
                                '21',
                                'Calle ejemplo 123',
                                'ejemploprimero@gmail.com',
                                'estaesmicontrasena',
                                '+56912312312'
                              );

INSERT INTO usuarios values   ( DEFAULT,
                                'Ejemplo Segundo',
                                '35',
                                'Pasaje vamosquesepuede 321',
                                'ejemplosegundo1999@gmail.com',
                                'notengocontrasena',
                                '+56932132132'
                              );

INSERT INTO productos values  ( DEFAULT,
                                1,
                                'CHAQUETA DE MEZCLILLA HOMBRE',
                                'https://cf.shopee.com.co/file/27e1ae36d7bed2cd2b2ba16db4fea94f',
                                'Chaqueta de mezclilla para hombre con forro interior de chiporro. Talla L.',
                                '25990',
                                'ejemploprimero@gmail.com',
                                '+56912312312'
                              );

INSERT INTO productos values  ( DEFAULT,
                                2,
                                'CAMA IGLÚ PARA GATO',
                                'https://m.media-amazon.com/images/I/71r4vsh+8QL._AC_SX679_.jpg',
                                'Cómoda cama nido para gatos tipo iglú de poliéster. Las medidas son 40x40x35 y cuenta con cojín removible.',
                                '19990',
                                'ejemplosegundo1999@gmail.com',
                                '+56932132132'
                              );


-- Consultas en tablas
SELECT * FROM usuarios;
SELECT * FROM productos;

-- Ejemplo Login
-- {
--   "correo": "ejemploprimero@gmail.com", 
--   "contrasena": "estaesmicontrasena"
-- }

-- Ejemplo Agregar Producto
-- {
--   "idusuario": 1,
--   "titulo": "BOTAS PARA LLUVIA", 
--   "imagen": "https://cdn.gacel.cl/28275-home_default/bota-leda-negro-1410181.jpg",
--   "descripcion": "Botas negras de cuero importadas",
--   "precio": "80000",
--   "correoProducto": "ejemploprimero@gmail.com",
--   "telefonoProducto": "56912312312"
-- }

-- Ejemplo Registra Nuevo Usuario
-- {
--   "nombre": "Leonardo Carmona",
--   "edad": "36", 
--   "direccion": "Peninsula 2128",
--   "correo": "leonardo.carmona.m@gmail.com",
--   "contrasena": "minombreesleo",
--   "telefono": "+5697995548"
-- }