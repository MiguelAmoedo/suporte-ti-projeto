const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/suporte_devs', { useNewUrlParser: true });


const Schema = mongoose.Schema;

const ClienteSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
});

const ClienteModel = mongoose.model('Cliente', ClienteSchema);

module.exports = ClienteModel;