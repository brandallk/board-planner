<template>
  <div class="taskCard">

      <span class="bg-white d-block px-2 py-1 rounded mb-2">{{task.title}}</span>

      <!-- <comment v-for="comment in taskComments"></comment> -->

  </div>
</template>

<script>
  import Comment from './Comment'
  export default {
    name: 'TaskCard',
    components: {
      comment: Comment,
    },
    props: [
      'task'
    ],
    data() {
      return {
        
      }
    },
    computed: {
      taskComments() {
        var boardComments = this.$store.state.boardComments
        return boardComments.filter(comment => comment.taskId === this.task._id)
      }
    }
  }
</script>

<style scoped>
  .tasks {
    font-size: 12px;
    border: 1px dotted red;
    margin-right: 100px;
  }
</style>