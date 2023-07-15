const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/suporte_devs', { useNewUrlParser: true });

const Schema = mongoose.Schema;

const FuncionarioSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  funcao: {
    type: String,
    required: true,
  },
});

const FuncionarioModel = mongoose.model('Funcionario', FuncionarioSchema);

module.exports = FuncionarioModel;