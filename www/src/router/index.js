import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Home from '@/components/Home'
import Board from '@/components/Board'
<<<<<<< HEAD
=======

>>>>>>> 593e5e4afc1d512f49894be083df5b713a34516c
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
<<<<<<< HEAD
      
=======
>>>>>>> 593e5e4afc1d512f49894be083df5b713a34516c
    },
    {
      path: '/board',
      name: 'Board',
      component: Board
<<<<<<< HEAD
      
    }
=======
    },
>>>>>>> 593e5e4afc1d512f49894be083df5b713a34516c
  ]
})
