<template>
  <div class="home">
    <h1>'HOME' COMPONENT</h1>

    <a href="#" @click.prevent="logout">LOGOUT</a>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
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

<style scoped>

</style>
