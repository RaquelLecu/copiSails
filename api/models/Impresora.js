/**
 * Impresora.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'colores',
  attributes: {
    impresora: { type: 'string', required: true },
    negro: { type: 'number', columnType: 'float', required: true },
    amarillo: { type: 'number', columnType: 'float', required: true },
    azul: { type: 'number', columnType: 'float', required: true },
    rosa: { type: 'number', columnType: 'float', required: true },
  },

  // Método estático para buscar todas las impresoras
  buscarTodas: async function () {
    return await Impresora.find();
  },

  buscarImpresora : async function (id) {
    return await Impresora.find({id: id});
  },

  updateImpresora: async function(id, data) {
    await Impresora.update({ id: id }).set(data);
  }
};

