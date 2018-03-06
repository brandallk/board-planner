<template>
  <div class="taskCard">
    <div class="">
      <p>This is a taskCard!</p>
      <comments></comments>
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
</style>