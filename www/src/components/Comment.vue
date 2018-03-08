<template>
  <div class="comments">
    <div class="row">
      <div class="col-2 commentTools">
        <a href="#" @click.prevent='deleteComment' class="text-danger" ><span class="fas fa-trash"></span></a>
        <a href="#" @click="editComment" class="text-dark"><span class="fas fa-edit"></span></a>
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
    ],
    methods: {
      editComment() {
        // var updatedList = this.list
        // updatedList.title = this.updatedList.title
        // this.$store.dispatch('updateList', updatedList)
        this.showListTitleEdit = false
      },
      deleteComment() {
        console.log('delete comment')
        this.$store.dispatch('deleteComment', this.comment)
      },

    }
  }
</script>

<style scoped>
</style>