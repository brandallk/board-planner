var mongoose = require('mongoose')
var Schema = mongoose.Schema
var schemaName = "Board"

var schema = new Schema({
  title: {
    type: String,
    // required: true
  },
  userId: {
    type: String,
    // required: true
  },
  createdAt: {
    type: Number,
  },
  // lastModified: {
  //   type: Number,
    // required: true
  // },
  listIds: {
    type: Array,
    // required: true
  },
  description: {
    type: String,
    // required: true
  },
})

module.exports = mongoose.model(schemaName, schema)