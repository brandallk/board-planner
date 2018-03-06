<template>
  <div class="register container mt-4">
    <form action="#" class="border border-secondary p-4" @submit.prevent="submit">

      <h4 class="text-center">Register</h4>

      <div class="form-group">
        <label for="username">Name: </label>
        <input type="text" id="username" class="form-control" v-model="user.name">
      </div>
      <div class="form-group">
        <label for="email">Email: </label>
        <input type="text" id="email" class="form-control" v-model="user.email">
      </div>
      <div class="form-group">
        <label for="password">Password: </label>
        <input type="password" id="password" class="form-control" v-model="user.password">
      </div>

      <button type="submit" class="btn btn-info px-4">Submit</button>

    </form>

    <div class="text-center pt-4">
      <a href="#" class="text-muted" @click.prevent="showSignInForm">Sign In</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      user: {
        name: "",
        email: "",
        password: ""
      }
    }
  },
  methods: {
    submit() {
      this.$store.dispatch('registerUser', this.user)
    },
    showSignInForm() {
      this.$emit('showSignInForm')
    }
  }
}
</script>

<style scoped>
  div.register {
    width: 95%;
  }
  @media (min-width: 576px) {
    div.register {
      width: 50%;
    }
  }
  form {
    background-color: rgb(219, 219, 219);
  }
</style>
