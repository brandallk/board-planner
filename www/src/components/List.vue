<template>
  <div class="list">
    <li class="list-group-item" v-for="">{{title}}</li>
    
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
        title: 'List Title'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>