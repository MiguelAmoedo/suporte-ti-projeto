const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://desaamoedo:1234@suporte.ktkybui.mongodb.net/', { useNewUrlParser: true });


const Schema = mongoose.Schema;

const ClienteSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
});

const ClienteModel = mongoose.model('Cliente', ClienteSchema);

module.exports = ClienteModel;