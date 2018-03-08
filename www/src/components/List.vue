<template>
  <div class="spacer px-2">
    <div class="listComponent rounded p-3">

      <span class="d-block mb-2">{{list.title}}</span>

      <div class="row">
        <div class="col">

          <taskCard v-for="task in listTasks" :task="task"></taskCard>
          
          <input type="text" class="form-control mt-3 bg-light border-success" v-model="task.title">

          <button class="btn btn-success px-3 mt-2" @click="addNewTask">Add task</button>

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
        }
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
      }
    }
  }
 </script>
 
 <style scoped>
  .listComponent {
    background-color: rgb(226,228,230);
  }
  
  .addTask {
    margin-left: 18px;
    height: 30px;
     width: 30px
  }
 </style>
