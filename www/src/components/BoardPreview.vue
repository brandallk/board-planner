<template>
  <div class="boardPreview">
    <transition name="modal-fade">
      <div class="modal-backdrop">
        <div class="modal" role="dialog">
          <header class="modal-header" id="modalTitle">
            <h5>{{board.title}}</h5>
          </header>
          <div class="modal-body" id="modalDescription">
            <div name="section body">
              <div class="card-Body">
                {{board.description}}
              </div>
 
            </div>
          </div>
          <div class="row boardList p-3">
            <h5 class="p-3">Board Lists:</h5>
            <ol class="">
              <li class="listEntry mt-4" v-for="list in lists">
                <div class="col">
                  {{list.title}}
                </div>
                <div class="col">
                  {{list.description}}
                </div>
 
              </li>
            </ol>
          </div>
          <footer class="modal-footer">
            <div class="col">
              <button type="button" class="btn btn-alert btnDelete" @click="close">Delete!</button>
            </div>
            <button type="button" class="btn" @click="close">Close me!</button>
            <button type="button" class="btn" @click="gotoBoard(board)">Edit Board</button>
          </footer>
        </div>
      </div>
    </transition>  
  </div>
</template>
 
<script>
  import List from './List'
  export default {
    name: 'BoardPreview',
    components: {
      list: List,
    },
    data() {
      return { 
        isModalVisible: false,
      }
    },
    props: [
      'board',
      'lists'
    ], 
    methods: {
      close() {
        this.$emit('closeBoardPreview')
      },
      gotoBoard(board) {
        this.$emit('close')
        console.log('board', board)
        this.$store.dispatch('sendingActiveBoard', board)
        this.$router.push('Board')
      }
    }
  }
</script>
 
<style scoped>
  .modal-body {
    background-color: white;
    display: block;
  }
 
  .modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }
 
  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5 ease;
  }
 
  .modal-backdrop {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }
 
  .modal {
    background: grey;
    box-shadow: 2px 2px 20px 1px;
 
    overflow: hidden;
    display: flex;
    align-self: center;
    flex-direction: column;
    width: 550px;
    position: relative;
  }
 
  .boardList {
    min-height: 300px;
 
    outline: 2px solid black;
  }
 
  .list-group {
    height: 20px;
   }
   .btnDelete {
     display: flex;
    justify-content: flex-start;
   }
 </style>
