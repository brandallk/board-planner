<template>
  <div class="taskEditForm">
    <!-- <button @click="showModal = true">Edit Tasks</button> -->
    <div v-if="showModal">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">

              <div class="modal-header">
                <div class="col">
                  <h3>Edit Form</h3>

                </div>
                <div class="div">
                  <p class:="text-wrap">Board Name: {{board.title}}</p>
                  <p class:="text-wrap"> List:{{list.title}}</p>
                  <p class:="text-wrap"> Task Name:{{task.title}}</p>
                </div>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-6">
                    <h5>Task Description:</h5>
                    <textarea v-model="taskDescription" class="p-1"></textarea>
                    <button class="btn btn-sm btn-success" @click="saveTaskDescription">save</button>
                  </div>
                  <div class="col-6">
                    <h5>Attachments?</h5>
                    <input class="p-1" type="file" id="myFile">
                  </div>
                </div>
                <div class="row mt-4">
                  <div class="col commentBody">
                    <h5>Add Comment</h5>
                    <textarea v-model="commentDescription" class="p-1"></textarea>
                    <button class="btn btn-sm btn-success" @click="saveCommentDescription">save</button>
                  </div>
                </div>
                <div class="row existing">
                  <h6>Existing Comments:</h6>
                </div>
                <div class="row">
                  <div class="col">
                    <comment v-for="comment in taskComments" :comment='comment'></comment>
                  </div>
                </div>
              </div>
              <div class="">
              </div>
              <div class="modal-footer">
                <button class=" btn btn-success" @click='close'>OK</button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>

</template>

<script>
  import Comment from './Comment'

  export default {
    name: 'TaskEditForm',
    components: {
      comment: Comment,
    },
    data() {

      return {
        showModal: true,
        taskDescription: this.task.description,
        commentDescription: ""
      }
    },
    props: [
      "task",
      "list",
      "board"
    ],
    computed: {
      taskComments() {
        var boardComments = this.$store.state.boardComments
        return boardComments.filter(comment => comment.taskId === this.task._id)
      }
    },
    methods: {
      close() {
        this.$emit('closeTaskEditForm')
      },
      saveTaskDescription() {
        if (!this.taskDescription.trim() == "") {
        console.log('task description', this.taskDescription)
        var updatetask = this.task
        updatetask.description = this.taskDescription
        this.$store.dispatch('editTask', updatetask)
        }
      },
      saveCommentDescription() {
        if (!this.commentDescription.trim() == "") {
          var comment = {
          body: this.commentDescription,
          listId: this.task.listId,
          taskId: this.task._id,
          boardId: this.$store.state.activeBoard._id
        }

        // updatetask.description = this.taskDescription
        // this.$store.dispatch('editTask', updatetask)
        console.log('comment', comment)

        this.$store.dispatch('createComment', comment)
        this.commentDescription = ''
      }
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .text-wrap {
    word-wrap: break-word;
    width: 11em;
  }

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: flex;
    flex-direction: column;
    transition: opacity .3s ease;
    overflow: scroll
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 600px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }

  /*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  .commentBody textarea {
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .existing {
    margin-top: 80px;
  }
</style>