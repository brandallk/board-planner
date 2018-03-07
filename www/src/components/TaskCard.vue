<template>
  <div class="taskCard">
    <div class="">
      <h6 class="text-left">Current Tasks:</h6>
      <p class="tasks">This is a taskCard Placeholder!</p>
      <!-- <comments></comments> -->
  </div>

  </div>
</template>

<script>
  import Comments from './Comments'
  export default {
    name: 'TaskCard',
    components: {
      comments: Comments,
    },
    data() {
      return {

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tasks {
    font-size: 12px;
    border: 1px dotted red;
    margin-right: 100px;
  }
</style>