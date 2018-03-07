<template>
  <div class="board">
    <topBar></topBar>
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
        activeBoard: this.$store.state.activeBoard,

      }
    },
    mounted() {
      this.$store.state.activeBoard
    },

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>