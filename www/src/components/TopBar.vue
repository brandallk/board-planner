<template>
  <div class="topbar bgcolor row">
    
    <div class="col-sm-12">
      <h1 class="text-center text-light py-4">Board-Planner</h1>
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
    
    .bgcolor {
        background-color: #015249;
    }
</style>