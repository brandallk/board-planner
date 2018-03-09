<template>
    <div class="shared-board-panel container-fluid bg-dark text-light">
  
      <p v-for="board in sharedBoards">{{board.title}}</p>
  
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
        
      },
      mounted() {
        this.$store.dispatch('getSharedBoards', this.$store.state.user._id)
      }
    }
  </script>
  
  <style scoped>
  
  </style>