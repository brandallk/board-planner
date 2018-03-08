<template>
  <div class="taskEditForm">
    <!-- <button @click="showModal = true">Edit Tasks</button> -->
    <modal v-if="showModal" @close="showModal = false">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">

              <div class="modal-header">
                <div class="col">
                  <h3>Edit Form</h3>
                  <p class="px-4">{Task Name}</p>

                </div>
                <div class="div">
                  <p>{Board Name}</p>
                  <p>{List Name}</p>
                </div>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-6">
                    <h5>Task Description:</h5>
                    <textarea form="taskDescription" class="p-1" placeholder="add a description" name="taskDescription"></textarea>
                  </div>
                  <div class="col-6">
                    <h5>Attachments?</h5>
                    <input class="p-1" type="file" id="myFile">
                  </div>
                </div>
                <div class="row mt-4">
                  <div class="col commentBody">
                    <h5>Add Comment</h5>
                    <textarea form="commentDescription" class="p-1" placeholder="write a comment" name="commentDescription"></textarea>
                  </div>
                </div>
              </div>
              <div class="row">
                <h6>Existing Comment:</h6>
              </div>
              <div class="row">
                <div class="col">
                  <comment></comment>

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
    </modal>
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
        taskDescription: '',
        commentDescription: '' 
      }
    },
    methods: {
      close() {
        this.showModal = false
        // this.taskDescription.dispatch()
        // this.commentDescription.dispatch() 
        // this.$emit('closeTaskEditForm')
        console.log('somewhere')
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
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
</style>