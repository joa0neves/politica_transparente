const User = require("../models/user");
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router();
const SHA256 = require("crypto-js/sha256");


router.get('/users', async (req, res) => {
    try {
      const users = await User.find()
      res.json(users)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

router.get('/users/:id', getUser, (req, res) => {
  res.json(res.user)
})

router.post('/users/new', async (req, res) => {
  const user = new User({
    _id:uuidv4(),
    nome: req.body.nome,
    email: req.body.email,
    password: SHA256(req.body.password),
    tipo: req.body.tipo
  });
  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json({ message: err.message });
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
      user = await User.find({nome: req.params.id}).exec();
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