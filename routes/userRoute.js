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
    res.status(200).send(res.user)
  })

  router.get('/search/:tag', search, (req, res) => {
    res.json(res.users)
  })

  router.get('/list/afiliacao/:afiliacao', getUserByAfiliacao, (req, res) => {
    res.json(res.user)
  })

router.get('/:id', getUser2, (req, res) => {
  res.json(res.user)
})

router.post('/new', async (req, res) => {
  let temp;
  try {
    temp = await User.findOne({email : req.body.email}).exec();
    if (temp != null) {
      return res.status(404).json({ message: 'Email Taken' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  const user = new User({
    _id:uuidv4(),
    nome: req.body.nome,
    email: req.body.email,
    password: SHA256(req.body.password)
  });
  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

router.post('/new/admin', async (req, res) => {
  let temp;
  try {
    temp = await User.findOne({email : req.body.email}).exec();
    if (temp != null) {
      return res.status(404).json({ message: 'Email Taken' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  const user = new User({
    _id:uuidv4(),
    nome: req.body.nome,
    email: req.body.email,
    password: SHA256(req.body.password),
    tipo : "admin"
  });
  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

router.post('/new/jornalista', async (req, res) => {
  let temp;
  try {
    temp = await User.findOne({email : req.body.email}).exec();
    if (temp != null) {
      return res.status(404).json({ message: 'Email Taken' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  const user = new User({
    _id:uuidv4(),
    nome: req.body.nome,
    email: req.body.email,
    password: SHA256(req.body.password),
    tipo: "jornalista",
    afiliacao: req.body.afiliacao,
    searchTags : ''+req.body.nome+' '+req.body.afiliacao+' '+"jornalista"
  });
  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

router.post('/new/politico', async (req, res) => {
  let temp;
  try {
    temp = await User.findOne({email : req.body.email}).exec();
    if (temp != null) {
      return res.status(404).json({ message: 'Email Taken' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  const user = new User({
    _id:uuidv4(),
    nome: req.body.nome,
    email: req.body.email,
    password: SHA256(req.body.password),
    tipo: "politico",
    afiliacao: req.body.afiliacao,
    searchTags : ''+req.body.nome+' '+req.body.afiliacao+' '+"politico"
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

  router.get('/politicos/list', getPoliticos,async (req, res) => {
    res.status(200).send(res.politicos)
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

  async function getPoliticos(req, res, next) {
    let politicos
    try {
      politicos = await User.find({tipo: "politico"}).select('nome afiliacao')
      if (politicos == null) {
        return res.status(404).json({ message: 'Cannot find Politicos' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.politicos = politicos
    next()
  }

  async function getUser2(req, res, next) {
    let user
    try {
      user = await User.findById(req.params.id).select('nome tipo afiliacao bio')
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

  async function search(req, res, next) {
    let users
    let searchExp=req.params.tag.toLowerCase().split(" ").join('.*')
    try {
      users = await User.find({searchTags: { $regex: '.*' +  searchExp + '.*', $options: "i"} }).exec();
      if (users == null) {
        return res.status(404).json({ message: 'Cannot find any Users' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.users = users
    next()
  }

  module.exports = router;