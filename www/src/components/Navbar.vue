<template>
  <div class="wrapper">

    <div class="navbar container-fluid bg-dark row text-light">
  
      <div class="homelink navlink col-4 text-center py-4" @click="showBoardsList">
        Home
      </div>
  
      <div v-if="isHomeRoute" class="sharedPanelToggle navlink col-4 text-center py-4" @click="toggleShardBoardPanel">
        Shared Boards
      </div>
  
      <div v-if="isBoardRoute" class="collabPanelToggle navlink col-4 text-center py-4" @click="toggleCollabPanel">
        Collaborators
      </div>
  
      <div class="logout navlink col-4 text-center py-4" @click="logout">
        Logout
      </div>
  
    </div>

    <collabPanel v-if="showCollabPanel"></collabPanel>
    <shardBoardPanel v-if="showShardBoardPanel"></shardBoardPanel>

  </div>
</template>

<script>
  import CollabPanel from './CollabPanel'
  import ShardBoardPanel from './ShardBoardPanel'
  export default {
    name: 'Navbar',
    components: {
      collabPanel: CollabPanel,
      shardBoardPanel: ShardBoardPanel
    },
    data() {
      return {
        showCollabPanel: false,
        showShardBoardPanel: false
      }
    },
    computed: {
      isHomeRoute() {
        return this.$route.path === "/Home" || this.$route.path === "/home"
      },
      isBoardRoute() {
        return this.$route.path === "/Board" || this.$route.path === "/board"
      }
    },
    methods: {
      showBoardsList() {
        this.$router.push('Home')
      },
      toggleCollabPanel() {
        this.showCollabPanel = this.showCollabPanel ? false : true
      },
      toggleShardBoardPanel() {
        this.showShardBoardPanel = this.showShardBoardPanel ? false : true
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
    background-color: #138091;
  }
</style>