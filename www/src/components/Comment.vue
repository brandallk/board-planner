<template>
  <div class="row comments">
    <div class="col-1 txt-color commentTools">
      <a href="#" @click.prevent='deleteComment' class="text-danger">
        <span class="fas fa-trash"></span>
      </a>
    </div>
    <div class="col comment-body txt-color">
      <span v-if="!showCommentEdit" class="d-block mb-2 pr-4 pb-2 rounded" @click="showCommentEdit = true">{{comment.body}}</span>
      <input v-if="showCommentEdit" type="text" class="form-content d-block rounded pl-3" v-model="updatedComment.body">
      <button v-if="showCommentEdit" class="btn btn-success btn-sm mb-2" @click="editComment">save</button>
      <button v-if="showCommentEdit" class="btn btn-danger btn-sm mb-2" @click="showCommentEdit = false">cancel</button>
      <div class="div">
        <h6 class="ml-2 txt-color2">{{userInfo.name}},</h6>
        <p class="ml-4 txt-color2">{{comment.created}}</p>
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
          body: this.comment.body,

        },
      }
    },
    computed: {
      userInfo() {

        var allUserInfo = this.$store.state.taskCommentOwners
        var commentCreator = allUserInfo.find(user => {
          return user.userId === this.comment.userId
        })
        return commentCreator
      }

    },

    mounted() {
      this.getUserId()
    },
    props: [
      'comment'
    ],
    methods: {
      deleteComment() {

        this.$store.dispatch('deleteComment', this.comment)
      },
      editComment() {
        var updatedComment = this.comment
        updatedComment.body = this.updatedComment.body
        this.$store.dispatch('updateComment', updatedComment)
        this.showCommentEdit = false
      },
      getUserId() {
        this.$store.dispatch('getCommentByUser', this.comment.userId)
      },
    }
  }
</script>

<style scoped>
  .comment-body input {
    width: 100%;
  }

  .comment-body:hover span {
    cursor: pointer;
    background-color: rgb(213, 213, 213);
  }

  .comment-body-toggle:hover {
    background-color: rgb(213, 213, 213);
  }

  .txt-color {
    color: black;
  }
  .txt-color2 {
    font-style: italic;
    color: grey;
  }
</style>