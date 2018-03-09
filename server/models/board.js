var mongoose = require('mongoose')
var Schema = mongoose.Schema
var schemaName = "Board"

var schema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Number,
    default: Date.now()
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  collaborators: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      name: { type: String },
      email: { type: String }
    }
  ]
})

module.exports = mongoose.model(schemaName, schema)