const mongoose = require('mongoose')

const credenciadoSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  nome: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  afiliacao: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('Credenciado', credenciadoSchema);