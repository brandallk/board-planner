<template>
  <div class="topbar bg-dark row">
    <div class="col-sm-4 menu p-4">
      <a href="#" class="btn btn-info text-light" @click.prevent="logout">Menu/Add?</a>
    </div>
    <div class="col-sm-4">
      <h1 class="text-center text-light py-4">Board-Planner</h1>
    </div>
    <div class="col-sm-4 logout p-4">
      <a href="#" class="btn btn-danger text-light" @click.prevent="logout">LOGOUT</a>
    </div>

  </div>

</template>

<script>
  export default {
    name: 'TopBar',
    data() {
      return {

      }
    },
    methods: {
      logout() {
        this.$store.dispatch('logoutUser')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .logout {
    flex-direction: row-reverse;
    align-self: center;
    display: flex
  }

  .menu {
    flex-direction: row;
    align-self: center;
    display: flex
  }
</style>