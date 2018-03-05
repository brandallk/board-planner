var mongoose = require('mongoose')
var Schema = mongoose.Schema
var schemaName = "Task"

var schema = new Schema({
  title: {
    type: String,
    // required: true
  },
  description: {
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
  listId: {
    type: String,
    // required: true
  },
  commentsIds: {
    type: Array,
    // required: true
  },
})

module.exports = mongoose.model(schemaName, schema)