var User = require('../models/user')
var Board = require('../models/board')
var List = require('../models/list')
var Task = require('../models/task')
var Comment = require('../models/comment')

var router = require('express').Router()

// Get user info by email
router.get('/api/users/email/:userEmail', (req, res, next) => {
  User.findOne({ email: req.params.userEmail })
    .then(user => {
      var userInfo = {
        userId: user._id,
        name: user.name,
        email: user.email
      }
      return res.send(userInfo)
    })
    .catch(next)
})

// Get user info by Id
router.get('/api/users/:userId/info', (req, res, next) => {
 console.log('in database',res)
  User.findById(req.params.userId)
    .then(user => {
      var userInfo = {
        // userId: user._id,
        name: user.name,
        email: user.email
      }
      return res.send(userInfo)
    })
    .catch(next)
})

// Get boards by user
router.get('/api/users/:userId/boards', (req, res, next) => {
  Board.find({
      userId: req.params.userId
    })
    .then(boards => {
      return res.send(boards)
    })
    .catch(next)
})

// TEMPORARY FOR TESTING!!! Get all Users
router.get('/api/users', getAllUsers)
function getAllUsers(req, res, next) {
  User.find(req.query)
    .then(users => {
      res.send(users)
    })
    .catch(next)
}

// TEMPORARY FOR TESTING!!! Delete a User
router.delete('/api/users/:userId', deleteUser)
function deleteUser(req, res, next) {
  User.findByIdAndRemove(req.params.userId)
    .then(user => {
      return res.send({
        message: 'Sucessfully deleted a user'
      })
    })
    .catch(next)
  Board.deleteMany({
      userId: req.params.userId
    })
    .then(() => {
      console.log('Deleted user boards')
    })
    .catch(next)
  List.deleteMany({
      userId: req.params.userId
    })
    .then(() => {
      console.log('Deleted user lists')
    })
    .catch(next)
  Task.deleteMany({
      userId: req.params.userId
    })
    .then(() => {
      console.log('Deleted user tasks')
    })
    .catch(next)
  Comment.deleteMany({
      userId: req.params.userId
    })
    .then(() => {
      console.log('Deleted user comments')
    })
    .catch(next)
}

module.exports = { router }