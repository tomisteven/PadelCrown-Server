const axios = require("axios");
const Rifa = require("../models/Rifa");
/* import { MercadoPagoConfig, Payment } from "mercadopago"; */
const { MercadoPagoConfig, Payment, Preference } = require("mercadopago");

const validarRifas = (rifasSeleccionadasParaComprar, rifasYaVendidas) => {
  // Iterar sobre las rifas seleccionadas para comprar
  for (let i = 0; i < rifasSeleccionadasParaComprar.length; i++) {
    // Iterar sobre las rifas ya vendidas
    for (let j = 0; j < rifasYaVendidas.length; j++) {
      // Si el número de la rifa ya vendida coincide con una seleccionada para comprar, retornar falso
      if (rifasYaVendidas[j].numero === rifasSeleccionadasParaComprar[i]) {
        return false;
      }
    }
  }
  // Si ninguna rifa seleccionada para comprar coincide con una ya vendida, retornar true
  return true;
};

const createPayment = async (req, res) => {
  const { precio, nombre, telefono, rifas, dni, email } = req.body;
  const url = "https://api.mercadopago.com/checkout/preferences";
  const urlServer = "https://particular-bernita-digitalcode.koyeb.app";

  const user = await Rifa.findById("661b77e9f1f1a203e3a23803");
  const rifasAsignadas = user.rifa.filter((rifa) => rifa.estado === true);

  // Verificar si las rifas seleccionadas para comprar ya fueron asignadas
  const rifasNoAsignadas = validarRifas(rifas, rifasAsignadas);

  if (!rifasNoAsignadas) {
    // Si alguna rifa seleccionada ya fue asignada, enviar un mensaje de error o manejar la situación según lo desees
    return res.status(400).json({
      error: "Algunas de las rifas seleccionadas ya fueron asignadas.",
      ok: false,
    });
  } else {
    const pay = await axios.post(
      url,
      {
        items: [
          {
            title: "Rifa By Padelcrown " + dni + " " + "[" + rifas + "]",
            unit_price: precio,
            quantity: 1,
            picture_url:
              "https://padelcrown.store/static/media/LOGO%20ACTUAL.af177bacdace9bad462d.webp",
          },
        ],
        back_urls: {
          success: `${urlServer}/rifa/asignar?nombre=${nombre}&telefono=${telefono}&rifas=${rifas}&dni=${dni}&precio=${precio}&email=${email}`,
          failure: "http://localhost:3000/payment/failure",
          pending:
            "https://particular-bernita-digitalcode.koyeb.app/payment/pending",
        },
        auto_return: "approved",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      }
    );

    return res.status(200).json({
      message: "Rifas asignadas correctamente",
      ok: true,
      pay: pay.data.init_point,
    });
  }
};

const createPayment2 = async (req, res) => {
  // Step 2: Initialize the client object
  const client = new MercadoPagoConfig({
    accessToken: process.env.ACCESS_TOKEN,
    options: {
      sandbox: true,
      timeout: 1000,
    },
  });
  const preference = new Preference(client);

  // Step 3: Create a preference
  const preferenceData = {
    items: [
      {
        id: "rifas23423",
        title: "Rifa By Padelcrown",
        unit_price: 1,
        quantity: 1,
      },
    ],
    back_urls: {
      success:
        "https://particular-bernita-digitalcode.koyeb.app/payment/success",
      failure:
        "https://particular-bernita-digitalcode.koyeb.app/payment/failure",
      pending:
        "https://particular-bernita-digitalcode.koyeb.app/payment/pending",
    },
    auto_return: "approved",
  };

  try {
    const createdPreference = await preference.create({ body: preferenceData });
    res.json(createdPreference.init_point);
  } catch (error) {
    console.error("Error creating preference:", error);
  }
};

const failurePay = async (req, res) => {
  res.send("pago fallido, intente de nuevo");
};

module.exports = {
  createPayment,
  /*   getPayment, */
  createPayment2,
  failurePay,
};
