<template>
  <div class="comments">
    <div class="row">
      <div class="col-2 commentTools">
        <button class="fas fa-trash"></button>
        <button class="fas fa-edit"></button>
      </div>
      <div class="col-10">
      {{comment.body}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Comments',
    data() {
      return {

      }
    },
    props: [
      'comment'
    ]
  }
</script>

<style scoped>
</style>