<template>
  <div class="boardlist">
    <h1 class="p-3">'Board Preview</h1>
    <div class="row page">
      <div class="col boards" v-for="">
        <boardPreview></boardPreview>
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

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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