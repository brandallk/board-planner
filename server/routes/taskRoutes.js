var router = require("express").Router()
var Tasks = require("../models/task")

// createTask

router.post("/api/boards/lists/:listId/tasks", (req, res, next) => {
    Tasks.create(req.body)
        .then(task => {
            res.send(task)
        })
        .catch(next)
})

//deleteTask
router.delete("/api/tasks/:taskId", (req, res, next) => {
    Tasks.findByIdAndRemove(req.params.taskId) //
        .then(comment => {
            res.send({ message: "Successfully deleted task" })
        })
        .catch(next)
})

// updateTask (put)
router.put("/api/tasks/:taskId", (req, res, next) => {
    Tasks.findByIdAndUpdate(req.params.listId, req.body, { new: true })
        .then(comment => {
            res.send({ message: "Successfully updated list", data: comment })
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

//FOR TESTING ONLY - GET ALL TASKS
router.get("/api/tasks", (req, res, next) => {
    Tasks.find()
        .then(tasks => {
            return res.send(tasks)
        })
        .catch(next)
})

module.exports = { router };