var mongoose = require('mongoose')
var Schema = mongoose.Schema
var schemaName = "Board"

var schema = new Schema({
  title: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Number,
    default: Date.now()
  },
  description: {
    type: String,
    required: true
  },
  // lastModified: {
  //   type: Number,
    // required: true
  // },
  // listIds: {
  //   type: Array,
  //   required: true
  // },
})

module.exports = mongoose.model(schemaName, schema)