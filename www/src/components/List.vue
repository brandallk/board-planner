<template>
  <div>

    <div class="col-2 listComponent">
      <p class="list-group-item">{{list.title}}</p>
      <div class="row">
        <div class="col">
          <taskCard></taskCard>
          <div class="row">
            
            <button class="addTask" >+</button>
          </div>
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
      taskCard: TaskCard,
    },
    props: [
      'list',
      'boardTasks',
      'boardComments'
    ],
    data() {
      return {
        
      }
    },
    computed: {
      getTasksForList(list) {
        return this.boardTasks.filter(task => task.listId === list._id)
      },
      getCommentsForTask(task) {
        return this.boardComments.filter(comments => comment.taskId === task._id)
      }
    }
  }
 </script>
 
 <!-- Add "scoped" attribute to limit CSS to this component only -->
 <style scoped>
  .listComponent {
    outline: 2px solid black;
    padding: 1px;
    margin: 4px;
  }
  .addTask {
    margin-left: 18px;
    height: 30px;
     width: 30px
  }
 </style>
