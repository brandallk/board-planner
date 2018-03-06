var router = require("express").Router()
var Comments = require("../models/comment")

//  createComment

router.post("/api/boards/lists/tasks/:taskId/comments", (req, res, next) => {
    Comments.create(req.body)
        .then(comment => {
            res.send(comment)
        })
        .catch(next)
})

// deleteComment
router.delete("/api/boards/lists/tasks/:taskId/comments/:commentId", (req, res, next) => {
    Comments.findByIdAndRemove(req.params.commentId)
        .then(commt => {
            res.send({ message: "Successfully deleted comment" })
        })
        .catch(next)
})

// updateComment (put)
router.put("api/boards/lists/tasks/:taskId/comments/:commentId", (req, res, next) => {
    Comments.findByIdAndUpdate(req.params.commentId, req.body, ({ new: true }))
        .then(commt => {
            res.send({ message: "Successfully updated list", data: commt })
        })
        .catch(next)
})

// getCommentsByListId
router.get("api/boards/lists/tasks/:taskId/comments", (req, res, next) => {
    Comments.find({ taskId: req.params.taskId })
        .then(comments => {
            return res.send(comments)
        })
        .catch(next)
})

module.exports = { router };