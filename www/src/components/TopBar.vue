<template>
  <div class="topbar bg-dark row">
    
    <div class="col-sm-4 menu p-4" v-if="user._id">
      <a href="#" class="btn btn-info text-light" @click.prevent="showBoardsList">Home</a>
    </div>
    <div :class="{ 'col-sm-4': user._id, 'col-sm-12': !user._id }">
      <h1 class="text-center text-light py-4">Board-Planner</h1>
    </div>
    <div class="col-sm-4 logout p-4" v-if="user._id">
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
    computed: {
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      showBoardsList() {
        this.$router.push('Home')
      },
      logout() {
        this.$store.dispatch('logoutUser')
      }
    }
  }
</script>

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