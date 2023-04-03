const request = require("supertest");
const server = require("../index");

describe("Testeo CRUD de rutas Marketplace Conecta_dos", () => {

  it("", async () => {
    const {body: productos} = await request(server).get("/productos").send();
    expect(productos).toBeInstanceOf(Array);
  });

  it("Traer un status 200 cada vez que se ingresa un nuevo producto a la tabla productos", async () => {
    const id = Math.floor(Math.random() * 999);
        const producto = { id, nombre: "Nuevo productos" };

        const { statusCode: status  } = await request(server)
            .post("/producto")
            .send(producto);
        expect(status).toBe(200);

  });

  it("Corroborar que el producto eliminado ya no se encuentra en la tabla a la que pertenecía", async () => {
    const jwt = "token";
    const idDeProductoAEliminar = id_en_venta
    const { body: productos } = await request(server)
    .delete(`/productos/${idDeProductoAEliminar}`)
    .set("Authorization", jwt)
    .send();
    const ids = productos.map(p => p.id)
    expect(ids).not.toContain(idDeProductoAEliminar);
    });


  it("", async () => {

  });
});