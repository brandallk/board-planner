<template>
  <div class="signIn container w-50">
    <div class="row signInForm">
      <div class="col ">
        <h1 class="text-center m-5">Welcome to Board-Planner!</h1>
        <p>We are a startup that is aimed at helping people plan out their projects...</p>
        <p class="p-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda dolores alias id, quaerat quos dolore earum ducimus
          eaque velit dignissimos. Doloremque blanditiis aliquid nesciunt! Delectus, aperiam quisquam? Atque dolores autem
          explicabo porro facere accusamus sint libero, reprehenderit soluta labore voluptatem!</p>
        <form class="border border-secondary p-4" @click="">
          <h4 class="text-center">Sign In</h4>
          <div class="form-group">
            <label class="ml-4" for="email">Email:</label>
            <input type="text" id="email" class="form-control" v-model="user.email">
          </div>
          <div class="form-group">
            <label class="ml-4" for="password">Password:</label>
            <input type="text" id="password" class="form-control" v-model="user.password">
          </div>
          <button class="btn btn-info px-4" type="submit">I want in!</button>
        </form>
        <div class="text-center pt-4">
          <a href="#" class="text-muted" @click.prevent="showRegisterForm">Register!</a>
        </div>

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
      showRegisterForm() {
        this.$emit('showRegisterForm')
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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