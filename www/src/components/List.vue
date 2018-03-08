<template>
  <div class="spacer px-2">
    <div class="listComponent rounded p-3" @drop="taskDrop"  @dragover.prevent="dragover">

      <div class="list-heading">
        <div class="d-flex">
          <div class="list-title">
            <span v-if="!showListTitleEdit" class="d-block mb-2 pr-4 pb-2 rounded" @click="showListTitleEdit = true">{{list.title}}</span>
            <input v-if="showListTitleEdit" type="text" class="form-content d-block rounded pl-3" v-model="updatedList.title">
            <button v-if="showListTitleEdit" class="btn btn-success btn-sm mb-2" @click="editListTitle">save</button>
          </div>
          <a href="#" class="delete-list-toggle ml-auto px-2 rounded text-muted" @click.prevent="toggleDeleteListDropdown">
            <i class="fas fa-ellipsis-h"></i>
          </a>
        </div>

        <div v-if="showDeleteListDropdown" class="delete-list-dropdown d-block mb-3">
          <button class="btn btn-danger btn-sm btn-block" @click="deleteList">delete   list</button>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <taskCard v-for="task in listTasks" :task="task"></taskCard>
          <input type="text" class="form-control mt-3 bg-light border-success" v-model="task.title">
          <button class="btn btn-success px-3 mt-2" @click="addNewTask">Add Task</button>
          <!-- <input v-if="showQuickieEdit" type="text" class="task-title col-9 d-inline-block rounded-left" v-model="updatedTask.title"> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import TaskCard from './TaskCard'
    export default {
        name: 'List',
        components: {
            taskCard: TaskCard
        },
        props: [
            'list'
        ],
        data() {
            return {
                task: {
                    title: ""
                },
                showDeleteListDropdown: false,
                updatedList: {
                  title: this.list.title
                },
                showDeleteListDropdown: false,
                showListTitleEdit: false
          }
        },
        computed: {
            board() {
                return this.$store.state.activeBoard
            },
            listTasks() {
                var boardTasks = this.$store.state.boardTasks
                return boardTasks.filter(task => task.listId === this.list._id)
            }
        },
        methods: {
            addNewTask() {
                var newTask = {
                    title: this.task.title,
                    description: "A new task",
                    listId: this.list._id,
                    boardId: this.board._id
                }
                this.$store.dispatch('createTask', newTask)
                this.task.title = ""
            },
            toggleDeleteListDropdown() {
                this.showDeleteListDropdown = this.showDeleteListDropdown ? false : true
            },
            editListTitle() {
              // var updatedList = this.list
              // updatedList.title = this.updatedList.title
              // this.$store.dispatch('updateList', updatedList)
              this.showListTitleEdit = false
            },
            deleteList() {
                this.showDeleteListDropdown = false
                this.$store.dispatch('deleteList', this.list)
            },
            dragover() {
                //console.log("dragover")
            },
            taskDrop() {

                var data = {
                    draggedTask: this.$store.state.draggedTask,
                    dropListId: this.list._id
                }
                this.$store.dispatch("updateTask", data)

            }
        }
    }
</script>

<style scoped>
  .listComponent {
    background-color: rgb(226, 228, 230);
  }

  .removeList {
    display: flex;
    justify-content: flex-end;
    align-self: flex-end;

  }

  .addTask {
    margin-left: 18px;
    height: 30px;
    width: 30px
  }

  .list-title input {
    width: 95%;
  }

  .list-title:hover span {
    cursor: pointer;
    background-color: rgb(213, 213, 213);
  }

  .delete-list-toggle:hover {
    background-color: rgb(213, 213, 213);
  }
 </style>
