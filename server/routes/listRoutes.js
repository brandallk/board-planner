var router = require("express").Router()
var Lists = require("../models/list")

//createList

router.post("/api/boards/:boardId/lists", (req, res, next) => {
    Lists.create(req.body)
        .then(list => {
            res.send(list)
        })
        .catch(next)
})

// deleteList
router.delete("/api/boards/:boardId/lists/:listId", (req, res, next) => {
    Lists.findByIdAndRemove(req.params.listId)
        .then(comment => {
            res.send({ message: "Successfully deleted list" })
        })
        .catch(next)
})

// updateList  (put)

router.put("/api/boards/:boardId/lists/:listId", (req, res, next) => {
    Lists.findByIdAndUpdate(req.params.listId, req.body, { new: true })
        .then(comment => {
            res.send({ message: "Successfully updated list", data: comment })
        })
        .catch(next)
})

// getListsByBoardId
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