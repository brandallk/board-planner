<template>
  <div class="welcome">
    <div class="container-fluid pb-5">
      <topBar></topBar>

      <div class="welcome-message container">
        <h1 class="text-center m-5">Welcome to Board-Planner!</h1>
        <p>We are a startup that is aimed at helping people plan out their projects...</p>
        <p class="p-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda dolores alias id, quaerat quos dolore earum ducimus
          eaque velit dignissimos. Doloremque blanditiis aliquid nesciunt! Delectus, aperiam quisquam? Atque dolores autem
          explicabo porro facere accusamus sint libero, reprehenderit soluta labore voluptatem!
        </p>
      </div>

      <errorMsg v-if="authError.error">{{authError.message}}</errorMsg>

      <signIn v-on:showRegisterForm="showSignIn = false" v-if="showSignIn"></signIn>

      <register v-on:showSignInForm="showSignIn = true" v-if="!showSignIn"></register>
    </div>
  </div>
</template>

<script>
  import TopBar from './TopBar'
  import ErrorMsg from './ErrorMsg'
  import SignIn from './SignIn'
  import Register from './Register'
  export default {
    name: 'Welcome',
    components: {
      topBar: TopBar,
      errorMsg: ErrorMsg,
      signIn: SignIn,
      register: Register
    },
    data() {
      return {
        showSignIn: true
      }
    },
    computed: {
      authError() {
        return this.$store.state.authError
      }
    }
  }
</script>

<style scoped>
  .welcome-message {
    width: 95%;
  }

  @media (min-width: 576px) {
    .welcome-message {
      width: 75%;
    }
  }
</style>