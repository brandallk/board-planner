<template>
  <div class="board bg-color pb-5">

    <topBar></topBar>
    <navbar></navbar>

    <div class="title-and-description container-fluid px-5 pt-4 text-white">

      <div class="board-title d-flex align-items-center">
        
        <a href="#" class="px-2 text-white" @click.prevent="toggleBoardEdit">
          <i class="fas fa-pencil-alt"></i>
        </a>
      
        <span class="d-inline-block"><em>Board title:</em></span>
        <span v-if="!showBoardTitleEdit" class="edit-toggle py-1 px-4 rounded" @click="showBoardTitleEdit = true">
          {{activeBoard.title}}
        </span>
        <input v-if="showBoardTitleEdit" type="text" class="board-title-input form-control ml-3 mr-1" v-model="updatedBoard.title">
        <button v-if="showBoardTitleEdit" class="btn btn-success btn-sm mr-1 mb-2" @click="editBoardTitle">save</button>
        <button v-if="showBoardTitleEdit" class="btn btn-danger btn-sm mr-1 mb-2" @click="showBoardTitleEdit = false">cancel</button>
        
      </div> <!-- end board-title -->

      <div class="board-desc d-flex align-items-center">
        
        <a href="#" class="px-2 text-white" @click.prevent="toggleBoardDescEdit">
          <i class="fas fa-pencil-alt"></i>
        </a>
      
        <span class="d-inline-block"><em>Despcription:</em></span>
        <span v-if="!showBoardDescEdit" class="edit-toggle py-1 px-4 rounded" @click="showBoardDescEdit = true">
          {{activeBoard.description}}
        </span>
        <input v-if="showBoardDescEdit" type="text" class="board-title-input form-control ml-3 mr-1" v-model="updatedBoard.description">
        <button v-if="showBoardDescEdit" class="btn btn-success btn-sm mr-1 mb-2" @click="editBoardDesc">save</button>
        <button v-if="showBoardDescEdit" class="btn btn-danger btn-sm mr-1 mb-2" @click="showBoardDescEdit = false">cancel</button>
        
      </div> <!-- end board-desc -->

    </div> <!-- end title-and-description -->

    <div class="owned-board-list">

      <div class="row mx-4">

        <list v-for="list in boardLists" :list="list" class="col-12 col-sm-6 col-md-4 col-lg-3 mt-4"></list>

        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mt-4">

          <button v-if="!showAddListDropdown" class="add-list-toggle add-list btn btn-block mt-0" @click="showAddListDropdown = true">Add a list...</button>

          <div v-if="showAddListDropdown" class="add-list-dropdown p-2 rounded">
            <input type="text" class="list-title form-control" v-model="newList.title">
            <div class="add-list-btns d-flex w-100 mt-1">
              <button class="btn btn-sm px-3 btn-success" @click="createList">save</button>
              <button class="btn btn-sm px-3 btn-danger ml-auto" @click="showAddListDropdown = false">cancel</button>
            </div>
          </div>

        </div>

      </div>

    </div> <!-- end owned-board-list -->

  </div>

</template>

<script>
  import List from './List'
  import TopBar from './TopBar'
  import Navbar from './Navbar'
  export default {
    name: 'Board',
    components: {
      list: List,
      topBar: TopBar,
      navbar: Navbar
    },

    data() {
      return {
        showAddListDropdown: false,
        newList: {
          title: ""
        },
        showBoardTitleEdit: false,
        showBoardDescEdit: false,
        updatedBoard: {
          title: this.$store.state.activeBoard.title,
          description: this.$store.state.activeBoard.description
        }
      }
    },
    computed: {
      activeBoard() {
        return this.$store.state.activeBoard
      },
      boardLists() {
        return this.$store.state.boardLists
      }
    },
    methods: {
      showBoardList() {
        this.$router.push('Home')
      },
      createList() {
        var list = {
          title: this.newList.title,
          description: "A new task-list",
          boardId: this.activeBoard._id
        }
        this.$store.dispatch('createList', list)
        this.showAddListDropdown = false
      },
      toggleBoardEdit() {
        this.showBoardTitleEdit = this.showBoardTitleEdit ? false : true
      },
      toggleBoardDescEdit() {
        this.showBoardDescEdit = this.showBoardDescEdit ? false : true
      },
      editBoardTitle() {
        var updatedBoard = this.activeBoard
        updatedBoard.title = this.updatedBoard.title
        this.$store.dispatch('updateBoard', updatedBoard)
        this.showBoardTitleEdit = false
      },
      editBoardDesc() {
        var updatedBoard = this.activeBoard
        updatedBoard.description = this.updatedBoard.description
        this.$store.dispatch('updateBoard', updatedBoard)
        this.showBoardDescEdit = false
      }
    }
  }
</script>

<style scoped>
  .board {
    min-height: 100vh;
  }

  .board-title,
  .board-desc {
    min-height: 2.75rem;
  }

  .add-list-dropdown {
    background-color: #57BC90;
  }

  .delete-list-toggle:hover {
    background-color: #57BC90;
  }

  .form-control {
    width: inherit;
    display: inline-block;
    height: 1.9rem;
  }

  .btn {
    margin-top: 0.4rem;
  }

  .edit-toggle:hover {
    cursor: pointer;
    background-color: rgb(159, 216, 192);
  }

  .bg-color {
    background-color: #57BC90;
  }

  .add-list {
    background-color: #015249;
    color: white;
  }
</style>
