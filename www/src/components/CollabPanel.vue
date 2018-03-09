<template>
  <div class="collab-panel container-fluid bg-dark text-light">

    <div class="invites">
      <h4 class="">Invite another user to contribute to this board:</h4>
      <div class="form-group">
        <label for="email">invitee email: </label>
        <input type="text" id="email" class="form-control" v-model="newCollab.email">
      </div>
      <button class="btn" @click="addCollaborator">invite</button>
    </div>

    <div class="collaborators p-5">
      <h6>board owner: {{boardOwner}}</h6>
      <h6>board collaborators:</h6>
      <span class="px-3" v-for="collabName in boardCollaborators">{{collabName}}</span>
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
      boardOwner() {
        return this.$store.state.boardOwner.name
      },
      boardCollaborators() {
        var collabs = this.$store.state.activeBoard.collaborators
        return collabs.map(collab => collab.name)
      }
    },
    methods: {
      addCollaborator() {
        var data = {
          board: this.$store.state.activeBoard,
          collaboratorEmail: this.newCollab.email
        }
        this.$store.dispatch('addBoardCollaborator', data)
      }
    },
    mounted() {
      this.$store.dispatch('getBoardOwner', this.$store.state.activeBoard)
    }
  }
</script>

<style scoped>

</style>