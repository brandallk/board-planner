// Vuex 'store': Sets and maintains front-end application 'state'

import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from "../router"

var api = axios.create({
    baseURL: '//localhost:3000/api/',
    timeout: 3000,
    withCredentials: true
})

var auth = axios.create({
    baseURL: '//localhost:3000/auth/',
    timeout: 3000,
    withCredentials: true
})

var unconventionalRoutes = axios.create({
    baseURL: '//localhost:3000/',
    timeout: 3000,
    withCredentials: true
})

vue.use(vuex)

export default new vuex.Store({
    state: {
        user: {},
        authError: {
            error: false,
            message: ""
        },
        userBoards: [],
        activeBoard: {},
        boardOwner: {},
        boardLists: [],
        boardTasks: [],
        boardComments: [],
        draggedTask: {}
    },

    mutations: {
        setUser(state, user) {
            state.user = user
        },
        setAuthError(state, error) {
            state.authError = {
                error: error.error,
                message: error.message
            }
        },
        setActiveBoard(state, board) {
            state.activeBoard = board
        },
        setUserBoards(state, boardsArr) {
            state.userBoards = boardsArr
        },
        setBoardLists(state, lists) {
            state.boardLists = lists
        },
        setBoardTasks(state, tasks) {
            state.boardTasks = tasks
        },
        setBoardComments(state, comments) {
            state.boardComments = comments
        },
        setDraggedTask(state, task) {
            state.draggedTask = task
        },
        setBoardOwner(state, owner) {
            state.boardOwner = owner
        },
    },

    actions: {
        // Auth
        registerUser({ commit, dispatch }, user) {
            auth.post('register', user)
                .then(res => {
                    var newUser = res.data
                    console.log('newUser:', newUser)
                    commit('setUser', newUser)
                    commit('setAuthError', { error: false, message: '' })

                    var defaultBoard = {
                            title: 'Untitled Board',
                            desctiption: 'Your first board! Click here to customize and start planning you project!',
                            userId: newUser._id
                        }
                        // commit('setActiveBoard', defaultBoard)
                    commit('setUserBoards', [defaultBoard])

                    router.push({
                        name: 'Home'
                    })
                })
                .catch(err => {
                    console.log(err)
                    commit('setAuthError', { error: true, message: 'Register failed: Invalid username, email, or password given' })
                })
        },

        loginUser({ commit, dispatch }, user) {
            auth.post('login', user)
                .then(res => {
                    var newUser = res.data
                    console.log('logged-in user:', newUser)
                    commit('setUser', newUser)
                    commit('setAuthError', { error: false, message: '' })
                    dispatch('getUserBoards')
                    router.push({
                        name: 'Home'
                    })
                })
                .catch(err => {
                    console.log(err)
                    commit('setAuthError', { error: true, message: 'Log-in failed: Invalid username or password' })
                })
        },

        authenticateUser({ commit, dispatch }) {
            auth.get('authenticate')
                .then(res => {
                    var sessionUser = res.data
                    console.log('returning user:', sessionUser)
                    commit('setUser', sessionUser)
                    router.push({
                        name: 'Home'
                    })
                })
                .catch(err => {
                    console.error(err)
                })
        },
        logoutUser({ commit, dispatch }) {
            auth.delete('logout')
                .then(() => {
                    console.log('User logged out')
                    commit('setUser', {})
                    commit('setAuthError', { error: false, message: '' })
                    commit('setActiveBoard', {})
                    commit('setUserBoards', [])
                    commit('setBoardLists', [])
                    commit('setBoardTasks', [])
                    commit('setBoardComments', [])
                    router.push({
                        name: 'Welcome'
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        },

        // API
        getUserBoards({ commit, dispatch }) {
            unconventionalRoutes
                .get('myBoards')
                .then(res => {
                    var userBoards = res.data
                        //console.log('user boards:', userBoards)
                    commit('setUserBoards', userBoards)
                })
        },
        getBoardLists({ commit, dispatch }, boardId) {
            api
                .get(`boards/${boardId}/lists`)
                .then(res => {
                    var lists = res.data
                        // console.log('User Board Lists', lists)
                    commit('setBoardLists', lists)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        getBoardTasks({ commit, dispatch }, boardId) {
            api
                .get(`boards/${boardId}/tasks`)
                .then(res => {
                    var tasks = res.data
                        // console.log('User Board Tasks', tasks)
                    commit('setBoardTasks', tasks)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        getBoardComments({ commit, dispatch }, boardId) {
            console.log('boardID', boardId)
            api
                .get(`boards/${boardId}/comments`)
                .then(res => {
                    var comments = res.data
                        // console.log('User Board Comments', comments)
                    commit('setBoardComments', comments)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        sendingActiveBoard({ commit, dispatch }, board) {
            commit('setActiveBoard', board)
            dispatch('getBoardLists', board._id)
            dispatch('getBoardTasks', board._id)
            dispatch('getBoardComments', board._id)
        },
        createBoard({ commit, dispatch }, board) {
            api
                .post('boards', board)
                .then(res => {
                    var newBoard = res.data
                        // console.log('new board:', newBoard)
                    dispatch('getUserBoards')
                })
                .catch(err => {
                    console.log(err)
                })
        },
        deleteBoard({ commit, dispatch }, board) {
            api
                .delete(`boards/${board._id}`)
                .then(res => {
                    var deletedBoard = board
                        //console.log('deleted board:', deletedBoard)
                    dispatch('getUserBoards')
                })
                .catch(err => {
                    console.log(err)
                })
        },
        updateBoard({ commit, dispatch }, board) {
            api
                .put(`boards/${board._id}`, board)
                .then(res => {
                    var updatedBoard = res.data.data
                    console.log('updated board:', updatedBoard)
                    dispatch('sendingActiveBoard', updatedBoard)
                        // dispatch('getBoardLists', updatedBoard.boardId)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        createTask({ commit, dispatch }, task) {
            api
                .post('tasks', task)
                .then(res => {
                    var newTask = res.data
                        //console.log('new task:', newTask)
                    dispatch('getBoardTasks', newTask.boardId)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        editTask({ commit, dispatch }, task) {
            api
                .put(`tasks/${task._id}`, task)
                .then(res => {
                    var updatedTask = res.data.data
                        //console.log('updated task:', updatedTask)
                    dispatch('getBoardTasks', updatedTask.boardId)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        deleteTask({ commit, dispatch }, task) {
            api
                .delete(`tasks/${task._id}`)
                .then(res => {
                    //console.log('deleted task')
                    dispatch('getBoardTasks', task.boardId)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        createList({ commit, dispatch }, list) {
            api
                .post('lists', list)
                .then(res => {
                    var newList = res.data
                        //console.log('new list:', newList)
                    dispatch('getBoardLists', newList.boardId)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        updateList({ commit, dispatch }, list) {
            api
                .put(`lists/${list._id}`, list)
                .then(res => {
                    var updatedList = res.data.data
                    console.log('updated list:', updatedList)
                    dispatch('getBoardLists', updatedList.boardId)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        deleteList({ commit, dispatch }, list) {
            api
                .delete(`lists/${list._id}`)
                .then(res => {
                    var deletedList = list
                        //console.log('deleted list:', deletedList)
                    dispatch('getBoardLists', deletedList.boardId)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        setDraggedTask({ commit, dispatch }, task) {
            commit("setDraggedTask", task)
        },
        updateTask({ commit, dispatch }, data) {
            var taskId = data.draggedTask._id
            var boardId = data.draggedTask.boardId
            var task = {
                listId: data.dropListId
            }
            api
                .put(`tasks/${taskId}`, task)
                .then(res => {
                    var updatedTask = res.data.data
                        // console.log("updatedTask", updatedTask)
                    dispatch('getBoardLists', boardId)
                    dispatch('getBoardTasks', boardId)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        createComment({ commit, dispatch }, comment) {
            api
                .post('comments', comment)
                .then(res => {
                    var newComment = res.data
                    console.log('new comment:', newComment)
                    dispatch('getBoardComments', newComment.boardId)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        deleteComment({ commit, dispatch }, comment) {
            api
                .delete(`comments/${comment._id}`)
                .then(res => {
                    //console.log('deleted task')
                    dispatch('getBoardComments', comment.boardId)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        updateComment({ commit, dispatch }, comment) {
            api
                .put(`comments/${comment._id}`, comment)
                .then(res => {
                    var updatedComment = res.data.data
                    dispatch('getBoardComments', updatedComment.boardId)
                })
                .catch(err => {
                    console.log(err)
                })
        },

        updateBoardCollaborators({ commit, dispatch }, board) {
            api
                .put(`boards/${board._id}`, board)
                .then(res => {
                    var updatedBoard = res.data.data
                    console.log('updated board:', updatedBoard)
                    commit('setActiveBoard', board)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        addBoardCollaborator({ commit, dispatch }, data) {
            api
                .get(`users/email/${data.collaboratorEmail}`)
                .then(res => {
                    var collaborator = res.data
                    console.log('board:', board)
                    console.log('collaborator:', collaborator)

                    var board = data.board
                    board.collaborators.push(collaborator)

                    dispatch('updateBoardCollaborators', board)
                        // (use state.boardCollaborators in CollabPanel to display collaborators)
                        // (getting an activeBoard should ALSO dispatch the method that gets and sets boardCollaborators in state)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        getBoardOwner({ commit, dispatch }, board) {
            api
                .get(`users/${board.userId}/info`)
                .then(res => {
                    var boardOwner = res.data
                    console.log('board owner:', boardOwner)
                    commit('setBoardOwner', boardOwner)
                })
                .catch(err => {
                    console.log(err)
                })
        }

    }
})