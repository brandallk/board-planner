<template>
  <div class="board bg-color">

    <topBar></topBar>
    <navbar></navbar>

    <div class="boardList container-fluid p-3">
          
            <div class="d-flex" >
               <div class="board-title">
                <h5 v-if="!showBoardTitleEdit" class="text-white mx-4">You are currently on your {{activeBoard.title}} board!</h5>
                <input v-if="showBoardTitleEdit" type="text" class="board-title-input" v-model="updatedBoard.title">
                <button v-if="showBoardTitleEdit" class="btn btn-success btn-sm mb-2" @click="editBoardTitle">save</button>
                <button v-if="showBoardTitleEdit" class="btn btn-danger btn-sm mb-2" @click="showBoardTitleEdit = false">cancel</button>      
              </div>
              <div class="">
                <a href="#" class="ml-auto px-2 rounded text-white" @click.prevent="toggleBoardEdit">
                <i class="fas fa-ellipsis-h"></i>
              </a>
              </div>
            </div>

            <div class="d-flex">
                <div class="board-desc">
                    <h6 v-if="!showBoardDescEdit" class="text-white mx-4">Description: {{activeBoard.description}}</h6>
                    <input v-if="showBoardDescEdit" type="text" class="board-desc" v-model="updatedBoard.description">
                    <button v-if="showBoardDescEdit" class="btn btn-success btn-sm mb-2" @click="editBoardDesc">save</button>
                    <button v-if="showBoardDescEdit" class="btn btn-danger btn-sm mb-2" @click="showBoardDescEdit = false">cancel</button>      
                        
                </div>
                <div class="">
                  <a href="#" class="ml-auto px-2 rounded text-white" @click.prevent="toggleBoardDescEdit">
                  <i class="fas fa-ellipsis-h"></i>
                </a>
                </div>
            </div> 
    </div>   
    
 
      <div class="list">
        <div class="row mx-4">

          <list v-for="list in boardLists" :list="list" class="col-3 mt-4"></list>

          <div class="col-3 mt-4">
            <button v-if="!showAddListDropdown" class="add-list-toggle btn btn-block" @click="showAddListDropdown = true">Add a list...</button>
            <div v-if="showAddListDropdown" class="add-list-dropdown p-2 rounded">
              <input type="text" class="list-title form-control" v-model="newList.title">
              <div class="add-list-btns d-flex w-100 mt-1">
                <button class="btn btn-sm px-3 btn-success" @click="createList">save</button>
                <button class="btn btn-sm px-3 btn-danger ml-auto" @click="showAddListDropdown = false">cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
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
                    title: "",
                    description: ""
                        // title: this.board.title,
                        // description: this.board.description
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
                updatedBoard.description = this.updatedBoard.description
                this.$store.dispatch('updateBoard', updatedBoard)
                this.showBoardTitleEdit = false
            },
            editBoardDesc() {

                var updatedBoard = this.activeBoard
                updatedBoard.description = this.updatedBoard.description
                updatedBoard.title = this.updatedBoard.title
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
    
    .add-list-dropdown {
        background-color: #57BC90;
    }
    
    .delete-list-toggle:hover {
        background-color: #57BC90;
    }
    
    .board-title {
        width: 40%;
    }
    
    .board-title input {
        width: 100%;
    }
    
    .board-desc {
        width: 40%;
    }
    
    .board-desc input {
        width: 100%
    }
    
    .board-title:hover span {
        cursor: pointer;
        background-color: #57BC90;
    }
    
    .bg-color {
        background-color: #57BC90;
    }
</style>