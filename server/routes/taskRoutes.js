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
router.delete("/api/boards/lists/list:Id/tasks/taskId", (req, res, next) => {
    Tasks.findByIdAndRemove(req.params.taskId)
        .then(comment => {
            res.send({ message: "Successfully deleted task" })
        })
        .catch(next)
})

// updateTask (put)


router.put("/api/boards/lists/:listId/tasks/:taskId", (req, res, next) => {
    Tasks.findByIdAndUpdate(req.params.taskId, req.body, { new: true })
        .then(comment => {
            res.send({ message: "Successfully updated task", data: comment })
        })
        .catch(next)
})

//getTaskByListId
router.get("/api/boards/lists/:listId", (req, res, next) => {
    Tasks.find({ listId: req.params.listId })
        .then(tasks => {
            return res.send(tasks)

        })
        .catch(next)
})




module.exports = { router };