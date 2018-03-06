var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = mongoose.SchemaTypes.ObjectId
var schemaName = "Task"

var schema = new Schema({
    title: {
        type: String
            // required: true
    },
    description: {
        type: String,
        required: true
    },
    listId: {
        type: ObjectId,
        ref: "List",
        required: true
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