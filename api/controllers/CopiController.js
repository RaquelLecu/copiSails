/**
 * CopiController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const Impresora = require("../models/Impresora");
let hojas = 0;
let textos = [[], [], []];

module.exports = {
  home: async function (req, res) {
    const impresoras = await Impresora.buscarTodas();
    res.view("pages/homepage", {
      hojas: hojas,
      textos: textos,
      colores: impresoras,
    });
  },

  update: async function (req, res) {
    let letras = 0;
    let negro;
    let amarillo;
    let azul;
    let rosa;
    const id = parseInt(req.params.id) + 1;
    const impresora = await Impresora.buscarImpresora(id);
    hojas = hojas + textos[req.params.id].length;
    textos[req.params.id].forEach((text) => {
      letras = letras + text.length;
    });
    negro = impresora[0].negro - (letras * 0.5);
    amarillo = impresora[0].amarillo - (letras * 0.2);
    azul = impresora[0].azul - (letras * 0.3);
    rosa = impresora[0].rosa - (letras * 0.3);
    textos[req.params.id] = [];
    const data = {
      negro: negro,
      amarillo: amarillo,
      azul: azul,
      rosa: rosa
    };

    try {
      await Impresora.updateImpresora(id, data);
      res.redirect('/');
    } catch (error) {
      console.log(error);
      res.serverError();
    }
    res.redirect('/');
  },

  addText: function (req, res) {
    textos[req.query.n_impresora].push(req.query.texto);
    res.redirect("/");
  },
};
