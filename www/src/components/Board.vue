<template>
  <div class="board">
    <topBar></topBar>
    <!-- <a href="#" class="logout btn btn-alert" @click.prevent="logout">LOGOUT</a> -->
    <h1 class="p-3">'My Boards</h1>
    <div class="row page">
      <div class="col boards">
        <div class="card" style="width: 18rem;">
          <img class="card-img-top" src="http://placehold.it/10x10" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Cras justo odio</li>
            <li class="list-group-item">Dapibus ac facilisis in</li>
            <li class="list-group-item">Vestibulum at eros</li>
          </ul>
          <div class="card-body">
            <a href="#" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Board',
    data() {
      return {

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>