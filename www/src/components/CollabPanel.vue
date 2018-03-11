<template>
  <div class="collab-panel container-fluid text-light">
    <button class="close-btn btn btn-sm btn-outline-light py-0" @click="close">x</button>
    <div class="row px-4 py-4">

      <div class="invites col-12 col-sm-6">
        <div>
          <img src="./../assets/invitation.png" alt="invitation icon">
          <span class="">Invite another user to share this board.</span>
        </div>
        <div class="form-group d-flex justify-content-left mt-2">
          <label for="email" class="mr-2">Collaborator email: </label>
          <input type="text" id="email" class="form-control" v-model="newCollab.email">
        </div>
        <button class="btn btn-sm px-5 btn-outline-light" @click="addCollaborator">invite</button>
      </div>
  
      <div class="collaborators col-12 col-sm-5 ml-5 px-2 py-1">
        <h6>Users currently sharing this board:</h6>
        <div class="row">
          <div class="collabName col-md-6">
              <img src="./../assets/user.png" alt="user icon">
              <span class="text-light">{{boardOwner}} <em>(owner)</em></span>
          </div>
          <div v-for="collabName in boardCollaborators" class="collabName col-md-6">
              <img src="./../assets/user.png" alt="user icon">
              <span class="text-light">{{collabName}}</span>
          </div>
        </div>
      </div>

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
      },
      close() {
        this.$emit('closeCollabPanel')
      }
    },
    mounted() {
      this.$store.dispatch('getBoardOwner', this.$store.state.activeBoard)
    }
  }
</script>

<style scoped>
  .collab-panel {
    position: relative;
    background-color: rgb(70, 150, 135);
  }

  .close-btn{
    position: absolute;
    top: 1rem;
    right: 1rem;
    height: 1.5rem;
  }

  img {
    width: 25px;
    margin-bottom: 0.4rem;
    margin-right: 0.5rem;
  }

  label {
    font-size: 0.8rem;
    margin-top: 0.25rem;
    white-space: nowrap;
  }

  .collabName {
    font-size: 0.8rem;
    margin-top: 0.25rem;
  }

  input {
    height: 1.5rem;
  }
</style>