var mongoose = require('mongoose')
var ObjectId = mongoose.SchemaTypes.ObjectId
var Schema = mongoose.Schema
var schemaName = "List"

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
        type: ObjectId,
        ref: "User",
        required: true
    },
    boardId: {
        type: ObjectId,
        ref: "Board",
        required: true
    }
})

module.exports = mongoose.model(schemaName, schema)