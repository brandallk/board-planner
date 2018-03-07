<template>
  <div class="boardlist">
    <h1 class="p-3">My Boards</h1>
    <div class="row page">

      <div class="col boards" v-for="board in userBoards">
        <div @click="showBoardPreview(board)" class="boardPreview" style="width: 18rem;">
          <div class="card">
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

        <boardPreview :board="board" :lists="userBoardLists" v-show="isBoardPreviewVisible" @closeBoardPreview="closeBoardPreview"></boardPreview>
      </div>

      <div class="col new-board" @click="showAddBoardForm">
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">Add New Board</h5>
          </div>
        </div>
      </div>

    </div>

    <addBoardForm v-if="isAddBoardFormVisible" @closeAddBoardForm="closeAddBoardForm"></addBoardForm>

  </div>
</template>

<script>
  import boardPreview from './BoardPreview'
  import List from './List'
  import AddBoardForm from './AddBoardForm'
  export default {
    name: 'BoardList',
    components: {
      boardPreview: boardPreview,
      list: List,
      addBoardForm: AddBoardForm
    },
    data() {
      return {
        isBoardPreviewVisible: false,
        isAddBoardFormVisible: false
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
      showBoardPreview(board) {
        this.getBoardLists(board)
        this.isBoardPreviewVisible = true
      },
      closeBoardPreview() {
        this.isBoardPreviewVisible = false
      },
      showAddBoardForm() {
        this.isAddBoardFormVisible = true
      },
      closeAddBoardForm() {
        this.isAddBoardFormVisible = false
      }
    },
    mounted() {
      this.$store.dispatch('getUserBoards')
    }
  }
</script>

<style scoped>
  .boardList {
    display: flex;
  }

  .boards,
  .new-board {
    height: 100%;
    margin: 20px;
    padding: 20px;
    display: flex;
    justify-content: center;
  }

  .boards:hover,
  .new-board:hover {
    cursor: pointer;
  }

  .page {
    background-color: grey;
  }
</style>