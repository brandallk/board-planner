<template>
  <div class="welcome container-fluid">
    <topBar></topBar>
    <div class="welcome-message container">
      <h1 class="text-center m-5">Welcome to Board-Planner!</h1>
      <p>We are a startup that is aimed at helping people plan out their projects...</p>
      <p class="p-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda dolores alias id, quaerat quos dolore earum ducimus
        eaque velit dignissimos. Doloremque blanditiis aliquid nesciunt! Delectus, aperiam quisquam? Atque dolores autem
        explicabo porro facere accusamus sint libero, reprehenderit soluta labore voluptatem!
      </p>
    </div>
    <signIn v-on:showRegisterForm="showSignIn = false" v-if="showSignIn"></signIn>
    <register v-on:showSignInForm="showSignIn = true" v-if="!showSignIn"></register>
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
