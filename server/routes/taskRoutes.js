var router = require("express").Router()
var Lists = require("../models/list")
var Tasks = require("../models/task")
var Comments = require("../models/comment")

// Create a task (and update the parent List's 'taskIds' array)
router.post("/api/tasks", (req, res, next) => {
    req.body.userId = req.session.uid
    Tasks.create(req.body)
        .then(task => {
            res.send(task)

            // Update parent List
            Lists.findById(task.listId)
            .then(list => {
                var taskIdsArray = list.taskIds
                taskIdsArray.push(task._id)
                list.update({taskIds: taskIdsArray})
                .then(() => {
                    // console.log('updated list:', list, 'new task', task)
                })
                .catch(next)                
            })
            .catch(next)
        })
        .catch(next)
})

// Delete a task by ID (but only if the requesting user is the task creator)
router.delete("/api/tasks/:taskId", (req, res, next) => {
    Tasks.findById(req.params.taskId)
        .then(task => {
            var requestingUserId = req.session.uid
            var creatorId = task.userId
            if (requestingUserId.toString() !== creatorId.toString()) { // Note: These IDs are actually objects, so the .toString() must be used to compare them
                return res.send({error: "Cannot delete another user's task"})
            }            
            task.remove() // Delete the task

            // Update parent List
            Lists.findById(task.listId)
            .then(list => {
                var taskIdsArray = list.taskIds
                taskIdsArray.splice(taskIdsArray.indexOf(task._id), 1)
                list.update({taskIds: taskIdsArray})
                .then(() => {
                    console.log('updated list:', list, 'new task', task)
                })
                .catch(next)                
            })
            .then(task => {res.send({ message: 'Successfully deleted task' })
            })
            .then(() => { // Also delete any comments that belong to this task
                Comments.deleteMany({taskId: req.params.taskId}).then(() => {console.log('Deleted task comments')})
            })
            .catch(next)
        })
        .catch(next)
})

// Update a task by ID
router.put("/api/tasks/:taskId", (req, res, next) => {
    Tasks.findByIdAndUpdate(req.params.taskId, req.body, { new: true })
        .then(task => {
            res.send({ message: "Successfully updated task", data: task })
        })
        .catch(next)
})

// Get tasks by ListId
// router.get("/api/boards/lists/:listId", (req, res, next) => {
//     Tasks.find({ listId: req.params.listId })
//         .then(tasks => {
//             return res.send(tasks)

//         })
//         .catch(next)
// })

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