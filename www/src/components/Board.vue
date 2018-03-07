<template>
  <div class="board">
    <topBar v-on:showBoardList="showBoardList"></topBar>
    <div class="boardList p-3">
      <h5>You are currently on your {{activeBoard.title}} board!</h5>
      <div class="text-center">
       <ul>
         <list></list>
 
       </ul>
        
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
    methods: {
      showBoardList() {
        this.$router.push('Home')
      }
    },
    mounted() {
      this.activeBoard = this.$store.state.activeBoard
    },
 
  }
 
 </script>
 
 <style scoped>
 </style>