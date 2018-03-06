<template>
  <div class="welcome container-fluid">
    <topBar></topBar>
    <signIn v-on:showRegisterForm="showRegisterForm" v-if="showSignIn"></signIn>
    <register v-on:showSignInForm="showSignInForm" v-if="!showSignIn"></register>
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
        showSignIn: true
      }
    },
    methods: {
      showSignInForm() {
        this.showSignInForm = true
      },
      showRegisterForm() {
        this.showSignInForm = false
      }
    }
  }
</script>

<style scoped>

</style>
