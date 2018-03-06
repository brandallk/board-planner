<template>
  <div class="boardlist">
    <h1 class="p-3">My Boards</h1>
    <div class="row page">
      <div class="col boards" v-for="board in userBoards">
        <div @click="showModal(board)" class="boardPreview">
          <!-- <button type="button" @click="showModal" @load="">Preview Board</button> -->
          <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="http://placehold.it/10x10" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">{{board.title}}</h5>
              <p class="card-text">{{board.description}}</p>
            </div>
            
            <div class="card-body">
              <a href="#" @click="" class="btn card-link">Go to Board</a>
            </div>
          </div>
        </div>

        <boardPreview :board="board" :lists="userBoardLists" v-show="isModalVisible" @close="closeModal"></boardPreview>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import boardPreview from './BoardPreview'
  import List from './List'
  export default {
    name: 'BoardList',
    components: {
      boardPreview: boardPreview,
      list: List,
    },
    data() {
      return {
        isModalVisible: false,
              }
    },
    computed: {
      userBoards() {
        return this.$store.state.userBoards
      },
      userBoardLists() {
        return this.$store.state.boardLists

      }
    },
    methods: {
      getBoardLists(board) {
        this.$store.dispatch('getBoardLists', board._id)
      },
      showModal(board) {
        console.log("Here", board)
        this.getBoardLists(board)
        this.isModalVisible = true;

      },
      closeModal() {
        this.isModalVisible = false;
      },
      // getBoard() {
      //   this.$store.dispatch('getBoardData')
      // },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .boardList {
    display: flex;
  }

  .boards {
    margin: 20px;
    padding: 20px;
    display: flex;
    justify-content: center;

  }

  .page {
    background-color: grey;
  }
</style>