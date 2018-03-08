<template>
  <div class="board bg-info">

    <topBar></topBar>

    <div class="boardList container-fluid p-3">

      <h5 class="text-white mx-4">You are currently on your {{activeBoard.title}} board!</h5>

      <div class="list">
        <div class="row mx-4">

          <list v-for="list in boardLists" :list="list" class="col-3 mt-4"></list>

          <div class="col-3 mt-4">
            <button disabled="disabled">add List</button>
          </div>

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
      }
    },
    methods: {
      showBoardList() {
        this.$router.push('Home')
      }
    }
  }
 
 </script>
 
 <style scoped>
   .board {
     min-height: 100vh;
   }
 </style>
