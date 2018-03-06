<template>
  <div class="boardlist">
    <h1 class="p-3">My Boards</h1>
    <div class="row page">
      <div class="col boards" v-for="">
        <div @click="showModal" class="boardPreview">
          <!-- <button type="button" @click="showModal" @load="">Preview Board</button> -->
          <div class="card" style="width: 18rem;">
              <img class="card-img-top" src="http://placehold.it/10x10" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title">{{title}}</h5>
                <p class="card-text">{{description}}</p>
              </div>
              <ul class="list-group list-group-flush" v-for="">
                <list></list>
              </ul>
              <div class="card-body">
                <a href="#" @click="" class="btn card-link">Go to Board</a>
              </div>
            </div>
          </div>
          
          <boardPreview v-show="isModalVisible" @close="closeModal"></boardPreview>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import boardPreview from './BoardPreview'
  export default {
    name: 'BoardList',
    components: {
      boardPreview: boardPreview,
    },
    data() {
      return {
        isModalVisible: false,
        title: "Board Title",
        description: "description"
      }
    },
    methods: {
      showModal() {
        this.isModalVisible = true;
        this.$store.dispatch('getboard')
      },
      closeModal() {
        this.isModalVisible = false;
      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .boardList {
    display: flex;
  }

  .boards {
    margin: 20px;
    padding: 20px;
    display: flex;
    justify-content: center;

  }

  .page {
    background-color: grey;
  }

  
</style>