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
    required: true
  }
})

module.exports = mongoose.model('User', userSchema);