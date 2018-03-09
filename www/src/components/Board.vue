<template>
  <div class="board bg-info">

    <topBar></topBar>
    <navbar></navbar>

    <div class="boardList container-fluid p-3">
<div class="container-flex">
  <div class="row">
    <div class="col-med-5">  
      <h5 class="text-white mx-4">You are currently on your {{activeBoard.title}} board!</h5>
      
      <h6 class="text-white mx-4">Description: ((activeBoard.description}}</h6>
    </div>
    <div class="col-med-2">
        <a href="#" class="delete-list-toggle ml-auto px-2 rounded text-muted" @click.prevent="toggleBoardEdit">
            <i class="fas fa-ellipsis-h"></i>
          </a>
    </div>
  </div>
  <div class="row">
      <div v-if="toggleBoardEdit" class="board-edit d-block mb-3">
          <button class="btn btn-danger btn-sm btn-block" @click="editBoardTitle">delete   list</button>
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
            }
        }
    }
</script>

<style scoped>
    .board {
        min-height: 100vh;
    }
    
    .add-list-dropdown {
        background-color: rgb(226, 228, 230);
    }
    
    .delete-list-toggle:hover {
        background-color: rgb(213, 213, 213);
    }
</style>