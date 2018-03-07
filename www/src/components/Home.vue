<template>
  <div class="home">
    <topBar v-on:showBoardsList="showBoardsList = true"></topBar>
    <boardList v-if="showBoardsList"></boardList>
    <!-- <board v-if="!showBoardsList"></board> -->
  </div>
</template>

<script>
  import TopBar from './TopBar'
  import BoardList from './BoardList'
  import Board from './Board'
  export default {
    name: 'Home',
    components: {
      topBar: TopBar,
      boardList: BoardList,
      board: Board
    },
    data() {
      return {
        showBoardsList: true
      }
    }
  
  }
</script>

<style scoped>
</style>