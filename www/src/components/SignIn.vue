<template>
  <div class="signIn container">
    <div class="signInForm">
        <form class="border border-secondary p-4" @submit.prevent="submit">
          <h4 class="text-center">Sign In</h4>
          <div class="form-group">
            <label class="ml-4" for="email">Email:</label>
            <input type="text" id="email" class="form-control" v-model="user.email">
          </div>
          <div class="form-group">
            <label class="ml-4" for="password">Password:</label>
            <input type="password" id="password" class="form-control" v-model="user.password">
          </div>
          <button class="btn btn-info px-4" type="submit">I want in!</button>
        </form>
        <div class="text-center pt-4">
          <a href="#" class="text-muted" @click.prevent="showRegisterForm">Register!</a>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SignIn',
    data() {
      return {
        user: {
          password: '',
          email: ''
        },
      }
    },
    methods: {
      submit() {
        this.$store.dispatch('loginUser', this.user)
      },
      showRegisterForm() {
        this.$emit('showRegisterForm')
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div.signIn {
    width: 95%;
  }
  @media (min-width: 576px) {
    div.signIn {
      width: 50%;
    }
  }
  .signInForm {
    /* height: 160px;
    width: 130px; */
    padding: 1rem;
  }

  form {
    background-color: rgb(219, 219, 219)
  }

  .button {
    display: flex;
    justify-content: flex-end;
    align-self: center;
  }
</style>