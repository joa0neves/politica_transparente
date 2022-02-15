const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
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
    required: true
  },
  tipo: {
    type: String,
    default: "user",
    required: true
  },
  afiliacao: {
    type: String,
    required: false
  },
  searchTags: {
    type: String,
    required: false
  },
  bio: {
    type: String,
    default: "Vazio",
    required: false
  }

})

module.exports = mongoose.model('User', userSchema);