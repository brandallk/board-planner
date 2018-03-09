<template>
    <div class="shared-board-panel container-fluid bg-dark text-light">
  
      <a href="#" v-for="board in sharedBoards" @click.prevent="">{{board.title}}</a>
  
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