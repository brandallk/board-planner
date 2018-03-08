<template>
  <div class="taskCard">
    <div class="row py-1 px-3 mb-2">
      <!-- <div v-if="!showQuickieEdit" @click='openTaskEditForm' @closeTaskCard='closeTaskEditForm' draggable="true" @dragover.prevent="dragover" @dragstart="dragStart" @drop="drop" class="task-title col-9 d-inline-block rounded-left">{{task.title}}</div> -->
      <div v-if="!showQuickieEdit" @click='openTaskEditForm' @closeTaskCard='closeTaskEditForm' draggable="true" 
      @dragstart="dragStart" class="task-title col-9 d-inline-block rounded-left">{{task.title}}</div>


      <input v-if="showQuickieEdit" type="text"  class="task-title col-9 d-inline-block rounded-left" v-model="updatedTask.title">
      <div class="edit-toggle col-3 d-inline-block d-flex justify-content-center align-items-center rounded-right" @click="toggleQuickieEdit">
        <a href="#">
          <i class="fas fa-pencil-alt"></i>
        </a>
      </div>

      <div v-if="showQuickieEdit" class="quickieEdit-btns d-flex w-100 mt-1">
        <button class="btn btn-sm btn-success" @click="editTaskName">save</button>
        <button class="btn btn-sm btn-danger ml-auto" @click="deleteTask">delete task</button>
      </div>
    </div>
    <taskEditForm v-if="showTaskEditForm"></taskEditForm>
    <!-- <comment v-for="comment in taskComments"></comment> -->

  </div>
</template>

<script>
    import TaskEditForm from './TaskEditForm'
    export default {
        name: 'TaskCard',
        components: {
            taskEditForm: TaskEditForm,
        },
        props: [
            'task'
        ],
        data() {
            return {
                updatedTask: {
                    title: this.task.title
                },
                showQuickieEdit: false,
                showTaskEditForm: false

            }
        },
        computed: {
            taskComments() {
                var boardComments = this.$store.state.boardComments
                return boardComments.filter(comment => comment.taskId === this.task._id)
            }
        },
        methods: {
            toggleQuickieEdit() {
                this.showQuickieEdit = this.showQuickieEdit ? false : true
            },
            editTaskName() {
                var task = this.task
                task.title = this.updatedTask.title
                    //console.log('line 52:', task)
                this.$store.dispatch('editTask', task)
                this.showQuickieEdit = false
            },
            deleteTask() {
                this.$store.dispatch('deleteTask', this.task)
                this.showQuickieEdit = false
            },
            openTaskEditForm() {
                //console.log("hello")
                // this.getBoardLists(board)
                // this.activeBoardId = board._id
                this.showTaskEditForm = true
            },
            closeTaskEditForm() {
                //console.log("hello")
                // this.getBoardLists(board)
                // this.activeBoardId = board._id
                this.showTaskEditForm = false
            },

            dragStart() {
                this.$store.dispatch("setDraggedTask", this.task)
                    // console.log("dragStart")
            },
            // drop() {

            //     var dropTarget = this.task
            //     var data = {
            //         draggedTask: this.$store.state.draggedTask,
            //         dropListId: dropTarget.listId
            //     }
            //     this.$store.dispatch("updateTask", data)
            // }
        }
    }
</script>

<style scoped>
    .task-card {
        position: relative;
    }
    
    .task-title {
        background-color: white;
    }
    
    .task-title:hover {
        cursor: pointer;
        background-color: rgb(240, 240, 240);
    }
    
    .edit-toggle {
        background-color: white;
    }
    
    .edit-toggle:hover {
        cursor: pointer;
        background-color: rgb(213, 213, 213);
    }
    
    .edit-toggle a {
        color: rgb(235, 235, 235);
    }
    
    .edit-toggle:hover a {
        color: rgb(125, 125, 125);
    }
    
    .quickieEdit {}
</style>