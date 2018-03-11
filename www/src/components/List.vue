<template>
  <div class="spacer px-2">
    <div class="list-bg listComponent rounded p-3" @drop="taskDrop"  @dragover.prevent="dragover">

      <div class="list-heading">
        <div class="d-flex">

          <div>

            <div class="list-title mb-3 pr-2 rounded" v-if="!showListTitleEdit" @click="showListTitleEdit = true">
                <span>List: </span>
                <span class="d-inline-block">{{list.title}}</span>
            </div>

            <input v-if="showListTitleEdit" type="text" class="updated-list-title form-control mb-2 rounded pl-3" v-model="updatedList.title">
            <button v-if="showListTitleEdit" class="btn btn-success btn-sm py-0 mb-2" @click="editListTitle">save</button>
            <button v-if="showListTitleEdit" class="btn btn-danger btn-sm py-0 mb-2" @click="showListTitleEdit = false">cancel</button>

          </div>

          <a href="#" class="delete-list-toggle ml-auto px-2 rounded elipse-color text-muted" @click.prevent="toggleDeleteListDropdown">
            <i class="fas fa-ellipsis-h"></i>
          </a>

        </div>

        <div v-if="showDeleteListDropdown" class="delete-list-dropdown d-block mb-3">
          <button class="btn btn-danger btn-sm btn-block" @click="deleteList">delete   list</button>
        </div>
      </div>

      <div class="row"> 
        <div class="col">
          <taskCard v-for="listTask in listTasks" :board="board" :list="list" :task="listTask"></taskCard>
          <input type="text" class="form-control mt-3 task-txt border-success" v-model="task.title">
          <button class="btn btn-sm btn-success px-3 mt-2" @click="addNewTask">Add Task</button>
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
                // General-purpose function that sorts one array of items containing ID's according to the order of ID items in a second array
                function parallelSort(unsortedArr, sortedIdsArr) {
                    return sortedIdsArr.map(id => unsortedArr.find(elt => elt._id === id))
                }

                // Get all the tasks that belong to the active Board
                var boardTasks = this.$store.state.boardTasks
                // Get a subset of tasks that belong to just the current List
                var tasksInList = boardTasks.filter(task => task.listId === this.list._id)

                var currentList = this.$store.state.boardLists.find(list => list._id === this.list._id)

                // The taskIDs array from the current List (which contains taskIds in the order in which Tasks should be displayed)
                var listTasksIdsArr = currentList.taskIds
                // Ensure that Tasks will be displayed in the order prescribed by the List's taskIds array
                var orderedTasks = parallelSort(tasksInList, listTasksIdsArr)
                return orderedTasks
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
                debugger
                var updatedList = this.list
                updatedList.title = this.updatedList.title
                this.$store.dispatch('updateList', updatedList)
                this.showListTitleEdit = false
            },
            deleteList() {
                this.showDeleteListDropdown = false
                this.$store.dispatch('deleteList', this.list)
            },
            dragover() {
                // console.log("dragover")
            },
            taskDrop() {
                // Only handle the task-drop event here IF the List currently has NO Tasks. Otherwise, it will be handled in TaskCard.vue
                if (this.list.taskIds.length === 0) {
                    var payloadData = {
                        originList: this.$store.state.draggedTaskInfo.list,
                        draggedTask: this.$store.state.draggedTaskInfo.task,
                        dropList: this.list
                    }
                    this.$store.dispatch('handleTaskDrop', payloadData)
                }
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
    
    .list-title:hover {
        cursor: pointer;
        background-color: #57BC90;
    }

    .updated-list-title.form-control {
        width: 90%;
    }
    
    .delete-list-toggle:hover {
        background-color: rgb(213, 213, 213);
    }
    
    .list-bg {
        background-color: #015249;
        color: white
    }
    
    .elipse-color {
        background-color: #57BC90;
        height: 25px;
    }
    
    .task-txt {
        color: #015249;
    }

    .form-control {
        width: inherit;
        display: inline-block;
        height: 1.9rem;
    }
</style>