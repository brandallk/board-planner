<template>
  <div class="collab-panel container-fluid bg-dark text-light">

    <div class="invites">
      <h4 class="">Invite another user to contribute to this board:</h4>
      <div class="form-group">
        <label for="email">invitee email: </label>
        <input type="text" id="email" class="form-control" v-model="newCollab.email">
      </div>
    </div>

    <div class="collaborators">
      {{boardCollaborators}}
    </div>

  </div>
</template>

<script>
  export default {
    name: 'CollabPanel',
    data() {
      return {
        newCollab: {
          email: ""
        }
      }
    },
    computed: {
      boardCollaborators() {
        var currentUser = this.$store.state.user
        var board = this.$store.state.activeBoard
        // var allCollaborators = [board.userId].concat(board.contributors)
        // var filteredCollaborators = allCollaborators.filter(collab => collab.userId !== currentUser.userId)
        // return filteredCollaborators
      }
    }
  }
</script>

<style scoped>

</style>