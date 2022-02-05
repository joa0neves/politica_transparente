const User = require("../models/user");
const Politico = require("../models/politico");
const Credenciado = require("../models/credenciado");
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/users', async (req, res) => {
    try {
      const users = await User.find()
      res.json(users)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

  router.get('/politicos', async (req, res) => {
    try {
      const politicos = await Politico.find()
      res.json(politicos)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

  router.get('/credenciados', async (req, res) => {
    try {
      const credenciados = await Credenciado.find()
      res.json(credenciados)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

  router.get('/users/:id', getUser, (req, res) => {
    res.json(res.user)
  })

  router.get('/politicos/:id', getPolitico, (req, res) => {
    res.json(res.politico)
  })

  router.get('/credenciados/:id', getCredenciado, (req, res) => {
    res.json(res.credenciado)
  })




  async function getPolitico(req, res, next) {
    let politico
    try {
        politico = await Politico.findById(req.params.id)
      if (politico == null) {
        return res.status(404).json({ message: 'Cannot find Politico' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.politico = politico
    next()
  }

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

  async function getCredenciado(req, res, next) {
    let credenciado
    try {
        credenciado = await Credenciado.findById(req.params.id)
      if (credenciado == null) {
        return res.status(404).json({ message: 'Cannot find Credenciado' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.credenciado = credenciado
    next()
  }