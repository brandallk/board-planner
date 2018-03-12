<template>
  <div class="boardlist page">

    <div class="d-flex align-items-center justify-content-center pt-5 mb-5">
      <div class="line"></div>
      <h1 class="h5 text-center text-light font-weight-bold d-inline-block mx-5">My boards</h1>
      <div class="line"></div>
    </div>

    <div class="row px-5">

      <div class="wrapper col-12 col-sm-6 col-md-4 col-lg-3 mb-4" v-for="board in userBoards">
        <div class="board p-3 rounded" :style="{backgroundColor: getRandomColor()}">
          <div @click="showBoardPreview(board)" class="boardToggle text-white">
            <h3 class="h4 text-center mt-2">{{board.title}}</h3>
            <hr>
            <p class="text-center pb-2" v-text="truncate(board.description)"></p>
          </div>
  
          <boardPreview :board="board" v-if="showBoard(board)" @closeBoardPreview="closeBoardPreview"></boardPreview>
        </div>
      </div>

      <div class="wrapper col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
        <div class="board p-2 rounded" :style="{backgroundColor: getRandomColor()}">
          <div @click="showAddBoardForm" class="text-white">
            <h3 class="h6 text-center mt-1">Add new board...</h3>
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
  import TaskEditForm from './TaskEditForm'
  export default {
    name: 'BoardList',
    components: {
      boardPreview: boardPreview,
      list: List,
      addBoardForm: AddBoardForm,
      taskEditForm: TaskEditForm
    },
    data() {
      return {
        isBoardPreviewVisible: false,
        isAddBoardFormVisible: false,
        activeBoardId: ""
      }
    },
    computed: {
      userBoards() {
        return this.$store.state.userBoards
      },
      boardLists() {
        return this.$store.state.boardLists
      }
    },
    methods: {
      getRandomColor() {
        var colors = [
          "#43EFB0",
          "#49E2C1",
          "#70A697",
          "#FFB105",
          "#D49107",
          "#E7CE18",
        ]
        return colors[Math.floor(Math.random() * 5.99)]
      },
      truncate(description) {
        const MAX_LETTER_COUNT = 56
        if (description.length > MAX_LETTER_COUNT) {
          description = description.substr(0, MAX_LETTER_COUNT) + '...'
        }
        return description
      },
      getBoardLists(board) {
        this.$store.dispatch('getBoardLists', board._id)
      },
      showBoardPreview(board) {
        this.getBoardLists(board)
        this.activeBoardId = board._id
        this.isBoardPreviewVisible = true
      },
      showBoard(board) {
        return this.isBoardPreviewVisible && board._id === this.activeBoardId
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
  .black {
    background-color: black;
  }

  .line {
    width: 35%;
    display: inline-block;
    height: 1px;
    background-color: rgb(228, 241, 236);
  }

  .boardList {
    display: flex;
  }

  .board:hover,
  .new-board:hover {
    cursor: pointer;
    border: solid 1px white;
  }

  .page {
    background-color: #015249;
    min-height: 100vh;
  }

  .card-bg {
    background-color: rgb(103, 219, 169);
  }

</style>
