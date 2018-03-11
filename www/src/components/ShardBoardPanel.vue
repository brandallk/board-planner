<template>
  <div class="shared-board-panel container-fluid text-light">
    <button class="close-btn btn btn-sm btn-outline-light py-0" @click="close">x</button>

    <div class="d-flex px-4 pb-4 pt-5">

      <div class="mr-4" v-for="board in sharedBoards">
        <img src="./../assets/planner-icon.png" alt="planner icon" class="mb-1">
        <button class="shared-board btn btn-sm btn-outline-light" @click="goToBoard(board)">{{board.title}}</button>
      </div>

      <!-- <div class="wrapper col-4 p-5">
        <div class="shared-board rounded text-dark py-4 px-5" v-for="board in sharedBoards" @click="goToBoard(board)">{{board.title}}</div>
      </div> -->
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
      },
      close() {
        this.$emit('closeSharedBoardPanel')
      }
    },
    mounted() {
      this.$store.dispatch('getSharedBoards', this.$store.state.user._id)
    }
  }

</script>

<style scoped>
  .shared-board-panel {
    position: relative;
    background-color: rgb(70, 150, 135);
  }

  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    height: 1.5rem;
  }

  img {
    width: 25px;
    margin-bottom: 0.4rem;
    margin-right: 0.5rem;
  }

</style>
