var mongoose = require('mongoose')
var Schema = mongoose.Schema
var schemaName = "List"

var schema = new Schema({
  title: {
    type: String,
    // required: true
  },
  userId: {
    type: String,
    // required: true
  },
  boardId: {
    type: String,
    // required: true
  },
  createdAt: {
    type: Number,
  },
  cardsIds: {
    type: Array,
    // required: true
  },
  description: {
    type: String,
    // required: true
  },
})

module.exports = mongoose.model(schemaName, schema)