const mongoose = require('mongoose')

const empresaSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  nome: {
    type: String,
    required: true
  },
  bio: {
      type: String,
      required : true
  }
})

module.exports = mongoose.model('Empresa', empresaSchema);