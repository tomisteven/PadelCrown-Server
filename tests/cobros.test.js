const { RegistrarNuevoCliente } = require("./cobros");
const { test, describe } = require("@jest/globals");

describe("API FINANCIERA", () => {
  test("CLIENTE/ADMIN - Crear nuevo cliente EXISTENTE", async () => {
    const res = await fetch("http://localhost:8080/cobros/nuevo-cliente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "username3",
        password: "password2",
        nombre: "cliente nuevo3",
        telefono: "12345678",
        email: "totosteven65@gmail.com",
        direccion: "Av siempreviva 1234",
        provincia: "Buenos Aires",
        pagadas: [],
        pagos: [],
        pagando: false,
      }),
    });
    const data = await res.json();
    expect(data).toEqual({ message: "El usuario ya existe" });
  });

  test("CLIENTE/ADMIN - Crear nuevo cliente", async () => {
    const res = await fetch("http://localhost:8080/cobros/nuevo-cliente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "test" + Math.random(),
        password: "password2",
        nombre: "cliente nuevo4",
        telefono: "12345678",
        email: "totosteven65@gmail.com",
        direccion: "Av siempreviva 1234",
        provincia: "Buenos Aires",
        pagadas: [],
        pagos: [],
        pagando: false,
      }),
    });
    const data = await res.json();
    expect(data).toHaveProperty("_id");
  });

  test("CLIENTE/ADMIN - Eliminar cliente NO ENCONTRADO", async () => {
    const clientes = await fetch("http://localhost:8080/admin/cobros");
    const data = await clientes.json();
    const res = await fetch(
      `http://localhost:8080/cobros/cliente/eliminar/66b0ef410bf56f6f5d0180b0`,
      {
        method: "DELETE",
      }
    );

    const data2 = await res.json();
    expect(data2).toEqual({ message: "Cliente no encontrado" });
  });

  test("CLIENTE/ADMIN - Eliminar cliente del TEST", async () => {
    const clientes = await fetch("http://localhost:8080/admin/cobros");
    const data = await clientes.json();
    const cliente = data[data.length - 1];
    const res = await fetch(
      `http://localhost:8080/cobros/cliente/eliminar/${cliente._id}`,
      {
        method: "DELETE",
      }
    );

    const data2 = await res.json();
    expect(data2).toEqual({ message: "Cliente eliminado" });
  });

  test("ADMIN - Obtener intereses", async () => {
    const res = await fetch("http://localhost:8080/cobros/in/interes");
    const data = await res.json();
    expect(data.length).toBeGreaterThan(0);
  });

  test("ADMIN - Obtener Clientes", async () => {
    const res = await fetch("http://localhost:8080/admin/cobros");
    const data = await res.json();
    expect(data.length).toBeGreaterThan(0);
  });

  test("CLIENTE - CREAR nueva FINANCIACION", async () => {
    const client = await fetch(
      "http://localhost:8080/cobros/66b1032926221264b8b132cd"
    );
    const data = await client.json();

    const res = await fetch(
      `http://localhost:8080/cobros/nueva-financiacion/${data._id}`,

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          producto: "Atos 12k",
          precio: 200000,
          confirmacion: true,
          tipo: "Quincenal",
        }),
      }
    );
    const data2 = await res.json();

    expect(data2.ok).toBe(true);
  });

  test("Crear PAGO de CUOTA", async () => {
    const cliente = await fetch(
      "http://localhost:8080/cobros/66b1032926221264b8b132cd"
    );
    const data = await cliente.json();
    const pagar = await fetch(
      `http://localhost:8080/cobros/pago/${data._id}/cuota/${data.cuotasAPagar[0]._id}`,

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          producto: "Atos 12k",
        }),
      }
    );

    const data2 = await pagar.json();
    expect(data2.ok).toBe(true);
  });

  test("Eliminar FINANCIACION", async () => {
    const cliente = await fetch(
      "http://localhost:8080/cobros/66b1032926221264b8b132cd"
    );
    const data = await cliente.json();
    const res = await fetch(
      `http://localhost:8080/cobros/eliminar/financiacion/${data._id}`,

      {
        method: "GET",
      }
    );
    const data2 = await res.json();
    expect(data2.ok).toBe(true);
  });

  test("ADMIN - Eliminar registros del CLIENTE", async () => {
    const eliminarRegistro = await fetch(
      "http://localhost:8080/admin/cobros/vaciar/66b1032926221264b8b132cd"
    );

    const data = await eliminarRegistro.json();
    expect(data.ok).toBe(true);
  });
});
