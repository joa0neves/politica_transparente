const User = require("../models/user");
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router();
const SHA256 = require("crypto-js/sha256");


router.get('/list', async (req, res) => {
    try {
      const users = await User.find()
      res.json(users)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

  router.get('/list/:nome', getUserByName, (req, res) => {
    res.json(res.user)
  })

  router.get('/list/afiliacao/:afiliacao', getUserByAfiliacao, (req, res) => {
    res.json(res.user)
  })

router.get('/:id', getUser, (req, res) => {
  res.json(res.user)
})

router.post('/new', async (req, res) => {
  const user = new User({
    _id:uuidv4(),
    nome: req.body.nome,
    email: req.body.email,
    password: SHA256(req.body.password),
    tipo: req.body.tipo,
    afiliacao: req.body.afiliacao
  });
  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove()
    res.json({ message: 'Deleted User' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.patch('/:id', getUser, async (req, res) => {
  if (req.body.nome != null) {
    res.user.nome = req.body.nome
  }
  if (req.body.email != null) {
    res.user.email = req.body.email
  }
  if (req.body.password != null) {
    res.user.password = SHA256(req.body.password)
  }
  if (req.body.tipo != null) {
    res.user.tipo = req.body.tipo
  }
  if (req.body.afiliacao != null) {
    res.user.afiliacao = req.body.afiliacao
  }
  if (req.body.bio != null) {
    res.user.bio = req.body.bio
  }
  try {
    const updatedUser = await res.user.save()
    res.json(updatedUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

  async function getUser(req, res, next) {
    let user
    try {
      user = await User.findById(req.params.id)
      if (user == null) {
        return res.status(404).json({ message: 'Cannot find User' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.user = user
    next()
  }

  async function getUserByName(req, res, next) {
    let user
    try {
      user = await User.find({nome: { $regex: '.*' +  req.params.nome + '.*' }}).exec();
      if (user == null) {
        return res.status(404).json({ message: 'Cannot find User' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.user = user
    next()
  }

  async function getUserByAfiliacao(req, res, next) {
    let user
    try {
      user = await User.find({afiliacao: req.params.afiliacao.toUpperCase() }).exec();
      if (user == null) {
        return res.status(404).json({ message: 'Cannot find User' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.user = user
    next()
  }

  module.exports = router;