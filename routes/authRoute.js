require('dotenv').config();
const express = require('express');
const router = express.Router();
var SHA256 = require("crypto-js/sha256");
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const User = require("../models/user");



router.post('/', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
          
    if (_.isNil(email) && _.isNil(password)) {
      res.status(400).json({ message: "Username and password must be supplied!" })
      return;
    }
    User.findOne({ email }, function (err, user) {
      if (err) next();
      if (_.isNull(user)) {
        res.status(404).json({ message: "User not found" });
        return;
      } else {
        if (SHA256(password),user.password) {
          const token = jwt.sign({
            _id: user._id,
            email: user.email,
            type: user.type
          }, `${process.env.SECRET}`, { expiresIn: '1h' });
          res.status(200).send({ auth: true, token: token });
        } else {
          res.status(400).json({ status: "error", message: "Incorrect email/password" });
          return;
        }
      }
    });
  
  })

  module.exports = router;