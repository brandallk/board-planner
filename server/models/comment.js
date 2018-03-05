var mongoose = require('mongoose')
var Schema = mongoose.Schema
var schemaName = "Comments"

var schema = new Schema({
    body: {
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
    taskId: {
        type: String,
        // required: true
    },
})

module.exports = mongoose.model(schemaName, schema)