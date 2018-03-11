<template>
  <div class="taskCard">
    <div class="row py-1 px-3 mb-2">
      <div v-if="!showQuickieEdit" @click='openTaskEditForm' @closeTaskCard='closeTaskEditForm' draggable="true" 
      @dragstart="dragStart" @dragover.prevent="dragover" @drop="taskDrop" class="task-title col-9 task-txt d-inline-block rounded-left">{{task.title}}</div>


      <input v-if="showQuickieEdit" type="text"  class="task-title col-9 task-txt d-inline-block rounded-left" v-model="updatedTask.title">
      <div class="edit-toggle col-3 d-inline-block d-flex task-txt justify-content-center align-items-center rounded-right" @click="toggleQuickieEdit">
        <a href="#">
          <i class="fas fa-pencil-alt"></i>
        </a>
      </div>

      <div v-if="showQuickieEdit" class="quickieEdit-btns d-flex w-100 mt-2">
        <button class="btn btn-sm btn-success py-0" @click="editTaskName">save</button>
        <button class="btn btn-sm btn-danger py-0 ml-2" @click="deleteTask">delete task</button>
      </div>
    </div>
    <taskEditForm :board="board" :list="list" :task="task" v-if="showTaskEditForm" @closeTaskEditForm='closeTaskEditForm'></taskEditForm>

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
            'task',
            'list',
            'board'
        ],
        data() {
            return {
                showQuickieEdit: false,
                showTaskEditForm: false,
                updatedTask: {
                    // title: this.task.title // <-- CANNOT USE! The 'task' prop is 'slow' to be defined, so it is still undefined when the component's 'data' is set!
                    title: ""
                }
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
                // Assign a placeholder to the edit input-field when the field is toggled (...because it cannot be assigned via 'data')
                this.updatedTask.title = this.updatedTask.title === "" ? this.task.title : this.updatedTask.title
                
                this.showQuickieEdit = this.showQuickieEdit ? false : true
            },
            editTaskName() {
                var task = this.task
                task.title = this.updatedTask.title
                console.log('line 52:', task)
                this.$store.dispatch('editTask', task)
                this.showQuickieEdit = false
            },
            deleteTask() {
                this.$store.dispatch('deleteTask', this.task)
                this.showQuickieEdit = false
            },
            openTaskEditForm() {
                this.showTaskEditForm = true
            },
            closeTaskEditForm() {
                this.showTaskEditForm = false
            },
            dragStart() {
                // console.log("dragStart")
                this.$store.dispatch("setDraggedTaskInfo", {list: this.list, task: this.task})
            },
            dragover() {
                // console.log("dragover")
            },
            taskDrop() {
                var payloadData = {
                    originList: this.$store.state.draggedTaskInfo.list,
                    draggedTask: this.$store.state.draggedTaskInfo.task,
                    dropList: this.list,
                    dropTaskId: this.task._id
                }
                this.$store.dispatch('handleTaskDrop', payloadData)
            }
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
    
    .task-txt {
        color: black;
    }
</style>