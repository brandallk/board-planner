<template>
  <div class="comments">
    <div class="row">
      <div class="col-1 commentTools">
        <a href="#" @click.prevent='deleteComment' class="text-danger">
          <span class="fas fa-trash"></span>
        </a>
        <p class="ml-4">{User.id}</p>
        <!-- <a href="#" @click.prevent='editComment = true' class="text-dark">
          <span class="fas fa-edit"></span>
        </a> -->
      </div>
      <!-- <div class="col-10">
        {{comment.body}}
      </div> -->
      <div class=".col comment-body">
        <span v-if="!showCommentEdit" class="d-block mb-2 pr-4 pb-2 rounded" @click="showCommentEdit = true">{{comment.body}}</span>
        <input v-if="showCommentEdit" type="text" class="form-content d-block rounded pl-3" v-model="updatedComment.body">
        <button v-if="showCommentEdit" class="btn btn-success btn-sm mb-2" @click="editComment">save</button>
        <button v-if="showCommentEdit" class="btn btn-danger btn-sm mb-2" @click="showCommentEdit = false">cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Comments',
    data() {
      return {
        showCommentEdit: false,
        updatedComment: {
          body: this.comment.body
        },
      }
    },
    computed: {
      getUserId(comment){
        this.$store.dispatch('getUserName',comment)
        return this.$store.state.user.name
      }
    },
    props: [
      'comment'
    ],
    methods: {
      deleteComment() {
        console.log('delete comment')
        this.$store.dispatch('deleteComment', this.comment)
      },
      editComment() {
        var updatedComment = this.comment
        updatedComment.body = this.updatedComment.body
        this.$store.dispatch('updateComment', updatedComment)
        this.showCommentEdit = false
      },
    }
  }
</script>

<style scoped>
  .comment-body input {
    width: 95%;
  }

  .comment-body:hover span {
    cursor: pointer;
    background-color: rgb(213, 213, 213);
  }

  .comment-body-toggle:hover {
    background-color: rgb(213, 213, 213);
  }
</style>