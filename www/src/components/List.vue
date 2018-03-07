<template>
  <div class="list">
    <H5 class="text-left">Here are your current Lists:</H5>
    <div class="row">
      <div class="col-2 listComponent" v-for="list in boardLists">
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
      <div class="col-1">
        <button disabled="disabled">add List</button>
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
 
    data() {
      return {
        boardLists: this.$store.state.boardLists
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
