<template>
  <div class="wrapper">

    <div class="navbar container-fluid bg-dark row text-light">
  
      <div class="homelink navlink col-4 text-center py-4" @click="showBoardsList">
        Home
      </div>
  
      <div class="collabPanelToggle navlink col-4 text-center py-4" @click="toggleCollabPanel">
        Collaborators
      </div>
  
      <div class="logout navlink col-4 text-center py-4" @click="logout">
        Logout
      </div>
  
    </div>

    <collabPanel v-if="showCollabPanel"></collabPanel>

  </div>
</template>

<script>
    import CollabPanel from './CollabPanel'
    export default {
        name: 'Navbar',
        components: {
            collabPanel: CollabPanel
        },
        data() {
            return {
                showCollabPanel: false
            }
        },
        methods: {
            showBoardsList() {
                this.$router.push('Home')
            },
            toggleCollabPanel() {
                this.showCollabPanel = this.showCollabPanel ? false : true
            },
            logout() {
                this.$store.dispatch('logoutUser')
            }
        }
    }
</script>

<style scoped>
    .navbar {
        width: 100%;
        padding: 0;
        margin: 0;
    }
    
    .navlink:hover {
        cursor: pointer;
        background-color: #015249;
    }
</style>