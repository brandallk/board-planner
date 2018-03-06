<template>
  <div class="board">

    <div class="card" style="width: 18rem;">
      <img class="card-img-top" src="http://placehold.it/10x10" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">{{title}}</h5>
        <p class="card-text">{{description}}</p>
      </div>
      <ul class="list-group list-group-flush" v-for="">
        <list></list>
      </ul>
      <div class="card-body">
        <a href="#" @click="" class="btn card-link">Go to Board</a>
      </div>
    </div>
  </div>
  
</template>

<script>
  import List from './List'
  export default {
    name: 'Board',
    components: {
      list: List,
    },
    data() {
      return {
        title: 'title',
        description: 'description',

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>