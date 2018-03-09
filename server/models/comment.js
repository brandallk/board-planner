var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = mongoose.SchemaTypes.ObjectId
var schemaName = "Comments"

var schema = new Schema({
    body: {
        type: String,
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
    },
    listId: {
        type: ObjectId,
        ref: "List",
        required: true
    },
    taskId: {
        type: ObjectId,
        ref: "Task",
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model(schemaName, schema)