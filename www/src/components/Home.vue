<template>
  <div class="home">
    <TopBar></TopBar>
    <boardList></boardList>
    <board></board>
  </div>
</template>

<script>
  import TopBar from './TopBar'
  import BoardList from './BoardList'
  import Board from './Board'
  export default {
    name: 'Home',
    components: {
      TopBar: TopBar,
      BoardList: BoardList,
      Board: Board
    },
    data() {
      return {

      }
    }
  
  }
</script>

<style scoped>
</style>