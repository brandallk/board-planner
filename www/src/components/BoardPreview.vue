<template>
  <div class="boardPreview">
    <transition name="modal-fade">
      <div class="modal-backdrop">
        <div class="modal" role="dialog">
          <header class="modal-header" id="modalTitle">
            <div name="header">{{board.title}}
              <button type="button" class="btn-close" @click="close">x</button>
            </div>
          </header>
          <div class="modal-body" id="modalDescription">
            <div name="section body">
              <div class="card-Body">
                {{board.description}}
              </div>
              <ul class="list-group list-group-flush">
                  <li v-for="list in lists">
                    <p>{{list.title}}</p>
                  </li>
                 </ul>
            </div>
                   </div>
          <footer class="modal-footer">
            <slot name="footer">
              <button type="button" class="btn" @click="close" aria-label="Close modal">Close me!</button>
              <button type="button" class="btn" @click="" aria-label="Edit Board">Edit Board</button>
            </slot>
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
    props: ['board','lists'],
    
    methods: {
      close() {
        this.$emit('close');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
    background: black;
    box-shadow: 2px 2px 20px 1px;
    /* overflow-x: auto; */
    display: flex !important;
    align-self: center;
    flex-direction: column;
    width: 350px;
  }
</style>