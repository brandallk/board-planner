var router = require("express").Router()
var Lists = require("../models/list")
var Tasks = require("../models/task")
var Comments = require("../models/comment")

// Get a list by ID
router.get("/api/lists/:listId", (req, res, next) => {
    Lists.findById(req.params.listId)
        .then(list => {
            res.send(list)
        })
        .catch(next)
})

// Create a list
router.post("/api/lists", (req, res, next) => {
    req.body.userId = req.session.uid // Get the userId from the logged-in user session
    Lists.create(req.body)
        .then(list => {
            res.send(list)
        })
        .catch(next)
})

// Delete a list by ID (but only if the requesting user is the list creator)
router.delete("/api/lists/:listId", (req, res, next) => {
    Lists.findById(req.params.listId)
        .then(list => {
            var requestingUserId = req.session.uid
            var creatorId = list.userId
            if (requestingUserId.toString() !== creatorId.toString()) { // Note: These IDs are actually objects, so the .toString() must be used to compare them by value
                return res.send({error: "Cannot delete another user's list"})
            }
            list.remove() // Delete the list
            .then(list => {res.send({ message: 'Successfully deleted list' })
            })
            .then(() => { // Also delete any tasks that belong to this list
                Tasks.deleteMany({listId: req.params.listId}).then(() => {console.log('Deleted list tasks')})
            })
            .then(() => { // Also delete any comments that belong to this list
                Comments.deleteMany({listId: req.params.listId}).then(() => {console.log('Deleted list comments')})
            })
            .catch(next)
        })
        .catch(next)
})

// Update a list by ID
router.put("/api/lists/:listId", (req, res, next) => {
    Lists.findByIdAndUpdate(req.params.listId, req.body, { new: true })
        .then(list => {
            res.send({ message: "Successfully updated list", data: list })
        })
        .catch(next)
})

// Get lists by boardId
router.get("/api/boards/:boardId/lists", (req, res, next) => {
    Lists.find({ boardId: req.params.boardId })
        .then(lists => {
            return res.send(lists)
        })
        .catch(next)
})

//FOR TESTING ONLY: Get all lists
router.get("/api/boards/lists", (req, res, next) => {
    Lists.find()
        .then(lists => {
            return res.send(lists)
        })
        .catch(next)
})

module.exports = { router };