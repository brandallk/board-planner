<template>
  <div class="welcome">
    <topBar></topBar>
    <signIn></signIn>
    <register></register>
  </div>
</template>

<script>
  import TopBar from './TopBar'
  import SignIn from './SignIn'
  import Register from './Register'
  export default {
    name: 'Welcome',
    components: {
      topBar: TopBar,
      signIn: SignIn,
      register: Register
    },
    data () {
      return {
        
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
