<template>
    <div class="shared-board-panel container-fluid bg-dark text-light">
  
      <div class="row">
        <div class="wrapper col-4 p-5">
          <div class="shared-board rounded text-dark py-4 px-5" v-for="board in sharedBoards" @click="goToBoard(board)">{{board.title}}</div>
        </div>
      </div>
  
    </div>
  </template>
  
  <script>
    export default {
      name: 'SharedBoardPanel',
      data() {
        return {
          
        }
      },
      computed: {
        sharedBoards() {
          return this.$store.state.sharedBoards
        }
      },
      methods: {
        goToBoard(board) {
          this.$store.dispatch('sendingActiveBoard', board)
          this.$router.push('Board')
        }
      },
      mounted() {
        this.$store.dispatch('getSharedBoards', this.$store.state.user._id)
      }
    }
  </script>
  
  <style scoped>
    .shared-board {
      cursor: pointer;
      background-color: white;
    }
    .shared-board:hover {
      background-color: lightgray;
    }
  </style>