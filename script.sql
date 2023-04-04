-- Crear base de datos
CREATE DATABASE conecta_dos;

-- Crear Tablas
CREATE TABLE usuarios   ( idusuario serial primary key NOT NULL,
                          nombre varchar(100),
                          edad int,
                          correo varchar (255) NOT NULL,
                          contraseña varchar (100) NOT NULL,                       
                          telefono varchar (100),                        
                          imagen varchar (255)
                        );

CREATE TABLE productos  ( idproducto serial primary key NOT NULL,
                          idusuario serial NOT NULL,
						              FOREIGN KEY (idusuario)
					  	            REFERENCES usuarios(idusuario),
                          titulo varchar(100),
                          imagen varchar (255),
                          descripcion varchar (255),
                          precio int,                         
                          correoProducto varchar (255),
                          telefonoProducto varchar (100)
                        );

-- Insertar ejemplos en tablas
INSERT INTO usuarios values   ( DEFAULT,
                                'Ejemplo Primero',
                                21,
                                'ejemploprimero@gmail.com',
                                'estaEsMicontraseña',
                                '+56912312312',
                                'https://contenidos.benidorm.org/sites/default/files/styles/user_profile_picture/public/2020-06/default_user.png'
                              );

INSERT INTO usuarios values   ( DEFAULT,
                                'Ejemplo Segundo',
                                35,
                                'ejemplosegundo1999@gmail.com',
                                'noTengocontraseña',
                                '+56932132132',
                                'https://contenidos.benidorm.org/sites/default/files/styles/user_profile_picture/public/2020-06/default_user.png'
                              );

INSERT INTO productos values  ( DEFAULT,
                                1,
                                'CHAQUETA DE MEZCLILLA HOMBRE',
                                'https://cf.shopee.com.co/file/27e1ae36d7bed2cd2b2ba16db4fea94f',
                                'Chaqueta de mezclilla para hombre con forro interior de chiporro. Talla L.',
                                25990,
                                'ejemploprimero@gmail.com',
                                '+56912312312'
                              );

INSERT INTO productos values  ( DEFAULT,
                                2
                                'CAMA IGLÚ PARA GATO',
                                'https://m.media-amazon.com/images/I/71r4vsh+8QL._AC_SX679_.jpg',
                                'Cómoda cama nido para gatos tipo iglú de poliéster. Las medidas son 40x40x35 y cuenta con cojín removible.',
                                19990,
                                'ejemplosegundo1999@gmail.com',
                                '+56932132132'
                              );


-- Consultas en tablas
SELECT * FROM usuarios;
SELECT * FROM productos;