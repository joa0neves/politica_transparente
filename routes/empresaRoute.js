require('dotenv').config();
const express = require('express');
const router = express.Router();
var SHA256 = require("crypto-js/sha256");
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');
const Empresa = require("../models/empresa");



router.get('/list', async (req, res) => {
    try {
        const empresas = await Empresa.find()
        res.json(empresas)
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
  })

  router.post('/new', async (req, res) => {
    const empresa = new Empresa({
      _id:uuidv4(),
      nome: req.body.nome,
      bio: req.body.bio
    });
    try {
      const newEmpresa = await empresa.save()
      res.status(201).json(newEmpresa)
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  })

  router.delete('/:id', getEmpresa, async (req, res) => {
    try {
      await res.empresa.remove()
      res.json({ message: 'Deleted empresa' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

  router.get('/:id', getEmpresa, (req, res) => {
    res.json(res.empresa)
  })

  async function getEmpresa(req, res, next) {
    let empresa
    try {
        empresa = await Empresa.findById(req.params.id)
      if (empresa == null) {
        return res.status(404).json({ message: 'Cannot find Empresa' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.empresa = empresa
    next()
  }

  async function getPostByNome(req, res, next) {
    let empresa
    try {
        empresa = await Empresa.find({titulo: { $regex: '.*' +  req.params.nome + '.*' }}).exec();
      if (empresa == null) {
        return res.status(404).json({ message: 'Cannot find Empresa' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.empresa = empresa
    next()
  }

  module.exports = router;