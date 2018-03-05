var User = require('../models/user')
var router = require('express').Router()
var errorMessage = { err: 'Invalid Username and/or Password' }

router.post('/auth/register', (req, res) => {
  req.body.password = User.generateHash(req.body.password)
  User.create(req.body)
    .then(user => {
      if (!user) {
        console.log('error1')
        return res.status(401).send({
          error: 'Invlid username and/or password'
        })
      }
      user.password = null
      req.session.uid = user._id
      res.send(user)
    })
    .catch(err => {
      console.log('error2', err)
      res.status(401).send({
        error: 'Invalid username and/or password'
      })
    })
})

router.post("/auth/login", (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        return res.status(401).send(errorMessage)
      }

      if (!user.validatePassword(req.body.password)) {
        return res.status(401).send(errorMessage)
      }
      user.password = null
      req.session.uid = user._id
      res.send(user);
    })
    .catch(err => {
      res.status(401).send(errorMessage)
    })
})


router.get('/auth/authenticate', (req, res) => {
  User.findById(req.session.uid)
    .then(user => {
      if (!user) {
        return res.status(401).send({
          error: 'Please login to Continue'
        })
      }
      user.password = null;
      return res.status(200).send(user)
    }).catch(err => {
      return res.status(500).send({
        error: err
      })
    })
})

router.delete('/auth/logout', (req, res) => {
  req.session.destroy()
  res.send('Seccessfully logged out')
})


module.exports = router;