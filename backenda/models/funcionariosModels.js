const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://desaamoedo:1234@suporte.ktkybui.mongodb.net/', { useNewUrlParser: true });

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