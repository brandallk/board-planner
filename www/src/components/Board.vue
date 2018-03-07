<template>
  <div class="board">
    <topBar></topBar>
    <div class="boardList p-3">
      <h5>You are currently on your {{activeBoard.title}} board!</h5>

      <div class="list text-center">
        <h5 class="text-left">Here are your current Lists:</h5>
        <div class="row">
          <list v-for="list in boardLists" :list="list" :boardTasks="boardTasks" :boardComments="boardComments"></list>
        </div>
      </div>
      
    </div>
  </div>
 </template>
 
 <script>
  import List from './List'
  import TopBar from './TopBar'
  export default {
    name: 'Board',
    components: {
      list: List,
      topBar: TopBar
    },
    data() {
      return {
        activeBoard: this.$store.state.activeBoard
      }
    },
    computed: {
      boardLists() {
        return this.$store.state.boardLists
      },
      boardTasks() {
        return this.$store.state.boardTasks
      },
      boardComments() {
        return this.$store.state.boardComments
      }
    },
    methods: {
      showBoardList() {
        this.$router.push('Home')
      }
    },
    mounted() {
      // this.activeBoard = this.$store.state.activeBoard
    },
 
  }
 
 </script>
 
 <style scoped>
 </style>
