<template>
  <div class="boardPreview">

    <transition name="modal-fade">
      <div class="modal-backdrop">
        <div class="modal rounded" role="dialog">
            
          <header class="modal-header">
            <h4 class="text-center w-100 mt-2 font-weight-bold">{{board.title}}</h4>
          </header>

          <div class="modal-body container px-5">
            <div name="section body">
              <div class="card-Body">
                {{board.description}}
              </div> 
            </div>
          </div>
          
          <div class="boardList container px-5 py-3">
            <h5>Board Lists:</h5>
            <ol>
              <li class="listEntry mt-4" v-for="list in lists">
                <span>
                  {{list.title}}
                </span>
                <span class="d-block font-italic">
                  <small>{{list.description}}</small>
                </span> 
              </li>
            </ol>
          </div>

          <footer class="modal-footer">
            <div class="col">
              <button type="button" class="btn btn-danger btnDelete" @click="deleteBoard(board)">Delete this board</button>
            </div>
            <button type="button" class="btn" @click="close">Cancel</button>
            <button type="button" class="btn btn-success" @click="gotoBoard(board)">Load board</button>
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
            'board'
        ],
        computed: {
            lists() {
                var lists = this.$store.state.boardLists
                lists.sort((listA, listB) => listA.createdAt - listB.createdAt)
                return lists
            }
        },
        methods: {
            close() {
                this.$emit('closeBoardPreview')
            },
            gotoBoard(board) {
                this.$emit('close')
                console.log('board', board)
                this.$store.dispatch('sendingActiveBoard', board)
                this.$router.push('Board')
            },
            deleteBoard(board) {
                this.$store.dispatch('deleteBoard', board)
                this.close()
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
        background: white;
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