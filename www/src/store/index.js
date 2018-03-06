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

vue.use(vuex)

export default new vuex.Store({
  state: {
    user: {},
    authError: {
      error: false,
      message: ""
    },
    activeBoard: {},
    userBoards: []
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
    }
  },

  actions: {
    // Auth
    registerUser({commit, dispatch}, user) {
      auth.post('register', user)
        .then(res => {
          var newUser = res.data
          console.log('newUser:', newUser)
          commit('setUser', newUser)
          commit('setAuthError', {error: false, message: ''})

          var defaultBoard = {
            title: 'Untitled Board',
            desctiption: 'Your first board! Click here to customize and start planning you project!',
            userId: newUser._id
          }
          commit('setActiveBoard', defaultBoard)
          commit('setUserBoards', [defaultBoard])

          router.push({
            name: 'Home',
            params: {
              userId: newUser._id
            }
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    loginUser({commit, dispatch}, user) {
      auth.post('login', user)
        .then(res => {
          var newUser = res.data
          console.log('logged-in user:', newUser)
          commit('setUser', newUser)
          commit('setAuthError', {error: false, message: ''})
          router.push({
            name: 'Home',
            params: {
              userId: newUser._id
            }
          })
        })
        .catch(err => {
          console.log(err)
          commit('setAuthError', {error: true, message: 'Log-in failed: Invalid username or password'})
        })
    },
    authenticateUser({commit, dispatch}) {
      auth.get('authenticate')
        .then(res => {
          var sessionUser = res.data
          console.log('returning user:', sessionUser)
          commit('setUser', sessionUser)
          router.push({
            name: 'Home',
            params: {userId: sessionUser._id}
          })
        })
        .catch(err => {
          console.error(err)
        })
    },
    logoutUser({commit, dispatch}) {
      auth.delete('logout')
        .then(() => {
          console.log('User logged out')
          commit('setUser', {})
          commit('setAuthError', {error: false, message: ''})
          router.push({
            name: 'Welcome'
          })
        })
        .catch(err => {
          console.log(err)
        })
    }

  }
})
