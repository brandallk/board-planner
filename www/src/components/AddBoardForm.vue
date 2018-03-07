<template>
  <div class="background d-flex align-items-center justify-content-center">
    <form action="#" @submit.prevent="submit" class="bg-light border border-secondary rounded p-4">
  
      <h4 class="text-center">Create a New Board</h4>

      <div class="form-group">
        <label for="newBoardTitle">Title: </label>
        <input type="text" id="newBoardTitle" class="form-control" v-model="board.title">
      </div>
      <div class="form-group">
        <label for="newBoardDesc">Description: </label>
        <input type="text" id="newBoardTitleDesc" class="form-control" v-model="board.description">
      </div>
      
      <button class="btn btn-default px-4" type="button" @click="close">Cancel</button>
      <button class="btn btn-info px-4 ml-3" type="submit">Submit</button>
  
    </form>
  </div>
</template>

<script>
  export default {
    name: 'AddBoardForm',
    data() {
      return {
        board: {
          title: "",
          description: ""
        }
      }
    },
    methods: {
      submit() {
        this.$store.dispatch('createBoard', this.board)
        this.close()
      },
      close() {
        this.$emit('closeAddBoardForm')
      }
    }
  }


</script>

<style scoped>
  div.background {
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
  form {
    width: 95%;
  }
  @media (min-width: 576px) {
    form {
      width: 50%;
    }
  }
</style>