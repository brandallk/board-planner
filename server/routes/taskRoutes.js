var router = require("express").Router()
var Tasks = require("../models/task")
var Comments = require("../models/comment")

// createTask

router.post("/api/tasks", (req, res, next) => {
    req.body.userId = req.session.uid
    Tasks.create(req.body)
        .then(task => {
            res.send(task)
        })
        .catch(next)
})

//deleteTask
router.delete("/api/tasks/:taskId", (req, res, next) => {
    Tasks.findByIdAndRemove(req.params.taskId) //
        .then(task => {
            res.send({ message: "Successfully deleted task" })
        })
        .catch(next)
    Comments.deleteMany({taskId: req.params.taskId})
        .then(() => {
            console.log('Deleted task comments')
        })
        .catch(next)
})

// updateTask (put)
router.put("/api/tasks/:taskId", (req, res, next) => {
    Tasks.findByIdAndUpdate(req.params.taskId, req.body, { new: true })
        .then(task => {
            res.send({ message: "Successfully updated task", data: task })
        })
        .catch(next)
})

// router.put("/api/userId/boards/lists/tasks/:taskId", (req, res, next) => {

router.get("/api/boards/lists/:listId", (req, res, next) => {

    Tasks.find({ listId: req.params.listId })
        .then(tasks => {
            return res.send(tasks)

        })
        .catch(next)
})

// Get tasks by boardId
router.get('/api/boards/:boardId/tasks', (req, res, next) => {
    Tasks.find({boardId: req.params.boardId})
        .then(tasks => {
            return res.send(tasks)
        })
})

//FOR TESTING ONLY - GET ALL TASKS
router.get("/api/tasks", (req, res, next) => {
    Tasks.find()
        .then(tasks => {
            return res.send(tasks)
        })
        .catch(next)
})

module.exports = { router };