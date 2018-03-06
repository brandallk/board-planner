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
      msg: ""
    }
  },

  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setAuthError(state, msg) {
      state.authError = {
        error: true,
        message: msg
      }
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
          router.push({
            name: 'Home',
            params: {
              userId: newUser._id
            }
          })
        })
        .catch(err => {
          console.log(err)
          commit('setAuthError', 'Log-in failed: Invalid username or password')
        })
    },

  }
})
