<template>
  <div class="home">
    <topBar v-on:showBoardsList="showBoardsList = true"></topBar>
    <navbar></navbar>
    <boardList v-if="showBoardsList"></boardList>
  </div>
</template>

<script>
  import TopBar from './TopBar'
  import BoardList from './BoardList'
  import Navbar from './Navbar'
  export default {
    name: 'Home',
    components: {
      topBar: TopBar,
      boardList: BoardList,
      navbar: Navbar
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