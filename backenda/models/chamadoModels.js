const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://desaamoedo:1234@suporte.ktkybui.mongodb.net/', { useNewUrlParser: true });


const Schema = mongoose.Schema;

const ChamadoSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  andar: {
    type: String,
    required: true,
  },
  assunto: {
    type: String,
    required: true,
  },
  setor: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  texto: {
    type: String,
    required: true,
  },
  dataCriacao: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['aberto', 'em andamento', 'concluído'],
    default: 'aberto'
  },
  funcionarios: [{
    type: Schema.Types.ObjectId,
    ref: 'Funcionario'
  }],
});

const ChamadoModel = mongoose.model('Chamado', ChamadoSchema);

module.exports = ChamadoModel;