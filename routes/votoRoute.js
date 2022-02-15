require('dotenv').config();
const express = require('express');
const router = express.Router();
var SHA256 = require("crypto-js/sha256");
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');
const Voto = require("../models/voto");

router.get('/list', async (req, res) => {
    try {
      const votos = await Voto.find()
      res.json(votos)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

router.post('/new', async (req, res) => {
    const voto = new Voto({
        _id:uuidv4(),
        user_id: req.body.user_id,
        post_id: req.body.post_id
      });
      try {
        const newVoto = await voto.save()
        res.status(201).json(newVoto)
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
  })

  router.delete('/:id', async (req, res) => {
    try {
        await res.voto.remove()
        res.json({ message: 'Deleted Voto' })
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
  })

  module.exports = router;