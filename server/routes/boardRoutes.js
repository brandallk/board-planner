var router = require("express").Router()
var Boards = require("../models/board")
var Lists = require("../models/list")
var Tasks = require("../models/task")
var Comments = require("../models/comment")

// createBoard - by userId
router.post("/api/boards", (req, res, next) => {
    req.body.userId = req.session.uid // Get the userId from the logged-in user's session
    Boards.create(req.body)
        .then(board => {
            res.send(board);
        })
        .catch(next)
})

// deleteBoard
router.delete("/api/boards/:boardId", (req, res, next) => {
    Boards.findOneAndRemove({ userId: req.session.uid, _id: req.params.boardId })
        .then(board => {
            if (!board) {
                res.status(401).send({ error: "Not authorized to remove board" })
            } else {
                res.send({ message: "Successfully deleted board" })
            }
        })
        .catch(next)
    Lists.deleteMany({boardId: req.params.boardId})
        .then(() => {
        console.log('Deleted user lists')
        })
        .catch(next)
    Tasks.deleteMany({boardId: req.params.boardId})
        .then(() => {
        console.log('Deleted user tasks')
        })
        .catch(next)
    Comments.deleteMany({boardId: req.params.boardId})
        .then(() => {
        console.log('Deleted user comments')
        })
        .catch(next)
})

// updateBoard
router.put("/api/boards/:boardId", (req, res, next) => {
    Boards.findByIdAndUpdate(req.params.boardId, req.body, { new: true })
        .then(board => {
            res.send({ message: "Successfully updated board", data: board })
        })
        .catch(next)
})

// getBoardsByUserId
router.get("/myBoards", (req, res, next) => {
    var userId = req.session.uid // Get the userId from the logged-in user's session
    Boards.find({ userId: userId })
        .then(boards => {
            return res.send(boards)
        })
        .catch(next)
})

// FOR TESTING ONLY: Get all boards
// router.get("/api/boards", (req, res, next) => {
//     Boards.find()
//         .then(boards => {
//             return res.send(boards)
//         })
//         .catch(next)
// })


module.exports = { router }