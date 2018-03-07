<template>
  <div class="board">
<<<<<<< HEAD
    <topBar></topBar>
=======
    <topBar v-on:showBoardList="showBoardList"></topBar>
>>>>>>> 593e5e4afc1d512f49894be083df5b713a34516c
    <div class="boardList p-3">
      <h5>You are currently on your {{activeBoard.title}} board!</h5>
      <div class="text-center">
       <ul>
         <list></list>
<<<<<<< HEAD

=======
 
>>>>>>> 593e5e4afc1d512f49894be083df5b713a34516c
       </ul>
        
      </div>
    </div>
  </div>
<<<<<<< HEAD
</template>

<script>
=======
 </template>
 
 <script>
>>>>>>> 593e5e4afc1d512f49894be083df5b713a34516c
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
<<<<<<< HEAD
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
=======
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
>>>>>>> 593e5e4afc1d512f49894be083df5b713a34516c
