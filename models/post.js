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
  author_nome: {
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
    type: [{_id:String , nome : String, afiliacao : String}],
    required: true
  },
  empresa: {
    type: String,
    required: true
  },
  searchTags: {
    type: String,
    required: false
  },
  numeroVotos: {
    type: Number,
    default: 0,
    required: false
  },
  votos: {
    type: [String],
    default: [],
    required: false
  }
})

module.exports = mongoose.model('Post', postSchema)