const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const router = express.Router();
const mongoose = require('mongoose');
const user = require('../models/user');
const db = "mongodb+srv://Mihitsingh:Mihirsingh1001@cluster0.tsrznv3.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(db, err => {
  if (err) {
    console.error("Error! " + err);
  }
  else {
    console.log("Connect to MongoDB");
  }
});

router.get('/', (req, res) => {
  res.send('From API route');
});

router.post('/register', (req, res) => {
  let userData = req.body;
  let user = new User(userData);
  user.save((error, registeredUser) => {
    if (error) {
      console.log(error);
    }
    else {
      let payload = { subject: registeredUser._id }
      let token = jwt.sign(payload, 'secretkey')
      res.status(200).send({ token });
    }
  })
});

router.post('/login', (req, res) => {
  let userData = req.body;
  User.findOne({ email: userData.email }, (error, user) => {
    if (error) {
      console.log(error);
    } else {
      if (!user) {
        res.status(401).send("Invalid Email!!")
      } else
        if (user.password !== userData.password) {
          res.status(401).send("Invalid Password!!")
        } else {
          let payload = { sunject: user._id }
          let token = jwt.sign(payload, 'secretkey')
          res.status(200).send({ token });
        }
    }
  })
});

module.exports = router;