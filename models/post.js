const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  author_id: {
    type: String,
    required: true
  },
  titulo: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  envolvidos: {
    type: [String],
    required: true
  }
})

module.exports = mongoose.model('Post', postSchema)