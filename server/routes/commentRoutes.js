var router = require("express").Router()
var Comments = require("../models/comment")

//  createComment

router.post("/api/comments", (req, res, next) => {
    req.body.userId=req.session.uid
    Comments.create(req.body)
        .then(comment => {
            res.send(comment)
        })
        .catch(next)
})

// Delete a comment by ID (but only if the requesting user is the comment creator)
router.delete("/api/comments/:commentId", (req, res, next) => {
    Comments.findById(req.params.commentId)
        .then(comment => {
            var requestingUserId = req.session.uid
            var creatorId = comment.userId
            if (requestingUserId.toString() !== creatorId.toString()) { // Note: These IDs are actually objects, so the .toString() must be used to compare them
                return res.send({error: "Cannot delete another user's comment"})
            }
            comment.remove() // Delete the comment
            .then(task => {res.send({ message: 'Successfully deleted comment' })
            })
            .catch(next)
        })
})

// updateComment (put)
router.put("/api/comments/:commentId", (req, res, next) => {
    Comments.findByIdAndUpdate(req.params.commentId, req.body, { new: true })
        .then(comment => {
            res.send({ message: "Successfully updated Comment", data: comment })
        })
        .catch(next)
})

// getCommentsByTaskId
router.get("/api/tasks/:taskId/comments", (req, res, next) => {
    Comments.find({ taskId: req.params.taskId })
        .then(comments => {
            return res.send(comments)
        })
        .catch(next)
})

// Get comments by boardId
router.get('/api/boards/:boardId/comments', (req, res, next) => {
    Comments.find({boardId: req.params.boardId})
        .then(comments => {
            return res.send(comments)
        })
})

//TEST ONLY
router.get("/api/comments", (req, res, next) => {
    Comments.find()
        .then(comments => {
            return res.send(comments)
        })
        .catch(next)
})



module.exports = { router };