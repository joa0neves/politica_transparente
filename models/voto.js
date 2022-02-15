const mongoose = require('mongoose')

const votoSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  post_id: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Voto', votoSchema);